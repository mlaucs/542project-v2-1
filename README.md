# StudyPlanner

- Visual studio code with python virtual environment 
1) Create virtual environment: python3 -m venv .venv 
2) Activate virtual environment: .venv\Scripts\Activate.ps1 or select in visual studio code 
3) You should see (.venv) in the command line 

Packages needed (pip install / py -m pipinstall) \
Install all the necessary packages you see from the console error 

(Windows 10) To run back-end \
$env:FLASK_APP="app.py"  \
$env:FLASK_ENV="development"\
py -m flask run 

(Linux) \
export FLASK_DEBUG=1 \
py/python -m flask run

To run front-end \
go to planner-app folder and open the terminal from here
npm start 

Languages used:
- Python 3+
- Node.js

Frameworks:
- Flask
- React.js

DB:
- MongoDB + mongoengine

