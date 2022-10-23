from flask import Flask

api = Flask(__name__)

@api.route('/posts')
def posts():
    response_body = []
    for i in range(10):
        response_body.append({
            "id": i,
            "title": f"post-title-{i}",
            "author": f"author-{i}",
            "content": f"this is a post {i}"
        })

    return response_body

@api.route('/users')
def users():
    response_body = []

    for i in range(10):
        response_body.append({
            "userid": i,
            "firstname": f"firstname-{i}",
            "lastname": f"lastname-{i}",
            "username": f"username-{i}",
            "password": f"password-{i}",
            "email": f"email@email.com-{i}",
        })

    return response_body
