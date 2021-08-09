import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as events from '@aws-cdk/aws-events';
import * as glue from '@aws-cdk/aws-glue';
import * as iam from '@aws-cdk/aws-iam';
import * as lf from '@aws-cdk/aws-lakeformation';
import * as cdk from '@aws-cdk/core';
import { Permissions } from '../data-lake';

export interface IGlueCrawlerProperties {
  name: string;
  databaseName: string;
  roleName?: string;
  trigger?: glue.CfnTrigger;
  bucketName: string;
  bucketPrefix?: string;
}

export class GlueCrawler extends cdk.Construct {
  public readonly crawler: glue.CfnCrawler
  public readonly role: iam.IRole;
  public readonly metricSuccessRule: events.Rule;
  public readonly metricFailureRule: events.Rule;

  constructor(scope: cdk.Construct, id: string, props: IGlueCrawlerProperties) {
    super(scope, id);

    this.role = this.createGlueCrawlerRole(props);
    this.metricSuccessRule = this.crawlerRule('SuccessRule', props.name, 'Succeeded');
    this.metricFailureRule = this.crawlerRule('FailureRule', props.name, 'Failed');
    let s3TargetPaths = new Array<glue.CfnCrawler.S3TargetProperty>();

    s3TargetPaths.push({
      path: `s3://${props.bucketName}/${props.bucketPrefix}`,
    });

    this.crawler = new glue.CfnCrawler(this, `data-lake-crawler-${props.name}-`, {
      name: props.name,
      role: this.role.roleArn,
      databaseName: props.databaseName,
      targets: {
        s3Targets: s3TargetPaths,
      },
    });

    new lf.CfnPermissions(this, 'glue-role-database-permission', {
      dataLakePrincipal: {
        dataLakePrincipalIdentifier: this.role.roleArn,
      },
      resource: {
        databaseResource: {
          name: props.databaseName,
        },
      },
      permissions: [
        'CREATE_TABLE',
        'DESCRIBE',
      ],
    });

    new lf.CfnPermissions(this, 'datalake-creator-permission', {
      dataLakePrincipal: {
        dataLakePrincipalIdentifier: this.role.roleArn,
      },
      resource: {
        dataLocationResource: {
          s3Resource: `arn:aws:s3:::${props.bucketName}`,
        },
      },
      permissions: [
        Permissions.DATA_LOCATION_ACCESS,
      ],
    });
  }

  metricSuccess(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.ruleMetric(this.metricSuccessRule, props);
  }

  metricFailure(props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.ruleMetric(this.metricFailureRule, props);
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

  private crawlerRule(id: string, crawlerName: string, ...states: string[]): events.Rule {
    return new events.Rule(this, id, {
      ruleName: crawlerName + states.join(''),
      description: `Event triggered when Glue Crawler ${crawlerName} is in ${states.join(' or ')} state(s)`,
      eventPattern: {
        source: ['aws.glue'],
        detailType: ['Glue Crawler State Change'],
        detail: {
          state: states,
          crawlerName: [crawlerName],
        },
      },
    });
  }

  private createGlueCrawlerRole(props: IGlueCrawlerProperties): iam.Role {
    const role = new iam.Role(this, 'Role', {
      roleName: props.roleName || props.name + 'Role',
      assumedBy: new iam.ServicePrincipal('glue'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSGlueServiceRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'), // slim this down if possible
      ],
    });
    role.addToPolicy(new iam.PolicyStatement({ actions: ['lakeformation:GetDataAccess'], resources: ['*'] }));
    return role;
  }
}