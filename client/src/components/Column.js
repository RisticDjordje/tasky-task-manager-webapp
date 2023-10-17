import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TaskForm from './TaskForm';

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

const Column = ({ column, index, onUpdateTasks, ...props }) => {
    const [inputValue, setInputValue] = React.useState(''); // Initialize the state

    return (
        <Draggable draggableId={column.id.toString()} index={index}>
            {(provided) => (
                <Container ref={provided.innerRef} {...provided.draggableProps}>
                    <Title {...provided.dragHandleProps}>{column.name}</Title>
                    <Droppable droppableId={column.id.toString()} type='task'>
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isdraggingover={snapshot.isDraggingOver}
                            >
                                {/* Placeholder: You might want to render tasks here like you did in the second snippet */}
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>

                    {column.id === 1 && (
                        <div>
                            <TaskForm inputValue={inputValue} setInputValue={setInputValue} onUpdateTasks={onUpdateTasks} />
                        </div>
                    )}
                </Container>
            )}
        </Draggable>
    );
};

export default Column;
// function Column({ column, tasks, index, onUpdateTasks, ...props }) {
//     console.log("Column props:", {onUpdateTasks});


//     const [inputValue, setInputValue] = useState('');

//     return (
//         <Draggable draggableId={column.id} index={index}>
//             {(provided) => (
//                 <Container ref={provided.innerRef} {...provided.draggableProps}>
//                     <Title {...provided.dragHandleProps}>{column.title}</Title>
//                     <Droppable droppableId={column.id} type='task'>
//                         {(provided, snapshot) => (
//                             <TaskList
//                                 ref={provided.innerRef}
//                                 {...provided.droppableProps}
//                                 isdraggingover={snapshot.isDraggingOver}
//                             >
//                                 {tasks.map((task, index) =>
//                                     <RecursiveTask
//                                         key={task.id}
//                                         task={task}
//                                         index={index}
//                                     />
//                                 )}

//                                 {provided.placeholder}
//                             </TaskList>
//                         )}
//                     </Droppable>

//                     {column.title === 'To-Do' && (
//                         <div>
//                             <TaskForm inputValue={inputValue} setInputValue={setInputValue} onUpdateTasks={onUpdateTasks} />
//                         </div>
//                     )}
//                 </Container>
//             )}
//         </Draggable>
//     );
// }

// export default Column;
