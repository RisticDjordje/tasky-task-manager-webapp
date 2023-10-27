import React, { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { AuthContext } from "../contexts/AuthContext";

/**
 * Navbar component that displays the app title, user welcome message, and authentication buttons.
 * @returns {JSX.Element} JSX element containing the Navbar component.
 */
const Navbar = () => {
  const { username, isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust 'sm' as needed

  /**
   * Function that handles the logout process by calling the logout function and navigating to the login page.
   */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar
        style={{ justifyContent: "space-between", position: "relative" }}
      >
        {/* Left Side - App Title */}
        <Typography variant="h6">Tasky - Task Manager</Typography>

        {/* Center - Welcome Message */}
        {!isMobile && isLoggedIn && (
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Typography variant="subtitle1">Welcome, {username}</Typography>
          </Box>
        )}

        {/* Right Side - Auth Buttons */}
        <Box>
          {isLoggedIn ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<ExitToAppIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
