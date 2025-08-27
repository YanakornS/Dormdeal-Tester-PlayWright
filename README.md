# DormDeal Playwright Test Suite

This project contains automated tests for the DormDeal application, converted from Robot Framework to Playwright TypeScript.

## Overview

The test suite covers the following functionality:
- Product posting with various validation scenarios
- User authentication via Google OAuth
- Post management (edit, delete, cancel operations)
- Error handling and validation messages

## Test Cases Converted

| Test ID | Description | Original Robot Framework |
|---------|-------------|-------------------------|
| TC7001 | Successful product post creation | ✅ |
| TC7002 | Post failure - no offer type selected | ✅ |
| TC7003 | Post failure - no product name | ✅ |
| TC7004 | Post failure - no main category | ✅ |
| TC7005 | Post failure - no sub-category | ✅ |
| TC7006 | Post failure - no image uploaded | ✅ |
| TC7007 | Post failure - no price entered | ✅ |
| TC7008 | Post failure - no description | ✅ |
| TC7009 | Post failure - no product condition | ✅ |
| TC7010 | Post failure - no announcement type | ✅ |
| TC7011 | Edit existing product post | ✅ |
| TC7012 | Cancel edit operation | ✅ |
| TC7013 | Delete existing product post | ✅ |

## Prerequisites

1. **Node.js** (version 16 or higher)
2. **npm** or **yarn**
3. **Test Images**: Place test images in `RobotTest/resources/images/` directory:
   - `AirJordan1.jpg`
   - `AirJordan2.jpg`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Running Specific Tests

```bash
# Run only posting product tests
npx playwright test posting-products.spec.ts

# Run a specific test case
npx playwright test -g "TC7001"

# Run tests matching a pattern
npx playwright test -g "Post failure"
```

### Browser-Specific Testing

```bash
# Run tests on Chrome only
npx playwright test --project=chromium

# Run tests on Firefox only
npx playwright test --project=firefox

# Run tests on Safari only
npx playwright test --project=webkit
```

## Test Reports

After running tests, you can view detailed reports:

```bash
# Show HTML report
npm run test:report

# Or directly
npx playwright show-report
```

## Project Structure

```
├── tests/
│   ├── helpers/
│   │   └── page-helpers.ts          # Reusable page object methods
│   └── posting-products.spec.ts     # Main test suite
├── screenshots/
│   └── ManagePost/                  # Test screenshots
├── RobotTest/                       # Original Robot Framework tests
├── playwright.config.ts             # Playwright configuration
└── package.json                     # Project dependencies
```

## Key Features

### Page Object Pattern
Tests use a page object pattern with the `DormDealPageHelpers` class to encapsulate common functionality and make tests more maintainable.

### Screenshot Capture
Tests automatically capture screenshots on:
- Test failures
- Successful operations (for verification)
- Error conditions

### Cross-Browser Testing
Tests run on multiple browsers:
- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)

### Robust Waiting
Tests include proper waiting strategies:
- Element visibility waits
- Network idle waits
- Custom timeout configurations

## Configuration

### Environment Variables
Copy `.env.example` to `.env` and update values as needed:

```bash
cp .env.example .env
```

### Playwright Configuration
Main configuration is in `playwright.config.ts`. Key settings:
- Base URL: `https://dormdeal-project.vercel.app`
- Timeout: 30 seconds per action
- Screenshots: On failure
- Video: On failure
- Trace: On retry

## Test Data

### Google OAuth Credentials
The tests use specific test credentials for Google OAuth. In a production environment, you should:
1. Use dedicated test accounts
2. Implement proper credential management
3. Consider using API-based authentication for faster tests

### Product Data
Tests use predefined product data:
- Product Name: "Air Jordan 1 mid light smoke grey"
- Category: Fashion/Shoes
- Price: 3200 THB
- Description: Thai text description

## Troubleshooting

### Common Issues

1. **Browser Installation**
   ```bash
   npx playwright install
   ```

2. **Image Upload Failures**
   - Ensure test images exist in `RobotTest/resources/images/`
   - Check file paths in `page-helpers.ts`

3. **OAuth Failures**
   - Verify test credentials are valid
   - Check for rate limiting or security blocks

4. **Timeout Issues**
   - Increase timeout in `playwright.config.ts`
   - Add explicit waits for slow-loading elements

### Debug Mode
For debugging failed tests:

```bash
# Run in debug mode with browser open
npx playwright test --debug

# Run specific test in debug mode
npx playwright test --debug -g "TC7001"
```

## Migration Notes from Robot Framework

### Key Changes
1. **Syntax**: Robot Framework → TypeScript
2. **Structure**: Keywords → Page Object Methods
3. **Waits**: Selenium waits → Playwright auto-waiting
4. **Screenshots**: Manual → Automatic on failure
5. **Reporting**: Robot logs → Playwright HTML reports

### Benefits of Playwright
- Faster execution
- Better debugging tools
- Auto-waiting for elements
- Parallel test execution
- Modern browser support
- Rich reporting and tracing

## Contributing

When adding new tests:
1. Follow the existing page object pattern
2. Add appropriate waits and assertions
3. Include error handling
4. Update this README with new test cases
5. Ensure cross-browser compatibility

## Support

For issues or questions:
1. Check the Playwright documentation: https://playwright.dev/
2. Review existing test patterns in the codebase
3. Verify browser and dependency versions