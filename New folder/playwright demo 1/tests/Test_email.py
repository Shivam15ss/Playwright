# from mailosaur import MailosaurClient
# from playwright.sync_api import sync_playwright
# import time
# import webbrowser
# import tempfile

# MAILOSAUR_API_KEY = "PAh7xiHPXIYbdKw0wlsSM8Owk9f99vB4"
# SERVER_ID = "jcbea5rj"

# def test_email_verification():
#     client = MailosaurClient(MAILOSAUR_API_KEY)
    
#     with sync_playwright() as p:
#         browser = p.chromium.launch()
#         page = browser.new_page()
        
#         test_email = f"test.{int(time.time())}@{SERVER_ID}.mailosaur.net"
        
#         try:
#             # Submit email
#             page.goto("https://dinobnb.com")
#             page.fill("anything@jcbea5rj.mailosaur.net", test_email)
#             page.click("button[type=submit]")
            
#             print("Waiting for email...")
            
#             # Get email
#             message = client.messages.get(SERVER_ID, {"sentTo": test_email}, timeout=30000)
            
#             # Save email to temp file and open in browser
#             with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False) as f:
#                 f.write(f"""
#                 <html>
#                 <head><title>{message.subject}</title></head>
#                 <body>
#                     <h2>Email from: {message.from_.address}</h2>
#                     <h3>Subject: {message.subject}</h3>
#                     <hr>
#                     {message.html.body}
#                 </body>
#                 </html>
#                 """)
#                 temp_file = f.name
            
#             # Open in browser
#             webbrowser.open(f'file://{temp_file}')
#             print("✓ Email opened in browser")
            
#             # Click verification link
#             verification_link = message.html.links[0].href
#             page.goto(verification_link)
            
#             # Check success
#             page.wait_for_timeout(2000)
#             if page.is_visible("text=Email Verified"):
#                 print("✓ Test passed!")
#             else:
#                 print("✗ Test failed: Success message not found")
                
#         except Exception as e:
#             print(f"✗ Error: {e}")
#         finally:
#             browser.close()

# if __name__ == "__main__":
#     test_email_verification()


from mailosaur import MailosaurClient
from playwright.sync_api import sync_playwright
import time
import webbrowser
import tempfile
import os

MAILOSAUR_API_KEY = "PAh7xiHPXIYbdKw0wlsSM8Owk9f99vB4"
SERVER_ID = "jcbea5rj"

