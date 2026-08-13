import { test, expect } from '@playwright/test';
import { Accueil } from '../pages/accueil';
import { ResultatsRecherche } from '../pages/resultatsRecherche';

// 1. Définition du jeu de données
const casDeTest = [
  { 
    recherche: 'hammer', 
    nbAttendus: 6, 
    texteLegende: "6 produits trouvés pour 'hammer'",
    premierProduit: 'Claw Hammer' 
  },
  { 
    recherche: 'pliers', 
    nbAttendus: 4, 
    texteLegende: "4 produits trouvés pour 'pliers'",
    premierProduit: 'Combination Pliers' 
  },
  { 
    recherche: 'saw', 
    nbAttendus: 2, 
    texteLegende: "2 produits trouvés pour 'saw'",
    premierProduit: 'Wood Saw' 
  },
];

for (const donnee of casDeTest) {
  test(`Recherche d'outil : ${donnee.recherche}`, async ({ page }) => {
    const accueil = new Accueil(page);

    await accueil.goto();
    await accueil.saisirChampRechercher(donnee.recherche);
    const resultats = await accueil.cliquerBoutonRechercher();

    // Vérifications génériques basées sur les variables du jeu de données
    await expect(resultats.nombreResultats).toHaveText(donnee.texteLegende);
    await expect(resultats.cartesProduits).toHaveCount(donnee.nbAttendus);

    // Vérifie que tous les titres contiennent le mot recherché (regex dynamique)
    const regexRecherche = new RegExp(donnee.recherche, 'i');
    const attentesRegex = Array(donnee.nbAttendus).fill(regexRecherche);
    await expect(resultats.titresProduits).toHaveText(attentesRegex);

    // Vérifie le premier produit
    await expect(resultats.titresProduits.first()).toContainText(donnee.premierProduit);
  });
}

test('Recherche des marteaux', async ({ page }) => {
  const accueil = new Accueil(page);

  await accueil.goto();

  await accueil.saisirChampRechercher("hammer");
  const resultats = await accueil.cliquerBoutonRechercher();

  // toHaveText() gère l'auto-waiting (attend que le texte s'affiche en cas de latence)
  await expect(resultats.nombreResultats).toHaveText("6 produits trouvés pour 'hammer'");

  //Vérifier le nombre exact de cartes produits affichées (6 cartes)
  await expect(resultats.cartesProduits).toHaveCount(6);

  //Vérifier que CHAQUE titre de produit affiché contient le mot "Hammer"
  // (Playwright va boucler automatiquement sur toutes les cartes)
  await expect(resultats.titresProduits).toHaveText([
    /Hammer/i,
    /Hammer/i,
    /Hammer/i,
    /Hammer/i,
    /Hammer/i,
    /Hammer/i,
  ]);

  //Premier produit
  await expect(resultats.titresProduits.first()).toContainText('Claw Hammer');

  //Vérifier la liste complète des noms retournés
  const nomsProduits = await resultats.titresProduits.allInnerTexts();
  expect(nomsProduits.map(n => n.trim())).toEqual(
    expect.arrayContaining([
      'Claw Hammer with Shock Reduction Grip',
      'Hammer',
      'Claw Hammer',
      'Thor Hammer',
      'Claw Hammer with Fiberglass Handle',
      'Court Hammer',
    ])
  );
});

const categoriesATester = [
  { nom: 'Hammer', nbAttendus: 7},
  { nom: 'Hand Saw', nbAttendus: 1 },
  { nom: 'Pliers', nbAttendus: 5 },
  { nom: 'Screwdriver', nbAttendus: 2 },
  { nom: 'Wrench', nbAttendus: 3 },
  { nom: 'Sander', nbAttendus: 2 },
];

for (const categorie of categoriesATester) {
  test(`Filtrage par la catégorie "${categorie.nom}"`, async ({ page }) => {
    const accueil = new Accueil(page);
    await accueil.goto();

    const resultats = await accueil.filtrerParCategorie(categorie.nom);

    await expect(resultats.cartesProduits).toHaveCount(categorie.nbAttendus);
  });
}