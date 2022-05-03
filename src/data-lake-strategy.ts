import { Connection, ConnectionType, Database } from '@aws-cdk/aws-glue-alpha';
import { NestedStack, Stack } from 'aws-cdk-lib';
import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Rule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { CfnPermissions, CfnResource } from 'aws-cdk-lib/aws-lakeformation';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { IDependable } from 'constructs';
import { DataLakeBucket } from './data-lake-bucket';
import { DataProduct } from './data-product';
import { KinesisOps } from './data-streams/kinesis-ops';
import { KinesisStream } from './data-streams/kinesis-stream';
import { CompressionType, S3DeliveryStream } from './data-streams/s3-delivery-stream';
import { GlueCrawler } from './etl/glue-crawler';
import { GlueJob } from './etl/glue-job';
import { GlueJobOps } from './etl/glue-job-ops';
import { GlueTable } from './etl/glue-table';
import { DataPipelineType, DataTier, LakeKind, Permissions, Stage } from './global/enums';
import { DataSetResult } from './global/interfaces';
import { Pipeline } from './pipeline';
import { buildGlueCrawlerName, buildRoleName, buildS3BucketName, packageAsset, toS3Path } from './utils';

export interface DataStrategyProps {
  readonly stack: Stack;
  readonly pipe: Pipeline;
  readonly product: DataProduct;
  readonly database: Database;
  readonly logBucket: Bucket;
  readonly stage: Stage;
  readonly vpc?: Vpc;
  readonly securityGroup?: SecurityGroup;
  readonly datalakeAdminRoleArn?: string;
  readonly datalakeDbCreatorRoleArn?: string;
}

export abstract class LakeImplStrategy {
  public locationRegistry: CfnResource[] = [];
  public stageName: Stage = Stage.ALPHA;
  public downloadLocations: { [schema: string]: DataSetResult } = {}; //used for the Custom Resource to allow downloading of existing datasets into datalake
  public dataStreams: { [schemaName: string]: KinesisStream } = {};

  protected logBucket?: Bucket;
  protected vpc?: Vpc;
  protected securityGroup?: SecurityGroup;
  protected datalakeAdminRoleArn?: string;
  protected datalakeDbCreatorRoleArn?: string;

  abstract addPipeline(stack: Stack, pipeline: Pipeline, dataProduct: DataProduct, bucketName: string): void;
  abstract lakeKind(): LakeKind

  getDataSetBucketName(pipe: Pipeline, dataTier: DataTier) : string | undefined {
    return dataTier == DataTier.RAW ? this.downloadLocations[pipe.name].rawBucketName :
      dataTier == DataTier.REFINED ? this.downloadLocations[pipe.name].refinedBucketName :
        dataTier == DataTier.TRUSTED ? this.downloadLocations[pipe.name].trustedBucketName : undefined;
  }

