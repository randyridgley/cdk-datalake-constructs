import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as events from '@aws-cdk/aws-events';
import * as eventtargets from '@aws-cdk/aws-events-targets';
import * as glue from '@aws-cdk/aws-glue';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';

export enum GlueWorkerType {
  STANDARD = 'Standard',
  G1_X = 'G.1X',
  G2_X = 'G.2X'
}

export enum GlueVersion {
  V_0 = '0.9',
  V_1 = '1.0',
  V_2 = '2.0'
}

export enum GlueJobType {
  GLUE_ETL = 'glueetl',
  GLUE_STREAMING = 'gluestreaming'
}

export interface IGlueJobProperties {
  name: string;
  roleName?: string;
  description?: string;
  deploymentBucket: s3.IBucket;
  readAccessBuckets?: s3.IBucket[];
  writeAccessBuckets?: s3.IBucket[];
  glueVersion?: GlueVersion;
  workerType: GlueWorkerType;
  numberOfWorkers?: number;
  maxCapacity?: number;
  maxRetries?: number;
  maxConcurrentRuns?: number;
  jobScript: string;
  jobArgs?: { [key: string]: string };
  timeout?: number;
  jobType: GlueJobType;
}

export class GlueJob extends cdk.Construct {
  private static readonly DAY_IN_MINUTES = 1440;

  public readonly job: glue.CfnJob;
  public readonly role: iam.IRole;
  public readonly name: string;
  public readonly metricSuccessRule: events.Rule;
  public readonly metricTimeoutRule: events.Rule;
  public readonly metricFailureRule: events.Rule;
  public readonly allExecutionAttemptsFailedEventSource = 'custom.aws.glue.allExecutionAttemptsFailed';
  public readonly allExecutionAttemptsFailedEventDetailType = 'All Execution Attempts Failed';
  public readonly executionFailureRule: events.Rule;
  public readonly lambdaFunction: lambda.SingletonFunction;

  private allExecutionAttemptsFailedRule: events.Rule;

  constructor(scope: cdk.Construct, id: string, props: IGlueJobProperties) {
    super(scope, id);

    this.role = this.createGlueJobRole(props);

    this.job = new glue.CfnJob(this, `${props.name}-glue-job`, {
      name: props.name,
      description: props.description,
      workerType: props.workerType,
      numberOfWorkers: props.numberOfWorkers,
      role: this.role.roleName,
      maxRetries: props.maxRetries || 0,
      executionProperty: {
        maxConcurrentRuns: props.maxConcurrentRuns || 3,
      },
      glueVersion: props.glueVersion || GlueVersion.V_1,
      command: {
        pythonVersion: '3',
        scriptLocation: props.jobScript,
        name: props.jobType,
      },
      timeout: props.timeout || GlueJob.DAY_IN_MINUTES,
      defaultArguments: {
        '--job-language': 'python',
        '--enable-metrics': true,
        '--enable-continuous-cloudwatch-log': true,
        '--region': cdk.Stack.of(this).region,
        '--enable-glue-datacatalog': true,
        '--enable-continuous-log-filter': true,
        '--enable-spark-ui': true,
        ...props.jobArgs,
      },
    });

    this.name = props.name;

    this.metricSuccessRule = this.jobRule('SuccessRule', this.name, 'SUCCEEDED');
    this.metricFailureRule = this.jobRule('FailureRule', this.name, 'FAILED');
    this.metricTimeoutRule = this.jobRule('TimeoutRule', this.name, 'TIMEOUT');

    this.executionFailureRule = new events.Rule(scope, `${this.name}-execution-failure-rule`, {
      description: `Glue job ${this.name} failed or timed out on an attempt. There might be job retries after this error.`,
      eventPattern: {
        source: ['aws.glue'],
        detailType: ['Glue Job State Change'],
        detail: {
          state: ['FAILED', 'TIMEOUT'],
          jobName: [this.name],
        },
      },
    });

    this.lambdaFunction = this.createLambdaFunction();
    this.executionFailureRule.addTarget(new eventtargets.LambdaFunction(this.lambdaFunction));

    this.allExecutionAttemptsFailedRule = new events.Rule(this, `${this.name}-all-execution-attempts-failed-rule`, {
      description: `Glue job ${this.name} failed or timed out on the last attempt. There will be no retries of the job after this error.`,
      eventPattern: {
        source: [this.allExecutionAttemptsFailedEventSource],
        detailType: [this.allExecutionAttemptsFailedEventDetailType],
        detail: {
          jobName: [this.name],
        },
      },
    });
  }

  private createGlueJobRole(props: IGlueJobProperties): iam.Role {
    const role = new iam.Role(this, 'Role', {
      roleName: props.roleName || props.name + 'Role',
      assumedBy: new iam.ServicePrincipal('glue'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSGlueServiceRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSGlueConsoleFullAccess'),
      ],
    });
    role.addToPolicy(new iam.PolicyStatement({ actions: ['lakeformation:GetDataAccess'], resources: ['*'] }));

    props.deploymentBucket.grantRead(role);

    if (props.readAccessBuckets) {
      props.readAccessBuckets.forEach(bucket => {
        bucket.grantRead(role);
      });
    }

    if (props.writeAccessBuckets) {
      props.writeAccessBuckets.forEach(bucket => {
        bucket.grantWrite(role);
      });
    }
    return role;
  }

