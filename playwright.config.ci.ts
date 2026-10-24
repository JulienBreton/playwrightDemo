import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config.base';

/* Configuration CI (Jenkins) : headless, connexion au serveur Playwright Docker */
export default defineConfig(baseConfig, {
  /* 4 workers pour l'exécution en parallèle sur le serveur Playwright */
  workers: 4,

  /* Fait échouer le build si un test.only a été commité */
  forbidOnly: true,

  /* Rejoue 2 fois un test en échec pour absorber les échecs intermittents */
  retries: 2,

  use: {
    /* Mode headless obligatoire (serveur Jenkins sans interface graphique) */
    headless: true,

    connectOptions: {
      wsEndpoint: process.env.PLAYWRIGHT_SERVER || 'ws://127.0.0.1:3000/',
    },
  },
});
