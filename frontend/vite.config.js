import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from 'tailwindcss/vite';

export default defineConfig({
  server: {
    host: true, // or '0.0.0.0'
    port: 5173,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5000',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   '/socket.io': {
    //     target: 'http://localhost:5000',
    //     changeOrigin: true,
    //     ws: true,
    //   }
    // }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
