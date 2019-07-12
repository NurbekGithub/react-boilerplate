import React from 'react';
import './App.css';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Header from './components/Header';

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#70583c',
      main: '#a07e56',
      light: '#b39777',
    },
    success: green,
    common: {
      black: '#373435',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Header />
        <main>main</main>
      </div>
    </ThemeProvider>
  );
}

export default App;
