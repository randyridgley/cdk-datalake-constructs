import { DataPipelineType, DataSetLocation } from '../../src/data-lake';
import { Pipeline } from '../../src/pipeline';

export function GreenPipeline() {
  return new Pipeline({
    type: DataPipelineType.S3,
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
  });
}
