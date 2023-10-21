import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link component={RouterLink} to="/" color="inherit" style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <HomeIcon style={{ marginRight: '8px' }} />
          <Typography variant="h6">
            Home
          </Typography>
        </Link>
        <Button color="inherit" component={RouterLink} to="/login">
          Login
        </Button>
        <Button color="inherit" component={RouterLink} to="/register">
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
