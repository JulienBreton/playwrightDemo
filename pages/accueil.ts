import { Page, Locator } from '@playwright/test';
import { ResultatsRecherche } from './resultatsRecherche';

export class Accueil {
    readonly page: Page;
    readonly champRecherche: Locator;
    readonly boutonRecherche: Locator;

    constructor(page: Page) {
        this.page = page;
        this.champRecherche = page.getByLabel("Rechercher");
        this.boutonRecherche = page.getByLabel("Recherche");
    }

    async goto() {
        await this.page.goto('/');
    }

    async saisirChampRechercher(recherche: string) {
        await this.champRecherche.fill(recherche);
    }

    async cliquerBoutonRechercher(): Promise<ResultatsRecherche> {
        await this.boutonRecherche.press('Enter');
        return new ResultatsRecherche(this.page);
    }

  // Méthode pour cocher une catégorie par son libellé
  async filtrerParCategorie(nomCategorie: string): Promise<ResultatsRecherche> {
    const caseACocher = this.page.getByLabel(nomCategorie);

    // Attente conjointe du clic et de la réponse de l'API de recherche
    await Promise.all([
    this.page.waitForResponse(res => res.url().includes('/products') && res.status() === 200),
    caseACocher.check()
  ]);
    
    // Si la recherche/filtrage s'applique automatiquement ou nécessite un clic, 
    // retourne la Page Object des résultats
    return new ResultatsRecherche(this.page);
  }    
}