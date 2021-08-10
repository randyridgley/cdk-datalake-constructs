import boto3, json
from botocore.exceptions import ClientError

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

def check_tag_exists(tag, catalog_id):
   session = boto3.session.Session()
   lf_client = session.client('lakeformation')
   try:
      response = lf_client.get_lf_tag(TagKey=tag, CatalogId=catalog_id)
      return response
   except ClientError as e:
      raise Exception( "boto3 client error in check_tag_exists: " + e.__str__())
   except Exception as e:
      raise Exception( "Unexpected error in check_tag_exists: " + e.__str__())

def create_tag(tag, values, catalog_id):
   session = boto3.session.Session()
   lf_client = session.client('lakeformation')
   try:
      response = lf_client.create_lf_tag(TagKey=tag, TagValues=values, CatalogId=catalog_id)
      return response
   except ClientError as e:
      raise Exception( "boto3 client error in create_tag: " + e.__str__())
   except Exception as e:
      raise Exception( "Unexpected error in create_tag: " + e.__str__())

def delete_tag(tag, catalog_id):
   session = boto3.session.Session()
   lf_client = session.client('lakeformation')
   try:
      response = lf_client.delete_lf_tag(TagKey=tag, CatalogId=catalog_id)
      return response
   except ClientError as e:
      raise Exception( "boto3 client error in delete_tag: " + e.__str__())
   except Exception as e:
      raise Exception( "Unexpected error in delete_tag: " + e.__str__())

def on_create(event):
    props = event["ResourceProperties"]
    print("create new resource with props %s" % props)
    tags = props["policyTags"]
    catalogId = props["catalogId"]
    print(tags)
    for key in tags:
      # if not check_tag_exists(key, catalogId):
      print(key, '->', tags[key])
      values = tags[key].split (",")
      create_tag(key, values, catalogId)

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
    props = event["ResourceProperties"]
    print("delete resource %s" % physical_id)
    tags = props["policyTags"]
    catalogId = props["catalogId"]

    for key in tags:
      # if not check_tag_exists(key, catalogId):
      print(key, '->', tags[key])
      values = tags[key].split (",")
      delete_tag(key, catalogId)
    # ...