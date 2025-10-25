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
  esbuild: {
    // drop: ['console', 'debugger'],  // Removes all console.* and debugger statements
    drop: import.meta.env.MODE === "production" ? ['console', 'debugger'] : [],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  // Alternative using build options
  // build: {
  //   minify: 'terser',
  //   terserOptions: {
  //     compress: {
  //       drop_console: true,  // Remove console logs
  //       drop_debugger: true, // Remove debugger statements
  //     },
  //   },
  // },
})
