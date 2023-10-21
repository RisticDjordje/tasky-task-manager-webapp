import React from "react";
import { Button, TextField, Checkbox } from "@mui/material";
import { useState } from "react";
import { useApi } from "../contexts/ApiProvider";
import { Typography } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";

const TaskActions = ({ task, onUpdateLists }) => {
  const api = useApi();
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.name);
  const [openDialog, setOpenDialog] = useState(false);
  const [subtaskName, setSubtaskName] = useState("");

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


  const handleEditTask = async () => {
    try {
      await api.patch(`/tasks/${task.id}/update`, {
        name: newTaskName,
        list_id: task.list_id,
        parent_id: task.parent_id,
      });
      setIsEditing(false);
      onUpdateLists();
    } catch (error) {
      console.error("Failed to edit task:", error);
    }
  };

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
    } catch (error) {
      console.error("Failed to add subtask:", error);
    }
  };

  const handleCheckboxChange = async (taskId, newStatus) => {
    try {
      const updated_task = await api.patch("/tasks/" + taskId + "/update", {
        name: task.name,
        is_completed: newStatus,
        list_id: task.list_id,
        parent_id: task.parent_id,
      });
      console.log(updated_task);
      onUpdateLists();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

return (
    <>
      <Checkbox
        checked={task.is_completed}
        inputProps={{ "aria-label": "controlled" }}
        onChange={() => handleCheckboxChange(task.id, !task.is_completed)}
      />
      {isEditing ? (
        <>
          <TextField value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} />
          <Button onClick={handleEditTask}>Save</Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </>
      ) : (
        <>
          <Typography>{task.name}</Typography>
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
          <Button onClick={handleDeleteTask}>Delete</Button>
          <Button onClick={handleOpenDialog}>Add Subtask</Button>

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
      )}
    </>
);
}
export default TaskActions;
