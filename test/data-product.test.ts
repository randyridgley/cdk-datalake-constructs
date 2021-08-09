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

test('Check Resources', () => {
  const dataProduct = new DataProduct({
    pipelines: taxiPipes,
    accountId: dataProductAccount,
    databaseName: databaseName,
  });
  expect(dataProduct.pipelines.length).toEqual(2);
  expect(dataProduct.accountId).toMatch(dataProductAccount);
  expect(dataProduct.databaseName).toMatch(databaseName);
});