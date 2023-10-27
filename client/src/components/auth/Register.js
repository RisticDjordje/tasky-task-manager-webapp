import React, { useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { useApi } from "../../contexts/ApiProvider";
import AlertMessage from "./AlertMessage";

/**
 * Register component for user registration.
 * @returns {JSX.Element} JSX element containing the registration form.
 */
const Register = () => {
  /**
   * State variables for form data and alert message.
   */
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState({
    key: Date.now(),
    open: false,
    message: "",
    severity: "error",
  });

  /**
   * ApiProvider context for making API requests.
   */
  const api = useApi();

  /**
   * Event handler for input change.
   * @param {Object} e - Event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Function to trigger alert message.
   * @param {string} message - Alert message.
   * @param {string} severity - Severity of alert message.
   */
  const triggerAlert = (message, severity) => {
    setAlert({ key: Date.now(), open: true, message, severity });
  };

  /**
   * Event handler for closing alert message.
   */
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  /**
   * Event handler for form submission.
   * @param {Object} e - Event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      triggerAlert("Passwords do not match!", "error");
      return;
    }

    try {
      const response = await api.post("/register", formData);
      if (response.ok) {
        triggerAlert(
          "Registration successful! Redirecting you to the login page.",
          "success"
        );
        setTimeout(() => {
          window.location.href = "/login";
        }, 800);
      } else {
        // Adjusted for provided error object structure
        triggerAlert(response.body.message, "error");
      }
    } catch (error) {
      triggerAlert(
        error.message || "Server error, please try again later.",
        "error"
      );
    }
  };

  /**
   * Function to render text input field.
   * @param {string} label - Label for input field.
   * @param {string} name - Name of input field.
   * @param {string} type - Type of input field.
   * @param {boolean} autoFocus - Whether input field should be auto-focused.
   * @returns {JSX.Element} JSX element containing the text input field.
   */
  const renderTextField = (label, name, type = "text", autoFocus = false) => (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        fullWidth
        id={name}
        label={label}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        autoFocus={autoFocus}
      />
    </Grid>
  );

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
          Register
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "20px" }}
        >
          <Grid container spacing={2}>
            {renderTextField("Username", "username", "text", true)}
            {renderTextField("Email Address", "email")}
            {renderTextField("Password", "password", "password")}
            {renderTextField("Confirm Password", "confirmPassword", "password")}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Register
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

export default Register;
