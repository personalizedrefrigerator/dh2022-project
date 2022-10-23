from datetime import timedelta
from flask import Flask, request, jsonify, abort
import functools
import sqlite3
import secrets, hashlib

import flask_jwt_extended as jwt


# Generate a private key for use with JSON web tokens.
# This could also be generated with something like
#  openssl rand --base64
# and stored in an environment variable.
privateKey = secrets.token_urlsafe(64)

api = Flask(__name__)
api.config["JWT_SECRET_KEY"] = privateKey
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)

jwt = jwt.JWTManager(api)


# creates a database connection
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# returns all records for the given table
def find_all(table):
    conn = get_db_connection()

    try:
        rows = conn.execute(f'SELECT * FROM {table}').fetchall()

    except:
        print('Query failed.')

    conn.close()
    return [dict(row) for row in rows]

# Creates a new record in the given database table
def create_one(table, requestData):
    conn = get_db_connection()
    data = requestData.get_json()
    keys = functools.reduce(lambda a, b: f'{a}, {b}', list(data.keys()))
    
    params = '?'
    for i in range(len(list(data.keys()))-1):
        params = params + ', ?'

    try:
        conn.execute(f'INSERT INTO {table} ({keys}) VALUES ({params})', list(data.values()))
        conn.commit()

    except:
        print("Insert failed.")
        
    conn.close()
    return []

# handles get and post requests for the given database table
def handle_request(table, data):
    if request.method == 'GET':
        return find_all(table)

    if request.method == 'POST':
        create_one(table, data)
        return []

@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    conn = get_db_connection()
    users = []

    if request.method == 'GET':
        try:
            # omit login credentials
            users = conn.execute('SELECT username, firstName, lastName, email FROM user').fetchall()

        except:
            print('Query failed.')

    if request.method == 'POST':
        create_one('user', request)

    conn.close()
    return [dict(row) for row in users]

@api.route('/users/<username>')
def get_user(username):
    conn = get_db_connection()
    user = {}

    try:
        user = conn.execute('SELECT username, firstName, lastName, email FROM user WHERE username = ?', [username]).fetchone()

    except:
        print('Query failed.')

    conn.close()
    return [dict(user)]

@api.route('/posts',  methods=['GET', 'POST'])
def handle_posts():
    return handle_request('post', request)

@api.route('/tags',  methods=['GET', 'POST'])
def handle_tags():
    return handle_request('tag', request)

@api.route('/search/')
def search():
    return []



def get_salt(email: bytes) -> bytes:
    con = get_db_connection()
    res = con.execute('SELECT salt FROM user WHERE email=:email', email)
    row = res.fetchone()
    con.close()
    return row

def validate_password(email, password_hash):
    con = get_db_connection()
    res = con.execute('SELECT pass FROM user WHERE email=:email', email)
    row = res.fetchone()
    con.close()
    return row == password_hash

def user_exists(email, username):
    con = get_db_connection()
    res = con.execute('SELECT * FROM user WHERE email=:email', email)
    email_result = res.fetchone()
    res = con.execute('SELECT * FROM user WHERE username=:uname', username)
    username_result = res.fetchone()
    con.close()

    return email_result or username_result


def hash_password(password: bytes, salt: bytes) -> bytes:
    # Determining scrypt parameters: https://crypto.stackexchange.com/a/37088
    return hashlib.scrypt(password, n=4096 * 2, r=8, p=2, salt=salt)

@api.route('/new-account', methods=["POST"])
def create_account():
    email = request.json.get('email', None)
    username = request.json.get('username', None)
    first_name = request.json.get('firstName', None)
    last_name = request.json.get('lastName', None)

    salt = secrets.token_urlsafe(32)

    password_plaintext = request.json.get('password', None)
    password_hash = hash_password(password_plaintext, salt)
    password_plaintext = None

    if user_exists(email, username):
        return ({'msg': 'User already exists (email or username is taken)'}, 401)
    
    con = get_db_connection()
    cursor = con.cursor()
    cursor.execute(
        'INSERT INTO user (firstName, lastName, userName, pass, email) VALUES (?, ?, ?, ?, ?)', 
        (first_name, last_name, username, password_hash, email)
    )
    con.commit()
    con.close()

    return { 'msg': 'User created. Please sign in.' }


@api.route('/token', methods=["POST"])
def create_token():
    # Return this in the case of an invalid password/email
    bad_pass_result = ({ 'msg': 'Wrong email address or password' }, 401)

    email = request.json.get('email', None)
    salt = get_salt(email)
    if salt is None:
        print("[!] Unknown user.")
        # No salt? No account.
        return bad_pass_result

    password_hash = hash_password(request.json.get('password', None), salt)

    if not validate_password(email, password_hash):
        print("[!] Invalid password.")
        return bad_pass_result

    access_token = jwt.create_access_token(identity=email)
    return { 'access_token': access_token }

@api.route('/logout', methods=['POST'])
def logout():
    response = jsonify({ 'msg': 'logged out' })
    jwt.unset_jwt_cookies(response)
    return response

@api.after_request
def refresh_expiring_jwsts(response):
    print("to-do: Tokens should be refreshed if page is actively being used.")
    return response