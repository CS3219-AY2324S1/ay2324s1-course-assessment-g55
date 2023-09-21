CREATE TABLE sessions (
    sessionId SERIAL PRIMARY KEY,
    user1Id VARCHAR(256) NOT NULL,
    user2Id VARCHAR(256) NOT NULL,
    codeLanguage VARCHAR(256) NOT NULL,
    startedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    endedAt TIMESTAMP,
    FOREIGN KEY (user1Id) REFERENCES users(userId),
    FOREIGN KEY (user2Id) REFERENCES users(userId)
);