from flask import Flask
from flask_cors import CORS
from models import db
from blueprints.bp_tasks import bp_task
from blueprints.bp_lists import bp_list
from models import Lists

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.register_blueprint(bp_task)
app.register_blueprint(bp_list)

db.init_app(app)
with app.app_context():
    db.create_all()
    Lists.ensure_default_lists_exist()

@app.route("/")
def index():
    return "<p>Backend is working! </p>"


if __name__ == "__main__":
    app.run(port=5001, debug=True)