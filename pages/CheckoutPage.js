class CheckoutPage{

    constructor(page){

        this.page = page;
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.FirstNameInput = page.getByPlaceholder('First Name');
        this.LastNameInput = page.getByPlaceholder('Last Name');
        this.ZipCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.ContinueButton = page.getByRole('button', { name: 'Continue' });
        this.FinishButton = page.getByRole('button', { name: 'Finish' });
        this.checkoutCompleteHeader = page.locator('.complete-header');
        this.firstNameemptyError = page.getByText('Error: First Name is required');
        this.lastNameemptyError = page.getByText('Error: Last Name is required');
        this.zipCodeemptyError = page.getByText('Error: Postal Code is required');
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }



    async detailsFill(FirstName, LastName, ZipCode) {
        await this.FirstNameInput.fill(FirstName);
        await this.LastNameInput.fill(LastName);
        await this.ZipCodeInput.fill(ZipCode);
        await this.ContinueButton.click();
        
    }
}

module.exports = { CheckoutPage };