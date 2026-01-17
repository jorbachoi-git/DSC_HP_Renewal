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
        # -> Locate and open the inquiry form to test submission with missing mandatory fields.
        await page.mouse.wheel(0, 500)
        

        # -> Locate the inquiry form fields and leave one or more required fields empty.
        await page.mouse.wheel(0, 300)
        

        # -> Close the MSDS 안내 popup modal to access the main page and inquiry form.
        frame = context.pages[-1]
        # Click the 닫기 (Close) button on the MSDS 안내 popup modal to close it and access the main page.
        elem = frame.locator('xpath=html/body/div[2]/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Scroll down further or navigate to the inquiry form section to locate the form fields and submit button.
        await page.mouse.wheel(0, 600)
        

        # -> Click on the '제품 문의 및 자료요청' link in the 고객지원 section to navigate to the inquiry form page or section.
        frame = context.pages[-1]
        # Click on '제품 문의 및 자료요청' link in the 고객지원 section to access the inquiry form.
        elem = frame.locator('xpath=html/body/footer/div/div/div[4]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Leave the password field empty (simulate missing mandatory field) and submit the form by clicking the submit button to verify validation behavior.
        frame = context.pages[-1]
        # Click the '문의 등록하기' (Submit Inquiry) button to attempt form submission with missing mandatory fields.
        elem = frame.locator('xpath=html/body/section[7]/div[2]/div/section/form/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=※ (필수)항목은 반드시 입력해주셔야 문의 등록이 가능합니다.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=성명(필수)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=이메일(필수)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=문의 내용(필수)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=비밀번호(필수)').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    