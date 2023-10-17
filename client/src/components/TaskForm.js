import React, { useState } from 'react';
import '../style/TaskForm.css';

function TaskForm() {
  const [taskName, setTaskName] = useState('');

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const addTask = () => {
    // Create a JSON object with the task data
    const taskData = {
      name: taskName,
    };

    // Send a POST request to the Flask endpoint
    fetch('http://127.0.0.1:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle a successful response
        console.log(data.message);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error.message);
      });
  };

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
