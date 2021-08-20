# cdk-datalake-constructs  <!-- omit in toc -->

***Very experimental until version 1.0.***
This is my attempt at simplifying deploying various datalake strategies in AWS with the CDK.

[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)  
[![Build](https://github.com/randyridgley/cdk-datalake-constructs/workflows/build/badge.svg)](https://github.com/randyridgley/cdk-datalake-constructs/workflows/build.yml) 
[![Release](https://github.com/randyridgley/cdk-datalake-constructs/workflows/release/badge.svg)](https://github.com/randyridgley/cdk-datalake-constructs/workflows/release.yml)
[![Python](https://img.shields.io/pypi/pyversions/cdk-datalake-constructs)](https://pypi.org) [![pip](https://img.shields.io/badge/pip%20install-cdk--datalake--constructs-blue)](https://pypi.org/project/cdk-datalake-constructs/)  
[![npm version](https://img.shields.io/npm/v/cdk-datalake-constructs)](https://www.npmjs.com/package/@randyridgley/cdk-datalake-constructs) [![pypi version](https://img.shields.io/pypi/v/cdk-datalake-constructs)](https://pypi.org/project/cdk-datalake-constructs/) [![Maven](https://img.shields.io/maven-central/v/io.github.randyridgley/cdk-datalake-constructs)](https://search.maven.org/search?q=a:cdk-datalake-constructs) [![nuget](https://img.shields.io/nuget/v/Cdk.Datalake.Constructs)](https://www.nuget.org/packages/Cdk.Datalake.Constructs/)

**Table of Contents**

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic](#basic)
  - [Data Mesh](#data-mesh)
- [Documentation](#documentation)
  - [Construct API Reference](#construct-api-reference)
- [Supporting this project](#supporting-this-project)
- [License](#license)

## Features

- Easy to Start - Create a Datalake in a few lines.
- Easy to Expand - Expand into multiple accounts and into a data mesh.
- Easy to Admin - Initial governance created on deploy.

## Installation

TypeScript/JavaScript

```sh
$ npm install @randyridgley/cdk-datalake-constructs
```

Python

```sh
$ pip install cdk-datalake-constructs.cdk-datalake-constructs
```

.Net

```sh
$ nuget install CDK.Datalake.Constructs

# See more: https://www.nuget.org/packages/CDK.Datalake.Constructs/
```

## Usage

### Basic

```typescript
import { DataLake } from '@randyridgley/cdk-datalake-constructs';

const taxiPipes: Array<dl.Pipeline> = [
  pipelines.YellowPipeline(),
  pipelines.GreenPipeline(),
]

const dataProducts: Array<dl.DataProduct> = [{
  pipelines: taxiPipes,
  accountId: lakeAccountId,
  dataCatalogAccountId: '123456789012',
  databaseName: 'taxi-product'
}]

// deploy to local account
new dl.DataLake(this, 'LocalDataLake', {
  name: 'data-lake,
  accountId: centralAccountId,
  region: 'us-east-1',
  policyTags: {
    "classification": "public,confidential,highlyconfidential,restricted,critical",
    "owner": "product,central,consumer"
  },
  stageName: Stage.PROD,
  dataProducts: dataProducts,
  createDefaultDatabase: false
});
```

### Data Mesh
You can setup cross account access and pre-created policy tags for TBAC access in Lake Formation

```typescript
const lakeAccountId = app.node.tryGetContext('lakeAccountId')
const centralAccountId = app.node.tryGetContext('centralAccountId')
const consumerAccountId = app.node.tryGetContext('consumerAccountId')

const taxiPipes: Array<dl.Pipeline> = [
  pipelines.YellowPipeline(),
  pipelines.GreenPipeline(),
]

const dataProducts: Array<dl.DataProduct> = [{
  pipelines: taxiPipes,
  accountId: lakeAccountId,
  dataCatalogAccountId: centralAccountId,
  databaseName: 'taxi-product'
}]

// deploy to the central account
new dl.DataLake(this, 'CentralDataLake', {
  name: 'central-lake,
  accountId: centralAccountId,
  region: 'us-east-1',
  policyTags: {
    "classification": "public,confidential,highlyconfidential,restricted,critical",
    "owner": "product,central,consumer"
  },
  stageName: Stage.PROD,
  crossAccount: {
    consumerAccountIds: [consumerAccountId, lakeAccountId],
    dataCatalogOwnerAccountId: centralAccountId,
    region: 'us-east-1', // this is still only single region today    
  },
  dataProducts: dataProducts,
  createDefaultDatabase: true
});

// deploy to the data product account
const datalake = new dl.DataLake(this, 'LocalDataLake', {
  name: 'local-lake',
  accountId: lakeAccountId,
  region: 'us-east-1',
  stageName: Stage.PROD,
  dataProducts: dataProducts,
  createDefaultDatabase: true
});

// Optionally add custom resource to download public data set products
datalake.createDownloaderCustomResource(accountId, region, props.stageName)

// deploy to consumer account
const datalake = new dl.DataLake(this, 'ConsumerDataLake', {
  name: 'consumer-lake',
  accountId: consumerAccountId,
  region: 'us-east-1',
  stageName: Stage.PROD,
  policyTags: {
    "access": "analyst,engineer,marketing"
  },
  createDefaultDatabase: true
});
```

## Documentation

### Construct API Reference

See [API.md](./API.md).


## Supporting this project

I'm working on this project in my free time, if you like my project, or found it helpful and would like to support me any contributions are much appreciated! ❤️

## License

This project is distributed under the [MIT](./LICENSE).

