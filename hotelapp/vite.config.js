import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: "/",
  optimizeDeps: {
    exclude: ['react-icons']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'map-vendor': ['leaflet', 'react-leaflet'],
          'ui-vendor': ['@mui/material', 'framer-motion'],
          'form-vendor': ['formik', 'yup'],
          'query-vendor': ['@tanstack/react-query'],
        }
      }
    },
    chunkSizeWarningLimit: 500,
  }
});