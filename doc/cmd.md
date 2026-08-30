## Commandes utiles pour lancer les tests

### Mode --ui

Le mode ui lance une fenêtre offrant différentes fonctionnalités pour analyser l'exécution d'un test.
- Affichage de la liste des tests pouvant être exécutés. La liste est filtrée sur le context que l'on donne dans la commande et on peut en plus filtrer sur ces tests dans l'interface.
- Lancer un test à l'aide d'une icône lecture et observer le test se dérouler. Plusieurs tests peuvent aussi être lancés.
- Génère une timeline qui permet de visualiser un snapshot du dom avant/après une action du test qui modifie le dom.
- Visualiser le code du test appelé pour une action du test (onglet Source).
- Localiser un élément dans le snapshot du dom (onglet Locator).
- Faire que le test se relance si on modifie le code du test (Watch mode).

```bash
npx playwright test tests/1-guest/cart.spec.ts --ui
```
### Mode --headed

Le mode headed permet de visualiser le test s'exécuter dans le navigateur.
On peut l'utiliser pour du debug rapide et ponctuel.
A savoir que par défaut Playwright s'exécute en mode headless.

```bash
npx playwright test -g "Ajouter un produit au panier" --headed
```
### Mode --debug

Le mode debug permet d'exécuter un test pas à pas pour analyser un cas d'échec que l'on ne comprend pas.
Il ouvre le Playwright Inspector (la même fenêtre que celle utilisée par codegen) en plus du navigateur, avec des contrôles pour piloter l'exécution.
Poser un point d'arrêt : `await page.pause();` (l'exécution s'arrête à cette ligne précise, que l'on soit en mode --debug ou même hors debug).
On peut aussi mettre un breakpoint classique dans l'éditeur (VS Code) si on exécute les tests via l'extension Playwright, sans forcément utiliser page.pause().

```bash
npx playwright test tests/1-guest/cart.spec.ts -g "nom du test" --debug
```

### Sélectionner les tests à exécuter
- `npx playwright test -g "Ajouter un produit au panier"` : lancer un test en filtrant sur son nom (g = grep).
- `npx playwright test` : lancer l'ensemble des tests.
- `npx playwright test tests/panier.spec.ts` : lancer uniquement les tests d'un fichier précis.
- `npx playwright test --project=customer-tests` : lancer un "projet" de tests (ils sont déclarés dans le plawright.config.ts)
- `npx playwright test tests/panier.spec.ts:42` : lancer uniquement le test situé à une ligne précise dans un fichier (pratique pour relancer un seul test rapidement).
- `npx playwright test tests/panier/` : lancer tous les tests d'un dossier.
- `npx playwright test --grep @smoke` : lancer les tests par tag (les tags sont ajoutés dans le nom du test, ex. test('ajout au panier @smoke', ...)).

### Autres commandes
- L'option `codegen` sert à générer un test en enregistrant des actions dans le navigateur. On peut ensuite se servir de cette base pour concevoir un script pour un test.
