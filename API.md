# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### DataLake <a name="cdk-datalake-constructs.DataLake"></a>

#### Initializer <a name="cdk-datalake-constructs.DataLake.Initializer"></a>

```typescript
import { DataLake } from 'cdk-datalake-constructs'

new DataLake(scope: Construct, id: string, props: DataLakeProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.DataLakeProps`](#cdk-datalake-constructs.DataLakeProps)

---

#### Methods <a name="Methods"></a>

##### `addPipeline` <a name="cdk-datalake-constructs.DataLake.addPipeline"></a>

```typescript
public addPipeline(pipeline: Pipeline, databaseName: string)
```

###### `pipeline`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.parameter.pipeline"></a>

- *Type:* [`cdk-datalake-constructs.Pipeline`](#cdk-datalake-constructs.Pipeline)

---

###### `databaseName`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.parameter.databaseName"></a>

- *Type:* `string`

---

##### `createDatabase` <a name="cdk-datalake-constructs.DataLake.createDatabase"></a>

```typescript
public createDatabase(databaseName: string)
```

###### `databaseName`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.parameter.databaseName"></a>

- *Type:* `string`

---

##### `registerDataSet` <a name="cdk-datalake-constructs.DataLake.registerDataSet"></a>

```typescript
public registerDataSet(setting: IDataLocationProperties)
```

###### `setting`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.parameter.setting"></a>

- *Type:* [`cdk-datalake-constructs.IDataLocationProperties`](#cdk-datalake-constructs.IDataLocationProperties)

---


#### Properties <a name="Properties"></a>

##### `accountId`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.property.accountId"></a>

- *Type:* `string`

---

##### `athenaWorkgroup`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.property.athenaWorkgroup"></a>

- *Type:* [`@aws-cdk/aws-athena.CfnWorkGroup`](#@aws-cdk/aws-athena.CfnWorkGroup)

---

##### `databases`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.property.databases"></a>

- *Type:* {[ key: string ]: [`@aws-cdk/aws-glue.Database`](#@aws-cdk/aws-glue.Database)}

---

##### `dataCatalogAccountId`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.property.dataCatalogAccountId"></a>

- *Type:* `string`

---

##### `datalakeAdminRole`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.property.datalakeAdminRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

##### `datalakeDbCreatorRole`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.property.datalakeDbCreatorRole"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---

##### `dataLocations`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.property.dataLocations"></a>

- *Type:* {[ key: string ]: [`cdk-datalake-constructs.DataSetResult`](#cdk-datalake-constructs.DataSetResult)}

---

##### `dataSets`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.property.dataSets"></a>

- *Type:* {[ key: string ]: [`cdk-datalake-constructs.DataSet`](#cdk-datalake-constructs.DataSet)}

---

##### `dataStreams`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.property.dataStreams"></a>

- *Type:* {[ key: string ]: [`cdk-datalake-constructs.KinesisStream`](#cdk-datalake-constructs.KinesisStream)}

---

##### `logBucket`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.property.logBucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---

##### `region`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.property.region"></a>

- *Type:* `string`

---

##### `stageName`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLake.property.stageName"></a>

- *Type:* [`cdk-datalake-constructs.Stage`](#cdk-datalake-constructs.Stage)

---

##### `glueSecurityGroup`<sup>Optional</sup> <a name="cdk-datalake-constructs.DataLake.property.glueSecurityGroup"></a>

- *Type:* [`@aws-cdk/aws-ec2.SecurityGroup`](#@aws-cdk/aws-ec2.SecurityGroup)

---

##### `vpc`<sup>Optional</sup> <a name="cdk-datalake-constructs.DataLake.property.vpc"></a>

- *Type:* [`@aws-cdk/aws-ec2.Vpc`](#@aws-cdk/aws-ec2.Vpc)

---


### DataLakeAdministrator <a name="cdk-datalake-constructs.DataLakeAdministrator"></a>

#### Initializer <a name="cdk-datalake-constructs.DataLakeAdministrator.Initializer"></a>

```typescript
import { DataLakeAdministrator } from 'cdk-datalake-constructs'

new DataLakeAdministrator(scope: Construct, id: string, props: DataLakeAdministratorProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeAdministrator.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeAdministrator.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeAdministrator.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.DataLakeAdministratorProps`](#cdk-datalake-constructs.DataLakeAdministratorProps)

---



#### Properties <a name="Properties"></a>

##### `role`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeAdministrator.property.role"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---


### DataLakeAnalyst <a name="cdk-datalake-constructs.DataLakeAnalyst"></a>

#### Initializer <a name="cdk-datalake-constructs.DataLakeAnalyst.Initializer"></a>

```typescript
import { DataLakeAnalyst } from 'cdk-datalake-constructs'

new DataLakeAnalyst(scope: Construct, id: string, props: DataLakeAnalystProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeAnalyst.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeAnalyst.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeAnalyst.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.DataLakeAnalystProps`](#cdk-datalake-constructs.DataLakeAnalystProps)

---



#### Properties <a name="Properties"></a>

##### `user`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeAnalyst.property.user"></a>

- *Type:* [`@aws-cdk/aws-iam.User`](#@aws-cdk/aws-iam.User)

---


### DataLakeBucket <a name="cdk-datalake-constructs.DataLakeBucket"></a>

#### Initializer <a name="cdk-datalake-constructs.DataLakeBucket.Initializer"></a>

```typescript
import { DataLakeBucket } from 'cdk-datalake-constructs'

new DataLakeBucket(scope: Construct, id: string, props: DataLakeBucketProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeBucket.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeBucket.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeBucket.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.DataLakeBucketProps`](#cdk-datalake-constructs.DataLakeBucketProps)

---



#### Properties <a name="Properties"></a>

##### `bucket`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeBucket.property.bucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---


### DataSet <a name="cdk-datalake-constructs.DataSet"></a>

#### Initializer <a name="cdk-datalake-constructs.DataSet.Initializer"></a>

```typescript
import { DataSet } from 'cdk-datalake-constructs'

new DataSet(scope: Construct, id: string, props: IDataSetProperties)
```

##### `scope`<sup>Required</sup> <a name="cdk-datalake-constructs.DataSet.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-datalake-constructs.DataSet.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.DataSet.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.IDataSetProperties`](#cdk-datalake-constructs.IDataSetProperties)

---



#### Properties <a name="Properties"></a>

##### `dataSetFiles`<sup>Required</sup> <a name="cdk-datalake-constructs.DataSet.property.dataSetFiles"></a>

- *Type:* [`cdk-datalake-constructs.DataSetResult`](#cdk-datalake-constructs.DataSetResult)

---

##### `lakeBucket`<sup>Required</sup> <a name="cdk-datalake-constructs.DataSet.property.lakeBucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---

##### `encryptionKey`<sup>Optional</sup> <a name="cdk-datalake-constructs.DataSet.property.encryptionKey"></a>

- *Type:* [`@aws-cdk/aws-kms.Key`](#@aws-cdk/aws-kms.Key)

---

##### `s3NotificationTopic`<sup>Optional</sup> <a name="cdk-datalake-constructs.DataSet.property.s3NotificationTopic"></a>

- *Type:* [`@aws-cdk/aws-sns.Topic`](#@aws-cdk/aws-sns.Topic)

---


### GlueCrawler <a name="cdk-datalake-constructs.GlueCrawler"></a>

#### Initializer <a name="cdk-datalake-constructs.GlueCrawler.Initializer"></a>

```typescript
import { GlueCrawler } from 'cdk-datalake-constructs'

new GlueCrawler(scope: Construct, id: string, props: IGlueCrawlerProperties)
```

##### `scope`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueCrawler.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueCrawler.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueCrawler.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.IGlueCrawlerProperties`](#cdk-datalake-constructs.IGlueCrawlerProperties)

---

#### Methods <a name="Methods"></a>

##### `metricFailure` <a name="cdk-datalake-constructs.GlueCrawler.metricFailure"></a>

```typescript
public metricFailure(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.GlueCrawler.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSuccess` <a name="cdk-datalake-constructs.GlueCrawler.metricSuccess"></a>

```typescript
public metricSuccess(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.GlueCrawler.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---


#### Properties <a name="Properties"></a>

##### `crawler`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueCrawler.property.crawler"></a>

- *Type:* [`@aws-cdk/aws-glue.CfnCrawler`](#@aws-cdk/aws-glue.CfnCrawler)

---

##### `metricFailureRule`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueCrawler.property.metricFailureRule"></a>

- *Type:* [`@aws-cdk/aws-events.Rule`](#@aws-cdk/aws-events.Rule)

---

##### `metricSuccessRule`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueCrawler.property.metricSuccessRule"></a>

- *Type:* [`@aws-cdk/aws-events.Rule`](#@aws-cdk/aws-events.Rule)

---

##### `role`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueCrawler.property.role"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---


### GlueJob <a name="cdk-datalake-constructs.GlueJob"></a>

#### Initializer <a name="cdk-datalake-constructs.GlueJob.Initializer"></a>

```typescript
import { GlueJob } from 'cdk-datalake-constructs'

new GlueJob(scope: Construct, id: string, props: IGlueJobProperties)
```

##### `scope`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.IGlueJobProperties`](#cdk-datalake-constructs.IGlueJobProperties)

---

#### Methods <a name="Methods"></a>

##### `diskSpaceUsedMbMetric` <a name="cdk-datalake-constructs.GlueJob.diskSpaceUsedMbMetric"></a>

```typescript
public diskSpaceUsedMbMetric(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `elapsedTimeMetric` <a name="cdk-datalake-constructs.GlueJob.elapsedTimeMetric"></a>

```typescript
public elapsedTimeMetric(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `jvmHeapUsageMetric` <a name="cdk-datalake-constructs.GlueJob.jvmHeapUsageMetric"></a>

```typescript
public jvmHeapUsageMetric(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metric` <a name="cdk-datalake-constructs.GlueJob.metric"></a>

```typescript
public metric(metricName: string, dimensionType: string, props?: MetricOptions)
```

###### `metricName`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.parameter.metricName"></a>

- *Type:* `string`

---

###### `dimensionType`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.parameter.dimensionType"></a>

- *Type:* `string`

---

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricAllExecutionAttemptsFailed` <a name="cdk-datalake-constructs.GlueJob.metricAllExecutionAttemptsFailed"></a>

```typescript
public metricAllExecutionAttemptsFailed(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricFailure` <a name="cdk-datalake-constructs.GlueJob.metricFailure"></a>

```typescript
public metricFailure(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSuccess` <a name="cdk-datalake-constructs.GlueJob.metricSuccess"></a>

```typescript
public metricSuccess(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricTimeout` <a name="cdk-datalake-constructs.GlueJob.metricTimeout"></a>

```typescript
public metricTimeout(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `runTimeInMiliseconds` <a name="cdk-datalake-constructs.GlueJob.runTimeInMiliseconds"></a>

```typescript
public runTimeInMiliseconds(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.GlueJob.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---


#### Properties <a name="Properties"></a>

##### `allExecutionAttemptsFailedEventDetailType`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.property.allExecutionAttemptsFailedEventDetailType"></a>

- *Type:* `string`

---

##### `allExecutionAttemptsFailedEventSource`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.property.allExecutionAttemptsFailedEventSource"></a>

- *Type:* `string`

---

##### `executionFailureRule`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.property.executionFailureRule"></a>

- *Type:* [`@aws-cdk/aws-events.Rule`](#@aws-cdk/aws-events.Rule)

---

##### `job`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.property.job"></a>

- *Type:* [`@aws-cdk/aws-glue.CfnJob`](#@aws-cdk/aws-glue.CfnJob)

---

##### `lambdaFunction`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.property.lambdaFunction"></a>

- *Type:* [`@aws-cdk/aws-lambda.SingletonFunction`](#@aws-cdk/aws-lambda.SingletonFunction)

---

##### `metricFailureRule`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.property.metricFailureRule"></a>

- *Type:* [`@aws-cdk/aws-events.Rule`](#@aws-cdk/aws-events.Rule)

---

##### `metricSuccessRule`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.property.metricSuccessRule"></a>

- *Type:* [`@aws-cdk/aws-events.Rule`](#@aws-cdk/aws-events.Rule)

---

##### `metricTimeoutRule`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.property.metricTimeoutRule"></a>

- *Type:* [`@aws-cdk/aws-events.Rule`](#@aws-cdk/aws-events.Rule)

---

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.property.name"></a>

- *Type:* `string`

---

##### `role`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJob.property.role"></a>

- *Type:* [`@aws-cdk/aws-iam.IRole`](#@aws-cdk/aws-iam.IRole)

---


### GlueJobOps <a name="cdk-datalake-constructs.GlueJobOps"></a>

#### Initializer <a name="cdk-datalake-constructs.GlueJobOps.Initializer"></a>

```typescript
import { GlueJobOps } from 'cdk-datalake-constructs'

new GlueJobOps(scope: Construct, id: string, props: IGlueOpsProperties)
```

##### `scope`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJobOps.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJobOps.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJobOps.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.IGlueOpsProperties`](#cdk-datalake-constructs.IGlueOpsProperties)

---



#### Properties <a name="Properties"></a>

##### `alarmsSev2`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJobOps.property.alarmsSev2"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)[]

---

##### `alarmsSev3`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJobOps.property.alarmsSev3"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)[]

---

##### `job`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJobOps.property.job"></a>

- *Type:* [`cdk-datalake-constructs.GlueJob`](#cdk-datalake-constructs.GlueJob)

---

##### `jvmHeapSizeExceeding80PercentAlarm`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJobOps.property.jvmHeapSizeExceeding80PercentAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `jvmHeapSizeExceeding90PercentAlarm`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJobOps.property.jvmHeapSizeExceeding90PercentAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `metricAllExecutionAttemptsFailedAlarm`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJobOps.property.metricAllExecutionAttemptsFailedAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `metricExecutionFailureAlarm`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJobOps.property.metricExecutionFailureAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `dashboard`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueJobOps.property.dashboard"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Dashboard`](#@aws-cdk/aws-cloudwatch.Dashboard)

---


### GlueNotebook <a name="cdk-datalake-constructs.GlueNotebook"></a>

#### Initializer <a name="cdk-datalake-constructs.GlueNotebook.Initializer"></a>

```typescript
import { GlueNotebook } from 'cdk-datalake-constructs'

new GlueNotebook(scope: Construct, id: string, props: IGlueNotebookProperties)
```

##### `scope`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueNotebook.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueNotebook.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueNotebook.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.IGlueNotebookProperties`](#cdk-datalake-constructs.IGlueNotebookProperties)

---





### GlueTable <a name="cdk-datalake-constructs.GlueTable"></a>

#### Initializer <a name="cdk-datalake-constructs.GlueTable.Initializer"></a>

```typescript
import { GlueTable } from 'cdk-datalake-constructs'

new GlueTable(scope: Construct, id: string, props: IGlueTableProperties)
```

##### `scope`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueTable.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueTable.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueTable.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.IGlueTableProperties`](#cdk-datalake-constructs.IGlueTableProperties)

---



#### Properties <a name="Properties"></a>

##### `table`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueTable.property.table"></a>

- *Type:* [`@aws-cdk/aws-glue.CfnTable`](#@aws-cdk/aws-glue.CfnTable)

---

##### `tableName`<sup>Required</sup> <a name="cdk-datalake-constructs.GlueTable.property.tableName"></a>

- *Type:* `string`

---


### KinesisOps <a name="cdk-datalake-constructs.KinesisOps"></a>

#### Initializer <a name="cdk-datalake-constructs.KinesisOps.Initializer"></a>

```typescript
import { KinesisOps } from 'cdk-datalake-constructs'

new KinesisOps(scope: Construct, id: string, props: IKinesisOpsProperties)
```

##### `scope`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.IKinesisOpsProperties`](#cdk-datalake-constructs.IKinesisOpsProperties)

---



#### Properties <a name="Properties"></a>

##### `alarmsSev2`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.property.alarmsSev2"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)[]

---

##### `alarmsSev3`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.property.alarmsSev3"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)[]

---

##### `deliveryStream`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.property.deliveryStream"></a>

- *Type:* [`cdk-datalake-constructs.S3DeliveryStream`](#cdk-datalake-constructs.S3DeliveryStream)

---

##### `firehoseDeliveryToS3CriticalAlarm`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.property.firehoseDeliveryToS3CriticalAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `firehoseDeliveryToS3WarningAlarm`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.property.firehoseDeliveryToS3WarningAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `inputStreamGetRecordsWarningAlarm`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.property.inputStreamGetRecordsWarningAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `inputStreamIteratorAgeCriticalAlarm`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.property.inputStreamIteratorAgeCriticalAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `inputStreamIteratorAgeWarningAlarm`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.property.inputStreamIteratorAgeWarningAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `inputStreamPutRecordsWarningAlarm`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.property.inputStreamPutRecordsWarningAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `inputStreamReadThroughputWarningAlarm`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.property.inputStreamReadThroughputWarningAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `inputStreamWriteThroughputWarningAlarm`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.property.inputStreamWriteThroughputWarningAlarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

##### `stream`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.property.stream"></a>

- *Type:* [`cdk-datalake-constructs.KinesisStream`](#cdk-datalake-constructs.KinesisStream)

---

##### `streamName`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.property.streamName"></a>

- *Type:* `string`

---

##### `dashboard`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisOps.property.dashboard"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Dashboard`](#@aws-cdk/aws-cloudwatch.Dashboard)

---


### KinesisStream <a name="cdk-datalake-constructs.KinesisStream"></a>

#### Initializer <a name="cdk-datalake-constructs.KinesisStream.Initializer"></a>

```typescript
import { KinesisStream } from 'cdk-datalake-constructs'

new KinesisStream(parent: Construct, name: string, props: StreamProps)
```

##### `parent`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.parent"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.name"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-kinesis.StreamProps`](#@aws-cdk/aws-kinesis.StreamProps)

---

#### Methods <a name="Methods"></a>

##### `metric` <a name="cdk-datalake-constructs.KinesisStream.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions)
```

###### `metricName`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.metricName"></a>

- *Type:* `string`

---

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricGetRecordsBytes` <a name="cdk-datalake-constructs.KinesisStream.metricGetRecordsBytes"></a>

```typescript
public metricGetRecordsBytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricGetRecordsIteratorAgeMilliseconds` <a name="cdk-datalake-constructs.KinesisStream.metricGetRecordsIteratorAgeMilliseconds"></a>

```typescript
public metricGetRecordsIteratorAgeMilliseconds(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricGetRecordsLatency` <a name="cdk-datalake-constructs.KinesisStream.metricGetRecordsLatency"></a>

```typescript
public metricGetRecordsLatency(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricGetRecordsRecords` <a name="cdk-datalake-constructs.KinesisStream.metricGetRecordsRecords"></a>

```typescript
public metricGetRecordsRecords(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricGetRecordsSuccess` <a name="cdk-datalake-constructs.KinesisStream.metricGetRecordsSuccess"></a>

```typescript
public metricGetRecordsSuccess(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricIncomingBytes` <a name="cdk-datalake-constructs.KinesisStream.metricIncomingBytes"></a>

```typescript
public metricIncomingBytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricIncomingRecords` <a name="cdk-datalake-constructs.KinesisStream.metricIncomingRecords"></a>

```typescript
public metricIncomingRecords(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricPutRecordBytes` <a name="cdk-datalake-constructs.KinesisStream.metricPutRecordBytes"></a>

```typescript
public metricPutRecordBytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricPutRecordLatency` <a name="cdk-datalake-constructs.KinesisStream.metricPutRecordLatency"></a>

```typescript
public metricPutRecordLatency(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricPutRecordsBytes` <a name="cdk-datalake-constructs.KinesisStream.metricPutRecordsBytes"></a>

```typescript
public metricPutRecordsBytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricPutRecordsLatency` <a name="cdk-datalake-constructs.KinesisStream.metricPutRecordsLatency"></a>

```typescript
public metricPutRecordsLatency(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricPutRecordsRecords` <a name="cdk-datalake-constructs.KinesisStream.metricPutRecordsRecords"></a>

```typescript
public metricPutRecordsRecords(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricPutRecordsSuccess` <a name="cdk-datalake-constructs.KinesisStream.metricPutRecordsSuccess"></a>

```typescript
public metricPutRecordsSuccess(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricPutRecordSuccess` <a name="cdk-datalake-constructs.KinesisStream.metricPutRecordSuccess"></a>

```typescript
public metricPutRecordSuccess(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricReadProvisionedThroughputExceeded` <a name="cdk-datalake-constructs.KinesisStream.metricReadProvisionedThroughputExceeded"></a>

```typescript
public metricReadProvisionedThroughputExceeded(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSubscribeToShardEventBytes` <a name="cdk-datalake-constructs.KinesisStream.metricSubscribeToShardEventBytes"></a>

```typescript
public metricSubscribeToShardEventBytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSubscribeToShardEventMillisBehindLatest` <a name="cdk-datalake-constructs.KinesisStream.metricSubscribeToShardEventMillisBehindLatest"></a>

```typescript
public metricSubscribeToShardEventMillisBehindLatest(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSubscribeToShardEventRecords` <a name="cdk-datalake-constructs.KinesisStream.metricSubscribeToShardEventRecords"></a>

```typescript
public metricSubscribeToShardEventRecords(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSubscribeToShardEventSuccess` <a name="cdk-datalake-constructs.KinesisStream.metricSubscribeToShardEventSuccess"></a>

```typescript
public metricSubscribeToShardEventSuccess(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSubscribeToShardRateExceeded` <a name="cdk-datalake-constructs.KinesisStream.metricSubscribeToShardRateExceeded"></a>

```typescript
public metricSubscribeToShardRateExceeded(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricSubscribeToShardSuccess` <a name="cdk-datalake-constructs.KinesisStream.metricSubscribeToShardSuccess"></a>

```typescript
public metricSubscribeToShardSuccess(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricWriteProvisionedThroughputExceeded` <a name="cdk-datalake-constructs.KinesisStream.metricWriteProvisionedThroughputExceeded"></a>

```typescript
public metricWriteProvisionedThroughputExceeded(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.KinesisStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---


#### Properties <a name="Properties"></a>

##### `stream`<sup>Required</sup> <a name="cdk-datalake-constructs.KinesisStream.property.stream"></a>

- *Type:* [`@aws-cdk/aws-kinesis.Stream`](#@aws-cdk/aws-kinesis.Stream)

---


### RegisteredDataSet <a name="cdk-datalake-constructs.RegisteredDataSet"></a>

#### Initializer <a name="cdk-datalake-constructs.RegisteredDataSet.Initializer"></a>

```typescript
import { RegisteredDataSet } from 'cdk-datalake-constructs'

new RegisteredDataSet(scope: Construct, id: string, props: IRegisteredDataSetProperties)
```

##### `scope`<sup>Required</sup> <a name="cdk-datalake-constructs.RegisteredDataSet.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-datalake-constructs.RegisteredDataSet.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.RegisteredDataSet.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.IRegisteredDataSetProperties`](#cdk-datalake-constructs.IRegisteredDataSetProperties)

---





### S3DeliveryStream <a name="cdk-datalake-constructs.S3DeliveryStream"></a>

#### Initializer <a name="cdk-datalake-constructs.S3DeliveryStream.Initializer"></a>

```typescript
import { S3DeliveryStream } from 'cdk-datalake-constructs'

new S3DeliveryStream(parent: Construct, name: string, props: IDeliveryStreamProperties)
```

##### `parent`<sup>Required</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.parent"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.name"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.IDeliveryStreamProperties`](#cdk-datalake-constructs.IDeliveryStreamProperties)

---

#### Methods <a name="Methods"></a>

##### `metric` <a name="cdk-datalake-constructs.S3DeliveryStream.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions)
```

###### `metricName`<sup>Required</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.metricName"></a>

- *Type:* `string`

---

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricBackupToS3Bytes` <a name="cdk-datalake-constructs.S3DeliveryStream.metricBackupToS3Bytes"></a>

```typescript
public metricBackupToS3Bytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricBackupToS3DataFreshness` <a name="cdk-datalake-constructs.S3DeliveryStream.metricBackupToS3DataFreshness"></a>

```typescript
public metricBackupToS3DataFreshness(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricBackupToS3Records` <a name="cdk-datalake-constructs.S3DeliveryStream.metricBackupToS3Records"></a>

```typescript
public metricBackupToS3Records(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricBackupToS3Success` <a name="cdk-datalake-constructs.S3DeliveryStream.metricBackupToS3Success"></a>

```typescript
public metricBackupToS3Success(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricDataReadFromKinesisStreamBytes` <a name="cdk-datalake-constructs.S3DeliveryStream.metricDataReadFromKinesisStreamBytes"></a>

```typescript
public metricDataReadFromKinesisStreamBytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricDataReadFromKinesisStreamRecords` <a name="cdk-datalake-constructs.S3DeliveryStream.metricDataReadFromKinesisStreamRecords"></a>

```typescript
public metricDataReadFromKinesisStreamRecords(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricDeliveryToS3Bytes` <a name="cdk-datalake-constructs.S3DeliveryStream.metricDeliveryToS3Bytes"></a>

```typescript
public metricDeliveryToS3Bytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricDeliveryToS3DataFreshness` <a name="cdk-datalake-constructs.S3DeliveryStream.metricDeliveryToS3DataFreshness"></a>

```typescript
public metricDeliveryToS3DataFreshness(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricDeliveryToS3Records` <a name="cdk-datalake-constructs.S3DeliveryStream.metricDeliveryToS3Records"></a>

```typescript
public metricDeliveryToS3Records(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricDeliveryToS3Success` <a name="cdk-datalake-constructs.S3DeliveryStream.metricDeliveryToS3Success"></a>

```typescript
public metricDeliveryToS3Success(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricIncomingBytes` <a name="cdk-datalake-constructs.S3DeliveryStream.metricIncomingBytes"></a>

```typescript
public metricIncomingBytes(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---

##### `metricIncomingRecords` <a name="cdk-datalake-constructs.S3DeliveryStream.metricIncomingRecords"></a>

```typescript
public metricIncomingRecords(props?: MetricOptions)
```

###### `props`<sup>Optional</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.MetricOptions`](#@aws-cdk/aws-cloudwatch.MetricOptions)

---


#### Properties <a name="Properties"></a>

##### `deliveryStreamArn`<sup>Required</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.property.deliveryStreamArn"></a>

- *Type:* `string`

---

##### `deliveryStreamName`<sup>Required</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.property.deliveryStreamName"></a>

- *Type:* `string`

---

##### `s3Bucket`<sup>Required</sup> <a name="cdk-datalake-constructs.S3DeliveryStream.property.s3Bucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---


## Structs <a name="Structs"></a>

### CrossAccountProps <a name="cdk-datalake-constructs.CrossAccountProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { CrossAccountProps } from 'cdk-datalake-constructs'

const crossAccountProps: CrossAccountProps = { ... }
```

##### `consumerAccountIds`<sup>Required</sup> <a name="cdk-datalake-constructs.CrossAccountProps.property.consumerAccountIds"></a>

- *Type:* `string`[]

---

##### `producerAccountId`<sup>Required</sup> <a name="cdk-datalake-constructs.CrossAccountProps.property.producerAccountId"></a>

- *Type:* `string`

---

##### `region`<sup>Required</sup> <a name="cdk-datalake-constructs.CrossAccountProps.property.region"></a>

- *Type:* `string`

---

### DataCatalogOwner <a name="cdk-datalake-constructs.DataCatalogOwner"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataCatalogOwner } from 'cdk-datalake-constructs'

const dataCatalogOwner: DataCatalogOwner = { ... }
```

##### `accountId`<sup>Required</sup> <a name="cdk-datalake-constructs.DataCatalogOwner.property.accountId"></a>

- *Type:* `string`

---

### DataLakeAdministratorProps <a name="cdk-datalake-constructs.DataLakeAdministratorProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataLakeAdministratorProps } from 'cdk-datalake-constructs'

const dataLakeAdministratorProps: DataLakeAdministratorProps = { ... }
```

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeAdministratorProps.property.name"></a>

- *Type:* `string`

---

### DataLakeAnalystProps <a name="cdk-datalake-constructs.DataLakeAnalystProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataLakeAnalystProps } from 'cdk-datalake-constructs'

const dataLakeAnalystProps: DataLakeAnalystProps = { ... }
```

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeAnalystProps.property.name"></a>

- *Type:* `string`

---

##### `readAccessBuckets`<sup>Optional</sup> <a name="cdk-datalake-constructs.DataLakeAnalystProps.property.readAccessBuckets"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)[]

---

##### `writeAccessBuckets`<sup>Optional</sup> <a name="cdk-datalake-constructs.DataLakeAnalystProps.property.writeAccessBuckets"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)[]

---

### DataLakeBucketProps <a name="cdk-datalake-constructs.DataLakeBucketProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataLakeBucketProps } from 'cdk-datalake-constructs'

const dataLakeBucketProps: DataLakeBucketProps = { ... }
```

##### `bucketName`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeBucketProps.property.bucketName"></a>

- *Type:* `string`

---

##### `dataCatalogAccountId`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeBucketProps.property.dataCatalogAccountId"></a>

- *Type:* `string`

---

### DataLakeProps <a name="cdk-datalake-constructs.DataLakeProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataLakeProps } from 'cdk-datalake-constructs'

const dataLakeProps: DataLakeProps = { ... }
```

##### `accountId`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeProps.property.accountId"></a>

- *Type:* `string`

---

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeProps.property.name"></a>

- *Type:* `string`

---

##### `region`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeProps.property.region"></a>

- *Type:* `string`

---

##### `stageName`<sup>Required</sup> <a name="cdk-datalake-constructs.DataLakeProps.property.stageName"></a>

- *Type:* [`cdk-datalake-constructs.Stage`](#cdk-datalake-constructs.Stage)

---

##### `crossAccount`<sup>Optional</sup> <a name="cdk-datalake-constructs.DataLakeProps.property.crossAccount"></a>

- *Type:* [`cdk-datalake-constructs.CrossAccountProps`](#cdk-datalake-constructs.CrossAccountProps)

---

##### `glueSecurityGroup`<sup>Optional</sup> <a name="cdk-datalake-constructs.DataLakeProps.property.glueSecurityGroup"></a>

- *Type:* [`@aws-cdk/aws-ec2.SecurityGroup`](#@aws-cdk/aws-ec2.SecurityGroup)

---

##### `policyTags`<sup>Optional</sup> <a name="cdk-datalake-constructs.DataLakeProps.property.policyTags"></a>

- *Type:* {[ key: string ]: `string`}

---

##### `vpc`<sup>Optional</sup> <a name="cdk-datalake-constructs.DataLakeProps.property.vpc"></a>

- *Type:* [`@aws-cdk/aws-ec2.Vpc`](#@aws-cdk/aws-ec2.Vpc)

---

### DataSetResult <a name="cdk-datalake-constructs.DataSetResult"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { DataSetResult } from 'cdk-datalake-constructs'

const dataSetResult: DataSetResult = { ... }
```

##### `destinationPrefix`<sup>Required</sup> <a name="cdk-datalake-constructs.DataSetResult.property.destinationPrefix"></a>

- *Type:* `string`

---

##### `sourceBucketName`<sup>Required</sup> <a name="cdk-datalake-constructs.DataSetResult.property.sourceBucketName"></a>

- *Type:* `string`

---

##### `sourceKeys`<sup>Required</sup> <a name="cdk-datalake-constructs.DataSetResult.property.sourceKeys"></a>

- *Type:* `string`[]

---

##### `destinationBucketName`<sup>Optional</sup> <a name="cdk-datalake-constructs.DataSetResult.property.destinationBucketName"></a>

- *Type:* `string`

---

## Classes <a name="Classes"></a>

### DataProduct <a name="cdk-datalake-constructs.DataProduct"></a>

#### Initializer <a name="cdk-datalake-constructs.DataProduct.Initializer"></a>

```typescript
import { DataProduct } from 'cdk-datalake-constructs'

new DataProduct(props: IDataProductProperties)
```

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.DataProduct.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.IDataProductProperties`](#cdk-datalake-constructs.IDataProductProperties)

---



#### Properties <a name="Properties"></a>

##### `accountId`<sup>Required</sup> <a name="cdk-datalake-constructs.DataProduct.property.accountId"></a>

- *Type:* `string`

---

##### `databaseName`<sup>Required</sup> <a name="cdk-datalake-constructs.DataProduct.property.databaseName"></a>

- *Type:* `string`

---

##### `pipelines`<sup>Required</sup> <a name="cdk-datalake-constructs.DataProduct.property.pipelines"></a>

- *Type:* [`cdk-datalake-constructs.Pipeline`](#cdk-datalake-constructs.Pipeline)[]

---


### Pipeline <a name="cdk-datalake-constructs.Pipeline"></a>

#### Initializer <a name="cdk-datalake-constructs.Pipeline.Initializer"></a>

```typescript
import { Pipeline } from 'cdk-datalake-constructs'

new Pipeline(props: IPipelineProperties)
```

##### `props`<sup>Required</sup> <a name="cdk-datalake-constructs.Pipeline.parameter.props"></a>

- *Type:* [`cdk-datalake-constructs.IPipelineProperties`](#cdk-datalake-constructs.IPipelineProperties)

---



#### Properties <a name="Properties"></a>

##### `dataCatalogOwner`<sup>Required</sup> <a name="cdk-datalake-constructs.Pipeline.property.dataCatalogOwner"></a>

- *Type:* [`cdk-datalake-constructs.DataCatalogOwner`](#cdk-datalake-constructs.DataCatalogOwner)

---

##### `destinationBucketName`<sup>Required</sup> <a name="cdk-datalake-constructs.Pipeline.property.destinationBucketName"></a>

- *Type:* `string`

---

##### `destinationPrefix`<sup>Required</sup> <a name="cdk-datalake-constructs.Pipeline.property.destinationPrefix"></a>

- *Type:* `string`

---

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.Pipeline.property.name"></a>

- *Type:* `string`

---

##### `type`<sup>Required</sup> <a name="cdk-datalake-constructs.Pipeline.property.type"></a>

- *Type:* [`cdk-datalake-constructs.DataPipelineType`](#cdk-datalake-constructs.DataPipelineType)

---

##### `jdbcProperties`<sup>Optional</sup> <a name="cdk-datalake-constructs.Pipeline.property.jdbcProperties"></a>

- *Type:* [`cdk-datalake-constructs.IJDBCProperties`](#cdk-datalake-constructs.IJDBCProperties)

---

##### `job`<sup>Optional</sup> <a name="cdk-datalake-constructs.Pipeline.property.job"></a>

- *Type:* [`cdk-datalake-constructs.IJobProperties`](#cdk-datalake-constructs.IJobProperties)

---

##### `s3NotificationProps`<sup>Optional</sup> <a name="cdk-datalake-constructs.Pipeline.property.s3NotificationProps"></a>

- *Type:* [`cdk-datalake-constructs.IS3NotificationProperties`](#cdk-datalake-constructs.IS3NotificationProperties)

---

##### `s3Properties`<sup>Optional</sup> <a name="cdk-datalake-constructs.Pipeline.property.s3Properties"></a>

- *Type:* [`cdk-datalake-constructs.IS3Properties`](#cdk-datalake-constructs.IS3Properties)

---

##### `streamProperties`<sup>Optional</sup> <a name="cdk-datalake-constructs.Pipeline.property.streamProperties"></a>

- *Type:* [`cdk-datalake-constructs.IStreamProperties`](#cdk-datalake-constructs.IStreamProperties)

---

##### `table`<sup>Optional</sup> <a name="cdk-datalake-constructs.Pipeline.property.table"></a>

- *Type:* [`cdk-datalake-constructs.ITableProps`](#cdk-datalake-constructs.ITableProps)

---


## Protocols <a name="Protocols"></a>

### IDataLocationProperties <a name="cdk-datalake-constructs.IDataLocationProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IDataLocationProperties`](#cdk-datalake-constructs.IDataLocationProperties)


#### Properties <a name="Properties"></a>

##### `databaseName`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataLocationProperties.property.databaseName"></a>

- *Type:* `string`

---

##### `destinationBucketName`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataLocationProperties.property.destinationBucketName"></a>

- *Type:* `string`

---

##### `destinationPrefix`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataLocationProperties.property.destinationPrefix"></a>

- *Type:* `string`

---

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataLocationProperties.property.name"></a>

- *Type:* `string`

---

### IDataProductProperties <a name="cdk-datalake-constructs.IDataProductProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IDataProductProperties`](#cdk-datalake-constructs.IDataProductProperties)


#### Properties <a name="Properties"></a>

##### `accountId`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataProductProperties.property.accountId"></a>

- *Type:* `string`

---

##### `databaseName`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataProductProperties.property.databaseName"></a>

- *Type:* `string`

---

##### `pipelines`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataProductProperties.property.pipelines"></a>

- *Type:* [`cdk-datalake-constructs.Pipeline`](#cdk-datalake-constructs.Pipeline)[]

---

### IDataSetProperties <a name="cdk-datalake-constructs.IDataSetProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IDataSetProperties`](#cdk-datalake-constructs.IDataSetProperties)


#### Properties <a name="Properties"></a>

##### `dataCatalogAccountId`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataSetProperties.property.dataCatalogAccountId"></a>

- *Type:* `string`

---

##### `destinationBucketName`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataSetProperties.property.destinationBucketName"></a>

- *Type:* `string`

---

##### `destinationPrefix`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataSetProperties.property.destinationPrefix"></a>

- *Type:* `string`

---

##### `logBucket`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataSetProperties.property.logBucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataSetProperties.property.name"></a>

- *Type:* `string`

---

##### `sourceBucketName`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataSetProperties.property.sourceBucketName"></a>

- *Type:* `string`

---

##### `sourceKeys`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataSetProperties.property.sourceKeys"></a>

- *Type:* `string`[]

---

##### `stage`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataSetProperties.property.stage"></a>

- *Type:* [`cdk-datalake-constructs.Stage`](#cdk-datalake-constructs.Stage)

---

##### `encryptionKey`<sup>Optional</sup> <a name="cdk-datalake-constructs.IDataSetProperties.property.encryptionKey"></a>

- *Type:* [`@aws-cdk/aws-kms.Key`](#@aws-cdk/aws-kms.Key)

---

##### `s3NotificationProps`<sup>Optional</sup> <a name="cdk-datalake-constructs.IDataSetProperties.property.s3NotificationProps"></a>

- *Type:* [`cdk-datalake-constructs.IS3NotificationProperties`](#cdk-datalake-constructs.IS3NotificationProperties)

---

### IDataStreamProperties <a name="cdk-datalake-constructs.IDataStreamProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IDataStreamProperties`](#cdk-datalake-constructs.IDataStreamProperties)


#### Properties <a name="Properties"></a>

##### `dataCatalogOwner`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataStreamProperties.property.dataCatalogOwner"></a>

- *Type:* [`cdk-datalake-constructs.DataCatalogOwner`](#cdk-datalake-constructs.DataCatalogOwner)

---

##### `destinationBucket`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataStreamProperties.property.destinationBucket"></a>

- *Type:* `string`

---

##### `destinationPrefix`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataStreamProperties.property.destinationPrefix"></a>

- *Type:* `string`

---

##### `lambdaDataGenerator`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataStreamProperties.property.lambdaDataGenerator"></a>

- *Type:* [`cdk-datalake-constructs.ILambdaDataGeneratorProperties`](#cdk-datalake-constructs.ILambdaDataGeneratorProperties)

---

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataStreamProperties.property.name"></a>

- *Type:* `string`

---

##### `streamName`<sup>Required</sup> <a name="cdk-datalake-constructs.IDataStreamProperties.property.streamName"></a>

- *Type:* `string`

---

### IDeliveryStreamProperties <a name="cdk-datalake-constructs.IDeliveryStreamProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IDeliveryStreamProperties`](#cdk-datalake-constructs.IDeliveryStreamProperties)


#### Properties <a name="Properties"></a>

##### `kinesisStream`<sup>Required</sup> <a name="cdk-datalake-constructs.IDeliveryStreamProperties.property.kinesisStream"></a>

- *Type:* [`@aws-cdk/aws-kinesis.Stream`](#@aws-cdk/aws-kinesis.Stream)

---

##### `s3Bucket`<sup>Required</sup> <a name="cdk-datalake-constructs.IDeliveryStreamProperties.property.s3Bucket"></a>

- *Type:* [`@aws-cdk/aws-s3.Bucket`](#@aws-cdk/aws-s3.Bucket)

---

##### `compression`<sup>Optional</sup> <a name="cdk-datalake-constructs.IDeliveryStreamProperties.property.compression"></a>

- *Type:* [`cdk-datalake-constructs.CompressionType`](#cdk-datalake-constructs.CompressionType)

---

##### `s3Prefix`<sup>Optional</sup> <a name="cdk-datalake-constructs.IDeliveryStreamProperties.property.s3Prefix"></a>

- *Type:* `string`

---

##### `transformFunction`<sup>Optional</sup> <a name="cdk-datalake-constructs.IDeliveryStreamProperties.property.transformFunction"></a>

- *Type:* [`@aws-cdk/aws-lambda.Function`](#@aws-cdk/aws-lambda.Function)

---

### IGlueCrawlerProperties <a name="cdk-datalake-constructs.IGlueCrawlerProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IGlueCrawlerProperties`](#cdk-datalake-constructs.IGlueCrawlerProperties)


#### Properties <a name="Properties"></a>

##### `bucketName`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueCrawlerProperties.property.bucketName"></a>

- *Type:* `string`

---

##### `databaseName`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueCrawlerProperties.property.databaseName"></a>

- *Type:* `string`

---

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueCrawlerProperties.property.name"></a>

- *Type:* `string`

---

##### `bucketPrefix`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueCrawlerProperties.property.bucketPrefix"></a>

- *Type:* `string`

---

##### `roleName`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueCrawlerProperties.property.roleName"></a>

- *Type:* `string`

---

##### `trigger`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueCrawlerProperties.property.trigger"></a>

- *Type:* [`@aws-cdk/aws-glue.CfnTrigger`](#@aws-cdk/aws-glue.CfnTrigger)

---

### IGlueJobProperties <a name="cdk-datalake-constructs.IGlueJobProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IGlueJobProperties`](#cdk-datalake-constructs.IGlueJobProperties)


#### Properties <a name="Properties"></a>

##### `deploymentBucket`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.deploymentBucket"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)

---

##### `jobScript`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.jobScript"></a>

- *Type:* `string`

---

##### `jobType`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.jobType"></a>

- *Type:* [`cdk-datalake-constructs.GlueJobType`](#cdk-datalake-constructs.GlueJobType)

---

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.name"></a>

- *Type:* `string`

---

##### `workerType`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.workerType"></a>

- *Type:* [`cdk-datalake-constructs.GlueWorkerType`](#cdk-datalake-constructs.GlueWorkerType)

---

##### `description`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.description"></a>

- *Type:* `string`

---

##### `glueVersion`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.glueVersion"></a>

- *Type:* [`cdk-datalake-constructs.GlueVersion`](#cdk-datalake-constructs.GlueVersion)

---

##### `jobArgs`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.jobArgs"></a>

- *Type:* {[ key: string ]: `string`}

---

##### `maxCapacity`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.maxCapacity"></a>

- *Type:* `number`

---

##### `maxConcurrentRuns`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.maxConcurrentRuns"></a>

- *Type:* `number`

---

##### `maxRetries`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.maxRetries"></a>

- *Type:* `number`

---

##### `numberOfWorkers`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.numberOfWorkers"></a>

- *Type:* `number`

---

##### `readAccessBuckets`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.readAccessBuckets"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)[]

---

##### `roleName`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.roleName"></a>

- *Type:* `string`

---

##### `timeout`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.timeout"></a>

- *Type:* `number`

---

##### `writeAccessBuckets`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueJobProperties.property.writeAccessBuckets"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)[]

---

### IGlueNotebookProperties <a name="cdk-datalake-constructs.IGlueNotebookProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IGlueNotebookProperties`](#cdk-datalake-constructs.IGlueNotebookProperties)


#### Properties <a name="Properties"></a>

##### `accountId`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueNotebookProperties.property.accountId"></a>

- *Type:* `string`

---

##### `database`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueNotebookProperties.property.database"></a>

- *Type:* `string`

---

##### `glueVersion`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueNotebookProperties.property.glueVersion"></a>

- *Type:* [`cdk-datalake-constructs.GlueVersion`](#cdk-datalake-constructs.GlueVersion)

---

##### `notebookInstanceType`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueNotebookProperties.property.notebookInstanceType"></a>

- *Type:* `string`

---

##### `notebookName`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueNotebookProperties.property.notebookName"></a>

- *Type:* `string`

---

##### `numberOfWorkers`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueNotebookProperties.property.numberOfWorkers"></a>

- *Type:* `number`

---

##### `region`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueNotebookProperties.property.region"></a>

- *Type:* `string`

---

##### `stage`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueNotebookProperties.property.stage"></a>

- *Type:* `string`

---

##### `workerType`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueNotebookProperties.property.workerType"></a>

- *Type:* [`cdk-datalake-constructs.GlueWorkerType`](#cdk-datalake-constructs.GlueWorkerType)

---

##### `readAccessBuckets`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueNotebookProperties.property.readAccessBuckets"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)[]

---

##### `writeAccessBuckets`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueNotebookProperties.property.writeAccessBuckets"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)[]

---

### IGlueOpsProperties <a name="cdk-datalake-constructs.IGlueOpsProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IGlueOpsProperties`](#cdk-datalake-constructs.IGlueOpsProperties)


#### Properties <a name="Properties"></a>

##### `job`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueOpsProperties.property.job"></a>

- *Type:* [`cdk-datalake-constructs.GlueJob`](#cdk-datalake-constructs.GlueJob)

---

##### `jvmHeapSizeExceeding80percent`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueOpsProperties.property.jvmHeapSizeExceeding80percent"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `jvmHeapSizeExceeding90percent`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueOpsProperties.property.jvmHeapSizeExceeding90percent"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `metricAllExecutionAttemptsFailed`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueOpsProperties.property.metricAllExecutionAttemptsFailed"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `metricExecutionFailure`<sup>Optional</sup> <a name="cdk-datalake-constructs.IGlueOpsProperties.property.metricExecutionFailure"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

### IGlueTableProperties <a name="cdk-datalake-constructs.IGlueTableProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IGlueTableProperties`](#cdk-datalake-constructs.IGlueTableProperties)


#### Properties <a name="Properties"></a>

##### `catalogId`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueTableProperties.property.catalogId"></a>

- *Type:* `string`

---

##### `columns`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueTableProperties.property.columns"></a>

- *Type:* [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable) | [`@aws-cdk/aws-glue.CfnTable.ColumnProperty`](#@aws-cdk/aws-glue.CfnTable.ColumnProperty) | [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable)[]

---

##### `database`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueTableProperties.property.database"></a>

- *Type:* [`@aws-cdk/aws-glue.Database`](#@aws-cdk/aws-glue.Database)

---

##### `description`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueTableProperties.property.description"></a>

- *Type:* `string`

---

##### `inputFormat`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueTableProperties.property.inputFormat"></a>

- *Type:* `string`

---

##### `outputFormat`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueTableProperties.property.outputFormat"></a>

- *Type:* `string`

---

##### `parameters`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueTableProperties.property.parameters"></a>

- *Type:* {[ key: string ]: `any`}

---

##### `partitionKeys`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueTableProperties.property.partitionKeys"></a>

- *Type:* [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable) | [`@aws-cdk/aws-glue.CfnTable.ColumnProperty`](#@aws-cdk/aws-glue.CfnTable.ColumnProperty) | [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable)[]

---

##### `s3Location`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueTableProperties.property.s3Location"></a>

- *Type:* `string`

---

##### `serdeParameters`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueTableProperties.property.serdeParameters"></a>

- *Type:* {[ key: string ]: `any`}

---

##### `serializationLibrary`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueTableProperties.property.serializationLibrary"></a>

- *Type:* `string`

---

##### `tableName`<sup>Required</sup> <a name="cdk-datalake-constructs.IGlueTableProperties.property.tableName"></a>

- *Type:* `string`

---

### IJDBCProperties <a name="cdk-datalake-constructs.IJDBCProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IJDBCProperties`](#cdk-datalake-constructs.IJDBCProperties)


#### Properties <a name="Properties"></a>

##### `jdbc`<sup>Required</sup> <a name="cdk-datalake-constructs.IJDBCProperties.property.jdbc"></a>

- *Type:* `string`

---

##### `password`<sup>Required</sup> <a name="cdk-datalake-constructs.IJDBCProperties.property.password"></a>

- *Type:* `string`

---

##### `username`<sup>Required</sup> <a name="cdk-datalake-constructs.IJDBCProperties.property.username"></a>

- *Type:* `string`

---

### IJobProperties <a name="cdk-datalake-constructs.IJobProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IJobProperties`](#cdk-datalake-constructs.IJobProperties)


#### Properties <a name="Properties"></a>

##### `jobScript`<sup>Required</sup> <a name="cdk-datalake-constructs.IJobProperties.property.jobScript"></a>

- *Type:* `string`

---

##### `jobType`<sup>Required</sup> <a name="cdk-datalake-constructs.IJobProperties.property.jobType"></a>

- *Type:* [`cdk-datalake-constructs.GlueJobType`](#cdk-datalake-constructs.GlueJobType)

---

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.IJobProperties.property.name"></a>

- *Type:* `string`

---

##### `workerType`<sup>Required</sup> <a name="cdk-datalake-constructs.IJobProperties.property.workerType"></a>

- *Type:* [`cdk-datalake-constructs.GlueWorkerType`](#cdk-datalake-constructs.GlueWorkerType)

---

##### `description`<sup>Optional</sup> <a name="cdk-datalake-constructs.IJobProperties.property.description"></a>

- *Type:* `string`

---

##### `glueVersion`<sup>Optional</sup> <a name="cdk-datalake-constructs.IJobProperties.property.glueVersion"></a>

- *Type:* [`cdk-datalake-constructs.GlueVersion`](#cdk-datalake-constructs.GlueVersion)

---

##### `jobArgs`<sup>Optional</sup> <a name="cdk-datalake-constructs.IJobProperties.property.jobArgs"></a>

- *Type:* {[ key: string ]: `string`}

---

##### `maxCapacity`<sup>Optional</sup> <a name="cdk-datalake-constructs.IJobProperties.property.maxCapacity"></a>

- *Type:* `number`

---

##### `maxConcurrentRuns`<sup>Optional</sup> <a name="cdk-datalake-constructs.IJobProperties.property.maxConcurrentRuns"></a>

- *Type:* `number`

---

##### `maxRetries`<sup>Optional</sup> <a name="cdk-datalake-constructs.IJobProperties.property.maxRetries"></a>

- *Type:* `number`

---

##### `numberOfWorkers`<sup>Optional</sup> <a name="cdk-datalake-constructs.IJobProperties.property.numberOfWorkers"></a>

- *Type:* `number`

---

##### `readAccessBuckets`<sup>Optional</sup> <a name="cdk-datalake-constructs.IJobProperties.property.readAccessBuckets"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)[]

---

##### `roleName`<sup>Optional</sup> <a name="cdk-datalake-constructs.IJobProperties.property.roleName"></a>

- *Type:* `string`

---

##### `timeout`<sup>Optional</sup> <a name="cdk-datalake-constructs.IJobProperties.property.timeout"></a>

- *Type:* `number`

---

##### `writeAccessBuckets`<sup>Optional</sup> <a name="cdk-datalake-constructs.IJobProperties.property.writeAccessBuckets"></a>

- *Type:* [`@aws-cdk/aws-s3.IBucket`](#@aws-cdk/aws-s3.IBucket)[]

---

### IKinesisOpsProperties <a name="cdk-datalake-constructs.IKinesisOpsProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IKinesisOpsProperties`](#cdk-datalake-constructs.IKinesisOpsProperties)


#### Properties <a name="Properties"></a>

##### `deliveryStream`<sup>Required</sup> <a name="cdk-datalake-constructs.IKinesisOpsProperties.property.deliveryStream"></a>

- *Type:* [`cdk-datalake-constructs.S3DeliveryStream`](#cdk-datalake-constructs.S3DeliveryStream)

---

##### `stream`<sup>Required</sup> <a name="cdk-datalake-constructs.IKinesisOpsProperties.property.stream"></a>

- *Type:* [`cdk-datalake-constructs.KinesisStream`](#cdk-datalake-constructs.KinesisStream)

---

##### `firehoseDeliveryToS3Critical`<sup>Optional</sup> <a name="cdk-datalake-constructs.IKinesisOpsProperties.property.firehoseDeliveryToS3Critical"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `firehoseDeliveryToS3Warning`<sup>Optional</sup> <a name="cdk-datalake-constructs.IKinesisOpsProperties.property.firehoseDeliveryToS3Warning"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `inputStreamGetRecordsWarning`<sup>Optional</sup> <a name="cdk-datalake-constructs.IKinesisOpsProperties.property.inputStreamGetRecordsWarning"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `inputStreamIteratorAgeCritical`<sup>Optional</sup> <a name="cdk-datalake-constructs.IKinesisOpsProperties.property.inputStreamIteratorAgeCritical"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `inputStreamIteratorAgeWarning`<sup>Optional</sup> <a name="cdk-datalake-constructs.IKinesisOpsProperties.property.inputStreamIteratorAgeWarning"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `inputStreamPutRecordsWarning`<sup>Optional</sup> <a name="cdk-datalake-constructs.IKinesisOpsProperties.property.inputStreamPutRecordsWarning"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `inputStreamReadThroughputWarning`<sup>Optional</sup> <a name="cdk-datalake-constructs.IKinesisOpsProperties.property.inputStreamReadThroughputWarning"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

##### `inputStreamWriteThroughputWarning`<sup>Optional</sup> <a name="cdk-datalake-constructs.IKinesisOpsProperties.property.inputStreamWriteThroughputWarning"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.CreateAlarmOptions`](#@aws-cdk/aws-cloudwatch.CreateAlarmOptions)

---

### ILambdaDataGeneratorProperties <a name="cdk-datalake-constructs.ILambdaDataGeneratorProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.ILambdaDataGeneratorProperties`](#cdk-datalake-constructs.ILambdaDataGeneratorProperties)


#### Properties <a name="Properties"></a>

##### `code`<sup>Required</sup> <a name="cdk-datalake-constructs.ILambdaDataGeneratorProperties.property.code"></a>

- *Type:* [`@aws-cdk/aws-lambda.Code`](#@aws-cdk/aws-lambda.Code)

---

##### `functionName`<sup>Required</sup> <a name="cdk-datalake-constructs.ILambdaDataGeneratorProperties.property.functionName"></a>

- *Type:* `string`

---

##### `handler`<sup>Required</sup> <a name="cdk-datalake-constructs.ILambdaDataGeneratorProperties.property.handler"></a>

- *Type:* `string`

---

##### `ruleName`<sup>Required</sup> <a name="cdk-datalake-constructs.ILambdaDataGeneratorProperties.property.ruleName"></a>

- *Type:* `string`

---

##### `runtime`<sup>Required</sup> <a name="cdk-datalake-constructs.ILambdaDataGeneratorProperties.property.runtime"></a>

- *Type:* [`@aws-cdk/aws-lambda.Runtime`](#@aws-cdk/aws-lambda.Runtime)

---

##### `schedule`<sup>Required</sup> <a name="cdk-datalake-constructs.ILambdaDataGeneratorProperties.property.schedule"></a>

- *Type:* [`@aws-cdk/aws-events.Schedule`](#@aws-cdk/aws-events.Schedule)

---

##### `timeout`<sup>Required</sup> <a name="cdk-datalake-constructs.ILambdaDataGeneratorProperties.property.timeout"></a>

- *Type:* [`@aws-cdk/core.Duration`](#@aws-cdk/core.Duration)

---

### IPipelineProperties <a name="cdk-datalake-constructs.IPipelineProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IPipelineProperties`](#cdk-datalake-constructs.IPipelineProperties)


#### Properties <a name="Properties"></a>

##### `dataCatalogOwner`<sup>Required</sup> <a name="cdk-datalake-constructs.IPipelineProperties.property.dataCatalogOwner"></a>

- *Type:* [`cdk-datalake-constructs.DataCatalogOwner`](#cdk-datalake-constructs.DataCatalogOwner)

---

##### `destinationBucketName`<sup>Required</sup> <a name="cdk-datalake-constructs.IPipelineProperties.property.destinationBucketName"></a>

- *Type:* `string`

---

##### `destinationPrefix`<sup>Required</sup> <a name="cdk-datalake-constructs.IPipelineProperties.property.destinationPrefix"></a>

- *Type:* `string`

---

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.IPipelineProperties.property.name"></a>

- *Type:* `string`

---

##### `type`<sup>Required</sup> <a name="cdk-datalake-constructs.IPipelineProperties.property.type"></a>

- *Type:* [`cdk-datalake-constructs.DataPipelineType`](#cdk-datalake-constructs.DataPipelineType)

---

##### `jdbcProperties`<sup>Optional</sup> <a name="cdk-datalake-constructs.IPipelineProperties.property.jdbcProperties"></a>

- *Type:* [`cdk-datalake-constructs.IJDBCProperties`](#cdk-datalake-constructs.IJDBCProperties)

---

##### `job`<sup>Optional</sup> <a name="cdk-datalake-constructs.IPipelineProperties.property.job"></a>

- *Type:* [`cdk-datalake-constructs.IJobProperties`](#cdk-datalake-constructs.IJobProperties)

---

##### `s3NotificationProps`<sup>Optional</sup> <a name="cdk-datalake-constructs.IPipelineProperties.property.s3NotificationProps"></a>

- *Type:* [`cdk-datalake-constructs.IS3NotificationProperties`](#cdk-datalake-constructs.IS3NotificationProperties)

---

##### `s3Properties`<sup>Optional</sup> <a name="cdk-datalake-constructs.IPipelineProperties.property.s3Properties"></a>

- *Type:* [`cdk-datalake-constructs.IS3Properties`](#cdk-datalake-constructs.IS3Properties)

---

##### `streamProperties`<sup>Optional</sup> <a name="cdk-datalake-constructs.IPipelineProperties.property.streamProperties"></a>

- *Type:* [`cdk-datalake-constructs.IStreamProperties`](#cdk-datalake-constructs.IStreamProperties)

---

##### `table`<sup>Optional</sup> <a name="cdk-datalake-constructs.IPipelineProperties.property.table"></a>

- *Type:* [`cdk-datalake-constructs.ITableProps`](#cdk-datalake-constructs.ITableProps)

---

### IRegisteredDataSetProperties <a name="cdk-datalake-constructs.IRegisteredDataSetProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IRegisteredDataSetProperties`](#cdk-datalake-constructs.IRegisteredDataSetProperties)


#### Properties <a name="Properties"></a>

##### `databaseName`<sup>Required</sup> <a name="cdk-datalake-constructs.IRegisteredDataSetProperties.property.databaseName"></a>

- *Type:* `string`

---

##### `dataLakeAdminRoleArn`<sup>Required</sup> <a name="cdk-datalake-constructs.IRegisteredDataSetProperties.property.dataLakeAdminRoleArn"></a>

- *Type:* `string`

---

##### `dataLakeDbCreatorRoleArn`<sup>Required</sup> <a name="cdk-datalake-constructs.IRegisteredDataSetProperties.property.dataLakeDbCreatorRoleArn"></a>

- *Type:* `string`

---

##### `destinationBucketName`<sup>Required</sup> <a name="cdk-datalake-constructs.IRegisteredDataSetProperties.property.destinationBucketName"></a>

- *Type:* `string`

---

##### `destinationPrefix`<sup>Required</sup> <a name="cdk-datalake-constructs.IRegisteredDataSetProperties.property.destinationPrefix"></a>

- *Type:* `string`

---

##### `name`<sup>Required</sup> <a name="cdk-datalake-constructs.IRegisteredDataSetProperties.property.name"></a>

- *Type:* `string`

---

##### `stage`<sup>Required</sup> <a name="cdk-datalake-constructs.IRegisteredDataSetProperties.property.stage"></a>

- *Type:* [`cdk-datalake-constructs.Stage`](#cdk-datalake-constructs.Stage)

---

### IS3NotificationProperties <a name="cdk-datalake-constructs.IS3NotificationProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IS3NotificationProperties`](#cdk-datalake-constructs.IS3NotificationProperties)


#### Properties <a name="Properties"></a>

##### `event`<sup>Required</sup> <a name="cdk-datalake-constructs.IS3NotificationProperties.property.event"></a>

- *Type:* [`@aws-cdk/aws-s3.EventType`](#@aws-cdk/aws-s3.EventType)

---

##### `prefix`<sup>Required</sup> <a name="cdk-datalake-constructs.IS3NotificationProperties.property.prefix"></a>

- *Type:* `string`

---

##### `suffix`<sup>Required</sup> <a name="cdk-datalake-constructs.IS3NotificationProperties.property.suffix"></a>

- *Type:* `string`

---

### IS3Properties <a name="cdk-datalake-constructs.IS3Properties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IS3Properties`](#cdk-datalake-constructs.IS3Properties)


#### Properties <a name="Properties"></a>

##### `sourceBucketName`<sup>Required</sup> <a name="cdk-datalake-constructs.IS3Properties.property.sourceBucketName"></a>

- *Type:* `string`

---

##### `sourceKeys`<sup>Required</sup> <a name="cdk-datalake-constructs.IS3Properties.property.sourceKeys"></a>

- *Type:* `string`[]

---

### IStreamProperties <a name="cdk-datalake-constructs.IStreamProperties"></a>

- *Implemented By:* [`cdk-datalake-constructs.IStreamProperties`](#cdk-datalake-constructs.IStreamProperties)


#### Properties <a name="Properties"></a>

##### `lambdaDataGenerator`<sup>Required</sup> <a name="cdk-datalake-constructs.IStreamProperties.property.lambdaDataGenerator"></a>

- *Type:* [`cdk-datalake-constructs.ILambdaDataGeneratorProperties`](#cdk-datalake-constructs.ILambdaDataGeneratorProperties)

---

##### `streamName`<sup>Required</sup> <a name="cdk-datalake-constructs.IStreamProperties.property.streamName"></a>

- *Type:* `string`

---

### ITableProps <a name="cdk-datalake-constructs.ITableProps"></a>

- *Implemented By:* [`cdk-datalake-constructs.ITableProps`](#cdk-datalake-constructs.ITableProps)


#### Properties <a name="Properties"></a>

##### `catalogId`<sup>Required</sup> <a name="cdk-datalake-constructs.ITableProps.property.catalogId"></a>

- *Type:* `string`

---

##### `columns`<sup>Required</sup> <a name="cdk-datalake-constructs.ITableProps.property.columns"></a>

- *Type:* [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable) | [`@aws-cdk/aws-glue.CfnTable.ColumnProperty`](#@aws-cdk/aws-glue.CfnTable.ColumnProperty) | [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable)[]

---

##### `description`<sup>Required</sup> <a name="cdk-datalake-constructs.ITableProps.property.description"></a>

- *Type:* `string`

---

##### `inputFormat`<sup>Required</sup> <a name="cdk-datalake-constructs.ITableProps.property.inputFormat"></a>

- *Type:* `string`

---

##### `outputFormat`<sup>Required</sup> <a name="cdk-datalake-constructs.ITableProps.property.outputFormat"></a>

- *Type:* `string`

---

##### `parameters`<sup>Required</sup> <a name="cdk-datalake-constructs.ITableProps.property.parameters"></a>

- *Type:* {[ key: string ]: `any`}

---

##### `partitionKeys`<sup>Required</sup> <a name="cdk-datalake-constructs.ITableProps.property.partitionKeys"></a>

- *Type:* [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable) | [`@aws-cdk/aws-glue.CfnTable.ColumnProperty`](#@aws-cdk/aws-glue.CfnTable.ColumnProperty) | [`@aws-cdk/core.IResolvable`](#@aws-cdk/core.IResolvable)[]

---

##### `serdeParameters`<sup>Required</sup> <a name="cdk-datalake-constructs.ITableProps.property.serdeParameters"></a>

- *Type:* {[ key: string ]: `any`}

---

##### `serializationLibrary`<sup>Required</sup> <a name="cdk-datalake-constructs.ITableProps.property.serializationLibrary"></a>

- *Type:* `string`

---

##### `tableName`<sup>Required</sup> <a name="cdk-datalake-constructs.ITableProps.property.tableName"></a>

- *Type:* `string`

---

## Enums <a name="Enums"></a>

### CompressionType <a name="CompressionType"></a>

#### `UNCOMPRESSED` <a name="cdk-datalake-constructs.CompressionType.UNCOMPRESSED"></a>

---


#### `GZIP` <a name="cdk-datalake-constructs.CompressionType.GZIP"></a>

---


#### `ZIP` <a name="cdk-datalake-constructs.CompressionType.ZIP"></a>

---


#### `SNAPPY` <a name="cdk-datalake-constructs.CompressionType.SNAPPY"></a>

---


### DataPipelineType <a name="DataPipelineType"></a>

#### `STREAM` <a name="cdk-datalake-constructs.DataPipelineType.STREAM"></a>

---


#### `JDBC` <a name="cdk-datalake-constructs.DataPipelineType.JDBC"></a>

---


#### `S3` <a name="cdk-datalake-constructs.DataPipelineType.S3"></a>

---


### DeliveryStreamType <a name="DeliveryStreamType"></a>

#### `DIRECT_PUT` <a name="cdk-datalake-constructs.DeliveryStreamType.DIRECT_PUT"></a>

---


#### `KINESIS_STREAM_AS_SOURCE` <a name="cdk-datalake-constructs.DeliveryStreamType.KINESIS_STREAM_AS_SOURCE"></a>

---


### GlueJobType <a name="GlueJobType"></a>

#### `GLUE_ETL` <a name="cdk-datalake-constructs.GlueJobType.GLUE_ETL"></a>

---


#### `GLUE_STREAMING` <a name="cdk-datalake-constructs.GlueJobType.GLUE_STREAMING"></a>

---


### GlueVersion <a name="GlueVersion"></a>

#### `V_0` <a name="cdk-datalake-constructs.GlueVersion.V_0"></a>

---


#### `V_1` <a name="cdk-datalake-constructs.GlueVersion.V_1"></a>

---


#### `V_2` <a name="cdk-datalake-constructs.GlueVersion.V_2"></a>

---


### GlueWorkerType <a name="GlueWorkerType"></a>

#### `STANDARD` <a name="cdk-datalake-constructs.GlueWorkerType.STANDARD"></a>

---


#### `G1_X` <a name="cdk-datalake-constructs.GlueWorkerType.G1_X"></a>

---


#### `G2_X` <a name="cdk-datalake-constructs.GlueWorkerType.G2_X"></a>

---


### Permissions <a name="Permissions"></a>

#### `ALTER` <a name="cdk-datalake-constructs.Permissions.ALTER"></a>

---


#### `CREATE_DATABASE` <a name="cdk-datalake-constructs.Permissions.CREATE_DATABASE"></a>

---


#### `CREATE_TABLE` <a name="cdk-datalake-constructs.Permissions.CREATE_TABLE"></a>

---


#### `DATA_LOCATION_ACCESS` <a name="cdk-datalake-constructs.Permissions.DATA_LOCATION_ACCESS"></a>

---


#### `DELETE` <a name="cdk-datalake-constructs.Permissions.DELETE"></a>

---


#### `DESCRIBE` <a name="cdk-datalake-constructs.Permissions.DESCRIBE"></a>

---


#### `DROP` <a name="cdk-datalake-constructs.Permissions.DROP"></a>

---


#### `INSERT` <a name="cdk-datalake-constructs.Permissions.INSERT"></a>

---


#### `SELECT` <a name="cdk-datalake-constructs.Permissions.SELECT"></a>

---


#### `ASSOCIATE` <a name="cdk-datalake-constructs.Permissions.ASSOCIATE"></a>

---


### ProcessorType <a name="ProcessorType"></a>

#### `LAMBDA` <a name="cdk-datalake-constructs.ProcessorType.LAMBDA"></a>

---


### Stage <a name="Stage"></a>

#### `ALPHA` <a name="cdk-datalake-constructs.Stage.ALPHA"></a>

---


#### `BETA` <a name="cdk-datalake-constructs.Stage.BETA"></a>

---


#### `GAMMA` <a name="cdk-datalake-constructs.Stage.GAMMA"></a>

---


#### `PROD` <a name="cdk-datalake-constructs.Stage.PROD"></a>

---

