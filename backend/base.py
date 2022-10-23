from flask import Flask

api = Flask(__name__)

@api.route('/posts')
def posts_route():
    response_body = [{
        "title": "Testing...",
        "description": "Foobar",
        "tag": "Seattle",
        "id": "asdfasdfhukyefhds"
    }]
    return response_body


