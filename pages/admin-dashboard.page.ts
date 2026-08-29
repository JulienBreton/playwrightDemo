import { Page, Locator, expect } from '@playwright/test';

export class AdminDashboardPage {
  readonly page: Page;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByTestId('page-title');
  }

  async open() {
    await this.page.goto('/admin/dashboard');
  }

  // Encapsulation de la vérification de l'URL
  async verifyIsLoaded() {
    await expect(this.page).toHaveURL(/.*\/admin\/dashboard/);
  }
}