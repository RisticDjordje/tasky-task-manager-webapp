import React, { useState } from 'react';
import { useApi } from "../contexts/ApiProvider";
import { TextField, Button } from '@mui/material';

function TaskForm() {

  const [taskName, setTaskName] = useState('');

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const api_provider = useApi();

  async function addTask() {
    const new_task = await api_provider.post('/add_task', {name: taskName});
    console.log(new_task);
    setTaskName('');
  }

  return (
    <div>
      <TextField
        variant="outlined"
        placeholder="Task name"
        value={taskName}
        onChange={handleTaskNameChange}
      />
      <Button variant="contained" color="primary" onClick={addTask}>
        Add Task
      </Button>
    </div>
  );
}

export default TaskForm;  
