import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material';
import { AuthProvider } from "./context/authContext.tsx";
import { Toaster } from "react-hot-toast";
import AppLoader from './pages/IsBackendReady.tsx';

const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab,serif",
    allVariants: { color: "white" },
  },
});

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <Toaster position='bottom-left' />
      <AppLoader>
        <App />
      </AppLoader>
    </ThemeProvider>
  </AuthProvider>
)
