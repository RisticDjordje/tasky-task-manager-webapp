import React, { useState } from 'react';
import '../style/TaskForm.css';

function TaskForm({onUpdateTasks}) {

  const [taskName, setTaskName] = useState('');

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const addTask = () => {

    // Create a JSON object with the task data
    const taskData = {
      name: taskName,
      list_id: '1',
      is_completed: false,
      
    };

  }


  return (
    <div>
      <input
        type="text"
        placeholder="Task name"
        value={taskName}
        onChange={handleTaskNameChange}
      />
      <button >Add Task</button>
    </div>
  );
}

export default TaskForm;
