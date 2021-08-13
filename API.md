# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### DataLake <a name="@randyridgley/cdk-datalake-constructs.DataLake"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.DataLake.Initializer"></a>

```typescript
import { DataLake } from '@randyridgley/cdk-datalake-constructs'

new DataLake(scope: Construct, id: string, props: DataLakeProperties)
```

##### `scope`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataLakeProperties`](#@randyridgley/cdk-datalake-constructs.DataLakeProperties)

---

#### Methods <a name="Methods"></a>

##### `createDownloaderCustomResource` <a name="@randyridgley/cdk-datalake-constructs.DataLake.createDownloaderCustomResource"></a>

```typescript
public createDownloaderCustomResource(accountId: string, region: string, stageName: string)
```

###### `accountId`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.parameter.accountId"></a>

- *Type:* `string`

---

###### `region`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.parameter.region"></a>

- *Type:* `string`

---

###### `stageName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.parameter.stageName"></a>

- *Type:* `string`

---


#### Properties <a name="Properties"></a>

##### `accountId`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.property.accountId"></a>

- *Type:* `string`

---

##### `athenaWorkgroup`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.property.athenaWorkgroup"></a>

- *Type:* [`@aws-cdk/aws-athena.CfnWorkGroup`](#@aws-cdk/aws-athena.CfnWorkGroup)

---

##### `databases`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.property.databases"></a>

- *Type:* {[ key: string ]: [`@aws-cdk/aws-glue.Database`](#@aws-cdk/aws-glue.Database)}

---

##### `datalakeAdminRole`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.property.datalakeAdminRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

##### `datalakeDbCreatorRole`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.property.datalakeDbCreatorRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

##### `dataSets`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.property.dataSets"></a>

- *Type:* {[ key: string ]: [`@randyridgley/cdk-datalake-constructs.DataSet`](#@randyridgley/cdk-datalake-constructs.DataSet)}

---

##### `dataStreams`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.property.dataStreams"></a>

- *Type:* {[ key: string ]: [`@randyridgley/cdk-datalake-constructs.KinesisStream`](#@randyridgley/cdk-datalake-constructs.KinesisStream)}

---

##### `logBucket`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.property.logBucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---

##### `region`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.property.region"></a>

- *Type:* `string`

---

##### `stageName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.property.stageName"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.Stage`](#@randyridgley/cdk-datalake-constructs.Stage)

---

##### `vpc`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLake.property.vpc"></a>

- *Type:* [`@aws-cdk/aws-ec2.Vpc`](#@aws-cdk/aws-ec2.Vpc)

---


### DataLakeAdministrator <a name="@randyridgley/cdk-datalake-constructs.DataLakeAdministrator"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.DataLakeAdministrator.Initializer"></a>

```typescript
import { DataLakeAdministrator } from '@randyridgley/cdk-datalake-constructs'

new DataLakeAdministrator(scope: Construct, id: string, props: DataLakeAdministratorProps)
```

##### `scope`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeAdministrator.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeAdministrator.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeAdministrator.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataLakeAdministratorProps`](#@randyridgley/cdk-datalake-constructs.DataLakeAdministratorProps)

---



#### Properties <a name="Properties"></a>

##### `role`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeAdministrator.property.role"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---


### DataLakeAnalyst <a name="@randyridgley/cdk-datalake-constructs.DataLakeAnalyst"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.DataLakeAnalyst.Initializer"></a>

```typescript
import { DataLakeAnalyst } from '@randyridgley/cdk-datalake-constructs'

new DataLakeAnalyst(scope: Construct, id: string, props: DataLakeAnalystProps)
```

##### `scope`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeAnalyst.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeAnalyst.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeAnalyst.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataLakeAnalystProps`](#@randyridgley/cdk-datalake-constructs.DataLakeAnalystProps)

---



#### Properties <a name="Properties"></a>

##### `user`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeAnalyst.property.user"></a>

- *Type:* [`@aws-cdk/aws-iam.User`](#@aws-cdk/aws-iam.User)

---


### DataLakeBucket <a name="@randyridgley/cdk-datalake-constructs.DataLakeBucket"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.DataLakeBucket.Initializer"></a>

```typescript
import { DataLakeBucket } from '@randyridgley/cdk-datalake-constructs'

new DataLakeBucket(scope: Construct, id: string, props: DataLakeBucketProps)
```

##### `scope`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeBucket.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeBucket.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeBucket.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataLakeBucketProps`](#@randyridgley/cdk-datalake-constructs.DataLakeBucketProps)

---



#### Properties <a name="Properties"></a>

##### `bucket`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeBucket.property.bucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---


### DataLakeCreator <a name="@randyridgley/cdk-datalake-constructs.DataLakeCreator"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.DataLakeCreator.Initializer"></a>

```typescript
import { DataLakeCreator } from '@randyridgley/cdk-datalake-constructs'

new DataLakeCreator(scope: Construct, id: string, props: DataLakeCreatorProperties)
```

##### `scope`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeCreator.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeCreator.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeCreator.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataLakeCreatorProperties`](#@randyridgley/cdk-datalake-constructs.DataLakeCreatorProperties)

---



#### Properties <a name="Properties"></a>

##### `role`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeCreator.property.role"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---


### DataSet <a name="@randyridgley/cdk-datalake-constructs.DataSet"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.DataSet.Initializer"></a>

```typescript
import { DataSet } from '@randyridgley/cdk-datalake-constructs'

new DataSet(scope: Construct, id: string, props: DataSetProperties)
```

##### `scope`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSet.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSet.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSet.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataSetProperties`](#@randyridgley/cdk-datalake-constructs.DataSetProperties)

---



#### Properties <a name="Properties"></a>

##### `dataSetFiles`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSet.property.dataSetFiles"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataSetResult`](#@randyridgley/cdk-datalake-constructs.DataSetResult)

---

##### `dropLocation`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSet.property.dropLocation"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataSetLocation`](#@randyridgley/cdk-datalake-constructs.DataSetLocation)

---

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSet.property.name"></a>

- *Type:* `string`

---

##### `pipeline`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSet.property.pipeline"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.Pipeline`](#@randyridgley/cdk-datalake-constructs.Pipeline)

---

##### `rawBucket`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSet.property.rawBucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---

##### `refinedBucket`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSet.property.refinedBucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---

##### `trustedBucket`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSet.property.trustedBucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---

##### `encryptionKey`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSet.property.encryptionKey"></a>

- *Type:* [`@aws-cdk/aws-kms.Key`](#@aws-cdk/aws-kms.Key)

---

##### `s3NotificationTopic`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSet.property.s3NotificationTopic"></a>

- *Type:* [`@aws-cdk/aws-sns.Topic`](#@aws-cdk/aws-sns.Topic)

---


### GlueCrawler <a name="@randyridgley/cdk-datalake-constructs.GlueCrawler"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.GlueCrawler.Initializer"></a>

```typescript
import { GlueCrawler } from '@randyridgley/cdk-datalake-constructs'

new GlueCrawler(scope: Construct, id: string, props: IGlueCrawlerProperties)
```

##### `scope`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueCrawler.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueCrawler.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueCrawler.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.IGlueCrawlerProperties`](#@randyridgley/cdk-datalake-constructs.IGlueCrawlerProperties)

---

#### Methods <a name="Methods"></a>

##### `metricFailure` <a name="@randyridgley/cdk-datalake-constructs.GlueCrawler.metricFailure"></a>

```typescript
public metricFailure(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueCrawler.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSuccess` <a name="@randyridgley/cdk-datalake-constructs.GlueCrawler.metricSuccess"></a>

```typescript
public metricSuccess(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueCrawler.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---


#### Properties <a name="Properties"></a>

##### `crawler`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueCrawler.property.crawler"></a>

- *Type:* [`@aws-cdk/aws-glue.CfnCrawler`](#@aws-cdk/aws-glue.CfnCrawler)

---

##### `metricFailureRule`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueCrawler.property.metricFailureRule"></a>

- *Type:* [`@aws-cdk/aws-events.Rule`](#@aws-cdk/aws-events.Rule)

---

##### `metricSuccessRule`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueCrawler.property.metricSuccessRule"></a>

- *Type:* [`@aws-cdk/aws-events.Rule`](#@aws-cdk/aws-events.Rule)

---

##### `role`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueCrawler.property.role"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---


### GlueJob <a name="@randyridgley/cdk-datalake-constructs.GlueJob"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.GlueJob.Initializer"></a>

```typescript
import { GlueJob } from '@randyridgley/cdk-datalake-constructs'

new GlueJob(scope: Construct, id: string, props: IGlueJobProperties)
```

##### `scope`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.IGlueJobProperties`](#@randyridgley/cdk-datalake-constructs.IGlueJobProperties)

---

#### Methods <a name="Methods"></a>

##### `diskSpaceUsedMbMetric` <a name="@randyridgley/cdk-datalake-constructs.GlueJob.diskSpaceUsedMbMetric"></a>

```typescript
public diskSpaceUsedMbMetric(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `elapsedTimeMetric` <a name="@randyridgley/cdk-datalake-constructs.GlueJob.elapsedTimeMetric"></a>

```typescript
public elapsedTimeMetric(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `jvmHeapUsageMetric` <a name="@randyridgley/cdk-datalake-constructs.GlueJob.jvmHeapUsageMetric"></a>

```typescript
public jvmHeapUsageMetric(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metric` <a name="@randyridgley/cdk-datalake-constructs.GlueJob.metric"></a>

```typescript
public metric(metricName: string, dimensionType: string, props?: MetricOptions)
```

###### `metricName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.parameter.metricName"></a>

- *Type:* `string`

---

###### `dimensionType`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.parameter.dimensionType"></a>

- *Type:* `string`

---

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricAllExecutionAttemptsFailed` <a name="@randyridgley/cdk-datalake-constructs.GlueJob.metricAllExecutionAttemptsFailed"></a>

```typescript
public metricAllExecutionAttemptsFailed(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricFailure` <a name="@randyridgley/cdk-datalake-constructs.GlueJob.metricFailure"></a>

```typescript
public metricFailure(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSuccess` <a name="@randyridgley/cdk-datalake-constructs.GlueJob.metricSuccess"></a>

```typescript
public metricSuccess(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricTimeout` <a name="@randyridgley/cdk-datalake-constructs.GlueJob.metricTimeout"></a>

```typescript
public metricTimeout(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `runTimeInMiliseconds` <a name="@randyridgley/cdk-datalake-constructs.GlueJob.runTimeInMiliseconds"></a>

```typescript
public runTimeInMiliseconds(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---


#### Properties <a name="Properties"></a>

##### `allExecutionAttemptsFailedEventDetailType`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.property.allExecutionAttemptsFailedEventDetailType"></a>

- *Type:* `string`

---

##### `allExecutionAttemptsFailedEventSource`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.property.allExecutionAttemptsFailedEventSource"></a>

- *Type:* `string`

---

##### `executionFailureRule`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.property.executionFailureRule"></a>

- *Type:* [`@aws-cdk/aws-events.Rule`](#@aws-cdk/aws-events.Rule)

---

##### `job`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.property.job"></a>

- *Type:* [`@aws-cdk/aws-glue.CfnJob`](#@aws-cdk/aws-glue.CfnJob)

---

##### `lambdaFunction`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.property.lambdaFunction"></a>

- *Type:* [`@aws-cdk/aws-lambda.SingletonFunction`](#@aws-cdk/aws-lambda.SingletonFunction)

---

##### `metricFailureRule`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.property.metricFailureRule"></a>

- *Type:* [`@aws-cdk/aws-events.Rule`](#@aws-cdk/aws-events.Rule)

---

##### `metricSuccessRule`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.property.metricSuccessRule"></a>

- *Type:* [`@aws-cdk/aws-events.Rule`](#@aws-cdk/aws-events.Rule)

---

##### `metricTimeoutRule`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.property.metricTimeoutRule"></a>

- *Type:* [`@aws-cdk/aws-events.Rule`](#@aws-cdk/aws-events.Rule)

---

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.property.name"></a>

- *Type:* `string`

---

##### `role`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJob.property.role"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---


### GlueJobOps <a name="@randyridgley/cdk-datalake-constructs.GlueJobOps"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.GlueJobOps.Initializer"></a>

```typescript
import { GlueJobOps } from '@randyridgley/cdk-datalake-constructs'

new GlueJobOps(scope: Construct, id: string, props: IGlueOpsProperties)
```

##### `scope`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJobOps.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJobOps.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJobOps.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.IGlueOpsProperties`](#@randyridgley/cdk-datalake-constructs.IGlueOpsProperties)

---



#### Properties <a name="Properties"></a>

##### `alarmsSev2`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJobOps.property.alarmsSev2"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)[]

---

##### `alarmsSev3`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJobOps.property.alarmsSev3"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)[]

---

##### `job`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJobOps.property.job"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.GlueJob`](#@randyridgley/cdk-datalake-constructs.GlueJob)

---

##### `jvmHeapSizeExceeding80PercentAlarm`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJobOps.property.jvmHeapSizeExceeding80PercentAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `jvmHeapSizeExceeding90PercentAlarm`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJobOps.property.jvmHeapSizeExceeding90PercentAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `metricAllExecutionAttemptsFailedAlarm`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJobOps.property.metricAllExecutionAttemptsFailedAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `metricExecutionFailureAlarm`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJobOps.property.metricExecutionFailureAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `dashboard`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueJobOps.property.dashboard"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Dashboard`](#@aws-cdk/aws-cloudwatch.Dashboard)

---


### GlueTable <a name="@randyridgley/cdk-datalake-constructs.GlueTable"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.GlueTable.Initializer"></a>

```typescript
import { GlueTable } from '@randyridgley/cdk-datalake-constructs'

new GlueTable(scope: Construct, id: string, props: IGlueTableProperties)
```

##### `scope`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueTable.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueTable.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueTable.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.IGlueTableProperties`](#@randyridgley/cdk-datalake-constructs.IGlueTableProperties)

---



#### Properties <a name="Properties"></a>

##### `table`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueTable.property.table"></a>

- *Type:* [`@aws-cdk/aws-glue.CfnTable`](#@aws-cdk/aws-glue.CfnTable)

---

##### `tableName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.GlueTable.property.tableName"></a>

- *Type:* `string`

---


### KinesisOps <a name="@randyridgley/cdk-datalake-constructs.KinesisOps"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.Initializer"></a>

```typescript
import { KinesisOps } from '@randyridgley/cdk-datalake-constructs'

new KinesisOps(scope: Construct, id: string, props: IKinesisOpsProperties)
```

##### `scope`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties`](#@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties)

---



#### Properties <a name="Properties"></a>

##### `alarmsSev2`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.property.alarmsSev2"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)[]

---

##### `alarmsSev3`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.property.alarmsSev3"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)[]

---

##### `deliveryStream`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.property.deliveryStream"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.S3DeliveryStream`](#@randyridgley/cdk-datalake-constructs.S3DeliveryStream)

---

##### `firehoseDeliveryToS3CriticalAlarm`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.property.firehoseDeliveryToS3CriticalAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `firehoseDeliveryToS3WarningAlarm`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.property.firehoseDeliveryToS3WarningAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `inputStreamGetRecordsWarningAlarm`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.property.inputStreamGetRecordsWarningAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `inputStreamIteratorAgeCriticalAlarm`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.property.inputStreamIteratorAgeCriticalAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `inputStreamIteratorAgeWarningAlarm`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.property.inputStreamIteratorAgeWarningAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `inputStreamPutRecordsWarningAlarm`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.property.inputStreamPutRecordsWarningAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `inputStreamReadThroughputWarningAlarm`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.property.inputStreamReadThroughputWarningAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `inputStreamWriteThroughputWarningAlarm`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.property.inputStreamWriteThroughputWarningAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `stream`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.property.stream"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.KinesisStream`](#@randyridgley/cdk-datalake-constructs.KinesisStream)

---

##### `streamName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.property.streamName"></a>

- *Type:* `string`

---

##### `dashboard`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisOps.property.dashboard"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Dashboard`](#@aws-cdk/aws-cloudwatch.Dashboard)

---


### KinesisStream <a name="@randyridgley/cdk-datalake-constructs.KinesisStream"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.Initializer"></a>

```typescript
import { KinesisStream } from '@randyridgley/cdk-datalake-constructs'

new KinesisStream(parent: Construct, name: string, props: StreamProps)
```

##### `parent`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.parent"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.name"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-kinesis.StreamProps`](#@aws-cdk/aws-kinesis.StreamProps)

---

#### Methods <a name="Methods"></a>

##### `metric` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions)
```

###### `metricName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.metricName"></a>

- *Type:* `string`

---

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricGetRecordsBytes` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricGetRecordsBytes"></a>

```typescript
public metricGetRecordsBytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricGetRecordsIteratorAgeMilliseconds` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricGetRecordsIteratorAgeMilliseconds"></a>

```typescript
public metricGetRecordsIteratorAgeMilliseconds(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricGetRecordsLatency` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricGetRecordsLatency"></a>

```typescript
public metricGetRecordsLatency(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricGetRecordsRecords` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricGetRecordsRecords"></a>

```typescript
public metricGetRecordsRecords(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricGetRecordsSuccess` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricGetRecordsSuccess"></a>

```typescript
public metricGetRecordsSuccess(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricIncomingBytes` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricIncomingBytes"></a>

```typescript
public metricIncomingBytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricIncomingRecords` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricIncomingRecords"></a>

```typescript
public metricIncomingRecords(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricPutRecordBytes` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricPutRecordBytes"></a>

```typescript
public metricPutRecordBytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricPutRecordLatency` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricPutRecordLatency"></a>

```typescript
public metricPutRecordLatency(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricPutRecordsBytes` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricPutRecordsBytes"></a>

```typescript
public metricPutRecordsBytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricPutRecordsLatency` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricPutRecordsLatency"></a>

```typescript
public metricPutRecordsLatency(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricPutRecordsRecords` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricPutRecordsRecords"></a>

```typescript
public metricPutRecordsRecords(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricPutRecordsSuccess` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricPutRecordsSuccess"></a>

```typescript
public metricPutRecordsSuccess(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricPutRecordSuccess` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricPutRecordSuccess"></a>

```typescript
public metricPutRecordSuccess(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricReadProvisionedThroughputExceeded` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricReadProvisionedThroughputExceeded"></a>

```typescript
public metricReadProvisionedThroughputExceeded(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSubscribeToShardEventBytes` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricSubscribeToShardEventBytes"></a>

```typescript
public metricSubscribeToShardEventBytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSubscribeToShardEventMillisBehindLatest` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricSubscribeToShardEventMillisBehindLatest"></a>

```typescript
public metricSubscribeToShardEventMillisBehindLatest(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSubscribeToShardEventRecords` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricSubscribeToShardEventRecords"></a>

```typescript
public metricSubscribeToShardEventRecords(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSubscribeToShardEventSuccess` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricSubscribeToShardEventSuccess"></a>

```typescript
public metricSubscribeToShardEventSuccess(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSubscribeToShardRateExceeded` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricSubscribeToShardRateExceeded"></a>

```typescript
public metricSubscribeToShardRateExceeded(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSubscribeToShardSuccess` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricSubscribeToShardSuccess"></a>

```typescript
public metricSubscribeToShardSuccess(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricWriteProvisionedThroughputExceeded` <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.metricWriteProvisionedThroughputExceeded"></a>

```typescript
public metricWriteProvisionedThroughputExceeded(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---


#### Properties <a name="Properties"></a>

##### `stream`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.KinesisStream.property.stream"></a>

- *Type:* [`@aws-cdk/aws-kinesis.Stream`](#@aws-cdk/aws-kinesis.Stream)

---


### LFRegisteredDataSet <a name="@randyridgley/cdk-datalake-constructs.LFRegisteredDataSet"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.LFRegisteredDataSet.Initializer"></a>

```typescript
import { LFRegisteredDataSet } from '@randyridgley/cdk-datalake-constructs'

new LFRegisteredDataSet(scope: Construct, id: string, props: RegisteredDataSetProperties)
```

##### `scope`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.LFRegisteredDataSet.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.LFRegisteredDataSet.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.LFRegisteredDataSet.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.RegisteredDataSetProperties`](#@randyridgley/cdk-datalake-constructs.RegisteredDataSetProperties)

---





### S3DeliveryStream <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.Initializer"></a>

```typescript
import { S3DeliveryStream } from '@randyridgley/cdk-datalake-constructs'

new S3DeliveryStream(parent: Construct, name: string, props: DeliveryStreamProperties)
```

##### `parent`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.parent"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.name"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DeliveryStreamProperties`](#@randyridgley/cdk-datalake-constructs.DeliveryStreamProperties)

---

#### Methods <a name="Methods"></a>

##### `metric` <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions)
```

###### `metricName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.metricName"></a>

- *Type:* `string`

---

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricBackupToS3Bytes` <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.metricBackupToS3Bytes"></a>

```typescript
public metricBackupToS3Bytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricBackupToS3DataFreshness` <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.metricBackupToS3DataFreshness"></a>

```typescript
public metricBackupToS3DataFreshness(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricBackupToS3Records` <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.metricBackupToS3Records"></a>

```typescript
public metricBackupToS3Records(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricBackupToS3Success` <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.metricBackupToS3Success"></a>

```typescript
public metricBackupToS3Success(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricDataReadFromKinesisStreamBytes` <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.metricDataReadFromKinesisStreamBytes"></a>

```typescript
public metricDataReadFromKinesisStreamBytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricDataReadFromKinesisStreamRecords` <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.metricDataReadFromKinesisStreamRecords"></a>

```typescript
public metricDataReadFromKinesisStreamRecords(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricDeliveryToS3Bytes` <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.metricDeliveryToS3Bytes"></a>

```typescript
public metricDeliveryToS3Bytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricDeliveryToS3DataFreshness` <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.metricDeliveryToS3DataFreshness"></a>

```typescript
public metricDeliveryToS3DataFreshness(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricDeliveryToS3Records` <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.metricDeliveryToS3Records"></a>

```typescript
public metricDeliveryToS3Records(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricDeliveryToS3Success` <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.metricDeliveryToS3Success"></a>

```typescript
public metricDeliveryToS3Success(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricIncomingBytes` <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.metricIncomingBytes"></a>

```typescript
public metricIncomingBytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricIncomingRecords` <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.metricIncomingRecords"></a>

```typescript
public metricIncomingRecords(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---


#### Properties <a name="Properties"></a>

##### `deliveryStreamArn`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.property.deliveryStreamArn"></a>

- *Type:* `string`

---

##### `deliveryStreamName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.property.deliveryStreamName"></a>

- *Type:* `string`

---

##### `s3Bucket`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.S3DeliveryStream.property.s3Bucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---


## Structs <a name="Structs"></a>

### CrossAccountProperties <a name="@randyridgley/cdk-datalake-constructs.CrossAccountProperties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { CrossAccountProperties } from '@randyridgley/cdk-datalake-constructs'

const crossAccountProperties: CrossAccountProperties = { ... }
```

##### `consumerAccountIds`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.CrossAccountProperties.property.consumerAccountIds"></a>

- *Type:* `string`[]

---

##### `producerAccountId`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.CrossAccountProperties.property.producerAccountId"></a>

- *Type:* `string`

---

##### `region`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.CrossAccountProperties.property.region"></a>

- *Type:* `string`

---

### DataCatalogOwner <a name="@randyridgley/cdk-datalake-constructs.DataCatalogOwner"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataCatalogOwner } from '@randyridgley/cdk-datalake-constructs'

const dataCatalogOwner: DataCatalogOwner = { ... }
```

##### `accountId`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataCatalogOwner.property.accountId"></a>

- *Type:* `string`

---

### DataLakeAdministratorProps <a name="@randyridgley/cdk-datalake-constructs.DataLakeAdministratorProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataLakeAdministratorProps } from '@randyridgley/cdk-datalake-constructs'

const dataLakeAdministratorProps: DataLakeAdministratorProps = { ... }
```

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeAdministratorProps.property.name"></a>

- *Type:* `string`

---

### DataLakeAnalystProps <a name="@randyridgley/cdk-datalake-constructs.DataLakeAnalystProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataLakeAnalystProps } from '@randyridgley/cdk-datalake-constructs'

const dataLakeAnalystProps: DataLakeAnalystProps = { ... }
```

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeAnalystProps.property.name"></a>

- *Type:* `string`

---

##### `readAccessBuckets`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeAnalystProps.property.readAccessBuckets"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)[]

---

##### `writeAccessBuckets`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeAnalystProps.property.writeAccessBuckets"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)[]

---

### DataLakeBucketProps <a name="@randyridgley/cdk-datalake-constructs.DataLakeBucketProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataLakeBucketProps } from '@randyridgley/cdk-datalake-constructs'

const dataLakeBucketProps: DataLakeBucketProps = { ... }
```

##### `bucketName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeBucketProps.property.bucketName"></a>

- *Type:* `string`

---

##### `crossAccount`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeBucketProps.property.crossAccount"></a>

- *Type:* `boolean`

---

##### `dataCatalogAccountId`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeBucketProps.property.dataCatalogAccountId"></a>

- *Type:* `string`

---

##### `logBucket`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeBucketProps.property.logBucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---

### DataLakeCreatorProperties <a name="@randyridgley/cdk-datalake-constructs.DataLakeCreatorProperties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataLakeCreatorProperties } from '@randyridgley/cdk-datalake-constructs'

const dataLakeCreatorProperties: DataLakeCreatorProperties = { ... }
```

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeCreatorProperties.property.name"></a>

- *Type:* `string`

---

### DataLakeProperties <a name="@randyridgley/cdk-datalake-constructs.DataLakeProperties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataLakeProperties } from '@randyridgley/cdk-datalake-constructs'

const dataLakeProperties: DataLakeProperties = { ... }
```

##### `accountId`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeProperties.property.accountId"></a>

- *Type:* `string`

---

##### `createDefaultDatabase`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeProperties.property.createDefaultDatabase"></a>

- *Type:* `boolean`

---

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeProperties.property.name"></a>

- *Type:* `string`

---

##### `region`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeProperties.property.region"></a>

- *Type:* `string`

---

##### `stageName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeProperties.property.stageName"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.Stage`](#@randyridgley/cdk-datalake-constructs.Stage)

---

##### `crossAccount`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeProperties.property.crossAccount"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.CrossAccountProperties`](#@randyridgley/cdk-datalake-constructs.CrossAccountProperties)

---

##### `datalakeAdminRole`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeProperties.property.datalakeAdminRole"></a>

- *Type:* [`@aws-cdk/aws-iam.Role`](#@aws-cdk/aws-iam.Role)

---

##### `datalakeCreatorRole`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeProperties.property.datalakeCreatorRole"></a>

- *Type:* [`@aws-cdk/aws-iam.Role`](#@aws-cdk/aws-iam.Role)

---

##### `dataProducts`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeProperties.property.dataProducts"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataProduct`](#@randyridgley/cdk-datalake-constructs.DataProduct)[]

---

##### `glueSecurityGroup`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeProperties.property.glueSecurityGroup"></a>

- *Type:* [`@aws-cdk/aws-ec2.SecurityGroup`](#@aws-cdk/aws-ec2.SecurityGroup)

---

##### `policyTags`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeProperties.property.policyTags"></a>

- *Type:* {[ key: string ]: `string`}

---

##### `vpc`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLakeProperties.property.vpc"></a>

- *Type:* [`@aws-cdk/aws-ec2.Vpc`](#@aws-cdk/aws-ec2.Vpc)

---

### DataLocationProperties <a name="@randyridgley/cdk-datalake-constructs.DataLocationProperties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataLocationProperties } from '@randyridgley/cdk-datalake-constructs'

const dataLocationProperties: DataLocationProperties = { ... }
```

##### `databaseName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLocationProperties.property.databaseName"></a>

- *Type:* `string`

---

##### `destinationBucketName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLocationProperties.property.destinationBucketName"></a>

- *Type:* `string`

---

##### `destinationPrefix`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLocationProperties.property.destinationPrefix"></a>

- *Type:* `string`

---

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataLocationProperties.property.name"></a>

- *Type:* `string`

---

### DataProductProperties <a name="@randyridgley/cdk-datalake-constructs.DataProductProperties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataProductProperties } from '@randyridgley/cdk-datalake-constructs'

const dataProductProperties: DataProductProperties = { ... }
```

##### `accountId`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataProductProperties.property.accountId"></a>

- *Type:* `string`

---

##### `databaseName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataProductProperties.property.databaseName"></a>

- *Type:* `string`

---

##### `pipelines`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataProductProperties.property.pipelines"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.Pipeline`](#@randyridgley/cdk-datalake-constructs.Pipeline)[]

---

### DataSetProperties <a name="@randyridgley/cdk-datalake-constructs.DataSetProperties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataSetProperties } from '@randyridgley/cdk-datalake-constructs'

const dataSetProperties: DataSetProperties = { ... }
```

##### `accountId`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSetProperties.property.accountId"></a>

- *Type:* `string`

---

##### `logBucket`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSetProperties.property.logBucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---

##### `pipeline`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSetProperties.property.pipeline"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.Pipeline`](#@randyridgley/cdk-datalake-constructs.Pipeline)

---

##### `region`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSetProperties.property.region"></a>

- *Type:* `string`

---

##### `stage`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSetProperties.property.stage"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.Stage`](#@randyridgley/cdk-datalake-constructs.Stage)

---

##### `encryptionKey`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSetProperties.property.encryptionKey"></a>

- *Type:* [`@aws-cdk/aws-kms.Key`](#@aws-cdk/aws-kms.Key)

---

### DataSetResult <a name="@randyridgley/cdk-datalake-constructs.DataSetResult"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataSetResult } from '@randyridgley/cdk-datalake-constructs'

const dataSetResult: DataSetResult = { ... }
```

##### `destinationPrefix`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSetResult.property.destinationPrefix"></a>

- *Type:* `string`

---

##### `destinationBucketName`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSetResult.property.destinationBucketName"></a>

- *Type:* `string`

---

##### `sourceBucketName`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSetResult.property.sourceBucketName"></a>

- *Type:* `string`

---

##### `sourceKeys`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DataSetResult.property.sourceKeys"></a>

- *Type:* `string`[]

---

### DataStreamProperties <a name="@randyridgley/cdk-datalake-constructs.DataStreamProperties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataStreamProperties } from '@randyridgley/cdk-datalake-constructs'

const dataStreamProperties: DataStreamProperties = { ... }
```

##### `dataCatalogOwner`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataStreamProperties.property.dataCatalogOwner"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataCatalogOwner`](#@randyridgley/cdk-datalake-constructs.DataCatalogOwner)

---

##### `destinationBucketName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataStreamProperties.property.destinationBucketName"></a>

- *Type:* `string`

---

##### `destinationPrefix`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataStreamProperties.property.destinationPrefix"></a>

- *Type:* `string`

---

##### `lambdaDataGenerator`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataStreamProperties.property.lambdaDataGenerator"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.LambdaDataGeneratorProperties`](#@randyridgley/cdk-datalake-constructs.LambdaDataGeneratorProperties)

---

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataStreamProperties.property.name"></a>

- *Type:* `string`

---

##### `streamName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataStreamProperties.property.streamName"></a>

- *Type:* `string`

---

### DeliveryStreamProperties <a name="@randyridgley/cdk-datalake-constructs.DeliveryStreamProperties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DeliveryStreamProperties } from '@randyridgley/cdk-datalake-constructs'

const deliveryStreamProperties: DeliveryStreamProperties = { ... }
```

##### `kinesisStream`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DeliveryStreamProperties.property.kinesisStream"></a>

- *Type:* [`@aws-cdk/aws-kinesis.Stream`](#@aws-cdk/aws-kinesis.Stream)

---

##### `s3Bucket`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DeliveryStreamProperties.property.s3Bucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---

##### `compression`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DeliveryStreamProperties.property.compression"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.CompressionType`](#@randyridgley/cdk-datalake-constructs.CompressionType)

---

##### `s3Prefix`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DeliveryStreamProperties.property.s3Prefix"></a>

- *Type:* `string`

---

##### `transformFunction`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.DeliveryStreamProperties.property.transformFunction"></a>

- *Type:* [`@aws-cdk/aws-lambda.Function`](#@aws-cdk/aws-lambda.Function)

---

### JDBCProperties <a name="@randyridgley/cdk-datalake-constructs.JDBCProperties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { JDBCProperties } from '@randyridgley/cdk-datalake-constructs'

const jDBCProperties: JDBCProperties = { ... }
```

##### `jdbc`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.JDBCProperties.property.jdbc"></a>

- *Type:* `string`

---

##### `password`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.JDBCProperties.property.password"></a>

- *Type:* `string`

---

##### `username`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.JDBCProperties.property.username"></a>

- *Type:* `string`

---

### JobProperties <a name="@randyridgley/cdk-datalake-constructs.JobProperties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { JobProperties } from '@randyridgley/cdk-datalake-constructs'

const jobProperties: JobProperties = { ... }
```

##### `jobScript`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.jobScript"></a>

- *Type:* `string`

---

##### `jobType`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.jobType"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.GlueJobType`](#@randyridgley/cdk-datalake-constructs.GlueJobType)

---

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.name"></a>

- *Type:* `string`

---

##### `workerType`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.workerType"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.GlueWorkerType`](#@randyridgley/cdk-datalake-constructs.GlueWorkerType)

---

##### `description`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.description"></a>

- *Type:* `string`

---

##### `destinationLocation`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.destinationLocation"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataSetLocation`](#@randyridgley/cdk-datalake-constructs.DataSetLocation)

---

##### `glueVersion`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.glueVersion"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.GlueVersion`](#@randyridgley/cdk-datalake-constructs.GlueVersion)

---

##### `jobArgs`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.jobArgs"></a>

- *Type:* {[ key: string ]: `string`}

---

##### `maxCapacity`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.maxCapacity"></a>

- *Type:* `number`

---

##### `maxConcurrentRuns`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.maxConcurrentRuns"></a>

- *Type:* `number`

---

##### `maxRetries`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.maxRetries"></a>

- *Type:* `number`

---

##### `numberOfWorkers`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.numberOfWorkers"></a>

- *Type:* `number`

---

##### `readAccessBuckets`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.readAccessBuckets"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)[]

---

##### `roleName`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.roleName"></a>

- *Type:* `string`

---

##### `timeout`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.timeout"></a>

- *Type:* `number`

---

##### `writeAccessBuckets`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.JobProperties.property.writeAccessBuckets"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)[]

---

### LambdaDataGeneratorProperties <a name="@randyridgley/cdk-datalake-constructs.LambdaDataGeneratorProperties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { LambdaDataGeneratorProperties } from '@randyridgley/cdk-datalake-constructs'

const lambdaDataGeneratorProperties: LambdaDataGeneratorProperties = { ... }
```

##### `code`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.LambdaDataGeneratorProperties.property.code"></a>

- *Type:* [`@aws-cdk/aws-lambda.Code`](#@aws-cdk/aws-lambda.Code)

---

##### `functionName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.LambdaDataGeneratorProperties.property.functionName"></a>

- *Type:* `string`

---

##### `handler`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.LambdaDataGeneratorProperties.property.handler"></a>

- *Type:* `string`

---

##### `ruleName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.LambdaDataGeneratorProperties.property.ruleName"></a>

- *Type:* `string`

---

##### `runtime`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.LambdaDataGeneratorProperties.property.runtime"></a>

- *Type:* [`@aws-cdk/aws-lambda.Runtime`](#@aws-cdk/aws-lambda.Runtime)

---

##### `schedule`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.LambdaDataGeneratorProperties.property.schedule"></a>

- *Type:* [`@aws-cdk/aws-events.Schedule`](#@aws-cdk/aws-events.Schedule)

---

##### `timeout`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.LambdaDataGeneratorProperties.property.timeout"></a>

- *Type:* [`@aws-cdk/core.Duration`](#@aws-cdk/core.Duration)

---

### NameBuilderParameters <a name="@randyridgley/cdk-datalake-constructs.NameBuilderParameters"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { NameBuilderParameters } from '@randyridgley/cdk-datalake-constructs'

const nameBuilderParameters: NameBuilderParameters = { ... }
```

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.NameBuilderParameters.property.name"></a>

- *Type:* `string`

---

##### `accountId`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.NameBuilderParameters.property.accountId"></a>

- *Type:* `string`

---

##### `region`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.NameBuilderParameters.property.region"></a>

- *Type:* `string`

---

##### `resourceUse`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.NameBuilderParameters.property.resourceUse"></a>

- *Type:* `string`

---

##### `stage`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.NameBuilderParameters.property.stage"></a>

- *Type:* `string`

---

### RegisteredDataSetProperties <a name="@randyridgley/cdk-datalake-constructs.RegisteredDataSetProperties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { RegisteredDataSetProperties } from '@randyridgley/cdk-datalake-constructs'

const registeredDataSetProperties: RegisteredDataSetProperties = { ... }
```

##### `databaseName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.RegisteredDataSetProperties.property.databaseName"></a>

- *Type:* `string`

---

##### `dataLakeAdminRoleArn`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.RegisteredDataSetProperties.property.dataLakeAdminRoleArn"></a>

- *Type:* `string`

---

##### `dataLakeDbCreatorRoleArn`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.RegisteredDataSetProperties.property.dataLakeDbCreatorRoleArn"></a>

- *Type:* `string`

---

##### `dataSet`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.RegisteredDataSetProperties.property.dataSet"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataSet`](#@randyridgley/cdk-datalake-constructs.DataSet)

---

##### `destinationPrefix`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.RegisteredDataSetProperties.property.destinationPrefix"></a>

- *Type:* `string`

---

##### `pipeline`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.RegisteredDataSetProperties.property.pipeline"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.Pipeline`](#@randyridgley/cdk-datalake-constructs.Pipeline)

---

##### `stage`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.RegisteredDataSetProperties.property.stage"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.Stage`](#@randyridgley/cdk-datalake-constructs.Stage)

---

### S3NotificationProperties <a name="@randyridgley/cdk-datalake-constructs.S3NotificationProperties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { S3NotificationProperties } from '@randyridgley/cdk-datalake-constructs'

const s3NotificationProperties: S3NotificationProperties = { ... }
```

##### `event`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.S3NotificationProperties.property.event"></a>

- *Type:* [`@aws-cdk/aws-s3.EventType`](#@aws-cdk/aws-s3.EventType)

---

##### `prefix`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.S3NotificationProperties.property.prefix"></a>

- *Type:* `string`

---

##### `suffix`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.S3NotificationProperties.property.suffix"></a>

- *Type:* `string`

---

### S3Properties <a name="@randyridgley/cdk-datalake-constructs.S3Properties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { S3Properties } from '@randyridgley/cdk-datalake-constructs'

const s3Properties: S3Properties = { ... }
```

##### `sourceBucketName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.S3Properties.property.sourceBucketName"></a>

- *Type:* `string`

---

##### `sourceKeys`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.S3Properties.property.sourceKeys"></a>

- *Type:* `string`[]

---

### StreamProperties <a name="@randyridgley/cdk-datalake-constructs.StreamProperties"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { StreamProperties } from '@randyridgley/cdk-datalake-constructs'

const streamProperties: StreamProperties = { ... }
```

##### `streamName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.StreamProperties.property.streamName"></a>

- *Type:* `string`

---

##### `lambdaDataGenerator`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.StreamProperties.property.lambdaDataGenerator"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.LambdaDataGeneratorProperties`](#@randyridgley/cdk-datalake-constructs.LambdaDataGeneratorProperties)

---

### TableProps <a name="@randyridgley/cdk-datalake-constructs.TableProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { TableProps } from '@randyridgley/cdk-datalake-constructs'

const tableProps: TableProps = { ... }
```

##### `catalogId`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.TableProps.property.catalogId"></a>

- *Type:* `string`

---

##### `columns`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.TableProps.property.columns"></a>

- *Type:* [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable) | [`@aws-cdk/aws-glue.CfnTable.ColumnProperty`](#@aws-cdk/aws-glue.CfnTable.ColumnProperty) | [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable)[]

---

##### `description`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.TableProps.property.description"></a>

- *Type:* `string`

---

##### `inputFormat`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.TableProps.property.inputFormat"></a>

- *Type:* `string`

---

##### `outputFormat`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.TableProps.property.outputFormat"></a>

- *Type:* `string`

---

##### `parameters`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.TableProps.property.parameters"></a>

- *Type:* {[ key: string ]: `any`}

---

##### `partitionKeys`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.TableProps.property.partitionKeys"></a>

- *Type:* [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable) | [`@aws-cdk/aws-glue.CfnTable.ColumnProperty`](#@aws-cdk/aws-glue.CfnTable.ColumnProperty) | [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable)[]

---

##### `serdeParameters`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.TableProps.property.serdeParameters"></a>

- *Type:* {[ key: string ]: `any`}

---

##### `serializationLibrary`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.TableProps.property.serializationLibrary"></a>

- *Type:* `string`

---

##### `tableName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.TableProps.property.tableName"></a>

- *Type:* `string`

---

## Classes <a name="Classes"></a>

### DataProduct <a name="@randyridgley/cdk-datalake-constructs.DataProduct"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.DataProduct.Initializer"></a>

```typescript
import { DataProduct } from '@randyridgley/cdk-datalake-constructs'

new DataProduct(props: DataProductProperties)
```

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataProduct.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataProductProperties`](#@randyridgley/cdk-datalake-constructs.DataProductProperties)

---



#### Properties <a name="Properties"></a>

##### `accountId`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataProduct.property.accountId"></a>

- *Type:* `string`

---

##### `databaseName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataProduct.property.databaseName"></a>

- *Type:* `string`

---

##### `pipelines`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.DataProduct.property.pipelines"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.Pipeline`](#@randyridgley/cdk-datalake-constructs.Pipeline)[]

---


### Pipeline <a name="@randyridgley/cdk-datalake-constructs.Pipeline"></a>

#### Initializer <a name="@randyridgley/cdk-datalake-constructs.Pipeline.Initializer"></a>

```typescript
import { Pipeline } from '@randyridgley/cdk-datalake-constructs'

new Pipeline(props: IPipelineProperties)
```

##### `props`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.Pipeline.parameter.props"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.IPipelineProperties`](#@randyridgley/cdk-datalake-constructs.IPipelineProperties)

---



#### Properties <a name="Properties"></a>

##### `dataCatalogOwner`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.Pipeline.property.dataCatalogOwner"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataCatalogOwner`](#@randyridgley/cdk-datalake-constructs.DataCatalogOwner)

---

##### `dataSetDropLocation`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.Pipeline.property.dataSetDropLocation"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataSetLocation`](#@randyridgley/cdk-datalake-constructs.DataSetLocation)

---

##### `destinationPrefix`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.Pipeline.property.destinationPrefix"></a>

- *Type:* `string`

---

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.Pipeline.property.name"></a>

- *Type:* `string`

---

##### `type`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.Pipeline.property.type"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataPipelineType`](#@randyridgley/cdk-datalake-constructs.DataPipelineType)

---

##### `jdbcProperties`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.Pipeline.property.jdbcProperties"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.JDBCProperties`](#@randyridgley/cdk-datalake-constructs.JDBCProperties)

---

##### `job`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.Pipeline.property.job"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.JobProperties`](#@randyridgley/cdk-datalake-constructs.JobProperties)

---

##### `s3NotificationProps`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.Pipeline.property.s3NotificationProps"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.S3NotificationProperties`](#@randyridgley/cdk-datalake-constructs.S3NotificationProperties)

---

##### `s3Properties`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.Pipeline.property.s3Properties"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.S3Properties`](#@randyridgley/cdk-datalake-constructs.S3Properties)

---

##### `streamProperties`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.Pipeline.property.streamProperties"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.StreamProperties`](#@randyridgley/cdk-datalake-constructs.StreamProperties)

---

##### `table`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.Pipeline.property.table"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.TableProps`](#@randyridgley/cdk-datalake-constructs.TableProps)

---


## Protocols <a name="Protocols"></a>

### IGlueCrawlerProperties <a name="@randyridgley/cdk-datalake-constructs.IGlueCrawlerProperties"></a>

- *Implemented By:* [`@randyridgley/cdk-datalake-constructs.IGlueCrawlerProperties`](#@randyridgley/cdk-datalake-constructs.IGlueCrawlerProperties)


#### Properties <a name="Properties"></a>

##### `bucketName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueCrawlerProperties.property.bucketName"></a>

- *Type:* `string`

---

##### `databaseName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueCrawlerProperties.property.databaseName"></a>

- *Type:* `string`

---

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueCrawlerProperties.property.name"></a>

- *Type:* `string`

---

##### `bucketPrefix`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueCrawlerProperties.property.bucketPrefix"></a>

- *Type:* `string`

---

##### `roleName`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueCrawlerProperties.property.roleName"></a>

- *Type:* `string`

---

##### `trigger`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueCrawlerProperties.property.trigger"></a>

- *Type:* [`@aws-cdk/aws-glue.CfnTrigger`](#@aws-cdk/aws-glue.CfnTrigger)

---

### IGlueJobProperties <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties"></a>

- *Implemented By:* [`@randyridgley/cdk-datalake-constructs.IGlueJobProperties`](#@randyridgley/cdk-datalake-constructs.IGlueJobProperties)


#### Properties <a name="Properties"></a>

##### `deploymentBucket`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.deploymentBucket"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)

---

##### `jobScript`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.jobScript"></a>

- *Type:* `string`

---

##### `jobType`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.jobType"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.GlueJobType`](#@randyridgley/cdk-datalake-constructs.GlueJobType)

---

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.name"></a>

- *Type:* `string`

---

##### `workerType`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.workerType"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.GlueWorkerType`](#@randyridgley/cdk-datalake-constructs.GlueWorkerType)

---

##### `description`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.description"></a>

- *Type:* `string`

---

##### `glueVersion`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.glueVersion"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.GlueVersion`](#@randyridgley/cdk-datalake-constructs.GlueVersion)

---

##### `jobArgs`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.jobArgs"></a>

- *Type:* {[ key: string ]: `string`}

---

##### `maxCapacity`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.maxCapacity"></a>

- *Type:* `number`

---

##### `maxConcurrentRuns`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.maxConcurrentRuns"></a>

- *Type:* `number`

---

##### `maxRetries`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.maxRetries"></a>

- *Type:* `number`

---

##### `numberOfWorkers`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.numberOfWorkers"></a>

- *Type:* `number`

---

##### `readAccessBuckets`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.readAccessBuckets"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)[]

---

##### `roleName`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.roleName"></a>

- *Type:* `string`

---

##### `timeout`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.timeout"></a>

- *Type:* `number`

---

##### `writeAccessBuckets`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueJobProperties.property.writeAccessBuckets"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)[]

---

### IGlueOpsProperties <a name="@randyridgley/cdk-datalake-constructs.IGlueOpsProperties"></a>

- *Implemented By:* [`@randyridgley/cdk-datalake-constructs.IGlueOpsProperties`](#@randyridgley/cdk-datalake-constructs.IGlueOpsProperties)


#### Properties <a name="Properties"></a>

##### `job`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueOpsProperties.property.job"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.GlueJob`](#@randyridgley/cdk-datalake-constructs.GlueJob)

---

##### `jvmHeapSizeExceeding80percent`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueOpsProperties.property.jvmHeapSizeExceeding80percent"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `jvmHeapSizeExceeding90percent`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueOpsProperties.property.jvmHeapSizeExceeding90percent"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `metricAllExecutionAttemptsFailed`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueOpsProperties.property.metricAllExecutionAttemptsFailed"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `metricExecutionFailure`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueOpsProperties.property.metricExecutionFailure"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

### IGlueTableProperties <a name="@randyridgley/cdk-datalake-constructs.IGlueTableProperties"></a>

- *Implemented By:* [`@randyridgley/cdk-datalake-constructs.IGlueTableProperties`](#@randyridgley/cdk-datalake-constructs.IGlueTableProperties)


#### Properties <a name="Properties"></a>

##### `catalogId`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueTableProperties.property.catalogId"></a>

- *Type:* `string`

---

##### `columns`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueTableProperties.property.columns"></a>

- *Type:* [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable) | [`@aws-cdk/aws-glue.CfnTable.ColumnProperty`](#@aws-cdk/aws-glue.CfnTable.ColumnProperty) | [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable)[]

---

##### `database`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueTableProperties.property.database"></a>

- *Type:* [`@aws-cdk/aws-glue.Database`](#@aws-cdk/aws-glue.Database)

---

##### `description`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueTableProperties.property.description"></a>

- *Type:* `string`

---

##### `inputFormat`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueTableProperties.property.inputFormat"></a>

- *Type:* `string`

---

##### `outputFormat`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueTableProperties.property.outputFormat"></a>

- *Type:* `string`

---

##### `parameters`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueTableProperties.property.parameters"></a>

- *Type:* {[ key: string ]: `any`}

---

##### `partitionKeys`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueTableProperties.property.partitionKeys"></a>

- *Type:* [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable) | [`@aws-cdk/aws-glue.CfnTable.ColumnProperty`](#@aws-cdk/aws-glue.CfnTable.ColumnProperty) | [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable)[]

---

##### `s3Location`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueTableProperties.property.s3Location"></a>

- *Type:* `string`

---

##### `serdeParameters`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueTableProperties.property.serdeParameters"></a>

- *Type:* {[ key: string ]: `any`}

---

##### `serializationLibrary`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueTableProperties.property.serializationLibrary"></a>

- *Type:* `string`

---

##### `tableName`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IGlueTableProperties.property.tableName"></a>

- *Type:* `string`

---

### IKinesisOpsProperties <a name="@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties"></a>

- *Implemented By:* [`@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties`](#@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties)


#### Properties <a name="Properties"></a>

##### `deliveryStream`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties.property.deliveryStream"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.S3DeliveryStream`](#@randyridgley/cdk-datalake-constructs.S3DeliveryStream)

---

##### `stream`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties.property.stream"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.KinesisStream`](#@randyridgley/cdk-datalake-constructs.KinesisStream)

---

##### `firehoseDeliveryToS3Critical`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties.property.firehoseDeliveryToS3Critical"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `firehoseDeliveryToS3Warning`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties.property.firehoseDeliveryToS3Warning"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `inputStreamGetRecordsWarning`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties.property.inputStreamGetRecordsWarning"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `inputStreamIteratorAgeCritical`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties.property.inputStreamIteratorAgeCritical"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `inputStreamIteratorAgeWarning`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties.property.inputStreamIteratorAgeWarning"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `inputStreamPutRecordsWarning`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties.property.inputStreamPutRecordsWarning"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `inputStreamReadThroughputWarning`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties.property.inputStreamReadThroughputWarning"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `inputStreamWriteThroughputWarning`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IKinesisOpsProperties.property.inputStreamWriteThroughputWarning"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

### IPipelineProperties <a name="@randyridgley/cdk-datalake-constructs.IPipelineProperties"></a>

- *Implemented By:* [`@randyridgley/cdk-datalake-constructs.IPipelineProperties`](#@randyridgley/cdk-datalake-constructs.IPipelineProperties)


#### Properties <a name="Properties"></a>

##### `dataCatalogOwner`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IPipelineProperties.property.dataCatalogOwner"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataCatalogOwner`](#@randyridgley/cdk-datalake-constructs.DataCatalogOwner)

---

##### `dataSetDropLocation`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IPipelineProperties.property.dataSetDropLocation"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataSetLocation`](#@randyridgley/cdk-datalake-constructs.DataSetLocation)

---

##### `destinationPrefix`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IPipelineProperties.property.destinationPrefix"></a>

- *Type:* `string`

---

##### `name`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IPipelineProperties.property.name"></a>

- *Type:* `string`

---

##### `type`<sup>Required</sup> <a name="@randyridgley/cdk-datalake-constructs.IPipelineProperties.property.type"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.DataPipelineType`](#@randyridgley/cdk-datalake-constructs.DataPipelineType)

---

##### `jdbcProperties`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IPipelineProperties.property.jdbcProperties"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.JDBCProperties`](#@randyridgley/cdk-datalake-constructs.JDBCProperties)

---

##### `job`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IPipelineProperties.property.job"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.JobProperties`](#@randyridgley/cdk-datalake-constructs.JobProperties)

---

##### `s3NotificationProps`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IPipelineProperties.property.s3NotificationProps"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.S3NotificationProperties`](#@randyridgley/cdk-datalake-constructs.S3NotificationProperties)

---

##### `s3Properties`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IPipelineProperties.property.s3Properties"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.S3Properties`](#@randyridgley/cdk-datalake-constructs.S3Properties)

---

##### `streamProperties`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IPipelineProperties.property.streamProperties"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.StreamProperties`](#@randyridgley/cdk-datalake-constructs.StreamProperties)

---

##### `table`<sup>Optional</sup> <a name="@randyridgley/cdk-datalake-constructs.IPipelineProperties.property.table"></a>

- *Type:* [`@randyridgley/cdk-datalake-constructs.TableProps`](#@randyridgley/cdk-datalake-constructs.TableProps)

---

## Enums <a name="Enums"></a>

### CompressionType <a name="CompressionType"></a>

#### `UNCOMPRESSED` <a name="@randyridgley/cdk-datalake-constructs.CompressionType.UNCOMPRESSED"></a>

---


#### `GZIP` <a name="@randyridgley/cdk-datalake-constructs.CompressionType.GZIP"></a>

---


#### `ZIP` <a name="@randyridgley/cdk-datalake-constructs.CompressionType.ZIP"></a>

---


#### `SNAPPY` <a name="@randyridgley/cdk-datalake-constructs.CompressionType.SNAPPY"></a>

---


### DataPipelineType <a name="DataPipelineType"></a>

#### `STREAM` <a name="@randyridgley/cdk-datalake-constructs.DataPipelineType.STREAM"></a>

---


#### `JDBC` <a name="@randyridgley/cdk-datalake-constructs.DataPipelineType.JDBC"></a>

---


#### `S3` <a name="@randyridgley/cdk-datalake-constructs.DataPipelineType.S3"></a>

---


### DataSetLocation <a name="DataSetLocation"></a>

#### `RAW` <a name="@randyridgley/cdk-datalake-constructs.DataSetLocation.RAW"></a>

---


#### `TRUSTED` <a name="@randyridgley/cdk-datalake-constructs.DataSetLocation.TRUSTED"></a>

---


#### `REFINED` <a name="@randyridgley/cdk-datalake-constructs.DataSetLocation.REFINED"></a>

---


### DeliveryStreamType <a name="DeliveryStreamType"></a>

#### `DIRECT_PUT` <a name="@randyridgley/cdk-datalake-constructs.DeliveryStreamType.DIRECT_PUT"></a>

---


#### `KINESIS_STREAM_AS_SOURCE` <a name="@randyridgley/cdk-datalake-constructs.DeliveryStreamType.KINESIS_STREAM_AS_SOURCE"></a>

---


### GlueJobType <a name="GlueJobType"></a>

#### `GLUE_ETL` <a name="@randyridgley/cdk-datalake-constructs.GlueJobType.GLUE_ETL"></a>

---


#### `GLUE_STREAMING` <a name="@randyridgley/cdk-datalake-constructs.GlueJobType.GLUE_STREAMING"></a>

---


### GlueVersion <a name="GlueVersion"></a>

#### `V_0` <a name="@randyridgley/cdk-datalake-constructs.GlueVersion.V_0"></a>

---


#### `V_1` <a name="@randyridgley/cdk-datalake-constructs.GlueVersion.V_1"></a>

---


#### `V_2` <a name="@randyridgley/cdk-datalake-constructs.GlueVersion.V_2"></a>

---


### GlueWorkerType <a name="GlueWorkerType"></a>

#### `STANDARD` <a name="@randyridgley/cdk-datalake-constructs.GlueWorkerType.STANDARD"></a>

---


#### `G1_X` <a name="@randyridgley/cdk-datalake-constructs.GlueWorkerType.G1_X"></a>

---


#### `G2_X` <a name="@randyridgley/cdk-datalake-constructs.GlueWorkerType.G2_X"></a>

---


### Permissions <a name="Permissions"></a>

#### `ALTER` <a name="@randyridgley/cdk-datalake-constructs.Permissions.ALTER"></a>

---


#### `CREATE_DATABASE` <a name="@randyridgley/cdk-datalake-constructs.Permissions.CREATE_DATABASE"></a>

---


#### `CREATE_TABLE` <a name="@randyridgley/cdk-datalake-constructs.Permissions.CREATE_TABLE"></a>

---


#### `DATA_LOCATION_ACCESS` <a name="@randyridgley/cdk-datalake-constructs.Permissions.DATA_LOCATION_ACCESS"></a>

---


#### `DELETE` <a name="@randyridgley/cdk-datalake-constructs.Permissions.DELETE"></a>

---


#### `DESCRIBE` <a name="@randyridgley/cdk-datalake-constructs.Permissions.DESCRIBE"></a>

---


#### `DROP` <a name="@randyridgley/cdk-datalake-constructs.Permissions.DROP"></a>

---


#### `INSERT` <a name="@randyridgley/cdk-datalake-constructs.Permissions.INSERT"></a>

---


#### `SELECT` <a name="@randyridgley/cdk-datalake-constructs.Permissions.SELECT"></a>

---


#### `ASSOCIATE` <a name="@randyridgley/cdk-datalake-constructs.Permissions.ASSOCIATE"></a>

---


### ProcessorType <a name="ProcessorType"></a>

#### `LAMBDA` <a name="@randyridgley/cdk-datalake-constructs.ProcessorType.LAMBDA"></a>

---


### Stage <a name="Stage"></a>

#### `ALPHA` <a name="@randyridgley/cdk-datalake-constructs.Stage.ALPHA"></a>

---


#### `BETA` <a name="@randyridgley/cdk-datalake-constructs.Stage.BETA"></a>

---


#### `GAMMA` <a name="@randyridgley/cdk-datalake-constructs.Stage.GAMMA"></a>

---


#### `PROD` <a name="@randyridgley/cdk-datalake-constructs.Stage.PROD"></a>

---

