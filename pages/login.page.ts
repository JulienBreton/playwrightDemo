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
   * Remplit le formulaire et le soumet, sans présumer du résultat
   * (utile pour les cas d'échec de connexion)
   */
  async remplirEtSoumettre(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  /**
   * Se connecte et attend la réponse réussie de l'API d'authentification
   */
  async login(email: string, password: string): Promise<void> {
    const reponseLogin = this.page.waitForResponse(
      res => res.url().includes('/users/login') && res.status() === 200
    );
    await this.remplirEtSoumettre(email, password);
    await reponseLogin;
  }
}