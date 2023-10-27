import React from "react";
import { Draggable } from "react-beautiful-dnd";
import AddTaskForm from "../tasks/AddTask";
import { styled } from "@mui/material/styles";
import DeleteList from "./DeleteList";
import EditList from "./EditList";
import TaskAccordion from "../tasks/TaskAccordion.js";
import CompletedTasksCount from "./CompletedTasksCount";

const Container = styled("div")({
  margin: "1.5rem 0.6rem",
  border: "2px solid #ddd",
  borderRadius: "5px",
  width: "25vw", // smaller width
  height: "80vh", // smaller height
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f4f7fa",
  minWidth: "250px", // reduced minimum width
});

const TasksContainer = styled("div")({
  flexGrow: 1,
  overflowY: "auto",
  padding: "0.5rem",
  // reduce t
});

const AddTaskContainer = styled("div")({
  borderTop: "1px solid #ccc",
  paddingTop: "0.5rem", // reduced padding
  paddingBottom: "0.5rem", // reduced padding
});

const Title = styled("h3")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 0.8rem", // reduced padding
  margin: "0.8rem 0", // reduced margin
  color: "black",
  flexWrap: "wrap",
  borderBottom: "1px solid #ccc",
  paddingBottom: "0.5rem", // reduced padding
  fontSize: "0.9rem", // smaller font size
});

const ButtonContainer = styled("div")({});

/**
 * Renders a single list component with its tasks and associated actions.
 * @param {Object} props - The component props.
 * @param {number} props.id - The unique identifier of the list.
 * @param {string} props.name - The name of the list.
 * @param {Array} props.tasks - The array of tasks associated with the list.
 * @param {number} props.index - The index of the list in the list of draggable components.
 * @param {function} props.onUpdateLists - The function to update the list of lists.
 * @returns {JSX.Element} - The JSX element representing the list component.
 */
const List = ({ id, name, tasks, index, onUpdateLists }) => {
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Title {...provided.dragHandleProps}>
            <CompletedTasksCount tasks={tasks} />
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
