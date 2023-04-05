import boto3
import json
from decimal import Decimal

db = boto3.resource('dynamodb')
table = db.Table('meals')


#auto-generated from AWS with modifications
def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': json.dumps(res, default = lambda x: str(x) if isinstance(x, Decimal) else x),
        'headers': {
            'Content-Type': 'application/json',
            "access-control-allow-origin" : "*",
            "Content-type": "application/json; charset=UTF-8"
        },
    }


def lambda_handler(event, context):
    try:
        operation = event['httpMethod']
        
        if operation == "GET":
            
            meals = table.scan()

            return respond(False, meals['Items'])
            
        else:
            return respond(True, "Unsupported method: " + operation) 
    
    except Exception as err:
        return respond(True, str(err)) 