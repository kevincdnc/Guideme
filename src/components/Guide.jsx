import { Fragment, useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon.jsx';
import Lightbox from './Lightbox.jsx';
import SafeImg from './SafeImg.jsx';
import Brand from './Brand.jsx';
import Hermine from './Hermine.jsx';
import { TerritoryBadge } from './Territory.jsx';
import { ProtectionChips } from './Protections.jsx';
import { ADDRESSES } from '../data/addresses.js';

const BASE = import.meta.env.BASE_URL;
import { useSpeech } from '../hooks/useSpeech.js';
import { useVisited, useFavorites } from '../hooks/useVisited.js';
import maplibregl from 'maplibre-gl';
import MAP_STYLE from '../data/mapFonts.js';
import { FINISTERE_BOUNDS } from '../data/places.js';
import FINISTERE_MASK from '../data/finistere.json';

// Texte lu à voix haute : titre, puis chaque paragraphe et chaque anecdote.
function buildBlocks(place) {
  const blocks = [];
  place.sections.forEach((s) => {
    if (s.paragraphs) {
      s.paragraphs.forEach((p, i) => {
        const intro = i === 0 ? `${blocks.length === 0 ? place.title.replace('&', 'et') + '. ' : ''}${s.title}. ` : '';
        blocks.push({ id: `${s.id}-${i}`, section: s.id, label: s.title, text: intro + p });
      });
    }
    if (s.anecdotes) {
      s.anecdotes.filter((a) => !dupOfFun(place, a)).forEach((a, i) => {
        blocks.push({ id: `${s.id}-${i}`, section: s.id, label: a.title, text: `${i === 0 ? s.title + '. ' : ''}${a.title}. ${a.text}` });
      });
    }
  });
  return blocks;
}

const RATES = [1, 1.25, 1.5, 0.85];

// Icône de chaque compteur, devinée d'après la valeur et le libellé (ou f.icon si précisé)
const isDate = (v) => /^(\d{3,4}|[IVX]+e s\.)$/.test(v);
// Bulle d'info d'un compteur : f.info si précisé, sinon la ligne correspondante de la carte d'identité du phare
function factInfo(place, f) {
  if (f.info) return f.info;
  const lh = place.lighthouse;
  if (!lh) return null;
  const l = f.label.toLowerCase();
  if (/hauteur de tour|de hauteur/.test(l)) return `Hauteur de la tour : ${lh.height}. Feu à ${lh.elevation}.`;
  if (/portée/.test(l)) return `Feu : ${lh.light}.`;
  if (/mise en service|allumage|inauguration/.test(l)) return `Construction : ${lh.built}.`;
  if (/gardien/.test(l)) return lh.keepers;
  if (/visiteur/.test(l)) return lh.visit;
  return null;
}

function factIcon(f) {
  const v = String(f.value), l = f.label.toLowerCase();
  if (isDate(v)) return 'calendar';
  if (/visiteur|entrée/.test(l)) return 'users';
  if (/gardien|habitant|îlien/.test(l)) return 'users';
  if (/marche/.test(l)) return 'stairs';
  if (/portée/.test(l)) return 'beam';
  if (/nœud/.test(v)) return 'wave';
  if (/km²|m²/.test(v)) return 'area';
  if (/\d\s?m$/.test(v) || /hauteur|altitude/.test(l)) return 'ruler';
  if (/\bans?\b|âge/.test(l) || /ans$/.test(v)) return 'hourglass';
  if (/film|tournage/.test(l)) return 'film';
  if (/km/.test(v)) return 'route';
  return 'spark';
}

function AudioPlayer({ speech, blocks, title, minutes }) {
  const { supported, error, state, index, rate, play, pause, next, prev, changeRate, stop } = speech;
  // Le lecteur n'apparaît qu'une fois la lecture lancée (bouton « Écouter » de l'en-tête)
  if (!supported || (state === 'idle' && !error)) return null;
  const active = state !== 'idle';
  const cur = blocks[index];
  const progress = active ? (index + (state === 'playing' ? 0.5 : 0)) / blocks.length : 0;
  return (
    <div className={`player ${active ? 'is-active' : ''}`} role="region" aria-label="Lecture audio">
      {error && <p className="player-error" role="alert">{error}</p>}
      {active && <div className="player-progress" style={{ transform: `scaleX(${Math.max(progress, 0.02)})` }} />}
      <button
        className="player-main"
        onClick={() => (state === 'playing' ? pause() : play())}
        aria-label={state === 'playing' ? 'Mettre en pause' : 'Écouter le guide'}
      >
        <Icon name={state === 'playing' ? 'pause' : 'play'} size={22} />
      </button>
      <div className="player-text">
        {active ? (
          <>
            <span className="player-kicker">{state === 'playing' ? 'En lecture' : 'En pause'} · {index + 1}/{blocks.length}</span>
            <span className="player-title">{cur?.label}</span>
          </>
        ) : (
          <>
            <span className="player-kicker"><Icon name="headphones" size={13} /> Guide audio</span>
            <span className="player-title">Écouter « {title} »</span>
          </>
        )}
      </div>
      {active ? (
        <div className="player-ctrls">
          <button className="player-btn" onClick={prev} aria-label="Paragraphe précédent"><Icon name="prev" size={18} /></button>
          <button className="player-btn" onClick={next} aria-label="Paragraphe suivant"><Icon name="next" size={18} /></button>
          <button className="player-rate" onClick={() => changeRate(RATES[(RATES.indexOf(rate) + 1) % RATES.length])} aria-label="Vitesse de lecture">
            {String(rate).replace('.', ',')}×
          </button>
          <button className="player-btn" onClick={stop} aria-label="Arrêter la lecture"><Icon name="close" size={18} /></button>
        </div>
      ) : (
        <span className="player-duration"><Icon name="clock" size={14} /> {minutes} min</span>
      )}
    </div>
  );
}

function Gallery({ items, onOpen, variant }) {
  return (
    <div className={`gallery gallery--${variant}`}>
      {items.map((it, i) => (
        <figure key={it.src} className="gallery-item">
          <button className="gallery-btn" onClick={() => onOpen(i)} aria-label={`Agrandir : ${it.caption}`}>
            <SafeImg src={it.src} alt={it.caption} loading="lazy" decoding="async" />
            {it.year && <span className="year-badge year-badge--on-img">{it.year}</span>}
          </button>
          <figcaption>
            <span>{it.caption}</span>
            <small>{it.credit}</small>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

// Film d'archives : fiche technique et résumé au-dessus du lecteur intégré (lecteur officiel de l'hébergeur)
function FilmBlock({ film }) {
  return (
    <section id="sec-film" data-nav="film" className="section film">
      <div className="section-head"><h2>Film d'archives</h2></div>
      <div className="film-card">
        <div className="film-head">
          <span className="year-badge">{film.year}</span>
          <h3>« {film.title} »</h3>
        </div>
        <dl className="film-details">
          {film.details.map((d) => (
            <div key={d.label}><dt>{d.label}</dt><dd>{d.value}</dd></div>
          ))}
        </dl>
        {film.summary.map((t, i) => <p key={i} className="film-summary">{t}</p>)}
        <div className="film-player">
          <iframe
            src={film.embed}
            title={`${film.title} (${film.year})`}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        <a className="credit-link" href={film.page} target="_blank" rel="noreferrer">Voir le film sur Vimeo <Icon name="external" size={12} /></a>
      </div>
    </section>
  );
}

// Petite carte du lieu (non interactive) : un clic ouvre la grande carte
function MiniMap({ place, overview }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return undefined;
    let map;
    try {
      map = new maplibregl.Map({
        container: ref.current, style: MAP_STYLE,
        ...(overview ? { bounds: FINISTERE_BOUNDS, fitBoundsOptions: { padding: 14 } } : { center: place.coords, zoom: place.miniZoom || 10.4 }),
        interactive: true, dragRotate: false, pitchWithRotate: false, touchPitch: false, cooperativeGestures: false,
        minZoom: 6.5, maxZoom: 15, attributionControl: false, fadeDuration: 0,
      });
      map.touchZoomRotate.disableRotation();
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
      // Le reste de la Bretagne grisé, la limite du Finistère dessinée (comme sur la grande carte)
      map.on('load', () => {
        const first = map.getStyle().layers.find((l) => l.type === 'symbol')?.id;
        map.addSource('finistere', { type: 'geojson', data: FINISTERE_MASK, tolerance: 0.6 });
        map.addLayer({ id: 'hors-finistere', type: 'fill', source: 'finistere', filter: ['==', ['get', 'role'], 'voisins'], paint: { 'fill-color': '#111111', 'fill-opacity': 0.16 } }, first);
        map.addLayer({ id: 'finistere-limite', type: 'line', source: 'finistere', filter: ['==', ['get', 'role'], 'limite'], layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#7c3aed', 'line-width': 1.6, 'line-dasharray': [2, 2] } }, first);
      });
      const el = document.createElement('div');
      el.className = 'minimap-pin';
      new maplibregl.Marker({ element: el }).setLngLat(place.coords).addTo(map);
    } catch (e) { /* WebGL indisponible : la carte reste vide */ }
    return () => map?.remove();
  }, [place, overview]);
  return (
    <div className={`minimap ${overview ? 'minimap--overview' : ''}`} aria-label={`Carte : ${place.shortTitle}`}>
      <div ref={ref} className="minimap-canvas" />
      <span className="minimap-label"><Icon name="pin" size={14} /> {place.commune.split(' · ')[0]}</span>
    </div>
  );
}

// Carte, itinéraire, puis infos pratiques repliées
// Logos des applis d'itinéraire (Google Maps et Plans : Wikimedia Commons ; Waze : Simple Icons),
// tous ramenés à un carré de 22 px
function RouteLogo({ id }) {
  const clip = `am-${useId().replace(/:/g, '')}`;
  if (id === 'google') return (
    <svg className="route-logo" viewBox="-20 0 132.3 132.3" aria-hidden="true">
      <path fill="#1a73e8" d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z" /><path fill="#ea4335" d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3-21.8-18.3z" /><path fill="#4285f4" d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3" /><path fill="#fbbc04" d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3" /><path fill="#34a853" d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2" />
    </svg>
  );
  if (id === 'waze') return (
    <svg className="route-logo" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#33ccff" />
      <g transform="translate(2.2 2.4) scale(.82)">
        <circle cx="13.2" cy="10.9" r="9.2" fill="#fff" />
        <path fill="#0b1b2b" d="M13.218 0C9.915 0 6.835 1.49 4.723 4.148c-1.515 1.913-2.31 4.272-2.31 6.706v1.739c0 .894-.62 1.738-1.862 1.813c-.298.025-.547.224-.547.522c-.05.82.82 2.31 2.012 3.502c.82.844 1.788 1.515 2.832 2.036a3 3 0 0 0 2.955 3.528a2.966 2.966 0 0 0 2.931-2.385h2.509c.323 1.689 2.086 2.856 3.974 2.21c1.64-.546 2.36-2.409 1.763-3.924a13 13 0 0 0 1.838-1.465a10.73 10.73 0 0 0 3.18-7.65c0-2.882-1.118-5.589-3.155-7.625A10.9 10.9 0 0 0 13.218 0m0 1.217c2.558 0 4.967.994 6.78 2.807a9.53 9.53 0 0 1 2.807 6.78A9.53 9.53 0 0 1 20 17.585a9.650 9.650 0 0 1-6.78 2.807h-2.46a3.01 3.01 0 0 0-2.93-2.41a3.030 3.030 0 0 0-2.534 1.367v.024a9 9 0 0 1-2.41-1.788c-.844-.844-1.316-1.614-1.515-2.11a2.860 2.860 0 0 0 1.441-.846a2.960 2.960 0 0 0 .795-2.036v-1.789c0-2.11.696-4.197 2.012-5.861c1.863-2.385 4.62-3.726 7.6-3.726zm-2.41 5.986a1.19 1.19 0 0 0-1.191 1.192a1.19 1.19 0 0 0 1.192 1.193A1.19 1.19 0 0 0 12 8.395a1.19 1.19 0 0 0-1.192-1.192m7.204 0a1.19 1.19 0 0 0-1.192 1.192a1.19 1.19 0 0 0 1.192 1.193a1.19 1.19 0 0 0 1.192-1.193a1.19 1.19 0 0 0-1.192-1.192m-7.377 4.769a.596.596 0 0 0-.546.845a4.81 4.81 0 0 0 4.346 2.757a4.770 4.770 0 0 0 4.347-2.757a.596.596 0 0 0-.547-.845h-.025a.56.56 0 0 0-.521.348a3.59 3.59 0 0 1-3.254 2.061a3.590 3.590 0 0 1-3.254-2.061a.64.64 0 0 0-.546-.348" />
      </g>
    </svg>
  );
  return (
    <svg className="route-logo" viewBox="0 0 512 512" aria-hidden="true">
      <clipPath id={clip}><circle cx="256" cy="256" r="256" /></clipPath>
      <circle cx="256" cy="256" r="256" fill="#fff" />
      <g clipPath={`url(#${clip})`}>
        <rect fill="#E4DDC9" x="0" y="0" width="170" height="512" /><rect fill="#76C63B" x="340" y="0" width="172" height="170" /><rect fill="#FBC6D1" x="340" y="342" width="172" height="170" />
        <circle cx="256" cy="256" r="128" fill="#007AFF" /><polygon fill="#FFF" points="256 171.5 203.5 341 256 282 308.5 341" />
      </g>
      <circle cx="256" cy="256" r="250" fill="none" stroke="#d6d3cc" strokeWidth="12" />
    </svg>
  );
}

// Itinéraire : Google Maps, Waze ou Plans (Apple)
function routeLinks(place) {
  const [lon, lat] = place.coords;
  return [
    { id: 'google', label: 'Google Maps', url: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}` },
    { id: 'waze', label: 'Waze', url: `https://waze.com/ul?ll=${lat},${lon}&navigate=yes` },
    { id: 'apple', label: 'Plans', url: `https://maps.apple.com/?daddr=${lat},${lon}` },
  ];
}

function Address({ place }) {
  const a = ADDRESSES[place.id];
  if (!a) return null;
  return (
    <address className="place-address">
      <Icon name={a.sea ? 'wave' : 'pin'} size={16} />
      <span><b>{a.line}</b>{a.commune && <>{a.cp} {a.commune}, Finistère</>}{!a.commune && <>Finistère</>}</span>
    </address>
  );
}

function FunFact({ fact, className = '' }) {
  if (!fact) return null;
  return (
    <aside className={`funfact ${className}`}>
      <span className="funfact-icon"><Icon name="spark" size={20} /></span>
      <div>
        <span className="funfact-kicker">Le saviez-vous ?</span>
        <strong>{fact.title}</strong>
        <p>{fact.text}</p>
      </div>
    </aside>
  );
}

function Practical({ place, overview }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return undefined;
    const k = (e) => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false); } };
    window.addEventListener('keydown', k, true);
    return () => window.removeEventListener('keydown', k, true);
  }, [open]);
  return (
    <div className="practical-box">
      <MiniMap place={place} overview={overview} />
      <button className="go-btn" onClick={() => setOpen(true)}><Icon name="route" size={18} /> Itinéraire</button>
      <Address place={place} />
      {open && createPortal(
        <div className="go-modal" role="dialog" aria-modal="true" aria-label="Itinéraire">
          <div className="go-modal-bg" onClick={() => setOpen(false)} />
          <div className="go-modal-box">
            <button className="go-modal-x" onClick={() => setOpen(false)} aria-label="Fermer"><Icon name="close" size={18} /></button>
            <h3>Aller à {place.shortTitle}</h3>
            <p className="go-modal-sub">Avec quelle application ?</p>
            <div className="go-apps">
              {routeLinks(place).map((r) => (
                <a key={r.id} className="go-app" href={r.url} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                  <RouteLogo id={r.id} /><span>{r.label}</span><Icon name="external" size={13} />
                </a>
              ))}
            </div>
            {place.practical?.length > 0 && (
              <ul className="practical practical--compact">
                {place.practical.map((p) => (
                  <li key={p.title} className={p.icon === 'warn' ? 'is-warn' : ''}><Icon name={p.icon} size={15} /><span><b>{p.title}.</b> {p.text}</span></li>
                ))}
              </ul>
            )}
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}

// Carte d'identité d'un phare : mêmes rubriques pour tous
const LH_ROWS = [
  ['built', 'Construction', 'hourglass'], ['lit', 'Mise en service', 'calendar'], ['height', 'Hauteur de la tour', 'ruler'], ['elevation', 'Hauteur du feu', 'wave'],
  ['range', 'Portée', 'beam'], ['light', 'Feu', 'lighthouse'], ['keepers', 'Gardiens', 'users'], ['visit', 'Visite', 'hike'], ['visitors', 'Fréquentation', 'users'], ['protection', 'Protection', 'medal'],
];
const LIGHT_COLORS = { blanc: '#ffffff', blancs: '#ffffff', rouge: '#ef4444', rouges: '#ef4444', vert: '#22c55e', verts: '#22c55e' };
function lightDots(t) {
  const seen = [];
  (String(t).toLowerCase().match(/blancs?|rouges?|verts?/g) || []).forEach((c) => { const v = LIGHT_COLORS[c]; if (!seen.includes(v)) seen.push(v); });
  return seen;
}
function LighthouseSheet({ place }) {
  const lh = place.lighthouse;
  const rows = LH_ROWS.filter(([k]) => lh[k] && lh[k] !== 'Non renseignée' && !['height', 'elevation', 'range'].includes(k));
  const num = (k, re) => String(lh[k] || '').match(re)?.[0];
  const big = [
    ['Hauteur de la tour', num('height', /^[\d,]+/), 'm'],
    ['Feu au-dessus de la mer', num('elevation', /^[\d,]+/), 'm'],
    ['Portée', num('range', /^[\d,]+/), 'milles'],
  ].filter(([, v]) => v);
  const dots = lightDots(lh.light);
  const art = lh.plan || (place.hero?.src ? { src: place.hero.src, credit: place.hero.credit, photo: true } : null);
  return (
    <section id="sec-identite" data-nav="identite" className="section">
      <div className="section-head"><h2>Carte d'identité</h2></div>
      <div className={`lh-id ${art?.photo ? 'lh-id--photo' : ''}`}>
        {art && (
          <figure className="lh-id-art" style={{ '--art': `url("${/^https?:/.test(art.src) ? art.src : BASE + art.src}")` }}>
            <img src={/^https?:/.test(art.src) ? art.src : BASE + art.src} alt={art.caption || `Phare ${place.shortTitle}`} loading="lazy" />
            <figcaption>{art.caption ? `${art.caption} · ` : ''}{art.credit}</figcaption>
          </figure>
        )}
        <div className="lh-id-body">
          <span className="lh-id-kicker">Phare · Finistère</span>
          <strong className="lh-id-name">{place.shortTitle}</strong>
          {dots.length > 0 && (
            <span className="lh-id-light">{dots.map((c) => <i key={c} style={{ background: c }} />)}{lh.light}</span>
          )}
          {big.length > 0 && (
            <dl className="lh-id-big">
              {big.map(([l, v, u]) => <div key={l}><dd>{v}<small>{u}</small></dd><dt>{l}</dt></div>)}
            </dl>
          )}
          <dl className="lh-id-rows">
            {rows.filter(([k]) => k !== 'light').map(([k, label]) => (
              <div key={k}><dt>{label}</dt><dd>{lh[k]}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

// Une image par partie du récit : section.image (index dans photos + archives) sinon la photo la plus proche du texte
function sectionImages(place) {
  const pool = [...(place.photos || []), ...(place.archives || [])];
  const used = new Set();
  const out = {};
  const parts = place.sections.filter((x) => x.paragraphs);
  parts.forEach((x) => { if (Number.isInteger(x.image) && pool[x.image]) { out[x.id] = pool[x.image]; used.add(x.image); } });
  parts.forEach((x) => {
    if (out[x.id] || x.image === false) return;
    const w = words(x.title + ' ' + x.paragraphs.join(' '));
    let best = -1, score = -1;
    pool.forEach((img, i) => {
      if (used.has(i)) return;
      let n = 0; words(img.caption || '').forEach((t) => { if (w.has(t)) n += 1; });
      if (n > score) { score = n; best = i; }
    });
    if (best >= 0) { out[x.id] = pool[best]; used.add(best); }
  });
  return out;
}

function SectionFigure({ img, onOpen }) {
  return (
    <figure className="sec-figure">
      <button onClick={onOpen} aria-label={`Agrandir : ${img.caption}`}><img src={img.src} alt={img.caption} loading="lazy" /></button>
      <figcaption>{img.caption} <small>{img.credit}</small></figcaption>
    </figure>
  );
}

// Anecdote qui reprend le « Le saviez-vous ? » : on ne la répète pas
const words = (t) => new Set(String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(/[a-z0-9]{4,}/g) || []);
function dupOfFun(place, a) {
  if (!place.funFact) return false;
  if (a.title === place.funFact.title) return true;
  const f = words(place.funFact.title + ' ' + place.funFact.text), w = words(a.title + ' ' + a.text);
  let n = 0; f.forEach((x) => { if (w.has(x)) n += 1; });
  return f.size && n / f.size > 0.45;
}

// Anecdotes en cartes qui défilent (mobile d'abord : balayage, flèches sur desktop)
function AnecdoteSlider({ section, place, currentId, onListen }) {
  const track = useRef(null);
  const list = section.anecdotes.filter((a) => !dupOfFun(place, a));
  const go = (d) => {
    const t = track.current;
    const card = t?.querySelector('.anec-card');
    if (!t || !card) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(t).columnGap || 12);
    t.scrollBy({ left: d * step, behavior: 'smooth' });
  };
  return (
    <section id={`sec-${section.id}`} data-nav={section.id} className="section anec-slider">
      <div className="section-head">
        <h2>{section.title}</h2>
        <div className="anec-ctrls">
          {onListen && <button className="listen-btn" onClick={onListen}><Icon name="headphones" size={15} /> Écouter</button>}
          <button className="anec-nav" onClick={() => go(-1)} aria-label="Anecdote précédente"><Icon name="back" size={18} /></button>
          <button className="anec-nav" onClick={() => go(1)} aria-label="Anecdote suivante"><Icon name="chevron" size={18} /></button>
        </div>
      </div>
      <ol className="anec-track" ref={track}>
        {list.map((a, i) => (
          <li key={a.title} data-block={`${section.id}-${i}`} className={`anec-card ${currentId === `${section.id}-${i}` ? 'is-reading' : ''}`}>
            <span className="anec-num">{String(i + 1).padStart(2, '0')}<small> / {String(list.length).padStart(2, '0')}</small></span>
            <h3>{a.title}</h3>
            <p>{a.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

// Records : médailles compactes (colonne de droite sur desktop)
function Records({ place, goTo, compact }) {
  return (
    <ul className={`records ${compact ? 'records--compact' : ''} ${place.records.length === 1 ? 'records--one' : ''}`} aria-label="Records">
      {place.records.map((r) => (
        <li key={r.title} className={`record record--${r.medal}`}>
          <span className="record-medal"><Icon name="medal" size={compact ? 16 : 20} stroke={1.8} /></span>
          <div className="record-body">
            {r.scope && r.scope !== 'France' && <span className="record-scope">{r.scope}</span>}
            <strong>{r.title}</strong>
            <span className="record-text">{r.text}</span>
          </div>
          {r.more && <button className="record-more" onClick={() => goTo('records')}>En savoir plus <Icon name="chevron" size={13} /></button>}
        </li>
      ))}
    </ul>
  );
}

const isWide = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 900px)').matches;

export default function Guide({ place, onClose, variant = 'panel' }) {
  const anecdoteSections = place.sections.filter((s) => s.anecdotes && !s.paragraphs);
  const isPage = variant === 'page';
  const [visitedIds, toggleVisited] = useVisited();
  const isVisited = visitedIds.includes(place.id);
  const [favIds, toggleFav] = useFavorites();
  const isFav = favIds.includes(place.id);
  // En-tête en mosaïque : photo principale + vignettes (photos actuelles, puis archives)
  const allImages = useMemo(() => [
    ...(place.hero ? [{ src: place.hero.src, caption: place.hero.alt, credit: place.hero.credit }] : []),
    ...(place.photos || []),
    ...(place.archives || []),
  ], [place]);
  const mosaic = allImages.slice(0, 3);
  const secImages = useMemo(() => sectionImages(place), [place]);
  const factImages = useMemo(() => {
    const old = (place.archives || []).map((x) => x.src);
    const now = [...(place.photos || []).map((x) => x.src), place.hero?.src].filter(Boolean);
    let o = 0, n = 1;
    return place.facts.map((f) => (isDate(f.value) && old[o] ? old[o++] : now[n++ % Math.max(now.length, 1)] || null));
  }, [place]);
  const blocks = useMemo(() => buildBlocks(place), [place]);
  const speech = useSpeech(blocks);
  const scroller = useRef(null);
  const heroRef = useRef(null);
  const [compact, setCompact] = useState(false);
  const [lightbox, setLightbox] = useState(null); // { items, start }
  const [activeNav, setActiveNav] = useState(null);
  const currentId = speech.state !== 'idle' ? blocks[speech.index]?.id : null;

  // En-tête compact quand l'image d'en-tête sort de l'écran
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setCompact(!e.isIntersecting), { root: scroller.current, threshold: 0, rootMargin: '-64px 0px 0px 0px' });
    if (heroRef.current) io.observe(heroRef.current);
    return () => io.disconnect();
  }, []);

  // Section active dans la barre de navigation
  useEffect(() => {
    const els = scroller.current.querySelectorAll('[data-nav]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.dataset.nav); });
    }, { root: scroller.current, rootMargin: '-30% 0px -60% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Le paragraphe lu reste visible
  useEffect(() => {
    if (!currentId) return;
    const el = scroller.current.querySelector(`[data-block="${currentId}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentId]);

  const nav = [
    ...(place.lighthouse ? [{ id: 'identite', label: 'Identité' }] : []),
    ...place.sections.flatMap((s, i) => [
      ...(i === 1 && place.film ? [{ id: 'film', label: `Film ${place.film.year}` }] : []),
      { id: s.id, label: s.nav },
    ]),
    ...(place.records?.some((r) => r.more) ? [{ id: 'records', label: 'Records' }] : []),
    ...(place.timeline?.length ? [{ id: 'reperes', label: 'Repères' }] : []),
    ...(place.archives?.length || place.photos?.length ? [{ id: 'archives', label: place.archives?.length ? 'Archives' : 'Photos' }] : []),
    ...(place.videos?.length ? [{ id: 'videos', label: 'Vidéos' }] : []),
    { id: 'pratique', label: 'Y aller' },
  ];

  // Échap ferme la fiche (desktop)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && !lightbox && onClose) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, onClose]);

  const goTo = (id) => {
    const el = scroller.current.querySelector(`#sec-${id}`);
    if (el) scroller.current.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
  };

  const share = async () => {
    const url = `${location.origin}${BASE}lieu/${place.id}/`;
    const data = { title: `${place.title} · guideme.bzh`, text: place.teaser, url };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(url); alert('Lien copié'); }
    } catch (e) { /* partage annulé */ }
  };

  const [lon, lat] = place.coords;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;

  const readFrom = (blockId) => {
    const i = blocks.findIndex((b) => b.id === blockId);
    if (i >= 0) speech.play(i);
  };

  return (
    <article className={`guide guide--${variant}`} aria-label={place.title}>
      <div className={`guide-bar ${compact ? 'is-compact' : ''}`}>
        {isPage ? (
          <span className="guide-brand"><Brand /></span>
        ) : (
          <button className="icon-btn guide-back" onClick={onClose} aria-label="Retour à la carte"><Icon name="back" /></button>
        )}
        <span className="guide-bar-title">{place.shortTitle}</span>
        <nav className="guide-nav" aria-label="Sections">
          {nav.map((n) => (
            <button key={n.id} className={`nav-chip ${activeNav === n.id ? 'is-active' : ''} ${n.mobileOnly ? 'mobile-only' : ''}`} onClick={() => goTo(n.id)}>{n.label}</button>
          ))}
        </nav>
        <button className="icon-btn" onClick={share} aria-label="Partager"><Icon name="share" size={19} /></button>
        {isPage ? (
          <a className="pill-btn" href={`${BASE}#/lieu/${place.id}`}><Icon name="map" size={17} /> <span>Voir sur la carte</span></a>
        ) : (
          <>
            <button className="close-btn" onClick={onClose} aria-label="Fermer la fiche">
              <Icon name="close" size={18} /> <span>Fermer</span>
            </button>
          </>
        )}
      </div>

      <div className="guide-scroll" ref={scroller}>
        <header className="hero-strip" ref={heroRef}>
          {allImages.length ? (
            <div className="hero-strip-track">
              {allImages.map((m, i) => (
                <button key={m.src} className="hero-strip-item" onClick={() => setLightbox({ items: allImages, start: i })} aria-label={`Agrandir : ${m.caption}`}>
                  <SafeImg src={m.src} alt={m.caption} fetchpriority={i === 0 ? 'high' : undefined} loading={i > 3 ? 'lazy' : undefined} />
                </button>
              ))}
            </div>
          ) : (
            <div className="hero-empty"><Icon name={place.icon || 'pin'} size={56} stroke={1.6} /></div>
          )}
        </header>

        <div className="guide-layout">
        <div className="guide-main">
        <div className="guide-head">
          <div className="guide-actions guide-actions--split">
            <div className="guide-actions-left">
              <button role="checkbox" aria-checked={isVisited} className={`action-btn visit-btn ${isVisited ? 'is-checked' : ''}`} onClick={() => toggleVisited(place.id)}>
                <span className="visit-box">{isVisited && <svg className="draw-check" viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1" /></svg>}</span>
                {isVisited ? 'Déjà visité' : "Je l'ai déjà visité"}
              </button>
              <button className={`action-btn fav-btn ${isFav ? 'is-on' : ''}`} onClick={() => toggleFav(place.id)} aria-pressed={isFav} aria-label={isFav ? 'Retirer de ma to-do list' : 'Ajouter à ma to-do list'} title={isFav ? 'Dans ma to-do list' : 'Ajouter à ma to-do list'}>
                <Icon name="star" size={18} stroke={2} />
              </button>
              <ProtectionChips place={place} />
            </div>
            {speech.supported && (
              <button className="action-btn listen-main" onClick={() => (speech.state === 'playing' ? speech.pause() : speech.play())}>
                <Icon name={speech.state === 'playing' ? 'pause' : 'headphones'} size={16} /> {speech.state === 'playing' ? 'Pause' : 'Écouter'}
              </button>
            )}
          </div>
          <TerritoryBadge placeId={place.id} className="terr-badge--head" />
          <h1>{place.title}</h1>
          <p className="guide-teaser">{place.teaser}</p>
          <dl className="keyfigs" aria-label="Chiffres clés">
            {place.facts.slice(0, 3).map((f, i) => (
              <div key={f.label} className={`keyfig keyfig--${f.icon || factIcon(f)} ${isDate(f.value) ? 'is-date' : ''} ${String(f.value).length > 5 ? 'is-long' : ''}`}>
                {factImages[i] && <span className="keyfig-bg" style={{ backgroundImage: `url("${factImages[i]}")` }} aria-hidden="true" />}
                <span className="keyfig-ico"><Icon name={f.icon || factIcon(f)} size={15} /></span>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
                {factInfo(place, f) && (
                  <span className="keyfig-info" tabIndex={0} aria-label={factInfo(place, f)}>
                    <span aria-hidden="true">i</span>
                    <span className="keyfig-tip" role="tooltip">{factInfo(place, f)}</span>
                  </span>
                )}
              </div>
            ))}
          </dl>
          {place.records?.length > 0 && <div className="records-main"><Records place={place} goTo={goTo} /></div>}
          <FunFact fact={place.funFact} className="funfact--main" />
        </div>

        {anecdoteSections.map((s) => (
          <AnecdoteSlider key={s.id} section={s} place={place} currentId={currentId} onListen={speech.supported ? () => readFrom(`${s.id}-0`) : null} />
        ))}

        {place.lighthouse && <LighthouseSheet place={place} />}

        {place.sections.filter((s) => !(s.anecdotes && !s.paragraphs)).map((s, si) => (
          <Fragment key={s.id}>
          {si === 1 && place.film && <FilmBlock film={place.film} />}
          <section id={`sec-${s.id}`} data-nav={s.id} className="section">
            <div className="section-head">
              <h2>{s.title}</h2>
              {speech.supported && (
                <button className="listen-btn" onClick={() => readFrom(`${s.id}-0`)}>
                  <Icon name="headphones" size={15} /> Écouter
                </button>
              )}
            </div>
            {secImages[s.id] && <SectionFigure img={secImages[s.id]} onOpen={() => setLightbox({ items: [secImages[s.id]], start: 0 })} />}
            {s.paragraphs?.map((p, i) => (
              <p key={i} data-block={`${s.id}-${i}`} className={`para ${currentId === `${s.id}-${i}` ? 'is-reading' : ''}`}>{p}</p>
            ))}
            {s.anecdotes && (
              <ol className="anecdotes">
                {s.anecdotes.filter((a) => !dupOfFun(place, a)).map((a, i) => (
                  <li key={a.title} data-block={`${s.id}-${i}`} className={`anecdote ${currentId === `${s.id}-${i}` ? 'is-reading' : ''}`}>
                    <span className="anecdote-num">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{a.title}</h3>
                    <p>{a.text}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>
          </Fragment>
        ))}

        {place.records?.some((r) => r.more) && (
        <section id="sec-records" data-nav="records" className="section">
          <div className="section-head"><h2>Les records en détail</h2></div>
          <ol className="records-detail">
            {place.records.filter((r) => r.more).map((r) => (
              <li key={r.title} className={`record-detail record--${r.medal}`}>
                <span className="record-medal"><Icon name="medal" size={20} stroke={1.8} /></span>
                <div>
                  <span className="record-scope">{r.scope}</span>
                  <h3>{r.title}</h3>
                  <p>{r.more}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        )}

        {place.timeline?.length > 0 && (
        <section id="sec-reperes" data-nav="reperes" className="section">
          <div className="section-head"><h2>Repères</h2></div>
          <ol className="timeline">
            {place.timeline.map((t) => (
              <li key={t.year + t.text}>
                <span className="timeline-year">{t.year}</span>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </section>
        )}

        {(place.archives?.length > 0 || place.photos?.length > 0) && (
        <section id="sec-archives" data-nav="archives" className="section section--wide">
          {place.archives?.length > 0 && (
            <>
              <div className="section-head"><h2>Archives & cartes postales</h2></div>
              <p className="section-sub">{place.archivesIntro || 'Peintures, gravures et cartes postales anciennes, du domaine public.'}</p>
              <Gallery items={place.archives} variant="archive" onOpen={(i) => setLightbox({ items: place.archives, start: i })} />
            </>
          )}
          {place.photos?.length > 0 && (
            <>
              {place.archives?.length > 0 ? <h3 className="sub-title">Aujourd'hui</h3> : <div className="section-head"><h2>En images</h2></div>}
              <Gallery items={place.photos} variant="photo" onOpen={(i) => setLightbox({ items: place.photos, start: i })} />
            </>
          )}
        </section>
        )}

        {place.videos?.length > 0 && (
          <section id="sec-videos" data-nav="videos" className="section">
            <div className="section-head"><h2>Vidéos</h2></div>
            <div className="videos">
              {place.videos.map((v) => (
                <figure key={v.title} className="video">
                  <video controls preload="none" poster={v.poster} playsInline>
                    {v.sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
                  </video>
                  <figcaption>
                    <strong>{v.title}</strong>
                    <span>{v.caption}</span>
                    <a href={v.page} target="_blank" rel="noreferrer" className="credit-link">{v.credit} <Icon name="external" size={12} /></a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section id="sec-pratique" data-nav="pratique" className="section section--pratique">
          <div className="section-head"><h2>Y aller</h2></div>
          <Practical place={place} directions={directions} />
        </section>

        <section className="section sources">
          <h2>Sources & crédits</h2>
          <p>Textes rédigés pour guideme.bzh d'après :</p>
          <ul>
            {place.sources.map((s) => (
              <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>
            ))}
          </ul>
          <p>Images et vidéos : Wikimedia Commons, auteurs et licences indiqués sous chaque média (touchez une image pour voir le lien).</p>
        </section>
        </div>

        <aside className="guide-aside">
          <div className="aside-card aside-map">
            <TerritoryBadge placeId={place.id} className="terr-badge--aside" />
            <Practical place={place} directions={directions} overview />
          </div>
          <FunFact fact={place.funFact} className="funfact--aside" />
        </aside>
        </div>
        <div className="guide-end" />
      </div>

      <AudioPlayer speech={speech} blocks={blocks} title={place.shortTitle} minutes={place.readingMinutes} />

      {lightbox && <Lightbox items={lightbox.items} start={lightbox.start} onClose={() => setLightbox(null)} />}
    </article>
  );
}
