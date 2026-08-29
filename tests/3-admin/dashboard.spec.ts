import { test, expect } from '@playwright/test';
import { AdminDashboardPage } from '../../pages/admin-dashboard.page';

test.describe('Espace Administration', () => {

  test('Accéder directement au tableau de bord administrateur', async ({ page }) => {

    const adminDashboardPage = new AdminDashboardPage(page);

    // Accès direct à l'URL admin sécurisée
    await adminDashboardPage.open();

    // Assertion : Vérifier qu'on est bien sur le dashboard sans redirection vers le login
    await expect(page).toHaveURL(/.*\/admin\/dashboard/);
    
    // Exemple d'assertion sur un composant propre à l'admhin
    await expect(adminDashboardPage.pageTitle).toHaveText("Sales over the years");
  });

});