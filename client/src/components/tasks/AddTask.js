import React, { useState } from "react";
import { useApi } from "../../contexts/ApiProvider";
import { TextField, Button } from "@mui/material";

function AddTaskForm({ onUpdateLists, listID }) {
  const [taskName, setTaskName] = useState("");
  const [isNameValid, setNameValid] = useState(true);

  const handleTaskNameChange = (e) => {
    setNameValid(true);
    setTaskName(e.target.value);
  };

  const api_provider = useApi();

  async function addTask() {
    if (!taskName.trim()) {
      // Check if name is just empty or spaces
      setNameValid(false); // Set the validation state to false
      return;
    }

    const new_task = await api_provider.post("/add_task", {
      name: taskName,
      id: listID,
    });
    console.log(new_task);
    setTaskName("");
    onUpdateLists();
  }

  return (
    <div>
      <TextField
        variant="outlined"
        placeholder="Task name"
        value={taskName}
        onChange={handleTaskNameChange}
        error={!isNameValid} // Show error state when name is not valid
        helperText={!isNameValid ? "Task name cannot be empty" : ""}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={addTask}
        size="medium"
        style={{ marginLeft: "1rem", marginTop: "0.5rem" }}
        // put it in the center vertically
      >
        Add Task
      </Button>
    </div>
  );
}

export default AddTaskForm;
