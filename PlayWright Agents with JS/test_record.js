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
  await page.locator('div').filter({ hasText: 'Sign' }).nth(2).click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();