import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { BrowserRouter } from 'react-router-dom';
import './index.css';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        {/* Main App component */}
        <App />
        
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
