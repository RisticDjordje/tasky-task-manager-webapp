const dataset = {
  tasks: {
    "task-1": { 
      id: "task-1", 
      content: "Clean house",
      subtasks: {
        "subtask-1": {
          id: "subtask-1",
          content: "Clean the room",
          subsubtasks: {
            "subsubtask-1": {
              id: "subsubtask-1",
              content: "Clean the floor"
            }
          }
        },
      }
    },
  },
  columns: {
      "column-1": { id: "column-1", title: "To-Do", taskIds: ['task-1'] },
      "column-2": { id: "column-2", title: "In progress", taskIds: [] },
      "column-3": { id: "column-3", title: "Completed", taskIds: [] }
  },
  columnOrder: ["column-1", "column-2", "column-3"]
}

// dataset.js
let taskIdIncrement = 5;  // Based on the initial dataset

export const createNewTask = (content) => {
    const newTask = {
        id: `task-${taskIdIncrement}`,
        content: content
    };
    taskIdIncrement++;
    return newTask;
}

export default dataset