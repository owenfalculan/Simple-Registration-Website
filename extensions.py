from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS

db = SQLAlchemy()
api = Api()
cors = CORS()

from backend.api.auth.register import RegisterUser
from backend.api.auth.login import LoginUser
from backend.api.forms.submit_answer import SubmitAnswer
from backend.api.data.user_data import UserData

api.add_resource(RegisterUser, '/api/register-user')
api.add_resource(LoginUser, '/api/login-user')
api.add_resource(UserData, '/api/user-data/<string:token>')
api.add_resource(SubmitAnswer, '/api/submit-answer')