import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',  // Ensure this matches your backend
        changeOrigin: true,
        // secure: false,
        // ws: true,
    },
  }
}});
