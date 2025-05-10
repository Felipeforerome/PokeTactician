import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HeroUIProvider } from "@heroui/react";
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </StrictMode>,
);
