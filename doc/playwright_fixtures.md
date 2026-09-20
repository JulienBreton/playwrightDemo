### Les fixtures Playwright

La Fixture, c'est le mécanisme de Playwright qui prépare l'environnement et injecte automatiquement un composant (ou un Page Object) dans le test sans que l'on ait besoin de faire un new MaPage(page) à la main.

Par exemple, au lieu d'écrire :
```
test('mon test', async ({ page }) => {
  const cartPage = new CartPage(page); // Instanciation manuelle
  await cartPage.goto();
});
```

Grâce à une Custom Fixture, on écrit directement :
 ```
test('mon test', async ({ cartPage }) => { // Injecté de façon transparente !
  await cartPage.goto();
});
```

Ce qu'il faut retenir de plus sur les Fixtures :

- Isolation & Portée (Scope) : Une fixture fournit un état propre pour chaque test (ou par worker).
- Setup & Teardown automatique : Une fixture peut exécuter du code avant le test (ex: préparer des données) et du code après le test (ex: nettoyer des données), de manière transparente.
- Fixtures natives : Playwright fournit déjà des fixtures intégrées, comme { page }, { request }, ou { context }.
- Custom Fixtures : On étend le test de base pour y ajouter nos propres Page Objects ou nos propres outils métier.
