import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Module d\'authentification', () => {

  test('Connexion réussie avec des identifiants valides', async ({ accountPage }) => {

    await accountPage.open(); // Accès direct à /account, la session est déjà là !
    await expect(accountPage.titlePage).toHaveText('Mon compte');
    await expect(accountPage.header.userMenu).toContainText('Bob Smith');
  });

});