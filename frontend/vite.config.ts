import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import postcsspxtovw from "postcss-px-to-viewport";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
		extensions: [".ts", ".js", ".mjs", ".jsx", ".tsx", ".json"],
	},
	plugins: [vue()],
	css: {
		preprocessorOptions: {
			less: {
				additionalData: '@import "./src/assets/less/index.less";',
			},
		},
		postcss: {
			plugins: [
				postcsspxtovw({
					unitToConvert: "px",
					viewportWidth: 750,
					unitPrecision: 6,
					propList: ["*"],
					viewportUnit: "vw",
					fontViewportUnit: "vw",
					selectorBlackList: [],
					minPixelValue: 1,
					mediaQuery: true,
					exclude: [],
					landscape: false,
				}),
			],
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "http://127.0.0.1:8080",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
