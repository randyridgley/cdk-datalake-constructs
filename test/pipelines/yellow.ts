
import { DataPipelineType, DataTier } from '../../src/global/enums';
import { Pipeline } from '../../src/pipeline';

export function YellowPipeline() {
  return new Pipeline({
    type: DataPipelineType.S3,
    name: 'taxi-yellow',
    destinationPrefix: 'yellow/',
    dataSetDropTier: DataTier.RAW,
    s3Properties: {
      sourceBucketName: 'nyc-tlc',
      sourceKeys: [
        'trip data/yellow_tripdata_2020-11.csv',
        'trip data/yellow_tripdata_2020-12.csv',
      ],
    },
  });
}
