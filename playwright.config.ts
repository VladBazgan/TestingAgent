import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/ai-center',
  workers: 1,
  use: {
    browserName: 'chromium',
    channel: 'msedge',
    headless: true,
  },
});
