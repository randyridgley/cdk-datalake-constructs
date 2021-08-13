import * as s3 from '@aws-cdk/aws-s3';
import { Asset } from '@aws-cdk/aws-s3-assets';
import * as cdk from '@aws-cdk/core';
import { DataSetLocation } from './data-lake';
import { DataSet } from './data-sets/data-set';

export function notUndefined<T>(obj: T | undefined): obj is T {
  return obj !== undefined;
}

export interface NameBuilderParameters {
  readonly name: string;
  readonly resourceUse?: string;
  readonly stage?: string;
  readonly region?: string;
  readonly accountId?: string;
}

export function buildUniqueName(props: NameBuilderParameters, maxLength: number): string {
  const baseString = [props.name, props.resourceUse, props.stage, props.region, props.accountId]
    .filter(r => r != undefined)
    .join('-')
    .substring(0, maxLength);

  return baseString.toLowerCase();
}

export function buildS3BucketName(props: NameBuilderParameters): string {
  return buildUniqueName(props, 63).replace(/[^a-z0-9\-.]/g, '-');
}

export function buildKinesisApplicationName(props: NameBuilderParameters): string {
  return buildUniqueName(props, 128);
}

export function buildKinesisStreamName(props: NameBuilderParameters): string {
  return buildUniqueName(props, 128);
}

export function buildQueueName(props: NameBuilderParameters): string {
  return buildUniqueName(props, 80);
}

export function buildLambdaFunctionName(props: NameBuilderParameters): string {
  return buildUniqueName(props, 64);
}

export function buildGlueJobName(props: NameBuilderParameters): string {
  return buildUniqueName(props, 60);
}

export function buildGlueCrawlerName(props: NameBuilderParameters): string {
  return buildUniqueName(props, 60);
}

export function buildGlueEndpointName(props: NameBuilderParameters): string {
  return buildUniqueName(props, 60);
}

export function buildStateMachineName(props: NameBuilderParameters): string {
  return buildUniqueName(props, 80);
}

export function buildEventRuleName(props: NameBuilderParameters): string {
  return buildUniqueName(props, 64);
}

export function buildDynamoDBTableName(props: NameBuilderParameters): string {
  return buildUniqueName(props, 255);
}

export function buildS3BucketArn(props: NameBuilderParameters): string {
  const bucketName = buildS3BucketName(props);
  return `arn:aws:s3:::${bucketName}`;
}

export function buildRoleName(props: NameBuilderParameters): string {
  return buildUniqueName(props, 64);
}

export function buildRoleArn(props: NameBuilderParameters): string {
  const roleName = buildRoleName(props);
  return `arn:aws:iam::${props.accountId}:role/${roleName}`;
}

export function sanitizeStackName(name: string) {
  return name.replace(/[^a-zA-Z0-9]/g, '-');
}

export function buildPolicyStatementId(name: string, service: string, accessType: string): string {
  return `${name}-${service}-${accessType}-access`;
}

export function toS3Path(asset: Asset): string {
  return `s3://${asset.s3BucketName}/${asset.s3ObjectKey}`;
}

export function packageAsset (scope: cdk.Construct, id: string, projectRelativePath: string): Asset {
  return new Asset(scope, id, { path: projectRelativePath });
};

export function getDataSetBucket(dataSetLocation: DataSetLocation, dataSet: DataSet) : s3.Bucket {
  return dataSetLocation == DataSetLocation.RAW ? dataSet.rawBucket :
    dataSetLocation == DataSetLocation.REFINED ? dataSet.refinedBucket :
      dataSet.trustedBucket;
}