import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  base: "/Innovation_Tracker_KKESH-Frontend", 
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    port: 5173,
  },
});
