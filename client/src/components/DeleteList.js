import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useApi } from "../contexts/ApiProvider";

const DeleteList = ({list_id, onUpdateLists}) => {
    const api_provider = useApi();

    async function deleteList() {
      try {
          const response = await api_provider.delete('/delete_list/' + list_id);

          if (!response.ok) {
              throw new Error('Failed to delete the list.');
          }

          onUpdateLists();
          console.log(response.body); // Assuming the response has a body, otherwise adapt this line.

      } catch (error) {
          console.error("Error deleting the list:", error);
          // Optionally: Show an error message to the user.
      }
    }

    return (
        <IconButton color="error" onClick={deleteList}>
            <DeleteIcon />
        </IconButton>
    );
};

export default DeleteList;
