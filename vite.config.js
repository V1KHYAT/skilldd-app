import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/skilldd-app/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        mentor: resolve(__dirname, 'mentor.html'),
        owner: resolve(__dirname, 'owner.html')
      }
    }
  }
})
