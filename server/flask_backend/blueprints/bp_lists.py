from flask import jsonify, request, Blueprint
from models import Lists, db
from flask_login import login_required, current_user

bp_list = Blueprint("list", __name__)


# get all the user lists from the database
@bp_list.route("/lists", methods=["GET"])
@login_required
def get_all_lists():
    if not current_user.is_authenticated:
        return jsonify({"message": "User is not authenticated"}), 401
    success_message = "Successfully retrieved all lists from the database."
    failure_message = "Failed to retrieve all lists from the database."
    success_status = 200
    try:
        lists = (
            Lists.query.filter_by(user_id=current_user.id)
            .order_by(Lists.order_index)
            .all()
        )
        print("User retrieved all lists from the database")
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
@bp_list.route("/add_list", methods=["POST"])
@login_required
def add_list():
    if not current_user.is_authenticated:
        return jsonify({"message": "User is not authenticated"}), 401
    success_message = "Successfully added list to the database."
    failure_message = "Failed to add list to the database."
    success_status = 200
    print("User is adding a new list to the database: ", request.get_json())
    try:
        list_data = request.get_json()
        user_id = current_user.id
        new_list = Lists(
            name=list_data["name"],
            user_id=user_id,
            order_index=len(Lists.query.all()),
            tasks=[],
        )
        db.session.add(new_list)
        db.session.commit()
        print("User added a new list to the database")
        return jsonify({"message": success_message}), success_status
    except Exception as e:
        print("Error adding list to the database: ", e)
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400


# get a specific list from the database
@bp_list.route("/lists/<list_id>", methods=["GET"])
def get_list(list_id):
    if not current_user.is_authenticated:
        return jsonify({"message": "User is not authenticated"}), 401
    success_message = f"Successfully retrieved list with id {list_id}."
    failure_message = f"Failed to retrieve list with id {list_id}."
    status = 200

    try:
        list = Lists.query.get(list_id)
        return jsonify({"message": success_message, "list": list.to_dict()}), status
    except Exception as e:
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400


# update order indexes of lists in the database
@bp_list.route("/update_order", methods=["POST"])
@login_required
def update_order():
    if not current_user.is_authenticated:
        return jsonify({"message": "User is not authenticated"}), 401
    success_message = "Successfully updated order indexes of lists in the database."
    failure_message = "Failed to update order indexes of lists in the database."
    success_status = 200
    print("User is updating order indexes of lists in the database")
    try:
        list_data = request.get_json()[
            "lists"
        ]  # format: [{"id": 1, "order_index": 0}, {"id": 2, "order_index": 1}]
        for list in list_data:
            list_id = list["id"]

            list_order_index = int(list["order_index"])
            list_to_update = Lists.query.get(list_id)
            list_to_update.order_index = list_order_index
            db.session.commit()
        print("User updated order indexes of lists in the database ")
        return jsonify({"message": success_message}), success_status
    except Exception as e:
        print("Error updating order indexes of lists in the database: ", e)
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400


# delete a list from the database
@bp_list.route("/delete_list/<list_id>", methods=["DELETE"])
def delete_list(list_id):
    success_message = f"Successfully deleted list with id {list_id}."
    failure_message = f"Failed to delete list with id {list_id}."
    success_status = 200

    try:
        list_to_delete = Lists.query.get(list_id)

        # Check if list exists
        if not list_to_delete:
            return jsonify({"message": f"No list found with id {list_id}."}), 404

        # if list has tasks, delete them first (cascade)
        if list_to_delete.tasks:
            for task in list_to_delete.tasks:
                db.session.delete(task)

        db.session.delete(list_to_delete)
        db.session.commit()

        print(f"User deleted list with id {list_id}.")
        return jsonify({"message": success_message}), success_status
    except Exception as e:
        print(f"Error deleting list with id {list_id}: ", e)
        return jsonify({"message": f"{failure_message}. Error is {e}"}), 400


# update list name in the database
@bp_list.route("/update_list_name", methods=["PATCH"])
@login_required
def update_list_name():
    if not current_user.is_authenticated:
        return jsonify({"message": "User is not authenticated"}), 401
    success_message = "Successfully updated list name in the database."
    failure_message = "Failed to update list name in the database."
    success_status = 200
    print("User is updating list name in the database")
    try:
        list_data = request.get_json()
        list_id = list_data["id"]
        list_name = list_data["name"]
        list_to_update = Lists.query.get(list_id)
        list_to_update.name = list_name
        db.session.commit()
        print("User updated list name in the database: ", Lists.query.all())
        return jsonify({"message": success_message}), success_status
    except Exception as e:
        print("Error updating list name in the database: ", e)
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400
