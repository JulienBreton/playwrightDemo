import { test, expect } from '../../fixtures/page-fixtures';
import { getCustomerCredentials } from '../../config/env';

test.describe('Module d\'authentification', () => {
  test('Connexion réussie avec des identifiants valides', async ({ homePage, loginPage, accountPage}) => {
    await homePage.open();
    await homePage.header.goToSignIn();

    // Identifiants lus depuis les variables d'environnement
    const { email, password } = getCustomerCredentials();
    await loginPage.login(email, password);

    // Assertions post-connexion
    await accountPage.verifyIsLoaded();
    await expect(accountPage.titlePage).toHaveText('Mon compte');
    await expect(accountPage.header.userMenu).toContainText('Bob Smith');
  });
});