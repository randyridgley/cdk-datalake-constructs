import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as cdk from '@aws-cdk/core';

import { KinesisStream } from './kinesis-stream';
import { S3DeliveryStream } from './s3-delivery-stream';

export interface IKinesisOpsProperties {
  stream: KinesisStream;
  deliveryStream: S3DeliveryStream;

  inputStreamIteratorAgeCritical?: cloudwatch.CreateAlarmOptions;
  inputStreamIteratorAgeWarning?: cloudwatch.CreateAlarmOptions;
  inputStreamReadThroughputWarning?: cloudwatch.CreateAlarmOptions;
  inputStreamWriteThroughputWarning?: cloudwatch.CreateAlarmOptions;
  inputStreamGetRecordsWarning?: cloudwatch.CreateAlarmOptions;
  inputStreamPutRecordsWarning?: cloudwatch.CreateAlarmOptions;

  firehoseDeliveryToS3Critical?: cloudwatch.CreateAlarmOptions;
  firehoseDeliveryToS3Warning?: cloudwatch.CreateAlarmOptions;
}

export class KinesisOps extends cdk.Construct {

  public dashboard: cloudwatch.Dashboard;
  public readonly stream: KinesisStream;
  public readonly deliveryStream: S3DeliveryStream
  public readonly streamName: string

  public readonly inputStreamIteratorAgeCriticalAlarm: cloudwatch.Alarm;
  public readonly inputStreamIteratorAgeWarningAlarm: cloudwatch.Alarm;
  public readonly inputStreamReadThroughputWarningAlarm: cloudwatch.Alarm;
  public readonly inputStreamWriteThroughputWarningAlarm: cloudwatch.Alarm;
  public readonly inputStreamGetRecordsWarningAlarm: cloudwatch.Alarm;
  public readonly inputStreamPutRecordsWarningAlarm: cloudwatch.Alarm;

  public readonly firehoseDeliveryToS3WarningAlarm: cloudwatch.Alarm;
  public readonly firehoseDeliveryToS3CriticalAlarm: cloudwatch.Alarm;

  public readonly alarmsSev2: cloudwatch.Alarm[];
  public readonly alarmsSev3: cloudwatch.Alarm[];

  constructor(scope: cdk.Construct, id: string, props: IKinesisOpsProperties) {
    super(scope, id);

    this.stream = props.stream;
    this.streamName = props.stream.stream.streamName;
    this.deliveryStream = props.deliveryStream;

    this.dashboard = new cloudwatch.Dashboard(this, 'dashboard', {
      dashboardName: `Kinesis_${this.streamName}`,
    });

    this.inputStreamIteratorAgeCriticalAlarm = new cloudwatch.Alarm(this, 'inputStream-iterator-age-critical-alarm', {
      alarmName: `${this.streamName} inputStream IteratorAge Long`,
      alarmDescription: 'Alarms if maximum iterator age of inputStream is more than 10 minute',
      metric: this.stream.metricGetRecordsIteratorAgeMilliseconds(),
      threshold: 600000,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,

      period: cdk.Duration.minutes(5),
      evaluationPeriods: 12,
      ...(props.inputStreamIteratorAgeCritical || {}),
    });

    this.inputStreamIteratorAgeWarningAlarm = new cloudwatch.Alarm(this, 'inputStream-iterator-age-warning-alarm', {
      alarmName: `${this.streamName} inputStream IteratorAge Long Warning`,
      alarmDescription: 'Alarms if maximum iterator age of inputStream is more than 5 minute',
      metric: this.stream.metricGetRecordsIteratorAgeMilliseconds(),
      threshold: 30000,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      period: cdk.Duration.minutes(5),
      evaluationPeriods: 12,
      ...(props.inputStreamIteratorAgeWarning || {}),
    });

    this.inputStreamReadThroughputWarningAlarm = new cloudwatch.Alarm(this, 'inputStream-read-throughput-warning-alarm', {
      alarmName: `${this.streamName} inputStream ReadThroughput Exceed Warning`,
      alarmDescription: 'Alarms if read provisioned throughput of inputStream is exceeded for least 2 hours',
      metric: this.stream.metricReadProvisionedThroughputExceeded(),
      threshold: 0.15,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      period: cdk.Duration.minutes(10),
      evaluationPeriods: 12,
      ...(props.inputStreamReadThroughputWarning || {}),
    });

    this.inputStreamWriteThroughputWarningAlarm = new cloudwatch.Alarm(this, 'inputStream-write-throughput-warning-alarm', {
      alarmName: `${this.streamName} inputStream WriteThroughput Exceed Warning`,
      alarmDescription: 'Alarms if write provisioned throughput of inputStream is exceeded for least 12 hours',
      metric: this.stream.metricWriteProvisionedThroughputExceeded(),
      threshold: 0.15,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      period: cdk.Duration.minutes(60),
      evaluationPeriods: 12,
      ...(props.inputStreamWriteThroughputWarning || {}),
    });

    this.inputStreamGetRecordsWarningAlarm = new cloudwatch.Alarm(this, 'inputStream-get-records-warning-alarm', {
      alarmName: `${this.streamName} inputStream GetRecords Success Low Warning`,
      alarmDescription: 'Alarms if GetRecords of inputStream not very successful for least 30 minutes',
      metric: this.stream.metricGetRecordsSuccess(),
      threshold: 0.9,
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
      period: cdk.Duration.minutes(5),
      evaluationPeriods: 6,
      ...(props.inputStreamGetRecordsWarning || {}),
    });

    this.inputStreamPutRecordsWarningAlarm = new cloudwatch.Alarm(this, 'inputStream-put-records-warning-alarm', {
      alarmName: `${this.streamName} inputStream PutRecords Success Low Warning`,
      alarmDescription: 'Alarms if PutRecords of inputStream not very successful for least 12 hours',
      metric: this.stream.metricPutRecordsSuccess(),
      threshold: 0.9,
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
      period: cdk.Duration.minutes(60),
      evaluationPeriods: 12,
      ...(props.inputStreamPutRecordsWarning || {}),
    });

    this.firehoseDeliveryToS3WarningAlarm = new cloudwatch.Alarm(this, 'deliveryStream-delivery-to-s3-warning-alarm', {
      alarmName: `${this.streamName} Firehose DeliveryToS3 Failure Warning`,
      alarmDescription: 'Alarms if firehose DeliveryToS3 failed for atleast 60 minutes',
      metric: this.deliveryStream.metricDeliveryToS3Success(),
      statistic: cloudwatch.Statistic.AVERAGE,
      threshold: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
      period: cdk.Duration.minutes(5),
      evaluationPeriods: 12,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
      ...(props.firehoseDeliveryToS3Warning || {}),
    });

    this.firehoseDeliveryToS3CriticalAlarm = new cloudwatch.Alarm(this, 'deliveryStream-delivery-to-s3-critical-alarm', {
      alarmName: `${this.streamName} Firehose DeliveryToS3 Failure Critical`,
      alarmDescription: 'Alarms if firehose DeliveryToS3 failed for atleast 24 hours',
      metric: this.deliveryStream.metricDeliveryToS3Success(),
      statistic: cloudwatch.Statistic.AVERAGE,
      threshold: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
      period: cdk.Duration.hours(1),
      evaluationPeriods: 24,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
      ...(props.firehoseDeliveryToS3Critical || {}),
    });

    this.alarmsSev2 = [
      this.inputStreamIteratorAgeCriticalAlarm,
      this.firehoseDeliveryToS3CriticalAlarm,
    ];

    this.alarmsSev3 = [
      this.inputStreamIteratorAgeWarningAlarm,
      this.inputStreamReadThroughputWarningAlarm,
      this.inputStreamWriteThroughputWarningAlarm,
      this.inputStreamGetRecordsWarningAlarm,
      this.inputStreamPutRecordsWarningAlarm,
      this.firehoseDeliveryToS3WarningAlarm,
    ];

    this.setupDashboard();
  }

