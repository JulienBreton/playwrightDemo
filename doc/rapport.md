### Rapport

Commande pour voir le rapport : `npx playwright show-report`

La configuration dans playwright.config.ts :

```typescript
    /* Capture de preuves complète dès le premier échec */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
```

- trace: 'retain-on-failure' : conserve la trace uniquement si le test échoue (sinon elle serait supprimée, contrairement à 'on' qui la garde toujours, ou 'on-first-retry' qui ne la capture qu'à la première retentative).
- screenshot: 'only-on-failure' : une seule capture d'écran, prise au moment de l'échec.
- video: 'retain-on-failure' : la vidéo complète du test est conservée seulement si le test a échoué.

En cas d'échec, dans le rapport on voit :
- La ligne où l'erreur a été rencontrée dans le script de test.
- L'étape du test où l'erreur a été rencontrée.
- Le screenshot du moment de l'erreur.
- La trace (on peut l'ouvrir directement depuis le rapport)
- La vidéo
- Les attachments
