import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import tailwindcss from 'tailwindcss/vite';

// Use the function form of defineConfig to get access to the 'mode'
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],

    server: {
      host: true,
      port: 5173,
    },

    // This section is now inside the returned object
    esbuild: {
      // Use the 'mode' variable provided by Vite, which will be 'production' on build
      drop: mode === "production" ? ["console", "debugger"] : [],
    },

    resolve: {
      alias: {
        // The original `path.resolve(__dirname, ...)` can fail in ES modules.
        // This is the modern, robust way to define a path alias in Vite.
        "@": path.resolve(new URL(import.meta.url).pathname, "../src"),
        // A simpler way that also often works if your config is in the frontend root:
        // "@": path.resolve(__dirname, "./src"), // Your original code
      },
    },
  };
});

