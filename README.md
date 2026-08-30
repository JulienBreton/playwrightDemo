### Mémos

[Commandes pour lancer les tests](doc/cmd_lancer_tests.md)
[Le rapport de l'exécution des tests](doc/rapport.md)

### Liste des apprentissages

- Créer un projet template pour Playwright ✅️
- Mettre en place Page Object Model avec Playwright ✅️
- Lancer le server Playwright ✅️
- Configurer le Jenkinsfile pour exécuter les tests sur le server Playwright ✅️
- Lancer le server Playwright via un composer.yml (`docker compose -f docker-compose.yml up -d`) ✅️ 
- Configurer le rapport HTML Playwright (lancer `System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")`) ✅️
- Configurer le rapport Allure ✅️
- Avoir une config pour le lancement des tests en local et une config pour le lancement en CI ✅️
- En local, lancer le navigateur en plein écran ✅️
- Ajout d'un paramètre pour lancer les tests en slowmo `SLOWMO=500 npx playwright test --headed` ✅️
- Découpe le projet pour s'adapter à une Single Page Application ✅️
- Configurer le nombre de workers en CI pour l'exécution des tests en parallèle ✅️
- Organiser les tests par type d'utilisateurs ✅️
- Mettre en place la sauvegarde de session avec storageState ✅️
- Mettre en place des Custom Fixtures pour injecter automatiquement les Page Objects dans les tests sans les instancier manuellement. ✅️
- Activer la capture des traces Playwright sur échec (trace: 'retain-on-failure') pour analyser rapidement les retours de CI. ⏳️
- Configurer la stratégie de rejeu (retries: isCI ? 2 : 0) pour stabiliser les échecs intermittents en CI. ⏳️
- Utiliser l'API Context pour le Data Setup/Teardown afin de préparer les données de test rapidement sans repasser par l'IHM. ⏳️
- Configurer l'URL de base dynamique (baseURL) pour basculer facilement entre les environnements (Dev, QA, Staging). ⏳️
- Paralléliser les exécutions par Sharding (--shard) dans la CI pour réduire le temps global de passage de la suite de tests. ⏳️
- Ajouter un linter avec eslint-plugin-playwright pour garantir les bonnes pratiques de dev au sein de l'équipe. ⏳️
- Sécuriser la gestion des identifiants et des secrets via l'utilisation de variables d'environnement. ⏳️
- Automatiser la purge des artefacts de build (vidage des dossiers test-results/ et anciens rapports) sur le serveur CI. ⏳️
