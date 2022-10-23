from flask import Flask
import sqlite3

api = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@api.route('/users')
def get_users():
    conn = get_db_connection()
    users = conn.execute('SELECT * FROM user').fetchall()
    conn.close()
    return users

@api.route('/posts')
def get_posts():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM post').fetchall()
    conn.close()
    return posts

@api.route('/tags')
def get_tags():
    conn = get_db_connection()
    tags = conn.execute('SELECT * FROM tag').fetchall()
    conn.close()
    return tags
