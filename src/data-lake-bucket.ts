import * as iam from '@aws-cdk/aws-iam';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';

export interface DataLakeBucketProps {
  readonly bucketName: string;
  readonly dataCatalogAccountId: string;
  readonly logBucket: s3.Bucket;
  readonly crossAccount: boolean;
}

export class DataLakeBucket extends cdk.Construct {
  public readonly bucket: s3.Bucket;

  constructor(scope: cdk.Construct, id: string, props: DataLakeBucketProps) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, 'datalake-bucket', {
      bucketName: props.bucketName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(30),
        },
      ],
      serverAccessLogsBucket: props.logBucket,
    });

    if (props.crossAccount) {
      this.bucket.addToResourcePolicy(
        new iam.PolicyStatement({
          resources: [
            this.bucket.arnForObjects('*'),
            this.bucket.bucketArn,
          ],
          actions: ['s3:List*', 's3:Get*'],
          principals: [
            new iam.ArnPrincipal(`arn:aws:iam::${props.dataCatalogAccountId}:root`),
          ],
        }),
      );
    }
  }
}
