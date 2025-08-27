Write-Host "===========================================" -ForegroundColor Green
Write-Host "DormDeal Playwright Test Runner" -ForegroundColor Green  
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Checking Playwright installation..." -ForegroundColor Yellow
try {
    npx playwright --version
    Write-Host "✅ Playwright is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Playwright not found" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "Installing Chrome browser..." -ForegroundColor Yellow
try {
    npx playwright install chromium
    Write-Host "✅ Chrome browser installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install browser" -ForegroundColor Red
}
Write-Host ""

Write-Host "===========================================" -ForegroundColor Green
Write-Host "Running Basic Google Test" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

try {
    Write-Host "Testing basic functionality with Google..." -ForegroundColor Yellow
    npx playwright test test-basic.spec.ts --project=chromium --headed --reporter=list --timeout=300000
    Write-Host "✅ Basic test completed" -ForegroundColor Green
} catch {
    Write-Host "❌ Basic test failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "===========================================" -ForegroundColor Green
Write-Host "Running DormDeal Navigation Test" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

try {
    Write-Host "Testing DormDeal basic navigation..." -ForegroundColor Yellow
    npx playwright test simplified-posting.spec.ts --project=chromium --headed --reporter=list --timeout=300000
    Write-Host "✅ DormDeal test completed" -ForegroundColor Green
} catch {
    Write-Host "❌ DormDeal test failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "===========================================" -ForegroundColor Green
Write-Host "Generating HTML Report" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

try {
    npx playwright show-report
} catch {
    Write-Host "❌ Could not generate report" -ForegroundColor Red
}

Write-Host ""
Write-Host "Test execution complete!" -ForegroundColor Green
Write-Host "Check the screenshots folder for debugging images" -ForegroundColor Yellow
Read-Host "Press Enter to exit"