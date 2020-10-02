from flask import Flask,jsonify, request
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
    description = StringField(required=True)
    answer = StringField(required=True)
    hint = StringField()
    note = StringField()
    understand = BooleanField(default=False)
    importance = IntField(default=5) #1-10?
    category = StringField(required=True)
    sub_category = StringField()
    review_dates = ListField()
    add_date = DateTimeField()
    modify_date = DateTimeField()

def printProblem(p):
    json_data = p.to_json()
    print(json_data)

def addProblem():
    try:
        req_data = request.get_json(force=True)
        p = Problem()
        p.description = req_data['description']
        p.answer = req_data['answer']
        p.hint = req_data['hint']
        p.note = req_data['note']
        p.importance = req_data['importance']
        p.category = req_data['category']
        p.sub_category = req_data['subCategory']
        p.review_dates.append(req_data['lastReviewDate'])
        p.add_date = datetime.datetime.now()
        p.modify_date = datetime.datetime.now()
        #printProblem(p)
        p.save()
        return 'OK'
    except:
        return 'Error - data is not added to db'

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
        p.delete()
        return True
    except:
        return False