require('cypress-xpath');
const { Given, When, Then, And } = require('cypress-cucumber-preprocessor/steps');
const objForm = require('../../support/object/form_obj.json');

Given('I am on {string} page', (page) => {
    const pages = page.replace(/ /g, "_");
    cy.log(pages)
    const url = Cypress.env(`${pages}_URL`);
    const baseUrl = Cypress.env('WEBSITE_URL');

    cy.visit(`${baseUrl}${url}`, { failOnStatusCode: false, chromeWebSecurity: false });
    cy.url().should('includes', url);
});

When('I input username using {string} account', (username) => {
    cy.xpath(objForm.inputLoginUsername).type(Cypress.env(`USERNAME_${username}`));
});

When('I leave both username and password fields empty', () => {
    cy.xpath(objForm.inputLoginUsername).click();
    cy.xpath(objForm.inputLoginPassword).click();
});

And('I input password with {string} credentials', (password) => {
    cy.xpath(objForm.inputLoginPassword).type(Cypress.env(`PASSWORD_${password}`));
});

And('I click on the Login button', () => {
    cy.xpath(objForm.btnLoginSubmit).click();
});

And('I click on the Reset Password button', () => {
    cy.xpath(objForm.btnForgotPasswordSubmit).click();
});

Then('Reset password link successfully sent to my email', () => {
    cy.xpath(objForm.lblForgotPasswordSent).should('be.visible');
})

Then('I successfully logged in to dashboard', () => {
    cy.url().should('includes', 'dashboard/index');
    cy.xpath(objForm.imgProfile).should('be.visible');
    cy.xpath(objForm.lblProfile).should('be.visible');
    cy.xpath(objForm.lblProfileName).should('be.visible');;
});

Then('Error message is displayed, stating {string} on {string}', (errorMessage, field) => {
    const fieldValue = field.split(' ');
    switch (errorMessage) {
        case 'Invalid credentials':
            cy.xpath(objForm.lblInvalidCredentials).should('be.visible');
            cy.xpath(objForm.lblInvalidCredentials).invoke('text').then(message => {
                expect(message).to.eq(errorMessage);
            });
            break;
        case 'Required':
            if (fieldValue.length == 2 && fieldValue[0] == 'Username' && fieldValue[1] == 'Password') {
                cy.xpath(objForm.lblRequired).eq(0).should('be.visible');
                cy.xpath(objForm.lblRequired).eq(1).should('be.visible');
                cy.xpath(objForm.lblRequired).eq(0).invoke('text').then(message => {
                    expect(message).to.eq(errorMessage);
                });
                cy.xpath(objForm.lblRequired).eq(1).invoke('text').then(message => {
                    expect(message).to.eq(errorMessage);
                });
            } else if (fieldValue.length == 1 && fieldValue[0] == 'Username') {
                cy.xpath(objForm.lblRequired).eq(0).should('be.visible');
                cy.xpath(objForm.lblRequired).eq(0).invoke('text').then(message => {
                    expect(message).to.eq(errorMessage);
                });
            }
            break;
    }
});

Then('I should be redirected to the login page', () => {
    cy.title().should('eq', 'Sign In | Authentic Luxury Fashion Terbaik di Indonesia – voilà.id');
    cy.xpath(objForm.inputLoginEmail).should('be.visible');
});

When('I fill in the Email field with {string} credential', (username) => {
    cy.xpath(objForm.inputLoginEmail).type(Cypress.env(`EMAIL_${username}`));
});

And('I fill in the Password field with {string} credential', (username) => {
    cy.log(Cypress.env(`PASSWORD_${username}`));
    cy.xpath(objForm.inputLoginPassword).type(Cypress.env(`PASSWORD_${username}`));
});

And('I click the Login button', () => {
    cy.xpath(objForm.btnLoginSubmit).click();
});

When('I click on the Forgot Password link', () => {
    cy.xpath(objForm.lblForgotPassword).click();
});

Then('I redirected to recovery password page', () => {
    cy.url().should('includes', `${Cypress.env('FORGOT_PASSWORD_URL')}`);
    cy.xpath(objForm.lblForgotPasswordTitle).should('be.visible');
});