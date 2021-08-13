import boto3, json
from botocore.exceptions import ClientError
import json

def handler(event, context):
    print(event)
    request_type = event["RequestType"]
    if request_type == "Create":
        return on_create(event)
    if request_type == "Update":
        return on_update(event)
    if request_type == "Delete":
        return on_delete(event)
    raise Exception("Invalid request type: %s" % request_type)

def on_create(event):
    props = event["ResourceProperties"]
    print("create new resource with props %s" % props)
    dataSets = props["dataSets"]
    print(dataSets)
    s3 = boto3.resource('s3')

    for key in dataSets:
    #   # if not check_tag_exists(key, catalogId):
    #   print(key, '->', dataSets[key])
       values = dataSets[key]

       for file in values["sourceKeys"]:
        print(file)
        copy_source = {
          'Bucket': values["sourceBucketName"],
          'Key': file
        }
        key = file.split("/")[-1]
        s3.meta.client.copy(copy_source, values["destinationBucketName"], values["destinationPrefix"] + key)

    stack_name = props["stackName"]
    output = {}
    print(output)

    # add your create code here...
    physical_id = stack_name
    return {"PhysicalResourceId": physical_id, "Data": output}

def on_update(event):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    print("update resource %s with props %s" % (physical_id, props))
    stack_name = props["stackName"]
    region_name = props["regionName"]
    print("on_update describing %s from %s", stack_name, region_name)
    output = {}
    print(output)

    # add your create code here...
    physical_id = stack_name
    return {"PhysicalResourceId": physical_id, "Data": output}

def on_delete(event):
    physical_id = event["PhysicalResourceId"]
    print("delete resource %s" % physical_id)
    # ...