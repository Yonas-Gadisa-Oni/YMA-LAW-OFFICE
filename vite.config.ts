import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import checker from "vite-plugin-checker";

import dns from "node:dns";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    checker({
      typescript: true,
    }),
  ],

  server: {
    port: 3000,
    host: true,
    allowedHosts: true,
    proxy: {
      "/api": {
        target: process.env.BLOG_API_PORT
          ? `http://localhost:${process.env.BLOG_API_PORT}`
          : "https://yma-law-blog-api.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },

  preview: {
    port: 3000,
    host: true,
    allowedHosts: true,
    proxy: {
      "/api": {
        target: process.env.BLOG_API_PORT
          ? `http://localhost:${process.env.BLOG_API_PORT}`
          : "https://yma-law-blog-api.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    chunkSizeWarningLimit: 5000,
  },
});