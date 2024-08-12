import { defineConfig } from 'vite'
// import { URL, fileURLToPath } from 'node:url'
import react from "@vitejs/plugin-react-swc";
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@twc': path.resolve(__dirname, './src/components/tailwind'),
      '@components': path.resolve(__dirname, './src/components/default'),
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '@twc': fileURLToPath(new URL('./src/components/tailwind', import.meta.url)),
      // '@components': fileURLToPath(new URL('./src/components/default', import.meta.url)),
    },
  },
  envPrefix: "EXPOSE_"
});
