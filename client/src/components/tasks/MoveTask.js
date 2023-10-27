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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Move Task to...</DialogTitle>
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
                  style={{ position: 'absolute', right: 10, top: 10 }}
                >
                  <Tooltip title="Move Task Here">
                  </Tooltip>
                </IconButton>
              </Card>
              {index < lists.length - 1 && <Divider style={{ margin: "8px 0" }} />}
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
