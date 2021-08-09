import * as iam from '@aws-cdk/aws-iam';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';

export interface DataLakeAnalystProps {
  readonly name: string;
  readonly readAccessBuckets?: s3.IBucket[];
  readonly writeAccessBuckets?: s3.IBucket[];
}

export class DataLakeAnalyst extends cdk.Construct {
  public readonly user: iam.User;

  constructor(scope: cdk.Construct, id: string, props: DataLakeAnalystProps) {
    super(scope, id);

    this.user = new iam.User(this, 'DataAnalystUser', {
      userName: props.name,
      password: cdk.SecretValue.plainText(this.node.tryGetContext('initialPassword')),
      passwordResetRequired: true,
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonAthenaFullAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('IAMUserChangePassword'),
      ],
    });

    // need to add access to Athena worgroup output S3 bucket
    this.user.attachInlinePolicy(new iam.Policy(this, 'DataAnalystPermissions', {
      policyName: 'DataAnalystPermissions',
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'lakeformation:GetDataAccess',
            'glue:GetTable',
            'glue:GetTables',
            'glue:SearchTables',
            'glue:GetDatabase',
            'glue:GetDatabases',
            'glue:GetPartitions',
          ],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'lambda:InvokeFunction',
          ],
          resources: ['*'], // can I shrink this down to only the Athena Lambda UDFs
        }),
      ],
    }));

    if (props.readAccessBuckets) {
      props.readAccessBuckets.forEach(bucket => {
        bucket.grantRead(this.user);
      });
    }

    if (props.writeAccessBuckets) {
      props.writeAccessBuckets.forEach(bucket => {
        bucket.grantWrite(this.user);
      });
    }
  }
}