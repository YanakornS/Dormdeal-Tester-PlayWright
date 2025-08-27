import { Page, expect } from '@playwright/test';
import path from 'path';

export class DormDealPageHelpers {
  constructor(private page: Page) {}

  // Test data constants
  static readonly URL = 'https://dormdeal-project.vercel.app';
  static readonly GOOGLE_USERNAME = '654259002';
  static readonly GOOGLE_PASSWORD = '1730201408866';
  static readonly PRODUCT_NAME = 'Air Jordan 1 mid light smoke grey';
  static readonly MAIN_CATEGORY = '67ee888655b50d41195bca16';
  static readonly SUB_CATEGORY = '67ee88a355b50d41195bca22';
  static readonly PRICE = '3200';
  static readonly DESCRIPTION = 'เป็นลอยนิดหน่อยเก็บนานไป';
  static readonly PRICE_EDIT = '65000';

  // Selectors
  static readonly SELECTORS = {
    // Login elements
    loginSign: '[data-test="login-sign"]',
    loginButton: '#login > div > button',
    scrollBottom: '[data-test="scroll-bottom"]',
    acceptButton: '[data-test="accept-button"]',
    googleEmailInput: '#identifierId',
    googleNextButton: '#identifierNext button',
    googlePasswordInput: '[name="Passwd"]',
    googlePasswordNext: '#passwordNext button',

    // Post creation elements
    postButton: '[data-test="post-button"]',
    wantToSell: '[data-test="post-type-wts"]',
    wantToBuy: '[data-test="post-type-wtb"]',
    productNameInput: '#productName',
    categorySelect: '[data-test="category"]',
    subcategorySelect: '[data-test="subcategory"]',
    imageUpload: '[data-test="image-upload"] input[type="file"]',
    priceInput: '#price',
    descriptionInput: '#description',
    conditionUsedAcceptable: '[data-test="used-acceptable"]',
    postTypeFree: '[data-test="postfree"]',
    submitPost: '[data-test="submit-post"]',

    // Profile and management
    profileButton: '[data-test="profile-button"]',
    myAnnouncement: '[data-test="my-announcement"]',
    editPost: '[data-test="icon-edit-post-68a2e3798029d08f61d57336"]',
    editPost2: '[data-test="icon-edit-post-68a2e5228029d08f61d57383"]',
    deletePost: '[data-test="icon-delete-post-68a5705fbb3e6882a83a18e7"]',
    editPrice: '[data-test="edit-price"]',
    submitUpdatePost: '[data-test="submit-update-post"]',
    submitCancelUpdatePost: '[data-test="submit-cancel-update-post"]',

    // Success/Error messages
    swalPostSuccess: '[data-test="swal-post-success"]',
    swalPostFailed: '[data-test="swal-post-failed"]',
    swalImageUploadError: '#swal2-html-container',
    swalUpdateSuccess: '[data-test="swal-post-update-success"]',
    swalCancelUpdate: '[data-test="swal-post-cancel-update-success"]',
    swalConfirmCancelUpdate: '[data-test="swal-post-confirm-cancelupdate"]',
    swalDeletePost: '[data-test="swal-post-delete"]',
    swalConfirmDelete: '[data-test="swal-post-confirm-delete"]',
    headerEditProduct: '[data-test="header-edit-productdetails"]'
  };

  async navigateToHomePage() {
    await this.page.goto(DormDealPageHelpers.URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    // Wait for the page to be fully interactive
    await this.page.waitForFunction(() => document.readyState === 'complete', { timeout: 10000 });
  }

  async loginWithGoogleOAuth() {
    // Click login button with better error handling
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.loginSign, { 
      timeout: 15000, 
      state: 'visible' 
    });
    await this.page.click(DormDealPageHelpers.SELECTORS.loginSign);
    
    // Wait for login modal and click Google login
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.loginButton, { 
      timeout: 10000, 
      state: 'visible' 
    });
    
    // Handle popup - set up listener before triggering
    const popupPromise = this.page.context().waitForEvent('page', { timeout: 15000 });
    
