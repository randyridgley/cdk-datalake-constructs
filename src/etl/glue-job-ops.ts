import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as cdk from '@aws-cdk/core';

import { GlueJob } from './glue-job';

export interface IGlueOpsProperties {
  job: GlueJob;
  jvmHeapSizeExceeding80percent?: cloudwatch.CreateAlarmOptions;
  jvmHeapSizeExceeding90percent?: cloudwatch.CreateAlarmOptions;
  metricExecutionFailure?: cloudwatch.CreateAlarmOptions;
  metricAllExecutionAttemptsFailed?: cloudwatch.CreateAlarmOptions;
}

export class GlueJobOps extends cdk.Construct {
  public readonly job: GlueJob;
  public dashboard: cloudwatch.Dashboard;
  public readonly jvmHeapSizeExceeding80PercentAlarm: cloudwatch.Alarm;
  public readonly jvmHeapSizeExceeding90PercentAlarm: cloudwatch.Alarm;
  public readonly metricExecutionFailureAlarm: cloudwatch.Alarm;
  public readonly metricAllExecutionAttemptsFailedAlarm: cloudwatch.Alarm;

  public readonly alarmsSev2: cloudwatch.Alarm[];
  public readonly alarmsSev3: cloudwatch.Alarm[];

  constructor(scope: cdk.Construct, id: string, props: IGlueOpsProperties) {
    super(scope, id);

    this.job = props.job;

    this.dashboard = new cloudwatch.Dashboard(this, 'dashboard', {
      dashboardName: `ETL_${this.job.name}`,
    });

    this.jvmHeapSizeExceeding80PercentAlarm = new cloudwatch.Alarm(this, 'jvm-heapSize-exceeding80percent-alarm', {
      alarmName: `${this.job.name} JvmHeapSizeExceeding80`,
      alarmDescription: `Jvm Heap Size exceeding 80% glue job (${this.job.name})`,
      metric: this.job.jvmHeapUsageMetric(),
      threshold: 0.8,
      evaluationPeriods: 1,
      datapointsToAlarm: 1,
      period: cdk.Duration.days(1),
      statistic: cloudwatch.Statistic.MAXIMUM,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      ...(props.jvmHeapSizeExceeding80percent || {}),
    });

    this.jvmHeapSizeExceeding90PercentAlarm = new cloudwatch.Alarm(this, 'jvm-heapSize-exceeding90Percent-alarm', {
      alarmName: `${this.job.name} JvmHeapSizeExceeding90`,
      alarmDescription: `Jvm Heap Size exceeding 90% glue job (${this.job.name})`,
      metric: this.job.jvmHeapUsageMetric(),
      threshold: 0.9,
      evaluationPeriods: 1,
      datapointsToAlarm: 1,
      period: cdk.Duration.days(1),
      statistic: cloudwatch.Statistic.MAXIMUM,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      ...(props.jvmHeapSizeExceeding90percent || {}),
    });

    this.metricExecutionFailureAlarm = new cloudwatch.Alarm(this, 'metric-execution-failure-alarm', {
      alarmName: `${this.job.name} ExecutionFailure`,
      alarmDescription: `Error while running the Glue job ${this.job.name} on the current attempt. There might be job retries after this error.`,
      metric: this.job.metricFailure(),
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      threshold: 1,
      evaluationPeriods: 1,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
      ...(props.metricExecutionFailure || {}),
    });

    this.metricAllExecutionAttemptsFailedAlarm = new cloudwatch.Alarm(this, 'metric-all-execution-attempts-failed-alarm', {
      alarmName: `${this.job.name} AllExecutionAttemptsFailed`,
      alarmDescription: `Error while running the Glue job ${this.job.name} on the last attempt. There will be no retries of the job after this error.`,
      metric: this.job.metricAllExecutionAttemptsFailed(),
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      threshold: 1,
      evaluationPeriods: 1,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
      ...(props.metricAllExecutionAttemptsFailed || {}),
    });

    this.alarmsSev2 = [
      this.jvmHeapSizeExceeding90PercentAlarm,
      this.metricAllExecutionAttemptsFailedAlarm,
    ];

    this.alarmsSev3 = [
      this.jvmHeapSizeExceeding80PercentAlarm,
      this.metricExecutionFailureAlarm,
    ];

    this.setupDashboard();
  }

  private addWidgets(widgets: cloudwatch.IWidget[]) {
    for (let i = 0; i < widgets.length; i += 4) {
      this.dashboard.addWidgets(...widgets.slice(i, i + 4));
    }
  }

  private setupDashboard() {
    this.dashboard.addWidgets(
      new cloudwatch.TextWidget({
        markdown: `# ${this.job.name} Job Result`,
        height: 1,
        width: 24,
      }),
    );

    const jobResultWidgets = [
      new cloudwatch.GraphWidget({
        left: [
          new cloudwatch.MathExpression({
            expression: `SEARCH('MetricName="TriggeredRules" RuleName="${this.job.metricSuccessRule.ruleName}"', 'Sum', 900)`,
            usingMetrics: {},
            label: 'Success Count',
          }),
        ],
        title: 'Success Count',
        height: 6,
        width: 6,
      }),
      new cloudwatch.GraphWidget({
        left: [
          new cloudwatch.MathExpression({
            expression: `SEARCH('MetricName="TriggeredRules" RuleName="${this.job.metricFailureRule.ruleName}"', 'Sum', 900)`,
            usingMetrics: {},
            label: 'Failure Count',
          }),
        ],
        title: 'Failure Count',
        height: 6,
        width: 6,
      }),
      new cloudwatch.GraphWidget({
        left: [
          new cloudwatch.MathExpression({
            expression: `SEARCH('MetricName="TriggeredRules" RuleName="${this.job.metricTimeoutRule.ruleName}"', 'Sum', 900)`,
            usingMetrics: {},
            label: 'Timeout Count',
          }),
        ],
        title: 'Timeout Count',
        height: 6,
        width: 6,
      }),
    ];

    this.dashboard.addWidgets(...jobResultWidgets);

    this.dashboard.addWidgets(
      new cloudwatch.TextWidget({
        markdown: `# ${this.job.name} JVM Glue Driver Stats Alarms`,
        height: 1,
        width: 24,
      }),
    );

    this.dashboard.addWidgets(
      ...[
        new cloudwatch.GraphWidget({
          left: [this.job.diskSpaceUsedMbMetric()],
          title: `${this.job.diskSpaceUsedMbMetric().metricName} (${this.job.diskSpaceUsedMbMetric().statistic})`,
          height: 6,
          width: 6,
        }),
        new cloudwatch.GraphWidget({
          left: [this.job.elapsedTimeMetric()],
          title: `${this.job.elapsedTimeMetric().metricName} (${this.job.elapsedTimeMetric().statistic})`,
          height: 6,
          width: 6,
        }),
      ],
    );

    const sev2AlarmWidgets = this.alarmsSev2.map(this.alarmWidget);
    const sev3AlarmWidgets = this.alarmsSev3.map(this.alarmWidget);
    this.addWidgets(sev2AlarmWidgets);
    this.addWidgets(sev3AlarmWidgets);
  }

  private alarmWidget(alarm: cloudwatch.Alarm): cloudwatch.AlarmWidget {
    return new cloudwatch.AlarmWidget({
      alarm: alarm,
      title: `${alarm.alarmName}`,
      height: 6,
      width: 6,
    });
  }
}
