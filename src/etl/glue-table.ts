import { IResolvable } from 'aws-cdk-lib';
import * as glue from 'aws-cdk-lib/aws-glue';
import { Construct } from 'constructs';

export interface IGlueTableProperties {
  tableName: string;
  description: string;
  partitionKeys: Array<glue.CfnTable.ColumnProperty | IResolvable> | IResolvable;
  columns: Array<glue.CfnTable.ColumnProperty | IResolvable> | IResolvable;
  parameters: {[param: string]: any};
  databaseName: string;
  s3Location: string;
  serializationLibrary: string;
  serdeParameters: {[param: string]: any};
  inputFormat: string;
  outputFormat: string;
  catalogId: string;
}

export class GlueTable extends Construct {
  readonly table: glue.CfnTable;
  readonly tableName: string;

  constructor(scope: Construct, id: string, props: IGlueTableProperties) {
    super(scope, id);

    this.tableName = props.tableName;

    this.table = new glue.CfnTable(this, `${props.tableName}-glue-table`, {
      catalogId: props.catalogId,
      databaseName: props.databaseName,
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