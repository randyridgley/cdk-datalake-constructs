import { DataPipelineType } from '../../src/data-lake';
import { Pipeline } from '../../src/pipeline';
import { buildS3BucketName } from '../../src/utils';

export function GreenPipeline(accountId: string, dataCatalogOwnerAccountId: string, region: string, stage: string) {
  return new Pipeline({
    type: DataPipelineType.S3,
    name: 'taxi-green',
    destinationPrefix: 'raw/green/',
    destinationBucketName: buildS3BucketName({
      name: 'taxi-green',
      accountId: accountId,
      region: region,
      resourceUse: 'data',
      stage: stage,
    }),
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