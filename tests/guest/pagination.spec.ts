import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test.describe('Module de pagination', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
  });

  test('Naviguer vers la page suivante via le bouton "Suivant"', async ({ page }) => {
    // 1. Récupérer le nom du premier produit sur la page 1
    const premierProduitPage1 = await homePage.grid.titresProduits.first().innerText();

    // 2. Cliquer sur "Suivant" dans le composant pagination
    await homePage.pagination.pageSuivante();

    // 3. Vérifier que la page 2 est active
    await expect(homePage.pagination.pageActive).toHaveText('2');

    // 4. Vérifier que les produits ont changé (le 1er produit n'est plus le même)
    await expect(homePage.grid.titresProduits.first()).not.toHaveText(premierProduitPage1);
  });

  test('Naviguer vers la page précédente via le bouton "Précédent"', async ({ page }) => {
    // Aller sur la page 2 d'abord
    await homePage.pagination.pageSuivante();
    await expect(homePage.pagination.pageActive).toHaveText('2');

    // Revenir sur la page 1
    await homePage.pagination.pagePrecedente();

    // Vérifier que la page 1 est de nouveau active
    await expect(homePage.pagination.pageActive).toHaveText('1');
  });

  test('Naviguer directement vers une page spécifique par son numéro', async () => {
    // Aller directement sur la page 2
    await homePage.pagination.allerALaPage(2);

    await expect(homePage.pagination.pageActive).toHaveText('2');
    await expect(homePage.grid.cartesProduits).toHaveCount(9);
  });

});