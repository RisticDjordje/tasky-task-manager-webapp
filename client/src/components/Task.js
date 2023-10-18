import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../style/Task.css";

function Task({ task_id, index, name }) {
  return (
    <Draggable draggableId={task_id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={`container ${snapshot.isDragging ? "dragging" : ""}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {name}
        </div>
      )}
    </Draggable>
  );
}

export default Task;
