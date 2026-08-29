import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Espace Administration', () => {

  test('Accéder directement au tableau de bord administrateur', async ({ adminDashboardPage }) => {

    await adminDashboardPage.open();
    await adminDashboardPage.verifyIsLoaded();
    await expect(adminDashboardPage.pageTitle).toHaveText("Sales over the years");
  });

});