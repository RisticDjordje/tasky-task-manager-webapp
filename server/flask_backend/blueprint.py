from flask import Flask, jsonify, request, Blueprint
from models import Task, List, db

bp = Blueprint("main", __name__)

# get all the user lists from the database
@bp.route("/lists", methods=["GET"])
def get_all_lists():
    success_message = "Successfully retrieved all lists from the database."
    failure_message = "Failed to retrieve all lists from the database."
    success_status = 200
    try:
        lists = List.query.all()
        print("User retrieved all lists from the database: ", lists)

        return (
            jsonify(
                {
                    "message": success_message,
                    "lists": [list.to_dict() for list in lists],
                }
            ),
            success_status,
        )
    except Exception as e:
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400

# post a new list to the database
@bp.route("/add_list", methods=["POST"])
def add_list():
    success_message = "Successfully added list to the database."
    failure_message = "Failed to add list to the database."
    success_status = 200
    print("User is adding a new list to the database: ", request.get_json())
    try:
        list_data = request.get_json()
        new_list = List(name=list_data["name"], order_index=len(List.query.all()), tasks=[])
        db.session.add(new_list)
        db.session.commit()
        print("User added a new list to the database: ", new_list)
        print("Current lists in the database: ", List.query.all())
        return jsonify({"message": success_message}), success_status
    except Exception as e:
        print("Error adding list to the database: ", e)
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400


# get a specific list from the database
@bp.route("/lists/<list_id>", methods=["GET"])
def get_list(list_id):
    success_message = f"Successfully retrieved list with id {list_id}."
    failure_message = f"Failed to retrieve list with id {list_id}."
    status = 200

    try:
        list = List.query.get(list_id)
        return jsonify({"message": success_message, "list": list.to_dict()}), status
    except Exception as e:
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400