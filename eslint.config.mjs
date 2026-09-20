import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  // 1. Définition des dossiers à ignorer
  {
    ignores: [
      'node_modules/',
      'playwright-report/',
      'blob-report/',
      'test-results/',
      'allure-results/',
      'allure-report/',
    ],
  },

  // 2. Règles TypeScript recommandées
  ...tseslint.configs.recommended,

  // 3. Configuration Flat intégrée de Playwright
  playwright.configs['flat/recommended'],

  // 4. Surcharges de règles spécifiques (optionnel)
  {
    rules: {
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/expect-expect': 'error',
    },
  }
);