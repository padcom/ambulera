import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import acornPrivateMethods from 'acorn-private-methods'

export default defineConfig({
  base: './',
  server: {
    port: 8080
  },
  build: {
    outDir: './dist/app',
    rollupOptions: {
//      acornInjectPlugins: [ acornPrivateMethods ]
    }
  },
  plugins: [
    vue()
  ]
})
