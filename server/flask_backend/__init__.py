import os
from flask import Flask, request, jsonify
from .extensions import db  # Import the database object
from flask_cors import CORS


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    db.init_app(app)

    from . import models

    with app.app_context():
        db.create_all()
        
    from . import main

    return app
