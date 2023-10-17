import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../style/Task.css';  // Import the new CSS file

function Task(props) {
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <div
                    className={`container ${snapshot.isDragging ? 'dragging' : ''}`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {props.task.content}
                </div>
            )}
        </Draggable>
    );
}

export default Task;
