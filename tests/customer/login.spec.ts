import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { HomePage } from '../../pages/home.page';
import { AccountPage } from '../../pages/account.page';

test.describe('Module d\'authentification', () => {

  test('Connexion réussie avec des identifiants valides', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    await homePage.open();

    await homePage.header.goToSignIn();

    await loginPage.login('customer3@practicesoftwaretesting.com', 'pass123');

    // Vérification de la redirection vers le compte
    await expect(page).toHaveURL(/.*\/account/);

    await expect(accountPage.titlePage).toHaveText('Mon compte');

    await expect(accountPage.header.userMenu).toContainText('Bob Smith');
  });

});