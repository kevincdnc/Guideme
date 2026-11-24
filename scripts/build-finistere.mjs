// Construit src/data/finistere.json pour mettre le Finistère en avant sur la carte :
//  - « voisins » : les départements voisins (22, 56, 35), grisés sur la carte (la mer reste bleue) ;
//  - « limite » : la frontière terrestre du Finistère, tracée en pointillés.
// Source : IGN Admin Express via github.com/gregoiredavid/france-geojson (Licence Ouverte).
//   node scripts/build-finistere.mjs
import fs from 'node:fs';

const read = (f) => JSON.parse(fs.readFileSync(new URL(`./data/${f}.geojson`, import.meta.url)));
const rings = (feat) => (feat.geometry.type === 'MultiPolygon' ? feat.geometry.coordinates : [feat.geometry.coordinates]).map((p) => p[0]);
const key = ([x, y]) => `${x.toFixed(5)},${y.toFixed(5)}`;

// Douglas-Peucker (tolérance en degrés)
function simplify(pts, tol) {
  if (pts.length < 4) return pts;
  const sq = (a, b, p) => {
    const [x, y] = a, [dx, dy] = [b[0] - x, b[1] - y];
    const t = dx || dy ? Math.max(0, Math.min(1, ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy))) : 0;
    return (p[0] - x - t * dx) ** 2 + (p[1] - y - t * dy) ** 2;
  };
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop(); let max = 0, idx = -1;
    for (let i = a + 1; i < b; i++) { const d = sq(pts[a], pts[b], pts[i]); if (d > max) { max = d; idx = i; } }
    if (max > tol * tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]).map(([x, y]) => [Math.round(x * 1e4) / 1e4, Math.round(y * 1e4) / 1e4]);
}
const area = (r) => Math.abs(r.reduce((s, p, i) => { const q = r[(i + 1) % r.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2);

const fin = rings(read('29-finistere'));
const neighbours = ['22-cotes-d-armor', '56-morbihan', '35-ille-et-vilaine'].flatMap((d) => rings(read(d)));

// Départements voisins, simplifiés (les îlots minuscules sont ignorés)
const voisins = neighbours.filter((r) => area(r) > 1e-4).map((r) => [simplify(r, 0.002)]);

// Frontière terrestre : sommets du Finistère partagés avec un voisin, enchaînés
const shared = new Set(neighbours.flat().map(key));
const lines = [];
for (const ring of fin) {
  let cur = [];
  for (const p of ring) {
    if (shared.has(key(p))) cur.push(p);
    else if (cur.length) { if (cur.length > 1) lines.push(cur); cur = []; }
  }
  if (cur.length > 1) lines.push(cur);
}
const limite = lines.map((l) => simplify(l, 0.0003)).filter((l) => l.length > 1);

const out = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: { role: 'voisins' }, geometry: { type: 'MultiPolygon', coordinates: voisins } },
    { type: 'Feature', properties: { role: 'limite' }, geometry: { type: 'MultiLineString', coordinates: limite } },
  ],
};
fs.writeFileSync(new URL('../src/data/finistere.json', import.meta.url), JSON.stringify(out));
console.log(`finistere.json : ${voisins.length} polygones voisins, ${limite.length} tronçons de limite (${limite.reduce((s, l) => s + l.length, 0)} points)`);
