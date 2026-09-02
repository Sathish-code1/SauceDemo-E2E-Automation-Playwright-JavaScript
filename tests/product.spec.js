const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');

test.describe('Product Page Tests', () => {
    let productPage;
    let loginPage;

    test.beforeEach(async ({ page }) => {

        productPage = new ProductPage(page);
        loginPage = new LoginPage(page);

        await page.goto('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
        
    });

    test('should display correct product name and price', async ({ page }) => {
        
        await productPage.waitForProductTitle();
        const productName = await productPage.productName.innerText();
        const productPrice = await productPage.productPrice.innerText();

        await productPage.productClick();

        await productPage.waitForProductDetails();
        const productPageName = await productPage.productPageName.innerText();
        const productPagePrice = await productPage.productPagePrice.innerText();

        console.log('Product Name:', productName);
        console.log('Product Price:', productPrice);
        console.log('Product Page Name:', productPageName);
        console.log('Product Page Price:', productPagePrice);

        expect(productName.trim()).toBe(productPageName.trim());
        expect(productPrice).toBe(productPagePrice);
    });
});