from flask import request, render_template, jsonify, url_for, redirect, g
from index import app, db

@app.route('/', methods=['GET'])
def index():
    pass
