## Les Promises et async / await

### L'idée en une phrase

Une **Promise** est un objet qui représente **un résultat qui n'existe pas encore**.
On la reçoit tout de suite, la valeur arrive plus tard (une réponse réseau, la fin d'un clic, l'apparition d'un élément...).

Une Promise est toujours dans un de ces 3 états :
- **pending** : en attente
- **fulfilled** : résolue, la valeur est disponible
- **rejected** : en échec, une erreur s'est produite (ex : timeout)

En TypeScript, on précise le type de la valeur attendue :
- `Promise<number>` : contiendra un nombre
- `Promise<void>` : ne contiendra rien, sert juste à signaler « c'est terminé »

### async / await

`await` met la fonction en pause jusqu'à ce que la Promise soit résolue, puis donne sa valeur.

```ts
async compterCartesAffichees(): Promise<number> {
  return await this.cartesProduits.count(); // count() renvoie Promise<number>
}
```

- Une fonction `async` renvoie **toujours** une Promise (d'où `Promise<number>` et pas `number`).
- Si la Promise échoue, `await` lève une erreur : le test s'arrête en échec.

**Piège classique : oublier le `await`**

```ts
this.submitButton.click();       // ❌ le test continue sans attendre la fin du clic
await this.submitButton.click(); // ✅
```

La règle ESLint `playwright/missing-playwright-await` signale cet oubli.

### Lancer maintenant, attendre plus tard

Sans `await`, on récupère la Promise elle-même et on peut attendre son résultat plus tard.
C'est utile quand il faut **écouter le réseau avant d'agir** (exemple de `login.page.ts`) :

```ts
const reponseLogin = this.page.waitForResponse(...); // 1. je commence à écouter (pas de await)
await this.remplirEtSoumettre(email, password);      // 2. j'agis
await reponseLogin;                                  // 3. j'attends le résultat
```

**Analogie** : on attend un colis précis. On prévient d'abord le gardien (« si un colis marqué X arrive, garde-le »), **puis** on passe commande.
Dans l'autre sens, le colis pourrait arriver avant que le gardien soit prévenu.

### Promise.all

`Promise.all([a, b])` lance `a` et `b` **en même temps** et attend que **les deux** soient terminées.
Il renvoie un tableau des résultats, dans le même ordre.

```ts
const [response] = await Promise.all([
  this.page.waitForResponse(res => ...), // a : écouter le réseau
  checkbox.check()                       // b : déclencher la requête
]);
// response = résultat de a (le résultat de b, check(), ne sert à rien)
```

C'est la même idée que « lancer maintenant, attendre plus tard », écrite autrement.

### Exemple pas à pas : filterByCategory

Fichier : `pages/components/filter-sidebar.component.ts`

```ts
async filterByCategory(categoryName: string): Promise<ProduitsApi> {
  const checkbox = this.page.getByLabel(categoryName);                    // ①
  const [response] = await Promise.all([                                  // ②
    this.page.waitForResponse(res =>                                      // ③
      this.estReponseProduits(res, '/products') &&                        // ④
      (res.request().postData() ?? '').includes('by_category')            // ⑤
    ),
    checkbox.check()                                                      // ⑥
  ]);
  return response.json();                                                 // ⑦
}
```

1. **Locator** : on décrit la case à cocher. Rien n'est cherché tout de suite (pas de `await`).
2. **Promise.all** : on lance l'écoute du réseau **et** le clic, puis on attend la fin des deux.
3. **waitForResponse** : pour **chaque** réponse reçue par la page, Playwright appelle `res => ...`.
   `false` : on ignore et on attend la suivante. `true` : c'est la bonne, la Promise est résolue.
4. **Bonne URL et succès** : le chemin est exactement `/products` et le statut est 200.
5. **Bon filtre** : le chargement initial de la page appelle aussi `/products`.
   Seul le corps de la requête du filtre contient `by_category`.
   `?? ''` remplace `null` (pas de corps) par une chaîne vide pour que `.includes` ne plante pas.
6. **check()** : coche la case, ce qui déclenche la requête de filtre.
7. **response.json()** : transforme le corps de la réponse en objet `{ total, data: [...] }` et le renvoie au test.

Chronologie :

```
A  waitForResponse  [écoute … /brands ✗ … /products initial ✗ … /products by_category ✓] → résolue
B  check()          [trouve la case → coche] → déclenche la requête de filtre → résolue
await Promise.all   …………………………………………………………………………… ✓ quand A et B sont finies
```

Côté test, on se sert de la réponse comme **référence** :

```ts
const reponse = await homePage.sidebar.filterByCategory('Hammer');
await expect(homePage.grid.titresProduits).toHaveText(reponse.data.map(p => p.name));
```

### Les fonctions fléchées

`res => ...` est une façon courte d'écrire une petite fonction :

```ts
res => res.status() === 200

// équivaut à
function (res) {
  return res.status() === 200;
}
```

### Récapitulatif

| Écriture             | Signification                                     |
| -------------------- | ------------------------------------------------- |
| `Promise<T>`         | une valeur de type `T` qui arrivera plus tard     |
| `async`              | la fonction renvoie une Promise                   |
| `await p`            | attendre que `p` soit résolue, récupérer sa valeur |
| Promise sans `await` | lancer maintenant, attendre plus tard             |
| `Promise.all([a, b])`| lancer `a` et `b` en parallèle, attendre les deux |
| `x ?? y`             | `x`, ou `y` si `x` est `null` / `undefined`       |
| `res => ...`         | fonction fléchée (petite fonction)                |

### Pour aller plus loin

- [MDN : Utiliser les promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises)
- [MDN : async function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function)
- [Playwright : page.waitForResponse](https://playwright.dev/docs/api/class-page#page-wait-for-response)
- Exercice : poser un point d'arrêt dans `filterByCategory` et lancer le test en debug depuis l'extension Playwright de VS Code pour voir `response` arriver.
