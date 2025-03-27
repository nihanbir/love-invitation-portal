
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/ale-nihan/",
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["e555c9c1-74f4-4c94-a0d1-99dc18a3a128.lovableproject.com"]
  },
  plugins: [
    react(),
   ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
