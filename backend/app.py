from datetime import timedelta
from flask import Flask, request, jsonify, abort
import functools
import sqlite3
import secrets, hashlib, base64

import flask_jwt_extended as jwtlib


# Generate a private key for use with JSON web tokens.
# This could also be generated with something like
#  openssl rand --base64
# and stored in an environment variable.
privateKey = secrets.token_urlsafe(64)

api = Flask(__name__)
api.config["JWT_SECRET_KEY"] = privateKey
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=5)

jwt = jwtlib.JWTManager(api)


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
    data = requestData.get_json()
    return create_one_from_data(table, data)

def create_one_from_data(table, data):
    conn = get_db_connection()
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
    return dict(user)

@api.route('/posts', methods=['GET'])
def handle_posts():
    posts = find_all('post')
    posts.reverse()
    return posts

@api.route('/posts/<postId>/tag')
def get_tag_name(postId):
    conn = get_db_connection()
    tag = {}

    try:
        tag = conn.execute('SELECT * FROM tag JOIN post ON tag.tagId = post.tagId WHERE post.postId = ?', [postId]).fetchone()
    except:
        print('Query failed.')

    conn.close()
    return dict(tag)

@api.route('/post/<id>', methods=['GET'])
def get_post(id: int):
    print('ID', id)
    conn = get_db_connection()
    res = conn.execute('SELECT * from post WHERE postId=:id', {"id": id}).fetchone()
    conn.close()
    return dict(res)


@api.route('/create-post', methods=['POST'])
@jwtlib.jwt_required()
def create_post():
    email = jwtlib.get_jwt_identity()
    assert user_exists(email)

    ## TODO: Link email to data
    data = request.get_json()
    return create_one_from_data('post', data)

@api.route('/tags',  methods=['GET', 'POST'])
def handle_tags():
    return handle_request('tag', request)

@api.route('/search/')
def search():
    return []

@api.route('/my-profile')
@jwtlib.jwt_required()
def get_userdata():
    print('getting userdata...')
    email = jwtlib.get_jwt_identity()
    print('user: ', email)

    conn = get_db_connection()
    res = conn.execute('SELECT username, firstName, lastName, email FROM user WHERE email = ?', [email]).fetchone()
    return dict(res)


def get_salt(email: str) -> str:
    con = get_db_connection()
    res = con.execute('SELECT salt FROM user WHERE email=:email', { "email": email })
    row = dict(res.fetchone())['salt']
    con.close()
    return row

def validate_password(email, password_hash):
    con = get_db_connection()
    res = con.execute('SELECT pass FROM user WHERE email=:email', { "email": email })
    row = dict(res.fetchone())['pass']
    con.close()
    return row == password_hash

def user_exists(email, username=None):
    con = get_db_connection()
    res = con.execute('SELECT * FROM user WHERE email=:email', { "email": email })
    email_result = res.fetchone()
    username_result = None
    if username:
        res = con.execute('SELECT * FROM user WHERE username=:uname', { "uname": username })
        username_result = res.fetchone()
    con.close()

    return email_result or username_result

def hash_password(password: str, salt: str) -> str:
    # Determining scrypt parameters: https://crypto.stackexchange.com/a/37088
    try:
        hashed = hashlib.scrypt(password.encode('utf-8'), n=4096 * 2, r=8, p=2, salt=salt.encode('utf-8'))
        return base64.b64encode(hashed)
    except:
        print('!!!!!! USING BAD HASH METHOD !!!!!!')
        return hashlib.sha512(password.encode('utf-8') + salt.encode('utf-8')).hexdigest()

@api.route('/new-account', methods=["POST"])
def create_account():
    email = request.json.get('email', None)
    username = request.json.get('username', None)
    first_name = request.json.get('firstname', None)
    last_name = request.json.get('lastname', None)

    salt = secrets.token_urlsafe(32)

    password_plaintext: str = request.json.get('password', None)
    password_hash = hash_password(password_plaintext, salt)
    password_plaintext = None

    if user_exists(email, username):
        return ({'msg': 'User already exists (email or username is taken). Please try logging in.'}, 401)
    
    con = get_db_connection()
    cursor = con.cursor()
    cursor.execute(
        'INSERT INTO user (firstName, lastName, userName, pass, salt, email) VALUES (?, ?, ?, ?, ?, ?)', 
        (first_name, last_name, username, password_hash, salt, email)
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

    access_token = jwtlib.create_access_token(identity=email)
    return { 'access_token': access_token, 'msg': 'Success!' }

@api.route('/logout', methods=['POST'])
def logout():
    response = jsonify({ 'msg': 'logged out' })
    jwtlib.unset_jwt_cookies(response)
    return response

@api.after_request
def refresh_expiring_jwsts(response):
    print("to-do: Tokens should be refreshed if page is actively being used.")
    return response