def test_token_expiration():
    """Test that verification token expires after a certain time"""
    client = MailosaurClient(MAILOSAUR_API_KEY)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        test_email = f"test.{int(time.time())}@{SERVER_ID}.mailosaur.net"
        
        try:
            print("\n" + "="*60)
            print("TOKEN EXPIRATION TEST")
            print("="*60)
            
            # Step 1: Request verification email
            print("\n[1] Requesting verification email...")
            page.goto("https://dinobnb.com")
            page.fill("prevent-future@jcbea5rj.mailosaur.net", test_email)
            page.click("button[type=submit]")
            print(f"✓ Email sent to: {test_email}")
            
            # Step 2: Get the email with token
            print("\n[2] Waiting for verification email...")
            message = client.messages.get(SERVER_ID, {"sentTo": test_email}, timeout=30000)
            print("✓ Email received!")
            
            # Step 3: Extract token/link
            verification_link = message.html.links[0].href
            print(f"\n[3] Verification link: {verification_link[:100]}...")
            
            # Step 4: Wait for token to expire
            print("\n[4] Waiting for token to expire (waiting 10 minutes)...")
            print("    This simulates the token expiration time")
            print("    Press Ctrl+C to skip waiting")
            
            # Simulate token expiration (adjust time based on your app)
            expiration_time = 600  # 10 minutes in seconds
            for i in range(expiration_time // 10):  # Update every 10 seconds
                print(f"    Waiting... {i*10}/{expiration_time} seconds", end="\r")
                time.sleep(10)
            print("\n✓ Token expiration time elapsed")
            
            # Step 5: Try to use expired token
            print("\n[5] Attempting to use expired token...")
            page.goto(verification_link)
            print("✓ Opened expired verification link")
            
            # Step 6: Check for expiration message
            time.sleep(3)
            
            # Check for different possible expiration messages
            expiration_messages = [
                "Token expired",
                "Link expired", 
                "Verification link expired",
                "This link has expired",
                "Invalid token",
                "Token has expired"
            ]
            
            found_expired = False
            for msg in expiration_messages:
                if page.is_visible(f"text={msg}"):
                    found_expired = True
                    print(f"\n✓ Found expiration message: '{msg}'")
                    break
            
            if found_expired:
                print("\n" + "="*60)
                print("✅ TEST PASSED! Token expiration handled correctly")
                print("="*60)
            else:
                print("\n❌ No expiration message found")
                print("Current page content:")
                print(page.content()[:500])
                
        except Exception as e:
            print(f"\n❌ ERROR: {e}")
            
        finally:
            browser.close()

def test_token_after_verification():
    """Test that token cannot be reused after verification"""
    client = MailosaurClient(MAILOSAUR_API_KEY)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        test_email = f"test.{int(time.time())}@{SERVER_ID}.mailosaur.net"
        
        try:
            print("\n" + "="*60)
            print("TOKEN REUSE TEST")
            print("="*60)
            
            # Step 1: Request verification
            print("\n[1] Requesting verification email...")
            page.goto("https://dinobnb.com")
            page.fill("prevent-future@jcbea5rj.mailosaur.net", test_email)
            page.click("button[type=submit]")
            
            # Step 2: Get email
            print("\n[2] Getting verification email...")
            message = client.messages.get(SERVER_ID, {"sentTo": test_email}, timeout=30000)
            verification_link = message.html.links[0].href
            print(f"✓ Verification link obtained")
            
            # Step 3: Use token first time
            print("\n[3] Using token first time...")
            page.goto(verification_link)
            time.sleep(2)
            
            if page.is_visible("text=Email Verified"):
                print("✓ Email verified successfully!")
            else:
                print("⚠ First verification might have failed")
            
            # Step 4: Try to use same token again
            print("\n[4] Trying to use the same token again...")
            page.goto(verification_link)
            time.sleep(2)
            
            # Check if token reuse is prevented
            reuse_messages = [
                "Already verified",
                "Already used",
                "Token already used",
                "Already verified",
                "Invalid token",
                "Link already used"
            ]
            
            found_reuse_msg = False
            for msg in reuse_messages:
                if page.is_visible(f"text={msg}"):
                    found_reuse_msg = True
                    print(f"\n✓ Found reuse prevention message: '{msg}'")
                    break
            
            if found_reuse_msg:
                print("\n" + "="*60)
                print("✅ TEST PASSED! Token reuse prevented")
                print("="*60)
            else:
                print("\n⚠ No reuse prevention message found")
                print("Current page content:")
                print(page.content()[:500])
                
        except Exception as e:
            print(f"\n❌ ERROR: {e}")
            
        finally:
            browser.close()

def test_expired_token_with_wait(wait_seconds=60):
    """Test token expiration with custom wait time"""
    client = MailosaurClient(MAILOSAUR_API_KEY)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        test_email = f"test.{int(time.time())}@{SERVER_ID}.mailosaur.net"
        
        try:
            print("\n" + "="*60)
            print(f"TOKEN EXPIRATION TEST ({wait_seconds} seconds wait)")
            print("="*60)
            
            # Get token
            page.goto("https://dinobnb.com")
            page.fill("prevent-future@jcbea5rj.mailosaur.net", test_email)
            page.click("button[type=submit]")
            
            message = client.messages.get(SERVER_ID, {"sentTo": test_email}, timeout=30000)
            verification_link = message.html.links[0].href
            
            # Wait specified time
            print(f"\nWaiting {wait_seconds} seconds for token to expire...")
            for i in range(wait_seconds):
                print(f"  {i+1}/{wait_seconds} seconds", end="\r")
                time.sleep(1)
            
            # Try expired token
            print(f"\n\nTrying expired token...")
            page.goto(verification_link)
            time.sleep(2)
            
            # Check result
            expired_messages = ["expired", "Expired", "invalid", "Invalid"]
            expired_found = any(page.is_visible(f"text={msg}") for msg in expired_messages)
            
            if expired_found:
                print("\n✅ Token expired correctly!")
            else:
                print("\n⚠ Token might not have expired yet")
                print("Try increasing wait_seconds")
                
        except Exception as e:
            print(f"\n❌ ERROR: {e}")
        finally:
            browser.close()

def run_all_expiration_tests():
    """Run all token expiration tests"""
    print("SELECT TEST TO RUN:")
    print("1. Token Expiration Test (10 minute wait)")
    print("2. Token Reuse Test (after verification)")
    print("3. Custom Wait Time Test")
    
    choice = input("\nEnter choice (1-3): ")
    
    if choice == "1":
        test_token_expiration()
    elif choice == "2":
        test_token_after_verification()
    elif choice == "3":
        wait_time = int(input("Enter wait time in seconds: "))
        test_expired_token_with_wait(wait_time)
    else:
        print("Invalid choice")

if __name__ == "__main__":
    run_all_expiration_tests()