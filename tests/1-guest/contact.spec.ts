import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Formulaire de contact', () => {

  test('Envoyer un message de contact depuis la barre de navigation', async ({ homePage, contactPage }) => {

    // 1. Accès à la page d'accueil
    await homePage.open();

    // 2. Navigation vers le formulaire via le Header (grâce à BasePage)
    await homePage.header.goToContact();

    // 3. Saisie du formulaire
    await contactPage.remplirFormulaire({
      prenom: 'Jean',
      nom: 'Dupont',
      email: 'jean@example.com',
      sujet: 'Statut de ma commande',
      message: 'Bonjour, j\'ai une question concernant ma commande.'
    });

    // 4. Soumission
    await contactPage.envoyerFormulaire();

    // 5. Vérification du message de succès
    await expect(contactPage.successAlert).toBeVisible();
    await expect(contactPage.successAlert).toContainText('Merci pour votre message ! Nous vous contacterons sous peu. ');
  });

});