  private jobRule(id: string, jobName: string, ...states: string[]): events.Rule {
    return new events.Rule(this, id, {
      ruleName: jobName + states.join(''),
      description: `Event triggered when Glue job ${jobName} is in ${states.join(' or ')} state(s)`,
      eventPattern: {
        source: ['aws.glue'],
        detailType: ['Glue Job State Change'],
        detail: {
          state: states,
          jobName: [jobName],
        },
      },
    });
  }

  metricSuccess(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.ruleMetric(this.metricSuccessRule, props);
  }

  metricFailure(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.ruleMetric(this.metricFailureRule, props);
  }

  metricAllExecutionAttemptsFailed(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return new cloudwatch.Metric({
      metricName: 'TriggeredRules',
      namespace: 'AWS/Events',
      dimensions: {
        RuleName: this.allExecutionAttemptsFailedRule.ruleName,
      },
      statistic: 'Sum',
      period: cdk.Duration.minutes(1),
      ...props,
    });
  }

  metricTimeout(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.ruleMetric(this.metricTimeoutRule, props);
  }

  private ruleMetric({ ruleName }: events.Rule, props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return new cloudwatch.Metric({
      namespace: 'AWS/Events',
      metricName: 'TriggeredRules',
      dimensions: { RuleName: ruleName },
      statistic: cloudwatch.Statistic.SUM,
      ...props,
    }).attachTo(this);
  }

  public metric(metricName: string, dimensionType: string, props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return new cloudwatch.Metric({
      namespace: 'AWS/Glue',
      metricName,
      dimensions: {
        JobName: this.name,
        JobRunId: 'ALL',
        Type: dimensionType,
      },
      ...props,
    });
  }

  public jvmHeapUsageMetric(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('glue.ALL.jvm.heap.usage', 'gauge', props);
  }

  public elapsedTimeMetric(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('glue.driver.aggregate.elapsedTime', 'count', props);
  }

  public diskSpaceUsedMbMetric(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('glue.driver.BlockManager.disk.diskSpaceUsed_MB', 'gauge', props);
  }

  public runTimeInMiliseconds(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.metric('glue.driver.aggregate.elapsedTime', 'gauge', props);
  }

  private createLambdaFunction(): lambda.SingletonFunction {
    const lambdaFunction = new lambda.SingletonFunction(
      this,
      `GlueExecutionFailListenerLambdaSingleton${this.name}`,
      {
        description: 'Checks if an error of a Glue job was on the last attempt (no more retries) in which case the function sends out an event.',
        environment: {
          eventToSendSource: this.allExecutionAttemptsFailedEventSource,
          eventToSendDetailType: this.allExecutionAttemptsFailedEventDetailType,
        },
        uuid: 'GlueExecutionFailListenerLambda',
        runtime: lambda.Runtime.PYTHON_3_7,
        handler: 'index.handler',
        timeout: cdk.Duration.minutes(1),
        code: lambda.Code.fromInline(`
import boto3
import json
import os
import re

def handler(event, context):
    try:
        jobRunId = event['detail']['jobRunId']
        jobName = event['detail']['jobName']
    except:
        raise Exception(f'Received an malformed event. ({event})')
        
    # get the current execution attempt, we parse it from the jobRunId which has a _attempt_# suffix on retries
    try:
        curExecutionAttempt = int(re.findall('_attempt_(\\d*)$', jobRunId)[0])
    except IndexError:
        curExecutionAttempt = 0
    
    # get the number of MaxRetries for this glue job
    try:
        glue_client = boto3.client('glue')
        maxRetries = glue_client.get_job(JobName=jobName)['Job']['MaxRetries']
    except Exception as e:
        raise Exception(f'Failed to access the Glue API to get the MaxRetries parameter. ({e})')
        
    # is this the last execution? if yes we send out the event
    isLastExecutionAttempt = curExecutionAttempt == maxRetries
    print(f'Job name: {jobName}, is last execution attempt: {isLastExecutionAttempt}, current attempt: {curExecutionAttempt}, max retry attempts: {maxRetries}')
    if isLastExecutionAttempt:
        event_client = boto3.client('events')
        event_client.put_events(Entries=[{
            'Source': os.environ['eventToSendSource'],
            'Detail': json.dumps(event['detail']),
            'DetailType': os.environ['eventToSendDetailType']
        }])
    `),
      },
    );

    const region = cdk.Stack.of(this).region;
    const accountId = cdk.Stack.of(this).account;

    lambdaFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['events:PutEvents'],
        resources: [`arn:aws:events:${region}:${accountId}:event-bus/default`],
      }),
    );

    lambdaFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['glue:GetJob'],
        resources: [`arn:aws:glue:${region}:${accountId}:job/${this.name}`],
      }),
    );

    return lambdaFunction;
  }
}