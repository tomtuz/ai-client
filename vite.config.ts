import { defineConfig } from 'vite'
import { URL, fileURLToPath } from 'node:url'
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  envPrefix: "EXPOSE_"
});
