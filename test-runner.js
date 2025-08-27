#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

// Test scenarios mapping
const testScenarios = {
  'all': 'npx playwright test',
  'success': 'npx playwright test -g "TC7001"',
  'failures': 'npx playwright test -g "Post failure"',
  'management': 'npx playwright test -g "TC701[1-3]"',
  'posting': 'npx playwright test posting-products.spec.ts',
  'debug': 'npx playwright test --debug',
  'headed': 'npx playwright test --headed',
  'ui': 'npx playwright test --ui'
};

// Get command line argument
const scenario = process.argv[2];

if (!scenario || !testScenarios[scenario]) {
  console.log('🎭 DormDeal Playwright Test Runner');
  console.log('Usage: npm run test-runner <scenario>');
  console.log('\nAvailable scenarios:');
  console.log('  all       - Run all tests');
  console.log('  success   - Run successful posting test (TC7001)');
  console.log('  failures  - Run all failure validation tests');
  console.log('  management- Run post management tests (edit/delete)');
  console.log('  posting   - Run all posting-related tests');
  console.log('  debug     - Run tests in debug mode');
  console.log('  headed    - Run tests with visible browser');
  console.log('  ui        - Run tests in UI mode');
  console.log('\nExamples:');
  console.log('  npm run test-runner all');
  console.log('  npm run test-runner success');
  console.log('  npm run test-runner failures');
  process.exit(1);
}

const command = testScenarios[scenario];
console.log(`🚀 Running: ${command}`);
console.log('📁 Working directory:', process.cwd());
console.log('─'.repeat(50));

// Execute the command
exec(command, (error, stdout, stderr) => {
  if (stdout) {
    console.log(stdout);
  }
  
  if (stderr) {
    console.error(stderr);
  }
  
  if (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
  
  console.log('✅ Test execution completed');
});