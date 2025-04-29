import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: true,
    cssCodeSplit: false, // Prevents CSS code splitting
    target: "es2015", // Target older browsers for compatibility
    rollupOptions: {
      output: {
        format: "iife", // Use IIFE format instead of ESM
        entryFileNames: "index.js", // Name your entry file
        chunkFileNames: "index.js",
        // Use a simple pattern for all assets
        assetFileNames: "index.[ext]",
        // Ensure all code is inlined into a single file
        inlineDynamicImports: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
