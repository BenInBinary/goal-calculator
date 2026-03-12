import { test, expect } from '@playwright/test';

test('goal calculator UI updates instantly', async ({ page }) => {
  // Go to the local app
  await page.goto('/');

  // Verify the page loaded
  await expect(page.locator('text=Goal Tracker Pro')).toBeVisible();

  // Find the exact text element for the summary result. 
  // By default, $10,000 goal with $500 contribution taking 5% interest takes 1 year and 8 months.
  await expect(page.locator('text=1 year and 8 months')).toBeVisible();

  // Change the contribution input to see if it reacts properly to 1000
  const contributionInput = page.locator('input[name="contribution"]');
  await contributionInput.fill('1000');

  // The math should instantly update to 10 months
  await expect(page.locator('text=10 months')).toBeVisible();
  
  // Test the safety limit edge case
  const goalInput = page.locator('input[name="goal"]');
  await goalInput.fill('1000000');
  await contributionInput.fill('10');
  
  // The app should catch the infinite loop and explicitly print exactly 100 years
  await expect(page.locator('text=100 years')).toBeVisible();
});
