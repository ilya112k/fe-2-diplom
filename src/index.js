import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Could not find root element");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

