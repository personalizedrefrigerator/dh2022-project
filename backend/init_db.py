from flask import Flask
import sqlite3

connection = sqlite3.connect('database.db')

with open('db.sql') as file:
    connection.executescript(file.read())

cur = connection.cursor()

cur.executemany(
    "INSERT INTO user (firstName, lastName, userName, pass, salt, email) VALUES (?, ?, ?, ?, ?, ?)",
    [
        ('Joe', 'P', 'joep', 'hashedpass1234', '123', 'joe1@email.com'),
        ('Mark', 'P', 'markp', 'hashedpass12345', '456', 'joe2@email.com'),
        ('Ayush', 'A', 'ayusha', 'hashedpass1234', 'saltforpassword', 'joe3@email.com'),
        ('Henry', 'H', 'henryh', 'hashed1234', 'salt :(', 'joe4@email.com'),
        ('Mary', 'S', 'marys', 'hashedpass1234', 'salt :)', 'joe5@email.com'),
        ('Suzie', 'Q', 'suzieq', 'hashedpass1234', 'salt3', 'joe6@email.com')
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
        ('Change UW mascot to a lion', 1, 'I hate dogs, let\'s make the husky a lion!', '2022-01-22', 1),
        ('We need more parks in Seattle', 2, 'We need more greenery in the city. We should add more parks.', '2022-02-22', 2),
        ('Change Washington State to Lincoln', 3, 'George Washington sucks. Abe Lincoln was way cooler. Let\'s rename our state.', '2022-03-22', 3),
        ('Implement rank choice voting for federal elections', 4, 'Rank choice voting is more fair.', '2022-04-22', 4),
        ('Add more street lights in the Maple Leaf neighborhood', 1, 'It gets really dark at night in Maple Leaf area. It would be great to have more light.', '2022-05-22', 5),
        ('Install stop sign at intersection of Main and 32nd street', 2, 'There are a lot of traffic accidents on Main and 32nd street intersection. A stop sign would solve that problem.', '2022-06-22', 2),
        ('Add hand rails to the staircase on 4th street.', 3, 'When it rains, the stair are very slippery and people often fall.', '2022-06-22', 5),
        ('Get rid of the geese at UW', 4, 'They are so annoying. Everyone hates them. Let\'s gt rid of them!', '2022-06-22', 2)
    ]
)

connection.commit()
connection.close()
