import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ToastProvider } from '../src/components/Toast';

createRoot(document.getElementById('root')!).render(
  <ToastProvider position="top-right">
    <App />
  </ToastProvider>
);
