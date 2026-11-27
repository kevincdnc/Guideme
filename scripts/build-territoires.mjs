// Construit src/data/territoires.json : un polygone par territoire, pour le mettre en avant sur la carte.
// Territoire = réunion d'intercommunalités (EPCI) ; quelques communes ajoutées à la main
// (îles hors EPCI, Trégor finistérien = partie est de Morlaix Communauté).
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

const TERRITOIRES = {
  'cap-sizun': [...E('242900629'), ...N('Île-de-Sein')],
  brest: [...E('242900314'), ...E('242900074'), ...N('Ouessant')], // Brest métropole & Pays d'Iroise
  leon: E('242900553', '242900793', '200067072', '242900751'), // Abers, Lesneven-Côte des Légendes, Haut-Léon, Landivisiau
  cornouaille: E('200068120', '242900645', '242900660', '242900769', '242900694', '242900561', '200067247'),
  'pays-bigouden': E('242900702', '242900710'),
  tregor: N('Botsorhel', 'Garlan', 'Guerlesquin', 'Guimaëc', 'Lanmeur', 'Lannéanou', 'Locquirec', 'Plouégat-Guérand', 'Plouégat-Moysan',
    "Plouezoc'h", 'Plougasnou', 'Plougonven', 'Plouigneau', 'Plourin-lès-Morlaix', 'Saint-Jean-du-Doigt', 'Ponthou'),
};
const of = {};
Object.entries(TERRITOIRES).forEach(([id, codes]) => codes.forEach((c) => { of[c] = id; }));
const tmp = new URL('./data/.territoires-in.geojson', import.meta.url);
fs.writeFileSync(tmp, JSON.stringify({ type: 'FeatureCollection', features: communes.features.filter((f) => of[f.properties.code]).map((f) => ({ ...f, properties: { id: of[f.properties.code] } })) }));
const outFile = new URL('../src/data/territoires.json', import.meta.url);
execSync(`npx -y mapshaper -i "${tmp.pathname}" -dissolve id -simplify interval=150 keep-shapes -o precision=0.00001 format=geojson "${outFile.pathname}"`, { stdio: 'inherit' });
fs.unlinkSync(tmp);
console.log(`territoires.json : ${(fs.statSync(outFile).size / 1024).toFixed(0)} Ko`);
