import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  const formFields = {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has a form with email and password fields', async ({ page }) => {
    const form = await page.locator('form');
    await expect(form).toBeVisible();

    const usernameField = await page.locator(formFields.username);
    await expect(usernameField).toBeVisible();

    const passwordField = await form.getByRole('textbox', { name: 'Password' });
    await expect(passwordField).toBeVisible();
  });

  test('login with valid credentials', async ({ page }) => {
    await page.locator(formFields.username).fill('standard_user');
    await page.locator(formFields.password).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('/inventory.html');
  });
});
