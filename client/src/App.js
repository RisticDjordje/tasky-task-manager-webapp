import React, { useState } from 'react';
import dataset from './database/dataset';
import DraggableBoard from './components/DraggableBoard';
import './style/App.css';

const App = () => {
  const [data, setData] = useState(dataset);

  return (
    <DraggableBoard data={data} setData={setData} />
  );
};

export default App;
