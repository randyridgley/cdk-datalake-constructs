import * as glue from '@aws-cdk/aws-glue';
import * as iam from '@aws-cdk/aws-iam';
import * as s3 from '@aws-cdk/aws-s3';
import * as sagemaker from '@aws-cdk/aws-sagemaker';
import * as cdk from '@aws-cdk/core';

import { buildGlueEndpointName, buildRoleName } from '../utils';
import { GlueVersion, GlueWorkerType } from './glue-job';

export interface GlueNotebookProperties {
  readonly notebookName: string;
  readonly notebookInstanceType: string;
  readonly workerType: GlueWorkerType;
  readonly glueVersion: GlueVersion;
  readonly numberOfWorkers: number;
  readonly region: string;
  readonly accountId: string;
  readonly stage: string;
  readonly readAccessBuckets?: s3.IBucket[];
  readonly writeAccessBuckets?: s3.IBucket[];
  readonly database: string;
}

export class GlueNotebook extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: GlueNotebookProperties) {
    super(scope, id);

    const glueRole = new iam.Role(this, 'AWSGlueServiceRole', {
      assumedBy: new iam.ServicePrincipal('glue.amazonaws.com'),
      description: 'Role for AWS Glue to call other AWS services on your behalf',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLakeFormationDataAdmin'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSGlueServiceRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonKinesisReadOnlyAccess'),
      ],
      roleName: buildRoleName({
        name: 'glue-notebook',
        accountId: props.accountId,
        region: props.region,
        resourceUse: 'datalake',
        stage: props.stage,
      }),
      inlinePolicies: {
        LakeFormationACID: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'lakeformation:BeginTransaction',
                'lakeformation:CommitTransaction',
                'lakeformation:AbortTransaction',
                'lakeformation:ExtendTransaction',
                'lakeformation:GetTransaction',
                'lakeformation:GetTransactions',
                'lakeformation:UpdateTableObjects',
              ],
              resources: [
                '*',
              ],
            }),
          ],
        }),
        LakeFormationQuery: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'lakeformation:BeginTransaction',
                'lakeformation:CommitTransaction',
                'lakeformation:AbortTransaction',
                'lakeformation:ExtendTransaction',
                'lakeformation:PlanQuery',
                'lakeformation:GetTableObjects',
                'lakeformation:GetQueryState',
                'lakeformation:GetWorkUnits',
                'lakeformation:Execute',
              ],
              resources: [
                '*',
              ],
            }),
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'execute-api:Invoke',
              ],
              resources: [
                'arn:aws:execute-api:*:*:*/*/POST/reportStatus',
              ],
            }),
          ],
        }),
      },
    });

    const glueEndpoint = new glue.CfnDevEndpoint(this, 'dev-endpoint', {
      roleArn: glueRole.roleArn,
      endpointName: buildGlueEndpointName({
        name: 'glue-endpoint',
        accountId: props.accountId,
        region: props.region,
        resourceUse: 'datalake',
        stage: props.stage,
      }),
      arguments:
        {
          '--enable-glue-datacatalog': '',
          'GLUE_PYTHON_VERSION': '3',
        },
      glueVersion: props.glueVersion,
      workerType: props.workerType,
      numberOfWorkers: props.numberOfWorkers,
    });

    const notebookRole = new iam.Role(this, 'notebook-role', {
      roleName: buildRoleName({
        name: 'notebook',
        accountId: props.accountId,
        region: props.region,
        resourceUse: 'datalake',
        stage: props.stage,
      }),
      assumedBy: new iam.ServicePrincipal('sagemaker.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSageMakerFullAccess'),
      ],
      inlinePolicies: {
        ListJESBucket: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                's3:ListBucket',
              ],
              resources: [
                `arn:aws:s3:::aws-glue-jes-prod-${props.region}-assets`,
              ],
            }),
          ],
        }),
        GetJESObjects: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                's3:GetObject',
              ],
              resources: [
                `arn:aws:s3:::aws-glue-jes-prod-${props.region}-assets`,
              ],
            }),
          ],
        }),
        LogStreams: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'logs:CreateLogStream',
                'logs:DescribeLogStreams',
                'logs:PutLogEvents',
                'logs:CreateLogGroup',
              ],
              resources: [
                `arn:aws:logs:${props.region}:${props.accountId}:log-group:/aws/sagemaker/*`,
                `arn:aws:logs:${props.region}:${props.accountId}:log-group:/aws/sagemaker/*:log-stream:aws-glue-*`,
              ],
            }),
          ],
        }),
        GlueEndpoint: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'glue:UpdateDevEndpoint',
                'glue:GetDevEndpoint',
                'glue:GetDevEndpoints',
              ],
              resources: [
                `arn:aws:glue:${props.region}:${props.accountId}:devEndpoint/${glueEndpoint.endpointName}*`,
              ],
            }),
          ],
        }),
      },
    });

    if (props.readAccessBuckets) {
      props.readAccessBuckets.forEach(bucket => {
        bucket.grantRead(notebookRole);
      });
    }

    if (props.writeAccessBuckets) {
      props.writeAccessBuckets.forEach(bucket => {
        bucket.grantWrite(notebookRole);
      });
    }

    //apply notebook role LF permissions

    const lifecycleConfig = new sagemaker.CfnNotebookInstanceLifecycleConfig(this, 'lifecycle-config', {
      notebookInstanceLifecycleConfigName: `${props.notebookName}-lifecycle-config`,
      onCreate: [
        {
          content: `
                #!/bin/bash
                set -ex
                [ -e /home/ec2-user/glue_ready ] && exit 0
  
                mkdir -p /home/ec2-user/glue
                cd /home/ec2-user/glue
  
                # Write dev endpoint in a file which will be used by daemon scripts
                glue_endpoint_file="/home/ec2-user/glue/glue_endpoint.txt"
  
                if [ -f $glue_endpoint_file ] ; then
                    rm $glue_endpoint_file
                fi
                echo "https://glue.${props.region}.amazonaws.com" >> $glue_endpoint_file
  
                aws s3 cp s3://aws-glue-jes-prod-${props.region}-assets/sagemaker/assets/ . --recursive
  
                bash "/home/ec2-user/glue/Miniconda2-4.5.12-Linux-x86_64.sh" -b -u -p "/home/ec2-user/glue/miniconda"
  
                source "/home/ec2-user/glue/miniconda/bin/activate"
  
                tar -xf autossh-1.4e.tgz
                cd autossh-1.4e
                ./configure
                make
                sudo make install
                sudo cp /home/ec2-user/glue/autossh.conf /etc/init/
  
                mkdir -p /home/ec2-user/.sparkmagic
                cp /home/ec2-user/glue/config.json /home/ec2-user/.sparkmagic/config.json
  
                mkdir -p /home/ec2-user/SageMaker/Glue\ Examples
                mv /home/ec2-user/glue/notebook-samples/* /home/ec2-user/SageMaker/Glue\ Examples/
  
                # ensure SageMaker notebook has permission for the dev endpoint
                aws glue get-dev-endpoint --endpoint-name ${glueEndpoint.endpointName} --endpoint https://glue.${props.region}.amazonaws.com
  
                # Run daemons as cron jobs and use flock make sure that daemons are started only if stopped
                (crontab -l; echo "* * * * * /usr/bin/flock -n /tmp/lifecycle-config-v2-dev-endpoint-daemon.lock /usr/bin/sudo /bin/sh /home/ec2-user/glue/lifecycle-config-v2-dev-endpoint-daemon.sh") | crontab -
  
                (crontab -l; echo "* * * * * /usr/bin/flock -n /tmp/lifecycle-config-reconnect-dev-endpoint-daemon.lock /usr/bin/sudo /bin/sh /home/ec2-user/glue/lifecycle-config-reconnect-dev-endpoint-daemon.sh") | crontab -
  
                CONNECTION_CHECKER_FILE=/home/ec2-user/glue/dev_endpoint_connection_checker.py
                if [ -f "$CONNECTION_CHECKER_FILE" ]; then
                    # wait for async dev endpoint connection to come up
                    echo "Checking DevEndpoint connection."
                    python3 $CONNECTION_CHECKER_FILE
                fi
  
                source "/home/ec2-user/glue/miniconda/bin/deactivate"
  
                rm -rf "/home/ec2-user/glue/Miniconda2-4.5.12-Linux-x86_64.sh"
  
                sudo touch /home/ec2-user/glue_ready`,
        },
      ],
      onStart: [
        {
          content: `
                #!/bin/bash
                set -ex
                [ -e /home/ec2-user/glue_ready ] && exit 0

                mkdir -p /home/ec2-user/glue
                cd /home/ec2-user/glue

                # Write dev endpoint in a file which will be used by daemon scripts
                glue_endpoint_file="/home/ec2-user/glue/glue_endpoint.txt"

                if [ -f $glue_endpoint_file ] ; then
                    rm $glue_endpoint_file
                fi
                echo "https://glue.${props.region}.amazonaws.com" >> $glue_endpoint_file

                aws s3 cp s3://aws-glue-jes-prod-${props.region}-assets/sagemaker/assets/ . --recursive

                bash "/home/ec2-user/glue/Miniconda2-4.5.12-Linux-x86_64.sh" -b -u -p "/home/ec2-user/glue/miniconda"

                source "/home/ec2-user/glue/miniconda/bin/activate"

                tar -xf autossh-1.4e.tgz
                cd autossh-1.4e
                ./configure
                make
                sudo make install
                sudo cp /home/ec2-user/glue/autossh.conf /etc/init/

                mkdir -p /home/ec2-user/.sparkmagic
                cp /home/ec2-user/glue/config.json /home/ec2-user/.sparkmagic/config.json

                mkdir -p /home/ec2-user/SageMaker/Glue\ Examples
                mv /home/ec2-user/glue/notebook-samples/* /home/ec2-user/SageMaker/Glue\ Examples/

                # ensure SageMaker notebook has permission for the dev endpoint
                aws glue get-dev-endpoint --endpoint-name ${glueEndpoint.endpointName} --endpoint https://glue.${props.region}.amazonaws.com

                # Run daemons as cron jobs and use flock make sure that daemons are started only iff stopped
                (crontab -l; echo "* * * * * /usr/bin/flock -n /tmp/lifecycle-config-v2-dev-endpoint-daemon.lock /usr/bin/sudo /bin/sh /home/ec2-user/glue/lifecycle-config-v2-dev-endpoint-daemon.sh") | crontab -

                (crontab -l; echo "* * * * * /usr/bin/flock -n /tmp/lifecycle-config-reconnect-dev-endpoint-daemon.lock /usr/bin/sudo /bin/sh /home/ec2-user/glue/lifecycle-config-reconnect-dev-endpoint-daemon.sh") | crontab -

                CONNECTION_CHECKER_FILE=/home/ec2-user/glue/dev_endpoint_connection_checker.py
                if [ -f "$CONNECTION_CHECKER_FILE" ]; then
                    # wait for async dev endpoint connection to come up
                    echo "Checking DevEndpoint connection."
                    python3 $CONNECTION_CHECKER_FILE
                fi

                source "/home/ec2-user/glue/miniconda/bin/deactivate"

                rm -rf "/home/ec2-user/glue/Miniconda2-4.5.12-Linux-x86_64.sh"

                sudo touch /home/ec2-user/glue_ready`,
        },
      ],
    });

    const notebook = new sagemaker.CfnNotebookInstance(this, 'sagemaker-notebook', {
      notebookInstanceName: props.notebookName,
      lifecycleConfigName: lifecycleConfig.notebookInstanceLifecycleConfigName,
      roleArn: notebookRole.roleArn,
      instanceType: props.notebookInstanceType,
    });

    new cdk.CfnOutput(this, 'GlueNotebook', { value: notebook.notebookInstanceName! });
  }
}