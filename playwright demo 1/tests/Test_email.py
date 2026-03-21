from mailosaur import MailosaurClient
from playwright.sync_api import sync_playwright
import time
import webbrowser
import tempfile

MAILOSAUR_API_KEY = "PAh7xiHPXIYbdKw0wlsSM8Owk9f99vB4"
SERVER_ID = "jcbea5rj"

def test_email_verification():
    client = MailosaurClient(MAILOSAUR_API_KEY)
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        test_email = f"test.{int(time.time())}@{SERVER_ID}.mailosaur.net"
        
        try:
            # Submit email
            page.goto("https://dinobnb.com")
            page.fill("anything@jcbea5rj.mailosaur.net", test_email)
            page.click("button[type=submit]")
            
            print("Waiting for email...")
            
            # Get email
            message = client.messages.get(SERVER_ID, {"sentTo": test_email}, timeout=30000)
            
            # Save email to temp file and open in browser
            with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False) as f:
                f.write(f"""
                <html>
                <head><title>{message.subject}</title></head>
                <body>
                    <h2>Email from: {message.from_.address}</h2>
                    <h3>Subject: {message.subject}</h3>
                    <hr>
                    {message.html.body}
                </body>
                </html>
                """)
                temp_file = f.name
            
            # Open in browser
            webbrowser.open(f'file://{temp_file}')
            print("✓ Email opened in browser")
            
            # Click verification link
            verification_link = message.html.links[0].href
            page.goto(verification_link)
            
            # Check success
            page.wait_for_timeout(2000)
            if page.is_visible("text=Email Verified"):
                print("✓ Test passed!")
            else:
                print("✗ Test failed: Success message not found")
                
        except Exception as e:
            print(f"✗ Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    test_email_verification()