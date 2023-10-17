from .extensions import db


class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    tasks = db.relationship("Task", backref="list", lazy="dynamic")
    order_index = db.Column(db.Integer, default=0)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True)
    list_id = db.Column(db.Integer, db.ForeignKey("list.id"))
    is_completed = db.Column(db.Boolean, default=False)


class SubTasks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    is_completed = db.Column(db.Boolean, default=False)


class SubSubTasks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    is_completed = db.Column(db.Boolean, default=False)


class TaskSubTaskConnection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey("task.id"))
    subtask_id = db.Column(db.Integer, db.ForeignKey("sub_tasks.id"))


class SubTaskSubSubTaskConnection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subtask_id = db.Column(db.Integer, db.ForeignKey("sub_tasks.id"))
    subsubtask_id = db.Column(db.Integer, db.ForeignKey("sub_sub_tasks.id"))
