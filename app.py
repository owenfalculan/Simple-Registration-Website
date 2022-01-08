from flask import Flask, send_from_directory
from dotenv import dotenv_values
from extensions import db, api, cors
from commands import create_tables

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
app.config.from_pyfile('backend/config/settings.py')
app.cli.add_command(create_tables)

if dotenv_values(".flaskenv")['FLASK_ENV'] == 'development':
  cors.init_app(app)

api.init_app(app)
db.init_app(app)

@app.route("/", defaults={'path': ''})
def serve(path):
  return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
def not_found(e):
  return app.send_static_file('index.html')