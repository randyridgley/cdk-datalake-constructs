import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface DataLakeAdministratorProps {
  readonly name: string;
}

export class DataLakeAdministrator extends Construct {
  public readonly role: iam.IRole;

  constructor(scope: Construct, id: string, props: DataLakeAdministratorProps) {
    super(scope, id);

    const accountId = Stack.of(this).account;

    this.role = new iam.Role(this, 'datalake-administrator-role', {
      roleName: props.name,
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('lakeformation.amazonaws.com'),
        new iam.ServicePrincipal('lambda.amazonaws.com'),
        new iam.ServicePrincipal('sagemaker.amazonaws.com'),
      ),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLakeFormationDataAdmin'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSGlueConsoleFullAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsReadOnlyAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLakeFormationCrossAccountManager'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonAthenaFullAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSageMakerFullAccess'),
      ],
    });

    this.role.attachInlinePolicy(new iam.Policy(this, 'datalake-administrator-basic', {
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'iam:CreateServiceLinkedRole',
          ],
          resources: ['*'],
          conditions: {
            StringEquals: {
              'iam:AWSServiceName': 'lakeformation.amazonaws.com',
            },
          },
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'iam:PutRolePolicy',
          ],
          resources: [`arn:aws:iam::${accountId}:role/aws-service-role/lakeformation.amazonaws.com/AWSServiceRoleForLakeFormationDataAccess`],
        }),
      ],
    }));

    this.role.attachInlinePolicy(new iam.Policy(this, 'datalake-administrator-lambda-writeCW-logs', {
      statements: [
        new iam.PolicyStatement({
          resources: ['*'],
          actions: [
            'logs:CreateLogGroup',
            'logs:CreateLogStream',
            'logs:PutLogEvents',
          ],
          effect: iam.Effect.ALLOW,
          sid: 'AllowLogging',
        }),
      ],
    }));

    this.role.attachInlinePolicy(new iam.Policy(this, 'datalake-administrator-TBAC', {
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'lakeformation:AddLFTagsToResource',
            'lakeformation:RemoveLFTagsFromResource',
            'lakeformation:GetResourceLFTags',
            'lakeformation:ListLFTags',
            'lakeformation:CreateLFTag',
            'lakeformation:GetLFTag',
            'lakeformation:UpdateLFTag',
            'lakeformation:DeleteLFTag',
            'lakeformation:SearchTablesByLFTags',
            'lakeformation:SearchDatabasesByLFTags',
          ],
          resources: ['*'],
        }),
      ],
    }));

    this.role.attachInlinePolicy(new iam.Policy(this, 'datalake-administrator-cross-account', {
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'ram:AcceptResourceShareInvitation',
            'ram:RejectResourceShareInvitation',
            'ec2:DescribeAvailabilityZones',
            'ram:EnableSharingWithAwsOrganization',
          ],
          resources: ['*'],
        }),
      ],
    }));
  }
}