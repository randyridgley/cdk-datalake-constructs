import * as path from 'path';
import * as glue from '@aws-cdk/aws-glue-alpha';
import { PythonFunction } from '@aws-cdk/aws-lambda-python-alpha';
import { Aws, CfnOutput, CustomResource, Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import * as athena from 'aws-cdk-lib/aws-athena';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { IRole } from 'aws-cdk-lib/aws-iam';
import * as lf from 'aws-cdk-lib/aws-lakeformation';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import * as cr from 'aws-cdk-lib/custom-resources';

import { Construct } from 'constructs';
import { LakeImplStrategy, LakeStrategyFactory } from './data-lake-strategy';
import { DataProduct } from './data-product';
import { DataTier, LakeKind, Permissions, Stage } from './global/enums';
import { DataLakeAdministrator } from './personas/data-lake-admin';
import { DataLakeCreator } from './personas/data-lake-creator';
import { Pipeline } from './pipeline';
import { buildLambdaFunctionName, buildS3BucketName, buildUniqueName } from './utils';

export interface CrossAccountProperties {
  readonly consumerAccountIds: string[];
  readonly dataCatalogOwnerAccountId: string;
}

export interface DataLakeProperties {
  /**
   * The name of the DataLake.
   *
   */
  readonly name: string;
  /**
   * The Stage the DataLake will be deployed.
   *
   */
  readonly stageName: Stage;
  /**
   * The List of DataProducts for this account
   *
   * @default - No data products
   */
  readonly dataProducts?: DataProduct[];
  /**
   * The Type of DataLake this instance is. This can be a DATA_PRODUCT only, CENTRAL_CATALOG, CONSUMER, or DATA_PRODUCT_AND_CATALOG type.
   */
  readonly lakeKind: LakeKind;
  /**
   * VPC for Glue jobs
   *
   * @default - No vpc
   * @description - The VPC that will be used if the Glue job needs access to resources within the account or internet access
   */
  readonly vpc?: ec2.Vpc;
  /**
   * List of Lake Formation TBAC policy tags.
   *
   * @default - No tags
   * @description - Define the tag taxonomy needed for the DataLake
   * @see https://docs.aws.amazon.com/lake-formation/latest/dg/TBAC-section.html
   */
  readonly policyTags?: { [name: string]: string };
  /**
   * Cross account AWS account IDs
   *
   * @default - No cross account ids
   * @description - The cross account ids needed for setting up the Glue resource policy
   * @see https://aws.amazon.com/premiumsupport/knowledge-center/glue-data-catalog-cross-account-access/
   */
  readonly crossAccountAccess?: CrossAccountProperties;
  /**
   * Security group to attach to Glue jobs
   *
   * @default - No security group
   * @description - Security Group that will be used to allow port access in the VPC
   * @see https://docs.aws.amazon.com/glue/latest/dg/setup-vpc-for-glue-access.html
   */
  readonly glueSecurityGroup?: ec2.SecurityGroup;
  /**
   * Data Lake Admin role
   *
   * @default - Admin role created based on best practices
   * @description - IAM Role for DataLake admin access
   * @see https://docs.aws.amazon.com/lake-formation/latest/dg/permissions-reference.html
   */
  readonly datalakeAdminRole?: iam.Role;
  /**
   * Data Lake Database Creator role
   *
   * @default - Database creator role created based on best practices
   * @description - IAM Role for DataLake database creator access
   * @see https://docs.aws.amazon.com/lake-formation/latest/dg/permissions-reference.html
   */
  readonly datalakeCreatorRole?: iam.Role;

  /* Default S3 Bucket Properties for Log Bucket
  *
  * @default - lifecycleRules: [
        {
          expiration: cdk.Duration.days(30),
        },
      ],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
  */
  readonly logBucketProps?: s3.BucketProps;
  /**
  * Create default Athena workgroup for querying data lake resources
  *
  * @default - false
  */
  readonly createAthenaWorkgroup?: boolean;
  /**
  * Create default glue database for the data lake
  *
  * @default false
  */
  readonly createDefaultDatabse?: boolean;

}

export interface DataTierBucketProps {
  readonly lakeType: LakeKind;
  readonly pipelineName: string;
  readonly bucketName: string | undefined;
  readonly dataCatalogAccountId: string;
  readonly logBucket: Bucket;
  readonly crossAccount:boolean;
  readonly s3BucketProps: s3.BucketProps | undefined;
  readonly datalakeAdminRole: IRole;
  readonly datalakeDbCreatorRole: IRole;
  readonly tier: DataTier;
}

/**
 * A CDK construct to create a DataLake.
 */
export class DataLake extends Construct {
  public readonly databases: { [name: string]: glue.Database } = {};
  public readonly datalakeAdminRole: iam.IRole;
  public readonly datalakeDbCreatorRole: iam.IRole;
  public readonly logBucket: s3.Bucket;
  public readonly stageName: Stage;
  public readonly vpc?: ec2.Vpc;
  public readonly athenaWorkgroup?: athena.CfnWorkGroup;
  public readonly lakeKind: LakeKind;

  private readonly glueSecurityGroup?: ec2.SecurityGroup;
  private readonly crossAccountAccess?: CrossAccountProperties;
  private readonly logBucketProps: s3.BucketProps;
  private readonly dataLakeStrategy: LakeImplStrategy;

  constructor(scope: Construct, id: string, props: DataLakeProperties) {
    super(scope, id);
    this.stageName = props.stageName;
    this.crossAccountAccess = props.crossAccountAccess ? props.crossAccountAccess : undefined;
    this.vpc = props.vpc ? props.vpc : undefined;
    this.lakeKind = props.lakeKind;

    if (props.logBucketProps) {
      this.logBucketProps = props.logBucketProps;
    } else {
      this.logBucketProps = {
        lifecycleRules: [
          {
            expiration: Duration.days(7),
          },
        ],
        removalPolicy: RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
      };
    }

    if (this.vpc) {
      const securityGroupName = buildUniqueName({
        name: 'glue',
        resourceUse: 'datalake',
        stage: this.stageName,
      }, 80);
      this.glueSecurityGroup = new ec2.SecurityGroup(this, 'glue-sg', {
        description: 'Glue self referential allow in out',
        vpc: this.vpc,
        securityGroupName: securityGroupName,
      });
      this.glueSecurityGroup.connections.allowFrom(this.glueSecurityGroup, ec2.Port.allTcp());
      this.glueSecurityGroup.connections.allowTo(this.glueSecurityGroup, ec2.Port.allTcp());
      new CfnOutput(this, 'GlueSecurityGroupName', { value: securityGroupName });
    }

    this.logBucket = new s3.Bucket(this, 'datalake-log-bucket', {
      bucketName: buildS3BucketName({
        stage: props.stageName,
        resourceUse: 'log-bucket',
        name: props.name,
      }),
      ...this.logBucketProps,
    });
    new CfnOutput(this, 'DataLakeLogBucket', { value: this.logBucket.bucketName });

    if (props.datalakeAdminRole) {
      this.datalakeAdminRole = props.datalakeAdminRole;
    } else {
      this.datalakeAdminRole = new DataLakeAdministrator(this, `${props.name}-datalake-admin-role`, {
        name: buildUniqueName({
          name: props.name,
          resourceUse: 'datalake-admin',
          stage: this.stageName,
        }, 60),
      }).role;
    }

    if (props.datalakeCreatorRole) {
      this.datalakeDbCreatorRole = props.datalakeCreatorRole;
    } else {
      this.datalakeDbCreatorRole = new DataLakeCreator(this, `${props.name}-datalake-creator-role`, {
        name: buildUniqueName({
          name: props.name,
          resourceUse: 'datalake-creator',
          stage: this.stageName,
        }, 60),
      }).role;
    }

    const lfAdminRole = new lf.CfnDataLakeSettings(this, 'lf-datalake-role-admin-settings', {
      admins: [{
        dataLakePrincipalIdentifier: this.datalakeAdminRole.roleArn,
      }],
    });
    lfAdminRole.node.addDependency(this.datalakeAdminRole);
    new CfnOutput(this, 'DataLakeAdminRole', { value: this.datalakeAdminRole.roleName });

    if (this.crossAccountAccess) {
      this.createCrossAccountGlueCatalogResourcePolicy(
        this.crossAccountAccess.consumerAccountIds, this.crossAccountAccess.dataCatalogOwnerAccountId);
    }

    if (props.createAthenaWorkgroup) {
      this.athenaWorkgroup = new athena.CfnWorkGroup(this, 'workgroup', {
        name: buildUniqueName({
          name: props.name,
          resourceUse: 'workgroup',
          stage: this.stageName,
        }, 60),
        description: 'Default Data Lake Workgroup',
        state: 'ENABLED',
        recursiveDeleteOption: true,
        workGroupConfiguration: {
          enforceWorkGroupConfiguration: true,
          resultConfiguration: {
            outputLocation: `s3://${this.logBucket.bucketName}/results/`,
          },
          engineVersion: {
            selectedEngineVersion: 'Athena engine version 2',
            effectiveEngineVersion: 'Athena engine version 2',
          },
        },
      });
      new CfnOutput(this, 'DataLakeAthenaWorkgroup', { value: this.athenaWorkgroup.name });
    }

    // if there are custom tags passed into the datya lake create them here with a custom resource
    // TODO: once Tags are included as part of CFN remove the custom resource.
    if (props.policyTags) {
      this.createPolicyTagsCustomResource(props.policyTags);
    }

    if (props.createDefaultDatabse) {
      this.createDatabase(`${props.name}-${props.stageName}`);
    }

    this.dataLakeStrategy = LakeStrategyFactory.getLakeStrategy(props.lakeKind);

    if (props.dataProducts && props.dataProducts.length > 0) {
      props.dataProducts.forEach((product: DataProduct) => {
        if (this.databases[product.databaseName] == undefined) {
          this.databases[product.databaseName] = this.createDatabase(product.databaseName);
        }

        product.pipelines.forEach((pipe: Pipeline) => {
          this.dataLakeStrategy.createDataProduct({
            stack: Stack.of(this),
            pipe: pipe,
            product: product,
            database: this.databases[product.databaseName],
            logBucket: this.logBucket,
            stage: this.stageName,
            datalakeAdminRoleArn: this.datalakeAdminRole.roleArn,
            datalakeDbCreatorRoleArn: this.datalakeDbCreatorRole.roleArn,
          });
        });
      });
    }
  }

  public createDownloaderCustomResource(stageName: string) {
    // download the data sets with the custom resource after successfull creation of resource
    const onEvent = new PythonFunction(this, 'DataloaderHandler', {
      runtime: lambda.Runtime.PYTHON_3_7,
      entry: path.join(__dirname, '../lambda/download-data'),
      timeout: Duration.minutes(15),
      functionName: buildLambdaFunctionName({
        name: 'load-data',
        resourceUse: 'cr',
        stage: stageName,
      }),
    });

    // create readable and writable buckets for the datasets and set the appropriate S3 access
    onEvent.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['s3:*'],
        resources: ['*'], // trim down to only the S3 buckets needed
      }),
    );

    const dataLoadProvider = new cr.Provider(this, 'DataloaderProvider', {
      onEventHandler: onEvent,
      logRetention: logs.RetentionDays.ONE_DAY,
    });

    // CR to download the static datasets form the dataSets var passed in.
    new CustomResource(this, 'LoadDatalakeCustomResource', {
      serviceToken: dataLoadProvider.serviceToken,
      properties: {
        dataSets: this.dataLakeStrategy.downloadLocations,
        stackName: Stack.name,
        regionName: Aws.REGION,
      },
    });
  }

  private createDatabase(databaseName: string) : glue.Database {
    const db = new glue.Database(this, `${databaseName}-database`, {
      databaseName: `${databaseName}`,
    });

    const dbPerm = new lf.CfnPermissions(this, `${databaseName}-lf-db-creator-permission`, {
      dataLakePrincipal: {
        dataLakePrincipalIdentifier: this.datalakeDbCreatorRole.roleArn,
      },
      resource: {
        databaseResource: {
          name: databaseName,
        },
      },
      permissions: [
        Permissions.ALTER,
        Permissions.CREATE_TABLE,
        Permissions.DROP,
      ],
    });
    dbPerm.node.addDependency(db);
    return db;
  }

  private createPolicyTagsCustomResource(policyTags: { [name: string]: string }) {
    const onEvent = new PythonFunction(this, 'create-policy-tags-handler', {
      runtime: lambda.Runtime.PYTHON_3_7,
      entry: path.join(__dirname, '../lambda/create-tags-handler'),
      role: this.datalakeAdminRole,
      functionName: buildLambdaFunctionName({
        name: 'create-tags',
        resourceUse: 'cr',
        stage: this.stageName,
      }),
      timeout: Duration.minutes(15),
    });
    onEvent.node.addDependency(this.datalakeAdminRole);

    const myProvider = new cr.Provider(this, 'policy-tags-provider', {
      onEventHandler: onEvent,
      logRetention: logs.RetentionDays.ONE_DAY,
    });

    const outputs = new CustomResource(this, 'tag-creation-custom-resource', {
      serviceToken: myProvider.serviceToken,
      properties: {
        policyTags: policyTags,
        stackName: Stack.name,
        regionName: Aws.REGION,
        catalogId: Aws.ACCOUNT_ID,
      },
    });
    outputs.node.addDependency(this.datalakeAdminRole);
  }

  protected createCrossAccountGlueCatalogResourcePolicy(consumerAccountIds: string[], dataCatalogOwnerAccountId: string) {
    const onCatalogEvent = new PythonFunction(this, 'enable-hybrid-catalog-handler', {
      runtime: lambda.Runtime.PYTHON_3_7,
      entry: path.join(__dirname, '../lambda/enable-hybrid-catalog'),
      role: this.datalakeAdminRole,
      timeout: Duration.minutes(1),
      functionName: buildLambdaFunctionName({
        name: 'create-catalog',
        resourceUse: 'cr',
        stage: this.stageName,
      }),
    });

    const catalogProvider = new cr.Provider(this, 'hybrid-catalog-provider', {
      onEventHandler: onCatalogEvent,
      logRetention: logs.RetentionDays.ONE_DAY,
    });

    new CustomResource(this, 'hybrid-catalog-custom-resource', {
      serviceToken: catalogProvider.serviceToken,
      properties: {
        stackName: Stack.name,
        regionName: Aws.REGION,
        consumerAccountIds: consumerAccountIds,
        producerAccountId: dataCatalogOwnerAccountId,
      },
    });
  }
}


