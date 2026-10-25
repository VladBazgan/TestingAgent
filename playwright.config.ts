import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/ai-center',
  workers: 1,
  use: {
    browserName: 'chromium',
    channel: process.env.CI ? undefined : 'msedge',
    headless: true,
  },
});
