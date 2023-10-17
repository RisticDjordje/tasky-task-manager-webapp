import React, { useState } from 'react';
import '../style/AddList.css'; // You might want to style this component similarly to your TaskForm

function AddList({ onUpdateLists }) {

  const [listName, setListName] = useState('');

  const handleListNameChange = (e) => {
    setListName(e.target.value);
  };

  
const addList = () => {
    const listData = {
      name: listName, // Assuming you've a state to manage the new list's name
    };

    fetch('http://127.0.0.1:3001/add_list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const newList = data.list; // Assuming the backend returns the new list under 'list' key
        onUpdateLists(newList); // Pass the new list details to the callback
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
};

  return (
    <div>
      <input
        type="text"
        placeholder="List name"
        value={listName}
        onChange={handleListNameChange}
      />
      <button onClick={addList}>Add List</button>
    </div>
  );
}

export default AddList;
