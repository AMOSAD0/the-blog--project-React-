import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      logout(); // Sign Out
      navigate('/loginOrSignup');
    } else {
      navigate('/loginOrSignup'); // Go to login/signup
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <IconButton edge="start" aria-label="home" sx={{ mr: 2 }}>
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" color="primary" sx={{ flexGrow: 1 }}>
            THE BLOG
          </Typography>

          <Button
            onClick={handleClick}
            color="primary"
            variant="outlined"
          >
            {user ? 'Sign Out' : 'Log in / Sign up'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
