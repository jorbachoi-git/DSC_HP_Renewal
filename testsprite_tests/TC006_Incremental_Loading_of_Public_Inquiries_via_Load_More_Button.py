import asyncio
from playwright import async_api
from playwright.async_api import expect

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
        # -> Navigate to the public inquiry listing section to find the inquiries and 'Load More' button.
        frame = context.pages[-1]
        # Click on '제품 문의 및 자료요청' (Product Inquiry and Data Request) link to navigate to inquiry listing section
        elem = frame.locator('xpath=html/body/footer/div/div/div[4]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Close the MSDS 안내 popup to try accessing the inquiry listing section again or find alternative navigation.
        frame = context.pages[-1]
        # Click '닫기' button on MSDS 안내 popup to close it
        elem = frame.locator('xpath=html/body/div[2]/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the '더보기 ▾' (Load More) button to fetch additional inquiries and verify they append to the list.
        frame = context.pages[-1]
        # Click the '더보기 ▾' (Load More) button to load more inquiries
        elem = frame.locator('xpath=html/body/section[7]/div[2]/div/section[2]/div[3]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the '더보기 ▾' (Load More) button to fetch additional inquiries and verify they append to the list.
        frame = context.pages[-1]
        # Click the '더보기 ▾' (Load More) button to load more inquiries
        elem = frame.locator('xpath=html/body/section[7]/div[2]/div/section[2]/div[3]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Requesting product information and pricing details.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=This is a private inquiry test.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=test12 dev').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=test11').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=test10 prod').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=test 9 prod').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=test 8 prod').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=test7 dev').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=test from netlify dev').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=test4').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=3333 dev 환경 (env 정상작동확인)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=test 2 dev 환경').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=test1').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    