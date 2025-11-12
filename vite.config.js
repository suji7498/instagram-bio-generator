import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-htaccess',
      closeBundle: () => {
        try {
          copyFileSync('.htaccess', 'dist/.htaccess')
          console.log('.htaccess file copied to dist folder')
        } catch (err) {
          console.error('Failed to copy .htaccess file:', err)
        }
      }
    }
  ],
  base: '/instagram-bio-generator/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'home/index.html'),
        instagramBio: resolve(__dirname, 'instagram-bio/index.html'),
        search: resolve(__dirname, 'search/index.html'),
        result: resolve(__dirname, 'result/index.html')
      }
    }
  }
})