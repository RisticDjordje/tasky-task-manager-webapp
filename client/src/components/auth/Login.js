import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { useApi } from "../../contexts/ApiProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";

const Login = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    key: Date.now(),
    open: false,
    message: "",
    severity: "error",
  });

  const navigate = useNavigate(); // <-- Use the useNavigate hook
  const api = useApi();
  const { login, isLoggedIn } = useContext(AuthContext); // <-- Destructure isLoggedIn from context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const triggerAlert = (message, severity) => {
    setAlert({ key: Date.now(), open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // <-- Redirect to home page if user is logged in
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", formData);
      if (response.ok) {
        login(response.body.username); // Update login state with user data
        triggerAlert(
          "Login successful! Redirecting you to home page",
          "success"
        );
      } else {
        triggerAlert(response.body.message, "error");
      }
    } catch (error) {
      triggerAlert(
        error.message || "Server error, please try again later.",
        "error"
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "20px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="login"
                label="Email or Username"
                name="login"
                value={formData.login}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Login
          </Button>
        </form>
        {alert.open && (
          <AlertMessage
            key={alert.key}
            open={alert.open}
            message={alert.message}
            severity={alert.severity}
            onClose={handleCloseAlert}
            style={{ width: "100%", marginTop: "20px" }}
          />
        )}
      </Paper>
    </Container>
  );
};

export default Login;
