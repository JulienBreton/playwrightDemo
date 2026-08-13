import { Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component';

export abstract class BasePage {
  readonly page: Page;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
  }

  // Navigation relative (s'appuie sur la baseURL du playwright.config.ts)
  async navigateTo(path: string = '') {
    await this.page.goto(`/#/${path}`);
  }
}