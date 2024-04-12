import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import route from './router';
import '@unocss/reset/normalize.css';
import 'virtual:uno.css';
import './global.css';
import { initDb } from './service/init';

// eslint-disable-next-line react-hooks/rules-of-hooks
initDb();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
