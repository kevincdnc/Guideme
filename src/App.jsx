import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MapView from './components/MapView.jsx';
import Guide from './components/Guide.jsx';
import Icon from './components/Icon.jsx';
import SafeImg from './components/SafeImg.jsx';
import Brand from './components/Brand.jsx';
import ColorTuner from './components/ColorTuner.jsx'; // TEMPORAIRE
import { useVisited, useFavorites } from './hooks/useVisited.js';
import { PLACES, TAGS, REGIONS, getPlace } from './data/places.js';

// Navigation par hash : #/ (carte) ou #/lieu/<id> (fiche)
const BASE = import.meta.env.BASE_URL;
function readRoute() {
  const m = location.pathname.slice(BASE.length - 1).match(/^\/lieu\/([\w-]+)\/?$/) || location.hash.match(/^#\/lieu\/([\w-]+)/);
  return m && getPlace(m[1])?.available ? m[1] : null;
}

function useIsDesktop() {
  const q = '(min-width: 900px)';
  const [v, setV] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setV(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return v;
}

const TAG_BY_ID = Object.fromEntries(TAGS.map((t) => [t.id, t]));
const SIDEBAR_W = 480;
async function sharePlace(place) {
  const url = `${location.origin}${import.meta.env.BASE_URL}lieu/${place.id}/`;
  try {
    if (navigator.share) await navigator.share({ title: `${place.title} · guideme.bzh`, text: place.teaser, url });
    else { await navigator.clipboard.writeText(url); alert('Lien copié'); }
  } catch (e) { /* partage annulé */ }
}
// « 30 spots à découvrir », « 18 phares à découvrir »… selon le filtre choisi
const COUNT_WORDS = {
  nature: ['site naturel', 'sites naturels'], phare: ['phare', 'phares'], histoire: ['lieu de patrimoine', 'lieux de patrimoine'],
  legende: ['spot légendaire', 'spots légendaires'], plage: ['plage', 'plages'], port: ['port', 'ports'],
  prehistoire: ['site préhistorique', 'sites préhistoriques'],
};
function countLabel(tag, n, query) {
  const many = n > 1;
  if (query?.trim()) return many ? 'spots trouvés' : 'spot trouvé';
  if (tag === 'visited') return many ? 'spots déjà visités' : 'spot déjà visité';
  if (tag === 'wanted') return many ? 'spots en favoris' : 'spot en favori';
  const w = COUNT_WORDS[tag] || ['spot', 'spots'];
  return `${many ? w[1] : w[0]} à découvrir`;
}

// Carte de lieu : vignette, nom, commune et durée ; case « déjà visité » en haut à droite
function PlaceCard({ place, selected, onOpen, onSelect, visited, onToggleVisited, wanted, onToggleWanted }) {
  const soon = !place.available;
  const activate = () => (soon ? onSelect(place.id) : onOpen(place.id));
  return (
    <div
      role="button"
      tabIndex={0}
      className={`place-card ${soon ? 'is-soon' : ''} ${selected ? 'is-selected' : ''} ${visited ? 'is-visited' : ''}`}
      data-id={place.id}
      onClick={activate}
      onKeyDown={(e) => e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), activate())}
      aria-label={soon ? `${place.shortTitle}, bientôt disponible` : `Ouvrir le guide : ${place.shortTitle}`}
    >
      <div className="pc-thumb">
        {place.thumb || place.hero ? <SafeImg src={place.thumb || place.hero.src} alt="" loading="lazy" /> : <span className="pc-thumb-empty"><Icon name={place.icon || 'pin'} size={22} /></span>}
      </div>
      <div className="pc-body">
        <h3>{place.shortTitle}</h3>
        <span className="pc-meta">
          <span><Icon name="pin" size={12} className="pc-pin" />{place.commune.split(' · ')[0].split(' & ')[0]}</span>
          {!soon && <span><Icon name="headphones" size={12} /> {place.readingMinutes} min</span>}
          {place.records?.length > 0 && <span className="pc-records" title={`${place.records.length} record${place.records.length > 1 ? 's' : ''}`}><Icon name="trophy" size={12} /> {place.records.length}</span>}
        </span>
      </div>
      {soon ? <span className="pc-soon">Bientôt</span> : onToggleVisited && (
        <span className="pc-flags">
          <button
            className={`pc-flag pc-flag--want ${wanted ? 'is-on' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleWanted(place.id); }}
            aria-pressed={!!wanted}
            aria-label={wanted ? `${place.shortTitle} : retirer des favoris` : `${place.shortTitle} : ajouter aux favoris`}
          >
            <Icon name="star" size={15} stroke={2} />
            <span className="pc-tip" aria-hidden="true">{wanted ? 'Favori · retirer' : 'Ajouter aux favoris'}</span>
          </button>
          <button
            className={`pc-flag pc-flag--done ${visited ? 'is-on' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleVisited(place.id); }}
            aria-pressed={!!visited}
            aria-label={visited ? `${place.shortTitle} : déjà visité (retirer)` : `Marquer ${place.shortTitle} comme déjà visité`}
          >
            <Icon name="check" size={15} stroke={2.8} />
            <span className="pc-tip" aria-hidden="true">{visited ? 'Déjà visité · retirer' : "Je l'ai déjà visité"}</span>
          </button>
        </span>
      )}
    </div>
  );
}

