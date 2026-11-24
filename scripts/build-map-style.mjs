// Construit src/data/map-style.json à partir du style « Liberty » d'OpenFreeMap
// (copie dans scripts/liberty.base.json) : couleurs plus vives et douces,
// relief ombré (MNT Terrarium), noms en français, couches superflues retirées.
//   node scripts/build-map-style.mjs
import fs from 'node:fs';

const base = JSON.parse(fs.readFileSync(new URL('./liberty.base.json', import.meta.url)));
const style = structuredClone(base);
style.name = 'guideme.bzh';

// ---- Palette
const P = {
  // Palette sobre : terres claires, mer bleu-gris, végétation à peine teintée
  land: '#f3f1ec',
  water: '#cfe1ec',
  waterDeep: '#c4d9e6',
  waterLine: '#a9c6d8',
  wood: '#dbe5d0',
  grass: '#e4ebda',
  park: '#dce7d1',
  sand: '#efe8d4',
  residential: '#ebe7e0',
  roadMajor: '#ffffff',
  roadMajorCase: '#dcd5ca',
  roadMinor: '#ffffff',
  label: '#3d4450',
  labelWater: '#5f7f97',
}

// Noms : français d'abord, puis nom local
const NAME = ['coalesce', ['get', 'name:fr'], ['get', 'name'], ['get', 'name_en']];

const DROP = new Set([
  'building-3d', 'road_one_way_arrow', 'road_one_way_arrow_opposite',
  'highway-shield-us-interstate', 'road_shield_us', 'poi_r20', 'poi_r7',
  'landuse_hospital', 'landuse_school', 'aeroway_fill', 'aeroway_runway', 'aeroway_taxiway',
  'label_country_1', 'label_country_2', 'label_country_3',
]);

const recolor = {
  background: { 'background-color': P.land },
  park: { 'fill-color': P.park, 'fill-opacity': 0.7, 'fill-outline-color': 'rgba(0,0,0,0)' },
  landcover_wood: { 'fill-color': P.wood, 'fill-opacity': 0.8 },
  landcover_grass: { 'fill-color': P.grass, 'fill-opacity': 0.7 },
  natural_earth: { 'raster-opacity': ['interpolate', ['linear'], ['zoom'], 0, 0.25, 6, 0.05], 'raster-saturation': -0.8 },
  landcover_sand: { 'fill-color': P.sand },
  landuse_residential: { 'fill-color': P.residential, 'fill-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0.5, 13, 0.8] },
  water: { 'fill-color': ['interpolate', ['linear'], ['zoom'], 6, P.waterDeep, 12, P.water] },
  waterway_river: { 'line-color': P.waterLine },
  waterway_other: { 'line-color': P.waterLine },
  building: { 'fill-color': '#e7ded0', 'fill-outline-color': '#d6cab8' },
};

style.layers = style.layers
  .filter((l) => !DROP.has(l.id))
  .map((l) => {
    const out = structuredClone(l);
    if (recolor[l.id]) out.paint = { ...out.paint, ...recolor[l.id] };
    // Routes : jaune doux, contours orangés
    if (l.type === 'line' && /^(road|bridge|tunnel)_(trunk_primary|secondary_tertiary|link|motorway)(?!_casing)/.test(l.id)) out.paint['line-color'] = P.roadMajor;
    if (l.type === 'line' && /_casing$/.test(l.id) && /(trunk|secondary|motorway|link)/.test(l.id)) out.paint['line-color'] = P.roadMajorCase;
    if (l.type === 'line' && /_casing$/.test(l.id) && !/(trunk|secondary|motorway|link)/.test(l.id)) out.paint['line-color'] = '#e3dfd8';
    if (l.id === 'boundary_3') out.paint = { ...out.paint, 'line-color': 'rgba(120,120,130,0.35)' };
    // Libellés
    if (l.type === 'symbol' && out.layout && out.layout['text-field']) {
      // Seulement les libellés de nom (pas les numéros de route des cartouches)
      if (JSON.stringify(out.layout['text-field']).includes('name')) out.layout['text-field'] = NAME;
      if (l.id.startsWith('label_')) {
        out.paint = { ...out.paint, 'text-color': P.label, 'text-halo-color': 'rgba(255,255,255,0.92)', 'text-halo-width': 1.6, 'text-halo-blur': 0.3 };
      }
      if (l.id.startsWith('water_name')) {
        out.paint = { ...out.paint, 'text-color': P.labelWater, 'text-halo-color': 'rgba(255,255,255,0.5)' };
      }
    }
    if (l.id === 'label_other') {
      out.minzoom = 12.5;
      out.paint = { ...out.paint, 'text-color': '#6b7280' };
    }
    if (l.id === 'label_village') out.minzoom = 9.5;
    if (l.id === 'label_city' || l.id === 'label_town') {
      out.layout['text-font'] = ['Noto Sans Bold'];
    }
    return out;
  });

// ---- Relief ombré (MNT Terrarium, AWS Open Data)
style.sources.terrain = {
  type: 'raster-dem',
  tiles: ['https://elevation-tiles-prod.s3.amazonaws.com/terrarium/{z}/{x}/{y}.png'],
  encoding: 'terrarium',
  tileSize: 256,
  maxzoom: 14,
  attribution: 'Relief : Mapzen Terrain Tiles (AWS Open Data)',
};
const hillshade = {
  id: 'hillshade',
  type: 'hillshade',
  source: 'terrain',
  paint: {
    'hillshade-exaggeration': ['interpolate', ['linear'], ['zoom'], 6, 0.35, 10, 0.25, 14, 0.15],
    'hillshade-shadow-color': '#8b8579',
    'hillshade-highlight-color': '#ffffff',
    'hillshade-accent-color': '#8b8579',
    'hillshade-illumination-direction': 315,
  },
};
// Ombrage sous l'eau et les routes, au-dessus de la végétation
const iWater = style.layers.findIndex((l) => l.id === 'waterway_tunnel');
style.layers.splice(iWater, 0, hillshade);

// Trait de côte léger pour détacher la terre de la mer
const iAfterWater = style.layers.findIndex((l) => l.id === 'water') + 1;
style.layers.splice(iAfterWater, 0, {
  id: 'water_outline', type: 'line', source: 'openmaptiles', 'source-layer': 'water',
  paint: { 'line-color': 'rgba(95,127,151,0.35)', 'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.3, 14, 1] },
});

fs.writeFileSync(new URL('../src/data/map-style.json', import.meta.url), JSON.stringify(style));
console.log('map-style.json :', style.layers.length, 'couches');
