import { Pipeline } from './pipeline';

export interface DataProductProperties {
  readonly accountId: string;
  readonly databaseName: string;
  readonly pipelines: Pipeline[];
}

export class DataProduct {
  readonly accountId: string
  readonly databaseName: string
  readonly pipelines: Pipeline[]

  constructor(props: DataProductProperties) {
    this.accountId = props.accountId;
    this.databaseName = props.databaseName;
    this.pipelines = props.pipelines;
  }
}