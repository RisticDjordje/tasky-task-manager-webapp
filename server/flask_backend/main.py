from flask import Flask, jsonify, request, Blueprint
from .models import Task  # Import the Task model
from .extensions import db  # Import the database object
from .models import List

bp = Blueprint("main", __name__)

@bp.route('/lists', methods=['GET'])
def get_lists():
    """
    Return all lists in the database
    """
    try:
        print("Getting lists")
        lists = List.query.all()
        list_list = []
        for list in lists:
            list_list.append({"id": list.id, "name": list.name, "order_index": list.order_index})
        return jsonify(list_list)
    except Exception as e:
        print(f"Error getting lists: {e}")
        return jsonify({"error": "Error getting lists"}), 500


@bp.route("/add_list", methods=["POST"])
def create_list():
    try:
        data = request.get_json()  # Get the JSON data from the request
        name = data.get("name")  # Extract the task name from the JSON data

        # Check if a task with the same name already exists in the database
        existing_list = List.query.filter_by(name=name).first()
        if existing_list:
            return jsonify({"message": "List already exists"}), 400

        # Create a new task and add it to the database. The order_index is set size of the list table 
        new_list = List(name=name, order_index=len(List.query.all()))
        db.session.add(new_list)
        db.session.commit()

        # print all tasks in the database
        lists = List.query.all()
        for list in lists:
            print(list.name)

        return jsonify({"message": "List created successfully"})
    except Exception as e:
        print(f"Error creating list: {e}")
        return jsonify({"error": "Error creating list"}), 500



@bp.route('/tasks', methods=['GET'])
def get_tasks():
    """
    Return all tasks in the database
    """
    try:
        print("Getting tasks")
        tasks = Task.query.all()
        task_list = []
        for task in tasks:
            task_list.append({"id": task.id, "name": task.name})
        return jsonify(task_list)
    except Exception as e:
        print(f"Error getting tasks: {e}")
        return jsonify({"error": "Error getting tasks"}), 500
    
@bp.route("/add_task", methods=["POST"])
def create_task():
    try:
        data = request.get_json()  # Get the JSON data from the request
        name = data.get("name")  # Extract the task name from the JSON data

        # Check if a task with the same name already exists in the database
        existing_task = Task.query.filter_by(name=name).first()
        if existing_task:
            return jsonify({"message": "Task already exists"}), 400

        # Create a new task and add it to the database
        new_task = Task(name=name)
        db.session.add(new_task)
        db.session.commit()

        # print all tasks in the database
        tasks = Task.query.all()
        for task in tasks:
            print(task.name)

        return jsonify({"message": "Task created successfully"})
    except Exception as e:
        print(f"Error creating task: {e}")
        return jsonify({"error": "Error creating task"}), 500




@bp.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    """
    Update a task in the database
    """
    try:
        task = Task.query.get(id)
        if not task:
            return jsonify({"message": "Task not found"}), 404

        data = request.get_json()
        task.name = data.get("name")
        db.session.commit()

        return jsonify({"message": "Task updated successfully"})
    except Exception as e:
        print(f"Error updating task: {e}")
        return jsonify({"error": "Error updating task"}), 500


@bp.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    """
    Delete a task from the database
    """
    try:
        task = Task.query.get(id)
        if not task:
            return jsonify({"message": "Task not found"}), 404

        db.session.delete(task)
        db.session.commit()

        return jsonify({"message": "Task deleted successfully"})
    except Exception as e:
        print(f"Error deleting task: {e}")
        return jsonify({"error": "Error deleting task"}), 500
