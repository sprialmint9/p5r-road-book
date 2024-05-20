import React from 'react';
import ReactDOM from 'react-dom/client';
import '@unocss/reset/normalize.css';
import 'virtual:uno.css';
import './global.css';
import { RouterProvider } from 'react-router-dom';
import route from './router';
import { initDb } from './service/init';
import { ToastProvider } from './components/ToastContext';
(async () => {
  await initDb();
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ToastProvider>
        <RouterProvider router={route} />
      </ToastProvider>
    </React.StrictMode>
  );
})();
