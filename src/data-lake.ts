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
import * as cr from '@aws-cdk/custom-resources';

import { DataProduct } from './data-product';
import { DataSet, DataSetResult } from './data-sets/data-set';
import { LFRegisteredDataSet } from './data-sets/registered-data-set';
import { KinesisOps } from './data-streams/kinesis-ops';
import { KinesisStream } from './data-streams/kinesis-stream';
import { CompressionType, S3DeliveryStream } from './data-streams/s3-delivery-stream';
import { GlueJob, GlueJobType, GlueVersion, GlueWorkerType } from './etl/glue-job';
import { GlueJobOps } from './etl/glue-job-ops';
import { GlueTable } from './etl/glue-table';
import { DataLakeAdministrator } from './personas/data-lake-admin';
import { DataLakeCreator } from './personas/data-lake-creator';
import { Pipeline } from './pipeline';
import { buildLambdaFunctionName, buildS3BucketName, buildUniqueName, packageAsset, toS3Path } from './utils';

export interface CrossAccountProperties {
  readonly consumerAccountIds: string[];
  readonly producerAccountId: string;
  readonly region: string;
}

export interface DataLakeProperties {
  readonly name: string;
  readonly stageName: Stage;
  readonly accountId: string;
  readonly region: string;
  readonly dataProducts?: DataProduct[];
  readonly vpc?: ec2.Vpc;
  readonly policyTags?: { [name: string]: string };
  readonly crossAccount?: CrossAccountProperties;
  readonly glueSecurityGroup?: ec2.SecurityGroup;
  readonly datalakeAdminRole?: iam.Role;
  readonly datalakeCreatorRole?: iam.Role;
  readonly createDefaultDatabase: Boolean;
}

export interface JDBCProperties {
  readonly jdbc: string;
  readonly username: string;
  readonly password: string;
}

export interface StreamProperties {
  readonly streamName: string;
  readonly lambdaDataGenerator?: LambdaDataGeneratorProperties;
}

export interface S3Properties {
  readonly sourceBucketName: string;
  readonly sourceKeys: string[];
}

export interface TableProps {
  readonly tableName: string;
  readonly description: string;
  readonly partitionKeys: Array<glue.CfnTable.ColumnProperty | cdk.IResolvable> | cdk.IResolvable;
  readonly columns: Array<glue.CfnTable.ColumnProperty | cdk.IResolvable> | cdk.IResolvable;
  readonly parameters: {[param: string]: any};
  readonly serializationLibrary: string;
  readonly serdeParameters: {[param: string]: any};
  readonly inputFormat: string;
  readonly outputFormat: string;
  readonly catalogId: string;
}

export interface JobProperties {
  readonly name: string;
  readonly roleName?: string;
  readonly description?: string;
  readonly readAccessBuckets?: s3.IBucket[];
  readonly writeAccessBuckets?: s3.IBucket[];
  readonly glueVersion?: GlueVersion;
  readonly workerType: GlueWorkerType;
  readonly numberOfWorkers?: number;
  readonly maxCapacity?: number;
  readonly maxRetries?: number;
  readonly maxConcurrentRuns?: number;
  readonly jobScript: string;
  readonly jobArgs?: { [key: string]: string };
  readonly timeout?: number;
  readonly jobType: GlueJobType;
}

export interface DataLocationProperties {
  readonly destinationPrefix: string;
  readonly destinationBucketName: string;
  readonly name: string;
  readonly databaseName: string;
}

export interface DataStreamProperties {
  readonly name: string;
  readonly destinationBucketName: string;
  readonly destinationPrefix: string;
  readonly dataCatalogOwner: DataCatalogOwner;
  readonly streamName: string;
  readonly lambdaDataGenerator: LambdaDataGeneratorProperties;
}

export interface LambdaDataGeneratorProperties {
  readonly code: lambda.Code;
  readonly handler: string;
  readonly timeout: cdk.Duration;
  readonly runtime: lambda.Runtime;
  readonly functionName: string;
  readonly schedule: events.Schedule;
  readonly ruleName: string;
}

export interface DataCatalogOwner {
  readonly accountId: string;
}

export interface S3NotificationProperties {
  readonly event: s3.EventType;
  readonly prefix: string;
  readonly suffix: string;
}

export enum DataPipelineType {
  STREAM = 'stream',
  JDBC = 'jdbc',
  S3 = 's3'
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

export class DataLake extends cdk.Construct {
  public readonly dataSets: { [schemaName: string]: DataSet } = {};
  public readonly dataStreams: { [schemaName: string]: KinesisStream } = {};
  public readonly logBucket: s3.Bucket
  public readonly databases: { [name: string]: glue.Database } = {}
  public readonly datalakeAdminRole: iam.IRole
  public readonly datalakeDbCreatorRole: iam.IRole
  public readonly athenaWorkgroup: athena.CfnWorkGroup
  public readonly region: string
  public readonly accountId: string
  public readonly stageName: Stage
  public readonly vpc?: ec2.Vpc

