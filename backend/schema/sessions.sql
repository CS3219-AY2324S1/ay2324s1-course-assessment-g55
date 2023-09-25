CREATE TYPE rating AS ENUM ('good', 'bad');

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
