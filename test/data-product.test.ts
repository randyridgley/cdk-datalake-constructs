import { Pipeline, DataProduct } from '../src';
import * as pipelines from '../test/pipelines';

const dataProductAccount = '123456789012';
const centralCatalogAccount = '098765432109';
const databaseName = 'data-product';

const taxiPipes: Array<Pipeline> = [
  pipelines.YellowPipeline(centralCatalogAccount),
  pipelines.GreenPipeline(centralCatalogAccount),
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