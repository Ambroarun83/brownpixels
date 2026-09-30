import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // allow the workspace preview host; HMR protocol/port is derived from the
    // page URL so it works both locally and behind the preview proxy
    allowedHosts: true
  },
  build: { target: 'es2020' }
})
