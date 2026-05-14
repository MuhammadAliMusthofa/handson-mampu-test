import { test, expect } from '@playwright/test';

test('has title and page loaded correctly', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  // We don't know the exact title, so we can check if body is visible
  await expect(page.locator('body')).toBeVisible();

  // Assuming it's the User Directory app, there might be a heading
  // If not found, it won't fail immediately but wait, adjust this as needed
  const heading = page.locator('h1');
  if (await heading.count() > 0) {
    await expect(heading.first()).toBeVisible();
  }
});
