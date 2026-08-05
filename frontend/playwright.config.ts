import { defineConfig, devices } from '@playwright/test'

/**
 * Draait tegen `vite preview` op een echte productiebuild in plaats van tegen de dev-server:
 * de build inlinet alles tot één index.js, en dát is wat afnemers inbedden. Contrast,
 * focus-volgorde en reflow zijn alleen op dit niveau meetbaar.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    // --host 127.0.0.1: zonder host bindt vite preview alleen op ::1 en is de server
    // onbereikbaar voor Playwright, dat 127.0.0.1 gebruikt.
    command: 'npm run build-only && npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000
  }
})
