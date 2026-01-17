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
        # -> Use navigation arrows or controls to manually switch slides and verify response.
        frame = context.pages[-1]
        # Click right arrow to manually switch to next slide
        elem = frame.locator('xpath=html/body/div[4]/nav/div[4]/div').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Close the modal popup and continue testing the carousel looping behavior by navigating to the last slide and then forward to first slide.
        frame = context.pages[-1]
        # Click 닫기 button to close the MSDS 안내 modal popup
        elem = frame.locator('xpath=html/body/div[2]/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click navigation arrow to move to the last slide, then click forward to verify looping back to the first slide.
        frame = context.pages[-1]
        # Click right arrow to navigate to next slide
        elem = frame.locator('xpath=html/body/section/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click right arrow again to continue navigating slides
        elem = frame.locator('xpath=html/body/section/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click right arrow again to continue navigating slides
        elem = frame.locator('xpath=html/body/section/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click right arrow again to continue navigating slides
        elem = frame.locator('xpath=html/body/section/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click right arrow again to continue navigating slides
        elem = frame.locator('xpath=html/body/section/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Verify that after reaching the last slide, the carousel loops back to the first slide correctly.
        frame = context.pages[-1]
        # Click right arrow to attempt to loop from last slide back to first slide
        elem = frame.locator('xpath=html/body/section/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=50년 기술력, 락카 스프레이 명가').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=혁신적인 기술개발과 신뢰를 바탕으로 고객에게 최고 품질의 락카 스프레이 제품을 공급합니다.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=최고의 품질, 우수한 제품').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=인증 기준을 충족하는 우수한 제품으로 시장을 선도합니다.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=신뢰할 수 있는 파트너').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=고객의 요구를 만족하는 맞춤형 솔루션을 제공합니다.').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    