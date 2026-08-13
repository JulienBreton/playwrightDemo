import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Module de filtre des produits', () => {

    const categoriesATester = [
        { nom: 'Hammer', nbAttendus: 7 },
        { nom: 'Hand Saw', nbAttendus: 1 },
        { nom: 'Pliers', nbAttendus: 5 },
        { nom: 'Screwdriver', nbAttendus: 2 },
        { nom: 'Wrench', nbAttendus: 3 },
        { nom: 'Sander', nbAttendus: 2 },
    ];

    for (const categorie of categoriesATester) {
        test(`Filtrage par la catégorie "${categorie.nom}"`, async ({ page }) => {
            const homePage = new HomePage(page);

            await homePage.open();

            await homePage.sidebar.filterByCategory(categorie.nom);

            await expect(homePage.grid.cartesProduits).toHaveCount(categorie.nbAttendus);
        });
    }

});