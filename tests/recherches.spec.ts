import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

// Jeu de données de test (Data-driven testing)
const outilsAChercher = [
    {
        recherche: 'Hammer',
        texteLegende: 'Searched for: Hammer',
        nbAttendus: 6,
        premierProduit: 'Claw Hammer with Shock Reduction Grip'
    },
    {
        recherche: 'Pliers',
        texteLegende: 'Searched for: Pliers',
        nbAttendus: 4,
        premierProduit: 'Combination Pliers'
    }
];

test.describe('Module de recherche de produits', () => {

    for (const donnee of outilsAChercher) {
        test(`Recherche d'outil : ${donnee.recherche}`, async ({ page }) => {
            const homePage = new HomePage(page);

            // 1. Accès au site
            await homePage.open();

            // 2. Interaction avec la barre latérale (Sidebar)
            await homePage.sidebar.typeQuery(donnee.recherche);
            await homePage.sidebar.clickSearchButton();

            // 3. Vérification de la légende / titre de recherche
            await expect(homePage.grid.legendeRecherche).toHaveText(donnee.texteLegende);

            // 4. Vérification du nombre de cartes retournées
            await expect(homePage.grid.cartesProduits).toHaveCount(donnee.nbAttendus);

            // 5. Vérification dynamique des titres via RegExp
            const regexRecherche = new RegExp(donnee.recherche, 'i');
            const attentesRegex = Array(donnee.nbAttendus).fill(regexRecherche);
            await expect(homePage.grid.titresProduits).toHaveText(attentesRegex);

            // 6. Vérification du nom du premier produit
            await expect(homePage.grid.titresProduits.first()).toContainText(donnee.premierProduit);
        });
    }

});