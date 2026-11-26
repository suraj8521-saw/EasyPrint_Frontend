import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],

    server: {
      proxy: {
        "/api": {
          target: env.VITE_PROXY_TARGET,
          changeOrigin: true,
          secure: true,
        },
      },
    },

    build: {
      target: "es2020",
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes("node_modules/react/") ||
              id.includes("node_modules/react-dom/") ||
              id.includes("node_modules/react-router-dom/")
            ) {
              return "react-vendor";
            }
            if (
              id.includes("node_modules/@reduxjs/toolkit/") ||
              id.includes("node_modules/react-redux/")
            ) {
              return "redux-vendor";
            }
            if (
              id.includes("node_modules/lucide-react/") ||
              id.includes("node_modules/react-toastify/")
            ) {
              return "ui-vendor";
            }
          },
        },
      },
    },
  };
});
