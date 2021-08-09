import * as cdk from '@aws-cdk/core';

export interface SftpWorkflowProps {

}

export class SftpWorkflow extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: SftpWorkflowProps) {
    super(scope, id);
    console.log(props);
  }
}