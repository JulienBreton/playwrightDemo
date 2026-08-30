import { defineConfig, devices } from '@playwright/test';

/* Détecte si l'on est en CI (GitHub Actions, etc.) OU spécifiquement sur Jenkins */
const isCI = !!process.env.CI || !!process.env.JENKINS_URL;

export default defineConfig({
  testDir: './tests',

  /*Utilise 4 workers en CI / Jenkins, sinon le comportement par défaut en local */
  workers: isCI ? 4 : undefined,

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

    /* Capture de preuves complète dès le premier échec */
    trace: 'retain-on-failure',
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

projects: [
    // 1. Authentification (s'exécute en premier)
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // 2. Tests Invité (sans authentification)
    {
      name: 'guest-tests',
      testDir: './tests/1-guest',
      use: { ...devices['Desktop Chrome'] },
    },

    // 3. Tests Client Connecté (injecte la session client)
    {
      name: 'customer-tests',
      testDir: './tests/2-customer',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/customer.json',
      },
    },

    // 4. Tests Administrateur (injecte la session admin)
    {
      name: 'admin-tests',
      testDir: './tests/3-admin',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/admin.json',
      },
    },
  ],
});