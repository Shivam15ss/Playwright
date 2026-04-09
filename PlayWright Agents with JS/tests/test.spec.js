import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://war.onerooftechnologiesllp.com/');
  await page.getByRole('textbox', { name: 'name@example.com' }).click();
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('shivam.singh@onerooftech.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Shivam@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  // await page.waitForTimeout(2000);
  await page.locator('div').filter({ hasText: 'My Profile Change Password' }).nth(3).click();
  // await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.close();
});