from mongoengine import *
from mongoengine.queryset.visitor import Q
import csv
from datetime import datetime

host = ''
db = ''
connect(db, host=host)

class Problem(Document):
    questionNo = IntField()
    question = StringField(required=True)
    description = StringField(required=True)
    answer = StringField(required=True)
    note = StringField()
    understand = BooleanField(default=False)
    importance = IntField(default=5) #1-10?
    category = StringField(required=True)
    sub_category = StringField()
    last_review_date = DateTimeField()
    review_dates = ListField()

# def getAllProblems():
#     problems = Problem.objects()
#     json_data = problems.to_json()
#     return json_data

def readFromCSV():
    filename = "import.csv"

    rows = [] 

    with open(filename, 'r', encoding='utf-8') as csvfile: 
        csvreader = csv.reader(csvfile)         
        fields = next(csvreader) 

        for row in csvreader: 
            rows.append(row) 

    # questionNo
    # description
    # sub_category
    # note
    # last_review_date
    # category
    for row in rows:
        date = datetime.strptime(row[4], '%m/%d/%Y' )
        p = Problem()
        p.questionNo = row[0]
        p.question = row[1]
        p.sub_category = row[2]
        p.note = row[3]
        p.last_review_date = date
        p.category = row[5]
        p.description = row[6]
        p.review_dates.append(date)
        p.answer = ''
        p.save()

    # print (len(problems))
    # Problem.objects.insert(problems, load_bulk=False)

if __name__ == "__main__":
    readFromCSV()
