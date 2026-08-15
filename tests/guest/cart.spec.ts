import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/product.page';

test.describe('Gestion du panier', () => {

    test('Ajouter un produit au panier depuis sa fiche', async ({ page, request }) => {
        const productPage = new ProductPage(page);

        const response = await request.get('https://api.practicesoftwaretesting.com/products/search?q=Claw%20Hammer');
        const searchResults = await response.json();
  
        const productId = searchResults.data[0].id;

        await productPage.openProduct(productId);

        await productPage.addToCart(2);

        await expect(productPage.toastSuccess).toContainText('Produit ajouté au panier.');
        await expect(productPage.header.cartBadge).toHaveText('2');
    });

    test('Vérifier que la quantité maximale autorisée est de 1 pour un produit restreint', async ({ page, request }) => {
        const productPage = new ProductPage(page);

        const response = await request.get('https://api.practicesoftwaretesting.com/products/search?q=Thor%20Hammer');
        const searchResults = await response.json();
  
        const productId = searchResults.data[0].id;

        await productPage.openProduct(productId);

        await productPage.addToCart(2);

        await expect(productPage.toastSuccess).toContainText('You can only have one Thor Hammer in the cart.');
    });

});