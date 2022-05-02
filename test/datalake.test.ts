import { Template } from 'aws-cdk-lib/assertions';
import { App, Aspects } from 'aws-cdk-lib/core';
import { AwsSolutionsChecks } from 'cdk-nag';
import { DataLake, Stage, Pipeline, DataProduct } from '../src';
import * as pipelines from '../test/pipelines';
import { CdkTestStack } from './test-stack';

const stage = Stage.ALPHA;
const dataProductAccountId = '123456789012';

const pipes: Array<Pipeline> = [
  pipelines.ReviewsPipeline(),
  pipelines.IoTDataPipeline(stage),
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

describe('cdk-nag AwsSolutions Pack', () => {
  let stack: CdkTestStack;
  let app: App;
  let datalake: DataLake;

  beforeAll(() => {
    // GIVEN
    app = new App();
    stack = new CdkTestStack(app, 'test', {
      dataProducts: dataProducts,
      stage: stage,
    });
    datalake = stack.datalake;
    // WHEN
    Aspects.of(stack).add(new AwsSolutionsChecks({ verbose: true }));
  });

  test('Check Resources', () => {
    expect(datalake.stageName).toMatch(Stage.ALPHA);
    expect(Object.keys(datalake.dataSets).length).toEqual(4);
    expect(Object.keys(datalake.dataStreams).length).toEqual(1);
    // expect(stack).toHaveResource('AWS::S3::Bucket');
    // expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
  // THEN
  // test('No unsuppressed Warnings', () => {
  //   const warnings = Annotations.fromStack(stack).findWarning(
  //     '*',
  //     Match.stringLikeRegexp('AwsSolutions-.*')
  //   );
  //   if(warnings.length > 0) {
  //     warnings.forEach(e => console.log(e['entry']));
  //   }
  //   expect(warnings).toHaveLength(0);
  // });

  // test('No unsuppressed Errors', () => {
  //   const errors = Annotations.fromStack(stack).findError(
  //     '*',
  //     Match.stringLikeRegexp('AwsSolutions-.*')
  //   );
  //   if(errors.length > 0) {
  //     errors.forEach(e => console.log(e.id + '\n'  + e['entry']['data']));
  //   }
  //   expect(errors).toHaveLength(0);
  // });
  it('Should match snapshot', () => {
    // When
    const t = Template.fromStack(stack);
    expect(t).toMatchSnapshot();
  });
});