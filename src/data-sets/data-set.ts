import * as kms from '@aws-cdk/aws-kms';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3sns from '@aws-cdk/aws-s3-notifications';
import * as sns from '@aws-cdk/aws-sns';
import * as cdk from '@aws-cdk/core';

import { DataSetLocation, S3NotificationProperties, Stage } from '../data-lake';
import { DataLakeBucket } from '../data-lake-bucket';
import { Pipeline } from '../pipeline';
import { buildS3BucketName, getDataSetBucket } from '../utils';

export interface DataSetProperties {
  readonly encryptionKey?: kms.Key;
  readonly logBucket: s3.Bucket;
  readonly stage: Stage;
  readonly region: string;
  readonly accountId: string;
  readonly pipeline: Pipeline;
}

export interface DataSetResult {
  readonly destinationBucketName?: string;
  readonly destinationPrefix: string;
  readonly sourceBucketName: string | undefined;
  readonly sourceKeys: string[] | undefined;
}

export class DataSet extends cdk.Construct {
  public readonly name: string
  public readonly dropLocation: DataSetLocation;
  public readonly rawBucket: s3.Bucket;
  public readonly trustedBucket: s3.Bucket;
  public readonly refinedBucket: s3.Bucket;
  public readonly encryptionKey?: kms.Key;
  public readonly dataSetFiles: DataSetResult;
  public s3NotificationTopic?: sns.Topic;
  public readonly pipeline: Pipeline

  constructor(scope: cdk.Construct, id: string, props: DataSetProperties) {
    super(scope, id);

    this.name = props.pipeline.name;
    this.dropLocation = props.pipeline.dataSetDropLocation;
    this.pipeline = props.pipeline;

    const dataCatalogAccountId = props.pipeline.dataCatalogOwner ? props.pipeline.dataCatalogOwner.accountId : props.accountId;
    const registerCrossAccount = props.pipeline.dataCatalogOwner.accountId != props.accountId;

    this.rawBucket = new DataLakeBucket(this, `s3-raw-bucket-${props.pipeline.name}`, {
      bucketName: buildS3BucketName({
        name: props.pipeline.name,
        accountId: props.accountId,
        region: props.region,
        resourceUse: 'raw',
        stage: props.stage,
      }),
      dataCatalogAccountId: dataCatalogAccountId,
      logBucket: props.logBucket,
      crossAccount: registerCrossAccount,
    }).bucket;

    this.trustedBucket = new DataLakeBucket(this, `s3-trusted-bucket-${props.pipeline.name}`, {
      bucketName: buildS3BucketName({
        name: props.pipeline.name,
        accountId: props.accountId,
        region: props.region,
        resourceUse: 'trusted',
        stage: props.stage,
      }),
      dataCatalogAccountId: dataCatalogAccountId,
      logBucket: props.logBucket,
      crossAccount: registerCrossAccount,
    }).bucket;

    this.refinedBucket = new DataLakeBucket(this, `s3-refined-bucket-${props.pipeline.name}`, {
      bucketName: buildS3BucketName({
        name: props.pipeline.name,
        accountId: props.accountId,
        region: props.region,
        resourceUse: 'refined',
        stage: props.stage,
      }),
      dataCatalogAccountId: dataCatalogAccountId,
      logBucket: props.logBucket,
      crossAccount: registerCrossAccount,
    }).bucket;

    this.dataSetFiles = {
      destinationPrefix: props.pipeline.destinationPrefix,
      destinationBucketName: getDataSetBucket(this.dropLocation, this).bucketName,
      sourceBucketName: props.pipeline.s3Properties? props.pipeline.s3Properties.sourceBucketName! : undefined,
      sourceKeys: props.pipeline.s3Properties ? props.pipeline.s3Properties.sourceKeys! : undefined,
    };

    if (props.pipeline.s3NotificationProps) {
      this.createS3NotificationTopic(props.pipeline.s3NotificationProps, this.rawBucket);
      this.createS3NotificationTopic(props.pipeline.s3NotificationProps, this.trustedBucket);
      this.createS3NotificationTopic(props.pipeline.s3NotificationProps, this.refinedBucket);
    }
  }

  private createS3NotificationTopic(s3NotificationProps: S3NotificationProperties, bucket: s3.Bucket) {
    this.s3NotificationTopic = new sns.Topic(this, 'sns-datalake-notification-topic');
    bucket.addEventNotification(s3NotificationProps.event, new s3sns.SnsDestination(this.s3NotificationTopic), {
      prefix: s3NotificationProps.prefix,
      suffix: s3NotificationProps.suffix,
    });
  }
}