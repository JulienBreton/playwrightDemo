import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Espace client', () => {

  test('Accéder à son compte grâce à la session client enregistrée', async ({ accountPage }) => {

    await accountPage.open(); // Accès direct à /account, la session est déjà là !
    await expect(accountPage.titlePage).toHaveText('Mon compte');
    await expect(accountPage.header.userMenu).toContainText('Bob Smith');
  });

});