CREATE TABLE adminUsers (
    userid INT PRIMARY KEY,
    FOREIGN KEY (userId) REFERENCES users(userId)
);