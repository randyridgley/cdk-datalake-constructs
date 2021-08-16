import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
from pyspark.sql import DataFrame, Row
import datetime
from awsglue import DynamicFrame

## @params: [JOB_NAME]
args = getResolvedOptions(sys.argv, ['JOB_NAME', 'SOURCE_DATABASE', 'SOURCE_TABLE', 'STREAM_BATCH_TIME_SECS', 'DESTINATION_DATABASE', 'DESTINATION_TABLE', 'DESTINATION_BUCKET'])

sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)
## @type: DataSource
## @args: [database = "local", additionalOptions = {"inferSchema":"true","startingPosition":"TRIM_HORIZON"}, stream_batch_time = 100 seconds, stream_type = Kinesis, table_name = "iot-data-kinesis"]
## @return: DataSource0
## @inputs: []
data_frame_DataSource0 = glueContext.create_data_frame.from_catalog(database = args['SOURCE_DATABASE'], table_name = args['SOURCE_TABLE'], transformation_ctx = "DataSource0", additional_options = {"inferSchema":"true","startingPosition":"TRIM_HORIZON"})
def processBatch(data_frame, batchId):
    if (data_frame.count() > 0):
        DataSource0 = DynamicFrame.fromDF(data_frame, glueContext, "from_data_frame")
        ## @type: DataSink
        ## @args: [path = "s3://PATH/parquet", connection_type = "s3", catalog_database_name = "local", updateBehavior = "UPDATE_IN_DATABASE", stream_batch_time = "100 seconds", format = "glueparquet", enableUpdateCatalog = true, catalog_table_name = "p_iot_data", transformation_ctx = "DataSink0"]
        ## @return: DataSink0
        ## @inputs: [frame = Transform0]
        now = datetime.datetime.now()
        year = now.year
        month = now.month
        day = now.day
        hour = now.hour
        minute = now.minute
        path_DataSink0 = "s3://" + args['DESTINATION_BUCKET'] + "/parquet" + "/ingest_year=" + "{:0>4}".format(str(year)) + "/ingest_month=" + "{:0>2}".format(str(month)) + "/ingest_day=" + "{:0>2}".format(str(day)) + "/ingest_hour=" + "{:0>2}".format(str(hour)) + "/"
        DataSink0 = glueContext.getSink(path = path_DataSink0, connection_type = "s3", updateBehavior = "UPDATE_IN_DATABASE", stream_batch_time = "100 seconds", format = "glueparquet", enableUpdateCatalog = True, transformation_ctx = "DataSink0")
        DataSink0.setCatalogInfo(catalogDatabase = args['DESTINATION_DATABASE'],catalogTableName = args['DESTINATION_TABLE'])
        DataSink0.setFormat("glueparquet")
        DataSink0.writeFrame(DataSource0)

glueContext.forEachBatch(frame = data_frame_DataSource0, batch_function = processBatch, options = {"windowSize": args['STREAM_BATCH_TIME_SECS'], "checkpointLocation": args["TempDir"] + "/checkpoint/"})
job.commit()