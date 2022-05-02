import { Aws } from 'aws-cdk-lib';
import { IRole } from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as lf from 'aws-cdk-lib/aws-lakeformation';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import * as s3sns from 'aws-cdk-lib/aws-s3-notifications';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct, IDependable } from 'constructs';
import { LakeType, Permissions } from '..';
import { Stage } from '../data-lake';
import { DataLakeBucket } from '../data-lake-bucket';
import { DataProduct } from '../data-product';
import { Pipeline, S3NotificationProperties } from '../pipeline';
import { buildS3BucketName } from '../utils';

export enum DataTier {
  RAW = 'raw',
  REFINED = 'refined',
  TRUSTED = 'trusted',
}

export interface DataSetProperties {
  readonly encryptionKey?: kms.Key;
  readonly logBucket: s3.Bucket;
  readonly stage: Stage;
  readonly pipeline: Pipeline;
  readonly dataProduct: DataProduct;
  readonly s3BucketProps: s3.BucketProps | undefined;
  readonly lakeType: LakeType;
  readonly dataTiers: DataTier[];
  readonly datalakeAdminRole: IRole;
  readonly datalakeDbCreatorRole: IRole;
}

export interface DataSetResult {
  readonly destinationBucketName?: string;
  readonly destinationPrefix: string;
  readonly sourceBucketName: string | undefined;
  readonly sourceKeys: string[] | undefined;
}

export interface DataTierBucketProps {
  readonly lakeType: LakeType;
  readonly pipelineName: string;
  readonly bucketName: string | undefined;
  readonly dataCatalogAccountId: string;
  readonly logBucket: Bucket;
  readonly crossAccount:boolean;
  readonly s3BucketProps: s3.BucketProps | undefined;
  readonly s3NotificationProps: S3NotificationProperties | undefined;
  readonly datalakeAdminRole: IRole;
  readonly datalakeDbCreatorRole: IRole;
  readonly tier: DataTier;
}

export class DataSet extends Construct {
  public readonly name: string;
  public readonly lakeType: LakeType;
  public readonly dropLocation?: DataTier;
  public readonly rawBucketName?: string;
  public readonly trustedBucketName?: string;
  public readonly refinedBucketName?: string;
  public readonly encryptionKey?: kms.Key;
  public readonly downloadLocations?: DataSetResult;
  public s3NotificationTopic?: sns.Topic;
  public readonly pipeline: Pipeline;
  public readonly dataProduct: DataProduct;
  public locationRegistry: lf.CfnResource[];

