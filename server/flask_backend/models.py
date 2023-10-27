from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()


class Users(db.Model, UserMixin):
    """
    A class representing a user in the to-do app.

    Attributes:
    -----------
    id : int
        The unique identifier for the user.
    username : str
        The username of the user.
    email : str
        The email address of the user.
    password_hash : str
        The hashed password of the user.

    Methods:
    --------
    __repr__(self):
        Returns a string representation of the user object.
    to_dict(self):
        Returns a dictionary representation of the user object.
    """
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f"User('{self.username}', lists: '{self.lists}')"

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "lists": [list.to_dict() for list in self.lists],
        }


class Lists(db.Model):
    """
    Represents a to-do list in the application.

    Attributes:
        id (int): The unique identifier for the list.
        name (str): The name of the list.
        user_id (int): The ID of the user who owns the list.
        tasks (relationship): A relationship to the tasks associated with the list.
        order_index (int): The index of the list in the user's list of lists.
    """

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    tasks = db.relationship("Tasks", backref="lists", lazy=True)
    order_index = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        """
        Returns a dictionary representation of the list.

        Returns:
            dict: A dictionary containing the list's ID, name, tasks, and order index.
        """
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
        """
        Returns a string representation of the list.

        Returns:
            str: A string containing the list's name, order index, and tasks.
        """
        return f"List('{self.name}', order_idx '{self.order_index}', tasks: '{self.tasks}')"


class Tasks(db.Model):
    """
    A class representing a task in the to-do app.

    Attributes:
    -----------
    id : int
        The unique identifier of the task.
    name : str
        The name of the task.
    list_id : int
        The unique identifier of the list that the task belongs to.
    task_depth : int
        The depth of the task in the task hierarchy.
    parent_id : int
        The unique identifier of the parent task, if any.
    is_completed : bool
        A flag indicating whether the task is completed or not.
    subtasks : list
        A list of subtasks that belong to this task.

    Methods:
    --------
    __repr__()
        Returns a string representation of the task.
    to_dict()
        Returns a dictionary representation of the task.
    """
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey("lists.id"), nullable=False)
    task_depth = db.Column(db.Integer, nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey("tasks.id"))
    is_completed = db.Column(db.Boolean, nullable=False, default=False)
    subtasks = db.relationship(
        "Tasks",
        backref=db.backref("parent", remote_side=[id]),
        lazy=True,
        cascade="all, delete-orphan",
    )

    def __repr__(self):
        """
        Returns a string representation of the task.
        """
        return f"Task('{self.name}, list_id: {self.list_id}, task_depth: {self.task_depth}, parent_id: {self.parent_id}, is_completed: {self.is_completed}, subtasks: {self.subtasks}')"

    def to_dict(self):
        """
        Returns a dictionary representation of the task.
        """
        return {
            "id": self.id,
            "name": self.name,
            "list_id": self.list_id,
            "subtasks": [subtask.to_dict() for subtask in self.subtasks],
            "task_depth": self.task_depth,
            "parent_id": self.parent_id,
            "is_completed": self.is_completed,
        }