  private alarmWidgets(alarms: cloudwatch.Alarm[], severity: number) {
    return alarms.map(alarm => new cloudwatch.AlarmWidget({
      title: `${alarm.alarmName} - Sev ${severity}`,
      alarm,
    }));
  }

  private addWidgets(widgets: cloudwatch.IWidget[]) {
    for (let i = 0; i < widgets.length; i += 4) {
      this.dashboard.addWidgets(...widgets.slice(i, i + 4));
    }
  }

  private setupDashboard() {

    const widgets: cloudwatch.IWidget[] = [

      new cloudwatch.GraphWidget({
        title: 'Kinesis Stream (Ingress)',
        left: [
          this.stream.metricIncomingRecords({
            label: 'Incoming Records',
            statistic: 'sum',
          }),
        ],
        right: [
          this.stream.metricIncomingBytes({
            label: 'Incoming Bytes',
            statistic: 'sum',
          }),
        ],
      }),

      new cloudwatch.GraphWidget({
        title: 'Kinesis Stream (Throttling)',
        left: [
          this.stream.metricGetRecordsSuccess(),
          this.stream.metricPutRecordsSuccess(),
        ],
        right: [
          this.stream.metricReadProvisionedThroughputExceeded({
            label: 'Throttled Reads',
            statistic: 'sum',
          }),
          this.stream.metricWriteProvisionedThroughputExceeded({
            label: 'Throttled Writes',
            statistic: 'sum',
          }),
        ],
      }),

      new cloudwatch.GraphWidget({
        title: 'Kinesis Stream (Delay)',
        left: [
          this.stream.metricGetRecordsIteratorAgeMilliseconds({
            label: 'Time-lag behind Kinesis Stream',
            statistic: 'max',
          }),
        ],
      }),

      new cloudwatch.GraphWidget({
        title: 'Firehose Delivery Stream (Ingress/Egress)',
        left: [
          this.deliveryStream.metricIncomingRecords({
            label: 'Incoming Records',
            statistic: 'sum',
          }),
          this.deliveryStream.metricDeliveryToS3Records({
            label: 'Outgoing Records',
            statistic: 'sum',
          }),
        ],
        right: [
          this.deliveryStream.metricDeliveryToS3Success(),
        ],
      }),

      new cloudwatch.GraphWidget({
        title: 'Firehose Data Freshness',
        left: [
          this.deliveryStream.metricDeliveryToS3DataFreshness({
            label: 'Freshness',
            statistic: 'max',
            period: cdk.Duration.minutes(5),
          }),
        ],
      }),
    ];

    widgets.push(...this.alarmWidgets(this.alarmsSev2, 2));
    widgets.push(...this.alarmWidgets(this.alarmsSev3, 3));

    this.addWidgets(widgets);
  }
}