  constructor(scope: Construct, id: string, props: DataSetProperties) {
    super(scope, id);

    this.name = props.pipeline.name;
    this.dropLocation = props.pipeline.dataSetDropTier;
    this.pipeline = props.pipeline;
    this.dataProduct = props.dataProduct;
    this.lakeType = props.lakeType;
    this.locationRegistry = [];

    const dataCatalogAccountId = props.dataProduct.dataCatalogAccountId ?
      props.dataProduct.dataCatalogAccountId : props.dataProduct.accountId;
    const crossAccount = props.dataProduct.dataCatalogAccountId ?
      props.dataProduct.dataCatalogAccountId != props.dataProduct.accountId ? true : false : false;

    if (props.dataTiers.includes(DataTier.RAW)) {
      this.rawBucketName = buildS3BucketName({
        name: props.pipeline.name,
        accountId: this.dataProduct.accountId,
        resourceUse: 'raw',
        stage: props.stage,
      });
    }

    if (props.dataTiers.includes(DataTier.TRUSTED)) {
      this.trustedBucketName = buildS3BucketName({
        name: props.pipeline.name,
        accountId: this.dataProduct.accountId,
        resourceUse: 'trusted',
        stage: props.stage,
      });
    }

    if (props.dataTiers.includes(DataTier.REFINED)) {
      this.refinedBucketName = buildS3BucketName({
        name: props.pipeline.name,
        accountId: this.dataProduct.accountId,
        resourceUse: 'refined',
        stage: props.stage,
      });
    }

    props.dataTiers.forEach(r => {
      if (props.lakeType === LakeType.DATA_PRODUCT || props.lakeType === LakeType.DATA_PRODUCT_AND_CATALOG) {
        this.createDataTierBucket({
          bucketName: this.getDataSetBucketName(r),
          crossAccount: crossAccount,
          dataCatalogAccountId: dataCatalogAccountId,
          lakeType: props.lakeType,
          logBucket: props.logBucket,
          pipelineName: props.pipeline.name,
          s3BucketProps: props.s3BucketProps,
          s3NotificationProps: props.pipeline.s3NotificationProps,
          datalakeAdminRole: props.datalakeAdminRole,
          datalakeDbCreatorRole: props.datalakeDbCreatorRole,
          tier: r,
        });
      }

      if (dataCatalogAccountId == Aws.ACCOUNT_ID) {
        this.locationRegistry.push(this.registerDataLakeLocation(
          props.datalakeAdminRole.roleArn, props.datalakeDbCreatorRole.roleArn, this.getDataSetBucketName(r)!));
      }
    });

    // revisit this
    if (this.dropLocation) {
      this.downloadLocations = {
        destinationPrefix: props.pipeline.destinationPrefix,
        destinationBucketName: this.getDataSetBucketName(this.dropLocation),
        sourceBucketName: props.pipeline.s3Properties? props.pipeline.s3Properties.sourceBucketName! : undefined,
        sourceKeys: props.pipeline.s3Properties ? props.pipeline.s3Properties.sourceKeys! : undefined,
      };
    }
  }

  private createS3NotificationTopic(s3NotificationProps: S3NotificationProperties, bucket: s3.Bucket) {
    this.s3NotificationTopic = new sns.Topic(this, 'sns-datalake-notification-topic');
    bucket.addEventNotification(s3NotificationProps.event, new s3sns.SnsDestination(this.s3NotificationTopic), {
      prefix: s3NotificationProps.prefix,
      suffix: s3NotificationProps.suffix,
    });
  }

  private createDataTierBucket(props: DataTierBucketProps) {
    const bucket = new DataLakeBucket(this, `s3-${props.tier}-bucket-${props.pipelineName}`, {
      bucketName: props.bucketName!,
      dataCatalogAccountId: props.dataCatalogAccountId,
      logBucket: props.logBucket,
      crossAccount: props.crossAccount,
      s3Properties: props.s3BucketProps,
    }).bucket;

    if (props.s3NotificationProps) {
      this.createS3NotificationTopic(props.s3NotificationProps, bucket);
    }
  }

  private registerDataLakeLocation(dataLakeAdminRoleArn: string, dataLakeDbCreatorRoleArn: string, bucketName: string) : lf.CfnResource {
    const name = bucketName.replace(/\W/g, '');
    const dlResource = new lf.CfnResource(this, `lf-resource-${name}`, {
      resourceArn: `arn:aws:s3:::${bucketName}`,
      useServiceLinkedRole: false,
      roleArn: dataLakeDbCreatorRoleArn,
    });

    this.createDataLocationAccessPermission(`${name}-creator`, dataLakeDbCreatorRoleArn, bucketName, dlResource);
    this.createDataLocationAccessPermission(`${name}-admin`, dataLakeAdminRoleArn, bucketName, dlResource);
    return dlResource;
  }

  private createDataLocationAccessPermission(name: string, roleArn: string, bucketName: string, resource: IDependable) : lf.CfnPermissions {
    const perm = new lf.CfnPermissions(this, `datalake-creator-perm-${name}`, {
      dataLakePrincipal: {
        dataLakePrincipalIdentifier: roleArn,
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
    perm.node.addDependency(resource);
    return perm;
  }

  public getDataSetBucketName(dataTier: DataTier) : string | undefined {
    return dataTier == DataTier.RAW ? this.rawBucketName :
      dataTier == DataTier.REFINED ? this.refinedBucketName :
        dataTier == DataTier.TRUSTED ? this.trustedBucketName : undefined;
  }
}