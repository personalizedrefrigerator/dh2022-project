from flask import Flask
import sqlite3

api = Flask(__name__)

connection = sqlite3.connect('database.db')

with open('db.sql') as file:
    connection.executescript(file.read())

cur = connection.cursor()

cur.executemany(
    "INSERT INTO user (firstName, lastName, userName, pass, email) VALUES (?, ?, ?, ?, ?)",
    [
        ('Joe', 'P', 'joep', 'pass1234', 'joe@email.com'),
        ('Mark', 'P', 'markp', 'pass1234', 'joe@email.com'),
        ('Ayush', 'A', 'ayusha', 'pass1234', 'joe@email.com'),
        ('Henry', 'H', 'henryh', 'pass1234', 'joe@email.com'),
        ('Mary', 'S', 'marys', 'pass1234', 'joe@email.com'),
        ('Suzie', 'Q', 'suzieq', 'pass1234', 'joe@email.com')
    ]
)

cur.executemany(
    "INSERT INTO tag (tagName, color) VALUES (?, ?)",
    [
        ('UW', '#ff0000'),
        ('Seattle', '#00ff00'),
        ('Washington', '#0000ff'),
        ('USA', '#ff00ff'),
        ('Safety', '#888888')
    ]
)

cur.executemany(
    "INSERT INTO post (title, userId, content, createdDate, tagId) VALUES (?, ?, ?, ?, ?)",
    [
        ('Change UW mascot to a lion', 1, 'I hate dogs, let\'s make the husky a lion!', '2022-10-22', 1),
        ('We need more parks in Seattle', 2, 'We need more greenery in the city. We should add more parks.', '2022-10-22', 2),
        ('Change Washington State to Lincoln', 3, 'George Washington sucks. Abe Lincoln was way cooler. Let\'s rename our state.', '2022-10-22', 3),
        ('Implement rank choice voting for federal elections', 4, 'Rank choice voting is more fair.', '2022-10-22', 4),
        ('Add more street lights in the Maple Leaf neighborhood', 4, 'It gets really dark at night in Maple Leaf area. It would be great to have more light.', '2022-10-22', 5)
    ]
)

connection.commit()
connection.close()
