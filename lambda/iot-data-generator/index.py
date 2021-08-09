import json
import logging
import os
import boto3
import random 
import datetime

def get_random_data():
    current_temperature = round(10 + random.random() * 170, 2)
    if current_temperature > 160:
        status = "ERROR"
    elif current_temperature > 140 or random.randrange(1, 100) > 80:
        status = random.choice(["WARNING","ERROR"])
    else:
        status = "OK"
    return {
        'sensor_id': random.randrange(1, 100),
        'current_temperature': current_temperature,
        'status': status,
        'event_time': datetime.datetime.now().isoformat()
    }


def send_data(stream_name, kinesis_client):
    for lp in range(1000):
        data = get_random_data()
        partition_key = str(data["sensor_id"])
        print(data)
        kinesis_client.put_record(
            StreamName=stream_name,
            Data=json.dumps(data),
            PartitionKey=partition_key)


def handler(event, context):
  kinesis_client = boto3.client('kinesis')
  stream = os.getenv('KINESIS_STREAM')
  send_data(stream, kinesis_client)