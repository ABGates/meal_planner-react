import boto3
import json

sns = boto3.client('sns')

secret_header = "obfuscated"


def lambda_handler(event, context):
    try:
        payload = json.loads(event['body'])
        
        if not payload.get("headers") == secret_header:
            raise Exception("Unsecure Source")
        
        grocery_list = payload.get("grocery_list")
        
        print(grocery_list)
        
        response = sns.publish(
            TopicArn = 'arn:aws:sns:us-east-1:027705044809:grocery-list',
            Message = grocery_list,
            Subject='Grocery List'
        )


    except Exception as err:
        return respond(True, str(err)) 
    
    
def respond(err, res = None):
    return {
        'statusCode': '400' if err else '200',
        'body': json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
            "access-control-allow-origin" : "*",
            "Content-type": "application/json; charset=UTF-8"
        },
    }