# Playwright Troubleshooting Guide 🛠️

## Common Issues and Solutions

### Issue 1: Tests Not Running at All ❌

**Symptoms:**
- Command hangs after `npx playwright test`
- No output or error messages
- Tests appear to start but never complete

**Solutions:**

#### 1. **Check Browser Installation**
```bash
# Reinstall browsers
npx playwright install --force

# Check if browsers are installed
npx playwright install --dry-run
```

#### 2. **Run with Specific Configuration**
```bash
# Run only Chrome browser
npx playwright test --project=chromium

# Run with timeout
npx playwright test --timeout=60000

# Run in headed mode (visible browser)
npx playwright test --headed
```

#### 3. **Check for Port/Network Issues**
```bash
# Test basic connectivity
ping google.com
ping dormdeal-project.vercel.app
```

### Issue 2: Tests Timeout Immediately ⏰

**Symptoms:**
- "Test timeout of 30000ms exceeded"
- Tests fail on page navigation
- Elements not found errors

**Solutions:**

#### 1. **Increase Timeouts in playwright.config.ts**
```typescript
export default defineConfig({
  timeout: 120000, // 2 minutes per test
  use: {
    actionTimeout: 60000,
    navigationTimeout: 60000,
  }
});
```

#### 2. **Use Simpler Selectors**
```typescript
// Instead of complex XPath
await page.click('[data-test="login-sign"]');

// Instead of
await page.click('xpath=//*[@data-test="login-sign"]');
```

### Issue 3: Google OAuth Fails 🔐

**Symptoms:**
- OAuth popup doesn't appear
- "Failed to login" errors
- Popup closes immediately

**Solutions:**

#### 1. **Check OAuth Credentials**
```typescript
// Verify in .env or page-helpers.ts
GOOGLE_USERNAME=your_test_username
GOOGLE_PASSWORD=your_test_password
```

#### 2. **Use Alternative Login Method**
```typescript
// Skip OAuth for development
test.skip(({ browserName }) => browserName !== 'chromium');
```

### Issue 4: DormDeal Site Not Loading 🌐

**Symptoms:**
- "Navigation timeout" errors
- Blank page screenshots
- "ERR_INTERNET_DISCONNECTED"

**Solutions:**

#### 1. **Check Site Availability**
```bash
# Test in browser manually
# Visit: https://dormdeal-project.vercel.app
```

#### 2. **Use Fallback URLs**
```typescript
// In page-helpers.ts
static readonly URL = 'https://dormdeal-project.vercel.app';
// Backup: static readonly URL = 'http://localhost:5173';
```

## Quick Diagnostic Commands 🔍

### 1. **Test Browser Installation**
```bash
npx playwright --version
npx playwright install chromium
```

### 2. **Run Minimal Test**
```bash
# Create and run this simple test
echo 'import { test } from "@playwright/test"; test("basic", async ({ page }) => { await page.goto("https://google.com"); });' > test-basic.js
npx playwright test test-basic.js --headed
```

### 3. **Check Network Connectivity**
```bash
# Windows
nslookup dormdeal-project.vercel.app
ping dormdeal-project.vercel.app

# Test with curl
curl -I https://dormdeal-project.vercel.app
```

### 4. **Run with Debug Output**
```bash
DEBUG=pw:* npx playwright test debug-simple.spec.ts
```

## Step-by-Step Recovery Process 🔄

### Step 1: Basic Verification
```bash
# 1. Check Node.js version (should be 16+)
node --version

# 2. Check npm/yarn
npm --version

# 3. Reinstall dependencies
npm install

# 4. Reinstall browsers
npx playwright install --force
```

### Step 2: Run Simple Tests
```bash
# 1. Test built-in example
npx playwright test example.spec.ts --headed

# 2. Test our debug script
npx playwright test debug-simple.spec.ts --headed

# 3. Test specific browser
npx playwright test --project=chromium --headed
```

### Step 3: Check Configuration
```bash
# 1. Validate config
npx playwright test --list

# 2. Check for syntax errors
npx tsc --noEmit

# 3. Run with verbose logging
npx playwright test --reporter=list
```

## Common Error Messages and Fixes 🚨

### "No tests found"
```bash
# Fix: Check file patterns
npx playwright test **/*.spec.ts

# Or run from correct directory
cd tests
npx playwright test
```

### "Browser not found"
```bash
# Fix: Install browsers
npx playwright install
```

### "Permission denied"
```bash
# Fix: Run as admin or check file permissions
# Windows: Run PowerShell as Administrator
```

### "Network error"
```bash
# Fix: Check firewall/antivirus
# Add exception for node.exe and playwright browsers
```

## Emergency Fallback Commands 🆘

If nothing works, try these in order:

```bash
# 1. Nuclear option - fresh start
rm -rf node_modules
rm package-lock.json
npm install
npx playwright install

# 2. Use different config
npx playwright test --config=playwright.debug.config.ts

# 3. Run single test with maximum timeout
npx playwright test debug-simple.spec.ts --timeout=300000 --headed

# 4. Check if it's a Windows-specific issue
npx playwright test --project=chromium --headed --reporter=line
```

## Contact Information 📞

If issues persist:
1. Check the screenshots in `./screenshots/ManagePost/` folder
2. Look at the generated HTML report: `npx playwright show-report`
3. Share the specific error message and screenshot

## Useful Debug Commands for Different Scenarios

### For Timeout Issues:
```bash
npx playwright test --timeout=180000 --headed
```

### For Network Issues:
```bash
npx playwright test --ignore-https-errors --headed
```

### For Element Not Found Issues:
```bash
npx playwright test debug-simple.spec.ts --trace=on --headed
```

### For General Debugging:
```bash
npx playwright test --debug
```

Remember: Always run tests one at a time when debugging! 🎯