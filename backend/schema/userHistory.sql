CREATE TABLE userHistory (
    userId INT NOT NULL,
    questionId INT NOT NULL,
    codeLanguage VARCHAR(256) NOT NULL,
    attemptedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userId, questionId),
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (questionId) REFERENCES questions(questionId)
);