import React, { createContext, useState, useEffect } from "react";
import { useApi } from "../contexts/ApiProvider";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const api = useApi(); // <-- Use the useApi hook to get the api object
  const navigate = useNavigate(); // <-- Use the useNavigate hook

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    const savedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (savedUser) {
      setUsername(savedUser);
      setIsLoggedIn(savedIsLoggedIn);
    }
  }, []);

  const login = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
    localStorage.setItem("username", username);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = async () => {
    try {
      const response = await api.post("/logout"); // Send a POST request to the backend using the api object

      if (response.ok) {
        setUsername(null);
        setIsLoggedIn(false);
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
        navigate("/login"); // <-- Redirect to login page after logging out
      } else {
        console.error(`Error logging out: ${response.body.message}`); // Log error message to console
      }
    } catch (error) {
      console.error(`Network error: ${error.message}`); // Log network error to console
    }
  };

  const contextValue = {
    username,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;