import { test, expect } from '@playwright/test';
import { Accueil } from '../pages/accueil';

test.describe('Gestion de la pagination', () => {

  test('Consulter la deuxième page de résultats pour Hand Tools', async ({ page }) => {
    const accueil = new Accueil(page);
    await accueil.goto();

    // 1. Filtrer par Hand Tools (qui renvoie plus de 9 produits)
    const resultats = await accueil.filtrerParCategorie('Hand Tools');

    // 2. Vérifier qu'on est sur la page 1 par défaut et qu'il y a 9 cartes (taille de page par défaut)
    await expect(resultats.cartesProduits).toHaveCount(9);
    await expect(resultats.pageActive).toHaveText('1');

    // 3. Cliquer sur le bouton "Suivant"
    await resultats.passerAPageSuivante();

    // 4. Vérifications sur la page 2
    await expect(resultats.pageActive).toHaveText('2');
    // Vérifier qu'il y a bien des cartes affichées sur cette page 2
    await expect(resultats.cartesProduits.first()).toBeVisible();
  });

});