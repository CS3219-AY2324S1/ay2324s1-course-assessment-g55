import os
import sys
import boto3

# Script to add question data to dynamodb
questionNumbers = list(range(1, 14))
currentDirectory = os.path.dirname(os.path.realpath(__file__))
questionsDirectory = os.path.join(currentDirectory, 'questions')
questionsData = {}

questionTable = "questionDetails"

publicKey = os.environ.get('AWS_PREPPAL_PUBLIC_KEY')
privateKey = os.environ.get('AWS_PREPPAL_PRIVATE_KEY')


for i in questionNumbers:
    filePath = os.path.join(questionsDirectory, f'{i}.txt')
    with open(filePath, 'r') as f:
        question = f.read()
        questionsData[i] = question

session = boto3.client('dynamodb',
    aws_access_key_id=publicKey,
    aws_secret_access_key=privateKey,
    region_name='ap-southeast-1'
)

for id, description in questionsData.items():
    session.put_item(
        TableName=questionTable,
        Item={
            'questionId': {"N" : str(id)},
            'description': {"S" : description},
        }
    )
