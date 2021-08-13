import { Pipeline } from './pipeline';

export interface DataProductProperties {
  readonly accountId: string;
  readonly dataCatalogAccountId?: string;
  readonly databaseName: string;
  readonly pipelines: Pipeline[];
}

export class DataProduct {
  readonly accountId: string
  readonly dataCatalogAccountId?: string;
  readonly databaseName: string
  readonly pipelines: Pipeline[]

  constructor(props: DataProductProperties) {
    this.accountId = props.accountId;
    this.dataCatalogAccountId = props.dataCatalogAccountId;
    this.databaseName = props.databaseName;
    this.pipelines = props.pipelines;
  }
}