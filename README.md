- Créer un projet template pour Playwright ✅️
- Mettre en place Page Object Model avec Playwright ✅️
- Lancer le server Playwright ✅️
```
docker run -d --name playwright-server -p 3000:3000 --ipc=host mcr.microsoft.com/playwright:v1.62.1-noble \
  npx -y playwright-core run-server --port 3000 --host 0.0.0.0
```
- Configurer le Jenkinsfile pour exécuter les tests sur le server Playwright ✅️
- Lancer le server Playwright via un composer.yml ✅️
- Configurer le rapport HTML Playwright (lancer `System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")`) ✅️
- Configurer le rapport Allure ✅️
- Avoir une config pour le lancement des tests en local et une config pour le lancement en CI ✅️
- En local, lancer le navigateur en plein écran ✅️
- Ajout d'un paramètre pour lancer les tests en slowmo `SLOWMO=500 npx playwright test --headed` ✅️
- Découpe le projet pour s'adapter à une Single Page Application ✅️
- Configurer le nombre de workers en CI pour l'exécution des tests en parallèle ✅️
- Organiser les tests par type d'utilisateurs ⏳
- Mettre en place la sauvegarde de session avec storageState ⏳
