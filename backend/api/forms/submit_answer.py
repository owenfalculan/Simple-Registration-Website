from flask_restful import Resource, reqparse
from backend.config.settings import SECRET_KEY
from backend.models.models import User
from extensions import db
import jwt

class SubmitAnswer(Resource):
  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument('token', type=str)
    parser.add_argument('answer', type=str)
    parser.add_argument('step', type=int)
    args = parser.parse_args()
    try:
      decoded_token = jwt.decode(args['token'], SECRET_KEY, algorithms='HS256')
      user_data = User.query.get_or_404(decoded_token['id'])
      if args['step'] == 1:
        user_data.step_one_answer = args['answer']
      elif args['step'] == 2:
        user_data.step_two_answer = args['answer']
      else:
        user_data.step_three_answer = args['answer']
      db.session.commit()
      return '', 200
    except:
      return '', 404