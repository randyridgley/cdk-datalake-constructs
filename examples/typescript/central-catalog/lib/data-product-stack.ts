import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

import * as dl from '@cdk-7layer-constructs/datalake-constructs';

export interface DataProductStackProps extends cdk.StackProps {
  readonly dataProducts: dl.DataProduct[]
  readonly lakeName: string
  readonly stageName: dl.Stage;  
  readonly crossAccountAccess?: dl.CrossAccountProperties
}

export class DataProductStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props: DataProductStackProps) {
    super(scope, id, props);
  
    const region = cdk.Stack.of(this).region;
    const accountId = cdk.Stack.of(this).account;
    const vpc = this.create_vpc(accountId, region, props.stageName)

    // create the local data lake with their own Glue Data catalog and IAM Role to act as data lake administrator 
    const datalake = new dl.DataLake(this, 'LocalDataLake', {
      name: props.lakeName,
      accountId: accountId,
      region: region,
      stageName: props.stageName,
      crossAccount: props.crossAccountAccess ? props.crossAccountAccess : undefined,
      vpc: vpc,
      dataProducts: props.dataProducts
    });
  }
  
  private create_vpc(accountId: string, region: string, stageName: string) : ec2.Vpc {
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

    cdk.Tags.of(vpc).add('Name', dl.buildUniqueName({
      name: 'vpc',
      accountId: accountId,
      region: region,
      stage: stageName,
      resourceUse: 'datalake'
    }, 60));

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
