import * as dl from '@randyridgley/cdk-datalake-constructs'

export function YellowPipeline(accountId: string, dataCatalogOwnerAccountId: string, region: string, stage: string) {
  return new dl.Pipeline({
    type: dl.DataPipelineType.S3,
    name: 'taxi-yellow',
    destinationPrefix: 'raw/yellow/',
    destinationBucketName: 'taxi-yellow-cdk-constructs-bucket',
    s3Properties: {
      sourceBucketName: 'nyc-tlc',
      sourceKeys: [
        'trip data/yellow_tripdata_2020-11.csv',
        'trip data/yellow_tripdata_2020-12.csv',
      ],
    },
    dataCatalogOwner: {
      accountId: dataCatalogOwnerAccountId,
    },
  });
}