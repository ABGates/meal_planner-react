import boto3
import json
import random

s3 = boto3.resource('s3')
bucket = 'mp-personalize'


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
        file = s3.Object(bucket, 'batch-2-output/mp-rec-predict.json.out')
        it = file.get()['Body'].iter_lines()
        
        all_recs = json.loads(next(it).decode('utf-8'))['output']['recommendedItems']
        
        recs = random.sample(all_recs, 7)
        
        rec_list = []
        
        for rec in recs:
            split = rec.split(' - ')
            rec_list.append((split[0],split[1]))
        
        return(False, rec_list)

    
    except Exception as err:
        return respond(True, str(err)) 