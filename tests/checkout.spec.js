const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('Product Page Tests', () => {
    let productPage;
    let loginPage;
    let cartPage;
    let checkoutPage;

    test.beforeEach(async ({ page }) => {

        productPage = new ProductPage(page);
        loginPage = new LoginPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await page.goto('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
        await productPage.productClick();
        await cartPage.addToCart();
        await page.goto('https://www.saucedemo.com/cart.html'); 
        await checkoutPage.clickCheckout();   
    });

    test('Checkout Functionality', async ({ page }) => {


        await checkoutPage.detailsFill('Sathihs', 'Kumar', '603103');
        await checkoutPage.FinishButton.click();
        await expect(checkoutPage.checkoutCompleteHeader).toBeVisible();   
    
    });

    test('Checkout with First Name empty', async ({ page }) => {

        await checkoutPage.detailsFill('', 'Kumar', '603103');
        await expect(checkoutPage.firstNameemptyError).toBeVisible();

    });

    test('Checkout with Last Name empty', async ({ page }) => {

        await checkoutPage.detailsFill('Sathihs', '', '603103');
        await expect(checkoutPage.lastNameemptyError).toBeVisible();
    });

    test('Checkout with Zip Code empty', async ({ page }) => {
        await checkoutPage.detailsFill('Sathihs', 'Kumar', '');
        await expect(checkoutPage.zipCodeemptyError).toBeVisible();
    });

});