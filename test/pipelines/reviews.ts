import { DataPipelineType } from '../../src/data-lake';
import { Pipeline } from '../../src/pipeline';
import { buildS3BucketName } from '../../src/utils';

export function ReviewsPipeline(accountId: string, dataCatalogOwnerAccountId: string, region: string, stage: string) {
  return new Pipeline({
    type: DataPipelineType.S3,
    name: 'reviews',
    destinationPrefix: 'raw/reviews/',
    destinationBucketName: buildS3BucketName({
      name: 'reviews',
      accountId: accountId,
      region: region,
      resourceUse: 'data',
      stage: stage,
    }),
    s3Properties: {
      sourceBucketName: 'amazon-reviews-pds',
      sourceKeys: [
        'parquet/product_category=Toys/part-00000-495c48e6-96d6-4650-aa65-3c36a3516ddd.c000.snappy.parquet',
        'parquet/product_category=Toys/part-00001-495c48e6-96d6-4650-aa65-3c36a3516ddd.c000.snappy.parquet',
      ],
    },
    dataCatalogOwner: {
      accountId: dataCatalogOwnerAccountId,
    },
  });
}