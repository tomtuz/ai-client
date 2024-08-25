import '@/assets/styles/base.css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from './components/ErrorBoundary';
import { themeConfig } from './config/theme-config';
import { ChatProvider } from './context/ChatContext';
import { ConfigurationProvider } from './context/ConfigContext';
import { ThemeProvider } from './providers/theme-provider';
import { routeTree } from './routeTree.gen';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({ routeTree });

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error(
    "Failed to find the root element. Please check your HTML file for an element with id 'root'."
  );
}

createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme={themeConfig.defaultTheme}
        storageKey={themeConfig.storageKey}
      >
        <ConfigurationProvider>
          <ChatProvider>
            <RouterProvider router={router} />
          </ChatProvider>
        </ConfigurationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
