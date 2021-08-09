import { DataPipelineType } from '../../src/data-lake';
import { Pipeline } from '../../src/pipeline';
import { buildS3BucketName } from '../../src/utils';

export function YellowPipeline(accountId: string, dataCatalogOwnerAccountId: string, region: string, stage: string) {
  return new Pipeline({
    type: DataPipelineType.S3,
    name: 'taxi-yellow',
    destinationPrefix: 'raw/yellow/',
    destinationBucketName: buildS3BucketName({
      name: 'taxi-yellow',
      accountId: accountId,
      region: region,
      resourceUse: 'data',
      stage: stage,
    }),
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