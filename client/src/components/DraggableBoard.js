import React, { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import '../style/DraggableBoard.css';


const DraggableBoard = ({ data, setData }) => {

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/tasks');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const tasks = await response.json();
                console.log(tasks)
                setData(prevData => ({
                    ...prevData,
                    tasks: {
                        ...prevData.tasks,
                        ...tasks.reduce((acc, task) => {
                            acc[task.id] = task;
                            return acc;
                        }, {})
                    }
                }));
            } catch (error) {
                console.error('Error fetching tasks:', error.message);
            }
        };

        fetchTasks();
    }, [setData]);

    const onDragEnd = (result) => {
        console.log(result); // Log the result object
        const { destination, source, draggableId, type } = result;
        // If there is no destination
        if (!destination) {
            return;
        }

        // If source and destination are the same
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // If you're dragging columns
        if (type === 'column') {
            const newColumnOrder = Array.from(data.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            const newState = {
                ...data,
                columnOrder: newColumnOrder,
            };
            setData(newState);
            return;
        }

        // Anything below this happens if you're dragging tasks
        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        // If dropped inside the same column
        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };
            const newState = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn,
                },
            };
            setData(newState);
            return;
        }

        // If dropped in a different column
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        setData(newState);
    };

return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='all-columns' direction='horizontal' type='column'>
                {(provided) => (
                    <div className="container" {...provided.droppableProps} ref={provided.innerRef}>
                        {data.columnOrder.map((id, index) => {
                            const column = data.columns[id];
                            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
                            return (
                                <Column
                                    key={column.id}
                                    column={column}
                                    tasks={tasks}
                                    index={index}
                                />
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DraggableBoard;