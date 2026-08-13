import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.submitButton = page.getByTestId('login-submit');
    this.errorMessage = page.getByTestId('login-error');
  }

  /**
   * Navigue directement vers la page de connexion
   */
  async open(): Promise<void> {
    await this.navigateTo('auth/login');
  }

  /**
   * Remplit le formulaire et soumet les identifiants
   */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    // Attente de la réponse réseau de l'API d'authentification
    await Promise.all([
      this.page.waitForResponse(res => res.url().includes('/users/login') && res.status() === 200),
      this.submitButton.click()
    ]);
  }
}