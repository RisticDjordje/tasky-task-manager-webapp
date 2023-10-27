import React, { useState } from "react";
import { useApi } from "../../contexts/ApiProvider";
import { TextField, Button, Box } from "@mui/material";

/**
 * Renders a form to add a new task to a list.
 * @param {Object} props - The component props.
 * @param {Function} props.onUpdateLists - The function to update the lists.
 * @param {string} props.listID - The ID of the list to add the task to.
 * @returns {JSX.Element} - The JSX element for the AddTaskForm component.
 */
function AddTaskForm({ onUpdateLists, listID }) {
  const [taskName, setTaskName] = useState("");
  const [isNameValid, setNameValid] = useState(true);

  /**
   * Updates the task name state when the input value changes.
   * @param {Object} e - The event object.
   */
  const handleTaskNameChange = (e) => {
    setNameValid(true);
    setTaskName(e.target.value);
  };

  const api_provider = useApi();

  /**
   * Sends a POST request to add a new task to the list.
   */
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

  /**
   * Handles the form submit event.
   * @param {Object} e - The event object.
   */
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
          size="small"
          sx={{
            flex: 5,
            marginRight: "2%",
            marginLeft: "5%",
            height: "2.5rem",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          sx={{
            flex: 1,
            marginRight: "5%",
            height: "2.5rem",
            lineHeight: "normal", // Adjust line height
            letterSpacing: "normal", // Adjust letter spacing
          }}
        >
          Add Task
        </Button>
      </Box>
    </form>
  );
}

export default AddTaskForm;
