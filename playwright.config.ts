import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config.base';

/* Désactive le viewport fixe (1280x720) imposé par devices['Desktop Chrome'] :
   la page prend alors toute la taille de la fenêtre maximisée. */
const fullWindow = { viewport: null, deviceScaleFactor: undefined };

/* Configuration locale : navigateur visible, plein écran, slowmo optionnel */
export default defineConfig(baseConfig, {
  use: {
    headless: false,

    // Transmet l'option d'ouverture maximisée à Chromium
    launchOptions: {
      args: ['--start-maximized'],
      // Lit le paramètre SLOWMO passé lors du lancement
      slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO, 10) : 0,
    },
  },

  // Les projets sont fusionnés par nom avec ceux de la config de base
  projects: [
    { name: 'setup', use: fullWindow },
    { name: 'guest-tests', use: fullWindow },
    { name: 'customer-tests', use: fullWindow },
    { name: 'admin-tests', use: fullWindow },
  ],
});
