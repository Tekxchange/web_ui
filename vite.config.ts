import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tsConfigPaths()],
  clearScreen: true,
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
