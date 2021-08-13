import { DataCatalogOwner, DataPipelineType, JDBCProperties, S3Properties, S3NotificationProperties, StreamProperties, TableProps, JobProperties, DataSetLocation } from './data-lake';

export interface IPipelineProperties {
  type: DataPipelineType;
  name: string;
  destinationPrefix: string;
  dataSetDropLocation: DataSetLocation;
  dataCatalogOwner: DataCatalogOwner;
  s3Properties?: S3Properties;
  streamProperties?: StreamProperties;
  jdbcProperties?: JDBCProperties;
  s3NotificationProps?: S3NotificationProperties;
  table? : TableProps;
  job?: JobProperties;
}

export class Pipeline {
  public readonly type: DataPipelineType
  public readonly name: string
  public readonly destinationPrefix: string
  public readonly dataSetDropLocation: DataSetLocation
  public readonly dataCatalogOwner: DataCatalogOwner
  public readonly s3Properties?: S3Properties
  public readonly streamProperties?: StreamProperties
  public readonly jdbcProperties?: JDBCProperties
  public readonly s3NotificationProps?: S3NotificationProperties
  public readonly table? : TableProps
  public readonly job?: JobProperties

  constructor(props: IPipelineProperties) {
    this.type = props.type;
    this.name = props.name;
    this.dataSetDropLocation = props.dataSetDropLocation;
    this.destinationPrefix = props.destinationPrefix;
    this.dataCatalogOwner = props.dataCatalogOwner;
    this.jdbcProperties = props.jdbcProperties ? props.jdbcProperties : undefined;
    this.job = props.job ? props.job : undefined;
    this.s3NotificationProps = props.s3NotificationProps ? props.s3NotificationProps : undefined;
    this.s3Properties = props.s3Properties ? props.s3Properties : undefined;
    this.streamProperties = props.streamProperties ? props.streamProperties : undefined;
    this.table = props.table ? props.table : undefined;
  }
}