import * as events from '@aws-cdk/aws-events';
import * as glue from '@aws-cdk/aws-glue';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';

import { GlueJobType, GlueVersion, GlueWorkerType } from './etl/glue-job';

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

export enum DataSetLocation {
  RAW = 'raw',
  TRUSTED = 'trusted',
  REFINED = 'refined'
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
  readonly destinationLocation?: DataSetLocation;
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
  readonly dataSetDropLocation: DataSetLocation;
  readonly s3Properties?: S3Properties;
  readonly streamProperties?: StreamProperties;
  readonly jdbcProperties?: JDBCProperties;
  readonly s3NotificationProps?: S3NotificationProperties;
  readonly table? : TableProps;
  readonly job?: JobProperties;
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

export class Pipeline {
  public readonly type: DataPipelineType
  public readonly name: string
  public readonly destinationPrefix: string
  public readonly dataSetDropLocation: DataSetLocation
  public readonly s3Properties?: S3Properties
  public readonly streamProperties?: StreamProperties
  public readonly jdbcProperties?: JDBCProperties
  public readonly s3NotificationProps?: S3NotificationProperties
  public readonly table? : TableProps
  public readonly job?: JobProperties

  constructor(props: PipelineProperties) {
    this.type = props.type;
    this.name = props.name;
    this.dataSetDropLocation = props.dataSetDropLocation;
    this.destinationPrefix = props.destinationPrefix;
    this.jdbcProperties = props.jdbcProperties ? props.jdbcProperties : undefined;
    this.job = props.job ? props.job : undefined;
    this.s3NotificationProps = props.s3NotificationProps ? props.s3NotificationProps : undefined;
    this.s3Properties = props.s3Properties ? props.s3Properties : undefined;
    this.streamProperties = props.streamProperties ? props.streamProperties : undefined;
    this.table = props.table ? props.table : undefined;
  }
}