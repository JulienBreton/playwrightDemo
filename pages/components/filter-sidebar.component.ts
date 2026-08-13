import { Page, Locator } from '@playwright/test';

export class FilterSidebarComponent {
  readonly page: Page;
  readonly champRecherche: Locator;
  readonly boutonRecherche: Locator;

  constructor(page: Page) {
    this.page = page;
    this.champRecherche = page.getByLabel("Rechercher");
    this.boutonRecherche = page.getByLabel("Recherche");
  }

  async filterByCategory(categoryName: string) {
    const checkbox = this.page.getByLabel(categoryName);
    await Promise.all([
      this.page.waitForResponse(res => res.url().includes('/products') && res.status() === 200),
      checkbox.check()
    ]);
  }

  async typeQuery(query: string) {
    await this.champRecherche.fill(query);
  }

  async clickSearchButton(): Promise<void> {
   await Promise.all([
    this.page.waitForResponse(res => res.url().includes('/products') && res.status() === 200),
    this.boutonRecherche.press('Enter')
   ]);
  }     
}