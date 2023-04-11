import logging
import base64
import boto3
import datetime
import os
import json

logger = logging.getLogger()
logger.setLevel(logging.INFO)

s3_client = boto3.client('s3')

response  = {
    'statusCode': 200,
    'headers': {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers':'*'
    },
    'body': ''
}

def handler(event, context):
    file_name = datetime.datetime.now().strftime('%Y-%m-%dT%H-%M-%S')+'.jpg'
    print("---------------HELLLLOOOO------------------------");
    print(json.dumps(event))
    file_content = base64.b64decode(event['body'])
    
    BUCKET_NAME = os.environ['BUCKET_NAME']

    try:
        s3_response = s3_client.put_object(Bucket=BUCKET_NAME, Key=file_name, Body=file_content, ContentType='image/jpeg')   
        logger.info('S3 Response: {}'.format(s3_response))
        response['body'] = 'Your file has been uploaded'

        return response

    except Exception as e:
        raise IOError(e)    