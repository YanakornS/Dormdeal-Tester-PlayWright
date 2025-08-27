import { defineConfig, devices } from '@playwright/test';

/**
 * Debug configuration for Playwright tests
 * Use this config when debugging timing issues
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in sequence for debugging */
  fullyParallel: false,
  /* No retries in debug mode to see actual failures */
  retries: 0,
  /* Single worker for debugging */
  workers: 1,
  /* Detailed reporter */
  reporter: [['list'], ['html']],
  /* Extended timeout for debugging */
  timeout: 300000, // 5 minutes
  /* Extended expect timeout */
  expect: {
    timeout: 15000
  },
  
  use: {
    /* Base URL */
    baseURL: 'https://dormdeal-project.vercel.app',
    
    /* Extended timeouts for debugging */
    actionTimeout: 120000, // 2 minutes
    navigationTimeout: 120000, // 2 minutes
    
    /* Always take screenshots */
    screenshot: 'on',
    
    /* Always record video */
    video: 'on',
    
    /* Always collect trace */
    trace: 'on',
    
    /* Slow down actions for debugging */
    launchOptions: {
      slowMo: 1000, // 1 second delay between actions
    },
    
    /* Viewport size */
    viewport: { width: 1280, height: 720 },
    
    /* Ignore HTTPS errors */
    ignoreHTTPSErrors: true,
    
    /* Headful mode for debugging */
    headless: false,
  },

  /* Use only Chrome for debugging */
  projects: [
    {
      name: 'chromium-debug',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        launchOptions: {
          slowMo: 1000,
          args: [
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--disable-dev-shm-usage',
            '--no-sandbox'
          ]
        }
      },
    },
  ],
});