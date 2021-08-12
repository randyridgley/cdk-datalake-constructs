# cdk-datalake-constructs  <!-- omit in toc -->

This is my attempt at simplifying deploying various datalake strategies in AWS with the CDK.

[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)  
[![Build](https://github.com/randyridgley/cdk-datalake-constructs/workflows/build/badge.svg)](https://github.com/randyridgley/cdk-datalake-constructs/workflows/build.yml) 
[![Release](https://github.com/randyridgley/cdk-datalake-constructs/workflows/release/badge.svg)](https://github.com/randyridgley/cdk-datalake-constructs/workflows/release.yml)
[![Python](https://img.shields.io/pypi/pyversions/cdk-datalake-constructs)](https://pypi.org) [![pip](https://img.shields.io/badge/pip%20install-cdk--datalake--constructs-blue)](https://pypi.org/project/cdk-datalake-constructs/)  
[![npm version](https://img.shields.io/npm/v/cdk-datalake-constructs)](https://www.npmjs.com/package/cdk-datalake-constructs) [![pypi version](https://img.shields.io/pypi/v/cdk-datalake-constructs)](https://pypi.org/project/cdk-datalake-constructs/) [![Maven](https://img.shields.io/maven-central/v/io.github.randyridgley/cdk-datalake-constructs)](https://search.maven.org/search?q=a:cdk-comprehend-s3olap) [![nuget](https://img.shields.io/nuget/v/Cdk.Datalake.Constructs)](https://www.nuget.org/packages/Cdk.Datalake.Constructs/)

**Table of Contents**

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic](#basic)
  - [Multi Account](#multi-account)
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

```ts
import { DataLake } from '@cdk-7layer-constructs/cdk-datalake-constructs';

new DataLake(this, 'datalake', {
  name: 'demo-lake'
});
```

### Multi Account

```ts

```

### Data Mesh

```ts


```

## Documentation

### Construct API Reference

See [API.md](./API.md).


## Supporting this project

I'm working on this project in my free time, if you like my project, or found it helpful and would like to support me any contributions are much appreciated! ❤️

## License

This project is distributed under the [MIT](./LICENSE).

