import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import { useApi } from "../../contexts/ApiProvider";

const MoveTask = ({ task, open, onClose, fetchLists }) => {
  const [lists, setLists] = useState([]);
  const api = useApi();

  useEffect(() => {
    const storedColumns = localStorage.getItem("columns");
    if (storedColumns) {
      const allLists = Object.values(JSON.parse(storedColumns));
      const filteredLists = allLists.filter((list) => list.id !== task.list_id); // Filter out the current list
      setLists(filteredLists);
    }
  }, [open, task.list_id]); // Added task.list_id dependency

  const handleMoveTask = async (targetListId) => {
    try {
      const response = await api.patch(`/tasks/${task.id}/move`, {
        list_id: targetListId,
      });
      if (response.ok) {
        fetchLists(); // Assuming fetchLists will update the parent component's state.
        onClose();
      } else {
        console.error("Error moving task:", response.body);
      }
    } catch (error) {
      console.error("Failed to move task:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Move Task to...</DialogTitle>
      <DialogContent dividers>
        <List>
          {lists.map((list, index) => (
            <React.Fragment key={list.id}>
              <ListItem button onClick={() => handleMoveTask(list.id)}>
                <ListItemText primary={list.name} />
              </ListItem>
              {index < lists.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoveTask;
