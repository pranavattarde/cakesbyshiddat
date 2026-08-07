import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from "./App";
import { SettingsProvider } from './contexts/settings-context';
import "./index.css";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 2, refetchOnWindowFocus: false } } });
ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}><HelmetProvider>
      <BrowserRouter>
        <SettingsProvider><App /></SettingsProvider>
      </BrowserRouter>
    </HelmetProvider></QueryClientProvider>
  </React.StrictMode>
);
