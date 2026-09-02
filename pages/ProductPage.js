class ProductPage{

    constructor(page){

        this.page = page;
        this.productName = page.locator('.inventory_item_name').first();
        this.productPrice = page.locator('.inventory_item_price').first();
        this.productPageName = page.locator('.inventory_details_name').first();
        this.productPagePrice = page.locator('.inventory_details_price').first();
    }

    async waitForProductTitle() {
        await this.productName.waitFor();
        await this.productPrice.waitFor();
    }

    async productClick() {
        await this.productName.click();
    }

    async waitForProductDetails() {
        await this.productPageName.waitFor();
        await this.productPagePrice.waitFor();
    }

}

module.exports = { ProductPage };