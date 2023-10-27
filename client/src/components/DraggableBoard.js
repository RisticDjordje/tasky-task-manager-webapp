import React, { useEffect, useState, useContext, useCallback } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "./lists/List";
import { useApi } from "../contexts/ApiProvider";
import AddList from "./lists/AddList";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Container = styled("div")({
  display: "flex",
  overflowX: "auto",
  alignItems: "flex-start",
  width: "100%",
});

const DraggableBoard = () => {
  const api_provider = useApi();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    columns: {},
    columnOrder: [],
  });

  const fetchLists = useCallback(async () => {
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
        for (const order_index of Object.keys(columnOrderDict)) {
          columnOrder.push(columnOrderDict[order_index]);
        }

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
  }, [api_provider]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

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

    // Check if you're dragging tasks
    if (type === "task") {
      const sourceColumn = data.columns[source.droppableId];
      const destColumn = data.columns[destination.droppableId];
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      const [removed] = sourceTasks.splice(source.index, 1);

      // Place the task in the new list
      destTasks.splice(destination.index, 0, removed);

      // Update the state with the new tasks
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [source.droppableId]: {
            ...sourceColumn,
            tasks: sourceTasks,
          },
          [destination.droppableId]: {
            ...destColumn,
            tasks: destTasks,
          },
        },
      };
      setData(newData);

      // Send the patch request to update the backend
      try {
        const response = await api_provider.patch(
          `/tasks/${removed.id}/update`,
          {
            list_id: destination.droppableId,
          }
        );
        if (response.ok) {
          fetchLists(); // Refresh lists
        } else {
          throw new Error("Backend update failed");
        }
      } catch (error) {
        console.error("Error moving task between lists:", error);
      }
    }
  };
  return (
    <>
      <AddList onUpdateLists={fetchLists} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {data.columnOrder.map((id, index) => {
                const column = data.columns[id];
                return (
                  <List
                    key={column.id}
                    id={column.id}
                    name={column.name}
                    tasks={column.tasks}
                    index={index}
                    onUpdateLists={fetchLists}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default DraggableBoard;
