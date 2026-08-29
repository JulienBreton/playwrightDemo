import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Module de pagination', () => {

  test('Naviguer vers la page suivante via le bouton "Suivant"', async ({ homePage }) => {
    await homePage.open();

    // 1. Récupérer le nom du premier produit sur la page 1
    const premierProduitPage1 = await homePage.grid.titresProduits.first().innerText();

    // 2. Cliquer sur "Suivant" dans le composant pagination
    await homePage.pagination.pageSuivante();

    // 3. Vérifier que la page 2 est active
    await expect(homePage.pagination.pageActive).toHaveText('2');

    // 4. Vérifier que les produits ont changé (le 1er produit n'est plus le même)
    await expect(homePage.grid.titresProduits.first()).not.toHaveText(premierProduitPage1);
  });

  test('Naviguer vers la page précédente via le bouton "Précédent"', async ({ homePage }) => {
    await homePage.open();

    // Aller sur la page 2 d'abord
    await homePage.pagination.pageSuivante();
    await expect(homePage.pagination.pageActive).toHaveText('2');

    // Revenir sur la page 1
    await homePage.pagination.pagePrecedente();

    // Vérifier que la page 1 est de nouveau active
    await expect(homePage.pagination.pageActive).toHaveText('1');
  });

  test('Naviguer directement vers une page spécifique par son numéro', async ({ homePage }) => {
    await homePage.open();

    // Aller directement sur la page 2
    await homePage.pagination.allerALaPage(2);

    await expect(homePage.pagination.pageActive).toHaveText('2');
    await expect(homePage.grid.cartesProduits).toHaveCount(9);
  });

});