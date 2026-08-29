import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { HomePage } from '../../pages/home.page';
import { AccountPage } from '../../pages/account.page';

test.describe('Module d\'authentification', () => {

  test('Connexion réussie avec des identifiants valides', async ({ page }) => {
    const accountPage = new AccountPage(page);

    await accountPage.open(); // Accès direct à /account, la session est déjà là !
    await expect(accountPage.titlePage).toHaveText('Mon compte');
    await expect(accountPage.header.userMenu).toContainText('Bob Smith');
  });

});