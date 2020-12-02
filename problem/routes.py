from flask import Flask, jsonify
from app import app
from problem.models import *

@app.route('/problem/')
@app.route('/problem/all')
def allProblems():
    data = jsonify(getAllProblems())
    data.headers.add('Access-Control-Allow-Origin', '*')
    return data

@app.route('/problem/add', methods=["POST"])
def postProblem():
    return addProblem()

@app.route('/problem/search/<keyword>', methods=["GET"])
def getProblemByKeyword(keyword:str):
    return getProblemsByKeyword(keyword)

@app.route('/problem/<id>', methods=["GET"])
def getProblemByObjectId(id):
    return getProblemById(id)

@app.route('/problem/edit/<id>', methods=["PUT"])
def updateProblemById(id):
    return editProblem(id)

@app.route('/problem/delete/<id>', methods=["DELETE"])
def deleteProblemByObjectId(id):
    return deleteProblemById(id)

@app.route('/problem/review')
def reviewProblem():
    return "review problems"