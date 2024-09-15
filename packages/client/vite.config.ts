import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReactSWC from "@vitejs/plugin-react-swc";
import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		target: "esnext",
	},
	plugins: [viteReactSWC(), TanStackRouterVite()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@cn": fileURLToPath(new URL("./src/components/cn", import.meta.url)),
			"@twc": fileURLToPath(
				new URL("./src/components/tailwind", import.meta.url),
			),
			"@components": fileURLToPath(
				new URL("./src/components", import.meta.url),
			),
			"source-map-js": "source-map",
		},
	},
	server: {
		port: 8080,
	},
	envPrefix: "EXPOSE_",
});
