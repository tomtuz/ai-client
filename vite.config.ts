import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  build: {
    target: 'esnext'
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@cn': fileURLToPath(new URL('./src/components/cn', import.meta.url)),
      '@twc': fileURLToPath(new URL('./src/components/tailwind', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
  envPrefix: "EXPOSE_"
});
