import React, { useState } from "react";
import DraggableBoard from "./components/DraggableBoard";
import AddList from "./components/AddList";
import "./style/App.css";
import ApiProvider from "./contexts/ApiProvider";


const App = () => {
  const [data, setData] = useState({
    tasks: {},
    columns: {},
    columnOrder: [],
  });


  return (
    <>
      <ApiProvider>
          <DraggableBoard data={data} setData={setData} />
      </ApiProvider>
    </>
  );
};

export default App;
