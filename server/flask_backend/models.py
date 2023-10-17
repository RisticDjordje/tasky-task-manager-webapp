from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    tasks = db.relationship("Task", backref="list", lazy=True)
    order_index = db.Column(db.Integer, nullable=False)

    def to_dict(self):

        tasks = []

        for task in self.tasks:
            if task.parent_id is None:
                tasks.append(task.to_dict())

        return {
            "id": self.id,
            "name": self.name,
            "tasks": tasks,
            "order_index": self.order_index,
        }
    
    def __repr__(self):
        return f"List('{self.name}', order_idx '{self.order_index}', tasks: '{self.tasks}')"
    
    def ensure_default_lists_exist():
        try:
            print("Ensuring default lists exist...")
            existing_todo_list = List.query.filter_by(name="To-Do").first()
            existing_completed_list = List.query.filter_by(name="Completed").first()
            if not existing_todo_list:
                default_todo_list = List(name="To-Do", order_index=0)
                db.session.add(default_todo_list)
                print("Added 'To-Do' list to the database.")
            else:
                print("'To-Do' list already exists in the database.")
            if not existing_completed_list:
                default_completed_list = List(name="Completed", order_index=1)
                db.session.add(default_completed_list)
                print("Added 'Completed' list to the database.")
            else:
                print("'Completed' list already exists in the database.")
            db.session.commit()
        except Exception as e:
            print(f"Error ensuring default lists exist: {e}")


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey("list.id"), nullable=False)
    task_depth = db.Column(db.Integer, nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey("task.id"))
    subtasks = db.relationship(
        "Task",
        backref=db.backref("parent", remote_side=[id]),
        lazy=True,
        cascade="all, delete-orphan",
    )

    def __repr__(self):
        return f"Task('{self.name}')"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "list_id": self.list_id,
            "subtasks": [subtask.to_dict() for subtask in self.subtasks],
            "task_depth": self.task_depth
        }

    def calculate_depth(self):
        if self.parent_id is None:
            return 0
        else:
            return 1 + Task.query.get(self.parent_id).calculate_depth()