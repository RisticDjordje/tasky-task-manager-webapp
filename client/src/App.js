import React, { useState, useCallback, useEffect } from 'react';
import DraggableBoard from './components/DraggableBoard';
import AddList from './components/AddList';
import './style/App.css';

const App = () => {
  const initialState = {
    tasks: {},
    lists: {},
    columnOrder: []
  };
  const [data, setData] = useState(initialState);

  const fetchLists = useCallback(async () => {
    try {
      const response = await fetch('http://127.0.0.1:3001/lists');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const lists = await response.json();

      const listsObj = lists.reduce((acc, list) => {
        acc[list.id.toString()] = list;
        return acc;
      }, {});

      const columnOrder = lists.sort((a, b) => a.order_index - b.order_index).map(list => list.id.toString());

      setData({
        ...data,
        lists: listsObj,
        columnOrder: columnOrder
      });
    } catch (error) {
      console.error('Error fetching lists:', error.message);
    }
  }, [data]);

  useEffect(() => {
    fetchLists(); // Fetch lists on initial render
  }, [fetchLists]);

  return (
    <div className="app-container">
      <AddList onUpdateLists={fetchLists} />
      <DraggableBoard data={data} setData={setData} />
    </div>
  );
};

export default App;
