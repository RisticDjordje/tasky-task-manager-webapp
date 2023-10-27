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
    // ... (rest of the code for onDragEnd)
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