// Progression : part des lieux du Finistère déjà visités. Apparaît au premier lieu coché.
function ProgressFlag({ visited, onPick }) {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const boxRef = useRef(null);
  const places = PLACES.filter((p) => p.available);
  const done = places.filter((p) => visited.includes(p.id));
  const pct = places.length ? Math.round((done.length / places.length) * 100) : 0;
  const R = 17, L = 2 * Math.PI * R;
  const left = places.length - done.length;
  const encouragement = done.length === 0 ? 'Coche ton premier lieu pour commencer !'
    : left === 0 ? 'Bravo, tu as tout exploré !'
    : `Plus que ${left} lieu${left > 1 ? 'x' : ''} à découvrir.`;
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!boxRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);
  return (
    <div className="progress" ref={boxRef}>
      <button className={`progress-btn ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={`Ta progression : ${done.length} lieux visités sur ${places.length}`}>
        <img className="progress-flag" src={`${import.meta.env.BASE_URL}icons/drapeau-finistere.png`} alt="" />
        <span className="progress-dial">
          <svg viewBox="0 0 40 40" className="progress-ring" aria-hidden="true">
            <circle cx="20" cy="20" r={R} className="progress-track" />
            <circle cx="20" cy="20" r={R} className="progress-value" strokeDasharray={L} strokeDashoffset={L * (1 - pct / 100)} style={{ opacity: done.length ? 1 : 0 }} />
          </svg>
          <span className="progress-pct">{pct}<small>%</small></span>
        </span>
      </button>
      {open && (
        <div className={`progress-menu ${showAll ? 'is-wide' : ''}`}>
          <div className="progress-head">
            <strong>Ta conquête du bout du monde</strong>
            <span><b>{done.length}</b> lieu{done.length > 1 ? 'x' : ''} visité{done.length > 1 ? 's' : ''} sur {places.length}</span>
          </div>
          <div className="progress-bar-row">
            <div className="progress-bar"><span style={{ width: `${pct}%` }} /></div>
            <b className="progress-bar-pct">{pct} %</b>
          </div>
          <p className="progress-hint">{encouragement}</p>
          <ul className="progress-cats" aria-label="Progression par catégorie">
            {TAGS.map((t) => {
              const all = places.filter((p) => p.tags?.includes(t.id));
              if (!all.length) return null;
              const n = all.filter((p) => visited.includes(p.id)).length;
              const c = Math.round((n / all.length) * 100);
              return (
                <li key={t.id}>
                  <span className="progress-cat-label"><Icon name={t.icon} size={14} /> {t.label}</span>
                  <span className="progress-bar progress-bar--sm"><span style={{ width: `${c}%` }} /></span>
                  <b>{c} %</b>
                </li>
              );
            })}
          </ul>
          <button className="progress-toggle" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
            {showAll ? 'Masquer les spots' : 'Afficher tous les spots'}
            <Icon name="chevron" size={15} style={{ transform: showAll ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'transform .2s' }} />
          </button>
          {showAll && (
            <div className="progress-regions">
              {REGIONS.map((r) => {
                const list = r.ids.map((id) => places.find((p) => p.id === id)).filter(Boolean);
                const n = list.filter((p) => visited.includes(p.id)).length;
                return (
                  <section key={r.id} className="progress-region">
                    <h4>{r.label} <span>{n}/{list.length}</span></h4>
                    <ul>
                      {list.map((p) => {
                        const v = visited.includes(p.id);
                        return (
                          <li key={p.id}>
                            <button className={v ? 'is-done' : ''} onClick={() => { setOpen(false); onPick(p.id); }}>
                              <span className="progress-thumb">{(p.thumb || p.hero) && <SafeImg src={(p.thumb || p.hero.src).replace(/\/(\d+)px-/, '/120px-')} alt="" />}</span>
                              <span className="progress-name">{p.shortTitle}</span>
                              <span className="progress-check">{v && <Icon name="check" size={12} stroke={3.4} />}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Recherche sans accents ni majuscules : nom, commune, catégorie et tags
const norm = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const searchText = (p) => norm([p.title, p.shortTitle, p.commune, p.category, ...(p.tags || []).map((id) => TAG_BY_ID[id]?.label)].join(' '));

// Réglages de la carte (TEMPORAIRE) : couleurs de la mer et de la terre
function MapSettings() {
  const [open, setOpen] = useState(false);
  return (
    <div className="map-settings">
      <button className={`tool-btn ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Réglages de la carte" aria-expanded={open}><Icon name="sliders" size={19} /></button>
      <ColorTuner open={open} />
    </div>
  );
}

