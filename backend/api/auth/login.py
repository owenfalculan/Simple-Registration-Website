from flask_restful import Resource, reqparse
from backend.config.settings import SECRET_KEY
from backend.models.models import User
from extensions import db
import jwt

class LoginUser(Resource):
  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument('username', type=str)
    parser.add_argument('password', type=str)
    args = parser.parse_args()
    user = User.query.filter_by(
      username = args['username'],
      password = args['password'],
    ).first()
    if user:
      token = jwt.encode({'id': user.id,'username': user.username}, SECRET_KEY, algorithm="HS256")
      answers = {
        'step_one_answer': user.step_one_answer,
        'step_two_answer': user.step_two_answer,
        'step_three_answer': user.step_three_answer,
      }
      return {'token': token, 'answers': answers}, 200
    return '', 404