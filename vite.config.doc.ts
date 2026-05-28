import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'mosaic-ui': resolve(__dirname, 'src/index.ts'),
    },
  },
  root: 'doc',
  server: {
    port: 1024,
  },
  build: {
    outDir: resolve(__dirname, 'doc-dist'),
  },
})