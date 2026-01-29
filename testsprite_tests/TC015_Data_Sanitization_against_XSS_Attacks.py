import asyncio
from playwright import async_api

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:8888", wait_until="commit", timeout=10000)

        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass

        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass

        # Interact with the page elements to simulate user flow
        # -> Navigate to http://localhost:8888
        await page.goto("http://localhost:8888", wait_until="commit", timeout=10000)
        
        # -> Open '고객지원' (Customer Support) page to locate the inquiry submission form so a test XSS payload can be submitted and later verified.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=html/body/header/div/nav/a[5]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        # -> Close the MSDS 안내 modal, then open the '문의 및 자료요청 바로가기' inquiry form entry (click the product/inquiry button).
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=html/body/div[2]/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=html/body/section[9]/div[2]/div/div[1]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        # -> Fill the inquiry form fields and submit an XSS test payload: place a script payload into '업체명' and an image-onerror payload into '문의 내용', then submit the form.
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=html/body/section[10]/div[2]/div/section[1]/form/div[1]/div[1]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('테스터')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=html/body/section[10]/div[2]/div/section[1]/form/div[1]/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('<script>alert(\'xss\')</script>')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=html/body/section[10]/div[2]/div/section[1]/form/div[1]/div[3]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('test@example.com')
        
        # -> Fill the '문의 내용' textarea with the image-onerror XSS payload, enter a password (>=4 chars), then click '문의 등록하기' to submit the inquiry form.
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=html/body/section[10]/div[2]/div/section[1]/form/div[1]/div[5]/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('<img src=x onerror=alert(1)>')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=html/body/section[10]/div[2]/div/section[1]/form/div[2]/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('testpass123')
        
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=html/body/section[10]/div[2]/div/section[1]/form/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        # --> Assertions to verify final state
        frame = context.pages[-1]
        try:
            await expect(frame.locator('text=문의 등록이 완료되었습니다').first).to_be_visible(timeout=3000)
        except AssertionError:
            raise AssertionError("Test case failed: The test attempted to verify that submitting an inquiry containing XSS payloads is accepted and safely sanitized so the data is stored and rendered without executing scripts, but the expected confirmation message '문의 등록이 완료되었습니다' did not appear — indicating the submission may have failed or sanitization/display protections are not present.")
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    