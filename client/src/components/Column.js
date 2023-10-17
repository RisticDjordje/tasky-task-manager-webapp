import React, { useState } from 'react';
import styled from 'styled-components';
import RecursiveTask from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskForm from './TaskForm'; // Import the TaskForm component

const Container = styled.div`
    margin: 1rem;
    border: 2px solid #ddd;
    border-radius: 5px;
    width: 400px;
    height: 700px;
    display: flex;
    flex-direction: column;
    background-color: #f4f7fa; // Softer background color
    overflow-y: auto;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1); // subtle shadow for depth
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

function Column({column, tasks, index, ...props}) {
    

    const [inputValue, setInputValue] = useState('');

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <Container ref={provided.innerRef} {...provided.draggableProps}>
                    <Title {...provided.dragHandleProps}>{column.title}</Title>
                    <Droppable droppableId={column.id} type='task'>
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isdraggingover={snapshot.isDraggingOver}
                            >
                                {tasks.map((task, index) =>
                                    <RecursiveTask
                                        key={task.id}
                                        task={task}
                                        index={index}
                                    />
                                )}

                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>

                    {column.title === 'To-Do' && (
                        <div>
                            <TaskForm inputValue={inputValue} setInputValue={setInputValue} />
                        </div>
                    )}
                </Container>
            )}
        </Draggable>
    );
}

export default Column;
