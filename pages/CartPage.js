class CartPage{

    constructor(page){

        this.page = page;
        this.cartProductName = page.locator('.inventory_item_name').first();
        this.cartProductPrice = page.locator('.inventory_item_price').first();
        this.removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]')
        this.addToCartButton = page.locator('[data-test="add-to-cart"]')
        
    }

    async productClick() {
        await this.cartProductName.click();
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async getProductTitle() {
        return await this.cartProductName.innerText();
    }

    async getProductPrice() {
        return await this.cartProductPrice.innerText();
    }

    async verifyProduct(productPageName, productPagePrice) {

        const cartProductTitle =
            await this.getProductTitle();

        const cartProductPrice =  await this.getProductPrice();

        // Amazon truncates long product names in cart
        const productIdentifier = productPageName
            .trim()
            .split(/\s+/)
            .slice(0, 8)
            .join(' ');

        if (!cartProductTitle.trim().includes(productIdentifier) || cartProductPrice !== productPagePrice) {
            throw new Error(
                `Cart product does not match selected product.\n` +
                `Expected to contain: ${productIdentifier}\n` +
                `Actual cart title: ${cartProductTitle}\n` +
                `Expected price: ${productPagePrice}\n` +
                `Actual cart price: ${cartProductPrice}`
            );
        }
    }

}
module.exports = { CartPage };