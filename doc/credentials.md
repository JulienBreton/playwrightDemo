## Gestion des identifiants et des secrets

Les identifiants des comptes de test (client et admin) ne sont jamais écrits dans le code.
Ils sont lus depuis des variables d'environnement, via `config/env.ts`.

### Variables utilisées

| Variable            | Rôle                                   | Obligatoire                      |
| ------------------- | -------------------------------------- | -------------------------------- |
| `CUSTOMER_EMAIL`    | Email du compte client                 | Oui (tests customer + login)     |
| `CUSTOMER_PASSWORD` | Mot de passe du compte client          | Oui (tests customer + login)     |
| `ADMIN_EMAIL`       | Email du compte admin                  | Oui (tests admin)                |
| `ADMIN_PASSWORD`    | Mot de passe du compte admin           | Oui (tests admin)                |
| `BASE_URL`          | URL du site                            | Non (valeur par défaut)          |
| `API_URL`           | URL de l'API                           | Non (valeur par défaut)          |

Si une variable obligatoire manque, le test échoue avec un message explicite
(`Variable d'environnement manquante : ...`) au lieu de tenter une connexion avec un identifiant vide.

### En local : le fichier `.env`

1. Copier le modèle : `cp .env.example .env`
2. Renseigner les valeurs dans `.env`.
3. Lancer les tests normalement : `npx playwright test`

Le fichier `.env` est ignoré par git (`.gitignore`) : il ne doit **jamais** être commité.
Seul `.env.example` (sans valeurs sensibles) est versionné.

### En CI : les credentials Jenkins

Les identifiants sont stockés dans le gestionnaire de credentials de Jenkins :
**Administrer Jenkins → Credentials → (global) → Add Credentials**, type **Username with password**.

| ID Jenkins            | Username         | Password            |
| --------------------- | ---------------- | ------------------- |
| `playwright-customer` | email du client  | mot de passe client |
| `playwright-admin`    | email de l'admin | mot de passe admin  |

Le `Jenkinsfile` les injecte comme variables d'environnement uniquement pendant l'étape de test :

```groovy
withCredentials([
    usernamePassword(
        credentialsId: 'playwright-customer',
        usernameVariable: 'CUSTOMER_EMAIL',
        passwordVariable: 'CUSTOMER_PASSWORD'
    ),
    ...
]) {
    sh 'npm run test:ci'
}
```

Jenkins masque automatiquement ces valeurs dans les logs (affichées `****`).

### Utilisation dans les tests

```ts
import { getCustomerCredentials } from '../config/env';

const { email, password } = getCustomerCredentials();
await loginPage.login(email, password);
```

### Points de vigilance

- Les traces Playwright (`trace.zip`) et les rapports enregistrent les valeurs saisies avec `fill()` :
  un mot de passe peut donc y apparaître en cas d'échec. Ne pas partager ces artefacts publiquement sur un vrai projet.
- Ajouter une nouvelle variable obligatoire = la déclarer dans `.env.example`, dans `.env`, et dans Jenkins.
