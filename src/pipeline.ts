import * as events from 'aws-cdk-lib/aws-events';
import * as glue from 'aws-cdk-lib/aws-glue';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib/core';

import { GlueJobType, GlueVersion, GlueWorkerType } from './etl/glue-job';
import { DataPipelineType, DataTier } from './global/enums';

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
  readonly destinationLocation?: DataTier;
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

export interface PipelineProperties {
  readonly type: DataPipelineType;
  readonly name: string;
  readonly destinationPrefix: string;
  readonly dataSetDropTier: DataTier;
  readonly s3Properties?: S3Properties;
  readonly streamProperties?: StreamProperties;
  readonly jdbcProperties?: JDBCProperties;
  readonly table? : TableProps;
  readonly job?: JobProperties;
  readonly tiers?: DataTier[];
}

export interface DataCatalogOwner {
  readonly accountId: string;
}

export class Pipeline {
  public readonly type: DataPipelineType;
  public readonly name: string;
  public readonly destinationPrefix: string;
  public readonly dataSetDropTier: DataTier;
  public readonly s3Properties?: S3Properties;
  public readonly streamProperties?: StreamProperties;
  public readonly jdbcProperties?: JDBCProperties;
  public readonly table? : TableProps;
  public readonly job?: JobProperties;
  public readonly tiers: DataTier[];

  constructor(props: PipelineProperties) {
    this.type = props.type;
    this.name = props.name;
    this.dataSetDropTier = props.dataSetDropTier;
    this.destinationPrefix = props.destinationPrefix;
    this.jdbcProperties = props.jdbcProperties ? props.jdbcProperties : undefined;
    this.job = props.job ? props.job : undefined;
    this.s3Properties = props.s3Properties ? props.s3Properties : undefined;
    this.streamProperties = props.streamProperties ? props.streamProperties : undefined;
    this.table = props.table ? props.table : undefined;
    this.tiers = props.tiers ? props.tiers : [DataTier.RAW];
  }
}