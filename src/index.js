import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter } from 'react-router-dom';
import LogInContextProvider from './components/Context/Context.jsx';
import App from './App.js'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LogInContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </LogInContextProvider>
  </React.StrictMode>
);