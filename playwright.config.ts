import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Exécution en parallèle de tous les tests */
  fullyParallel: true,

  /* Configuration du reporter : génère le rapport HTML sans tenter de l'ouvrir à la fin */
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'], // Affiche les logs en direct dans la console Jenkins 
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  use: {
    baseURL: 'https://practicesoftwaretesting.com',

    /* Mode headless obligatoire (serveur Jenkins sans interface graphique) */
    headless: false,

    // Indique à Playwright que les balises de test utilisent data-test
    testIdAttribute: 'data-test',

    // 1. Désactive le viewport fixe de Playwright (1280x720 par défaut)
    viewport: null,

    // 2. Transmet l'option d'ouverture maximisée à Chromium
    launchOptions: {
      args: ['--start-maximized'],
      // Lit le paramètre SLOWMO passé lors du lancement
      slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO, 10) : 0,      
    },

    /* Capture de preuves uniquement en cas d'échec pour optimiser le temps et l'espace disque */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

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