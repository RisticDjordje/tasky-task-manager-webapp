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
            list_id=task_data["id"],
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


# update task in the database
@bp_task.route("/tasks/<task_id>/update", methods=["PATCH"])
def update_task(task_id):
    success_message = f"Successfully updated task with id {task_id} in the database."
    failure_message = f"Failed to update task with id {task_id} in the database."
    success_status = 200
    print(
        "User is updating task with id {task_id} in the database: ", request.get_json()
    )

    try:
        task_data = request.get_json()
        task = Tasks.query.get(task_id)
        task.name = task_data["name"]
        task.list_id = task_data["list_id"]
        task.parent_id = task_data["parent_id"]
        task.is_completed = task_data["is_completed"]
        db.session.commit()
        print("User updated task with id {task_id} in the database: ", task)
        return jsonify({"message": success_message}), success_status

    except Exception as e:
        print("Error updating task with id {task_id} in the database: ", e)
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400


# delete a task from the database
@bp_task.route("/tasks/<task_id>/delete", methods=["DELETE"])
def delete_task(task_id):
    success_message = f"Successfully deleted task with id {task_id} from the database."
    failure_message = f"Failed to delete task with id {task_id} from the database."
    success_status = 200
    print("User is deleting task with id {task_id} from the database")

    try:
        task = Tasks.query.get(task_id)
        db.session.delete(task)
        db.session.commit()
        print("User deleted task with id {task_id} from the database")
        return jsonify({"message": success_message}), success_status

    except Exception as e:
        print("Error deleting task with id {task_id} from the database: ", e)
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400


# add subtask to a task in the database
@bp_task.route("/tasks/<task_id>/add_subtask", methods=["POST"])
def add_subtask_to_task(task_id):
    success_message = (
        f"Successfully added subtask to task with id {task_id} in the database."
    )
    failure_message = (
        f"Failed to add subtask to task with id {task_id} in the database."
    )
    success_status = 200
    print(
        "User is adding subtask to task with id {task_id} in the database: ",
        request.get_json(),
    )

    try:
        task_data = request.get_json()
        new_task = Tasks(
            name=task_data["name"],
            list_id=task_data["list_id"],
            parent_id=task_id,
            task_depth=Tasks.query.get(task_id).task_depth + 1,
        )
        db.session.add(new_task)
        db.session.commit()
        print(
            "User added subtask to task with id {task_id} in the database: ", new_task
        )
        return jsonify({"message": success_message}), success_status

    except Exception as e:
        print("Error adding subtask to task with id {task_id} in the database: ", e)
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400


# move task to another list in the database
@bp_task.route("/tasks/<task_id>/move", methods=["PATCH"])
def move_task(task_id):
    success_message = f"Successfully moved task with id {task_id} in the database."
    failure_message = f"Failed to move task with id {task_id} in the database."
    success_status = 200
    print("User is moving task with id {task_id} in the database: ", request.get_json())

    try:
        task_data = request.get_json()
        task = Tasks.query.get(task_id)
        task.list_id = task_data["list_id"]
        db.session.commit()
        print("User moved task with id {task_id} in the database: ", task)
        return jsonify({"message": success_message}), success_status

    except Exception as e:
        print("Error moving task with id {task_id} in the database: ", e)
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400
