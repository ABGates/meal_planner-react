import boto3
import json
from jsonschema import validate, ValidationError
import datetime

db = boto3.resource('dynamodb')
table = db.Table('date-meals')


#auto-generated from AWS with modifications
def respond(err, res = None):
    return {
        'statusCode': '400' if err else '200',
        'body': json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
        },
    }


def lambda_handler(event, context):
    try:
        operation = event['httpMethod']
        
        if operation == "POST":
            payload = json.loads(event['body'])
            sanitize(payload)
            
            return respond(False, table.put_item( Item = payload ))
            
        else:
            return respond(True, "Unsupported method: " + operation) 
    
    except Exception as err:
        return respond(True, str(err)) 


#sanitizes input for the database
def sanitize(payload):
    schema = {
        "title": "Date - Meal",
        "description": "An object that associates a meal with a date",
        "type": "object",
        "properties": {
            "plan_date": {
                "type": "string"
            },
            "basal": {
                "type": "string"
            },
            "title": {
                "type": "string"
            }
        },
        "required": ["basal", "title", "plan_date"]
    }

    try:
        validate(instance = payload, schema = schema)
        sanitize_date(payload.get('plan_date'))
    
    except ValidationError:
        raise ValueError("Schema Sanitization Failed")
        
    except ValueError:
        raise ValueError("Incorrect data format, should be YYYY-MM-DD")
        

#https://stackoverflow.com/questions/16870663/how-do-i-validate-a-date-string-format-in-python
def sanitize_date(date):
    datetime.date.fromisoformat(date)