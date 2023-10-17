from flask import Flask, request, jsonify
from .extensions import db  # Import the database object
from flask_cors import CORS
from .models import List


def ensure_default_lists_exist():
    try:
        print("Ensuring default lists exist...")
        existing_todo_list = List.query.filter_by(name="To-Do").first()
        existing_completed_list = List.query.filter_by(name="Completed").first()
        if not existing_todo_list:
            default_todo_list = List(name="To-Do", order_index=0)
            db.session.add(default_todo_list)
            print("Added 'To-Do' list to the database.")
        else:
            print("'To-Do' list already exists in the database.")
        if not existing_completed_list:
            default_completed_list = List(name="Completed", order_index=1)
            db.session.add(default_completed_list)
            print("Added 'Completed' list to the database.")
        else:
            print("'Completed' list already exists in the database.")
        db.session.commit()
    except Exception as e:
        print(f"Error ensuring default lists exist: {e}")



def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    db.init_app(app)

    from . import models

    with app.app_context():
        db.create_all()
        ensure_default_lists_exist()
        
        
    from . import main
    app.register_blueprint(main.bp)

    return app
