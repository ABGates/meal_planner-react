import boto3
import json
from jsonschema import validate, ValidationError

db = boto3.resource('dynamodb')
table = db.Table('meals')


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
    meal_schema = {
        "title": "Meal",
        "description": "A meal object with name(title), calories, complexity, ingredients, macros, taste and vegetarian",
        "type": "object",
        "properties": {
            "basal": {
                "type": "string"
            },
            "title": {
                "type": "string"
            },
            "calories": {
                "type": "integer",
                "minimum": 0
            },
            "complexity": {
                "type": "string",
                "enum": ["easy", "normal", "hard"]
            },
            "ingredients": {
                "type": "array",
                "items": {
                    "type": "string"
                }
            },
            "macros": {
                "type": "object",
                "properties": {
                    "carbs": {
                        "type": "number",
                        "minimum": 0
                    },
                    "fats": {
                        "type": "number",
                        "minimum": 0
                    },
                    "proteins": {
                        "type": "number",
                        "minimum": 0
                    }
                },
                "required": ["carbs", "fats", "proteins"]
            },
            "taste": {
                "type": "integer",
                "minimum": 1,
                "maximum": 5
            },
            "vegetarian": {
                "type": "boolean"
            }
        },
        "required": ["basal", "title", "calories", "complexity", "ingredients", "macros", "taste", "vegetarian"]
    }

    try:
        validate(instance = payload, schema = meal_schema)
    
    except ValidationError:
        raise ValueError("Schema Sanitization Failed")

