CREATE TYPE DIFFICULTIES AS ENUM ('easy', 'medium', 'hard');

CREATE TABLE questions {
    questionId SERIAL PRIMARY KEY,
    questionTitle VARCHAR(256) NOT NULL UNIQUE,
    categories VARCHAR(256)[] NOT NULL,
    difficulty DIFFICULTIES NOT NULL,
    attempts INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}