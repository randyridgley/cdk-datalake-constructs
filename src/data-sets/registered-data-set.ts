import * as lf from '@aws-cdk/aws-lakeformation';
import * as cdk from '@aws-cdk/core';

import { Permissions, Stage } from '../data-lake';
import { GlueCrawler } from '../etl/glue-crawler';
import { buildGlueCrawlerName, buildRoleName } from '../utils';

export interface RegisteredDataSetProperties {
  readonly destinationPrefix: string;
  readonly destinationBucketName: string;
  readonly stage: Stage;
  readonly name: string;
  readonly dataLakeAdminRoleArn: string;
  readonly dataLakeDbCreatorRoleArn: string;
  readonly databaseName: string;
}

export class LFRegisteredDataSet extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: RegisteredDataSetProperties) {
    super(scope, id);
    const account = cdk.Stack.of(this).account;
    const region = cdk.Stack.of(this).region;

    const dlResource = new lf.CfnResource(this, `lf-resource-s3-bucket-${props.name}`, {
      resourceArn: `arn:aws:s3:::${props.destinationBucketName}`,
      useServiceLinkedRole: false,
      roleArn: props.dataLakeDbCreatorRoleArn,
    });

    const dlPermission = new lf.CfnPermissions(this, 'datalake-location-permission', {
      dataLakePrincipal: {
        dataLakePrincipalIdentifier: props.dataLakeAdminRoleArn,
      },
      resource: {
        dataLocationResource: {
          s3Resource: `arn:aws:s3:::${props.destinationBucketName}`,
        },
      },
      permissions: [
        Permissions.DATA_LOCATION_ACCESS,
      ],
    });
    dlPermission.node.addDependency(dlResource);

    const datalakeCreatorBucketPermission = new lf.CfnPermissions(this, 'datalake-creator-permission', {
      dataLakePrincipal: {
        dataLakePrincipalIdentifier: props.dataLakeDbCreatorRoleArn,
      },
      resource: {
        dataLocationResource: {
          s3Resource: `arn:aws:s3:::${props.destinationBucketName}`,
        },
      },
      permissions: [
        Permissions.DATA_LOCATION_ACCESS,
      ],
    });
    datalakeCreatorBucketPermission.node.addDependency(dlResource);

    const crawler = new GlueCrawler(this, `data-lake-crawler-${props.name}`, {
      name: buildGlueCrawlerName({
        accountId: account,
        stage: props.stage,
        resourceUse: 'crawler',
        name: props.name,
        region: region,
      }),
      databaseName: props.databaseName,
      bucketName: props.destinationBucketName,
      bucketPrefix: props.destinationPrefix,
      roleName: buildRoleName({
        accountId: account,
        stage: props.stage,
        resourceUse: 'crawler-role',
        name: props.name,
        region: region,
      }),
    });
    crawler.node.addDependency(dlResource);
  }
}