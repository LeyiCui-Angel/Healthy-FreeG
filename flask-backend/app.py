from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from flask import Response, request, jsonify
from flask import render_template
from flask import send_from_directory
from api.HelloApiHandler import HelloApiHandler

app = Flask(__name__, static_url_path='', static_folder='react-frontend/build')
CORS(app)
api = Api(app)


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.route("/members")
def members():
    return {"members": ["member1", "member2", "member3"]}


api.add_resource(HelloApiHandler, '/flask/hello')


if __name__ == '__main__':
    app.run(debug=True)
