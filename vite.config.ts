import { defineConfig } from 'vite'
import { URL, fileURLToPath } from 'node:url'
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@twc': fileURLToPath(new URL('./src/components/tailwind', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components/default', import.meta.url)),
    },
  },
  envPrefix: "EXPOSE_"
});
