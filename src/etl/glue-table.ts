import * as glue from '@aws-cdk/aws-glue';
import * as cdk from '@aws-cdk/core';

export interface IGlueTableProperties {
  tableName: string;
  description: string;
  partitionKeys: Array<glue.CfnTable.ColumnProperty | cdk.IResolvable> | cdk.IResolvable;
  columns: Array<glue.CfnTable.ColumnProperty | cdk.IResolvable> | cdk.IResolvable;
  parameters: {[param: string]: any};
  database: glue.Database;
  s3Location: string;
  serializationLibrary: string;
  serdeParameters: {[param: string]: any};
  inputFormat: string;
  outputFormat: string;
  catalogId: string;
}

export class GlueTable extends cdk.Construct {
  readonly table: glue.CfnTable;
  readonly tableName: string;

  constructor(scope: cdk.Construct, id: string, props: IGlueTableProperties) {
    super(scope, id);

    this.tableName = props.tableName;

    this.table = new glue.CfnTable(this, `${props.tableName}-glue-table`, {
      catalogId: props.catalogId,
      databaseName: props.database.databaseName,
      tableInput: {
        description: props.description,
        name: props.tableName,
        tableType: 'EXTERNAL_TABLE',
        partitionKeys: props.partitionKeys,
        parameters: {
          EXTERNAL: true,
          has_encrypted_data: false,
          ...props.parameters,
        },
        storageDescriptor: {
          columns: props.columns,
          location: props.s3Location,
          serdeInfo: {
            serializationLibrary: props.serializationLibrary,
            parameters: {
              ...props.serdeParameters,
            },
          },
          inputFormat: props.inputFormat,
          outputFormat: props.outputFormat,
          parameters: {
            'serialization.format': '1',
          },
        },
      },
    });
  }
}