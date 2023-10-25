import React, { useState } from 'react';
import { useApi } from "../../contexts/ApiProvider";
import { TextField, Button } from '@mui/material';

function AddTaskForm({ onUpdateLists, listID }) {
  const [taskName, setTaskName] = useState('');
  const [isNameValid, setNameValid] = useState(true); // State for input validation

  const handleTaskNameChange = (e) => {
    setNameValid(true); // Reset validation when user types
    setTaskName(e.target.value);
  };

  const api_provider = useApi();

  async function addTask() {
    if (!taskName.trim()) { // Check if name is just empty or spaces
      setNameValid(false); // Set the validation state to false
      return;
    }

    const new_task = await api_provider.post('/add_task', { name: taskName, id: listID });
    console.log(new_task);
    setTaskName('');
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
      <Button variant="contained" color="primary" onClick={addTask}>
        Add Task
      </Button>
    </div>
  );
}

export default AddTaskForm;
