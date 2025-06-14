# api/index.py
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "Welcome to the CRO & UX Audit API! Use POST /run-audit to start."
    })
