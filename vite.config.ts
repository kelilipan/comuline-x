import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { serwist } from "@serwist/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    serwist({
      swSrc: "src/sw.ts",
      swDest: "sw.js",
      globDirectory: "dist",
      injectionPoint: "self.__SW_MANIFEST",
      rollupFormat: "iife",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://www.api.comuline.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
