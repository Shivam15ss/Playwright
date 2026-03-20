from playwright.sync_api import sync_playwright 
# This line imports sync_playwright, which is the tool we use to control the browser in a synchronous way. 

with sync_playwright() as p:  # p gives access to browsers(Chromium , Firefox , Webkit)
    #The with statement safely starts and stops Playwright for us 

    #When this block finishes, Playwright shuts down automatically -- No manual clearup needed
    browser = p. chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://google.com")
    print(page.title())
    browser.close()
    #Highlight how indentation starts here and ends later(scope of 'with")

# In Short Summary
#Import Playwrigth --> Start Playwright --> launch browser -->
# Open tab --> Visit website --> Get title --> close browser  