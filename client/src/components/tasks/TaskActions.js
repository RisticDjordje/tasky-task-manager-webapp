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
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MoveIcon from "@mui/icons-material/DriveFileMove";
import { useApi } from "../../contexts/ApiProvider";
import MoveTask from "./MoveTask";
import { styled } from "@mui/material/styles";

/**
 * Renders the actions available for a task, such as adding a subtask, moving the task, and deleting the task.
 * @param {Object} props - The component props.
 * @param {Object} props.task - The task object.
 * @param {Function} props.onUpdateLists - The function to update the task lists.
 * @param {Function} props.onSubtaskAdded - The function to call when a subtask is added.
 * @returns {JSX.Element} - The JSX element representing the task actions.
 */
const TaskActions = ({ task, onUpdateLists, onSubtaskAdded }) => {
  const api = useApi();
  const [openDialog, setOpenDialog] = useState(false);
  const [subtaskName, setSubtaskName] = useState("");
  const [openMoveDialog, setOpenMoveDialog] = useState(false);

  /**
   * Sets the state of `openMoveDialog` to `true`.
   * This function is called when the user clicks on a button to open a dialog box for moving a task.
   * @returns {void}
   */
  const handleOpenMoveDialog = () => {
    setOpenMoveDialog(true);
  };

  /**
   * Closes the move dialog.
   */
  const handleCloseMoveDialog = () => {
    setOpenMoveDialog(false);
  };

  /**
   * Deletes a task from the server and updates the task list.
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const handleDeleteTask = async () => {
    try {
      await api.delete(`/tasks/${task.id}/delete`);
      onUpdateLists();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  /**
   * Handles adding a subtask to the current task.
   * @async
   * @param {string} subtaskName - The name of the subtask to add.
   * @returns {Promise<void>}
   */
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

  /**
   * Sets the state of `openDialog` to `true`.
   * @function
   * @returns {void}
   */
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  /**
   * Closes the dialog and resets the subtask name.
   * @function
   * @name handleCloseDialog
   * @returns {void}
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSubtaskName("");
  };

  /**
   * Handles the confirmation of adding a subtask.
   * If subtaskName is truthy, it calls handleAddSubtask with subtaskName.
   * Closes the dialog regardless of whether or not handleAddSubtask was called.
   */
  const handleConfirmAddSubtask = async () => {
    if (subtaskName) {
      await handleAddSubtask(subtaskName);
    }
    handleCloseDialog();
  };

  const SmallIconButton = styled(IconButton)({
    padding: 1, // Reduced padding for smaller button appearance
  });

  return (
    <>
      <Tooltip title="Add Subtask">
        <SmallIconButton onClick={handleOpenDialog} aria-label="Add subtask">
          <AddIcon />
        </SmallIconButton>
      </Tooltip>
      <Tooltip title="Move Task">
        <SmallIconButton
          size="small"
          onClick={handleOpenMoveDialog}
          aria-label="Move task"
        >
          <MoveIcon />
        </SmallIconButton>
      </Tooltip>
      <Tooltip title="Delete Task">
        <SmallIconButton onClick={handleDeleteTask} aria-label="Delete task">
          <DeleteIcon />
        </SmallIconButton>
      </Tooltip>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Subtask</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginBottom: "1rem" }}>
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

      <MoveTask
        open={openMoveDialog}
        onClose={handleCloseMoveDialog}
        task={task}
        fetchLists={onUpdateLists}
      />
    </>
  );
};

export default TaskActions;
