import React, { useState } from "react";
import DraggableBoard from "./components/DraggableBoard";
import ApiProvider from "./contexts/ApiProvider";
import { styled } from '@mui/material/styles';

const StyledApp = styled('div')({
  textAlign: 'center',
  '& .App-logo': {
    height: '40vmin',
    pointerEvents: 'none',
    '@media (prefers-reduced-motion: no-preference)': {
      animation: '$appLogoSpin infinite 20s linear',
    },
  },
  '& .App-header': {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
  '& .App-link': {
    color: '#61dafb',
  },
  '@keyframes appLogoSpin': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
});

const App = () => {
  const [data, setData] = useState({
    tasks: {},
    columns: {},
    columnOrder: [],
  });

  return (
    <ApiProvider>
      <StyledApp>
        <DraggableBoard data={data} setData={setData} />
      </StyledApp>
    </ApiProvider>
  );
};

export default App;
