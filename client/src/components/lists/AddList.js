import React, { useState } from 'react';
import { useApi } from "../../contexts/ApiProvider";
import { TextField, Button, Box } from '@mui/material';

function AddList({ onUpdateLists }) {
  const [listName, setListName] = useState("");
  const [isNameValid, setNameValid] = useState(true); // State for input validation

  const handleListNameChange = (e) => {
    setNameValid(true); // Reset validation when user types
    setListName(e.target.value);
  };

  const api_provider = useApi();

  async function addList() {
    if (!listName.trim()) { // Check if name is just empty or spaces
      setNameValid(false);  // Set the validation state to false
      return;
    }

    const list = await api_provider.post('/add_list', { name: listName });
    onUpdateLists(list);
    console.log(list);
    setListName("");
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap={2}
      p={2}
      bgcolor="#f4f7fa"
      boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
      borderRadius="5px"
      maxWidth="600px"
      margin="0 auto"
    >
      <TextField
        variant="outlined"
        label="List name"
        value={listName}
        onChange={handleListNameChange}
        fullWidth
        error={!isNameValid} // Show error state when name is not valid
        helperText={!isNameValid ? "List name cannot be empty" : ""}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={addList}
      >
        Add List
      </Button>
    </Box>
  );
}

export default AddList;
