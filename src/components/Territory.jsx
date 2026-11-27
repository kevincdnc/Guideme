// Drapeaux des territoires : drapeau rond entouré d'un anneau de progression (façon jeu).
// Drapeau grisé tant qu'aucun spot du territoire n'est visité.
import { useId } from 'react';
import { regionOf } from '../data/places.js';

const BASE = (import.meta.env && import.meta.env.BASE_URL) || '/Guideme/';
export const flagSrc = (r) => `${BASE}territoires/${r.id}.svg`;

// Drapeau seul (drapeau du Finistère en attendant celui du territoire)
export function TerritoryFlag({ region, className = '' }) {
  const src = region.flag ? flagSrc(region) : `${BASE}territoires/finistere.svg`;
  return <img className={`terr-flag ${className}`} src={src} alt="" draggable="false" />;
}

// Anneau de progression autour du drapeau
export function TerritoryRing({ region, n, total, size = 64 }) {
  const id = useId();
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = total ? n / total : 0;
  const state = !total ? 'soon' : n === 0 ? 'none' : n === total ? 'full' : 'some';
  return (
    <span className={`terr-ring is-${state}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <defs>
          <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#34d399" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>
        <circle className="terr-track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} />
        {pct > 0 && (
          <circle className="terr-arc" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} stroke={`url(#g${id})`}
            strokeDasharray={`${c * pct} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        )}
      </svg>
      <span className="terr-disc" style={{ inset: stroke + 3 }}><TerritoryFlag region={region} /></span>
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
