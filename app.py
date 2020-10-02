from flask import Flask, render_template
import pymongo

app = Flask(__name__)

#routes
from problem import routes

@app.route('/')
@app.route('/dashboard/')
def dashboard():
    return "dashboard"
