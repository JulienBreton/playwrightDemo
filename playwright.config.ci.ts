import { defineConfig, devices } from '@playwright/test';

/* Détecte si l'on est en CI (GitHub Actions, etc.) OU spécifiquement sur Jenkins */
const isCI = !!process.env.CI || !!process.env.JENKINS_URL;

export default defineConfig({
  testDir: './tests',

  /* Exécution en parallèle de tous les tests */
  //fullyParallel: true,

  /* Interdit l'utilisation de 'test.only' sur Jenkins pour ne pas ignorer de tests par erreur */
  //forbidOnly: !!process.env.CI,

  /* Rejoue 2 fois un test en CI s'il échoue (pour gérer la fragilité réseau/serveur) */
  //retries: process.env.CI ? 2 : 0,

  /* Limite le nombre de workers en CI pour ne pas saturer les CPU du serveur Jenkins */
  //workers: process.env.CI ? 8 : undefined,

/* Utilise 8 workers en CI / Jenkins, sinon le comportement par défaut en local */
  workers: isCI ? 8 : undefined,

  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,

  /* Configuration du reporter : génère le rapport HTML sans tenter de l'ouvrir à la fin */
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'], // Affiche les logs en direct dans la console Jenkins 
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  use: {
    baseURL: 'https://practicesoftwaretesting.com',

    /* Mode headless obligatoire (serveur Jenkins sans interface graphique) */
    headless: true,

    // Indique à Playwright que les balises de test utilisent data-test
    testIdAttribute: 'data-test',

    /* Capture de preuves uniquement en cas d'échec pour optimiser le temps et l'espace disque */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    connectOptions: {
      wsEndpoint: process.env.PLAYWRIGHT_SERVER || 'ws://127.0.0.1:3000/',
    },

    // Define la langue du navigateur et les en-têtes HTTP envoyés au serveur
    locale: 'fr-FR',
    extraHTTPHeaders: {
      'Accept-Language': 'fr-FR,fr;q=0.9',
    },
  },

  /* Configuration des navigateurs */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});