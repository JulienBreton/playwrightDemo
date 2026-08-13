import { Page, Locator } from '@playwright/test';

export class ProductGridComponent {
  readonly page: Page;
  readonly nombreResultats: Locator;
  readonly cartesProduits: Locator;
  readonly titresProduits: Locator;
  readonly legendeRecherche: Locator

  constructor(page: Page) {
    this.page = page;
    this.legendeRecherche = page.getByTestId('search-caption');
    this.nombreResultats = page.getByTestId('search-result-count');
    this.cartesProduits = page.locator('.col-md-9 a.card');
    this.titresProduits = page.getByTestId('product-name');
  }

  async compterCartesAffichees(): Promise<number> {
    return await this.cartesProduits.count();
  }

}