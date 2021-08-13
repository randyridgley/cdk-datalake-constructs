import * as lf from '@aws-cdk/aws-lakeformation';
import * as cdk from '@aws-cdk/core';

import { Permissions, Stage } from '../data-lake';
import { GlueCrawler } from '../etl/glue-crawler';
import { Pipeline } from '../pipeline';
import { buildGlueCrawlerName, buildRoleName, getDataSetBucket } from '../utils';
import { DataSet } from './data-set';

export interface RegisteredDataSetProperties {
  readonly destinationPrefix: string;
  readonly stage: Stage;
  readonly pipeline: Pipeline;
  readonly dataSet: DataSet;
  readonly dataLakeAdminRoleArn: string;
  readonly dataLakeDbCreatorRoleArn: string;
  readonly databaseName: string;
}

export class LFRegisteredDataSet extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: RegisteredDataSetProperties) {
    super(scope, id);
    const account = cdk.Stack.of(this).account;
    const region = cdk.Stack.of(this).region;

    const rawDlResource = this.registerDataLakeLocation(
      props.dataLakeAdminRoleArn, props.dataLakeDbCreatorRoleArn, props.dataSet.rawBucket.bucketName);
    const trustedDlResource = this.registerDataLakeLocation(
      props.dataLakeAdminRoleArn, props.dataLakeDbCreatorRoleArn, props.dataSet.trustedBucket.bucketName);
    const refinedDlResource = this.registerDataLakeLocation(
      props.dataLakeAdminRoleArn, props.dataLakeDbCreatorRoleArn, props.dataSet.refinedBucket.bucketName);

    const bucket = getDataSetBucket(props.pipeline.dataSetDropLocation, props.dataSet);
    const name = bucket.bucketName.replace(/\W/g, '');
    // only create a crawler for the drop location of the data in the data product of the pipeline
    const crawler = new GlueCrawler(this, `data-lake-crawler-${name}`, {
      name: buildGlueCrawlerName({
        accountId: account,
        stage: props.stage,
        resourceUse: 'crawler',
        name: props.pipeline.name,
        region: region,
      }),
      databaseName: props.databaseName,
      bucketName: bucket.bucketName,
      bucketPrefix: props.destinationPrefix,
      roleName: buildRoleName({
        accountId: account,
        stage: props.stage,
        resourceUse: 'crawler-role',
        name: props.pipeline.name,
        region: region,
      }),
    });
    crawler.node.addDependency(rawDlResource);
    crawler.node.addDependency(trustedDlResource);
    crawler.node.addDependency(refinedDlResource);
  }

  private registerDataLakeLocation(dataLakeAdminRoleArn: string, dataLakeDbCreatorRoleArn: string, bucketName: string) : lf.CfnResource {
    const name = bucketName.replace(/\W/g, '');
    const dlResource = new lf.CfnResource(this, `lf-resource-${name}`, {
      resourceArn: `arn:aws:s3:::${bucketName}`,
      useServiceLinkedRole: false,
      roleArn: dataLakeDbCreatorRoleArn,
    });

    const dlPermission = new lf.CfnPermissions(this, `datalake-location-perm-${name}`, {
      dataLakePrincipal: {
        dataLakePrincipalIdentifier: dataLakeAdminRoleArn,
      },
      resource: {
        dataLocationResource: {
          s3Resource: `arn:aws:s3:::${bucketName}`,
        },
      },
      permissions: [
        Permissions.DATA_LOCATION_ACCESS,
      ],
    });
    dlPermission.node.addDependency(dlResource);

    const datalakeCreatorBucketPermission = new lf.CfnPermissions(this, `datalake-creator-perm-${name}`, {
      dataLakePrincipal: {
        dataLakePrincipalIdentifier: dataLakeDbCreatorRoleArn,
      },
      resource: {
        dataLocationResource: {
          s3Resource: `arn:aws:s3:::${bucketName}`,
        },
      },
      permissions: [
        Permissions.DATA_LOCATION_ACCESS,
      ],
    });
    datalakeCreatorBucketPermission.node.addDependency(dlResource);
    return dlResource;
  }
}