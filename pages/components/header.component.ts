import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly navContact: Locator;
  readonly navCart: Locator;
  readonly navSignIn: Locator;
  readonly userMenu: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navContact = page.getByTestId('nav-contact');
    this.navCart = page.getByTestId('nav-cart');
    this.navSignIn = page.getByTestId('nav-sign-in');
    this.userMenu = page.getByTestId('nav-menu');
    this.cartBadge = page.getByTestId('nav-cart');
  }

  async goToContact(): Promise<void> {
    await this.navContact.click();
  }

  async goToSignIn(): Promise<void> {
    await this.navSignIn.click();
  }
}