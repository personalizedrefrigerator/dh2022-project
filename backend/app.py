from flask import Flask

api = Flask(__name__)

@api.route('/posts')
def posts_route():
    response_body = {
        "name": "Testing...",
        "content": "Foobar",
        "tag": "Seattle",
    }
    return response_body


