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
    consumerIds = props["consumerAccountIds"]
    producerId = props["producerAccountId"]
    region = props["regionName"]

    glue = boto3.client('glue')

    policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
              "Sid": "AllowConsumerTagCatalogAccess",
              "Effect": "Allow",
              "Action": [
                  "glue:*"
              ],
              "Principal": {
                  "AWS": consumerIds
              },
              "Resource": [
                  f"arn:aws:glue:{region}:{producerId}:catalog",
                  f"arn:aws:glue:{region}:{producerId}:database/*",
                  f"arn:aws:glue:{region}:{producerId}:table/*/*"
              ],
              "Condition" : {
                "Bool" : {
                  "glue:EvaluatedByLakeFormationTags" : "true"
                }
              }
            },
            {
              "Sid": "AllowRamAccess",
              "Effect": "Allow",
              "Action": [
                "glue:ShareResource"
              ],
              "Principal": {"Service": [
                "ram.amazonaws.com"
              ]},
              "Resource": [
                f"arn:aws:glue:{region}:{producerId}:table/*/*",
                f"arn:aws:glue:{region}:{producerId}:database/*",
                f"arn:aws:glue:{region}:{producerId}:catalog"
              ]
            }            
        ]
    }

    policy_str = json.dumps(policy)
    glue.put_resource_policy(PolicyInJson=policy_str, EnableHybrid='TRUE')  # Hybrid needed if using policy alongside cross-account  Lake Formation.

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