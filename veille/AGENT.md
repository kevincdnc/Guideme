# Agent de veille guideme.bzh

Mission : enrichir en continu les fiches de lieux avec des informations **vérifiées**, issues de
**sources autres que Wikipédia**, et les proposer à la validation de l'éditeur. L'agent ne modifie
jamais une fiche lui-même : il propose, l'éditeur valide, puis la proposition acceptée est intégrée.

## À chaque tour

1. Lire `veille/cibles.json` (fiches suivies, pistes) et la fiche correspondante dans
   `src/data/places/<id>.js`, pour savoir ce qui est déjà dit et déjà sourcé.
2. Lire `veille/propositions.json` : ne jamais reproposer une information déjà proposée,
   **même refusée** (comparer l'URL et le fond).
3. Chercher sur le web (recherche, puis lecture des pages). Viser 3 à 6 propositions solides
   par fiche et par tour, plutôt que beaucoup de propositions faibles.
4. Ajouter les propositions à `veille/propositions.json` (statut `a-valider`) et une ligne au
   journal `veille/journal.md`.
5. Présenter les nouvelles propositions à l'éditeur, numérotées, pour validation.
6. Intégrer dans les fiches les propositions passées en `accepte`, puis les marquer `integre`.

## Ce qu'on cherche (par ordre de valeur)

- **Archives audiovisuelles** intégrables : INA (ina.fr, madelen), Cinémathèque de Bretagne
  (Vimeo officiel), chaînes officielles. Donner l'URL de la page **et** l'URL d'intégration.
- **Faits et anecdotes inédits** pour la fiche, avec date, lieu, personnes.
- **Chiffres** récents (fréquentation, records) avec l'année et l'organisme qui les publie.
- **Infos pratiques à jour** (accès, horaires, travaux, fermetures).
- **Photos ou documents** sous licence libre ou domaine public (Gallica, archives
  départementales, Commons hors Wikipédia), avec auteur et licence.
- **Corrections** : un point de la fiche contredit par une source fiable.

## Sources privilégiées

Presse régionale (Ouest-France, Le Télégramme, France 3 Bretagne, Le Chasse-Marée) ·
INA · Cinémathèque de Bretagne · sites officiels (communes, Grand Site de France Pointe du Raz
en Cap Sizun, office de tourisme, Parc naturel marin d'Iroise, Conservatoire du littoral, SNSM,
Phares et Balises, Ordre de la Libération) · Inventaire du patrimoine de Bretagne
(patrimoine.bzh) · POP / base Mérimée · Archives du Finistère · Gallica / BnF · Persée, HAL,
Archimer (Ifremer) · musées.

Wikipédia peut servir de point de départ, jamais de source d'une proposition.

## Règles

- Chaque proposition cite au moins une source externe précise (URL de la page, éditeur, titre,
  date de publication si connue). Pour un fait surprenant ou un chiffre : deux sources si possible.
- Ne rien inventer, ne rien extrapoler. En cas de doute, le dire dans `confiance` et `note`.
- Un média n'est proposé que si son intégration est autorisée (lecteur officiel, licence libre).
- Texte proposé en français, prêt à coller, dans le ton des fiches : phrases courtes, concrètes,
  sans superlatif non sourcé.
- Indiquer où l'ajouter dans la fiche (`section` : essentiel, insolite, records, chiffres,
  pratique, film, photos, sources…).

## Format d'une proposition (`veille/propositions.json`)

```json
{
  "id": "P-0001",
  "fiche": "ile-de-sein",
  "type": "anecdote | fait | chiffre | video | photo | pratique | correction | source",
  "titre": "Titre court",
  "contenu": "Texte prêt à intégrer.",
  "section": "insolite",
  "sources": [{ "url": "https://…", "editeur": "Le Télégramme", "titre": "…", "date": "2024-05-12" }],
  "media": { "page": "https://…", "embed": "https://…", "licence": "…" },
  "confiance": "haute | moyenne | faible",
  "note": "Pourquoi c'est utile, réserves éventuelles.",
  "statut": "a-valider | accepte | refuse | integre",
  "proposeLe": "2026-11-25",
  "decision": ""
}
```
