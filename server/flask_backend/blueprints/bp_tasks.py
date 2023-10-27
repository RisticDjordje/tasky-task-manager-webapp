from flask import jsonify, request, Blueprint
from models import Tasks, db
from flask_login import login_required

bp_task = Blueprint("task", __name__)


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
@login_required
def update_task(task_id):
    """
    Update a task with the given task_id in the database.

    Args:
        task_id (int): The id of the task to be updated.

    Returns:
        A JSON response containing a success message and a success status code if the task was successfully updated.
        A JSON response containing a failure message and a 400 status code if the task failed to update.

    Raises:
        Exception: If there was an error updating the task in the database.
    """
    success_message = f"Successfully updated task with id {task_id} in the database."
    failure_message = f"Failed to update task with id {task_id} in the database."
    success_status = 200
    print("User is updating task with id {task_id} in the database: ")

    try:
        task_data = request.get_json()
        task = Tasks.query.get(task_id)
        task.name = task_data["name"]
        task.list_id = task_data["list_id"]
        task.parent_id = task_data["parent_id"]
        task.is_completed = task_data["is_completed"]
        # if the task is completed and the task has a parent task, then go through all the parents subtasks and check if they are all completed.
        # if they are all completed, then set the parent task to completed
        def check_parent_completion(task):
                parent_task = Tasks.query.get(task.parent_id)
                all_subtasks_completed = True
                for subtask in parent_task.subtasks:
                    if not subtask.is_completed:
                        all_subtasks_completed = False
                        break
                if all_subtasks_completed:
                    parent_task.is_completed = True
                    if parent_task.parent_id is not None:
                        check_parent_completion(parent_task)

        if task.is_completed and task.parent_id is not None:
            check_parent_completion(task)
           
        

        db.session.commit()
        print("User updated task with id {task_id} in the database: ", task)
        return jsonify({"message": success_message}), success_status

    except Exception as e:
        print("Error updating task with id {task_id} in the database: ", e)
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400


# delete a task from the database
@bp_task.route("/tasks/<task_id>/delete", methods=["DELETE"])
@login_required
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
@login_required
def move_task(task_id):
    """
    Moves a task to a different list in the database.

    Args:
        task_id (int): The ID of the task to be moved.

    Returns:
        A JSON response containing a success or failure message and a status code.
    """
    success_message = f"Successfully moved task with id {task_id} in the database."
    failure_message = f"Failed to move task with id {task_id} in the database."
    success_status = 200
    print("User is moving task with id {task_id} in the database: ", request.get_json())

    try:
        # get the task id from the url
        task = Tasks.query.get(task_id)
        
        post_data = request.get_json()
        list_id = post_data["list_id"]
        
        # change task list if the list id is different
        if task.list_id != list_id:
            task.list_id = list_id
            task.task_depth = 0
            task.parent_id = None
            db.session.commit()
            print(f"User updated task with id {task_id} in the database: ", task)
            return jsonify({"message": success_message}), success_status
        else:
            print("Task is already at that id")
            return jsonify({"message": success_message}), success_status

    except Exception as e:
        print(f"Error moving task with id {task_id} in the database: ", e)
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400
