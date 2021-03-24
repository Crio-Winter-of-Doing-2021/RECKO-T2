import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { createMuiTheme , ThemeProvider} from '@material-ui/core/styles';
import {purple, red} from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: red,
  },
});



ReactDOM.render(
  <BrowserRouter>
   <ThemeProvider theme={theme}>
   <App />
   </ThemeProvider>
   </BrowserRouter>
 , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
