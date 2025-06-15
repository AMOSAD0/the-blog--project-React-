import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5678',
    },
  },
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <AuthProvider>
           <App />
        </AuthProvider>

      </ThemeProvider>

    </StrictMode>
  </BrowserRouter>
)
