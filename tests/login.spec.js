const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login Tests', () => {
    let loginPage; 

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('https://www.saucedemo.com/');
    });

    test('should login with valid credentials', async ({page}) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);
    });

    test('should not login with invalid credentials', async ({ page }) => {
        await loginPage.login('invalid_user', 'invalid_password');
        await expect(loginPage.invalidLoginError).toBeVisible();
    });
    test('should not login with empty credentials', async ({ page }) => {
        await loginPage.login('', '');
        await expect(loginPage.emptyLoginError).toBeVisible();
    });

});