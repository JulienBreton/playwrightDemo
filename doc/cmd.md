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

```bash
npx playwright test -g "Ajouter un produit au panier" --headed
```

### Autres commandes
- codegen sert à générer un test en enregistrant des actions dans le navigateur.
