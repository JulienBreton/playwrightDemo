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
    baseURL: 'https://playwright.dev',

    /* Mode headless obligatoire (serveur Jenkins sans interface graphique) */
    headless: false,

    // 1. Désactive le viewport fixe de Playwright (1280x720 par défaut)
    viewport: null,

    // 2. Transmet l'option d'ouverture maximisée à Chromium
    launchOptions: {
      args: ['--start-maximized'],
    },

    /* Capture de preuves uniquement en cas d'échec pour optimiser le temps et l'espace disque */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configuration des navigateurs */
  projects: [
    {
      name: 'chromium',
    },
  ],
});