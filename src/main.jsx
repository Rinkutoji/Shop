import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './context/AppProvider';
import { CartProvider } from './context/CartReducer';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AppProvider>
  </React.StrictMode>
);