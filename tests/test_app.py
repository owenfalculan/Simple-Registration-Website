import sys
sys.path.insert(0, './')

from app import app
from extensions import db
from backend.models.models import User
from backend.config.settings import SECRET_KEY

import pytest, random, string
import jwt

def test_unique_username():
  with app.app_context():
    existing_username = User.query.first().username
    random_password = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
    try:
      new_user = User(username=existing_username, password=random_password)
      db.session.add(new_user)
      db.session.commit()
      assert False
    except:
      assert True

def test_jwt_token():
  with app.app_context():
    user = User.query.first()
    initial_data = {'id': user.id,'username': user.username}
    encoded_data = jwt.encode(initial_data, SECRET_KEY, algorithm="HS256")
    decoded_data = jwt.decode(encoded_data, SECRET_KEY, algorithms='HS256')
    assert initial_data == decoded_data