from flask import jsonify, request, Blueprint
from models import Tasks, db

bp_task = Blueprint("task", __name__)

# get all the tasks lists from the database
@bp_task.route("/tasks", methods=["GET"])
def get_all_tasks():
    success_message = "Successfully retrieved all the tasks from the database."
    failure_message = "Failed to retrieve all the tasks from the database."
    success_status = 200
    try:
        tasks = Tasks.query.all()
        print("User retrieved all tasks from the database: ", tasks)

        return (
            jsonify(
                {
                    "message": success_message,
                    "lists": [task.to_dict() for task in tasks],
                }
            ),
            success_status,
        )
    except Exception as e:
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400

# post a new task to the database
@bp_task.route("/add_task", methods=["POST"])
def add_task():
    success_message = "Successfully added task to the database."
    failure_message = "Failed to add task to the database."
    success_status = 200
    print("User is adding a new task to the database: ", request.get_json())

    try:
        task_data = request.get_json()
        new_task = Tasks(
            name=task_data["name"],
            list_id=1,
            task_depth=0,
            parent_id=None,
        )
        db.session.add(new_task)
        db.session.commit()
        print("User added a new task to the database: ", new_task)
        print("Current tasks in the database: ", Tasks.query.all())
        return jsonify({"message": success_message}), success_status
    
    except Exception as e:
        print("Error adding task to the database: ", e)
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400
    

# post a new task to the database
@bp_task.route("/add_subtask", methods=["POST"])
def add_subtask():
    success_message = "Successfully added task to the database."
    failure_message = "Failed to add task to the database."
    success_status = 200
    print("User is adding a subnew task to the database: ", request.get_json())

    try:
        task_data = request.get_json()
        new_task = Tasks(
            name=task_data["name"],
            list_id=task_data["list_id"],
            parent_id=task_data["parent_id"],
            task_depth=Tasks.query.get(task_data["parent_id"]).task_depth + 1,
        )
        db.session.add(new_task)
        db.session.commit()
        print("User added a new subtask to the database: ", new_task)
        return jsonify({"message": success_message}), success_status
    
    except Exception as e:
        print("Error adding task to the database: ", e)
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400


