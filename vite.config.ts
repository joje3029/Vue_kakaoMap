import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src', // 기본적으로 설정되어 있음
    },
  },
  server: {
    port: 8080,
  },
  plugins: [vue()],
})
