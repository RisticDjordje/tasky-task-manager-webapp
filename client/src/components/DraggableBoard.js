import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import "../style/DraggableBoard.css";
import { useApi } from "../contexts/ApiProvider";
import AddList from "./AddList";

const DraggableBoard = () => {
  const api_provider = useApi();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    columns: {}, // format: {list_id: {name: list_name, tasks: {object}]}}
    columnOrder: [], // format: [list_id]
  });

  async function fetchLists() {
    try {
      const response = await api_provider.get("/lists");

      let columns = {};
      let columnOrder = [];
      let columnOrderDict = {};

      if (response.ok) {
        for (const list of response.body.lists) {
          columns[list.id] = {
            id: list.id,
            name: list.name,
            tasks: list.tasks,
          };
          columnOrderDict[list.order_index] = list.id;
        }
        // add the list IDs to the columnOrder array in the sorted order of their order indexes in the columnOrderDict
        for (const order_index of Object.keys(columnOrderDict)) {
          columnOrder.push(columnOrderDict[order_index]);
        }
        console.log('columnOrder', columnOrder)
        console.log('columns', columns)

        setData({
          columns: columns,
          columnOrder: columnOrder,
        });
      }
    } catch (error) {
      console.error("Failed to fetch lists:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLists();
  }, [api_provider]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const onDragEnd = async (result) => {
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

      // Prepare the data for the POST request
      const reorderedLists = newColumnOrder.map((id, order_index) => ({
        id,
        order_index,
      }));

      try {
        const response = await api_provider.post("/update_order", {
          lists: reorderedLists,
        });
        if (response.ok) {
          console.log("Successfully updated order indexes on the backend.");
        } else {
          console.error("Failed to update order indexes on the backend.");
        }
      } catch (error) {
        console.error("Error updating order indexes on the backend:", error);
      }
    }
    return;
  };

  return (
    <>
    <h1>{data.columnOrder}</h1>
      <AddList onUpdateLists={fetchLists} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.columnOrder.map((id, index) => {
                const column = data.columns[id];
                return <Column key={column.id} id={column.id} name={column.name} tasks={column.tasks} index={index} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext> 
    </>
  );
};

export default DraggableBoard;
