// Drapeaux des territoires : drapeau entouré d'un contour de progression (façon jeu).
// Drapeau grisé tant qu'aucun spot du territoire n'est visité.
import { regionOf } from '../data/places.js';

const BASE = (import.meta.env && import.meta.env.BASE_URL) || '/Guideme/';
export const flagSrc = (r) => `${BASE}territoires/${r.id}.svg`;

// Drapeau seul (drapeau du Finistère en attendant celui du territoire)
export function TerritoryFlag({ region, className = '' }) {
  const src = region.flag ? flagSrc(region) : `${BASE}territoires/finistere.svg`;
  return <img className={`terr-flag ${className}`} src={src} alt="" draggable="false" />;
}

// Drapeau rectangulaire entouré d'un contour de progression (même principe que la jauge de la barre)
export function TerritoryTile({ region, n, total, w = 64 }) {
  const h = Math.round(w / 1.4);
  const gap = 8; // espace entre le drapeau et le contour
  const W = w + gap * 2 + 4, H = h + gap * 2 + 4, inset = 1.5, r = 10;
  const pct = total ? Math.round((n / total) * 100) : 0;
  const state = !total ? 'soon' : n === 0 ? 'none' : n === total ? 'full' : 'some';
  return (
    <span className={`terr-tile is-${state}`} style={{ width: W, height: H }}>
      <svg width={W} height={H} aria-hidden="true">
        <rect className="terr-track" x={inset} y={inset} width={W - inset * 2} height={H - inset * 2} rx={r} ry={r} strokeWidth={1} />
        {pct > 0 && <rect className="terr-arc" x={inset} y={inset} width={W - inset * 2} height={H - inset * 2} rx={r} ry={r} strokeWidth={3} pathLength="100" strokeDasharray={`${pct} 100`} />}
      </svg>
      <span className="terr-tile-flag" style={{ width: w, height: h }}><TerritoryFlag region={region} /></span>
      {state === 'full' && <span className="terr-crown" aria-hidden="true">★</span>}
    </span>
  );
}

// Badge territoire sur la fiche
export function TerritoryBadge({ placeId, className = '' }) {
  const region = regionOf(placeId);
  if (!region) return null;
  return (
    <div className={`terr-badge ${className}`}>
      <span className="terr-badge-flag"><TerritoryFlag region={region} /></span>
      <span className="terr-badge-text"><small>Territoire</small><b>{region.label}</b></span>
    </div>
  );
}
