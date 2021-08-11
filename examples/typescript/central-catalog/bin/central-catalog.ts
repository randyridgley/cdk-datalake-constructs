#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { DataCentralStack } from '../lib/data-central-stack';
import { DataProductStack } from '../lib/data-product-stack';
import { DataConsumerStack } from '../lib/data-consumer-stack';

import * as pipelines from '../../../../test/pipelines';
import * as dl from '@cdk-7layer-constructs/datalake-constructs';

const app = new cdk.App();
const region = app.node.tryGetContext('region')
const lakeAccountId = app.node.tryGetContext('lakeAccountId')
const centralAccountId = app.node.tryGetContext('centralAccountId')
const consumerAccountId = app.node.tryGetContext('consumerAccountId')
const stage = dl.Stage.PROD // pass in a var

const pipes: Array<dl.Pipeline> = [
  pipelines.ReviewsPipeline(lakeAccountId, centralAccountId, region, stage),
  pipelines.IoTDataPipeline(lakeAccountId, centralAccountId, region, stage)
]

const taxiPipes: Array<dl.Pipeline> = [
  pipelines.YellowPipeline(lakeAccountId, centralAccountId, region, stage),
  pipelines.GreenPipeline(lakeAccountId, centralAccountId, region, stage),
]

const dataProducts: Array<dl.DataProduct> = [{
  pipelines: pipes,
  accountId: lakeAccountId,
  databaseName: 'data-product'
},
{
  pipelines: taxiPipes,
  accountId: lakeAccountId,
  databaseName: 'taxi-product'
}]

// Central catalog stack
new DataCentralStack(app, 'DataCentralStack', {
  env: {
    region: region,
    account: centralAccountId
  },  
  lakeName: 'central-lake',
  stageName: stage,
  policyTags: {
    "admin_andon": "true,false",
    "classification": "public,confidential,highlyconfidential,restricted,critical",
    "owner": "product,central,consumer"
  },  
  crossAccountAccess: {
    consumerAccountIds: [consumerAccountId, lakeAccountId],
    producerAccountId: centralAccountId,
    region: region,    
  },
  dataProducts: dataProducts,
});

// Data Product stack containing all ETL and S3 data
new DataProductStack(app, 'DataProductStack', {
  env: {
    region: region,
    account: lakeAccountId
  },
  lakeName: 'product-lake',
  stageName: stage,
  dataProducts: dataProducts,
});

// Consumer stack for all compute made available through LF
new DataConsumerStack(app, 'DataConsumerStack', {  
  env: {
    region: region,
    account: consumerAccountId
  },
  lakeName: 'consumer-lake',
  stageName: stage,
  policyTags: {
    "access": "analyst,engineer,marketing"
  },    
});
