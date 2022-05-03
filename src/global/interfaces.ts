export interface DataSetResult {
  readonly destinationPrefix: string;
  readonly sourceBucketName: string | undefined;
  readonly sourceKeys: string[] | undefined;
  readonly rawBucketName: string;
  readonly trustedBucketName: string;
  readonly refinedBucketName: string;
  readonly destinationBucketName: string;
}
