import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
  ],
  build: {
    assetsInlineLimit: 10 * 1024, // 10KB - assets smaller than this will be inlined as base64
    rollupOptions: {
      output: {
        dir: './dist',
        entryFileNames: 'index.js',
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        // Add any postcss plugins you might be using
      ]
    }
  },
  assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.ttf', '**/*.eot', '**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg'],
})
