// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { createTheme, ThemeProvider } from '@mui/material';
const options={
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 1200
  }
}
const { palette } = createTheme();
const theme = createTheme({
  palette:{
    neutral:palette.augmentColor({ color: {main:"#32cd32"} }),
  },
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </ThemeProvider>
  // </React.StrictMode>
);

