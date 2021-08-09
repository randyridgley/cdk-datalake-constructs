import { Stack } from '@aws-cdk/core';
import { DataLake, Stage, Pipeline, DataProduct } from '../src';
import * as pipelines from '../test/pipelines';
import '@aws-cdk/assert/jest';

const region = 'us-east-1';
const stage = Stage.ALPHA;
const dataProductAccount = '123456789012';
const centralCatalogAccount = '098765432109';

const pipes: Array<Pipeline> = [
  pipelines.ReviewsPipeline(dataProductAccount, centralCatalogAccount, region, stage),
  pipelines.IoTDataPipeline(dataProductAccount, centralCatalogAccount, region, stage),
];

const taxiPipes: Array<Pipeline> = [
  pipelines.YellowPipeline(dataProductAccount, centralCatalogAccount, region, stage),
  pipelines.GreenPipeline(dataProductAccount, centralCatalogAccount, region, stage),
];

const dataProducts: Array<DataProduct> = [{
  pipelines: pipes,
  accountId: dataProductAccount,
  databaseName: 'data-product',
},
{
  pipelines: taxiPipes,
  accountId: dataProductAccount,
  databaseName: 'taxi-product',
}];

test('Check Resources', () => {
  const stack = new Stack();
  const datalake = new DataLake(stack, 'datalake', {
    accountId: centralCatalogAccount,
    name: 'test-lake',
    region: region,
    stageName: stage,
    dataProducts: dataProducts,
  });

  expect(datalake.accountId).toMatch(centralCatalogAccount);
  expect(datalake.stageName).toMatch(Stage.ALPHA);
  expect(datalake.region).toMatch(region);
});