import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ActivePageProvider} from "./context/ActivePageContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ActivePageProvider>
        <App />
      </ActivePageProvider>
  </React.StrictMode>
);