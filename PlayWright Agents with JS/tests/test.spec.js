import { test, expect } from '@playwright/test';

test('test of Login Flow WAR', async ({ page }) => {
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




test('SauceDemo Full Flow', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');

  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');

  await page.locator('[data-test="login-button"]').click();

  // Add products to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();

  // Open cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Remove all products
  await page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click();
  await page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
  await page.locator('[data-test="remove-sauce-labs-onesie"]').click();
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  // Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await page.close();
});