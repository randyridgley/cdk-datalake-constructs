import * as kms from '@aws-cdk/aws-kms';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3sns from '@aws-cdk/aws-s3-notifications';
import * as sns from '@aws-cdk/aws-sns';
import * as cdk from '@aws-cdk/core';

import { DataSetLocation, S3NotificationProperties, Stage } from '../data-lake';
import { DataLakeBucket } from '../data-lake-bucket';
import { DataProduct } from '../data-product';
import { Pipeline } from '../pipeline';
import { buildS3BucketName, getDataSetBucketName } from '../utils';

export interface DataSetProperties {
  readonly encryptionKey?: kms.Key;
  readonly logBucket: s3.Bucket;
  readonly stage: Stage;
  readonly region: string;
  readonly accountId: string;
  readonly pipeline: Pipeline;
  readonly dataProduct: DataProduct;
}

export interface DataSetResult {
  readonly destinationBucketName?: string;
  readonly destinationPrefix: string;
  readonly sourceBucketName: string | undefined;
  readonly sourceKeys: string[] | undefined;
}

export class DataSet extends cdk.Construct {
  public readonly name: string
  public readonly dropLocation?: DataSetLocation;
  public readonly rawBucketName: string;
  public readonly trustedBucketName: string;
  public readonly refinedBucketName: string;
  public readonly encryptionKey?: kms.Key;
  public readonly downloadLocations?: DataSetResult;
  public s3NotificationTopic?: sns.Topic;
  public readonly pipeline: Pipeline;
  public readonly dataProduct: DataProduct;

  constructor(scope: cdk.Construct, id: string, props: DataSetProperties) {
    super(scope, id);

    this.name = props.pipeline.name;
    this.dropLocation = props.pipeline.dataSetDropLocation;
    this.pipeline = props.pipeline;
    this.dataProduct = props.dataProduct;

    this.rawBucketName = buildS3BucketName({
      name: props.pipeline.name,
      accountId: this.dataProduct.accountId,
      region: props.region,
      resourceUse: 'raw',
      stage: props.stage,
    });

    this.trustedBucketName = buildS3BucketName({
      name: props.pipeline.name,
      accountId: this.dataProduct.accountId,
      region: props.region,
      resourceUse: 'trusted',
      stage: props.stage,
    });

    this.refinedBucketName = buildS3BucketName({
      name: props.pipeline.name,
      accountId: this.dataProduct.accountId,
      region: props.region,
      resourceUse: 'refined',
      stage: props.stage,
    });

    const dataCatalogAccountId = props.dataProduct.dataCatalogAccountId ?
      props.dataProduct.dataCatalogAccountId : props.dataProduct.accountId;
    const crossAccount = props.dataProduct.dataCatalogAccountId ?
      props.dataProduct.dataCatalogAccountId != props.dataProduct.accountId ? true : false : false;

    // only create the buckets in the data owner account if using in multi account scenario
    if (props.accountId == props.dataProduct.accountId) {
      const rawBucket = new DataLakeBucket(this, `s3-raw-bucket-${props.pipeline.name}`, {
        bucketName: this.rawBucketName,
        dataCatalogAccountId: dataCatalogAccountId,
        logBucket: props.logBucket,
        crossAccount: crossAccount,
      }).bucket;

      const trustedBucket = new DataLakeBucket(this, `s3-trusted-bucket-${props.pipeline.name}`, {
        bucketName: this.trustedBucketName,
        dataCatalogAccountId: dataCatalogAccountId,
        logBucket: props.logBucket,
        crossAccount: crossAccount,
      }).bucket;

      const refinedBucket = new DataLakeBucket(this, `s3-refined-bucket-${props.pipeline.name}`, {
        bucketName: this.refinedBucketName,
        dataCatalogAccountId: dataCatalogAccountId,
        logBucket: props.logBucket,
        crossAccount: crossAccount,
      }).bucket;

      if (props.pipeline.s3NotificationProps) {
        this.createS3NotificationTopic(props.pipeline.s3NotificationProps, rawBucket);
        this.createS3NotificationTopic(props.pipeline.s3NotificationProps, trustedBucket);
        this.createS3NotificationTopic(props.pipeline.s3NotificationProps, refinedBucket);
      }

      if (this.dropLocation) {
        this.downloadLocations = {
          destinationPrefix: props.pipeline.destinationPrefix,
          destinationBucketName: getDataSetBucketName(this.dropLocation, this),
          sourceBucketName: props.pipeline.s3Properties? props.pipeline.s3Properties.sourceBucketName! : undefined,
          sourceKeys: props.pipeline.s3Properties ? props.pipeline.s3Properties.sourceKeys! : undefined,
        };
      }
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