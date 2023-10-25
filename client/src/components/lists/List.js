import React from "react";
import { Draggable } from "react-beautiful-dnd";
import AddTaskForm from "../tasks/AddTask";
import { styled } from "@mui/material/styles";
import DeleteList from "./DeleteList";
import EditList from "./EditList";
import TaskAccordion from '../tasks/TaskAccordion.js';

const Container = styled("div")({
  margin: "2.5rem 1rem",
  border: "2px solid #ddd",
  borderRadius: "5px",
  width: "60vw",
  height: "70vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f4f7fa",
  overflowY: "auto",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
  minWidth: "450px",
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

          {tasks.map((task) => (
            <TaskAccordion key={task.id} task={task} onUpdateLists={onUpdateLists} />
          ))}

            <div>
              <AddTaskForm onUpdateLists={onUpdateLists} listID={id}/>
            </div>
        </Container>
      )}
    </Draggable>
  );
};

export default List;