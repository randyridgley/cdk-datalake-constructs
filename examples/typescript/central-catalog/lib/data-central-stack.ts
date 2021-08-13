import * as cdk from '@aws-cdk/core';
import * as glue from '@aws-cdk/aws-glue';
import * as s3 from '@aws-cdk/aws-s3';

import * as dl from '@randyridgley/cdk-datalake-constructs';

export interface DataCentralStackProps extends cdk.StackProps {
  readonly lakeName: string;
  readonly policyTags: { [name: string]: string }
  readonly stageName: dl.Stage;
  readonly crossAccountAccess?: dl.CrossAccountProperties
  readonly dataProducts: dl.DataProduct[]
}

export interface ManagedDataSet {
  ownerAccountId: string,
  ownerRegion: string,
  pipelines: dl.Pipeline[]
}

export class DataCentralStack extends cdk.Stack {
  public readonly database: glue.Database;
  public readonly blueprintBucket: s3.Bucket;
  public readonly dataProducts: dl.DataProduct[]

  constructor(scope: cdk.Construct, id: string, props: DataCentralStackProps) {
    super(scope, id, props);

    const region = cdk.Stack.of(this).region;
    const accountId = cdk.Stack.of(this).account;
  
    new dl.DataLake(this, 'CentralDataLake', {
      name: props.lakeName,
      accountId: accountId,
      region: region,
      policyTags: props.policyTags,
      stageName: props.stageName,
      crossAccount: props.crossAccountAccess ? props.crossAccountAccess : undefined,
      dataProducts: props.dataProducts,
      createDefaultDatabase: true
    });
  }
}
