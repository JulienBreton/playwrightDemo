// pages/product.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {
  readonly btnAddToCart: Locator;
  readonly inputQuantity: Locator;
  readonly toastSuccess: Locator;

  constructor(page: Page) {
    super(page);
    this.btnAddToCart = page.getByTestId('add-to-cart');
    this.inputQuantity = page.getByTestId('quantity');
    this.toastSuccess = page.getByRole('alert');
  }

  /**
   * Ouvre directement la fiche d'un produit via son identifiant ou slug
   */
  async openProduct(productId: string): Promise<void> {
    await this.navigateTo(`product/${productId}`);
  }

  async addToCart(quantity: number = 1): Promise<void> {
    if (quantity > 1) {
      await this.inputQuantity.fill(quantity.toString());
    }
    await this.btnAddToCart.click();
  }
}