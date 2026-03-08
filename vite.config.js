import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({

  plugins: [react()],

  server: {
    host: "0.0.0.0",
    port: 5173,
        allowedHosts: [
      "vite_dev",
      "developer.pdinfinita.app",
      "147.93.32.77",
      "localhost",
      "127.0.0.1"
    ],

    hmr: {
      clientPort: 443,
      host: "developer.pdinfinita.app",
      protocol: "wss"
    }
  }

})