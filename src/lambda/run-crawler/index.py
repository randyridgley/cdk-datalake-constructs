import boto3, json
from botocore.exceptions import ClientError
import json

def on_event(event, context):
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
    crawler = props["crawler"]
    print(crawler)
    glue = boto3.resource('glue')

    glue.start_crawler(Name=crawler)
        
    state = glue.get_crawler(Name=crawler)
    state = state["Crawler"]["State"]
    
    print("Started Crawler...")
    
    while state != "READY":
        state = glue.get_crawler(Name=crawler)
        state = state["Crawler"]["State"]
    
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