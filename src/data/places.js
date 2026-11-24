// Lieux de guideme.bzh : une fiche par fichier dans ./places/.
import pointeDuRaz from './places/pointe-du-raz.js';
import baieDesTrepasses from './places/baie-des-trepasses.js';
import pointeDuVan from './places/pointe-du-van.js';
import audierne from './places/audierne.js';
import menezDregan from './places/menez-dregan.js';
import pointeDuMillier from './places/pointe-du-millier.js';
import ileDeSein from './places/ile-de-sein.js';
import locronan from './places/locronan.js';
import douarnenez from './places/douarnenez.js';
import phareEckmuhl from './places/phare-eckmuhl.js';

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
const SOON = [];

// Durée de lecture à voix haute (~150 mots par minute)
function readingMinutes(place) {
  const text = (place.sections || [])
    .flatMap((s) => [s.title, ...(s.paragraphs || []), ...(s.anecdotes || []).flatMap((a) => [a.title, a.text])])
    .concat(place.film?.summary || [])
    .join(' ');
  return Math.max(1, Math.round(text.split(/\s+/).length / 150));
}

export const PLACES = [pointeDuRaz, baieDesTrepasses, pointeDuVan, ileDeSein, audierne, menezDregan, pointeDuMillier, douarnenez, locronan, phareEckmuhl, ...SOON].map((p) =>
  p.available ? { ...p, readingMinutes: readingMinutes(p) } : p,
);

export const getPlace = (id) => PLACES.find((p) => p.id === id);
