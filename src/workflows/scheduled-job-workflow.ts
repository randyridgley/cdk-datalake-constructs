import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
import * as iam from '@aws-cdk/aws-iam';
import * as logs from '@aws-cdk/aws-logs';
import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as tasks from '@aws-cdk/aws-stepfunctions-tasks';
import * as cdk from '@aws-cdk/core';

import { Stage } from '../data-lake';
import { buildEventRuleName, buildRoleName } from '../utils';

export interface ScheduledJobWorkflowProps {
  readonly schedule: events.Schedule;
  readonly name: string;
  readonly stageName: Stage;
  readonly jobName: string;
  readonly jobArguments: {[key: string]: any};
  readonly jobTimeout: cdk.Duration;
}

export class ScheduledJobWorkflow extends cdk.Construct {
  public readonly rule:events.Rule
  public readonly stateMachine: sfn.StateMachine

  constructor(scope: cdk.Construct, id: string, props: ScheduledJobWorkflowProps) {
    super(scope, id);
    const account = cdk.Stack.of(this).account;
    const region = cdk.Stack.of(this).region;

    const stateMachineRole = new iam.Role(scope, 'StateMachineJobExecutionRole', {
      roleName: buildRoleName({
        name: props.name,
        accountId: account,
        region: region,
        resourceUse: 'datalake',
        stage: props.stageName,
      }),
      assumedBy: new iam.ServicePrincipal('states'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSGlueServiceRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
      ],
    });

    const jobState = new tasks.GlueStartJobRun(this, 'GlueExecutionStep', {
      glueJobName: props.jobName,
      integrationPattern: sfn.IntegrationPattern.RUN_JOB,
      arguments: sfn.TaskInput.fromObject(props.jobArguments),
      timeout: props.jobTimeout,
      resultPath: '$.jobOutput',
    });

    const stateMachineDefinition = sfn.Chain.start(jobState).toSingleState('Run Job pipeline', {
      comment: 'Container for glue job states',
    }).addCatch(this.getStateMachineFailureHandlerState(), {});

    this.stateMachine = new sfn.StateMachine(this, 'GlueStateMachine', {
      definition: stateMachineDefinition,
      logs: {
        destination: new logs.LogGroup(this, `DataLakeWorkflow-${props.name}`, {
          retention: logs.RetentionDays.SIX_MONTHS,
        }),
        includeExecutionData: true,
        level: sfn.LogLevel.ERROR,
      },
      tracingEnabled: true,
      role: stateMachineRole,
    });

    this.rule = new events.Rule(this, 'Rule', {
      schedule: props.schedule,
      ruleName: buildEventRuleName({
        name: props.name,
        resourceUse: 'datalake',
        accountId: account,
        region: region,
        stage: props.stageName,
      }),
    });
    this.rule.addTarget(new targets.SfnStateMachine(this.stateMachine));
  }

  private getStateMachineFailureHandlerState(): sfn.Fail {
    return new sfn.Fail(this, 'Handle failures', {
      comment: 'Handle failures for entire state machine',
    });
  }
}