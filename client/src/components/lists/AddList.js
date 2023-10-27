import React, { useState } from "react";
import { useApi } from "../../contexts/ApiProvider";
import { TextField, Button, Box } from "@mui/material";

/**
 * Renders a form to add a new list.
 * @param {Object} props - The component props.
 * @param {Function} props.onUpdateLists - The function to call when a new list is added.
 * @returns {JSX.Element} - The JSX element representing the component.
 */
function AddList({ onUpdateLists }) {
  const [listName, setListName] = useState("");
  const [isNameValid, setNameValid] = useState(true);

  /**
   * Handles changes to the list name input field.
   * @param {Object} e - The event object.
   */
  const handleListNameChange = (e) => {
    setNameValid(true);
    setListName(e.target.value);
  };

  const api_provider = useApi();

  /**
   * Adds a new list to the database.
   * @param {Object} e - The event object.
   */
  async function addList(e) {
    e.preventDefault();

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
      padding={1.5} // Reduced padding
      bgcolor="#f4f7fa"
      boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
      borderRadius="5px"
      maxWidth="600px"
      margin="0 auto"
      border="2px solid #ddd"
    >
      <form onSubmit={addList} style={{ display: "flex", width: "100%" }}>
        <TextField
          variant="outlined"
          label="List name"
          value={listName}
          onChange={handleListNameChange}
          fullWidth
          error={!isNameValid}
          helperText={!isNameValid ? "List name cannot be empty" : ""}
          size="small" // Using smaller size for TextField
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            marginLeft: "2%",
            height: 40,
            lineHeight: "normal", // Adjust line height
            letterSpacing: "normal", // Adjust letter spacing
          }}
        >
          Add List
        </Button>
      </form>
    </Box>
  );
}

export default AddList;
