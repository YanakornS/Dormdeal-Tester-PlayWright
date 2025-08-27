import { test, expect } from '@playwright/test';
import { DormDealPageHelpers } from './helpers/page-helpers';

test.describe('DormDeal Product Posting Tests', () => {
  test.setTimeout(180000); // 3 นาที สำหรับทุก test

  let pageHelpers: DormDealPageHelpers;

  test.beforeEach(async ({ page }) => {
    pageHelpers = new DormDealPageHelpers(page);
    await pageHelpers.navigateToHomePage();
    await page.waitForTimeout(2000);
  });

  test.afterEach(async ({ page }) => {
    if (test.info().status === 'failed') {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await page.screenshot({ 
        path: `./screenshots/ManagePost/FAILED_${test.info().title}_${timestamp}.png`,
        fullPage: true 
      });
    }
  });

  test('(TC7001) การเพิ่มโพสต์สินค้าสำเร็จ - Successful product post creation', async ({ page }) => {
    // Test adding product posts on the DormDeal website from the login process to the successful submission of the post.
    try {
      await pageHelpers.loginWithGoogleOAuth();
      await page.waitForTimeout(2000); // Wait after login
      
      await pageHelpers.clickPostButton();
      await pageHelpers.selectWantToSell();
      await pageHelpers.fillProductName();
      await pageHelpers.selectCategory();
      await pageHelpers.selectSubCategory();
      await pageHelpers.uploadImages();
      await pageHelpers.fillPrice();
      await pageHelpers.fillDescription();
      await pageHelpers.selectCondition();
      await pageHelpers.selectAnnouncementPostType();
      await pageHelpers.submitPost();
      await pageHelpers.checkPostSuccess('TC7001');
    } catch (error) {
      console.error('TC7001 failed:', error.message);
      throw error;
    }
  });

  test('(TC7002) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่เลือกข้อเสนอ) - Post failure when no offer type selected', async ({ page }) => {
    // Test posting failure when user does not select an offer type; system should show error message
    await pageHelpers.loginWithGoogleOAuth();
    await pageHelpers.clickPostButton();
    // Skip selecting offer type (selectWantToSell)
    await pageHelpers.fillProductName();
    await pageHelpers.selectCategory();
    await pageHelpers.selectSubCategory();
    await pageHelpers.uploadImages();
    await pageHelpers.fillPrice();
    await pageHelpers.fillDescription();
    await pageHelpers.selectCondition();
    await pageHelpers.selectAnnouncementPostType();
    await pageHelpers.submitPost();
    await pageHelpers.checkPostFailed('TC7002');
  });

  test('(TC7003) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่กรอกชื่อสินค้า) - Post failure when no product name', async ({ page }) => {
    // Test posting failure when user does not fill in the product name; system should show error message
    await pageHelpers.loginWithGoogleOAuth();
    await pageHelpers.clickPostButton();
    await pageHelpers.selectWantToSell();
    // Skip filling product name (fillProductName)
    await pageHelpers.selectCategory();
    await pageHelpers.selectSubCategory();
    await pageHelpers.uploadImages();
    await pageHelpers.fillPrice();
    await pageHelpers.fillDescription();
    await pageHelpers.selectCondition();
    await pageHelpers.selectAnnouncementPostType();
    await pageHelpers.submitPost();
    await pageHelpers.checkPostFailed('TC7003');
  });

  test('(TC7004) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่เลือกหมวดหมู่หลัก) - Post failure when no main category selected', async ({ page }) => {
    // Test posting failure when user does not select main category; system should show error message
    await pageHelpers.loginWithGoogleOAuth();
    await pageHelpers.clickPostButton();
    await pageHelpers.selectWantToSell();
    await pageHelpers.fillProductName();
    // Skip selecting main category (selectCategory)
    await pageHelpers.uploadImages();
    await pageHelpers.fillPrice();
    await pageHelpers.fillDescription();
    await pageHelpers.selectCondition();
    await pageHelpers.selectAnnouncementPostType();
    await pageHelpers.submitPost();
    await pageHelpers.checkPostFailed('TC7004');
  });

  test('(TC7005) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่เลือกหมวดย่อย) - Post failure when no sub-category selected', async ({ page }) => {
    // Test posting failure when user does not select sub-category; system should show error message
    await pageHelpers.loginWithGoogleOAuth();
    await pageHelpers.clickPostButton();
    await pageHelpers.selectWantToSell();
    await pageHelpers.fillProductName();
    await pageHelpers.selectCategory();
    // Skip selecting sub-category (selectSubCategory)
    await pageHelpers.uploadImages();
    await pageHelpers.fillPrice();
    await pageHelpers.fillDescription();
    await pageHelpers.selectCondition();
    await pageHelpers.selectAnnouncementPostType();
    await pageHelpers.submitPost();
    await pageHelpers.checkPostFailed('TC7005');
  });

  test('(TC7006) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่ใส่รูป) - Post failure when no image uploaded', async ({ page }) => {
    // Test posting failure when user does not upload image; system should show error message
    await pageHelpers.loginWithGoogleOAuth();
    await pageHelpers.clickPostButton();
    await pageHelpers.selectWantToSell();
    await pageHelpers.fillProductName();
    await pageHelpers.selectCategory();
    await pageHelpers.selectSubCategory();
    // Skip uploading images (uploadImages)
    await pageHelpers.fillPrice();
    await pageHelpers.fillDescription();
    await pageHelpers.selectCondition();
    await pageHelpers.selectAnnouncementPostType();
    await pageHelpers.submitPost();
    await pageHelpers.checkImageUploadError('TC7006');
  });

  test('(TC7007) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่ใส่ราคา) - Post failure when no price entered', async ({ page }) => {
    // Test posting failure when user does not input price; system should show error message
    await pageHelpers.loginWithGoogleOAuth();
    await pageHelpers.clickPostButton();
    await pageHelpers.selectWantToSell();
    await pageHelpers.fillProductName();
    await pageHelpers.selectCategory();
    await pageHelpers.selectSubCategory();
    await pageHelpers.uploadImages();
    // Skip filling price (fillPrice)
    await pageHelpers.fillDescription();
    await pageHelpers.selectCondition();
    await pageHelpers.selectAnnouncementPostType();
    await pageHelpers.submitPost();
    await pageHelpers.checkPostFailed('TC7007');
  });

  test('(TC7008) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่ใส่คำอธิบาย) - Post failure when no description entered', async ({ page }) => {
    // Test posting failure when user does not input description; system should show error message
    await pageHelpers.loginWithGoogleOAuth();
    await pageHelpers.clickPostButton();
    await pageHelpers.selectWantToSell();
    await pageHelpers.fillProductName();
    await pageHelpers.selectCategory();
    await pageHelpers.selectSubCategory();
    await pageHelpers.uploadImages();
    await pageHelpers.fillPrice();
    // Skip filling description (fillDescription)
    await pageHelpers.selectCondition();
    await pageHelpers.selectAnnouncementPostType();
    await pageHelpers.submitPost();
    await pageHelpers.checkPostFailed('TC7008');
  });

  test('(TC7009) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่เลือกสภาพสินค้า) - Post failure when no product condition selected', async ({ page }) => {
    // Test posting failure when user does not select product condition; system should show error message
    await pageHelpers.loginWithGoogleOAuth();
    await pageHelpers.clickPostButton();
    await pageHelpers.selectWantToSell();
    await pageHelpers.fillProductName();
    await pageHelpers.selectCategory();
    await pageHelpers.selectSubCategory();
    await pageHelpers.uploadImages();
    await pageHelpers.fillPrice();
    await pageHelpers.fillDescription();
    // Skip selecting condition (selectCondition)
    await pageHelpers.selectAnnouncementPostType();
    await pageHelpers.submitPost();
    await pageHelpers.checkPostFailed('TC7009');
  });

  test('(TC7010) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่เลือกประเภทประกาศโพสต์) - Post failure when no announcement post type selected', async ({ page }) => {
    // Test posting failure when user does not select announcement post type; system should show error message
    await pageHelpers.loginWithGoogleOAuth();
    await pageHelpers.clickPostButton();
    await pageHelpers.selectWantToSell();
    await pageHelpers.fillProductName();
    await pageHelpers.selectCategory();
    await pageHelpers.selectSubCategory();
    await pageHelpers.uploadImages();
    await pageHelpers.fillPrice();
    await pageHelpers.fillDescription();
    await pageHelpers.selectCondition();
    // Skip selecting announcement post type (selectAnnouncementPostType)
    await pageHelpers.submitPost();
    await pageHelpers.checkPostFailed('TC7010');
  });

  test('(TC7011) การแก้ไขโพสต์ประกาศซื้อขายสินค้า - Edit existing product post successfully', async ({ page }) => {
    // Test Verify that a user can successfully edit an existing product post by updating the price and submitting the changes.
    await pageHelpers.loginWithGoogleOAuth();
    await pageHelpers.clickProfileButton();
    await pageHelpers.clickMyAnnouncement();
    await pageHelpers.clickEditPost();
    await pageHelpers.editPrice();
    await pageHelpers.submitUpdatePost();
    await pageHelpers.checkPostUpdateSuccess('TC7011');
  });

  test('(TC7012) การแก้ไขโพสต์ประกาศซื้อขายสินค้า(กดยกเลิกไม่ต้องการแก้ไข) - Cancel edit of existing product post', async ({ page }) => {
    // Test Verify that a user can cancel the edit of an existing product post without making any changes.
    await pageHelpers.loginWithGoogleOAuth();
    await pageHelpers.clickProfileButton();
    await pageHelpers.clickMyAnnouncement();
    await pageHelpers.clickEditPost2();
    await pageHelpers.cancelUpdatePost();
    await pageHelpers.checkPostCancelUpdate('TC7012');
  });

  test('(TC7013) การลบโพสต์ประกาศซื้อขายสินค้า - Delete existing product post', async ({ page }) => {
    // Test Verify that a user can successfully delete an existing product post and confirm
    await pageHelpers.loginWithGoogleOAuth();
    await pageHelpers.clickProfileButton();
    await pageHelpers.clickMyAnnouncement();
    await pageHelpers.clickDeletePost();
    await pageHelpers.checkPostConfirmDelete('TC7013');
  });
});

