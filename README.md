# guideme.bzh

Guides de lieux du Finistère, pensés pour le téléphone : une carte colorée du département,
des repères sur les lieux qui ont une fiche, et pour chaque lieu une fiche avec texte,
anecdotes insolites, archives d'époque, vidéos et **lecture audio** du texte.

## Ce qu'il y a dedans

| Écran | Mobile | Desktop |
|---|---|---|
| Carte | Carte plein écran (fond relief Esri, comme la carte « Relief » de Printrace), carrousel de lieux en bas | Panneau de lieux à gauche, carte à droite |
| Fiche | Plein écran : image, chiffres clés, sections, anecdotes, frise, archives, vidéos, infos pratiques | Panneau de 560 px à gauche, la carte montre le lieu et les points cités |
| Audio | Lecteur flottant : lecture paragraphe par paragraphe, surlignage, précédent / suivant, vitesse | idem |

- **Fiche disponible** : Pointe du Raz & phare de la Vieille.
- **Repères « bientôt »** (grisés, non cliquables vers une fiche) : Pointe du Millier, Menez Dregan, Audierne.
- **PWA** : installable sur l'écran d'accueil ; tuiles de carte et images déjà vues restent disponibles hors ligne.

## Développer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dossier dist/
npm run preview  # sert dist/ sur http://localhost:4173
```

Navigation par hash : `#/` (carte), `#/lieu/pointe-du-raz` (fiche). La base est relative (`./`) :
le build marche à la racine d'un domaine (guideme.bzh) comme dans un sous-dossier.

## Organisation

| Fichier | Rôle |
|---|---|
| `src/data/places.js` | Contenu des lieux : textes, chiffres, anecdotes, frise, médias, sources |
| `src/App.jsx` | Écran carte : carrousel mobile, panneau desktop, navigation |
| `src/components/MapView.jsx` | Carte MapLibre (fond raster Esri World Topo), repères, points secondaires |
| `src/components/Guide.jsx` | Fiche lieu et lecteur audio |
| `src/hooks/useSpeech.js` | Lecture audio par la synthèse vocale de l'appareil (Web Speech API) |
| `src/components/Lightbox.jsx` | Visionneuse d'images plein écran |
| `src/styles.css` | Thème clair (jetons de couleur en tête de fichier) |
| `public/media/` | Images de la fiche, hébergées avec l'app |

## Ajouter un lieu

Ajouter un objet dans `PLACES` (`src/data/places.js`). Avec `available: false`, le repère
apparaît en gris « Bientôt » ; passer à `true` et remplir `sections`, `archives`, `photos`,
`videos`, `practical`, `sources` pour publier la fiche (modèle : `pointe-du-raz`).

## Médias et droits

- Textes rédigés pour l'app à partir des articles Wikipédia cités en bas de fiche.
- Images et vidéos : Wikimedia Commons, domaine public ou licences libres (CC BY, CC BY-SA),
  auteur et licence affichés sous chaque média avec un lien vers la page du fichier.
- Fond de carte : Esri World Topo Map. Les conditions d'Esri encadrent l'usage commercial :
  à vérifier avant une mise en production commerciale (alternative : un style vectoriel
  OpenFreeMap / OpenMapTiles).

## Audio

La lecture utilise les voix installées sur l'appareil (aucun fichier audio, fonctionne hors ligne).
La qualité dépend du téléphone ; l'app choisit la voix française la plus naturelle disponible.
Si aucune voix n'est disponible, un message l'indique.
