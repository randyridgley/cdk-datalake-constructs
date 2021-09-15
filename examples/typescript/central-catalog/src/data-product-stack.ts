import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

import * as dl from '@randyridgley/cdk-datalake-constructs';

export interface DataProductStackProps extends cdk.StackProps {
  readonly dataProducts: dl.DataProduct[]
  readonly lakeName: string
  readonly stageName: dl.Stage;  
  readonly crossAccountAccess?: dl.CrossAccountProperties
}

export class DataProductStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props: DataProductStackProps) {
    super(scope, id, props);
    let region = cdk.Stack.of(this).region;
    let accountId = cdk.Stack.of(this).account;

    if(props.env) {
      region = props.env.region!
      accountId = props.env.account!
    }
    
    const vpc = this.createVpc()

    // create the local data lake with their own Glue Data catalog and IAM Role to act as data lake administrator 
    const datalake = new dl.DataLake(this, 'LocalDataLake', {
      name: props.lakeName,
      accountId: accountId,
      region: region,
      stageName: props.stageName,
      crossAccountAccess: props.crossAccountAccess ? props.crossAccountAccess : undefined,
      vpc: vpc,
      dataProducts: props.dataProducts,
      createDefaultDatabase: true
    });

    datalake.createDownloaderCustomResource(accountId, region, props.stageName)
  }
  
  private createVpc() : ec2.Vpc {
    const vpc = new ec2.Vpc(this, 'lake-vpc', {
      maxAzs: 3,
      subnetConfiguration: [
        {
          name: "isolated",
          subnetType: ec2.SubnetType.ISOLATED,
          cidrMask: 26,
        },
        {
          name: "public",
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 26,
        },
      ],
      natGateways: 0
    });

    cdk.Tags.of(vpc).add('Name', 'DemoVPC');

    // add endpoints for S3 and Glue private access on the VPC
    vpc.addGatewayEndpoint("s3-endpoint", {
      service: ec2.GatewayVpcEndpointAwsService.S3,
      subnets: [
        {
          subnetType: ec2.SubnetType.ISOLATED,
        },
      ],
    });

    vpc.addInterfaceEndpoint("glue-endpoint", {
      service: ec2.InterfaceVpcEndpointAwsService.GLUE,
      subnets: {
        subnetType: ec2.SubnetType.ISOLATED,
      },
    });

    return vpc
  }
}
