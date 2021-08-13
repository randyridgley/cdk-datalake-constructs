import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as iam from '@aws-cdk/aws-iam';
import * as kinesis from '@aws-cdk/aws-kinesis';
import * as firehose from '@aws-cdk/aws-kinesisfirehose';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';

export enum DeliveryStreamType {
  DIRECT_PUT = 'DirectPut',
  KINESIS_STREAM_AS_SOURCE = 'KinesisStreamAsSource'
}

export enum ProcessorType {
  LAMBDA = 'Lambda'
}

export enum CompressionType {
  UNCOMPRESSED = 'UNCOMPRESSED',
  GZIP = 'GZIP',
  ZIP = 'ZIP',
  SNAPPY = 'Snappy'
}

export interface DeliveryStreamProperties {
  readonly kinesisStream: kinesis.Stream;
  readonly s3Bucket: s3.IBucket;
  readonly s3Prefix?: string;
  readonly compression?: CompressionType;
  readonly transformFunction?: lambda.Function;
}

export class S3DeliveryStream extends cdk.Resource {
  public s3Bucket: s3.IBucket;
  protected cloudWatchLogsRole?: iam.Role;
  public readonly deliveryStreamArn: string;
  public readonly deliveryStreamName: string;
  private readonly role: iam.Role;
  private readonly deliveryStreamResource: firehose.CfnDeliveryStream;

  constructor(parent: cdk.Construct, name: string, props: DeliveryStreamProperties) {
    super(parent, name);
    this.role = new iam.Role(this, 'kinesis-role', {
      assumedBy: new iam.ServicePrincipal('firehose.amazonaws.com'),
    });

    this.s3Bucket = props.s3Bucket;
    this.deliveryStreamResource = new firehose.CfnDeliveryStream(this, 'delivery-stream', {
      deliveryStreamType: DeliveryStreamType.KINESIS_STREAM_AS_SOURCE,
      kinesisStreamSourceConfiguration: this.makeKinesisSourceConfig(props),
      extendedS3DestinationConfiguration: this.makeS3Config(props),
    });
    this.deliveryStreamResource.node.addDependency(this.role);

    this.deliveryStreamArn = this.deliveryStreamResource.getAtt('Arn').toString();
    this.deliveryStreamName = this.deliveryStreamResource.ref;
  }

  public metric(metricName: string, props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return new cloudwatch.Metric({
      namespace: 'AWS/Firehose',
      metricName,
      dimensions: {
        DeliveryStreamName: this.deliveryStreamName,
      },
      ...props,
    });
  }

  public metricBackupToS3Bytes(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('BackupToS3.Bytes', props);
  }

  public metricBackupToS3DataFreshness(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('BackupToS3.DataFreshness', props);
  }

  public metricBackupToS3Records(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('BackupToS3.Records', props);
  }

  public metricBackupToS3Success(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('BackupToS3.Success', props);
  }

  public metricDataReadFromKinesisStreamBytes(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('DataReadFromKinesisStream.Bytes', props);
  }

  public metricDataReadFromKinesisStreamRecords(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('DataReadFromKinesisStream.Records', props);
  }

  public metricDeliveryToS3Bytes(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('DeliveryToS3.Bytes', props);
  }

  public metricDeliveryToS3DataFreshness(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('DeliveryToS3.DataFreshness', props);
  }

  public metricDeliveryToS3Records(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('DeliveryToS3.Records', props);
  }

  public metricDeliveryToS3Success(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('DeliveryToS3.Success', props);
  }

  public metricIncomingBytes(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('IncomingBytes', props);
  }

  public metricIncomingRecords(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('IncomingRecords', props);
  }

  private makeKinesisSourceConfig(props: DeliveryStreamProperties): firehose.CfnDeliveryStream.KinesisStreamSourceConfigurationProperty | undefined {
    if (props.kinesisStream) {
      props.kinesisStream.grantRead(this.role);
      props.kinesisStream.grant(this.role, 'kinesis:DescribeStream');
      return {
        kinesisStreamArn: props.kinesisStream.streamArn,
        roleArn: this.role.roleArn,
      };
    } else {
      throw new Error("must provide a Kinesis stream if type is 'KinesisStreamAsSource'");
    }
  }

  private makeS3Config(props: DeliveryStreamProperties): firehose.CfnDeliveryStream.ExtendedS3DestinationConfigurationProperty | undefined {
    this.s3Bucket.grantReadWrite(this.role);
    if (props.kinesisStream) {
      props.kinesisStream.grantRead(this.role);
    }

    return {
      bucketArn: this.s3Bucket.bucketArn,
      bufferingHints: {
        intervalInSeconds: 60,
        sizeInMBs: 64,
      },
      compressionFormat: props.compression || CompressionType.UNCOMPRESSED,
      prefix: props.s3Prefix || '',
      roleArn: this.role.roleArn,
      processingConfiguration: this.makeProcessorConfig(props),
    };
  }

  private makeProcessorConfig(props: DeliveryStreamProperties): firehose.CfnDeliveryStream.ProcessingConfigurationProperty | undefined {
    if (props.transformFunction) {
      this.role.addToPolicy(
        new iam.PolicyStatement({
          actions: ['lambda:InvokeFunction'],
          resources: [props.transformFunction.functionArn, `${props.transformFunction.functionArn}:*`],
        }),
      );

      return {
        enabled: true,
        processors: [
          {
            type: ProcessorType.LAMBDA,
            parameters: [
              {
                parameterName: 'LambdaArn',
                parameterValue: props.transformFunction.functionArn,
              },
              {
                parameterName: 'NumberOfRetries',
                parameterValue: '3',
              },
            ],
          },
        ],
      };
    } else {
      return undefined;
    }
  }
}