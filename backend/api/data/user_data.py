from flask_restful import Resource
from backend.config.settings import SECRET_KEY
from backend.models.models import User
from extensions import db
import jwt

class UserData(Resource):
  def get(self, token):
    try:
      decoded_token = jwt.decode(token, SECRET_KEY, algorithms='HS256')
      user = User.query.get_or_404(decoded_token['id'])
      context = {
        'username': user.username,
        'step_one_answer': user.step_one_answer,
        'step_two_answer': user.step_two_answer,
        'step_three_answer': user.step_three_answer,
      }
      return context, 200
    except:
      return '', 404

