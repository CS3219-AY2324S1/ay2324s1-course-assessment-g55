# from sqlalchemy import create_engine
from sqlalchemy import create_engine, text
from sqlalchemy.exc import ProgrammingError

# Define your database connection URL
SQLALCHEMY_DATABASE_URL = 'postgresql://postgres@localhost:5432/Testing'

def run_sql_script():
    # Create an SQLAlchemy engine
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

    # SQL script containing DDL statements
    sql_script = """
DROP TABLE IF EXISTS adminUsers;
DROP TABLE IF EXISTS sessionDetails;
DROP TABLE IF EXISTS userHistory;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS difficulties;
DROP TYPE IF EXISTS rating;


CREATE TYPE rating AS ENUM ('good', 'bad');

CREATE TYPE difficulties AS ENUM ('easy', 'medium', 'hard');

CREATE TABLE users (
    userId INT PRIMARY KEY,
    username VARCHAR(256) NOT NULL,
    score INT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
    sessionId SERIAL PRIMARY KEY,
    user1Id INT NOT NULL,
    user2Id INT NOT NULL,
    user1Rating rating,
    user2Rating rating,
    codeLanguage VARCHAR(256) NOT NULL,
    startedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    endedAt TIMESTAMP,
    FOREIGN KEY (user1Id) REFERENCES users(userId),
    FOREIGN KEY (user2Id) REFERENCES users(userId)
);

CREATE TABLE questions (
    questionId SERIAL PRIMARY KEY,
    questionTitle VARCHAR(256) NOT NULL UNIQUE,
    categories VARCHAR(256)[] NOT NULL,
    difficulty difficulties NOT NULL,
    attempts INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE userHistory (
    userId INT NOT NULL,
    questionId INT NOT NULL,
    codeLanguage VARCHAR(256) NOT NULL,
    attemptedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userId, questionId),
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (questionId) REFERENCES questions(questionId)
);

CREATE TABLE sessionDetails (
    sessionId INT NOT NULL,
    questionId INT NOT NULL,
    PRIMARY KEY (sessionId, questionId),
    FOREIGN KEY (sessionId) REFERENCES sessions(sessionId),
    FOREIGN KEY (questionId) REFERENCES questions(questionId)
);

CREATE TABLE adminUsers (
    userid INT PRIMARY KEY,
    FOREIGN KEY (userId) REFERENCES users(userId)
);

INSERT INTO users (userid, username)
VALUES 
(1, 'John'),
(2, 'Jane'),
(3, 'Bob'),
(4, 'Alice'),
(5, 'Joe'),
(6, 'Mary'),
(7, 'Bill'),
(8, 'Kate'),
(9, 'Mike'),
(10, 'Sue'),
(11, 'Tom'),
(12, 'Ann'),
(13, 'Tim'),
(14, 'Sara'),
(15, 'Sam'),
(16, 'Beth'),
(17, 'Dan'),
(18, 'Kim'),
(19, 'Ron'),
(20, 'Liz'),
(21, 'Darren'),
(22, 'Timothy123'),
(23, 'Haoze'),
(24, 'Brian'),
(25, 'Ming Wei'),
(26, 'Francis'),
(27, 'Ai Lin');

INSERT INTO adminUsers (userid)
VALUES
(23),
(24),
(25),
(26),
(27);

INSERT INTO questions (questionTitle, categories, difficulty)
VALUES
('Reverse a String', Array ['Strings', 'Algorithms'], 'easy'),
('Roman to Integer', Array ['Data Structures', 'Algorithms'], 'easy'),
('Add Binary', Array ['Bit Manipulation', 'Algorithms'], 'easy'),
('Fibonacci Number', Array ['Recursion', 'Algorithms'], 'easy'),
('Implement Stack using Queues', Array ['Data Structures'], 'easy'),
('Repeated DNA Sequences', Array ['Algorithms', 'Bit Manipulation'], 'medium'),
('Course Schedule', Array ['Data Structures', 'Algorithms'], 'medium'),
('LRU Cache Design', Array ['Data Structures'], 'medium'),
('Longest Common Subsequence', Array ['Strings', 'Algorithms'], 'medium'),
('Airplane Seat Assignment Probability', Array ['Brainteaser'], 'medium'),
('Sliding Window Maximum', Array ['Arrays', 'Algorithms'], 'hard'),
('Wildcard Matching', Array ['Strings', 'Algorithms'], 'hard'),
('Chalkboard XOR Game', Array ['Brainteaser', 'Bit Manipulation'], 'hard');


    """

    # Use SQLAlchemy's text method to execute the SQL script
    try:
        with engine.connect() as connection:
            # connection.execute(text(sql_script))
            # print("DDL statements executed successfully.")
            with connection.begin() as trans:
                connection.execute(text(sql_script))
                trans.commit()
                print("DDL statements executed successfully.")

        # Now, let's add a SELECT statement to retrieve data from the "questions" table
        select_query = """
        SELECT * FROM questions;
        """

        with engine.connect() as connection:
            result = connection.execute(text(select_query))
            for row in result:
                print(row)
            print("SELECT statement executed successfully.")
    except Exception as e:
        print("Error:", str(e))



if __name__ == "__main__":
    run_sql_script()
