import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import RootProvider from './context/RootContext.tsx';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RootProvider>
  </StrictMode>,
);
