from flask_restful import Resource, reqparse
from backend.config.settings import SECRET_KEY
from backend.models.models import User
from extensions import db
from sqlalchemy.exc import SQLAlchemyError
import jwt

class RegisterUser(Resource):
  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument('username', type=str)
    parser.add_argument('password', type=str)
    args = parser.parse_args()
    try:
      new_user = User(
        username = args['username'],
        password = args['password'],
      ) 
      db.session.add(new_user)
      db.session.commit()
      token = jwt.encode({'id': new_user.id,'username': args['username']}, SECRET_KEY, algorithm="HS256")
      return {'token': token, 'answers': {}}, 200
    except SQLAlchemyError as e:
      error = str(e.__dict__['orig'])
      return {'error': error}, 403