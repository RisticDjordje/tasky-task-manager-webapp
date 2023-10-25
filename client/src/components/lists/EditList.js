import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useApi } from "../../contexts/ApiProvider";

const EditList = ({ columnId, initialName, onUpdateLists }) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState(initialName);
  const [isNameValid, setNameValid] = useState(true); // New state for input validation

  const api_provider = useApi();

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleConfirmEdit = async () => {
    if (!editedName.trim()) { // Check if name is just empty or spaces
      setNameValid(false);  // Set the validation state to false
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
      <IconButton color="primary" onClick={handleOpenEditDialog}>
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