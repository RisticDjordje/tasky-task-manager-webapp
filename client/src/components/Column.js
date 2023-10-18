import React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskForm from "./TaskForm";

const Task = styled.div`
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
    margin: 1rem;
    border: 2px solid #ddd;
    border-radius: 5px;
    width: 400px;
    height: 700px;
    display: flex;
    flex-direction: column;
    background-color: #f4f7fa;
    overflow-y: auto;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
    padding: 0 1rem;
    margin: 1rem 0;
    color: black;
    border-radius: 4px;
`;


const TaskList = styled.div`
    padding: 1rem;
    background-color: ${props => (props.isdraggingover ? '#e0e7ec' : 'transparent')};
    min-height: 100px;
    flex-grow: 1;
`;

const Column = ({ id, name, tasks, index, ...props }) => {
  return (
    <>
    <h1>{id}</h1>
    <h2>{index}</h2>
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Title {...provided.dragHandleProps}>{name}</Title>
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
    </Draggable></>
  );
};

export default Column;
