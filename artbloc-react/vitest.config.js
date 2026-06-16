import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  // Vite 8 / Oxc derives lang from the file extension, so plain .js files with JSX
  // fail to parse. We override include/exclude so the filter catches .js files, and
  // set lang: "jsx" (which lands in oxcTransformOptions and overrides the extension
  // check inside transformWithOxc). Safe: no .ts source files are in the Vitest graph.
  oxc: {
    include: /\.[tj]sx?$/,
    exclude: /\/node_modules\//,
    lang: "jsx",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.js"],
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
});
