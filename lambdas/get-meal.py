import boto3
import json
from decimal import Decimal

db = boto3.resource('dynamodb')
table = db.Table('meals')


#auto-generated from AWS with modifications
def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': json.dumps(res, default=lambda x: str(x) if isinstance(x, Decimal) else x),
        'headers': {
            'Content-Type': 'application/json',
        },
    }


def lambda_handler(event, context):
    try:
        payload = json.loads(event['body'])
        
        meal = table.get_item(Key=payload)

        return respond(False, meal['Item'])
    
    except Exception as e:
        return respond(True, e) 