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

