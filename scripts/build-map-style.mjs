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
  // Palette « jeu » façon Zenly : terres menthe, mer bleu franc, verts vifs, bâtiments lavande
  land: '#eef6dc',
  water: '#a8ddf5',
  waterDeep: '#9cd6f2',
  waterLine: '#a2daf4',
  wood: '#9de08a',
  grass: '#c6efa4',
  park: '#a8e690',
  sand: '#ffe39a',
  residential: '#f6efd9',
  roadMajor: '#ffffff',
  roadMajorCase: '#d6e6bd',
  roadMinor: '#ffffff',
  label: '#22304a',
  labelWater: '#0e5d8f',
}

// Noms : français d'abord, puis nom local
const NAME = ['coalesce', ['get', 'name:fr'], ['get', 'name'], ['get', 'name_en']];

const DROP = new Set([
  // Allègement pour un zoom fluide : couches peu utiles ici
  'poi_r1', 'poi_transit', 'airport', 'highway-name-path', 'road_area_pattern', 'park_outline',
  'landuse_pitch', 'landuse_track', 'landuse_cemetery', 'landcover_wetland', 'landcover_ice',
  'tunnel_motorway_link_casing', 'tunnel_service_track_casing', 'tunnel_link_casing', 'tunnel_street_casing',
  'tunnel_secondary_tertiary_casing', 'tunnel_trunk_primary_casing', 'tunnel_motorway_casing', 'tunnel_path_pedestrian',
  'tunnel_motorway_link', 'tunnel_service_track', 'tunnel_link', 'tunnel_minor', 'tunnel_secondary_tertiary',
  'tunnel_trunk_primary', 'tunnel_motorway', 'tunnel_major_rail', 'tunnel_major_rail_hatching', 'tunnel_transit_rail',
  'tunnel_transit_rail_hatching', 'road_major_rail_hatching', 'road_transit_rail_hatching', 'bridge_major_rail_hatching',
  'bridge_transit_rail_hatching', 'highway-shield-non-us', 'waterway_tunnel',
  'building-3d', 'road_one_way_arrow', 'road_one_way_arrow_opposite',
  'highway-shield-us-interstate', 'road_shield_us', 'poi_r20', 'poi_r7',
  'landuse_hospital', 'landuse_school', 'aeroway_fill', 'aeroway_runway', 'aeroway_taxiway',
  'label_country_1', 'label_country_2', 'label_country_3',
]);

const recolor = {
  background: { 'background-color': P.land },
  park: { 'fill-color': P.park, 'fill-opacity': 0.8, 'fill-outline-color': 'rgba(0,0,0,0)' },
  landcover_wood: { 'fill-color': P.wood, 'fill-opacity': 0.9 },
  landcover_grass: { 'fill-color': P.grass, 'fill-opacity': 0.8 },
  natural_earth: { 'raster-opacity': ['interpolate', ['linear'], ['zoom'], 0, 0.25, 6, 0.05], 'raster-saturation': -0.8 },
  landcover_sand: { 'fill-color': P.sand },
  landuse_residential: { 'fill-color': P.residential, 'fill-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0.5, 13, 0.8] },
  water: { 'fill-color': ['interpolate', ['linear'], ['zoom'], 6, P.waterDeep, 12, P.water] },
  waterway_river: { 'line-color': P.waterLine },
  waterway_other: { 'line-color': P.waterLine },
  building: { 'fill-color': '#e6def5', 'fill-outline-color': '#d2c6ec' },
};

style.layers = style.layers
  .filter((l) => !DROP.has(l.id))
  .map((l) => {
    const out = structuredClone(l);
    if (recolor[l.id]) out.paint = { ...out.paint, ...recolor[l.id] };
    // Routes : jaune doux, contours orangés
    if (l.type === 'line' && /^(road|bridge|tunnel)_(trunk_primary|secondary_tertiary|link|motorway)(?!_casing)/.test(l.id)) out.paint['line-color'] = P.roadMajor;
    if (l.type === 'line' && /_casing$/.test(l.id) && /(trunk|secondary|motorway|link)/.test(l.id)) out.paint['line-color'] = P.roadMajorCase;
    if (l.type === 'line' && /_casing$/.test(l.id) && !/(trunk|secondary|motorway|link)/.test(l.id)) out.paint['line-color'] = '#e8dcc0';
    if (l.id === 'boundary_3') out.paint = { ...out.paint, 'line-color': 'rgba(120,120,130,0.35)' };
    // Libellés
    if (l.type === 'symbol' && out.layout && out.layout['text-field']) {
      // Seulement les libellés de nom (pas les numéros de route des cartouches)
      if (JSON.stringify(out.layout['text-field']).includes('name')) out.layout['text-field'] = NAME;
      if (l.id.startsWith('label_')) {
        out.paint = { ...out.paint, 'text-color': P.label, 'text-halo-color': '#ffffff', 'text-halo-width': 2.5, 'text-halo-blur': 0 };
        out.layout['text-font'] = ['Noto Sans Bold'];
      }
      if (l.id.startsWith('water_name')) {
        out.paint = { ...out.paint, 'text-color': P.labelWater, 'text-halo-color': 'rgba(255,255,255,0.5)' };
      }
    }
    if (l.id === 'label_other') {
      out.minzoom = 13.5;
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
  maxzoom: 11,
  attribution: 'Relief : Mapzen Terrain Tiles (AWS Open Data)',
};
const hillshade = {
  id: 'hillshade',
  type: 'hillshade',
  source: 'terrain',
  paint: {
    'hillshade-exaggeration': ['interpolate', ['linear'], ['zoom'], 6, 0.45, 12, 0.25],
    'hillshade-shadow-color': '#6f9a5a',
    'hillshade-highlight-color': '#ffffff',
    'hillshade-accent-color': '#6f9a5a',
    'hillshade-illumination-direction': 315,
  },
};
// Ombrage sous l'eau et les routes, au-dessus de la végétation
const iWater = style.layers.findIndex((l) => l.id === 'waterway_tunnel');
style.layers.splice(iWater, 0, hillshade);

// Trait de côte léger pour détacher la terre de la mer
const iAfterWater = style.layers.findIndex((l) => l.id === 'water') + 1;
style.layers.splice(iAfterWater, 0,
  {
    id: 'water_shallow', type: 'line', source: 'openmaptiles', 'source-layer': 'water',
    paint: { 'line-color': '#cdf1fc', 'line-blur': ['interpolate', ['linear'], ['zoom'], 6, 1, 14, 5], 'line-width': ['interpolate', ['linear'], ['zoom'], 6, 2, 10, 7, 14, 16], 'line-opacity': 0.9 },
  },
  {
    id: 'water_outline', type: 'line', source: 'openmaptiles', 'source-layer': 'water',
    paint: { 'line-color': '#ffffff', 'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.8, 10, 1.8, 14, 3], 'line-opacity': 1 },
  },
);

fs.writeFileSync(new URL('../src/data/map-style.json', import.meta.url), JSON.stringify(style));
console.log('map-style.json :', style.layers.length, 'couches');
