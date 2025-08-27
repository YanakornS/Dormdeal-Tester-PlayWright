@echo off
echo ===========================================
echo DormDeal Playwright Test Runner
echo ===========================================
echo.

echo Checking Playwright installation...
npx playwright --version
echo.

echo Installing browsers (if needed)...
npx playwright install chromium
echo.

echo ===========================================
echo Running Basic Test
echo ===========================================
echo.

REM Run the basic test first
echo Testing basic functionality...
npx playwright test test-basic.spec.ts --project=chromium --headed --reporter=list --timeout=300000

echo.
echo ===========================================
echo Running Simplified DormDeal Test
echo ===========================================
echo.

REM Run the simplified DormDeal test
echo Testing DormDeal basic navigation...
npx playwright test simplified-posting.spec.ts --project=chromium --headed --reporter=list --timeout=300000

echo.
echo ===========================================
echo Test Execution Complete
echo ===========================================
echo.

echo Generating HTML report...
npx playwright show-report

pause