from flask import Flask
from flask_cors import CORS

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("../key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
driveData_ref = db.collection('driveData').get()


app = Flask(__name__)
CORS(app)

@app.route('/', methods=["GET"])
def hello_world():
    return {'hello': 'heey'}


@app.route('/tripOver', methods=["GET"])
def fetch_firebase():
    for doc in driveData_ref:
        print(f'{doc.to_dict()}')
    return {'status': 'done'}