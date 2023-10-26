from flask import Flask
from flask_cors import CORS
from models import db
from blueprints.bp_tasks import bp_task
from blueprints.bp_lists import bp_list
from blueprints.bp_auth import bp_auth
from flask_login import LoginManager  

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.register_blueprint(bp_task)
app.register_blueprint(bp_list)
app.register_blueprint(bp_auth)
login_manager = LoginManager()
login_manager.init_app(app)
app.secret_key = "test"

db.init_app(app)
with app.app_context():
    db.create_all()


@app.route("/")
def index():
    return "<p>Backend is working! </p>"


if __name__ == "__main__":
    app.run(port=5001, debug=True)
