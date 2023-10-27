import React, { useState } from "react";
import { useApi } from "../../contexts/ApiProvider";
import { TextField, Button, Box } from "@mui/material";

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
      setNameValid(false); // Set the validation state to false
      return;
    }

    try {
      const new_task = await api_provider.post("/add_task", {
        name: taskName,
        id: listID,
      });

      if (new_task.ok) {
        // Check if the response is ok
        console.log("Task added successfully:", new_task);
        setTaskName(""); // Reset the task name
        onUpdateLists(); // Update the lists
      } else {
        console.error("Failed to add task:", new_task);
        // Handle specific error response or show generic error message
      }
    } catch (error) {
      console.error("Error while adding task:", error.message);
      // You might want to inform the user that something went wrong.
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit action (page refresh)
    addTask();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center">
        <TextField
          variant="outlined"
          placeholder="Task name"
          value={taskName}
          onChange={handleTaskNameChange}
          error={!isNameValid}
          helperText={!isNameValid ? "Task name cannot be empty" : ""}
          size="medium"
          sx={{
            flex: 5,
            marginRight: "2%",
            marginLeft: "5%",
            height: 56, // Adjust this value as needed
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          sx={{
            flex: 1,
            marginRight: "5%",
            height: 56, // Matching height with TextField
          }}
        >
          Add Task
        </Button>
      </Box>
    </form>
  );
}

export default AddTaskForm;
