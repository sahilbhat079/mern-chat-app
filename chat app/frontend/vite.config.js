import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Replace with your API server URL
        changeOrigin: true,
        secure: false,
        ws: true,
    },
  }
}});
