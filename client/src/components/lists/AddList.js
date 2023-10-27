import React, { useState } from "react";
import { useApi } from "../../contexts/ApiProvider";
import { TextField, Button, Box } from "@mui/material";

function AddList({ onUpdateLists }) {
  const [listName, setListName] = useState("");
  const [isNameValid, setNameValid] = useState(true);

  const handleListNameChange = (e) => {
    setNameValid(true);
    setListName(e.target.value);
  };

  const api_provider = useApi();

  async function addList(e) {
    e.preventDefault(); // <-- Prevent default form submission

    if (!listName.trim()) {
      setNameValid(false);
      return;
    }

    const list = await api_provider.post("/add_list", { name: listName });
    onUpdateLists(list);
    setListName("");
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      padding={2}
      bgcolor="#f4f7fa"
      boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
      borderRadius="5px"
      maxWidth="600px"
      margin="0 auto"
    >
      <form onSubmit={addList} style={{ display: "flex", width: "100%" }}>
        {" "}
        {/* <-- Add form element here */}
        <TextField
          variant="outlined"
          label="List name"
          value={listName}
          onChange={handleListNameChange}
          fullWidth
          error={!isNameValid}
          helperText={!isNameValid ? "List name cannot be empty" : ""}
          sx={{ height: 56 }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginLeft: "2%", height: 56 }}
        >
          Add List
        </Button>
      </form>
    </Box>
  );
}

export default AddList;
