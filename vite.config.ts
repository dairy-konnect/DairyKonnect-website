import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Local DairyKonnect API (dev only): same origin `/api` and `/feed-static` are proxied here. */
const DEV_API_ORIGIN = 'http://127.0.0.1:5001'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@constants': path.resolve(__dirname, 'src/constants'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: DEV_API_ORIGIN,
        changeOrigin: true,
        secure: false,
      },
      '/feed-static': {
        target: DEV_API_ORIGIN,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
