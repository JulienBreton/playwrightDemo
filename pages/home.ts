import { Page, Locator } from '@playwright/test';
import { GetStartedPage } from './getStarted';

export class HomePage {
  readonly page: Page;
  readonly linkGetStarted: Locator;

  constructor(page: Page) {
    this.page = page;
    this.linkGetStarted = page.getByRole('link', { name: 'Get started' });
  }

  async goto() {
    await this.page.goto('https://playwright.dev/');
  }

  async clickLinkGetStarted(): Promise<GetStartedPage> {
    await this.linkGetStarted.click();
    return new GetStartedPage(this.page);
  }
}