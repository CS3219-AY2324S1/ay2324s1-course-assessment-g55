# Script to add random data to a database

from sqlalchemy import create_engine, insert
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import text
import random

users = list(range(1, 28))
questions = list(range(1, 14))
languages = ['C++', 'Python', 'Java']
attempted = [set() for i in range(28)]

sessions = 'sessions'
sessionDetails = 'sessiondetails'
userHistory = 'userhistory'

SQLALCHEMY_DATABASE_URL = 'postgresql://postgres@localhost:5432/Testing'
engine = create_engine(SQLALCHEMY_DATABASE_URL)
Session = sessionmaker(engine)

def createRandomSession():
    # Choose 2 random users
    user1 = random.choice(users)
    user2 = random.choice([i for i in users if i != user1])

    # Choose 2 random questions
    unattempted = [i for i in questions if i not in attempted[user1] and i not in attempted[user2]]
    if len(unattempted) <= 1:
        return
    question1 = random.choice(unattempted)
    question2 = random.choice([i for i in unattempted if i != question1])
    language = random.choice(languages)

    attempted[user1].add(question1)
    attempted[user1].add(question2)
    attempted[user2].add(question1)
    attempted[user2].add(question2)

    # Insert into session
    sessionString = f"INSERT INTO {sessions} (user1id, user2id, codelanguage) VALUES ({user1}, {user2}, '{language}');"

    # Insert into sessiondetails
    detail1 = f"INSERT INTO {sessionDetails} (sessionid, questionid) VALUES (currval('sessions_sessionid_seq'), {question1});"
    detail2 = f"INSERT INTO {sessionDetails} (sessionid, questionid) VALUES (currval('sessions_sessionid_seq'), {question2});"

    # Insert into userhistory
    s1 = f"INSERT INTO {userHistory} (userid, questionid, codelanguage) VALUES ({user1}, {question1}, '{language}');"
    s2 = f"INSERT INTO {userHistory} (userid, questionid, codelanguage) VALUES ({user1}, {question2}, '{language}');"
    s3 = f"INSERT INTO {userHistory} (userid, questionid, codelanguage) VALUES ({user2}, {question1}, '{language}');"   
    s4 = f"INSERT INTO {userHistory} (userid, questionid, codelanguage) VALUES ({user2}, {question2}, '{language}');"   

    with Session() as s:
        s.execute(text(sessionString))
        s.execute(text(detail1))
        s.execute(text(detail2))
        s.execute(text(s1))
        s.execute(text(s2))
        s.execute(text(s3))
        s.execute(text(s4))
        s.commit()



if __name__ == '__main__':
    for i in range(100):
        createRandomSession()
