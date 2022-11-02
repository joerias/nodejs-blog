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
});