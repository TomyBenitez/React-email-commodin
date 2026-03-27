import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/gallery-proxy': {
        target: 'https://app.simpocity.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gallery-proxy/, ''),
      },
    },
  },
})
