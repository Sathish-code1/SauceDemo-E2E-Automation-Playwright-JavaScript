const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Product Page Tests', () => {
    let productPage;
    let loginPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {

        productPage = new ProductPage(page);
        loginPage = new LoginPage(page);
        cartPage = new CartPage(page);

        await page.goto('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
        await productPage.productClick();        
    });

    test('should display correct product name and price in cart', async ({ page }) => {

        await productPage.waitForProductDetails();
        const productPageName = await productPage.productPageName.innerText();
        const productPagePrice = await productPage.productPagePrice.innerText();
        console.log('Product Page Name:', productPageName);
        console.log('Product Page Price:', productPagePrice);
        
        await cartPage.addToCart();
        await page.goto('https://www.saucedemo.com/cart.html');

        await cartPage.verifyProduct(productPageName, productPagePrice);
        await expect(cartPage.removeButton).toBeEnabled();

        console.log('Product in cart matches the selected product and remove button is enabled.');
    
    });

});