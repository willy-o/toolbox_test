import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import { GlobalContextProvider } from "./context";
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(<GlobalContextProvider>
  <App tab="home" />
</GlobalContextProvider>);

