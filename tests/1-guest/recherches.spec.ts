import { test, expect } from '../../fixtures/page-fixtures';

// Jeu de données de test (Data-driven testing)
const outilsAChercher = ['Hammer', 'Pliers'];

test.describe('Module de recherche de produits', () => {

    for (const recherche of outilsAChercher) {
        test(`Recherche d'outil : ${recherche}`, async ({ homePage }) => {

            // 1. Accès au site
            await homePage.open();

            // 2. Interaction avec la barre latérale (Sidebar) ; on récupère la réponse de l'API
            await homePage.sidebar.typeQuery(recherche);
            const reponse = await homePage.sidebar.clickSearchButton();

            // 3. Vérification de la légende / titre de recherche
            await expect(homePage.grid.legendeRecherche).toHaveText(`Searched for: ${recherche}`);

            // 4. L'API renvoie au moins un résultat
            expect(reponse.data.length).toBeGreaterThan(0);

            // 5. La grille affiche exactement les produits renvoyés par l'API
            await expect(homePage.grid.cartesProduits).toHaveCount(reponse.data.length);
            await expect(homePage.grid.titresProduits).toHaveText(reponse.data.map(p => p.name));

            // 6. Chaque titre affiché contient le terme recherché
            const regexRecherche = new RegExp(recherche, 'i');
            await expect(homePage.grid.titresProduits).toHaveText(
                Array(reponse.data.length).fill(regexRecherche)
            );
        });
    }

});
