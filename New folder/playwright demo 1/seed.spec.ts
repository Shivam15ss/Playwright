import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    await page.goto('https://war.onerooftechnologiesllp.com/');
    await expect(page).toHaveURL('https://war.onerooftechnologiesllp.com/');

    // Fill email field
    await page.getByRole('textbox', { name: 'name@example.com' })
      .fill('shivam.singh@onerooftech.com');

    // Fill password field
    await page.getByRole('textbox', { name: 'Password' })
      .fill('Shivam@1234');

    // Optional: assert that the values are filled correctly
    await expect(page.getByRole('textbox', { name: 'name@example.com' }))
      .toHaveValue('shivam.singh@onerooftech.com');
    await expect(page.getByRole('textbox', { name: 'Password' }))
      .toHaveValue('Shivam@1234');
  });
});
