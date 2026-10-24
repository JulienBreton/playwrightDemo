## Pourquoi TypeScript pour Playwright

- Playwright est conçu d'abord pour TypeScript.
- Le runner officiel (`@playwright/test`) n'existe qu'en TypeScript/JavaScript.
- Fixtures, parallélisme, retries et rapports sont intégrés, sans plugin à assembler.
- Le mode UI et l'extension VS Code ne fonctionnent qu'en TypeScript.
- Les agents IA de Playwright (planner, generator, healer) génèrent du TypeScript.
- La documentation et les exemples sont d'abord en TypeScript.
- Le typage strict détecte les erreurs avant l'exécution (aide pour la maintenabilité et la stabilité des tests).
- Si on renomme ou modifie une méthode, l'éditeur signale aussitôt tous les tests impactés.
- Les classes et l'héritage permettent d'utiliser le Page Object Model tel quel.
- C'est le même langage que le front-end : les développeurs peuvent contribuer aux tests.
- Sur Jenkins et le serveur d'exécution, seul Node.js est nécessaire, ce qui simplifie l'installation et la compatibilité.
- Les nouveautés de Playwright arrivent d'abord en TypeScript.
