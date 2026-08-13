import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly navContact: Locator;
  readonly navCart: Locator;
  readonly navSignIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navContact = page.getByTestId('nav-contact');
    this.navCart = page.getByTestId('nav-cart');
    this.navSignIn = page.getByTestId('nav-sign-in');
  }
}