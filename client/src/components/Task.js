import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Paper, Typography } from '@mui/material';

function Task({ task_id, index, name }) {
  return (
    <Draggable draggableId={task_id.toString()} index={index}>
      {(provided, snapshot) => (
        <Paper
          elevation={snapshot.isDragging ? 4 : 1}
          sx={{
            padding: '1rem',
            marginBottom: '0.5rem',
            borderRadius: '5px',
            backgroundColor: '#fff',
            boxShadow: snapshot.isDragging ? '0px 2px 6px rgba(0, 0, 0, 0.3)' : '0px 2px 6px rgba(0, 0, 0, 0.1)',
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Typography variant="body1">{name}</Typography>
        </Paper>
      )}
    </Draggable>
  );
}

export default Task;
