import * as path from 'path';
import * as athena from '@aws-cdk/aws-athena';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
import * as glue from '@aws-cdk/aws-glue';
import * as iam from '@aws-cdk/aws-iam';
import * as lf from '@aws-cdk/aws-lakeformation';
import * as lambda from '@aws-cdk/aws-lambda';
import { PythonFunction } from '@aws-cdk/aws-lambda-python';
import * as logs from '@aws-cdk/aws-logs';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { IDependable } from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';

import { DataProduct } from './data-product';
import { DataSet, DataSetResult } from './data-sets/data-set';
import { KinesisOps } from './data-streams/kinesis-ops';
import { KinesisStream } from './data-streams/kinesis-stream';
import { CompressionType, S3DeliveryStream } from './data-streams/s3-delivery-stream';
import { GlueCrawler } from './etl/glue-crawler';
import { GlueJob } from './etl/glue-job';
import { GlueJobOps } from './etl/glue-job-ops';
import { GlueTable } from './etl/glue-table';
import { DataLakeAdministrator } from './personas/data-lake-admin';
import { DataLakeCreator } from './personas/data-lake-creator';
import { DataPipelineType, Pipeline } from './pipeline';
import { buildGlueCrawlerName, buildRoleName, buildLambdaFunctionName, buildS3BucketName, buildUniqueName, getDataSetBucketName, packageAsset, toS3Path } from './utils';

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
   * The AWS Account Id of the Datalake.
   *
   */
  readonly accountId: string;
  /**
   * The AWS Region the Datalake will be deployed.
   *
   */
  readonly region: string;
  /**
   * The List of DataProducts for this account
   *
   * @default - No data products
   */
  readonly dataProducts?: DataProduct[];
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
  /**
  * Create default Glue Database for DataLake
  *
  * @default - false
  */
  readonly createDefaultDatabase: Boolean;
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
  readonly createAthenaWorkgroup?: Boolean;
}

export enum Stage {
  ALPHA = 'alpha',
  BETA = 'beta',
  GAMMA = 'gamma',
  PROD = 'prod',
}

export enum Permissions {
  ALTER = 'ALTER',
  CREATE_DATABASE = 'CREATE_DATABASE',
  CREATE_TABLE = 'CREATE_TABLE',
  DATA_LOCATION_ACCESS = 'DATA_LOCATION_ACCESS',
  DELETE = 'DELETE',
  DESCRIBE = 'DESCRIBE',
  DROP = 'DROP',
  INSERT = 'INSERT',
  SELECT = 'SELECT',
  ASSOCIATE = 'ASSOCIATE'
}

/**
 * A CDK construct to create a DataLake.
 */
export class DataLake extends cdk.Construct {
  public readonly dataSets: { [schemaName: string]: DataSet } = {};
  public readonly dataStreams: { [schemaName: string]: KinesisStream } = {};
  public readonly databases: { [name: string]: glue.Database } = {};
  public readonly datalakeAdminRole: iam.IRole;
  public readonly datalakeDbCreatorRole: iam.IRole;
  public readonly logBucket: s3.Bucket;
  public readonly region: string;
  public readonly accountId: string;
  public readonly stageName: Stage;
  public readonly vpc?: ec2.Vpc;
  public readonly athenaWorkgroup?: athena.CfnWorkGroup;

  private readonly glueSecurityGroup?: ec2.SecurityGroup
  private readonly crossAccountAccess?: CrossAccountProperties
  private readonly downloadLocations: { [schema: string]: DataSetResult } = {} //used for the Custom Resource to allow downloading of existing datasets into datalake
  private readonly logBucketProps: s3.BucketProps;

