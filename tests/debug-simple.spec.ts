import { test, expect } from '@playwright/test';

test.describe('Simple Debug Test', () => {
  test('Basic test that should work', async ({ page }) => {
    console.log('Test started...');
    
    try {
      // Try to navigate to Google (should always work)
      await page.goto('https://www.google.com', { timeout: 30000 });
      console.log('✅ Google loaded successfully');
      
      // Take a screenshot
      await page.screenshot({ path: './screenshots/ManagePost/debug_google.png' });
      
      // Try to find the search box
      const searchBox = await page.locator('input[name="q"]').first();
      await expect(searchBox).toBeVisible({ timeout: 10000 });
      console.log('✅ Search box found');
      
    } catch (error) {
      console.error('❌ Test failed:', error.message);
      await page.screenshot({ path: './screenshots/ManagePost/debug_failed.png' });
      throw error;
    }
  });

  test('DormDeal basic navigation test', async ({ page }) => {
    console.log('Testing DormDeal navigation...');
    
    try {
      // Navigate to DormDeal
      await page.goto('https://dormdeal-project.vercel.app', { 
        timeout: 60000,
        waitUntil: 'domcontentloaded'
      });
      console.log('✅ DormDeal page loaded');
      
      // Take a screenshot
      await page.screenshot({ path: './screenshots/ManagePost/debug_dormdeal.png', fullPage: true });
      
      // Wait for page to be interactive
      await page.waitForLoadState('networkidle', { timeout: 30000 });
      console.log('✅ Page is interactive');
      
      // Check if login button exists
      const loginButton = page.locator('[data-test="login-sign"]');
      const isVisible = await loginButton.isVisible();
      console.log(`Login button visible: ${isVisible}`);
      
      if (isVisible) {
        console.log('✅ Login button found successfully');
      } else {
        console.log('⚠️ Login button not found, checking page content...');
        const pageContent = await page.textContent('body');
        console.log('Page content preview:', pageContent?.substring(0, 200));
      }
      
    } catch (error) {
      console.error('❌ DormDeal test failed:', error.message);
      await page.screenshot({ path: './screenshots/ManagePost/debug_dormdeal_failed.png', fullPage: true });
      
      // Log page URL and title for debugging
      console.log('Current URL:', page.url());
      console.log('Page title:', await page.title().catch(() => 'Unable to get title'));
      
      throw error;
    }
  });
});