test.describe('DormDeal Additional Tests', () => {
  let pageHelpers: DormDealPageHelpers;

  test.beforeEach(async ({ page }) => {
    pageHelpers = new DormDealPageHelpers(page);
    await pageHelpers.navigateToHomePage();
  });

  test('Want To Buy section navigation test', async ({ page }) => {
    // Test navigation to Want To Buy section
    await page.waitForSelector('#root > div > div:nth-child(3) > div > div:nth-child(3) > div > div > div:first-child > a:nth-child(2)', { timeout: 5000 });
    await page.click('#root > div > div:nth-child(3) > div > div:nth-child(3) > div > div > div:first-child > a:nth-child(2)');
    
    // Verify navigation was successful
    await expect(page).toHaveURL(/.*want.*buy.*/i);
  });

  test('Search functionality with no results', async ({ page }) => {
    // Test search functionality that returns no results
    await page.waitForSelector('#root > div > div:nth-child(3) > div:nth-child(3) > div:first-child > div:nth-child(3) > input', { timeout: 5000 });
    await page.click('#root > div > div:nth-child(3) > div:nth-child(3) > div:first-child > div:nth-child(3) > input');
    
    await page.fill('#root > div > div:nth-child(3) > div:nth-child(3) > div:first-child > div:nth-child(3) > input', 'ค้นหาไม่เจออะสิ');
    
    // Wait for "no results found" message
    await page.waitForSelector('text=ไม่พบผลการค้นหา', { timeout: 10000 });
    
    // Verify no results message is displayed
    await expect(page.locator('text=ไม่พบผลการค้นหา')).toBeVisible();
    
    await page.waitForTimeout(3000);
  });
});