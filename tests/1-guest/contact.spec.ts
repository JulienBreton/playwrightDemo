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

  test('Afficher les erreurs de validation quand le formulaire est vide', async ({ contactPage }) => {
    await contactPage.navigateTo('contact');

    await contactPage.cliquerEnvoyer();

    await expect(contactPage.erreurPrenom).toHaveText('Le prénom est requis');
    await expect(contactPage.erreurNom).toHaveText('Le nom de famille est requis');
    await expect(contactPage.erreurEmail).toHaveText("L'email est requis");
    await expect(contactPage.erreurSujet).toHaveText('Le sujet est requis');
    await expect(contactPage.erreurMessage).toHaveText('Le message est requis');
    await expect(contactPage.successAlert).toBeHidden();
  });

  test('Refuser un email au format invalide', async ({ contactPage }) => {
    await contactPage.navigateTo('contact');

    await contactPage.remplirFormulaire({
      prenom: 'Jean',
      nom: 'Dupont',
      email: 'pas-un-email',
      sujet: 'Statut de ma commande',
      message: 'Bonjour, j\'ai une question concernant ma commande.'
    });
    await contactPage.cliquerEnvoyer();

    await expect(contactPage.erreurEmail).toHaveText("Le format de l'email est invalide");
    await expect(contactPage.successAlert).toBeHidden();
  });

});