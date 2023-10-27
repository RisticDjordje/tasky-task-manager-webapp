import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useApi } from "../../contexts/ApiProvider";

/**
 * EditList component allows the user to edit the name of a list.
 * @param {Object} props - The component props.
 * @param {string} props.columnId - The ID of the list to be edited.
 * @param {string} props.initialName - The initial name of the list to be edited.
 * @param {Function} props.onUpdateLists - The function to be called after the list is updated.
 * @returns {JSX.Element} - The EditList component.
 */
const EditList = ({ columnId, initialName, onUpdateLists }) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState(initialName);
  const [isNameValid, setNameValid] = useState(true); // New state for input validation

  const api_provider = useApi();

  /**
   * Sets the state of the edit dialog to open when called.
   * @function
   * @returns {void}
   */
  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  /**
   * Closes the edit dialog by setting the state of `editDialogOpen` to false.
   */
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  /**
   * Handles the confirmation of editing a list name.
   * If the edited name is empty or just spaces, sets the validation state to false.
   * Otherwise, sends a PATCH request to update the list name and calls onUpdateLists() if successful.
   * Closes the edit dialog regardless of the outcome.
   */
  const handleConfirmEdit = async () => {
    if (!editedName.trim()) {
      // Check if name is just empty or spaces
      setNameValid(false); // Set the validation state to false
      return;
    }

    try {
      const response = await api_provider.patch("/update_list_name", {
        id: columnId,
        name: editedName,
      });

      if (response.ok) {
        console.log("Successfully updated column name.");
        onUpdateLists();
      } else {
        console.error("Failed to update column name.");
      }
    } catch (error) {
      console.error("Error updating column name:", error);
    }

    handleCloseEditDialog();
  };

  return (
    <>
      <IconButton onClick={handleOpenEditDialog}>
        <EditIcon />
      </IconButton>

      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit list name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={editedName}
            onChange={(e) => {
              setNameValid(true); // Reset validation when user types
              setEditedName(e.target.value);
            }}
            error={!isNameValid} // Show error state when name is not valid
            helperText={!isNameValid ? "List name cannot be empty" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmEdit}
            color="primary"
            disabled={!editedName.trim()} // Disable the button if name is empty or just spaces
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditList;
