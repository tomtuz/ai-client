// vite.config.ts
import { TanStackRouterVite } from "file:///C:/rcm/ai-client/node_modules/.pnpm/@tanstack+router-plugin@1.49.3_vite@5.4.2_@types+node@22.5.0_/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import viteReactSWC from "file:///C:/rcm/ai-client/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.0_vite@5.4.2_@types+node@22.5.0_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "file:///C:/rcm/ai-client/node_modules/.pnpm/vite@5.4.2_@types+node@22.5.0/node_modules/vite/dist/node/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/rcm/ai-client/packages/client/vite.config.ts";
var vite_config_default = defineConfig({
  build: {
    sourcemap: true,
    target: "esnext"
  },
  plugins: [viteReactSWC(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "@cn": fileURLToPath(new URL("./src/components/cn", __vite_injected_original_import_meta_url)),
      "@twc": fileURLToPath(
        new URL("./src/components/tailwind", __vite_injected_original_import_meta_url)
      ),
      "@components": fileURLToPath(
        new URL("./src/components", __vite_injected_original_import_meta_url)
      ),
      "source-map-js": "source-map"
    }
  },
  server: {
    // port: 8080,
    proxy: {
      "/api": "http://localhost:3001"
    }
  },
  envPrefix: "EXPOSE_"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxyY21cXFxcYWktY2xpZW50XFxcXHBhY2thZ2VzXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxccmNtXFxcXGFpLWNsaWVudFxcXFxwYWNrYWdlc1xcXFxjbGllbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3JjbS9haS1jbGllbnQvcGFja2FnZXMvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSBcIkB0YW5zdGFjay9yb3V0ZXItcGx1Z2luL3ZpdGVcIjtcbmltcG9ydCB2aXRlUmVhY3RTV0MgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHsgVVJMLCBmaWxlVVJMVG9QYXRoIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRidWlsZDoge1xuXHRcdHNvdXJjZW1hcDogdHJ1ZSxcblx0XHR0YXJnZXQ6IFwiZXNuZXh0XCIsXG5cdH0sXG5cdHBsdWdpbnM6IFt2aXRlUmVhY3RTV0MoKSwgVGFuU3RhY2tSb3V0ZXJWaXRlKCldLFxuXHRyZXNvbHZlOiB7XG5cdFx0YWxpYXM6IHtcblx0XHRcdFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKSxcblx0XHRcdFwiQGNuXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjL2NvbXBvbmVudHMvY25cIiwgaW1wb3J0Lm1ldGEudXJsKSksXG5cdFx0XHRcIkB0d2NcIjogZmlsZVVSTFRvUGF0aChcblx0XHRcdFx0bmV3IFVSTChcIi4vc3JjL2NvbXBvbmVudHMvdGFpbHdpbmRcIiwgaW1wb3J0Lm1ldGEudXJsKSxcblx0XHRcdCksXG5cdFx0XHRcIkBjb21wb25lbnRzXCI6IGZpbGVVUkxUb1BhdGgoXG5cdFx0XHRcdG5ldyBVUkwoXCIuL3NyYy9jb21wb25lbnRzXCIsIGltcG9ydC5tZXRhLnVybCksXG5cdFx0XHQpLFxuXHRcdFx0XCJzb3VyY2UtbWFwLWpzXCI6IFwic291cmNlLW1hcFwiLFxuXHRcdH0sXG5cdH0sXG5cdHNlcnZlcjoge1xuXHRcdC8vIHBvcnQ6IDgwODAsXG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMScsXG4gICAgfVxuXHR9LFxuXHRlbnZQcmVmaXg6IFwiRVhQT1NFX1wiLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRSLFNBQVMsMEJBQTBCO0FBQy9ULE9BQU8sa0JBQWtCO0FBQ3pCLFNBQVMsS0FBSyxxQkFBcUI7QUFDbkMsU0FBUyxvQkFBb0I7QUFIb0osSUFBTSwyQ0FBMkM7QUFLbE8sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsT0FBTztBQUFBLElBQ04sV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLEVBQ1Q7QUFBQSxFQUNBLFNBQVMsQ0FBQyxhQUFhLEdBQUcsbUJBQW1CLENBQUM7QUFBQSxFQUM5QyxTQUFTO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTixLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3BELE9BQU8sY0FBYyxJQUFJLElBQUksdUJBQXVCLHdDQUFlLENBQUM7QUFBQSxNQUNwRSxRQUFRO0FBQUEsUUFDUCxJQUFJLElBQUksNkJBQTZCLHdDQUFlO0FBQUEsTUFDckQ7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNkLElBQUksSUFBSSxvQkFBb0Isd0NBQWU7QUFBQSxNQUM1QztBQUFBLE1BQ0EsaUJBQWlCO0FBQUEsSUFDbEI7QUFBQSxFQUNEO0FBQUEsRUFDQSxRQUFRO0FBQUE7QUFBQSxJQUVMLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxJQUNWO0FBQUEsRUFDSDtBQUFBLEVBQ0EsV0FBVztBQUNaLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
