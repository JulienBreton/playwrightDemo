import { Page, Locator, Response } from '@playwright/test';

/* Forme (simplifiée) de la réponse de l'API produits */
export type ProduitsApi = {
  total: number;
  data: { name: string; category: { name: string } }[];
};

export class FilterSidebarComponent {
  readonly page: Page;
  readonly champRecherche: Locator;
  readonly boutonRecherche: Locator;

  constructor(page: Page) {
    this.page = page;
    this.champRecherche = page.getByLabel("Rechercher");
    this.boutonRecherche = page.getByLabel("Recherche");
  }

  /**
   * Coche une catégorie et renvoie la réponse de l'API correspondante.
   * On attend précisément la requête contenant le filtre "by_category",
   * pour ne pas capter par erreur la requête de chargement initial de la page.
   */
  async filterByCategory(categoryName: string): Promise<ProduitsApi> {
    const checkbox = this.page.getByLabel(categoryName);
    const [response] = await Promise.all([
      this.page.waitForResponse(res =>
        this.estReponseProduits(res, '/products') &&
        (res.request().postData() ?? '').includes('by_category')
      ),
      checkbox.check()
    ]);
    return response.json();
  }

  async typeQuery(query: string) {
    await this.champRecherche.fill(query);
  }

  /**
   * Lance la recherche et renvoie la réponse de l'API de recherche.
   */
  async clickSearchButton(): Promise<ProduitsApi> {
    const [response] = await Promise.all([
      this.page.waitForResponse(res => this.estReponseProduits(res, '/products/search')),
      this.boutonRecherche.press('Enter')
    ]);
    return response.json();
  }

  private estReponseProduits(res: Response, chemin: string): boolean {
    return new URL(res.url()).pathname === chemin && res.status() === 200;
  }
}
