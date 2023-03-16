import boto3
import json
from decimal import Decimal

db = boto3.resource('dynamodb')
date_table = db.Table('date-meals')
meal_table = db.Table('meals')

#auto-generated from AWS with modifications
def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': json.dumps(res, default = lambda x: str(x) if isinstance(x, Decimal) else x),
        'headers': {
            'Content-Type': 'application/json',
        },
    }


def lambda_handler(event, context):
    try:
        proj = "basal,title"
        date = json.loads(event['body'])
        #print("date:",date)
        meal_key = date_table.get_item(Key = date, ProjectionExpression = proj)
        #print("meal_key:",meal_key['Item'])

        meal = meal_table.get_item(Key = meal_key['Item'])

        return respond(False, meal['Item'])
    
    except Exception as err:
        return respond(True, str(err)) 