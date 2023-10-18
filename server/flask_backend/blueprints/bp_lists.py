from flask import jsonify, request, Blueprint
from models import Lists, db

bp_list = Blueprint("list", __name__)

# get all the user lists from the database
@bp_list.route("/lists", methods=["GET"])
def get_all_lists():
    success_message = "Successfully retrieved all lists from the database."
    failure_message = "Failed to retrieve all lists from the database."
    success_status = 200
    try:
        lists = Lists.query.all()
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
@bp_list.route("/add_list", methods=["POST"])
def add_list():
    success_message = "Successfully added list to the database."
    failure_message = "Failed to add list to the database."
    success_status = 200
    print("User is adding a new list to the database: ", request.get_json())
    try:
        list_data = request.get_json()
        new_list = Lists(name=list_data["name"], order_index=len(Lists.query.all()), tasks=[])
        db.session.add(new_list)
        db.session.commit()
        print("User added a new list to the database: ", new_list)
        print("Current lists in the database: ", Lists.query.all())
        return jsonify({"message": success_message}), success_status
    except Exception as e:
        print("Error adding list to the database: ", e)
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400


# get a specific list from the database
@bp_list.route("/lists/<list_id>", methods=["GET"])
def get_list(list_id):
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
def update_order():
    success_message = "Successfully updated order indexes of lists in the database."
    failure_message = "Failed to update order indexes of lists in the database."
    success_status = 200
    print("User is updating order indexes of lists in the database: ", request.get_json())
    try:
        list_data = request.get_json()["lists"] # format: [{"id": 1, "order_index": 0}, {"id": 2, "order_index": 1}]
        for list in list_data:
            list_id = list["id"] 

            list_order_index = int(list["order_index"])
            list_to_update = Lists.query.get(list_id)
            list_to_update.order_index = list_order_index
            db.session.commit()
        print("User updated order indexes of lists in the database: ", Lists.query.all())
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
        
        db.session.delete(list_to_delete)
        db.session.commit()
        
        print(f"User deleted list with id {list_id}.")
        return jsonify({"message": success_message}), success_status
    except Exception as e:
        print(f"Error deleting list with id {list_id}: ", e)
        return jsonify({"message": f"{failure_message}. Error is {e}"}), 400
