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


const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://freelance-learn-automation.vercel.app/signup');
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('shivam singh');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('shivam@123Gamil.com');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Email' }).fill('shivam@123gamil.com');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Email' }).fill('shivam@123gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Password must be atleast 6' }).click();
  await page.getByRole('textbox', { name: 'Password must be atleast 6' }).fill('12345678990');
  await page.getByRole('checkbox', { name: 'SQL' }).check();
  await page.getByRole('checkbox', { name: 'JS' }).check();
  await page.getByRole('checkbox', { name: 'AWS' }).check();
  await page.getByRole('checkbox', { name: 'Selenium' }).check();
  await page.getByRole('checkbox', { name: 'JavaScript' }).check();
  await page.getByRole('checkbox', { name: 'PlayWright', exact: true }).check();
  await page.locator('#gender2').check();
  await page.locator('#gender1').check();
  await page.locator('#state').selectOption('Himachal Pradesh');
  await page.locator('#state').selectOption('Maharashtra');
  await page.locator('#hobbies').selectOption('Playing');
  await page.locator('#hobbies').selectOption('Dancing');
  await page.locator('#hobbies').selectOption('Singing');
  await page.locator('#hobbies').selectOption(['Playing', 'Reading', 'Swimming', 'Singing']);
  await page.locator('#hobbies').selectOption(['Singing', 'Dancing']);
  await page.locator('#hobbies').selectOption(['Swimming', 'Singing']);
  await page.locator('#hobbies').press('ControlOrMeta+a');
  await page.locator('#hobbies').selectOption(['Playing', 'Reading', 'Swimming', 'Singing', 'Dancing']);

  // ---------------------
  await context.close();
  await browser.close();
})();