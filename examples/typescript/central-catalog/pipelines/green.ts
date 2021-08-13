import * as dl from '@randyridgley/cdk-datalake-constructs'
import { DataSetLocation } from '@randyridgley/cdk-datalake-constructs';

export function GreenPipeline(accountId: string, dataCatalogOwnerAccountId: string, region: string, stage: string) {
  return new dl.Pipeline({
    type: dl.DataPipelineType.S3,
    name: 'taxi-green',
    destinationPrefix: 'green/',
    dataSetDropLocation: DataSetLocation.RAW,
    s3Properties: {
      sourceBucketName: 'nyc-tlc',
      sourceKeys: [
        'trip data/green_tripdata_2020-11.csv',
        'trip data/green_tripdata_2020-12.csv',
      ],
    },
    dataCatalogOwner: {
      accountId: dataCatalogOwnerAccountId,
    },
  });
}