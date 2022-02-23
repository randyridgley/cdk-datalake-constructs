import { CfnOutput } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface DataLakeCreatorProperties {
  readonly name: string;
}

export class DataLakeCreator extends Construct {
  public readonly role: iam.IRole;

  constructor(scope: Construct, id: string, props: DataLakeCreatorProperties) {
    super(scope, id);

    this.role = new iam.Role(this, `AWSDBCreatorServiceRole-${props.name}`, {
      roleName: props.name,
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('glue.amazonaws.com'),
      ),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSGlueServiceRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLakeFormationDataAdmin'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
      ],
      path: '/service-role/',
    });

    this.role.addToPrincipalPolicy(new iam.PolicyStatement({
      actions: [
        'lakeformation:GetDataAccess',
      ],
      resources: ['*'],
    }));
    new CfnOutput(this, 'DataLakeDatabaseCreatorRole', { value: this.role.roleName });
  }
}