  private readonly glueSecurityGroup?: ec2.SecurityGroup
  private readonly crossAccountAccess?: CrossAccountProperties
  private readonly dataLocations: { [schema: string]: DataSetResult } = {} //used for the Custom Resource to allow downloading of existing datasets into datalake

  constructor(scope: cdk.Construct, id: string, props: DataLakeProperties) {
    super(scope, id);
    this.stageName = props.stageName;
    this.accountId = props.accountId,
    this.region = props.region;
    this.crossAccountAccess = props.crossAccount ? props.crossAccount : undefined;
    this.vpc = props.vpc ? props.vpc : undefined;

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
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(30),
        },
      ],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
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
      this.createDatabase(props.name);
      new cdk.CfnOutput(this, 'DataLakeDefaultDatabase', { value: props.name });
    }

    this.createCrossAccountGlueCatalogResourcePolicy();

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

    if (props.policyTags) {
      this.createPolicyTagsCustomResource(props.policyTags, this.datalakeAdminRole);
    }

    if (props.dataProducts && props.dataProducts.length > 0) {
      props.dataProducts.forEach((product: DataProduct) => {
        this.createDatabase(product.databaseName);

        product.pipelines.forEach((pipe: Pipeline) => {
          this.addPipeline(pipe, product.databaseName);

          // if the pipeline data set has the same accountId and the lake consider it the owner and register
          if (this.accountId === pipe.dataCatalogOwner.accountId) {
            new LFRegisteredDataSet(this, pipe.name, {
              destinationPrefix: pipe.destinationPrefix,
              destinationBucketName: pipe.destinationBucketName,
              name: pipe.name,
              stage: this.stageName,
              dataLakeAdminRoleArn: this.datalakeAdminRole.roleArn,
              dataLakeDbCreatorRoleArn: this.datalakeDbCreatorRole.roleArn,
              databaseName: product.databaseName,
            });
          }
        });
      });
    }
  }

  public createDownloaderCustomResource(accountId: string, region: string, stageName: string) {
    // download the data sets with the custom resource after successfull creation of resource
    const onEvent = new lambda.Function(this, 'DataloaderHandler', {
      runtime: lambda.Runtime.PYTHON_3_7,
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda/download-data')),
      handler: 'index.on_event',
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
        dataSets: this.dataLocations,
        stackName: cdk.Stack.name,
        regionName: region,
      },
    });
  }

  private addDataSet(setting: Pipeline): DataSet {
    const schemaName = setting.name;
    const dataSetStack = new cdk.NestedStack(cdk.Stack.of(this), `${schemaName}-dataset-stack`);

    this.dataSets[schemaName] = new DataSet(dataSetStack, schemaName, {
      destinationPrefix: setting.destinationPrefix,
      destinationBucketName: setting.destinationBucketName,
      sourceBucketName: setting.s3Properties!.sourceBucketName!,
      sourceKeys: setting.s3Properties!.sourceKeys!,
      s3NotificationProps: setting.s3NotificationProps,
      logBucket: this.logBucket,
      stage: this.stageName,
      name: setting.name,
      dataCatalogAccountId: setting.dataCatalogOwner ? setting.dataCatalogOwner.accountId : this.accountId,
      registerCrossAccount: setting.dataCatalogOwner.accountId != this.accountId,
    });
    return this.dataSets[schemaName];
  }

  private createDatabase(databaseName: string) {
    const db = new glue.Database(this, `${databaseName}-database`, {
      databaseName: `${databaseName}`,
    });
    this.databases[databaseName] = db;

    new lf.CfnPermissions(this, `${databaseName}-lf-db-creator-permission`, {
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
  }

  private addDataStream(setting: Pipeline) : KinesisStream {
    const schemaName = setting.name;
    const dataStreamStack = new cdk.NestedStack(cdk.Stack.of(this), `${schemaName}-dataset-stack`);

    if (setting.streamProperties != undefined) {
      this.dataStreams[schemaName] = new KinesisStream(dataStreamStack, 'DataStream', {
        shardCount: 1,
        streamName: setting.streamProperties.streamName,
      });

      const dataset = new DataSet(dataStreamStack, schemaName, {
        destinationPrefix: setting.destinationPrefix,
        destinationBucketName: setting.destinationBucketName,
        sourceBucketName: setting.s3Properties ? setting.s3Properties.sourceBucketName : undefined,
        sourceKeys: setting.s3Properties ? setting.s3Properties.sourceKeys : undefined,
        s3NotificationProps: setting.s3NotificationProps,
        logBucket: this.logBucket,
        stage: this.stageName,
        name: setting.name,
        dataCatalogAccountId: setting.dataCatalogOwner ? setting.dataCatalogOwner.accountId : this.accountId,
        registerCrossAccount: setting.dataCatalogOwner.accountId != this.accountId,
      });

      const iotDeliveryStream = new S3DeliveryStream(dataStreamStack, 'deliveryStream', {
        compression: CompressionType.UNCOMPRESSED,
        kinesisStream: this.dataStreams[schemaName].stream,
        s3Bucket: dataset.rawBucket,
        s3Prefix: setting.destinationPrefix,
      });

      new KinesisOps(dataStreamStack, 'kinesis-ops', {
        stream: this.dataStreams[schemaName],
        deliveryStream: iotDeliveryStream,
      });

      if (setting.streamProperties.lambdaDataGenerator) {
        const dataGeneratorFunction = new lambda.Function(dataStreamStack, 'data-generator-function', {
          code: setting.streamProperties.lambdaDataGenerator.code,
          handler: setting.streamProperties.lambdaDataGenerator.handler,
          timeout: setting.streamProperties.lambdaDataGenerator.timeout,
          runtime: setting.streamProperties.lambdaDataGenerator.runtime,
          functionName: setting.streamProperties.lambdaDataGenerator.functionName,
          environment: {
            KINESIS_STREAM: this.dataStreams[schemaName].stream.streamName,
          },
        });

        this.dataStreams[schemaName].stream.grantWrite(dataGeneratorFunction);
        const rule = new events.Rule(this, 'Rule', {
          schedule: setting.streamProperties.lambdaDataGenerator.schedule,
          ruleName: setting.streamProperties.lambdaDataGenerator.ruleName,
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

  private addPipeline(pipeline:Pipeline, databaseName: string) {
    let job = undefined;

    switch (pipeline.type) {
      case DataPipelineType.S3: {
        const ds = this.addDataSet(pipeline);
        this.dataLocations[pipeline.name] = ds.dataSetFiles;
        break;
      }
      case DataPipelineType.STREAM: {
        if (!pipeline.streamProperties!.lambdaDataGenerator) {
          throw new Error(
            'LambdaDataGenerator required to create a data stream.',
          );
        }

        this.addDataStream(pipeline);
        break;
      }
      case DataPipelineType.JDBC: {
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
          break;
        } else {
          throw new Error(
            'VPC required to create a JDBC pipeline.',
          );
        }
      }
    }

    if (pipeline.table) {
      new GlueTable(this, `${pipeline.name}-table`, {
        catalogId: pipeline.table.catalogId,
        columns: pipeline.table.columns,
        database: this.databases[databaseName],
        description: pipeline.table.description,
        inputFormat: pipeline.table.inputFormat,
        outputFormat: pipeline.table.outputFormat,
        parameters: pipeline.table.parameters,
        partitionKeys: pipeline.table.partitionKeys,
        s3Location: `s3://${pipeline.destinationBucketName}/${pipeline.destinationPrefix}`,
        serdeParameters: pipeline.table.serdeParameters,
        serializationLibrary: pipeline.table.serializationLibrary,
        tableName: pipeline.table.tableName,
      });
    }

    if (pipeline.job) {
      const jobScript = packageAsset(this, `${pipeline.name}Script`, pipeline.job.jobScript);

      pipeline.job.jobArgs!['--TempDir'] = `s3://${this.logBucket.bucketName}/temp/`;
      pipeline.job.jobArgs!['--spark-event-logs-path'] = `s3://${this.logBucket.bucketName}/logs/`;

      job = new GlueJob(this, `${pipeline.name}-etl-job`, {
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
          s3.Bucket.fromBucketName(this, `${pipeline.name}-dest-bucket`, pipeline.destinationBucketName),
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
            name: databaseName,
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
              databaseName: databaseName,
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

  private createPolicyTagsCustomResource(policyTags: { [name: string]: string }, datalakeAdminRole: iam.IRole) {
    const onEvent = new PythonFunction(this, 'create-policy-tags-handler', {
      runtime: lambda.Runtime.PYTHON_3_7,
      entry: path.join(__dirname, 'lambda/create-tags-handler'),
      handler: 'index.on_event',
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

  private createCrossAccountGlueCatalogResourcePolicy() {
    if (this.crossAccountAccess) {
      const onCatalogEvent = new PythonFunction(this, 'enable-hybrid-catalog-handler', {
        runtime: lambda.Runtime.PYTHON_3_7,
        entry: path.join(__dirname, 'lambda/enable-hybrid-catalog'),
        handler: 'index.on_event',
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
          regionName: this.crossAccountAccess.region,
          consumerAccountIds: this.crossAccountAccess.consumerAccountIds,
          producerAccountId: this.crossAccountAccess.producerAccountId,
        },
      });
    }
  }
}


