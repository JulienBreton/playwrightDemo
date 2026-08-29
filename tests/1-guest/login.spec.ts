import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Module d\'authentification', () => {
  test('Connexion réussie avec des identifiants valides', async ({ homePage, loginPage, accountPage}) => {
    await homePage.open();
    await homePage.header.goToSignIn();

    // Saisie explicite des identifiants
    await loginPage.login('customer3@practicesoftwaretesting.com', 'pass123');

    // Assertions post-connexion
    await accountPage.verifyIsLoaded();
    await expect(accountPage.titlePage).toHaveText('Mon compte');
    await expect(accountPage.header.userMenu).toContainText('Bob Smith');
  });
});