  createDataProduct(props: DataStrategyProps): void {
    const pipelineStack = new NestedStack(props.stack, `${props.pipe.name}-dataset-stack`); // props.product.accountId == Aws.ACCOUNT_ID ? new NestedStack(props.stack, `${props.pipe.name}-dataset-stack`) : props.stack;
    this.logBucket = props.logBucket;
    this.stageName = props.stage;
    this.securityGroup = props.securityGroup;
    this.vpc = props.vpc;
    this.datalakeAdminRoleArn = props.datalakeAdminRoleArn;
    this.datalakeDbCreatorRoleArn = props.datalakeDbCreatorRoleArn;

    // if data to download into a tier create the download locations
    if (props.pipe.dataSetDropTier) {
      this.downloadLocations[props.pipe.name] = {
        destinationPrefix: props.pipe.destinationPrefix,
        sourceBucketName: props.pipe.s3Properties? props.pipe.s3Properties.sourceBucketName! : undefined,
        sourceKeys: props.pipe.s3Properties ? props.pipe.s3Properties.sourceKeys! : undefined,
        rawBucketName: buildS3BucketName({
          name: props.pipe.name,
          accountId: props.product.accountId,
          resourceUse: 'raw',
          stage: this.stageName,
        }),
        refinedBucketName: buildS3BucketName({
          name: props.pipe.name,
          accountId: props.product.accountId,
          resourceUse: 'refined',
          stage: this.stageName,
        }),
        trustedBucketName: buildS3BucketName({
          name: props.pipe.name,
          accountId: props.product.accountId,
          resourceUse: 'trusted',
          stage: this.stageName,
        }),
        destinationBucketName: buildS3BucketName({
          name: props.pipe.name,
          accountId: props.product.accountId,
          resourceUse: props.pipe.dataSetDropTier == DataTier.RAW ? 'raw' : props.pipe.dataSetDropTier == DataTier.REFINED ? 'refined' : 'trusted',
          stage: this.stageName,
        }),
      };
    }
    this.createBuckets(pipelineStack, props.pipe, props.product);

    const bucketName = this.getDataSetBucketName(props.pipe, props.pipe.dataSetDropTier)!;
    this.addPipeline(pipelineStack, props.pipe, props.product, bucketName);

    // find the correct metadata catalog account
    if (this.lakeKind() === LakeKind.CENTRAL_CATALOG || this.lakeKind() === LakeKind.DATA_PRODUCT_AND_CATALOG) {
      this.createCrawler(pipelineStack, props.pipe, props.database, bucketName);
    }
  }

  protected createCrawler(stack: Stack, pipe: Pipeline, database: Database, bucketName: string): void {
    if (pipe.table !== undefined) return;

    // only create a crawler for the drop location of the data in the data product of the pipeline
    const crawler = new GlueCrawler(stack, `data-lake-crawler-${pipe.name}`, {
      name: buildGlueCrawlerName({
        stage: this.stageName,
        resourceUse: 'crawler',
        name: pipe.name,
      }),
      databaseName: database.databaseName,
      bucketName: bucketName,
      bucketPrefix: pipe.destinationPrefix,
      roleName: buildRoleName({
        stage: this.stageName,
        resourceUse: 'crawler-role',
        name: pipe.name,
      }),
    });

    this.locationRegistry.forEach(r => {
      crawler.node.addDependency(r);
    });
  }

  protected createGlueTable(stack: Stack, pipeline: Pipeline, product: DataProduct, bucketName: string): void {
    if (!pipeline.table) return;

    const table = new GlueTable(stack, `${pipeline.name}-table`, {
      catalogId: pipeline.table.catalogId,
      columns: pipeline.table.columns,
      databaseName: product.databaseName,
      description: pipeline.table.description,
      inputFormat: pipeline.table.inputFormat,
      outputFormat: pipeline.table.outputFormat,
      parameters: pipeline.table.parameters,
      partitionKeys: pipeline.table.partitionKeys,
      s3Location: `s3://${bucketName}/${pipeline.destinationPrefix}`,
      serdeParameters: pipeline.table.serdeParameters,
      serializationLibrary: pipeline.table.serializationLibrary,
      tableName: pipeline.table.tableName,
    });

    table.node.addDependency(product.databaseName);
  }

