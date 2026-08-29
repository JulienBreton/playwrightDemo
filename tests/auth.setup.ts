import { test as setup, expect } from '@playwright/test';
import path from 'path';

const customerFile = path.join(__dirname, '../playwright/.auth/customer.json');
const adminFile = path.join(__dirname, '../playwright/.auth/admin.json');

setup('Authentifier le client', async ({ page }) => {
  await page.goto('/auth/login');
  
  // Renseigne ici les identifiants de test pour un compte customer
  await page.getByTestId('email').fill('customer3@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('pass123');
  await page.getByTestId('login-submit').click();

  // On s'assure que la connexion a réussi avant d'enregistrer l'état
  await expect(page).toHaveURL(/.*\/account/);

  // Sauvegarde de l'état de session dans le fichier JSON
  await page.context().storageState({ path: customerFile });
});

setup('Authentifier l\'admin', async ({ page }) => {
  await page.goto('/auth/login');
  
  // Renseigne ici les identifiants de test pour un compte admin
  await page.getByTestId('email').fill('admin@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();

  await expect(page).toHaveURL(/.*\/admin/);

  await page.context().storageState({ path: adminFile });
});