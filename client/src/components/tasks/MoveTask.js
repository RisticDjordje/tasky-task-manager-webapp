import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  Button,
  Divider,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useApi } from "../../contexts/ApiProvider";

/**
 * Renders a dialog that allows the user to move a task to a different list.
 * @param {Object} props - The component props.
 * @param {Object} props.task - The task to be moved.
 * @param {boolean} props.open - Whether the dialog is open or not.
 * @param {Function} props.onClose - The function to call when the dialog is closed.
 * @param {Function} props.fetchLists - The function to call to fetch the updated list of tasks.
 * @returns {JSX.Element} - The MoveTask component.
 */
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

  /**
   * Moves the task to the specified list.
   * @param {number} targetListId - The ID of the list to move the task to.
   * @returns {Promise<void>} - A Promise that resolves when the task has been moved.
   */
  const handleMoveTask = async (targetListId) => {
    try {
      const response = await api.patch(`/tasks/${task.id}/move`, {
        list_id: targetListId,
      });
      if (response.ok) {
        fetchLists(); 
        onClose();
      } else {
        console.error("Error moving task:", response.body);
      }
    } catch (error) {
      console.error("Failed to move task:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Move task to...</DialogTitle>
      <DialogContent dividers>
        <List>
          {lists.map((list, index) => (
            <React.Fragment key={list.id}>
              <Card elevation={3}>
                <CardActionArea onClick={() => handleMoveTask(list.id)}>
                  <CardContent>
                    <Typography variant="h6">{list.name}</Typography>
                  </CardContent>
                </CardActionArea>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => handleMoveTask(list.id)}
                  style={{ position: "absolute", right: 10, top: 10 }}
                >
                  <Tooltip title="Move Task Here"></Tooltip>
                </IconButton>
              </Card>
              {index < lists.length - 1 && (
                <Divider style={{ margin: "8px 0" }} />
              )}
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
