import { DataPipelineType, DataTier } from '../../src/global/enums';
import { Pipeline } from '../../src/pipeline';

export function GreenPipeline() {
  return new Pipeline({
    type: DataPipelineType.S3,
    name: 'taxi-green',
    destinationPrefix: 'green/',
    dataSetDropTier: DataTier.RAW,
    s3Properties: {
      sourceBucketName: 'nyc-tlc',
      sourceKeys: [
        'trip data/green_tripdata_2020-11.csv',
        'trip data/green_tripdata_2020-12.csv',
      ],
    },
  });
}
