// Construit src/data/territoires.json : un polygone par grand pays (Léon, Cornouaille) et par pays traditionnel,
// pour les mettre en avant sur la carte.
// Zones = réunions d'intercommunalités (EPCI) ; quelques communes ajoutées à la main (îles hors EPCI, Porzay).
// Sources : communes IGN Admin Express via github.com/gregoiredavid/france-geojson (Licence Ouverte) ;
// composition des EPCI : @etalab/decoupage-administratif (Licence Ouverte).
//   node scripts/build-territoires.mjs   (utilise npx mapshaper pour fusionner les communes)
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const communes = JSON.parse(fs.readFileSync(new URL('./data/communes-29.geojson', import.meta.url)));
const epci = JSON.parse(fs.readFileSync(new URL('./data/epci-29.json', import.meta.url)));
const byName = Object.fromEntries(communes.features.map((f) => [f.properties.nom, f.properties.code]));
const E = (...codes) => codes.flatMap((c) => epci[c].communes);
const N = (...names) => names.map((n) => { if (!byName[n]) throw new Error(`Commune inconnue : ${n}`); return byName[n]; });

// Deux grands pays (évêchés), limites approchées par intercommunalités : Léon au nord, Cornouaille au sud
// (le Trégor finistérien est rattaché au Léon avec Morlaix Communauté)
const LEON = E('242900314', '242900074', '242900553', '242900793', '200067072', '242900751', '242900801', '242900835').concat(N('Ouessant', 'Ponthou'));
const leonSet = new Set(LEON);
const CORNOUAILLE = communes.features.map((f) => f.properties.code).filter((c) => !leonSet.has(c));
// Pays traditionnels qui ont au moins une fiche
const PAYS = {
  'cap-sizun': [...E('242900629'), ...N('Île-de-Sein')],
  brest: [...E('242900314'), ...E('242900074'), ...N('Ouessant')], // Brest métropole & Pays d'Iroise
  abers: E('242900553'),
  'haut-leon': E('200067072'),
  'pays-bigouden': E('242900702', '242900710'),
  'douarnenez-porzay': [...E('242900645'), ...N('Locronan', 'Plonévez-Porzay', 'Plomodiern', 'Saint-Nic', 'Ploéven', 'Kerlaz')],
  'concarneau-aven': E('242900769', '242900660'), // Concarneau Cornouaille Agglomération & Pays Fouesnantais (Glénan)
};
// Une couche par niveau (les zones se superposent) : grands pays, puis pays traditionnels
const layer = (groups) => { const of = {}; Object.entries(groups).forEach(([id, codes]) => codes.forEach((c) => { of[c] = id; })); return of; };
const outFile = new URL('../src/data/territoires.json', import.meta.url);
const merged = [];
[layer({ leon: LEON, cornouaille: CORNOUAILLE }), layer(PAYS)].forEach((of, i) => {
  const tmp = new URL(`./data/.territoires-${i}.geojson`, import.meta.url);
  const out = new URL(`./data/.territoires-${i}-out.geojson`, import.meta.url);
  fs.writeFileSync(tmp, JSON.stringify({ type: 'FeatureCollection', features: communes.features.filter((f) => of[f.properties.code]).map((f) => ({ ...f, properties: { id: of[f.properties.code] } })) }));
  execSync(`npx -y mapshaper -i "${tmp.pathname}" -dissolve id -simplify interval=150 keep-shapes -o precision=0.00001 format=geojson "${out.pathname}"`, { stdio: 'inherit' });
  merged.push(...JSON.parse(fs.readFileSync(out)).features);
  fs.unlinkSync(tmp); fs.unlinkSync(out);
});
fs.writeFileSync(outFile, JSON.stringify({ type: 'FeatureCollection', features: merged }));
console.log(`territoires.json : ${(fs.statSync(outFile).size / 1024).toFixed(0)} Ko`);
