import { DataPipelineType, DataSetLocation, Pipeline } from '@randyridgley/cdk-datalake-constructs';

export function ReviewsPipeline() {
  return new Pipeline({
    type: DataPipelineType.S3,
    name: 'reviews',
    destinationPrefix: 'reviews/',
    dataSetDropLocation: DataSetLocation.REFINED,
    s3Properties: {
      sourceBucketName: 'amazon-reviews-pds',
      sourceKeys: [
        'parquet/product_category=Toys/part-00000-495c48e6-96d6-4650-aa65-3c36a3516ddd.c000.snappy.parquet',
        'parquet/product_category=Toys/part-00001-495c48e6-96d6-4650-aa65-3c36a3516ddd.c000.snappy.parquet',
      ],
    },
  });
}
