import { expect, test } from '@playwright/test';

async function openAiCenter(page: import('@playwright/test').Page) {
  const siteUrl = process.env.AI_CENTER_REQ_SITE_URL_1;
  expect(siteUrl, 'AI_CENTER_REQ_SITE_URL_1 must be set').toBeTruthy();

  await page.setExtraHTTPHeaders({ 'ngrok-skip-browser-warning': 'true' });
  await page.goto(siteUrl!, { waitUntil: 'domcontentloaded' });
}

test('dashboard shows workspace search and app entry points @dashboard', { tag: '@dashboard' }, async ({ page }) => {
  await openAiCenter(page);

  await expect(page.getByText('AI command center', { exact: true })).toBeVisible();
  await expect(page.getByText('Universal Search', { exact: true })).toBeVisible();
  await expect(page.getByText('Find your projects, Windows apps, conversations and AI Center features')).toBeVisible();
  await expect(page.getByRole('link', { name: /AI Code/ }).last()).toBeVisible();
  await expect(page.getByRole('link', { name: /AI Test/ }).last()).toBeVisible();
  await expect(page.getByRole('link', { name: /Task Scheduler/ })).toBeVisible();
});

test('sidebar opens the AI Center work areas @navigation', { tag: '@navigation' }, async ({ page }) => {
  await openAiCenter(page);

  const screens = [
    { href: '#/shortcuts', text: 'Saved tasks that start an AI Code conversation' },
    { href: '#/code', text: 'Start a new session' },
    { href: '#/code/changes', text: 'Repositories in' },
    { href: '#/code/editor', text: 'Editor' },
    { href: '#/code/terminal', text: 'Terminal' },
    { href: '#/code/esp', text: 'BUILD FOR THE BOARD.' },
    { href: '#/test/requirements', text: 'New requirement' },
    { href: '#/test/changes', text: 'REVIEW. COMMIT. PUSH.' },
    { href: '#/test/pipeline', text: 'Workflow runs' },
    { href: '#/memory', text: 'Memory' },
    { href: '#/instructions', text: 'Instructions' },
    { href: '#/permissions', text: 'Permissions' },
    { href: '#/settings', text: 'Settings' },
    { href: '#/os', text: 'File Explorer' },
  ];

  for (const screen of screens) {
    await page.locator(`a[href="${screen.href}"]`).last().click();
    await expect(page).toHaveURL(new RegExp(screen.href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'));
    await expect(page.locator('body')).toContainText(screen.text, { timeout: 15_000 });
  }
});
