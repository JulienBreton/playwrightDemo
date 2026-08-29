import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { AdminDashboardPage } from '../pages/admin-dashboard.page';
import { ContactPage } from '../pages/contact.page';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

// 1. Définition des types pour TypeScript
type MyFixtures = {
  loginPage: LoginPage;
  accountPage: AccountPage;
  adminDashboardPage: AdminDashboardPage;
  contactPage: ContactPage;
  homePage: HomePage;
  productPage: ProductPage;
};

// 2. Extension du `test` de base
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  adminDashboardPage: async ({ page }, use) => {
    await use(new AdminDashboardPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },  
});

export { expect } from '@playwright/test';