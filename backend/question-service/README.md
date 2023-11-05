To run:

You will need to create an .env file with the following variables
```bash
POSTGRES_URL=<postgres connection string>
AWS_PREPPAL_PUBLIC_KEY=<dynamodb access key>
AWS_PREPPAL_PRIVATE_KEY=<dynamodb secret key>

```

#### Build the image:
```bash
docker build -t question-service .

```
#### Run the container (-d to run in background):
```bash
docker run -d -p 4444:3333 --env-file .env question-service     # 4444 is port on host, 3333 is port on docker

```
#### Clear and repopulate the database:
```bash
python seed.py
python run-sql.py

```

### API endpoints

1. List Questions
Endpoint: /questions
HTTP Method: GET
Description: Retrieve a list of questions.

2. Get Question
Endpoint: /questions/{questionId}
HTTP Method: GET
Description: Retrieve a question by its ID.

3. Create Question
Endpoint: /questions
HTTP Method: POST
Description: Create a new question.

4. Update Question
Endpoint: /questions/{questionId}
HTTP Method: PUT
Description: Update an existing question by its ID.

5. Delete Question
Endpoint: /questions/{questionId}
HTTP Method: DELETE
Description: Delete a question by its ID."
