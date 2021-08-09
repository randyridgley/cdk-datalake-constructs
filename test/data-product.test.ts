import { Pipeline, DataProduct, Stage } from '../src';
import * as pipelines from '../test/pipelines';

const region = 'us-east-1';
const stage = Stage.ALPHA;
const dataProductAccount = '123456789012';
const centralCatalogAccount = '098765432109';
const databaseName = 'data-product';

const taxiPipes: Array<Pipeline> = [
  pipelines.YellowPipeline(dataProductAccount, centralCatalogAccount, region, stage),
  pipelines.GreenPipeline(dataProductAccount, centralCatalogAccount, region, stage),
];

const dataProducts: Array<DataProduct> = [{
  pipelines: taxiPipes,
  accountId: dataProductAccount,
  databaseName: databaseName,
}];

test('Check Resources', () => {
  expect(dataProducts[0].pipelines.length).toEqual(2);
  expect(dataProducts[0].accountId).toMatch(dataProductAccount);
  expect(dataProducts[0].databaseName).toMatch(databaseName);
});