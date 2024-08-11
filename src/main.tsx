import React from "react";
import { createRoot } from "react-dom/client";

import "@/assets/styles/base.css";
import App from "@/app/App";

const root = document.getElementById("root");
if (!root) throw new Error("No root element found");

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
