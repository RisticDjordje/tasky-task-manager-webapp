import React from "react";
import { Draggable } from "react-beautiful-dnd";
import AddTaskForm from "../tasks/AddTask";
import { styled } from "@mui/material/styles";
import DeleteList from "./DeleteList";
import EditList from "./EditList";
import TaskAccordion from "../tasks/TaskAccordion.js";

const Container = styled("div")({
  margin: "2.5rem 1rem",
  border: "2px solid #ddd",
  borderRadius: "5px",
  width: "60vw",
  height: "70vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f4f7fa",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
  minWidth: "300px",
});

const TasksContainer = styled("div")({
  flexGrow: 1,
  overflowY: "auto",
});

const AddTaskContainer = styled("div")({
  borderTop: "1px solid #ccc", // Add a line to separate the task list and the add task form
  paddingTop: "1rem", // Add some space above the add task form
  paddingBottom: "1rem", // Add some space below the add task form
});

const Title = styled("h3")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 1rem",
  margin: "1rem 0",
  color: "black",
  borderRadius: "4px",
  flexWrap: "wrap",
  borderBottom: "1px solid #ccc", // Added border around the title
  paddingBottom: "0.7rem", // Added some space below the title
});

const ButtonContainer = styled("div")({
  display: "flex",
  gap: "0.5rem",
});
const List = ({ id, name, tasks, index, onUpdateLists }) => {
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Title {...provided.dragHandleProps}>
            {name}
            <ButtonContainer>
              <EditList
                columnId={id}
                initialName={name}
                onUpdateLists={onUpdateLists}
              />
              <DeleteList list_id={id} onUpdateLists={onUpdateLists} />
            </ButtonContainer>
          </Title>

          <TasksContainer>
            {tasks.map((task) => (
              <TaskAccordion
                key={task.id}
                task={task}
                onUpdateLists={onUpdateLists}
              />
            ))}
          </TasksContainer>

          <AddTaskContainer>
            <AddTaskForm onUpdateLists={onUpdateLists} listID={id} />
          </AddTaskContainer>
        </Container>
      )}
    </Draggable>
  );
};

export default List;
