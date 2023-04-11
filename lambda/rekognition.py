import json
import boto3

client = boto3.client("rekognition")

def lambda_handler(event, context):
    bucket_name='term-project-bucket'
    bodyEvent = json.loads(event['body'])
    bodyUrl = bodyEvent['url']
    imageUrl = bodyUrl
    imageName = getFileName(imageUrl)
    response = client.detect_labels(Image={"S3Object": {"Bucket": bucket_name, "Name": imageName}},MaxLabels = 20, MinConfidence = 80)
    # response = client.detect_labels({"Image": imageUrl},MaxLabels = 10, MinConfidence = 80)
    print (response)
    
    return {
        "body": response
    }

def getFileName(url):
    url = url.split("amazonaws.com/")
    url = str(url[1])
    url = url.split("?")
    return url[0]
    