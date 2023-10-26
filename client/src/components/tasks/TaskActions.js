import React, { useState } from "react";
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useApi } from "../../contexts/ApiProvider";

const TaskActions = ({ task, onUpdateLists, onSubtaskAdded }) => {
  const api = useApi();
  const [openDialog, setOpenDialog] = useState(false);
  const [subtaskName, setSubtaskName] = useState("");

  const handleDeleteTask = async () => {
    try {
      await api.delete(`/tasks/${task.id}/delete`);
      onUpdateLists();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleAddSubtask = async (subtaskName) => {
    try {
      await api.post(`/tasks/${task.id}/add_subtask`, {
        name: subtaskName,
        list_id: task.list_id,
      });
      onUpdateLists();
      onSubtaskAdded(); // Notify that a subtask was added
    } catch (error) {
      console.error("Failed to add subtask:", error);
      // Consider keeping the dialog open or showing an error message here
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSubtaskName("");
  };

  const handleConfirmAddSubtask = async () => {
    if (subtaskName) {
      await handleAddSubtask(subtaskName);
    }
    handleCloseDialog();
  };

  return (
    <>
      <IconButton onClick={handleDeleteTask} aria-label="Delete task">
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={handleOpenDialog} aria-label="Add subtask">
        <AddIcon />
      </IconButton>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Subtask</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name for the new subtask.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Subtask Name"
            type="text"
            fullWidth
            value={subtaskName}
            onChange={(e) => setSubtaskName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAddSubtask} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskActions;
