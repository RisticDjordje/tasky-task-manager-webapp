import React, { useState } from "react";
import DraggableBoard from "./components/DraggableBoard";
import ApiProvider from "./contexts/ApiProvider";
import { styled } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Assuming you have a Navbar component
import Login from './components/auth/Login'; // Assuming you have a Login component
import Register from './components/auth/Register'; // Assuming you have a Register component
import HomePageTitle from './components/Title'; // Assuming you have a Title component
import NotFoundPage from './components/NotFoundPage'; // Assuming you have a NotFoundPage component

const StyledApp = styled('div')({
  textAlign: 'center',
  '& .App-logo': {
    pointerEvents: 'none',
    '@media (prefers-reduced-motion: no-preference)': {
      animation: '$appLogoSpin infinite 20s linear',
    },
  },
  '& .App-header': {
    backgroundColor: '#282c34',
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
      <Router>
        <StyledApp>
          <Navbar />
          <HomePageTitle />
          <Routes>
            <Route path="/" element={<DraggableBoard data={data} setData={setData} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </StyledApp>
      </Router>
    </ApiProvider>
  );
};

export default App;