CREATE TABLE adminUsers (
    userId PRIMARY KEY,
    FOREIGN KEY (userId) REFERENCES users(userId)
);