import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { InitSentry } from '@shared/configs/sentry';

import App from './App.tsx';

InitSentry();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
