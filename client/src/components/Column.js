import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskForm from "./AddTask";
import { styled } from "@mui/material/styles";
import DeleteList from "./DeleteList";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';


const Task = styled("div")({
  padding: "1rem",
  marginBottom: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#fff",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
});

const Container = styled("div")({
  margin: "1rem",
  border: "2px solid #ddd",
  borderRadius: "5px",
  width: "60vw",
  height: "70vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f4f7fa",
  overflowY: "auto",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  minWidth: "300px",
});

const Title = styled("h3")({
  display: "flex", // Add this to make it a flex container
  justifyContent: "space-between", // Distribute space between title and button
  alignItems: "center", // Align title and button vertically
  padding: "0 1rem",
  margin: "1rem 0",
  color: "black",
  borderRadius: "4px",
});

const TaskList = styled("div")(({ isdraggingover }) => ({
  padding: "1rem",
  backgroundColor: isdraggingover ? "#e0e7ec" : "transparent",
  minHeight: "100px",
  flexGrow: 1,
}));

const Column = ({ id, name, tasks, index, ...props }) => {
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Title {...provided.dragHandleProps}>
            {name}
            <DeleteList list_id={id} />
          </Title>
          {/* <Droppable droppableId={id.toString()} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isdraggingover={snapshot.isDraggingOver}
              >
                {tasks.map((task, taskIndex) => (
                  <Task
                    key={task.id}
                    task_id={task.id}
                    index={taskIndex}
                    name={task.name}
                  />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable> */}

          {id === 1 && (
            <div>
              <TaskForm />
            </div>
          )}
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
