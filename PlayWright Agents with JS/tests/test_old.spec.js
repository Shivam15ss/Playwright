const { test, expect } = require('@playwright/test');

test.describe('Login Flow - OneRoof App', () => {

  test('Validation + Login + Logout', async ({ page }) => {

    // 🔹 Open website
    await page.goto('https://war.onerooftechnologiesllp.com/');

    const email = page.getByPlaceholder('name@example.com');
    const password = page.getByPlaceholder('Password');
    const loginBtn = page.getByRole('button', { name: 'Login' });

    // =========================
    // ✅ 1. VALIDATION TEST
    // =========================

    // Submit empty form
    await loginBtn.click();

    // ✅ Check: form should NOT navigate (still on login page)
    await expect(page).toHaveURL(/war\.onerooftechnologiesllp/i);

    // ✅ Check: fields still empty
    await expect(email).toHaveValue('');
    await expect(password).toHaveValue('');

    // =========================
    // ✅ 2. BLUR VALIDATION (optional)
    // =========================

    await email.click();
    await email.blur();

    await password.click();
    await password.blur();

    // (Optional check: input still exists and visible)
    await expect(email).toBeVisible();
    await expect(password).toBeVisible();

    // =========================
    // ✅ 3. LOGIN TEST
    // =========================

    // Safety check for env

    // if (!process.env.EMAIL || !process.env.PASSWORD) {
    //   throw new Error('❌ Missing EMAIL or PASSWORD in .env file');
    // }

    await page.getByPlaceholder('name@example.com').fill('shivam.singh@onerooftech.com');

    await page.getByPlaceholder('Password').fill('Shivam@1234');

    await page.getByRole('button', { name: 'Login' }).click();

    // ✅ Check login success (VERY IMPORTANT)
    await expect(page).toHaveURL(/dashboard|home/i);

    // =========================
    // ✅ 3. PASSWORD TOGGLE TEST (if exists)
    // =========================

    const eyeIcon = page.locator('.eye-icon');
    if (await eyeIcon.isVisible()) {
      const passwordField = page.getByRole('textbox', { name: 'Password' });

      await eyeIcon.click();
      await expect(passwordField).toHaveAttribute('type', 'text');
    }

    // =========================
    // ✅ 4. LOGOUT TEST
    // =========================

    await page.locator('div').filter({ hasText: 'My Profile Change Password' }).nth(3).click();
    await page.getByRole('link', { name: 'Logout' }).click();

    // ✅ Verify logout
    await expect(page).toHaveURL(/war\.onerooftechnologiesllp/i);
  });

});

