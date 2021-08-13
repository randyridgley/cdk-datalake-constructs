import { DataPipelineType, DataSetLocation } from '../../src/data-lake';
import { Pipeline } from '../../src/pipeline';

export function YellowPipeline(dataCatalogOwnerAccountId: string) {
  return new Pipeline({
    type: DataPipelineType.S3,
    name: 'taxi-yellow',
    destinationPrefix: 'yellow/',
    dataSetDropLocation: DataSetLocation.RAW,
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