import * as cdk from '@aws-cdk/core';
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
  constructor(scope: cdk.Construct, id: string, props: DataCentralStackProps) {
    super(scope, id, props);
    let region = cdk.Stack.of(this).region;
    let accountId = cdk.Stack.of(this).account;

    if(props.env) {
      region = props.env.region!
      accountId = props.env.account!
    }
  
    new dl.DataLake(this, 'CentralDataLake', {
      name: props.lakeName,
      accountId: accountId,
      region: region,
      stageName: props.stageName,
      policyTags: props.policyTags,      
      crossAccountAccess: props.crossAccountAccess ? props.crossAccountAccess : undefined,
      dataProducts: props.dataProducts,
      createDefaultDatabase: true
    });
  }
}
