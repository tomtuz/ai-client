import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@cn': path.resolve(__dirname, "./src/components/cn"),
      '@twc': path.resolve(__dirname, './src/components/tailwind'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  envPrefix: "EXPOSE_"
});
