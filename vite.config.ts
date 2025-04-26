/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import fs from 'fs';

// Custom plugin to handle PDF.js worker
const pdfWorkerPlugin = (): Plugin => {
  return {
    name: 'pdf-worker-plugin',
    generateBundle(_outputOptions, _bundle) {
      // Check if the worker file exists in node_modules
      const workerPath = path.resolve(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.mjs');
      if (fs.existsSync(workerPath)) {
        // Read the worker file
        const workerCode = fs.readFileSync(workerPath, 'utf-8');

        // Convert ESM to IIFE format
        const iifePdfWorker = `
          (function() {
            ${workerCode.replace(/import\.meta/g, '({})').replace(/export /g, 'var ')}
          })();
        `;

        // Add the worker file to the bundle
        this.emitFile({
          type: 'asset',
          fileName: 'pdf.worker.js',
          source: iifePdfWorker
        });
      }
    }
  };
};

export default defineConfig({
  plugins: [react(), tailwindcss(), pdfWorkerPlugin()],
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
