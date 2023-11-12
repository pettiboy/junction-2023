from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy.sql import func
import os
from flask_ngrok import run_with_ngrok

app = Flask(__name__)

# basedir = os.path.abspath(os.path.dirname(__file__))

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
#     basedir, "database.db"
# )
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# db = SQLAlchemy(app)

run_with_ngrok(app)  # Start ngrok when app is run


if __name__ == "__main__":
    app.run()

from app import views