  constructor(scope: cdk.Construct, id: string, props: DataLakeProperties) {
    super(scope, id);
    this.stageName = props.stageName;
    this.accountId = props.accountId,
    this.region = props.region;
    this.crossAccountAccess = props.crossAccountAccess ? props.crossAccountAccess : undefined;
    this.vpc = props.vpc ? props.vpc : undefined;

    if (props.logBucketProps) {
      this.logBucketProps = props.logBucketProps;
    } else {
      this.logBucketProps = {
        lifecycleRules: [
          {
            expiration: cdk.Duration.days(30),
          },
        ],
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
      };
    }

    if (this.vpc) {
      this.glueSecurityGroup = new ec2.SecurityGroup(this, 'glue-sg', {
        description: 'Glue self referential allow in out',
        vpc: this.vpc,
        securityGroupName: buildUniqueName({
          name: 'glue',
          accountId: this.accountId,
          region: this.region,
          resourceUse: 'datalake',
          stage: this.stageName,
        }, 80),
      });
      this.glueSecurityGroup.connections.allowFrom(this.glueSecurityGroup, ec2.Port.allTcp());
      this.glueSecurityGroup.connections.allowTo(this.glueSecurityGroup, ec2.Port.allTcp());
      new cdk.CfnOutput(this, 'GlueSecurityGroupName', { value: this.glueSecurityGroup.securityGroupName });
    }

    this.logBucket = new s3.Bucket(this, 'datalake-log-bucket', {
      bucketName: buildS3BucketName({
        stage: props.stageName,
        region: props.region,
        resourceUse: 'log-bucket',
        name: props.name,
        accountId: props.accountId,
      }),
      ...this.logBucketProps,
    });
    new cdk.CfnOutput(this, 'DataLakeLogBucket', { value: this.logBucket.bucketName });

    if (props.datalakeAdminRole) {
      this.datalakeAdminRole = props.datalakeAdminRole;
    } else {
      this.datalakeAdminRole = new DataLakeAdministrator(this, `${props.name}-datalake-admin-role`, {
        name: buildUniqueName({
          name: props.name,
          accountId: props.accountId,
          region: props.region,
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
          accountId: props.accountId,
          region: props.region,
          resourceUse: 'datalake-creator',
          stage: this.stageName,
        }, 60),
      }).role;
    }

    if (props.createDefaultDatabase) {
      this.databases[props.name] = this.createDatabase(props.name);
      new cdk.CfnOutput(this, 'DataLakeDefaultDatabase', { value: props.name });
    }

    if (this.crossAccountAccess) {
      this.createCrossAccountGlueCatalogResourcePolicy(
        this.crossAccountAccess.consumerAccountIds, this.crossAccountAccess.dataCatalogOwnerAccountId);
    }

    if (props.createAthenaWorkgroup) {
      this.athenaWorkgroup = new athena.CfnWorkGroup(this, 'workgroup', {
        name: buildUniqueName({
          name: props.name,
          accountId: props.accountId,
          region: props.region,
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
      new cdk.CfnOutput(this, 'DataLakeAthenaWorkgroup', { value: this.athenaWorkgroup.name });
    }

    if (props.policyTags) {
      this.createPolicyTagsCustomResource(props.policyTags, this.datalakeAdminRole);
    }

    if (props.dataProducts && props.dataProducts.length > 0) {
      props.dataProducts.forEach((product: DataProduct) => {
        this.databases[product.databaseName] = this.createDatabase(product.databaseName);

        product.pipelines.forEach((pipe: Pipeline) => {
          this.addPipeline(pipe, product);
        });
      });
    }
  }

  public createDownloaderCustomResource(accountId: string, region: string, stageName: string) {
    // download the data sets with the custom resource after successfull creation of resource
    const onEvent = new PythonFunction(this, 'DataloaderHandler', {
      runtime: lambda.Runtime.PYTHON_3_7,
      entry: path.join(__dirname, '../lambda/download-data'),
      timeout: cdk.Duration.minutes(15),
      functionName: buildLambdaFunctionName({
        name: 'load-data',
        accountId: accountId,
        region: region,
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
    new cdk.CustomResource(this, 'LoadDatalakeCustomResource', {
      serviceToken: dataLoadProvider.serviceToken,
      properties: {
        dataSets: this.downloadLocations,
        stackName: cdk.Stack.name,
        regionName: region,
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

  private addDataStream(pipeline: Pipeline, dataSet: DataSet) : KinesisStream {
    const schemaName = pipeline.name;
    const dataStreamStack = new cdk.NestedStack(cdk.Stack.of(this), `${schemaName}-datastream-stack`);

    if (pipeline.streamProperties) {
      this.dataStreams[schemaName] = new KinesisStream(dataStreamStack, 'DataStream', {
        shardCount: 1,
        streamName: pipeline.streamProperties.streamName,
      });

      const deliveryStream = new S3DeliveryStream(dataStreamStack, 'deliveryStream', {
        compression: CompressionType.UNCOMPRESSED,
        kinesisStream: this.dataStreams[schemaName].stream,
        s3Bucket: s3.Bucket.fromBucketName(this, 'get-bucket-for-kinesis', getDataSetBucketName(pipeline.dataSetDropLocation, dataSet)),
        s3Prefix: pipeline.destinationPrefix,
      });

      new KinesisOps(dataStreamStack, 'kinesis-ops', {
        stream: this.dataStreams[schemaName],
        deliveryStream: deliveryStream,
      });

      if (pipeline.streamProperties.lambdaDataGenerator) {
        const dataGeneratorFunction = new lambda.Function(dataStreamStack, 'data-generator-function', {
          code: pipeline.streamProperties.lambdaDataGenerator.code,
          handler: pipeline.streamProperties.lambdaDataGenerator.handler,
          timeout: pipeline.streamProperties.lambdaDataGenerator.timeout,
          runtime: pipeline.streamProperties.lambdaDataGenerator.runtime,
          functionName: pipeline.streamProperties.lambdaDataGenerator.functionName,
          environment: {
            KINESIS_STREAM: this.dataStreams[schemaName].stream.streamName,
          },
        });

        this.dataStreams[schemaName].stream.grantWrite(dataGeneratorFunction);
        const rule = new events.Rule(this, 'Rule', {
          schedule: pipeline.streamProperties.lambdaDataGenerator.schedule,
          ruleName: pipeline.streamProperties.lambdaDataGenerator.ruleName,
        });
        rule.addTarget(new targets.LambdaFunction(dataGeneratorFunction));
      }
      return this.dataStreams[schemaName];
    } else {
      throw new Error(
        'StreamProperties required to create a data stream.',
      );
    }
  }

  private addPipeline(pipeline:Pipeline, dataProduct: DataProduct) {
    const schemaName = pipeline.name;
    const dataSetStack = dataProduct.accountId == this.accountId ? new cdk.NestedStack(cdk.Stack.of(this), `${schemaName}-dataset-stack`) : this;

    // create the dataSet
    this.dataSets[schemaName] = new DataSet(dataSetStack, schemaName, {
      pipeline: pipeline,
      dataProduct: dataProduct,
      logBucket: this.logBucket,
      stage: this.stageName,
      accountId: this.accountId,
      region: this.region,
      s3BucketProps: dataProduct.s3BucketProps,
    });
    const ds = this.dataSets[schemaName];
    const sameAccount = dataProduct.accountId == this.accountId;
    const catelogAccountId = dataProduct.dataCatalogAccountId ? dataProduct.dataCatalogAccountId : this.accountId;

    if (sameAccount) {
      this.createPipelineResources(pipeline, dataProduct, ds);
    }

    if (pipeline.table) {
      const table = new GlueTable(this, `${pipeline.name}-table`, {
        catalogId: pipeline.table.catalogId,
        columns: pipeline.table.columns,
        databaseName: this.databases[dataProduct.databaseName].databaseName,
        description: pipeline.table.description,
        inputFormat: pipeline.table.inputFormat,
        outputFormat: pipeline.table.outputFormat,
        parameters: pipeline.table.parameters,
        partitionKeys: pipeline.table.partitionKeys,
        s3Location: `s3://${getDataSetBucketName(pipeline.dataSetDropLocation, ds)}/${pipeline.destinationPrefix}`,
        serdeParameters: pipeline.table.serdeParameters,
        serializationLibrary: pipeline.table.serializationLibrary,
        tableName: pipeline.table.tableName,
      });

      table.node.addDependency(this.databases[dataProduct.databaseName]);
    }

    // find the correct metadata catalog account
    if (catelogAccountId == this.accountId) {
      // refactor to only register the needed buckets from the data product account
      const rawDlResource = this.registerDataLakeLocation(
        this.datalakeAdminRole.roleArn, this.datalakeDbCreatorRole.roleArn, ds.rawBucketName);
      const trustedDlResource = this.registerDataLakeLocation(
        this.datalakeAdminRole.roleArn, this.datalakeDbCreatorRole.roleArn, ds.trustedBucketName);
      const refinedDlResource = this.registerDataLakeLocation(
        this.datalakeAdminRole.roleArn, this.datalakeDbCreatorRole.roleArn, ds.refinedBucketName);

      if (!pipeline.table) {
        const bucketName = getDataSetBucketName(pipeline.dataSetDropLocation, ds);
        const name = bucketName.replace(/\W/g, '');

        // only create a crawler for the drop location of the data in the data product of the pipeline
        const crawler = new GlueCrawler(this, `data-lake-crawler-${name}`, {
          name: buildGlueCrawlerName({
            accountId: this.accountId,
            stage: this.stageName,
            resourceUse: 'crawler',
            name: pipeline.name,
            region: this.region,
          }),
          databaseName: dataProduct.databaseName,
          bucketName: bucketName,
          bucketPrefix: pipeline.destinationPrefix,
          roleName: buildRoleName({
            accountId: this.accountId,
            stage: this.stageName,
            resourceUse: 'crawler-role',
            name: pipeline.name,
            region: this.region,
          }),
        });
        crawler.node.addDependency(rawDlResource);
        crawler.node.addDependency(trustedDlResource);
        crawler.node.addDependency(refinedDlResource);
      }
    }
  }

  // this is a jumbled mess clean up once refecto
  private createPipelineResources(pipeline: Pipeline, dataProduct: DataProduct, ds: DataSet) {
    switch (pipeline.type) {
      case DataPipelineType.S3: {
        if (ds.downloadLocations) {
          this.downloadLocations[pipeline.name] = ds.downloadLocations;
        }
        break;
      }
      case DataPipelineType.STREAM: {
        this.addDataStream(pipeline, ds);
        break;
      }
      case DataPipelineType.JDBC: {
        this.createJDBCConnection(pipeline);
        break;
      }
    }

    if (pipeline.job) {
      const jobScript = packageAsset(this, `${pipeline.name}Script`, pipeline.job.jobScript);

      pipeline.job.jobArgs!['--TempDir'] = `s3://${this.logBucket.bucketName}/temp/`;
      pipeline.job.jobArgs!['--spark-event-logs-path'] = `s3://${this.logBucket.bucketName}/logs/`;
      // rethink how this works not all jobs write to S3
      if (pipeline.job.destinationLocation) {
        pipeline.job.jobArgs!['--DESTINATION_BUCKET'] = getDataSetBucketName(pipeline.job.destinationLocation, ds);
      }

      const job = new GlueJob(this, `${pipeline.name}-etl-job`, {
        deploymentBucket: jobScript.bucket,
        jobScript: toS3Path(jobScript),
        name: pipeline.job.name,
        workerType: pipeline.job.workerType,
        description: pipeline.job.description,
        glueVersion: pipeline.job.glueVersion,
        jobArgs: pipeline.job.jobArgs,
        maxCapacity: pipeline.job.maxCapacity,
        maxConcurrentRuns: pipeline.job.maxConcurrentRuns,
        maxRetries: pipeline.job.maxRetries,
        numberOfWorkers: pipeline.job.numberOfWorkers,
        roleName: pipeline.job.roleName,
        timeout: pipeline.job.timeout,
        jobType: pipeline.job.jobType,
        readAccessBuckets: [
          this.logBucket,
        ],
        writeAccessBuckets: [
          this.logBucket,
          s3.Bucket.fromBucketName(this, 'raw-bucket-role', ds.rawBucketName),
          s3.Bucket.fromBucketName(this, 'refined-bucket-role', ds.refinedBucketName),
          s3.Bucket.fromBucketName(this, 'trusted-bucket-role', ds.trustedBucketName),
        ],
      });

      new GlueJobOps(this, `${pipeline.name}-etl-job-ops`, {
        job: job,
      });

      if (pipeline.streamProperties) {
        this.dataStreams[pipeline.name].stream.grantRead(job.role);
      }

      new lf.CfnPermissions(this, `${pipeline.name}-create-table-perm`, {
        dataLakePrincipal: {
          dataLakePrincipalIdentifier: job.role.roleArn,
        },
        resource: {
          databaseResource: {
            name: dataProduct.databaseName,
          },
        },
        permissions: [
          Permissions.ALTER,
          Permissions.CREATE_TABLE,
          Permissions.DESCRIBE,
        ],
      });

      if (pipeline.table) {
        new lf.CfnPermissions(this, `${pipeline.name}-access-table-perm`, {
          dataLakePrincipal: {
            dataLakePrincipalIdentifier: job.role.roleArn,
          },
          resource: {
            tableResource: {
              databaseName: dataProduct.databaseName,
              name: pipeline.table.tableName,
            },
          },
          permissions: [
            Permissions.SELECT,
            Permissions.DESCRIBE,
          ],
        });
      }
    }
  }

  private createJDBCConnection(pipeline:Pipeline) {
    if (this.vpc && this.glueSecurityGroup) {
      new glue.Connection(this, `${pipeline.name}-glue-connection`, {
        type: glue.ConnectionType.JDBC,
        connectionName: `${pipeline.name}-jdbc`,
        description: `JDBC connection for glue to use on pipeline ${pipeline.name}`,
        subnet: this.vpc.isolatedSubnets[0],
        securityGroups: [this.glueSecurityGroup],
        properties: {
          JDBC_CONNECTION_URL:
            pipeline.jdbcProperties!.jdbc!,
          USERNAME: pipeline.jdbcProperties!.username!, //figure this out
          PASSWORD: pipeline.jdbcProperties!.password!,
        },
      });
    } else {
      throw new Error(
        'VPC required to create a JDBC pipeline.',
      );
    }
  }

  private createPolicyTagsCustomResource(policyTags: { [name: string]: string }, datalakeAdminRole: iam.IRole) {
    const onEvent = new PythonFunction(this, 'create-policy-tags-handler', {
      runtime: lambda.Runtime.PYTHON_3_7,
      entry: path.join(__dirname, '../lambda/create-tags-handler'),
      role: this.datalakeAdminRole,
      functionName: buildLambdaFunctionName({
        name: 'create-tags',
        accountId: this.accountId,
        region: this.region,
        resourceUse: 'cr',
        stage: this.stageName,
      }),
    });

    const myProvider = new cr.Provider(this, 'policy-tags-provider', {
      onEventHandler: onEvent,
      logRetention: logs.RetentionDays.ONE_DAY,
    });

    const outputs = new cdk.CustomResource(this, 'tag-creation-custom-resource', {
      serviceToken: myProvider.serviceToken,
      properties: {
        policyTags: policyTags,
        stackName: cdk.Stack.name,
        regionName: this.region,
        catalogId: this.accountId,
      },
    });
    outputs.node.addDependency(datalakeAdminRole);
  }

  public createCrossAccountGlueCatalogResourcePolicy(consumerAccountIds: string[], dataCatalogOwnerAccountId: string) {
    const onCatalogEvent = new PythonFunction(this, 'enable-hybrid-catalog-handler', {
      runtime: lambda.Runtime.PYTHON_3_7,
      entry: path.join(__dirname, '../lambda/enable-hybrid-catalog'),
      role: this.datalakeAdminRole,
      functionName: buildLambdaFunctionName({
        name: 'create-catalog',
        accountId: this.accountId,
        region: this.region,
        resourceUse: 'cr',
        stage: this.stageName,
      }),
    });

    const catalogProvider = new cr.Provider(this, 'hybrid-catalog-provider', {
      onEventHandler: onCatalogEvent,
      logRetention: logs.RetentionDays.ONE_DAY,
    });

    new cdk.CustomResource(this, 'hybrid-catalog-custom-resource', {
      serviceToken: catalogProvider.serviceToken,
      properties: {
        stackName: cdk.Stack.name,
        regionName: this.region,
        consumerAccountIds: consumerAccountIds,
        producerAccountId: dataCatalogOwnerAccountId,
      },
    });
  }

  private registerDataLakeLocation(dataLakeAdminRoleArn: string, dataLakeDbCreatorRoleArn: string, bucketName: string) : lf.CfnResource {
    const name = bucketName.replace(/\W/g, '');
    const dlResource = new lf.CfnResource(this, `lf-resource-${name}`, {
      resourceArn: `arn:aws:s3:::${bucketName}`,
      useServiceLinkedRole: false,
      roleArn: dataLakeDbCreatorRoleArn,
    });

    this.createDataLocationAccessPermission(`${name}-creator`, dataLakeDbCreatorRoleArn, bucketName, dlResource);
    this.createDataLocationAccessPermission(`${name}-admin`, dataLakeAdminRoleArn, bucketName, dlResource);
    return dlResource;
  }

  private createDataLocationAccessPermission(name: string, roleArn: string, bucketName: string, resource: IDependable) : lf.CfnPermissions {
    const perm = new lf.CfnPermissions(this, `datalake-creator-perm-${name}`, {
      dataLakePrincipal: {
        dataLakePrincipalIdentifier: roleArn,
      },
      resource: {
        dataLocationResource: {
          s3Resource: `arn:aws:s3:::${bucketName}`,
        },
      },
      permissions: [
        Permissions.DATA_LOCATION_ACCESS,
      ],
    });
    perm.node.addDependency(resource);
    return perm;
  }
}


