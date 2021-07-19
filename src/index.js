import React from 'react';
import { CartProvider, UserProvider } from "./Store";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <CartProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </CartProvider>,
  document.getElementById("root")
);
