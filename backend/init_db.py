from flask import Flask
import sqlite3

api = Flask(__name__)

connection = sqlite3.connect('database.db')

with open('db.sql') as file:
    connection.executescript(file.read())

cur = connection.cursor()

cur.execute(
    "INSERT INTO user (firstName, lastName, userName, pass, email) VALUES (?, ?, ?, ?, ?)",
    ('joe', 'p', 'jojo', 'pass1234', 'joe@email.com')
)

cur.execute(
    "INSERT INTO tag (tagName, color) VALUES (?, ?)",
    ('tagName', '#00ff00')
)

cur.executemany(
    "INSERT INTO post (title, userId, content, createdDate, tagId) VALUES (?, ?, ?, ?, ?)",
    [
        ('post-1', 1, 'content-1', '2022-10-22', 1),
        ('post-2', 1, 'content-2', '2022-10-22', 1),
        ('post-3', 1, 'content-3', '2022-10-22', 1),
        ('post-4', 1, 'content-4', '2022-10-22', 1)
    ]
)

connection.commit()
connection.close()
