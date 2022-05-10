import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { IDependable } from 'constructs';
import { Pipeline } from './pipeline';

export interface DataProductProperties {
  readonly accountId: string;
  readonly dataCatalogAccountId?: string;
  readonly databaseName: string;
  readonly pipelines: Pipeline[];
  readonly s3BucketProps?: s3.BucketProps;
}

export class DataProduct implements IDependable {
  readonly accountId: string;
  readonly dataCatalogAccountId?: string;
  readonly databaseName: string;
  readonly pipelines: Pipeline[];
  readonly s3BucketProps?: s3.BucketProps;

  constructor(props: DataProductProperties) {
    this.accountId = props.accountId;
    this.dataCatalogAccountId = props.dataCatalogAccountId;
    this.databaseName = props.databaseName;
    this.pipelines = props.pipelines;

    if (props.s3BucketProps) {
      this.s3BucketProps = props.s3BucketProps;
    } else {
      this.s3BucketProps = {
        removalPolicy: RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        lifecycleRules: [
          {
            expiration: Duration.days(30),
          },
        ],
      };
    }
  }
}