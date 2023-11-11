from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import os

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
    basedir, "database.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


if __name__ == "__main__":
    app.run()

from app import views
