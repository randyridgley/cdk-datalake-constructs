import { App, Stack } from '@aws-cdk/core';
import { DataLake, Stage, Pipeline, DataProduct } from '../src';
import * as pipelines from '../test/pipelines';
import '@aws-cdk/assert/jest';

const region = 'us-east-1';
const stage = Stage.ALPHA;
const dataProductAccountId = '123456789012';

const pipes: Array<Pipeline> = [
  pipelines.ReviewsPipeline(),
  pipelines.IoTDataPipeline(dataProductAccountId, region, stage),
];

const taxiPipes: Array<Pipeline> = [
  pipelines.YellowPipeline(),
  pipelines.GreenPipeline(),
];

const dataProducts: Array<DataProduct> = [{
  pipelines: pipes,
  accountId: dataProductAccountId,
  databaseName: 'data-product',
},
{
  pipelines: taxiPipes,
  accountId: dataProductAccountId,
  databaseName: 'taxi-product',
}];

test('Check Resources', () => {
  const app = new App();
  const stack = new Stack(app, 'testStack');

  const datalake = new DataLake(stack, 'datalake', {
    accountId: dataProductAccountId,
    name: 'test-lake',
    region: region,
    stageName: stage,
    dataProducts: dataProducts,
    createDefaultDatabase: true,
  });

  expect(datalake.accountId).toMatch(dataProductAccountId);
  expect(datalake.stageName).toMatch(Stage.ALPHA);
  expect(datalake.region).toMatch(region);
  expect(Object.keys(datalake.dataSets).length).toEqual(4);
  expect(Object.keys(datalake.dataStreams).length).toEqual(1);

  expect(stack).toHaveResource('AWS::S3::Bucket');
});