import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import "../style/DraggableBoard.css";
import { useApi } from "../contexts/ApiProvider";

const DraggableBoard = () => {
  const api_provider = useApi();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    columns: {},
    columnOrder: [],
    tasks: {},
  });

  useEffect(() => {
    async function fetchLists() {
      try {
        const response = await api_provider.get("/lists");
        if (response.ok) {
          const formattedData = {
            columns: {},
            columnOrder: [],
            tasks: {},
          };

          for (const list of response.body.lists) {
            formattedData.columns[list.id] = {
              id: list.id,
              name: list.name,
              taskIds: list.tasks,
            };
            formattedData.columnOrder.push(list.id);
          }

          setData(formattedData); // Update the component's state
        }
      } catch (error) {
        console.error("Failed to fetch lists:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLists();
  }, [api_provider]);
  if (loading) {
    return <div>Loading...</div>;
  }

  const onDragEnd = (result) => {
    console.log(result); // Log the result object
    const { destination, source, draggableId, type } = result;
    // If there is no destination
    if (!destination) {
      return;
    }

    // If source and destination are the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If you're dragging columns
    if (type === "column") {
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
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.columnOrder.map((id, index) => {
              const column = data.columns[id];
              return <Column key={column.id} column={column} index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableBoard;
