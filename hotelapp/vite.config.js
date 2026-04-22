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
        manualChunks(id) {
          if (id.includes('react-icons')) return 'react-icons'
          if (id.includes('@mui/material')) return 'mui'
          if (id.includes('framer-motion')) return 'framer'
          if (id.includes('lodash')) return 'lodash'
          if (id.includes('lucide-react')) return 'lucide'
          if (id.includes('formik')) return 'formik'
          if (id.includes('yup')) return 'yup'
          if (id.includes('@tanstack')) return 'tanstack'
          if (id.includes('@reduxjs')) return 'redux'
        }
      }
    }
  }
});