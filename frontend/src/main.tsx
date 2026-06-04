import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ServicesProvider, buildServices } from './services/ServicesContext';
import './index.css';

const services = buildServices({
  apiEndpoint: import.meta.env.VITE_API_ENDPOINT,
  debug: import.meta.env.DEV,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ServicesProvider value={services}>
      <App />
    </ServicesProvider>
  </React.StrictMode>,
);
