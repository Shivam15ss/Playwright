import re
from playwright.sync_api import Page, expect


def test_example(page: Page) -> None:
    page.goto("https://war.onerooftechnologiesllp.com/")
    page.get_by_role("textbox", name="name@example.com").click()
    page.get_by_role("textbox", name="name@example.com").click()
    page.get_by_role("textbox", name="name@example.com").fill("shivam.singh@onerooftech.com")
    page.get_by_role("textbox", name="Password").click()
    page.get_by_role("textbox", name="Password").fill("Shivam@1234")
    expect(page.get_by_role("textbox", name="name@example.com")).to_be_visible()
    expect(page.get_by_role("textbox", name="Password")).to_be_visible()
    page.get_by_role("button", name="Login").click()
    page.locator("a").nth(2).click()
    page.get_by_role("link", name="Logout").click()
