// pages/components/pagination.component.ts
import { expect, type Page, type Locator } from '@playwright/test';

export class PaginationComponent {
  readonly page: Page;
  readonly boutonSuivante: Locator;
  readonly boutonPrecedent: Locator;
  readonly pageActive: Locator;
  readonly paginationContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.boutonSuivante = page.getByLabel('Next');
    this.boutonPrecedent = page.getByLabel('Previous');
    this.paginationContainer = page.locator('.pagination');
    this.pageActive = this.paginationContainer.locator('.active');
  }

  async pageSuivante(): Promise<void> {
    await this.boutonSuivante.click();
    await expect(this.pageActive).toBeVisible();
  }

  async pagePrecedente(): Promise<void> {
    await this.boutonPrecedent.click();
    await expect(this.pageActive).toBeVisible();
  }

  async allerALaPage(pageNumber: number): Promise<void> {
    // Passer le locator directement dans l'action sans créer de variable intermédiaire
    await this.paginationContainer
      .locator(`a:has-text("${pageNumber}"), button:has-text("${pageNumber}")`)
      .first()
      .click();

    await expect(this.pageActive).toHaveText(pageNumber.toString());
  }

  async validerPageActive(pageAttendue: number): Promise<void> {
    await expect(this.pageActive).toHaveText(pageAttendue.toString());
  }
}