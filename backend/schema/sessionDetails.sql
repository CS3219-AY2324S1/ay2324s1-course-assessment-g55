CREATE TABLE sessionDetails (
    sessionId INT NOT NULL,
    questionId INT NOT NULL,
    PRIMARY KEY (sessionId, questionId),
    FOREIGN KEY (sessionId) REFERENCES sessions(sessionId),
    FOREIGN KEY (questionId) REFERENCES questions(questionId)
);