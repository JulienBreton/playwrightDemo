import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { getAdminCredentials, getCustomerCredentials } from '../config/env';

const customerFile = path.join(__dirname, '../playwright/.auth/customer.json');
const adminFile = path.join(__dirname, '../playwright/.auth/admin.json');

setup('Authentifier le client', async ({ page }) => {
  const { email, password } = getCustomerCredentials();

  await page.goto('/auth/login');
  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('login-submit').click();

  // On s'assure que la connexion a réussi avant d'enregistrer l'état
  await expect(page).toHaveURL(/.*\/account/);

  // Sauvegarde de l'état de session dans le fichier JSON
  await page.context().storageState({ path: customerFile });
});

setup('Authentifier l\'admin', async ({ page }) => {
  const { email, password } = getAdminCredentials();

  await page.goto('/auth/login');
  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('login-submit').click();

  await expect(page).toHaveURL(/.*\/admin/);

  await page.context().storageState({ path: adminFile });
});
