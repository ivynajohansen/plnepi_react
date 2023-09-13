import React from 'react';
import { createRoot } from 'react-dom/client';

import AppRouter from './AppRouter';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
      <AppRouter />
  </React.StrictMode>
);
