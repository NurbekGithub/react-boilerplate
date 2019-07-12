import React from 'react';
import './App.css';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('', { useSuspense: false });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {t('KEY')}
        <CssBaseline />
        <Header />
        <main>main</main>
      </div>
    </ThemeProvider>
  );
}

export default App;
