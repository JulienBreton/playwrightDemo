import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './config/env';

/*
 * Configuration commune aux exécutions locale et CI.
 * playwright.config.ts (local) et playwright.config.ci.ts (CI) l'étendent
 * en ne surchargeant que ce qui diffère.
 */
export default defineConfig({
  testDir: './tests',

  /* Exécution en parallèle de tous les tests */
  fullyParallel: true,

  /* Configuration du reporter : génère le rapport HTML sans tenter de l'ouvrir à la fin */
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'], // Affiche les logs en direct dans la console
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    /* URL du site, surchargeable via la variable BASE_URL (.env ou CI) */
    baseURL: BASE_URL,

    // Indique à Playwright que les balises de test utilisent data-test
    testIdAttribute: 'data-test',

    /* Capture de preuves complète dès le premier échec */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Définit la langue du navigateur et les en-têtes HTTP envoyés au serveur
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