  // this is a jumbled mess clean up once refecto
  protected createPipelineResources(stack: Stack, pipeline: Pipeline, dataProduct: DataProduct, bucketName: string) {
    switch (pipeline.type) {
      case DataPipelineType.S3: {
        break;
      }
      case DataPipelineType.STREAM: {
        this.addDataStream(stack, pipeline, bucketName);
        break;
      }
      case DataPipelineType.JDBC: {
        this.createJDBCConnection(stack, pipeline);
        break;
      }
    }

    // rethink this whole section
    if (pipeline.job) {
      const jobScript = packageAsset(stack, `${pipeline.name}Script`, pipeline.job.jobScript);

      pipeline.job.jobArgs!['--TempDir'] = `s3://${this.logBucket!.bucketName}/temp/`;
      pipeline.job.jobArgs!['--spark-event-logs-path'] = `s3://${this.logBucket!.bucketName}/logs/`;
      let s3Location = this.getDataSetBucketName(pipeline, pipeline.job.destinationLocation!);

      if (pipeline.job.destinationLocation && s3Location) {
        pipeline.job.jobArgs!['--DESTINATION_BUCKET'] = s3Location;

        const job = new GlueJob(stack, `${pipeline.name}-etl-job`, {
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
            this.logBucket!,
          ],
          writeAccessBuckets: [
            this.logBucket!,
            Bucket.fromBucketName(stack, 'raw-bucket-role', s3Location),
          ],
        });

        new GlueJobOps(stack, `${pipeline.name}-etl-job-ops`, {
          job: job,
        });

        if (pipeline.streamProperties) {
          this.dataStreams[pipeline.name].stream.grantRead(job.role);
        }

        new CfnPermissions(stack, `${pipeline.name}-create-table-perm`, {
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
          new CfnPermissions(stack, `${pipeline.name}-access-table-perm`, {
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
  }

  private addDataStream(stack: Stack, pipeline: Pipeline, bucketName: string) : KinesisStream {
    const schemaName = pipeline.name;
    const dataStreamStack = new NestedStack(stack, `${schemaName}-datastream-stack`);

    if (!pipeline.streamProperties) {
      throw Error("Cannot create a stream pipeline without 'streamProperties'");
    }

    this.dataStreams[pipeline.name] = new KinesisStream(dataStreamStack, 'DataStream', {
      shardCount: 1,
      streamName: pipeline.streamProperties.streamName,
    });

    const deliveryStream = new S3DeliveryStream(dataStreamStack, 'deliveryStream', {
      compression: CompressionType.UNCOMPRESSED,
      kinesisStream: this.dataStreams[pipeline.name].stream,
      s3Bucket: Bucket.fromBucketName(stack, 'get-bucket-for-kinesis', bucketName),
      s3Prefix: pipeline.destinationPrefix,
    });

    new KinesisOps(dataStreamStack, 'kinesis-ops', {
      stream: this.dataStreams[pipeline.name],
      deliveryStream: deliveryStream,
    });

    if (pipeline.streamProperties.lambdaDataGenerator) {
      const dataGeneratorFunction = new Function(dataStreamStack, 'data-generator-function', {
        code: pipeline.streamProperties.lambdaDataGenerator.code,
        handler: pipeline.streamProperties.lambdaDataGenerator.handler,
        timeout: pipeline.streamProperties.lambdaDataGenerator.timeout,
        runtime: pipeline.streamProperties.lambdaDataGenerator.runtime,
        functionName: pipeline.streamProperties.lambdaDataGenerator.functionName,
        environment: {
          KINESIS_STREAM: this.dataStreams[pipeline.name].stream.streamName,
        },
      });

      this.dataStreams[pipeline.name].stream.grantWrite(dataGeneratorFunction);
      const rule = new Rule(stack, 'Rule', {
        schedule: pipeline.streamProperties.lambdaDataGenerator.schedule,
        ruleName: pipeline.streamProperties.lambdaDataGenerator.ruleName,
      });
      rule.addTarget(new LambdaFunction(dataGeneratorFunction));
    }
    return this.dataStreams[pipeline.name];
  }

  public createJDBCConnection(stack: Stack, pipeline:Pipeline) {
    if (this.vpc && this.securityGroup) {
      new Connection(stack, `${pipeline.name}-glue-connection`, {
        type: ConnectionType.JDBC,
        connectionName: `${pipeline.name}-jdbc`,
        description: `JDBC connection for glue to use on pipeline ${pipeline.name}`,
        subnet: this.vpc.isolatedSubnets[0],
        securityGroups: [this.securityGroup],
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

  createBuckets(stack: Stack, pipe: Pipeline, product: DataProduct): void {
    /// This is confusing. Find a way to simplify
    const dataCatalogAccountId = product.dataCatalogAccountId ?
      product.dataCatalogAccountId : product.accountId;
    const crossAccount = product.dataCatalogAccountId ?
      product.dataCatalogAccountId != product.accountId ? true : false : false;

    pipe.tiers.forEach(r => {
      if (this.lakeKind() === LakeKind.DATA_PRODUCT || this.lakeKind() === LakeKind.DATA_PRODUCT_AND_CATALOG) {
        const bucketName = this.getDataSetBucketName(pipe, r)!;

        new DataLakeBucket(stack, `s3-${r}-bucket-${pipe.name}`, {
          bucketName: bucketName,
          dataCatalogAccountId: dataCatalogAccountId,
          logBucket: this.logBucket!,
          crossAccount: crossAccount,
          s3Properties: product.s3BucketProps,
        }).bucket;
      }

      if (this.lakeKind() === LakeKind.CENTRAL_CATALOG || this.lakeKind() === LakeKind.DATA_PRODUCT_AND_CATALOG) {
        if (this.datalakeDbCreatorRoleArn == undefined) throw new Error('Cannot have datalake without Data Lake DB Creator role defined.');

        const name = this.getDataSetBucketName(pipe, r)!.replace(/\W/g, '');
        const lfResource = this.registerDataLakeLocation(stack, this.datalakeDbCreatorRoleArn, name);

        this.locationRegistry.push(lfResource);

        if (this.datalakeAdminRoleArn) {
          this.createDataLocationAccessPermission(stack, `${name}-admin`, this.datalakeAdminRoleArn, name, lfResource);
        }
      }
    });
  }

  private registerDataLakeLocation(stack: Stack, datalakeDbCreatorRoleArn: string, bucketName: string) : CfnResource {
    const dlResource = new CfnResource(stack, `lf-resource-${bucketName}`, {
      resourceArn: `arn:aws:s3:::${bucketName}`,
      useServiceLinkedRole: false,
      roleArn: datalakeDbCreatorRoleArn,
    });
    this.createDataLocationAccessPermission(stack, `${bucketName}-creator`, datalakeDbCreatorRoleArn, bucketName, dlResource);
    return dlResource;
  }

  private createDataLocationAccessPermission(stack: Stack, name: string, roleArn: string, bucketName: string, resource: IDependable): CfnPermissions {
    const perm = new CfnPermissions(stack, `datalake-creator-perm-${name}`, {
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

class DataProductStrategy extends LakeImplStrategy {
  lakeKind(): LakeKind {
    return LakeKind.DATA_PRODUCT;
  }

  addPipeline(stack: Stack, pipeline: Pipeline, dataProduct: DataProduct, bucketName: string): void {
    this.createPipelineResources(stack, pipeline, dataProduct, bucketName);
  }
}

class CentralCatalogStrategy extends LakeImplStrategy {
  lakeKind(): LakeKind {
    return LakeKind.CENTRAL_CATALOG;
  }

  addPipeline(stack: Stack, pipeline: Pipeline, dataProduct: DataProduct, bucketName: string): void {
    if (pipeline.table) {
      this.createGlueTable(stack, pipeline, dataProduct, bucketName);
    }
  }
}

class ConsumerStrategy extends LakeImplStrategy {
  lakeKind(): LakeKind {
    return LakeKind.CONSUMER;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  addPipeline(stack: Stack, pipeline: Pipeline, dataProduct: DataProduct, bucketName: string): void {
    return;
  }
}

class DataProductAndCatalogStrategy extends LakeImplStrategy {
  lakeKind(): LakeKind {
    return LakeKind.DATA_PRODUCT_AND_CATALOG;
  }

  addPipeline(stack: Stack, pipeline: Pipeline, dataProduct: DataProduct, bucketName: string): void {
    this.createPipelineResources(stack, pipeline, dataProduct, bucketName);
    if (pipeline.table) {
      this.createGlueTable(stack, pipeline, dataProduct, bucketName);
    }
  }
}

export class LakeStrategyFactory {
  public static getLakeStrategy(lakeKind: LakeKind): LakeImplStrategy {
    return LakeStrategyFactory.strategies[lakeKind];
  }

  private static strategies = {
    [LakeKind.DATA_PRODUCT]: new DataProductStrategy(),
    [LakeKind.CENTRAL_CATALOG]: new CentralCatalogStrategy(),
    [LakeKind.CONSUMER]: new ConsumerStrategy(),
    [LakeKind.DATA_PRODUCT_AND_CATALOG]: new DataProductAndCatalogStrategy(),
  };
}
