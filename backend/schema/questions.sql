CREATE TYPE difficulties AS ENUM ('easy', 'medium', 'hard');

CREATE TABLE questions (
    questionId SERIAL PRIMARY KEY,
    questionTitle VARCHAR(256) NOT NULL UNIQUE,
    categories VARCHAR(256)[] NOT NULL,
    difficulty difficulties NOT NULL,
    attempts INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
