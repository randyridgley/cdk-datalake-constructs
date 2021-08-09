import * as kms from '@aws-cdk/aws-kms';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3sns from '@aws-cdk/aws-s3-notifications';
import * as sns from '@aws-cdk/aws-sns';
import * as cdk from '@aws-cdk/core';

import { S3NotificationProperties, Stage } from '../data-lake';
import { DataLakeBucket } from '../data-lake-bucket';

export interface DataSetProperties {
  readonly dataCatalogAccountId: string;
  readonly destinationBucketName: string;
  readonly destinationPrefix: string;
  readonly encryptionKey?: kms.Key;
  readonly logBucket: s3.Bucket;
  readonly name: string;
  readonly s3NotificationProps?: S3NotificationProperties;
  readonly sourceBucketName?: string;
  readonly sourceKeys?: string[];
  readonly stage: Stage;
  readonly registerCrossAccount: boolean;
}

export interface DataSetResult {
  readonly destinationBucketName?: string;
  readonly destinationPrefix: string;
  readonly sourceBucketName: string;
  readonly sourceKeys: string[];
}

export class DataSet extends cdk.Construct {
  public readonly rawBucket: s3.Bucket;
  public readonly trustedBucket: s3.Bucket;
  public readonly refinedBucket: s3.Bucket;
  public readonly encryptionKey?: kms.Key;
  public readonly dataSetFiles: DataSetResult;
  public s3NotificationTopic?: sns.Topic;

  constructor(scope: cdk.Construct, id: string, props: DataSetProperties) {
    super(scope, id);

    this.rawBucket = new DataLakeBucket(this, `s3-raw-bucket-${props.name}`, {
      bucketName: props.destinationBucketName,
      dataCatalogAccountId: props.dataCatalogAccountId,
      logBucket: props.logBucket,
      crossAccount: props.registerCrossAccount,
    }).bucket;

    this.trustedBucket = new DataLakeBucket(this, `s3-trusted-bucket-${props.name}`, {
      bucketName: props.destinationBucketName,
      dataCatalogAccountId: props.dataCatalogAccountId,
      logBucket: props.logBucket,
      crossAccount: props.registerCrossAccount,
    }).bucket;

    this.refinedBucket = new DataLakeBucket(this, `s3-refined-bucket-${props.name}`, {
      bucketName: props.destinationBucketName,
      dataCatalogAccountId: props.dataCatalogAccountId,
      logBucket: props.logBucket,
      crossAccount: props.registerCrossAccount,
    }).bucket;

    this.dataSetFiles = {
      destinationPrefix: props.destinationPrefix,
      destinationBucketName: this.rawBucket.bucketName,
      sourceBucketName: props.sourceBucketName!,
      sourceKeys: props.sourceKeys!,
    };

    if (props.s3NotificationProps) {
      this.createS3NotificationTopic(props.s3NotificationProps, this.rawBucket);
      this.createS3NotificationTopic(props.s3NotificationProps, this.trustedBucket);
      this.createS3NotificationTopic(props.s3NotificationProps, this.refinedBucket);
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