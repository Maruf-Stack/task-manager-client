import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './context/AuthProvider';
import { QueryClientProvider } from '@tanstack/react-query';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
