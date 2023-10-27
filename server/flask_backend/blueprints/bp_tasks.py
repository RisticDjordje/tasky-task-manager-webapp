from flask import jsonify, request, Blueprint
from models import Tasks, db
from flask_login import login_required, current_user

bp_task = Blueprint("task", __name__)


# post a new task to the database
@bp_task.route("/add_task", methods=["POST"])
def add_task():
    """
    Adds a new task to the database.

    Returns:
        A JSON response containing a success or failure message and a status code.
    """
    success_message = "Successfully added task to the database."
    failure_message = "Failed to add task to the database."
    success_status = 200

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
        print(f"User {current_user.username} added a new task. ")
        return jsonify({"message": success_message}), success_status

    except Exception as e:
        print(f"User {current_user.username}: Error adding task to the database: ", e)
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

    Description:
        This function updates a task in the database with the given task_id. The function takes in the task_id as an argument and uses it to retrieve the task from the database. The function then updates the task with the new data provided in the request JSON. If the task is marked as completed and has a parent task, the function checks if all the parent task's subtasks are completed. If they are, the parent task is also marked as completed. If the task is marked as not completed and has a parent task, the function marks the parent task as not completed. The function returns a JSON response with a success message and status code if the task was successfully updated, or a failure message and 400 status code if the task failed to update.

    Example:
        To update a task with id 1, make a PUT request to the endpoint '/tasks/1' with the new task data in the request JSON.
    """
    success_message = f"Successfully updated task with id {task_id} in the database."
    failure_message = f"Failed to update task with id {task_id} in the database."
    success_status = 200
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
            """
            Recursively checks if all subtasks of a parent task are completed.
            If all subtasks are completed, sets the parent task as completed.
            If the parent task has a parent, recursively checks the parent task.

            Args:
            - task: A Tasks object representing the task to check completion for.

            Returns:
            - None
            """
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

        def check_parent_not_completed(task):
            """
            Recursively sets all parents to not completed.
            """
            parent_task = Tasks.query.get(task.parent_id)
            parent_task.is_completed = False
            if parent_task.parent_id is not None:
                check_parent_not_completed(parent_task)

        if task.is_completed and task.parent_id is not None:
            check_parent_completion(task)
        elif not task.is_completed and task.parent_id is not None:
            check_parent_not_completed(task)
        db.session.commit()

        print(f"User {current_user.username} updated a task. ")
        return jsonify({"message": success_message}), success_status

    except Exception as e:
        print(f"User {current_user.username}. Error updating a task: ", e)
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400


# delete a task from the database
@bp_task.route("/tasks/<task_id>/delete", methods=["DELETE"])
@login_required
def delete_task(task_id):
    """
    Deletes a task with the given task_id from the database.

    Args:
        task_id (int): The id of the task to be deleted.

    Returns:
        A JSON response containing a success message and a success status code (200) if the task was successfully deleted.
        A JSON response containing a failure message and a failure status code (400) if the task deletion failed.
    """
    success_message = f"Successfully deleted task with id {task_id} from the database."
    failure_message = f"Failed to delete task with id {task_id} from the database."
    success_status = 200
    try:
        task = Tasks.query.get(task_id)
        db.session.delete(task)
        db.session.commit()
        print(f"User {current_user.username} deleted a task. ")
        return jsonify({"message": success_message}), success_status

    except Exception as e:
        print(
            f"User {current_user.username}. Error deleting task with id {task_id} from the database: ",
            e,
        )
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400


# add subtask to a task in the database
@bp_task.route("/tasks/<task_id>/add_subtask", methods=["POST"])
def add_subtask_to_task(task_id):
    """
    Adds a subtask to a task with the given task_id.

    Args:
        task_id (int): The id of the task to add a subtask to.

    Returns:
        tuple: A tuple containing a JSON response with a success or failure message and a status code.
    """
    success_message = (
        f"Successfully added subtask to task with id {task_id} in the database."
    )
    failure_message = (
        f"Failed to add subtask to task with id {task_id} in the database."
    )
    success_status = 200

    def check_parent_not_completed(task):
        """
        Recursively sets all parents to not completed.
        """
        parent_task = Tasks.query.get(task.parent_id)
        if parent_task.is_completed:
            parent_task.is_completed = False
            if parent_task.parent_id is not None:
                check_parent_not_completed(parent_task)

    try:
        task_data = request.get_json()
        new_task = Tasks(
            name=task_data["name"],
            list_id=task_data["list_id"],
            parent_id=task_id,
            task_depth=Tasks.query.get(task_id).task_depth + 1,
        )

        # if the parent task is completed, set it to not completed
        parent_task = Tasks.query.get(task_id)
        if parent_task.is_completed:
            parent_task.is_completed = False
            if parent_task.parent_id is not None:
                print("here")
                check_parent_not_completed(parent_task)

        db.session.add(new_task)
        db.session.commit()

        print(f"User {current_user.username} added a new subtask. ")
        return jsonify({"message": success_message}), success_status

    except Exception as e:
        print(
            f"User {current_user.username}. Error adding subtask to task with id {task_id} in the database: ",
            e,
        )
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

    def check_parent_completion(task):
        """
        Recursively checks if all subtasks of a parent task are completed.
        If all subtasks are completed, the parent task is marked as completed.
        If the parent task has a parent task, the function is called again on the parent task.

        Args:
            task (Tasks): The task to check for completion.
        """
        parent_task = Tasks.query.get(task.parent_id)
        all_subtasks_completed = True
        # if all subtasks are completed except the task
        for subtask in parent_task.subtasks:
            if not subtask.is_completed and subtask.id != task.id:
                all_subtasks_completed = False
                break
        if all_subtasks_completed:
            parent_task.is_completed = True
            if parent_task.parent_id is not None:
                check_parent_completion(parent_task)

    try:
        # get the task id from the url
        task = Tasks.query.get(task_id)

        post_data = request.get_json()
        list_id = post_data["list_id"]

        # change task list if the list id is different
        if task.list_id != list_id:
            task.list_id = list_id
            task.task_depth = 0

            # check if the task is not completed and if its current parent task is not None and is completed
            # if so, then set the parent task to not completed
            if not task.is_completed and task.parent_id is not None:
                check_parent_completion(task)

            task.parent_id = None

            db.session.commit()
            print(f"User {current_user.username} moved task from one list to another. ")
            return jsonify({"message": success_message}), success_status

        else:
            return jsonify({"message": "Task is already in this list."}), success_status

    except Exception as e:
        print(
            f"User {current_user.username}. Error moving task with id {task_id} in the database: ",
            e,
        )
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400