// Profil : avatar dans la barre noire ; ouvre la liste des favoris (étoile des fiches)
const INITIALS_KEY = 'guideme:initials';
// Avatar par défaut : silhouette blanche sur fond gris
function AvatarPlaceholder() {
  return (
    <svg className="avatar-ph" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="15.5" r="7" fill="currentColor" />
      <path d="M5 40c1.5-8.5 7.6-13 15-13s13.5 4.5 15 13z" fill="currentColor" />
    </svg>
  );
}
function ProfileMenu({ onOpen }) {
  const [fav, toggleFav] = useFavorites();
  const [initials, setInitials] = useState(() => { try { return localStorage.getItem(INITIALS_KEY) || ''; } catch (e) { return ''; } });
  const saveInitials = (v) => { const t = v.toUpperCase().replace(/[^A-ZÀ-Ý]/g, '').slice(0, 2); setInitials(t); try { localStorage.setItem(INITIALS_KEY, t); } catch (e) { /* stockage indisponible */ } };
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!boxRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);
  const list = fav.map((id) => getPlace(id)).filter(Boolean);
  return (
    <div className="profile" ref={boxRef}>
      <button className={`profile-btn ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Mon compte et mes favoris" aria-expanded={open}>
        {initials ? <span className="profile-initials">{initials}</span> : <AvatarPlaceholder />}
        {list.length > 0 && <span className="profile-badge">{list.length}</span>}
      </button>
      {open && (
        <div className="profile-menu">
          <label className="profile-id">
            <span className="profile-avatar">{initials || <AvatarPlaceholder />}</span>
            <span><strong>Mon compte</strong><input value={initials} onChange={(e) => saveInitials(e.target.value)} placeholder="Tes initiales" maxLength={2} aria-label="Tes initiales" /></span>
          </label>
          <strong className="profile-title"><Icon name="star" size={16} /> Mes favoris</strong>
          {list.length === 0 && <p className="profile-empty">Touche l'étoile d'un spot pour le retrouver ici.</p>}
          <ul>
            {list.map((p) => (
              <li key={p.id}>
                <button className="profile-item" onClick={() => { setOpen(false); onOpen(p.id); }}>
                  {(p.thumb || p.hero) && <SafeImg src={(p.thumb || p.hero.src).replace(/\/(\d+)px-/, '/120px-')} alt="" />}
                  <span>{p.shortTitle}<small>{p.commune.split(' · ')[0]}</small></span>
                </button>
                <button className="profile-remove" onClick={() => toggleFav(p.id)} aria-label={`Retirer ${p.shortTitle} des favoris`}><Icon name="close" size={14} stroke={2.4} /></button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Puces de catégories. Barre latérale : sur deux lignes, loupe en bout de ligne.
// Mobile : une seule ligne, la loupe ouvre la recherche et la liste complète des tags.
function TagBar({ value, onChange, places, wrap, query, onQuery, visitedCount = 0, wantedCount = 0 }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const inputRef = useRef(null);
  const used = TAGS.filter((t) => places.some((p) => p.tags?.includes(t.id)));
  // La catégorie active passe en tête pour rester visible
  const ordered = value && value !== 'visited' && value !== 'wanted' ? [...used.filter((t) => t.id === value), ...used.filter((t) => t.id !== value)] : used;
  const count = (id) => places.filter((p) => p.tags?.includes(id)).length;
  const q = norm(query.trim());
  const menuTags = q ? used.filter((t) => norm(t.label).includes(q)) : used;
  const pick = (id) => { onChange(id); setOpen(false); onQuery(''); };
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!boxRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  const searchField = (
    <label className="tag-search">
      <Icon name="search" size={15} />
      <input ref={inputRef} type="search" value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Chercher une catégorie ou un spot…" aria-label="Rechercher" onKeyDown={(e) => e.key === 'Escape' && (onQuery(''), setOpen(false))} />
      {query && <button type="button" className="tag-search-clear" onClick={() => onQuery('')} aria-label="Effacer la recherche"><Icon name="close" size={14} stroke={2.4} /></button>}
    </label>
  );
  return (
    <div className={`tagbar-wrap ${wrap ? 'is-wrap' : ''}`} ref={boxRef}>
      <div className="tagbar" role="toolbar" aria-label="Filtrer par catégorie">
        <button className={`tag ${!value ? 'is-active' : ''}`} onClick={() => pick(null)} aria-pressed={!value}>Tous</button>
        {(visitedCount > 0 || value === 'visited') && (
          <button className={`tag tag--visited ${value === 'visited' ? 'is-active' : ''}`} onClick={() => pick(value === 'visited' ? null : 'visited')} aria-pressed={value === 'visited'}>
            <Icon name="check" size={14} stroke={2.8} /> {visitedCount} déjà visité{visitedCount > 1 ? 's' : ''}
          </button>
        )}
        {(wantedCount > 0 || value === 'wanted') && (
          <button className={`tag tag--wanted ${value === 'wanted' ? 'is-active' : ''}`} onClick={() => pick(value === 'wanted' ? null : 'wanted')} aria-pressed={value === 'wanted'}>
            <Icon name="star" size={14} stroke={2.2} /> {wantedCount} favori{wantedCount > 1 ? 's' : ''}
          </button>
        )}
        {(wrap ? used : ordered).map((t) => (
          <button key={t.id} className={`tag ${value === t.id ? 'is-active' : ''}`} onClick={() => pick(value === t.id ? null : t.id)} aria-pressed={value === t.id}>
            <Icon name={t.icon} size={14} /> {t.label}
          </button>
        ))}
        {wrap && (
          <button className={`tag tag-plus ${open || query ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Toutes les catégories" aria-expanded={open}>
            <Icon name="plus" size={15} stroke={2.4} />
          </button>
        )}
      </div>
      {!wrap && <button className={`tag-more ${open || query ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Toutes les catégories" aria-expanded={open}>
        <Icon name="plus" size={16} stroke={2.4} />
      </button>}
      {open && (
        <div className="tag-menu" role="menu">
          {searchField}
          {menuTags.map((t) => (
            <button key={t.id} role="menuitemradio" aria-checked={value === t.id} className={`tag-menu-item ${value === t.id ? 'is-active' : ''}`} onClick={() => pick(value === t.id ? null : t.id)}>
              <Icon name={t.icon} size={16} /> <span>{t.label}</span> <b>{count(t.id)}</b>
            </button>
          ))}
          {q && (() => { const n = places.filter((p) => searchText(p).includes(q)).length; return <p className="tag-menu-note">{n ? `${n} spot${n > 1 ? 's' : ''} trouvé${n > 1 ? 's' : ''}, affiché${n > 1 ? 's' : ''} dans la liste.` : 'Aucun spot trouvé.'}</p>; })()}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const desktop = useIsDesktop();
  const mapRef = useRef(null);
  const railRef = useRef(null);
  const railWrapRef = useRef(null);
  const appRef = useRef(null);
  // Hauteur réelle du bandeau du bas (mobile) : les contrôles de carte se posent juste au-dessus
  useEffect(() => {
    const el = railWrapRef.current;
    if (!el || !window.ResizeObserver) return;
    const ro = new ResizeObserver(() => appRef.current?.style.setProperty('--rail-measured', `${el.offsetHeight}px`));
    ro.observe(el);
    return () => ro.disconnect();
  });
  const [route, setRoute] = useState(readRoute);
  const [selected, setSelected] = useState(() => readRoute());
  const fromRail = useRef(false);
  const place = route ? getPlace(route) : null;
  const [visited, toggleVisited] = useVisited();
  const [wanted, toggleWanted] = useFavorites();
  const visitedRef = useRef(visited);
  visitedRef.current = visited;
  const wantedRef = useRef(wanted);
  wantedRef.current = wanted;
  const [tag, setTag] = useState(null);
  const [query, setQuery] = useState('');
  const visible = useMemo(() => {
    const q = norm(query.trim());
    return PLACES.filter((p) => (!tag || (tag === 'visited' ? visited.includes(p.id) : tag === 'wanted' ? wanted.includes(p.id) : p.tags?.includes(tag))) && (!q || searchText(p).includes(q)));
  }, [tag, query, visited, wanted]);
  // La recherche recadre la carte sur les lieux trouvés
  useEffect(() => {
    if (!query.trim() || !visible.length) return;
    const t = setTimeout(() => mapRef.current?.fitPoints(visible.map((p) => p.coords)), 350);
    return () => clearTimeout(t);
  }, [query, visible]);
  const available = visible.filter((p) => p.available).length;
  const allVisited = PLACES.filter((p) => visited.includes(p.id));
  const totalSpots = PLACES.filter((p) => p.available).length;
  const changeTag = useCallback((t) => {
    setTag(t);
    const list = PLACES.filter((p) => !t || (t === 'visited' ? visitedRef.current.includes(p.id) : t === 'wanted' ? wantedRef.current.includes(p.id) : p.tags?.includes(t)));
    if (list.length) setTimeout(() => mapRef.current?.fitPoints(list.map((p) => p.coords)), 30);
    railRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const on = () => { const r = readRoute(); setRoute(r); if (r) setSelected(r); };
    window.addEventListener('popstate', on);
    window.addEventListener('hashchange', on);
    return () => { window.removeEventListener('popstate', on); window.removeEventListener('hashchange', on); };
  }, []);
  // Ancienne adresse #/lieu/<id> : on passe à la vraie page /lieu/<id>/
  useEffect(() => { if (route && location.hash) history.replaceState(null, '', `${BASE}lieu/${route}/`); }, []);
  // Titre de l'onglet
  useEffect(() => { document.title = place ? `${place.title} · guideme.bzh` : 'guideme.bzh · Les spots emblématiques du Finistère'; }, [place]);

  // Desktop : la fiche se pose par-dessus la navigation, la carte reste visible à droite
  const panelW = desktop ? Math.round(Math.max(560, Math.min(window.innerWidth * 0.44, 680))) : 0;
  // Espace laissé à la carte : carrousel en bas (mobile), liste et fiche à gauche (desktop)
  const padding = useMemo(
    () => (desktop ? { top: 60, bottom: 60, left: SIDEBAR_W + 40, right: 60 } : { top: 90, bottom: place ? 40 : 200, left: 28, right: 28 }),
    [desktop, place],
  );

  // Retour arrière seulement si la fiche a été ouverte depuis l'app ;
  // arrivé par un lien direct, « Fermer » mène à la carte sans quitter le site.
  const openedInApp = useRef(false);
  const open = useCallback((id) => {
    if (readRoute() === id) return;
    if (readRoute()) history.replaceState(null, '', `${BASE}lieu/${id}/`);
    else { openedInApp.current = true; history.pushState(null, '', `${BASE}lieu/${id}/`); }
    setRoute(id); setSelected(id);
  }, []);
  const close = useCallback(() => {
    if (openedInApp.current) { openedInApp.current = false; history.back(); }
    else { history.pushState(null, '', BASE); setRoute(null); }
  }, []);

  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const select = useCallback((id, fromMarker) => {
    // Deuxième clic sur le repère d'un lieu disponible : ouvre la fiche
    if (fromMarker && id && id === selectedRef.current && getPlace(id).available) { open(id); return; }
    setSelected(id);
    if (!id) return;
    const p = getPlace(id);
    mapRef.current?.flyTo(p.coords, 11.5);
    // Sur mobile, amène la carte correspondante au centre du carrousel
    if (!fromRail.current && railRef.current) {
      const card = railRef.current.querySelector(`[data-id="${id}"]`);
      card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
    fromRail.current = false;
  }, [open]);

  // Quand on ouvre une fiche, la carte montre tout le Finistère, le lieu mis en avant
  useEffect(() => {
    if (!place) return;
    setTimeout(() => mapRef.current?.fitFinistere(), 60);
  }, [place]);

  // Carrousel mobile : la carte centrée devient la sélection
  const onRailScroll = useRef(null);
  const handleRailScroll = () => {
    clearTimeout(onRailScroll.current);
    onRailScroll.current = setTimeout(() => {
      const rail = railRef.current;
      if (!rail) return;
      const mid = rail.scrollLeft + rail.clientWidth / 2;
      let best = null; let dist = Infinity;
      rail.querySelectorAll('[data-id]').forEach((el) => {
        const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - mid);
        if (d < dist) { dist = d; best = el.dataset.id; }
      });
      if (best && best !== selected) { fromRail.current = true; select(best); }
    }, 140);
  };

  return (
    <div ref={appRef} className={`app ${place ? 'has-guide' : ''} ${tag === 'visited' ? 'is-visited-filter' : ''}`} style={{ '--panel-w': `${panelW}px` }}>
      <MapView ref={mapRef} places={PLACES} selectedId={selected} onSelect={select} padding={padding} pois={selected ? getPlace(selected)?.pois : null} visibleIds={visible.map((p) => p.id)} visitedIds={visited} onToggleVisited={toggleVisited} wantedIds={wanted} onToggleWanted={toggleWanted} onOpenPlace={open} />

      {!desktop && !place && (
        <header className="topbar">
          <Brand />
          <ProgressFlag visited={visited} onPick={select} />
        </header>
      )}

      <div className="map-tools" style={desktop ? { left: SIDEBAR_W + 16 } : undefined}>
        <button className="tool-btn" onClick={() => mapRef.current?.fitFinistere()} aria-label="Voir tout le Finistère"><Icon name="map" size={19} /></button>
        <button className="tool-btn" onClick={() => mapRef.current?.locate()} aria-label="Me localiser"><Icon name="locate" size={19} /></button>
        <MapSettings />
      </div>

      {desktop && (
        <aside className="sidebar">
          <header className="brand-bar"><Brand /><ProgressFlag visited={visited} onPick={select} /><ProfileMenu onOpen={open} /></header>
          <div className="sidebar-intro">
            <h1>Le Finistère, t'as vraiment tout vu ?</h1>
            <p className="sidebar-sub"><b>{visible.length}</b> {countLabel(tag, visible.length, query)} <span className="sidebar-made">made in Penn-ar-Bed</span></p>
          </div>
          <TagBar value={tag} onChange={changeTag} places={PLACES} visitedCount={allVisited.length} wantedCount={wanted.length} query={query} onQuery={setQuery} />
          <div className="sidebar-list">
            {visible.length === 0 && <p className="sidebar-empty">{tag === 'visited' ? 'Aucun spot coché pour l\'instant.' : `Aucun spot ne correspond à « ${query} ».`}</p>}
            {visible.map((p) => (
              <PlaceCard key={p.id} place={p} selected={selected === p.id} onOpen={open} onSelect={select} visited={visited.includes(p.id)} onToggleVisited={toggleVisited} wanted={wanted.includes(p.id)} onToggleWanted={toggleWanted} />
            ))}
          </div>
        </aside>
      )}

      {!desktop && !place && (
        <div className="rail-wrap" ref={railWrapRef}>
          <TagBar value={tag} onChange={changeTag} places={PLACES} visitedCount={allVisited.length} wantedCount={wanted.length} query={query} onQuery={setQuery} />
          <div className="rail" ref={railRef} onScroll={handleRailScroll}>
            {visible.map((p) => (
              <PlaceCard key={p.id} place={p} selected={selected === p.id} onOpen={open} onSelect={select} visited={visited.includes(p.id)} onToggleVisited={toggleVisited} wanted={wanted.includes(p.id)} onToggleWanted={toggleWanted} />
            ))}
          </div>
        </div>
      )}

      {place && desktop && <div className="guide-backdrop" onClick={close} aria-hidden="true" />}
      {place && <Guide key={place.id} place={place} onClose={close} variant="modal" />}
      {place && desktop && (
        <div className="modal-actions">
          <button className="modal-action" onClick={close} aria-label="Fermer la fiche"><Icon name="close" size={20} stroke={2.2} /></button>
          <button className="modal-action" onClick={() => sharePlace(place)} aria-label="Partager"><Icon name="share" size={19} /></button>
        </div>
      )}
    </div>
  );
}
