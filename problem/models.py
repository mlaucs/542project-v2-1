from flask import Flask,jsonify, request, Response
from mongoengine import *
from mongoengine.queryset.visitor import Q
import datetime
import configparser

config = configparser.ConfigParser()
config.read('problem/config.ini') 
host = config['config']['connection']
db = config['config']['problem_set_system_db']
connect(db, host=host)

class Problem(Document):
    question = StringField()
    questionNo = IntField()
    description = StringField(required=True)
    answer = StringField(required=True)
    hint = StringField()
    note = StringField()
    understand = BooleanField(default=False)
    importance = IntField(default=5) #1-10?
    category = StringField(required=True)
    sub_category = StringField()
    review_dates = ListField()
    last_review_date = DateTimeField()
    add_date = DateTimeField()
    modify_date = DateTimeField()

def printProblem(p):
    json_data = p.to_json()
    print(json_data)

def generateProblemObjectFromRequest(p, req_data, mode):
    p.question = req_data['question']
    p.questionNo = req_data['questionNo']
    p.description = req_data['description']
    p.answer = req_data['answer']
    p.note = req_data['note']
    p.importance = req_data['importance']
    p.category = req_data['category']
    p.sub_category = req_data['sub_category']
    if mode == 'add':
        p.add_date = datetime.datetime.now()
    p.modify_date = datetime.datetime.now()
    return p

def addProblem():
    try:
        req_data = request.get_json(force=True)
        p = Problem() 
        generateProblemObjectFromRequest(p, req_data, 'add')
        p.save()
        return Response("OK", status=200)
    except Exception as e:
        return Response("Data is not added " + str(e), status=400)

def editProblem(_id):
    try:
        req_data = request.get_json(force=True)
        p = Problem.objects.get(id=_id)
        # printProblem(p)
        if p:
            generateProblemObjectFromRequest(p, req_data, 'edit')
            p.save()
            return Response("OK", status=200)

        return Response("Problem not found", status=404)
    except Exception as e:
        return Response("Data is not updated " + str(e), status=400)

def getAllProblems():
    problems = Problem.objects()
    json_data = problems.to_json()
    return json_data

def getProblemsByKeyword(keyword:str):
    problems = Problem.objects((Q(description__icontains=keyword)) | Q(hint__icontains=keyword))
    json_data = problems.to_json()
    return json_data

def getProblemById(_id):
    problems = Problem.objects.get(id=_id)
    json_data = problems.to_json()
    return json_data

def deleteProblemById(_id):
    try:
        p = Problem.objects(id=_id).first()
        if p:
            p.delete()
            return Response("OK", status=200)

        return Response("Problem not found", status=404)

    except Exception as e:
            return Response("Data is not updated " + str(e), status=400)