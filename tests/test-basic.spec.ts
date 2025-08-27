import { test, expect } from '@playwright/test';

test('Very basic test', async ({ page }) => {
  console.log('Starting very basic test...');
  
  await page.goto('https://www.google.com');
  console.log('Google loaded');
  
  await expect(page).toHaveTitle(/Google/);
  console.log('Title verified');
  
  console.log('Test completed successfully!');
});