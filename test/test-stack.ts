import { Stack, StackProps } from 'aws-cdk-lib';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { DataLake, DataProduct } from '../src';
import { LakeKind, Stage } from '../src/global/enums';

export interface TestStackProps extends StackProps {
  readonly stage: Stage;
  readonly dataProducts?: DataProduct[];
}

export class CdkTestStack extends Stack {
  public readonly datalake: DataLake;

  constructor(scope: Construct, id: string, props: TestStackProps) {
    super(scope, id, props);
    NagSuppressions.addStackSuppressions(this, [
      {
        id: 'AwsSolutions-S1',
        reason: 'Demonstrate a stack level suppression.',
      },
    ]);

    this.datalake = new DataLake(this, 'datalake', {
      name: 'test-lake',
      stageName: props.stage,
      dataProducts: props.dataProducts,
      createDefaultDatabase: true,
      lakeKind: LakeKind.DATA_PRODUCT_AND_CATALOG,
      createAthenaWorkgroup: true,
    });
  }
}
