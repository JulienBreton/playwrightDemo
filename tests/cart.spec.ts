import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/product.page';

test.describe('Gestion du panier', () => {

    test('Ajouter un produit au panier depuis sa fiche', async ({ page }) => {
        const productPage = new ProductPage(page);

        await productPage.openProduct('01M032E4EE6GVTAJKDCQQ6HYB6');

        await productPage.addToCart(2);

        await expect(productPage.toastSuccess).toContainText('Produit ajouté au panier.');
        await expect(productPage.header.cartBadge).toHaveText('2');
    });

    test('Vérifier que la quantité maximale autorisée est de 1 pour un produit restreint', async ({ page }) => {
        const productPage = new ProductPage(page);

        await productPage.openProduct('01M035W27D0RWMEJKKXHRQGFEK');

        await productPage.addToCart(2);

        await expect(productPage.toastSuccess).toContainText('You can only have one Thor Hammer in the cart.');
    });

});