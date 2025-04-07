import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/Auth';
import { SearchProvider } from './context/search';
import { CartProvider } from './context/cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchProvider>
      <CartProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </CartProvider>
    </SearchProvider>
  </React.StrictMode>
);

// If you want to measure performance
reportWebVitals();
