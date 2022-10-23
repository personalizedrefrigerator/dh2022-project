from flask import Flask
import sqlite3

api = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_all_rows(table):
    conn = get_db_connection()
    rows = conn.execute(f'SELECT * FROM {table}').fetchall()
    conn.close
    return [dict(row) for row in rows]

@api.route('/users')
def get_users():
    return get_all_rows('user')

@api.route('/posts')
def get_posts():
    return get_all_rows('post')

@api.route('/tags')
def get_tags():
    return get_all_rows('tag')

@api.route('/search')
def get_search():
    return []
