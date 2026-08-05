import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// Bewust géén mergeConfig met vite.config.ts: die config bevat de SVG-allowlist-plugin en
// cssInjectedByJsPlugin, die alleen voor de productiebundel bestaan. In jsdom voegen ze niets
// toe en maken ze het lastiger te zien waar een testresultaat vandaan komt.
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // Zelfde override als in vite.config.ts. postcss.config.js in deze map is CommonJS
    // (`module.exports`) terwijl package.json "type": "module" is; zonder deze lege
    // plugin-lijst probeert vite hem te laden en klapt hij op "module is not defined".
    // De echte styling loopt via @tailwindcss/vite, niet via postcss.config.js.
    postcss: {
      plugins: []
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.spec.ts']
  }
})
