export interface DataSetResult {
  readonly destinationBucketName?: string;
  readonly destinationPrefix: string;
  readonly sourceBucketName: string | undefined;
  readonly sourceKeys: string[] | undefined;
}
