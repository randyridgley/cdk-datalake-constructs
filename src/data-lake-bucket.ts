// import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface DataLakeBucketProps {
  readonly bucketName: string;
  readonly dataCatalogAccountId: string;
  readonly logBucket: s3.Bucket;
  readonly crossAccount: boolean;
  readonly s3Properties: s3.BucketProps | undefined;
}

export class DataLakeBucket extends Construct {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: DataLakeBucketProps) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, 'datalake-bucket', {
      bucketName: props.bucketName,
      ...props.s3Properties,
      serverAccessLogsBucket: props.logBucket,
    });

    // if (props.crossAccount) {
    //   // TODO: revisit this bucket policy for cross account access.
    //   this.bucket.addToResourcePolicy(
    //     new iam.PolicyStatement({
    //       resources: [
    //         this.bucket.arnForObjects('*'),
    //         this.bucket.bucketArn,
    //       ],
    //       actions: ['s3:List*', 's3:Get*'],
    //       principals: [
    //         new iam.ArnPrincipal(`arn:aws:iam::${props.dataCatalogAccountId}:root`),
    //       ],
    //     }),
    //   );
    // }
  }
}
