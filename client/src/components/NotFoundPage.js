import React from "react";
import { Typography, Button, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

/**
 * Renders a page with a 404 error message and a button to navigate to the homepage.
 * @returns {JSX.Element} JSX element containing the 404 error page.
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ mt: 8, textAlign: "center" }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, color: "primary.main" }} />
      <Typography component="h1" variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Typography sx={{ mb: 2 }}>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFoundPage;
