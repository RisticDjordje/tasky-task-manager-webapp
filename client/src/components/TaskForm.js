import React, { useState } from 'react';
import '../style/TaskForm.css';
import { useApi } from "../contexts/ApiProvider";

function TaskForm() {

  const [taskName, setTaskName] = useState('');

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const api_provider = useApi();

  async function addTask() {
    const new_task = await api_provider.post('/add_task', {name: taskName});
    console.log(new_task);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Task name"
        value={taskName}
        onChange={handleTaskNameChange}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default TaskForm;
