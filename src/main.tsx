import React from "react";
import { createRoot } from "react-dom/client";

import "@/assets/styles/base.css";
import App from "@/app/App";
import { ThemeProvider } from "./components/theme-provider";

const root = document.getElementById("root");
if (!root) throw new Error("No root element found");

createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
