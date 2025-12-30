import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://eks-projectmanager.eksconstruction.in',
        changeOrigin: true,
        secure: false, // In case of self-signed certs, though unlikely for this domain
      }
    }
  }
})
