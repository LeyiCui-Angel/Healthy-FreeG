from flask import Flask, flash, redirect, url_for
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from flask import Response, request, jsonify
from flask import render_template
from flask import send_from_directory
from api.HelloApiHandler import HelloApiHandler
from werkzeug.utils import secure_filename
import os
from cv2 import cv2

UPLOAD_FOLDER = os.path.join(os.getcwd(), "cache", "file")
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# CORS(app)
# api = Api(app)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/main")
def main():
    return render_template("main.html")


@app.route("/item")
def main_new():
    return render_template("main_new.html")


# @app.route("/members")
# def members():
#     return {"members": ["member1", "member2", "member3"]}
#

# api.add_resource(HelloApiHandler, '/flask/hello')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload_file', methods=['POST'])
def upload_file():
    image_data = ""
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return jsonify(image_data)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return jsonify(image_data)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            img = cv2.imread(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            decoder = cv2.QRCodeDetector()
            data, points, _ = decoder.detectAndDecode(img)
            image_data = data
            if points is not None:
                nrOfPoints = len(points)

                points = points[0]
                for i in range(nrOfPoints):
                    pt1 = [int(val) for val in points[i]]
                    pt2 = [int(val) for val in points[(i + 1) % 4]]
                    cv2.line(img, pt1, pt2, color=(255, 0, 0), thickness=3)

            #     print(data)
            # print("hi")
            # app.redirect(app.url_for('operation'), code=307)
            return image_data


if __name__ == '__main__':
    app.run(debug=True)
