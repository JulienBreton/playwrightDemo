## Pourquoi TypeScript pour Playwright

- Le runner officiel `@playwright/test` (fixtures, projets avec dépendances, `storageState`, parallélisme, retries, sharding, reporters) n'existe qu'en TypeScript/JavaScript. En Python, il faut assembler pytest et plusieurs plugins.
- Le mode UI (`--ui`) n'existe qu'en TypeScript/JavaScript.
- L'extension VS Code Playwright (lancer et déboguer d'un clic, Pick locator) ne fonctionne qu'avec le runner TypeScript/JavaScript.
- Les agents IA de Playwright (planner, generator, healer) ne génèrent et ne réparent que des tests TypeScript/JavaScript.
- Le typage strict est actif par défaut et bloque le build en cas d'erreur. En Python, il est optionnel et dépend de mypy.
- Si on renomme ou modifie une méthode, l'éditeur signale aussitôt tous les tests impactés.
- `readonly` et `private` sont vérifiés à la compilation. En Python, ce ne sont que des conventions.
- C'est le même langage que le front-end : les développeurs peuvent contribuer aux tests.
