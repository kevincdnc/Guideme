# guideme.bzh

Guides de lieux du Finistère, pensés pour le téléphone : une carte colorée du département,
des repères sur les lieux qui ont une fiche, et pour chaque lieu une fiche avec texte,
anecdotes insolites, archives d'époque, vidéos et **lecture audio** du texte.

## Ce qu'il y a dedans

| Écran | Mobile | Desktop |
|---|---|---|
| Carte | Carte vectorielle sobre avec relief ; de loin, petits points pour une vue d'ensemble du Finistère ; filtres par catégorie ; carrousel de lieux en bas | Panneau de lieux et filtres à gauche, carte à droite |
| Fiche (panneau) `#/lieu/<id>` | Plein écran | Moitié gauche de l'écran, carte visible à droite avec les points cités ; bouton « Fiche complète » |
| Fiche complète `lieu/<id>/` | Page complète | Vraie page sur deux colonnes (« En bref » et infos pratiques à droite), générée en HTML au build (titre, description, données structurées) pour le référencement |
| Audio | Lecteur flottant : lecture paragraphe par paragraphe, surlignage, précédent / suivant, vitesse | idem |

- **Fiches disponibles** : Pointe du Raz & phare de la Vieille, Baie des Trépassés, Pointe du Van & chapelle Saint-They,
  Île de Sein (avec le film « La Mer et les Jours », 1958, lecteur Vimeo de la Cinémathèque de Bretagne),
  Audierne, Menez Dregan, Pointe du Millier.
- **PWA** : installable sur l'écran d'accueil ; tuiles de carte et images déjà vues restent disponibles hors ligne.

## Développer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dossier dist/
npm run preview  # sert dist/ sur http://localhost:4173
```

Adresses : `/Guideme/` (carte), `/Guideme/#/lieu/<id>` (fiche en panneau), `/Guideme/lieu/<id>/` (fiche complète).
Le build génère aussi `sitemap.xml` et `robots.txt` (`scripts/prerender.mjs`). Pour le domaine guideme.bzh :

```bash
GUIDEME_BASE=/ GUIDEME_SITE=https://guideme.bzh/ npm run build
```

## Organisation

| Fichier | Rôle |
|---|---|
| `src/data/places.js` | Liste des lieux, catégories (`TAGS`), lieux « bientôt », durée d'écoute calculée |
| `src/data/places/*.js` | Une fiche par fichier : textes, chiffres, anecdotes, frise, médias, sources |
| `src/data/map-style.json` | Style de carte, généré par `node scripts/build-map-style.mjs` |
| `src/App.jsx` | Écran carte : carrousel mobile, panneau desktop, navigation |
| `src/components/MapView.jsx` | Carte MapLibre (tuiles vectorielles OpenFreeMap + relief), repères, regroupement, points secondaires |
| `src/components/Guide.jsx` | Fiche lieu et lecteur audio |
| `src/hooks/useSpeech.js` | Lecture audio par la synthèse vocale de l'appareil (Web Speech API) |
| `src/components/Lightbox.jsx` | Visionneuse d'images plein écran |
| `src/styles.css` | Thème clair (jetons de couleur en tête de fichier) |

## Ajouter un lieu

Créer un fichier dans `src/data/places/` (modèle : `pointe-du-raz.js`) et l'ajouter à la liste
dans `src/data/places.js`. `tags` place le lieu dans les filtres, `icon` choisit le pictogramme du repère
(`lighthouse`, `beach`, `cliff`, `port`, `fire`). Un lieu sans fiche va dans `SOON`.

## Médias et droits

- Textes rédigés pour l'app à partir des articles Wikipédia cités en bas de fiche.
- Images et vidéos : chargées depuis Wikimedia Commons (gardées en cache par l'app pour le hors ligne), domaine public ou licences libres (CC BY, CC BY-SA),
  auteur et licence affichés sous chaque média avec un lien vers la page du fichier.
- Fond de carte : tuiles vectorielles OpenFreeMap (données © OpenStreetMap, schéma OpenMapTiles),
  style recoloré par `scripts/build-map-style.mjs` ; relief ombré à partir des tuiles d'altitude
  Terrarium (Mapzen, AWS Open Data). Sans clé ni compte.

## Audio

La lecture utilise les voix installées sur l'appareil (aucun fichier audio, fonctionne hors ligne).
La qualité dépend du téléphone ; l'app choisit la voix française la plus naturelle disponible.
Si aucune voix n'est disponible, un message l'indique.
