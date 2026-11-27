// Lieux de guideme.bzh : une fiche par fichier dans ./places/.
import { HERO_OVERRIDES } from './heroOverrides.js';
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
import concarneau from './places/concarneau.js';
import pontAven from './places/pont-aven.js';
import phareArMen from './places/phare-ar-men.js';
import phareTevennec from './places/phare-tevennec.js';
import phareVieille from './places/phare-vieille.js';
import phareSein from './places/phare-sein.js';
import phareKereon from './places/phare-kereon.js';
import phareJument from './places/phare-jument.js';
import phareCreach from './places/phare-creach.js';
import phareStiff from './places/phare-stiff.js';
import phareFour from './places/phare-four.js';
import pharePierresNoires from './places/phare-pierres-noires.js';
import phareIleVierge from './places/phare-ile-vierge.js';
import phareSaintMathieu from './places/phare-saint-mathieu.js';
import pharePetitMinou from './places/phare-petit-minou.js';
import phareTrezien from './places/phare-trezien.js';
import phareBatz from './places/phare-batz.js';
import pharePortzic from './places/phare-portzic.js';
import pharePenfret from './places/phare-penfret.js';
import phareKermorvan from './places/phare-kermorvan.js';

export const FINISTERE_BOUNDS = [
  [-5.2, 47.68], // sud-ouest (Sein, Glénan)
  [-3.38, 48.78], // nord-est (Morlaix, Locquirec)
];

// Catégories (puces de navigation au-dessus des lieux)
export const TAGS = [
  { id: 'nature', label: 'Site naturel', icon: 'tNature' },
  { id: 'prehistoire', label: 'Préhistoire', icon: 'tPrehistoire' },
  { id: 'phare', label: 'Phare', icon: 'tPhare' },
  { id: 'histoire', label: 'Patrimoine', icon: 'tPatrimoine' },
  { id: 'legende', label: 'Légendaire', icon: 'tLegende' }, // sélection des spots les plus extraordinaires (records, histoires hors normes)
  { id: 'plage', label: 'Plage', icon: 'tPlage' },
  { id: 'port', label: 'Port', icon: 'tPort' },
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

// Territoires du Finistère (ordre d'affichage). flag : drapeau dans public/territoires/<id>.svg
// (false = logo pas encore dessiné). Rattachement d'après les intercommunalités / pays historiques.
export const REGIONS = [
  { id: 'cap-sizun', label: 'Cap Sizun', flag: true, ids: ['pointe-du-raz', 'phare-vieille', 'baie-des-trepasses', 'pointe-du-van', 'phare-tevennec', 'audierne', 'menez-dregan', 'pointe-du-millier', 'ile-de-sein', 'phare-sein', 'phare-ar-men'] },
  { id: 'iroise', label: "Pays d'Iroise", flag: false, ids: ['phare-creach', 'phare-stiff', 'phare-jument', 'phare-kereon', 'phare-pierres-noires', 'phare-saint-mathieu', 'phare-kermorvan', 'phare-trezien', 'phare-four'] },
  { id: 'brest', label: 'Brest', flag: true, ids: ['phare-petit-minou', 'phare-portzic'] },
  { id: 'leon', label: 'Léon', flag: true, ids: ['phare-ile-vierge', 'phare-batz'] },
  { id: 'cornouaille', label: 'Cornouaille', flag: true, ids: ['douarnenez', 'locronan', 'concarneau', 'phare-penfret', 'pont-aven'] },
  { id: 'pays-bigouden', label: 'Pays Bigouden', flag: true, ids: ['phare-eckmuhl'] },
  { id: 'tregor', label: 'Trégor', flag: true, ids: [] },
];
export const regionOf = (id) => REGIONS.find((r) => r.ids.includes(id));
const REGION_OF = Object.fromEntries(REGIONS.flatMap((r) => r.ids.map((id) => [id, r.id])));

// Studio (/admin) : en mode aperçu (?preview=1), les brouillons du navigateur remplacent les champs des fiches
function withDrafts(list) {
  if (typeof window === 'undefined' || !/[?&]preview=1/.test(window.location.search)) return list;
  let drafts = {};
  try { drafts = JSON.parse(window.localStorage.getItem('guideme:studio:drafts') || '{}'); } catch { /* ignore */ }
  return list.map((p) => (drafts[p.id] ? { ...p, ...drafts[p.id] } : p));
}

// Nouvelle photo principale ; l'ancienne passe en tête des autres photos
function withHero(p) {
  const h = HERO_OVERRIDES[p.id];
  if (!h || !p.hero) return p;
  const old = { src: p.hero.src, caption: p.hero.alt, credit: p.hero.credit };
  return { ...p, hero: h, photos: [old, ...(p.photos || []).filter((x) => x.src !== old.src)] };
}

// Ordre « exceptionnel → moins exceptionnel » (classement éditorial de la liste des 100, à affiner)
export const RANK = ['pointe-du-raz', 'phare-ile-vierge', 'phare-ar-men', 'phare-jument', 'phare-vieille', 'locronan', 'phare-creach',
  'phare-tevennec', 'phare-eckmuhl', 'phare-kereon', 'concarneau', 'phare-saint-mathieu', 'menez-dregan', 'phare-petit-minou', 'ile-de-sein',
  'pointe-du-van', 'baie-des-trepasses', 'pont-aven', 'phare-kermorvan', 'phare-stiff', 'phare-penfret', 'phare-sein', 'douarnenez',
  'audierne', 'phare-four', 'phare-pierres-noires', 'phare-batz', 'phare-trezien', 'phare-portzic', 'pointe-du-millier'];

export const PLACES = withDrafts([pointeDuRaz, baieDesTrepasses, pointeDuVan, ileDeSein, audierne, menezDregan, pointeDuMillier, douarnenez, locronan, phareEckmuhl, concarneau, pontAven, phareArMen, phareTevennec, phareVieille, phareSein, phareKereon, phareJument, phareCreach, phareStiff, phareFour, pharePierresNoires, phareIleVierge, phareSaintMathieu, pharePetitMinou, phareTrezien, phareBatz, pharePortzic, pharePenfret, phareKermorvan, ...SOON].map(withHero)).map((p) =>
  p.available ? { ...p, region: REGION_OF[p.id], readingMinutes: readingMinutes(p) } : p,
);

export const getPlace = (id) => PLACES.find((p) => p.id === id);

// Contrôle : chaque lieu a une sous-région
PLACES.forEach((p) => { if (p.available && !p.region) console.warn('Lieu sans sous-région :', p.id); });
