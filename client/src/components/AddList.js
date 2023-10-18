import React, { useState } from 'react';
import '../style/AddList.css'; // You might want to style this component similarly to your TaskForm
import { useApi } from "../contexts/ApiProvider";

function AddList({onUpdateLists}) {

  const [listName, setListName] = useState("");

  const handleListNameChange = (e) => {
    setListName(e.target.value);
  }

  const api_provider = useApi();

  async function addList() {
    const list = await api_provider.post('/add_list', {name: listName});
    onUpdateLists(list);
    console.log(list);
  }

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
