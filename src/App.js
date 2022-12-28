
import { createTheme, IconButton, ThemeProvider } from '@mui/material';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes/Routes';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Toaster } from 'react-hot-toast';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {

  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <div className="max-w-[1440px] mx-auto">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router}></RouterProvider>
          <Toaster position="bottom-center"
            reverseOrder={false}></Toaster>
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </ThemeProvider>
      </ColorModeContext.Provider>

    </div>
  );
}

export default App;
