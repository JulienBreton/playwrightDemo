// pages/components/pagination.component.ts
import { Page, Locator } from '@playwright/test';

export class PaginationComponent {
  readonly page: Page;
  readonly boutonSuivante: Locator;
  readonly boutonPrecedent: Locator;
  readonly pageActive: Locator;

  constructor(page: Page) {
    this.page = page;
    this.boutonSuivante = page.getByLabel('Next');
    this.boutonPrecedent = page.getByLabel('Previous');
    this.pageActive = page.locator('.pagination .active');
  }

  async pageSuivante(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(res => res.url().includes('/products') && res.status() === 200),
      this.boutonSuivante.click()
    ]);
  }

  async pagePrecedente(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(res => res.url().includes('/products') && res.status() === 200),
      this.boutonPrecedent.click()
    ]);
  }

  async allerALaPage(pageNumber: number): Promise<void> {
    const pageItem = this.page.locator('.pagination').getByText(pageNumber.toString(), { exact: true });
    await Promise.all([
      this.page.waitForResponse(res => res.url().includes('/products') && res.status() === 200),
      pageItem.click()
    ]);
  }
}