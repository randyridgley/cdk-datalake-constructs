import { Resource } from 'aws-cdk-lib';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as kinesis from 'aws-cdk-lib/aws-kinesis';
import { Construct } from 'constructs';

export class KinesisStream extends Resource {
  public readonly stream: kinesis.Stream;

  constructor(parent: Construct, name: string, props: kinesis.StreamProps) {
    super(parent, name);
    this.stream = new kinesis.Stream(this, 'kinesis-stream', props);
  }

  public metric(metricName: string, props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return new cloudwatch.Metric({
      namespace: 'AWS/Kinesis',
      metricName,
      dimensionsMap: {
        StreamName: this.stream.streamName,
      },
      ...props,
    });
  }

  public metricGetRecordsBytes(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('GetRecords.Bytes', props);
  }

  public metricGetRecordsIteratorAgeMilliseconds(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('GetRecords.IteratorAgeMilliseconds', props);
  }

  public metricGetRecordsLatency(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('GetRecords.Latency', props);
  }

  public metricGetRecordsRecords(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('GetRecords.Records', props);
  }

  public metricGetRecordsSuccess(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('GetRecords.Success', props);
  }

  public metricIncomingBytes(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('IncomingBytes', props);
  }

  public metricIncomingRecords(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('IncomingRecords', props);
  }

  public metricPutRecordBytes(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('PutRecord.Bytes', props);
  }

  public metricPutRecordLatency(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('PutRecord.Latency', props);
  }

  public metricPutRecordSuccess(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('PutRecord.Success', props);
  }

  public metricPutRecordsBytes(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('PutRecords.Bytes', props);
  }

  public metricPutRecordsLatency(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('PutRecords.Latency', props);
  }

  public metricPutRecordsRecords(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('PutRecords.Records', props);
  }

  public metricPutRecordsSuccess(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('PutRecords.Success', props);
  }

  public metricReadProvisionedThroughputExceeded(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('ReadProvisionedThroughputExceeded', props);
  }

  public metricWriteProvisionedThroughputExceeded(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('WriteProvisionedThroughputExceeded', props);
  }

  public metricSubscribeToShardRateExceeded(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('SubscribeToShard.RateExceeded', props);
  }

  public metricSubscribeToShardSuccess(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('SubscribeToShard.Success', props);
  }

  public metricSubscribeToShardEventBytes(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('SubscribeToShardEvent.Bytes', props);
  }

  public metricSubscribeToShardEventMillisBehindLatest(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('SubscribeToShardEvent.MillisBehindLatest', props);
  }

  public metricSubscribeToShardEventRecords(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('SubscribeToShardEvent.Records', props);
  }

  public metricSubscribeToShardEventSuccess(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('SubscribeToShardEvent.Success', props);
  }
}
