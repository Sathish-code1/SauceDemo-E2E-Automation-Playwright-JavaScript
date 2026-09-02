class LoginPage{

    constructor(page){

        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.buttonLogin = page.getByRole('button', { type: 'submit' });
        this.invalidLoginError = page.getByText('Epic sadface: Username and password do not match any user in this service');
        this.emptyLoginError = page.getByText('Epic sadface: Username is required');
    }

    async login(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.buttonLogin.click();
    }
}

module.exports = { LoginPage };