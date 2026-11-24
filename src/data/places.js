// Lieux de guideme.bzh : une fiche par fichier dans ./places/.
import pointeDuRaz from './places/pointe-du-raz.js';
import baieDesTrepasses from './places/baie-des-trepasses.js';
import pointeDuVan from './places/pointe-du-van.js';
import audierne from './places/audierne.js';
import menezDregan from './places/menez-dregan.js';
import pointeDuMillier from './places/pointe-du-millier.js';

export const FINISTERE_BOUNDS = [
  [-5.2, 47.68], // sud-ouest (Sein, Glénan)
  [-3.38, 48.78], // nord-est (Morlaix, Locquirec)
];

// Catégories (puces de navigation au-dessus des lieux)
export const TAGS = [
  { id: 'nature', label: 'Sites naturels', icon: 'cliff' },
  { id: 'phare', label: 'Phares', icon: 'lighthouse' },
  { id: 'histoire', label: 'Patrimoine & histoire', icon: 'book' },
  { id: 'legende', label: 'Légendes', icon: 'spark' },
  { id: 'plage', label: 'Plages', icon: 'beach' },
  { id: 'port', label: 'Ports', icon: 'port' },
  { id: 'prehistoire', label: 'Préhistoire', icon: 'fire' },
];

// Lieux annoncés, sans fiche pour l'instant
const SOON = [
  {
    id: 'ile-de-sein',
    available: false,
    title: 'Île de Sein',
    shortTitle: 'Île de Sein',
    commune: 'Île-de-Sein',
    coords: [-4.8506, 48.0375],
    category: 'Île',
    tags: ['nature', 'port'],
    teaser: 'Une île plate au bout du raz, à peine au-dessus des vagues.',
  },
];

// Durée de lecture à voix haute (~150 mots par minute)
function readingMinutes(place) {
  const text = (place.sections || [])
    .flatMap((s) => [s.title, ...(s.paragraphs || []), ...(s.anecdotes || []).flatMap((a) => [a.title, a.text])])
    .join(' ');
  return Math.max(1, Math.round(text.split(/\s+/).length / 150));
}

export const PLACES = [pointeDuRaz, baieDesTrepasses, pointeDuVan, audierne, menezDregan, pointeDuMillier, ...SOON].map((p) =>
  p.available ? { ...p, readingMinutes: readingMinutes(p) } : p,
);

export const getPlace = (id) => PLACES.find((p) => p.id === id);
