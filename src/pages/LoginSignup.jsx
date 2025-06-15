import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { handleSignUp, handleLogin } from '../functions/authHandlers';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';



export default function LoginSignup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

   const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin(
      loginEmail,
      loginPassword,
      setLoginError,
      setLoginSuccess,
      setLoginLoading,
      navigate,
      login
    );
  };
    const handleSignUpSubmit = (e) => {
    e.preventDefault();
    handleSignUp(
      signupName,
      signupEmail,
      signupPassword,
      setSignupError,
      setSignupSuccess,
      () => {
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
      },
      setSignupLoading,
      navigate,
      login 
    );
  };

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper elevation={3} sx={{ display: 'flex', width: '100%', maxWidth: 900, minHeight: 400 }}>
   
        <Box sx={{ flex: 1, p: 4 }} component="form" onSubmit={handleLoginSubmit}>
          <Typography variant="h5">Login</Typography>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            autoComplete="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            autoComplete="current-password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <Snackbar
            open={!!loginSuccess}
            autoHideDuration={3000}
            onClose={() => setLoginSuccess('')}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert onClose={() => setLoginSuccess('')} severity="success" sx={{ width: '100%' }}>
              {loginSuccess}
            </Alert>
          </Snackbar>
          {loginError && <Alert severity="error" sx={{ mt: 1 }}>{loginError}</Alert>}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loginLoading}
          >
            {loginLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ flex: 1, p: 4 }} component="form" onSubmit={handleSignUpSubmit}>
          <Typography variant="h5">Sign Up</Typography>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            autoComplete="name"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            autoComplete="email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            autoComplete="new-password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
          {signupError && <Alert severity="error" sx={{ mt: 1 }}>{signupError}</Alert>}
          <Snackbar
            open={!!signupSuccess}
            autoHideDuration={3000}
            onClose={() => setSignupSuccess('')}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert onClose={() => setSignupSuccess('')} severity="success" sx={{ width: '100%' }}>
              {signupSuccess}
            </Alert>
          </Snackbar>

          <Button
            fullWidth
            type="submit"
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
            disabled={signupLoading}
          >
            {signupLoading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
