export enum Stage {
  ALPHA = 'alpha',
  BETA = 'beta',
  GAMMA = 'gamma',
  PROD = 'prod',
}

export enum Permissions {
  ALTER = 'ALTER',
  CREATE_DATABASE = 'CREATE_DATABASE',
  CREATE_TABLE = 'CREATE_TABLE',
  DATA_LOCATION_ACCESS = 'DATA_LOCATION_ACCESS',
  DELETE = 'DELETE',
  DESCRIBE = 'DESCRIBE',
  DROP = 'DROP',
  INSERT = 'INSERT',
  SELECT = 'SELECT',
  ASSOCIATE = 'ASSOCIATE',
}

export enum LakeKind {
  DATA_PRODUCT = 'DATA_PRODUCT',
  CENTRAL_CATALOG = 'CENTRAL_CATALOG',
  CONSUMER = 'CONSUMER',
  DATA_PRODUCT_AND_CATALOG = 'DATA_PRODUCT_AND_CATALOG',
}

export enum DataTier {
  RAW = 'raw',
  REFINED = 'refined',
  TRUSTED = 'trusted',
}

export enum DataPipelineType {
  STREAM = 'stream',
  JDBC = 'jdbc',
  S3 = 's3'
}
