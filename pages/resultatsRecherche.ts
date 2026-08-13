import { Page, Locator } from '@playwright/test';

export class ResultatsRecherche {
  readonly page: Page;
  readonly nombreResultats : Locator;
  readonly cartesProduits: Locator;
  readonly titresProduits: Locator;
  readonly boutonPageSuivante: Locator;
  readonly boutonPagePrecedente: Locator;
  readonly pageActive: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nombreResultats = page.getByTestId('search-result-count');

    // Conteneur de chaque carte produit dans la grille
    this.cartesProduits = page.locator('.col-md-9 a.card');
    
    // Titre de chaque produit
    this.titresProduits = page.getByTestId('product-name');

    // Locators pour la pagination
    this.boutonPageSuivante = page.getByLabel('Next');
    this.boutonPagePrecedente = page.getByLabel('Previous');
    this.pageActive = page.locator('.pagination .active');    
  }

  // Méthode utilitaire si tu souhaites récupérer le nombre exact de cartes affichées
  async compterCartesAffichees(): Promise<number> {
    return await this.cartesProduits.count();
  }

  async passerAPageSuivante() {
    await Promise.all([
      this.page.waitForResponse(res => res.url().includes('/products') && res.status() === 200),
      this.boutonPageSuivante.click()
    ]);
  }
}