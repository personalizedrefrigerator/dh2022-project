from flask import Flask

api = Flask(__name__)

@api.route('/users')
def tags_route():
    response_body = [{
        "content": "Amazing",
        "color": "black",
        "id": "1234"
    }]
    return response_body

@api.route('/posts')
def posts_route():
    response_body = [{
        "title": "Testing...",
        "description": "Foobar",
        "tag": "Seattle",
        "id": "asdfasdfhukyefhds"
    }]
    return response_body


@api.route('/tags')
def tags_route():
    response_body = [{
        "content": "Amazing",
        "color": "black",
        "id": "1234"
    }]
    return response_body