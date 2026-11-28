// « Terres découvertes » : les terres sont légèrement grisées, sauf autour des lieux visités
// qui gardent leurs couleurs. La mer n'est jamais grisée (le voile passe sous le calque de la mer).
// Bord adouci : plusieurs voiles empilés, de plus en plus larges et légers.
import polygonClipping from 'polygon-clipping';

export const DISCOVERY = {
  color: '#cfd0cc', // gris neutre à peine chaud : les terres gardent un peu de saturation
  radiusKm: 8,
  // [facteur de rayon, opacité] : plus on s'éloigne du lieu visité, plus le voile s'épaissit
  steps: [[1, 0.22], [1.25, 0.18], [1.55, 0.15], [1.9, 0.12]],
};
const WORLD = [[[-9, 45.5], [1, 45.5], [1, 51], [-9, 51], [-9, 45.5]]];

function circle([lng, lat], km, n = 56) {
  const r = km / 111.2, kx = r / Math.cos((lat * Math.PI) / 180), pts = [];
  for (let i = 0; i < n; i++) { const a = (i / n) * 2 * Math.PI; pts.push([lng + kx * Math.cos(a), lat + r * Math.sin(a)]); }
  pts.push(pts[0]);
  return [pts];
}

// points : [{ c: [lng, lat], k: 0..1 }] (k = avancement de l'animation de découverte)
export function discoveryData(points) {
  const features = DISCOVERY.steps.map(([f, o], i) => {
    const holes = points.filter((p) => p.k > 0.01).map((p) => circle(p.c, DISCOVERY.radiusKm * f * p.k));
    let geom = WORLD;
    try { if (holes.length) geom = polygonClipping.difference(WORLD, polygonClipping.union(...holes)); } catch (e) { /* géométrie dégénérée : voile plein */ }
    return { type: 'Feature', properties: { o, i }, geometry: { type: 'MultiPolygon', coordinates: geom.length && typeof geom[0][0][0] === 'number' ? [geom] : geom } };
  });
  return { type: 'FeatureCollection', features };
}
