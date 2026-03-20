import re               # re is for regex (used in the title check)
from playwright.sync_api import expect  # expect gives smart test assertions like "page should have this title "


def test_google_search(page):
    page.wait_for_timeout(3000)
    # Navigate to google and perform a search
    page.goto("https://www.google.com/ncr")

    # Try to accept cookies if popup appears
    try:
        page.get_by_role("button", name="Accept all").click(timeout=5000)
    except Exception:
        print("No popup to accept")

    # Assertion: check page title contains "Google"
    page.get_by_role("combobox", name="Search").fill("Playwright Python")
    page.keyboard.press("Enter")

    expect(page).to_have_title(re.compile("Google", re.IGNORECASE))


 