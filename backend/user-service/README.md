To run:

You will need to create an .env file with the following variables
```bash
PORT=<port number>
DATABASE_URL=<mysql connection string>
```

#### Installation
Run `npm i` to install the required node modules

#### Run
Run `npm run dev` to start user-service

#### Clear and repopulate the database:
```bash
node scripts/populateDb.js

```

### API endpoints

1. List All Users
Endpoint: /
HTTP Method: GET
Description: Retrieve a list of users.

2. Get User
Endpoint: /{userId}
HTTP Method: GET
Description: Retrieve a user by their ID.

3. Create User
Endpoint: /
HTTP Method: POST
Description: Create a new user.

4. Update User
Endpoint: /{userId}
HTTP Method: PUT
Description: Update an existing user by their ID.

5. Delete User
Endpoint: /{userId}
HTTP Method: DELETE
Description: Delete a user by their ID.