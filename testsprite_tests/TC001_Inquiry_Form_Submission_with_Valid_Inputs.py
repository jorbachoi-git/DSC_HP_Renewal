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
        # -> Locate and open the inquiry form to fill in all required fields with valid data.
        frame = context.pages[-1]
        # Click on '제품 문의 및 자료요청' (Product Inquiry and Data Request) to open the inquiry form
        elem = frame.locator('xpath=html/body/footer/div/div/div[4]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Close the MSDS 안내 popup by clicking the '닫기' button and then retry filling in the inquiry form fields.
        frame = context.pages[-1]
        # Click the '닫기' button to close the MSDS 안내 popup
        elem = frame.locator('xpath=html/body/div[2]/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Fill in the inquiry form fields with valid data: name, email, inquiry content, and password.
        frame = context.pages[-1]
        # Fill in the '성명' (Name) field with 'John Doe'
        elem = frame.locator('xpath=html/body/section[7]/div[2]/div/section/form/div/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('John Doe')
        

        frame = context.pages[-1]
        # Fill in the '이메일' (Email) field with 'johndoe@example.com'
        elem = frame.locator('xpath=html/body/section[7]/div[2]/div/section/form/div/div[3]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('johndoe@example.com')
        

        frame = context.pages[-1]
        # Fill in the '문의 내용' (Inquiry Content) field with a valid inquiry text
        elem = frame.locator('xpath=html/body/section[7]/div[2]/div/section/form/div/div[5]/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('This is a test inquiry about product details.')
        

        frame = context.pages[-1]
        # Fill in the '비밀번호' (Password) field with a valid password
        elem = frame.locator('xpath=html/body/section[7]/div[2]/div/section/form/div[2]/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('securepassword123')
        

        # -> Click the '문의 등록하기' (Submit Inquiry) button to submit the form asynchronously.
        frame = context.pages[-1]
        # Click the '문의 등록하기' (Submit Inquiry) button to submit the inquiry form
        elem = frame.locator('xpath=html/body/section[7]/div[2]/div/section/form/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=✓ 문의가 등록되었습니다').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    