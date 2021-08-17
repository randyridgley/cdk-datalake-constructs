import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { Pipeline } from './pipeline';

export interface DataProductProperties {
  readonly accountId: string;
  readonly dataCatalogAccountId?: string;
  readonly databaseName: string;
  readonly pipelines: Pipeline[];
  readonly s3BucketProps?: s3.BucketProps;
}

export class DataProduct {
  readonly accountId: string
  readonly dataCatalogAccountId?: string;
  readonly databaseName: string
  readonly pipelines: Pipeline[]
  readonly s3BucketProps?: s3.BucketProps

  constructor(props: DataProductProperties) {
    this.accountId = props.accountId;
    this.dataCatalogAccountId = props.dataCatalogAccountId;
    this.databaseName = props.databaseName;
    this.pipelines = props.pipelines;

    if (props.s3BucketProps) {
      this.s3BucketProps = props.s3BucketProps;
    } else {
      this.s3BucketProps = {
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        lifecycleRules: [
          {
            expiration: cdk.Duration.days(30),
          },
        ],
      };
    }
  }
}