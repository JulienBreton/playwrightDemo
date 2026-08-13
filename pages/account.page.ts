import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountPage extends BasePage {
  readonly pageTitle: Locator;
  readonly profileLink: Locator;
  readonly myOrdersLink: Locator;
  readonly myFavoritesLink: Locator;
  readonly titlePage: Locator;

  constructor(page: Page) {
    super(page);
    // Titre principal de la page
    this.pageTitle = page.getByTestId('page-title');

    // Liens / Menu de navigation interne du compte
    this.profileLink = page.getByTestId('nav-profile');
    this.myOrdersLink = page.getByTestId('nav-my-orders');
    this.myFavoritesLink = page.getByTestId('nav-my-favorites');
    this.titlePage = page.getByTestId('page-title');
  }

  /**
   * Navigue directement vers la page Mon Compte
   */
  async open(): Promise<void> {
    await this.navigateTo('account');
  }

  /**
   * Navigue vers la section "Profil"
   */
  async allerAuProfil(): Promise<void> {
    await this.profileLink.click();
  }

  /**
   * Navigue vers la section "Mes Commandes"
   */
  async allerAuxCommandes(): Promise<void> {
    await this.myOrdersLink.click();
  }

  /**
   * Navigue vers la section "Mes Favoris"
   */
  async allerAuxFavoris(): Promise<void> {
    await this.myFavoritesLink.click();
  }
}