### Astuces

- Connaître la version de PlayWright : `npx playwright --version`
- Mettre à jour le client Playwright : `npm install -D @playwright/test@1.63.0` puis maj les navigateurs `npx playwright install`.
- Mettre à jour le serveur Playwright : il faut modifier le docker-compose.yml en indiquant la version souhaitée puis relancer `docker compose up -d --force-recreate playwright-server`
- Pour le retry en CI : `retries: isCI ? 2 : 0,` (ici on réesaye 2 fois)
