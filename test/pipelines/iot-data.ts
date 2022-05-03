import * as path from 'path';
import * as events from 'aws-cdk-lib/aws-events';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Aws, Duration } from 'aws-cdk-lib/core';
import { GlueJobType, GlueVersion, GlueWorkerType } from '../../src/etl/glue-job';
import { DataPipelineType, DataTier } from '../../src/global/enums';
import { Pipeline } from '../../src/pipeline';
import { buildEventRuleName, buildGlueJobName, buildKinesisStreamName, buildLambdaFunctionName, buildRoleName } from '../../src/utils';

export function IoTDataPipeline(stage: string) {
  const databaseName: string = 'source-lake';
  const streamName: string = buildKinesisStreamName({
    name: 'iot-data',
    resourceUse: 'stream',
    stage: stage,
  });

  const code = lambda.Code.fromAsset(path.join(__dirname, '../lambda/iot-data-generator'));

  return new Pipeline({
    type: DataPipelineType.STREAM,
    name: 'iot-data',
    destinationPrefix: 'iot-data/',
    dataDropTier: DataTier.RAW,
    streamProperties: {
      streamName: streamName,
      lambdaDataGenerator: {
        code: code,
        handler: 'index.handler',
        timeout: Duration.seconds(300),
        runtime: lambda.Runtime.PYTHON_3_7,
        functionName: buildLambdaFunctionName({
          name: 'iot-data-generator',
          resourceUse: 'datalake',
          stage: stage,
        }),
        schedule: events.Schedule.expression('rate(1 minute)'),
        ruleName: buildEventRuleName({
          name: 'iot-generator',
          resourceUse: 'datalake',
          stage: stage,
        }),
      },
    },
    job: {
      jobScript: './test/code/iot_data/streaming_convert_to_parquet.py',
      jobType: GlueJobType.GLUE_STREAMING,
      name: buildGlueJobName({
        name: 'iot_data_streaming',
        resourceUse: 'datalake',
        stage: stage,
      }),
      workerType: GlueWorkerType.G1_X,
      description: 'Glue ETL Streaming job to convert JSON to Parquet',
      glueVersion: GlueVersion.V_2,
      jobArgs: {
        '--class': 'GlueApp',
        '--job-bookmark-option': 'job-bookmark-disable',
        '--SOURCE_DATABASE': databaseName,
        '--SOURCE_TABLE': 'r_iot_data',
        '--STREAM_BATCH_TIME_SECS': '100 seconds',
        '--DESTINATION_DATABASE': databaseName,
        '--DESTINATION_TABLE': 'p_iot_data',
      },
      destinationLocation: DataTier.RAW,
      maxCapacity: 2,
      maxConcurrentRuns: 1,
      maxRetries: 3,
      numberOfWorkers: 2,
      roleName: buildRoleName({
        name: 'glue-streaming',
        resourceUse: 'datalake',
        stage: stage,
      }),
      timeout: 2880,
    },
    table: {
      catalogId: Aws.ACCOUNT_ID,
      columns: [
        {
          name: 'sensor_id',
          type: 'int',
        },
        {
          name: 'current_temperature',
          type: 'double',
        },
        {
          name: 'status',
          type: 'string',
        },
        {
          name: 'event_time',
          type: 'string',
        },
      ],
      inputFormat: 'org.apache.hadoop.mapred.TextInputFormat',
      outputFormat: 'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat',
      description: 'Raw IOT Sensor data',
      parameters: {
        streamARN: `arn:aws:kinesis:${Aws.REGION}:${Aws.ACCOUNT_ID}:stream/${streamName}`,
        typeOfData: 'kinesis',
        classification: 'json',
      },
      serdeParameters: {
        paths: '',
      },
      serializationLibrary: 'org.openx.data.jsonserde.JsonSerDe',
      tableName: 'r_iot_data',
      partitionKeys: [],
    },
  });
}
