import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Module de filtre des produits', () => {

    const categoriesATester = ['Hammer', 'Hand Saw', 'Pliers', 'Screwdriver', 'Wrench', 'Sander'];

    for (const categorie of categoriesATester) {
        test(`Filtrage par la catégorie "${categorie}"`, async ({ homePage }) => {

            await homePage.open();

            // Le filtre renvoie la réponse de l'API : on s'en sert comme référence
            // plutôt que d'un nombre de produits codé en dur (les données du site peuvent évoluer).
            const reponse = await homePage.sidebar.filterByCategory(categorie);

            // 1. L'API renvoie au moins un produit, tous de la catégorie demandée
            expect(reponse.data.length).toBeGreaterThan(0);
            for (const produit of reponse.data) {
                expect(produit.category.name).toBe(categorie);
            }

            // 2. La grille affiche exactement les produits renvoyés par l'API
            await expect(homePage.grid.cartesProduits).toHaveCount(reponse.data.length);
            await expect(homePage.grid.titresProduits).toHaveText(reponse.data.map(p => p.name));
        });
    }

});
