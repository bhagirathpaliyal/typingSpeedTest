import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"



export default defineConfig({
  server:{
    host: true
  },
  plugins: [react()],
  base:'/typingSpeedTest/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
