import { expect, test } from '@playwright/test';

test('asks ChatGPT GPT-6-Luna a question @development', { tag: '@development' }, async ({ page }) => {
  const siteUrl = process.env.AI_CENTER_REQ_SITE_URL_1;
  expect(siteUrl, 'AI_CENTER_REQ_SITE_URL_1 must be set').toBeTruthy();

  await page.goto(siteUrl!);
  await page.getByRole('link', { name: /Development/ }).click();
  await page.getByText('Models', { exact: true }).click();

  const provider = page.getByRole('combobox', { name: 'AI provider' });
  const providers = await provider.locator('option').allTextContents();
  const chatGptProvider = providers.find((option) => /chatgpt/i.test(option));
  expect(chatGptProvider, 'ChatGPT provider should be available').toBeTruthy();
  await provider.selectOption({ label: chatGptProvider! });
  await expect(provider.locator('option:checked')).toContainText('ChatGPT');

  const model = page.getByRole('listbox', { name: 'AI model' });
  const lunaModel = model.getByRole('option', { name: 'GPT-6-Luna' });
  await expect(lunaModel).toBeVisible();
  await lunaModel.click();
  await expect(lunaModel).toHaveAttribute('aria-selected', 'true');

  await page.getByText('Models', { exact: true }).click();
  const question = 'ce faci';
  const composer = page.getByPlaceholder(/Describe a task, ask a question/i);
  await composer.fill(question);
  await composer.press('Enter');

  await expect(page.getByText(question, { exact: true })).toBeVisible();
});
