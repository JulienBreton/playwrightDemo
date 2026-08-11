import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home';
import { GetStartedPage } from '../pages/getStarted.ts';

test('get started link', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  const getStartedPage = await homePage.clickLinkGetStarted();

  // Expects page to have a heading with the name of Installation.
  await expect(getStartedPage.installationHeading).toBeVisible();
});