    await this.page.click(DormDealPageHelpers.SELECTORS.loginButton);
    
    // Wait for terms and conditions elements with better selectors
    try {
      await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.scrollBottom, { timeout: 5000 });
      await this.page.click(DormDealPageHelpers.SELECTORS.scrollBottom);
      
      await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.acceptButton, { timeout: 5000 });
      await this.page.click(DormDealPageHelpers.SELECTORS.acceptButton);
    } catch (error) {
      console.log('Terms and conditions elements not found, continuing...');
    }
    
    // Handle Google OAuth popup with timeout
    try {
      const googlePage = await popupPromise;
      
      // Wait for Google login page to load
      await googlePage.waitForLoadState('domcontentloaded', { timeout: 15000 });
      await googlePage.waitForSelector(DormDealPageHelpers.SELECTORS.googleEmailInput, { 
        timeout: 10000, 
        state: 'visible' 
      });
      
      // Enter email with delay
      await googlePage.fill(DormDealPageHelpers.SELECTORS.googleEmailInput, DormDealPageHelpers.GOOGLE_USERNAME);
      await googlePage.waitForTimeout(500);
      await googlePage.click(DormDealPageHelpers.SELECTORS.googleNextButton);
      
      // Wait for password page
      await googlePage.waitForSelector(DormDealPageHelpers.SELECTORS.googlePasswordInput, { 
        timeout: 10000, 
        state: 'visible' 
      });
      
      // Enter password with delay
      await googlePage.fill(DormDealPageHelpers.SELECTORS.googlePasswordInput, DormDealPageHelpers.GOOGLE_PASSWORD);
      await googlePage.waitForTimeout(500);
      await googlePage.click(DormDealPageHelpers.SELECTORS.googlePasswordNext);
      
      // Wait for OAuth completion
      await googlePage.waitForLoadState('networkidle', { timeout: 15000 });
      await this.page.waitForTimeout(1000);
      
      // Close popup if still open
      if (!googlePage.isClosed()) {
        await googlePage.close();
      }
      
      // Wait for main page to show logged in state
      await this.page.waitForLoadState('networkidle', { timeout: 10000 });
      
    } catch (error) {
      console.error('OAuth login failed:', error.message);
      throw new Error(`Google OAuth login failed: ${error.message}`);
    }
  }

  async clickPostButton() {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.postButton, { 
      timeout: 15000, 
      state: 'visible' 
    });
    await this.page.waitForTimeout(500); // Wait for any animations
    await this.page.click(DormDealPageHelpers.SELECTORS.postButton);
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }

  async selectWantToSell() {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.wantToSell, { 
      timeout: 10000, 
      state: 'visible' 
    });
    await this.page.waitForTimeout(500);
    await this.page.click(DormDealPageHelpers.SELECTORS.wantToSell);
    await this.page.waitForTimeout(1000); // Wait for form to load
  }

  async fillProductName() {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.productNameInput, { timeout: 10000 });
    await this.page.fill(DormDealPageHelpers.SELECTORS.productNameInput, DormDealPageHelpers.PRODUCT_NAME);
  }

  async selectCategory() {
    await this.page.waitForSelector('[data-test="category-header"]', { timeout: 10000 });
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.categorySelect, { 
      timeout: 10000, 
      state: 'visible' 
    });
    await this.page.waitForTimeout(500);
    await this.page.selectOption(DormDealPageHelpers.SELECTORS.categorySelect, DormDealPageHelpers.MAIN_CATEGORY);
    await this.page.waitForTimeout(1000); // Wait for subcategory to load
  }

  async selectSubCategory() {
    await this.page.waitForSelector('[data-test="subcategory-header"]', { timeout: 10000 });
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.subcategorySelect, { 
      timeout: 10000, 
      state: 'visible' 
    });
    await this.page.waitForTimeout(500);
    await this.page.selectOption(DormDealPageHelpers.SELECTORS.subcategorySelect, DormDealPageHelpers.SUB_CATEGORY);
    await this.page.waitForTimeout(500);
  }

  async uploadImages() {
    await this.page.waitForSelector('[data-test="image-upload"]', { 
      timeout: 10000, 
      state: 'visible' 
    });
    
    // Create dummy image files paths (you'll need to create these files or modify paths)
    const imagePath1 = path.join(__dirname, '../../RobotTest/resources/images/AirJordan1.jpg');
    const imagePath2 = path.join(__dirname, '../../RobotTest/resources/images/AirJordan2.jpg');
    
    try {
      // Upload multiple files
      await this.page.setInputFiles(DormDealPageHelpers.SELECTORS.imageUpload, [imagePath1, imagePath2]);
      await this.page.waitForTimeout(1000); // Wait for upload to complete
    } catch (error) {
      console.log('Image upload failed, continuing without images for now:', error.message);
      // Continue test without images - this will trigger validation error as expected
    }
  }

  async fillPrice(price: string = DormDealPageHelpers.PRICE) {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.priceInput, { timeout: 10000 });
    await this.page.fill(DormDealPageHelpers.SELECTORS.priceInput, price);
  }

  async fillDescription() {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.descriptionInput, { timeout: 10000 });
    await this.page.fill(DormDealPageHelpers.SELECTORS.descriptionInput, DormDealPageHelpers.DESCRIPTION);
  }

  async selectCondition() {
    await this.page.waitForSelector('[data-test="condition"]', { timeout: 10000 });
    await this.page.click(DormDealPageHelpers.SELECTORS.conditionUsedAcceptable);
  }

  async selectAnnouncementPostType() {
    await this.page.waitForSelector('[data-test="posttype"]', { timeout: 10000 });
    await this.page.click(DormDealPageHelpers.SELECTORS.postTypeFree);
  }

  async submitPost() {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.submitPost, { timeout: 10000 });
    await this.page.click(DormDealPageHelpers.SELECTORS.submitPost);
  }

  async checkPostSuccess(testId: string) {
    try {
      await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.swalPostSuccess, { 
        timeout: 15000, 
        state: 'visible' 
      });
      await this.page.waitForTimeout(1000);
      
      const successText = await this.page.textContent(DormDealPageHelpers.SELECTORS.swalPostSuccess);
      expect(successText?.trim()).toBe('โพสต์สำเร็จ');
      
      // Take screenshot
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await this.page.screenshot({ 
        path: `./screenshots/ManagePost/${testId}_${timestamp}.png`,
        fullPage: true 
      });
    } catch (error) {
      // Take screenshot on failure for debugging
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await this.page.screenshot({ 
        path: `./screenshots/ManagePost/${testId}_FAILED_${timestamp}.png`,
        fullPage: true 
      });
      throw error;
    }
  }

  async checkPostFailed(testId: string) {
    try {
      await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.swalPostFailed, { 
        timeout: 15000, 
        state: 'visible' 
      });
      await this.page.waitForTimeout(1000);
      
      const errorText = await this.page.textContent(DormDealPageHelpers.SELECTORS.swalPostFailed);
      expect(errorText?.trim()).toBe('กรุณากรอกข้อมูลให้ครบถ้วน!');
      
      // Take screenshot
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await this.page.screenshot({ 
        path: `./screenshots/ManagePost/${testId}_${timestamp}.png`,
        fullPage: true 
      });
    } catch (error) {
      // Take screenshot on failure for debugging
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await this.page.screenshot({ 
        path: `./screenshots/ManagePost/${testId}_FAILED_${timestamp}.png`,
        fullPage: true 
      });
      throw error;
    }
  }

  async checkImageUploadError(testId: string) {
    try {
      await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.swalImageUploadError, { 
        timeout: 15000, 
        state: 'visible' 
      });
      await this.page.waitForTimeout(1000);
      
      const errorText = await this.page.textContent(DormDealPageHelpers.SELECTORS.swalImageUploadError);
      expect(errorText?.trim()).toBe('กรุณาอัปโหลดรูปภาพประกอบโพสต์');
      
      // Take screenshot
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await this.page.screenshot({ 
        path: `./screenshots/ManagePost/${testId}_${timestamp}.png`,
        fullPage: true 
      });
    } catch (error) {
      // Take screenshot on failure for debugging
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await this.page.screenshot({ 
        path: `./screenshots/ManagePost/${testId}_FAILED_${timestamp}.png`,
        fullPage: true 
      });
      throw error;
    }
  }

  async clickProfileButton() {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.profileButton, { timeout: 10000 });
    await this.page.click(DormDealPageHelpers.SELECTORS.profileButton);
  }

  async clickMyAnnouncement() {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.myAnnouncement, { timeout: 10000 });
    await this.page.click(DormDealPageHelpers.SELECTORS.myAnnouncement);
  }

  async clickEditPost() {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.editPost, { timeout: 10000 });
    await this.page.click(DormDealPageHelpers.SELECTORS.editPost);
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.headerEditProduct, { timeout: 10000 });
  }

  async clickEditPost2() {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.editPost2, { timeout: 10000 });
    await this.page.click(DormDealPageHelpers.SELECTORS.editPost2);
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.headerEditProduct, { timeout: 10000 });
  }

  async editPrice() {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.editPrice, { timeout: 10000 });
    await this.page.click(DormDealPageHelpers.SELECTORS.editPrice);
    await this.page.fill('#price', DormDealPageHelpers.PRICE_EDIT);
  }

  async submitUpdatePost() {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.submitUpdatePost, { timeout: 10000 });
    await this.page.click(DormDealPageHelpers.SELECTORS.submitUpdatePost);
  }

  async cancelUpdatePost() {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.submitCancelUpdatePost, { timeout: 10000 });
    await this.page.click(DormDealPageHelpers.SELECTORS.submitCancelUpdatePost);
  }

  async checkPostUpdateSuccess(testId: string) {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.swalUpdateSuccess, { timeout: 15000 });
    await this.page.waitForTimeout(1000);
    
    const successText = await this.page.textContent(DormDealPageHelpers.SELECTORS.swalUpdateSuccess);
    expect(successText).toBe('อัปเดตโพสต์สำเร็จ!');
    
    // Take screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ 
      path: `./screenshots/ManagePost/${testId}_${timestamp}.png`,
      fullPage: true 
    });
  }

  async checkPostCancelUpdate(testId: string) {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.swalConfirmCancelUpdate, { timeout: 15000 });
    await this.page.click(DormDealPageHelpers.SELECTORS.swalConfirmCancelUpdate);
    
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.swalCancelUpdate, { timeout: 15000 });
    await this.page.waitForTimeout(1000);
    
    const cancelText = await this.page.textContent(DormDealPageHelpers.SELECTORS.swalCancelUpdate);
    expect(cancelText).toBe('คุณได้ยกเลิกการแก้ไขโพสต์แล้ว');
    
    // Take screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ 
      path: `./screenshots/ManagePost/${testId}_${timestamp}.png`,
      fullPage: true 
    });
  }

  async clickDeletePost() {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.deletePost, { timeout: 10000 });
    await this.page.click(DormDealPageHelpers.SELECTORS.deletePost);
  }

  async checkPostConfirmDelete(testId: string) {
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.swalDeletePost, { timeout: 15000 });
    await this.page.click(DormDealPageHelpers.SELECTORS.swalDeletePost);
    
    await this.page.waitForSelector(DormDealPageHelpers.SELECTORS.swalConfirmDelete, { timeout: 15000 });
    await this.page.waitForTimeout(1000);
    
    const deleteText = await this.page.textContent(DormDealPageHelpers.SELECTORS.swalConfirmDelete);
    expect(deleteText).toBe('ลบสำเร็จ');
    
    // Take screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ 
      path: `./screenshots/ManagePost/${testId}_${timestamp}.png`,
      fullPage: true 
    });
  }
}