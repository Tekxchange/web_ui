import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tsConfigPaths(),
  ],
  server: {
    open: true,
  },
  clearScreen: true,
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
