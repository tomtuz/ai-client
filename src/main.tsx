import React from "react";
import { createRoot } from "react-dom/client";

import "@/assets/styles/base.css";
import App from "@/app/App";
import { SettingsProvider } from "./providers/settings-provider";
import { ThemeProvider } from "./providers/theme-provider";

const root = document.getElementById("root");
if (!root) throw new Error("No root element found");

createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
