// pages/contact.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ContactPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectSelect: Locator; // La liste déroulante
  readonly messageTextarea: Locator;
  readonly submitButton: Locator;
  readonly successAlert: Locator;

  // Messages d'erreur de validation du formulaire
  readonly erreurPrenom: Locator;
  readonly erreurNom: Locator;
  readonly erreurEmail: Locator;
  readonly erreurSujet: Locator;
  readonly erreurMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByTestId('first-name');
    this.lastNameInput = page.getByTestId('last-name');
    this.emailInput = page.getByTestId('email');
    this.subjectSelect = page.getByTestId('subject');
    this.messageTextarea = page.getByTestId('message');
    this.submitButton = page.getByTestId('contact-submit');
    this.successAlert = page.locator('.alert-success');

    this.erreurPrenom = page.getByTestId('first-name-error');
    this.erreurNom = page.getByTestId('last-name-error');
    this.erreurEmail = page.getByTestId('email-error');
    this.erreurSujet = page.getByTestId('subject-error');
    this.erreurMessage = page.getByTestId('message-error');
  }

  async remplirFormulaire(donnees: {
    prenom: string;
    nom: string;
    email: string;
    sujet: string; // Ex: 'Customer service', 'Webmaster', 'Returns'...
    message: string;
  }): Promise<void> {
    await this.firstNameInput.fill(donnees.prenom);
    await this.lastNameInput.fill(donnees.nom);
    await this.emailInput.fill(donnees.email);
    
    // Sélection par le texte visible dans la liste déroulante
    await this.subjectSelect.selectOption({ label: donnees.sujet });
    
    await this.messageTextarea.fill(donnees.message);
  }

  /**
   * Clique sur "Envoyer" sans attendre d'appel API (cas où la validation bloque l'envoi)
   */
  async cliquerEnvoyer(): Promise<void> {
    await this.submitButton.click();
  }

  async envoyerFormulaire(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(res => res.url().includes('/messages') && res.status() === 200),
      this.submitButton.click()
    ]);
  }
}