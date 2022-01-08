from extensions import db
from datetime import datetime

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(200), unique=True, nullable=False)
  password = db.Column(db.String(200), nullable=False)
  step_one_answer = db.Column(db.String(200), nullable=True)
  step_two_answer = db.Column(db.String(200), nullable=True)
  step_three_answer = db.Column(db.String(200), nullable=True)
  date_created = db.Column(db.DateTime, default=datetime.now)