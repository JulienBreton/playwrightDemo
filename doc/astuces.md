### Astuces

- Connaître la version de PlayWright : `npx playwright --version`
- Mettre à jour Playwright : `npm install -D @playwright/test@1.63.0`
- Pour le retry en CI : `retries: isCI ? 2 : 0,` (ici on réesaye 2 fois)
