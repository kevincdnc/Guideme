import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MapView from './components/MapView.jsx';
import Guide from './components/Guide.jsx';
import Icon from './components/Icon.jsx';
import SafeImg from './components/SafeImg.jsx';
import Brand from './components/Brand.jsx';
import { useVisited } from './hooks/useVisited.js';
import { PLACES, TAGS, getPlace } from './data/places.js';

// Navigation par hash : #/ (carte) ou #/lieu/<id> (fiche)
function readRoute() {
  const m = location.hash.match(/^#\/lieu\/([\w-]+)/);
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

// Carte de lieu : vignette, nom, commune et durée, tags ; case « déjà visité » en haut à droite
function PlaceCard({ place, selected, onOpen, onSelect, visited, onToggleVisited }) {
  const soon = !place.available;
  const activate = () => (soon ? onSelect(place.id) : onOpen(place.id));
  const tags = (place.tags || []).map((id) => TAG_BY_ID[id]).filter(Boolean).slice(0, 3);
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
          <span>{place.commune.split(' · ')[0].split(' & ')[0]}</span>
          {!soon && <span><Icon name="headphones" size={12} /> {place.readingMinutes} min</span>}
          {place.records?.length > 0 && <span className="pc-records" title={`${place.records.length} record${place.records.length > 1 ? 's' : ''}`}><Icon name="trophy" size={12} /> {place.records.length}</span>}
        </span>
        {tags.length > 0 && (
          <span className="pc-tags">
            {tags.map((t) => <span key={t.id} className={`pc-tag pc-tag--${t.id}`}><Icon name={t.icon} size={11} stroke={2.2} />{t.label}</span>)}
          </span>
        )}
      </div>
      {soon ? <span className="pc-soon">Bientôt</span> : onToggleVisited && (
        <button
          className={`pc-check ${visited ? 'is-on' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleVisited(place.id); }}
          aria-pressed={!!visited}
          aria-label={visited ? `${place.shortTitle} : déjà visité (décocher)` : `Marquer ${place.shortTitle} comme déjà visité`}
          title={visited ? 'Déjà visité' : 'Déjà visité ?'}
        >
          <Icon name="check" size={12} stroke={3.2} />
        </button>
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
        <span className="progress-count"><b>{done.length}</b>/{places.length}</span>
        <span className="progress-dial">
          <svg viewBox="0 0 40 40" className="progress-ring" aria-hidden="true">
            <circle cx="20" cy="20" r={R} className="progress-track" />
            <circle cx="20" cy="20" r={R} className="progress-value" strokeDasharray={L} strokeDashoffset={L * (1 - pct / 100)} style={{ opacity: done.length ? 1 : 0 }} />
          </svg>
          <img className="progress-flag" src={`${import.meta.env.BASE_URL}icons/drapeau-finistere.png`} alt="" />
        </span>
      </button>
      {open && (
        <div className="progress-menu">
          <div className="progress-head">
            <strong>Ta conquête du bout du monde</strong>
            <span><b>{done.length}</b> lieu{done.length > 1 ? 'x' : ''} visité{done.length > 1 ? 's' : ''} sur {places.length}</span>
          </div>
          <div className="progress-bar-row">
            <div className="progress-bar"><span style={{ width: `${pct}%` }} /></div>
            <b className="progress-bar-pct">{pct} %</b>
          </div>
          <p className="progress-hint">{encouragement}</p>
          <button className="progress-toggle" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
            {showAll ? 'Masquer les spots' : 'Afficher tous les spots'}
            <Icon name="chevron" size={15} style={{ transform: showAll ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'transform .2s' }} />
          </button>
          {showAll && (
            <ul>
              {places.map((p) => {
                const v = visited.includes(p.id);
                return (
                  <li key={p.id}>
                    <button className={v ? 'is-done' : ''} onClick={() => { setOpen(false); onPick(p.id); }}>
                      <span className="progress-check">{v && <Icon name="check" size={12} stroke={3.4} />}</span>
                      {p.shortTitle}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

// Recherche sans accents ni majuscules : nom, commune, catégorie et tags
const norm = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const searchText = (p) => norm([p.title, p.shortTitle, p.commune, p.category, ...(p.tags || []).map((id) => TAG_BY_ID[id]?.label)].join(' '));

// Puces de catégories. Barre latérale : sur deux lignes, loupe en bout de ligne.
// Mobile : une seule ligne, la loupe ouvre la recherche et la liste complète des tags.
function TagBar({ value, onChange, places, wrap, query, onQuery }) {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const boxRef = useRef(null);
  const inputRef = useRef(null);
  const used = TAGS.filter((t) => places.some((p) => p.tags?.includes(t.id)));
  // La catégorie active passe en tête pour rester visible
  const ordered = value ? [...used.filter((t) => t.id === value), ...used.filter((t) => t.id !== value)] : used;
  const count = (id) => places.filter((p) => p.tags?.includes(id)).length;
  const q = norm(query.trim());
  const menuTags = q ? used.filter((t) => norm(t.label).includes(q)) : used;
  const pick = (id) => { onChange(id); setOpen(false); if (!wrap) onQuery(''); };
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!boxRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);
  useEffect(() => { if (searching || open) inputRef.current?.focus(); }, [searching, open]);
  const searchField = (
    <label className="tag-search">
      <Icon name="search" size={15} />
      <input ref={inputRef} type="search" value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Chercher un spot, une commune, un tag…" aria-label="Rechercher" onKeyDown={(e) => e.key === 'Escape' && (onQuery(''), setSearching(false), setOpen(false))} />
      {(query || wrap) && <button type="button" className="tag-search-clear" onClick={() => { onQuery(''); setSearching(false); }} aria-label="Effacer la recherche"><Icon name="close" size={14} stroke={2.4} /></button>}
    </label>
  );
  return (
    <div className={`tagbar-wrap ${wrap ? 'is-wrap' : ''}`} ref={boxRef}>
      <div className="tagbar" role="toolbar" aria-label="Filtrer par catégorie">
        <button className={`tag ${!value ? 'is-active' : ''}`} onClick={() => pick(null)} aria-pressed={!value}>Tous</button>
        {(wrap ? used : ordered).map((t) => (
          <button key={t.id} className={`tag ${value === t.id ? 'is-active' : ''}`} onClick={() => pick(value === t.id ? null : t.id)} aria-pressed={value === t.id}>
            <Icon name={t.icon} size={14} /> {t.label}
          </button>
        ))}
        {wrap && (
          <button className={`tag tag-search-btn ${searching || query ? 'is-open' : ''}`} onClick={() => setSearching((v) => !v)} aria-label="Rechercher" aria-expanded={searching}>
            <Icon name="search" size={15} stroke={2.2} />
          </button>
        )}
      </div>
      {wrap && (searching || query) && searchField}
      {!wrap && <button className={`tag-more ${open || query ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Rechercher et voir tous les tags" aria-expanded={open}>
        <Icon name="search" size={16} stroke={2.3} />
      </button>}
      {open && (
        <div className="tag-menu" role="menu">
          {searchField}
          {menuTags.map((t) => (
            <button key={t.id} role="menuitemradio" aria-checked={value === t.id} className={`tag-menu-item ${value === t.id ? 'is-active' : ''}`} onClick={() => pick(value === t.id ? null : t.id)}>
              <Icon name={t.icon} size={16} /> <span>{t.label}</span> <b>{count(t.id)}</b>
            </button>
          ))}
          {q && (() => { const n = places.filter((p) => searchText(p).includes(q)).length; return <p className="tag-menu-note">{n ? `${n} spot${n > 1 ? 's' : ''} trouvé${n > 1 ? 's' : ''}, affiché${n > 1 ? 's' : ''} en bas.` : 'Aucun spot trouvé.'}</p>; })()}
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
  const [tag, setTag] = useState(null);
  const [query, setQuery] = useState('');
  const visible = useMemo(() => {
    const q = norm(query.trim());
    return PLACES.filter((p) => (!tag || p.tags?.includes(tag)) && (!q || searchText(p).includes(q)));
  }, [tag, query]);
  // La recherche recadre la carte sur les lieux trouvés
  useEffect(() => {
    if (!query.trim() || !visible.length) return;
    const t = setTimeout(() => mapRef.current?.fitPoints(visible.map((p) => p.coords)), 350);
    return () => clearTimeout(t);
  }, [query, visible]);
  const available = visible.filter((p) => p.available).length;
  // Lieux visités en tête de liste
  const visitedList = visible.filter((p) => visited.includes(p.id));
  const [showVisited, setShowVisited] = useState(false);
  const toVisit = visible.filter((p) => !visited.includes(p.id));
  const changeTag = useCallback((t) => {
    setTag(t);
    const list = PLACES.filter((p) => !t || p.tags?.includes(t));
    if (list.length) setTimeout(() => mapRef.current?.fitPoints(list.map((p) => p.coords)), 30);
    railRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const on = () => setRoute(readRoute());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  // Desktop : la fiche s'ouvre à droite de la liste (400 px), la carte garde une bande à droite
  const panelW = desktop ? Math.round(Math.max(520, Math.min(window.innerWidth * 0.5, window.innerWidth - 620))) : 0;
  // Espace laissé à la carte : carrousel en bas (mobile), liste et fiche à gauche (desktop)
  const padding = useMemo(
    () => (desktop ? { top: 60, bottom: 60, left: place ? 400 + panelW + 30 : 440, right: place ? 30 : 60 } : { top: 90, bottom: place ? 40 : 200, left: 28, right: 28 }),
    [desktop, place],
  );

  // Retour arrière seulement si la fiche a été ouverte depuis l'app ;
  // arrivé par un lien direct, « Fermer » mène à la carte sans quitter le site.
  const openedInApp = useRef(false);
  const open = useCallback((id) => { openedInApp.current = true; location.hash = `#/lieu/${id}`; setSelected(id); }, []);
  const close = useCallback(() => {
    if (openedInApp.current) { openedInApp.current = false; history.back(); }
    else history.replaceState(null, '', location.pathname + location.search + '#/'), setRoute(null);
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

  // Quand on ouvre une fiche, la carte se cadre sur le lieu
  useEffect(() => {
    if (!place) return;
    const pts = [place.coords, ...(place.pois || []).map((p) => p.coords)];
    setTimeout(() => mapRef.current?.fitPoints(pts), 60);
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
    <div ref={appRef} className={`app ${place ? 'has-guide' : ''}`} style={{ '--panel-w': `${panelW}px` }}>
      <MapView ref={mapRef} places={PLACES} selectedId={selected} onSelect={select} padding={padding} pois={selected ? getPlace(selected)?.pois : null} visibleIds={visible.map((p) => p.id)} visitedIds={visited} />

      {!desktop && !place && (
        <header className="topbar">
          <Brand />
          <ProgressFlag visited={visited} onPick={select} />
        </header>
      )}

      <div className="map-tools" style={desktop ? { left: place ? 400 + panelW + 16 : 416 } : undefined}>
        <button className="tool-btn" onClick={() => mapRef.current?.fitFinistere()} aria-label="Voir tout le Finistère"><Icon name="map" size={19} /></button>
        <button className="tool-btn" onClick={() => mapRef.current?.locate()} aria-label="Me localiser"><Icon name="locate" size={19} /></button>
      </div>

      {desktop && (
        <aside className="sidebar">
          <header className="brand-bar"><Brand /><ProgressFlag visited={visited} onPick={select} /></header>
          <div className="sidebar-intro">
            <h1>Tous les spots emblématiques du Finistère</h1>
          </div>
          <TagBar value={tag} onChange={changeTag} places={PLACES} wrap query={query} onQuery={setQuery} />
          {visitedList.length > 0 && (
            <button className="visited-toggle" onClick={() => setShowVisited((v) => !v)} aria-expanded={showVisited}>
              <span className="visited-toggle-dot"><Icon name="check" size={11} stroke={3.4} /></span>
              Déjà visités <b>{visitedList.length}</b>
              <Icon name="chevron" size={15} style={{ marginLeft: 'auto', transform: showVisited ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'transform .2s' }} />
            </button>
          )}
          <div className="sidebar-list">
            {visible.length === 0 && <p className="sidebar-empty">Aucun spot ne correspond à « {query} ».</p>}
            {showVisited && visitedList.map((p) => (
              <PlaceCard key={p.id} place={p} selected={selected === p.id} onOpen={open} onSelect={select} visited onToggleVisited={toggleVisited} />
            ))}
            {toVisit.map((p) => (
              <PlaceCard key={p.id} place={p} selected={selected === p.id} onOpen={open} onSelect={select} onToggleVisited={toggleVisited} />
            ))}
          </div>
        </aside>
      )}

      {!desktop && !place && (
        <div className="rail-wrap" ref={railWrapRef}>
          <TagBar value={tag} onChange={changeTag} places={PLACES} query={query} onQuery={setQuery} />
          <div className="rail" ref={railRef} onScroll={handleRailScroll}>
            {[...toVisit, ...visitedList].map((p) => (
              <PlaceCard key={p.id} place={p} selected={selected === p.id} onOpen={open} onSelect={select} visited={visited.includes(p.id)} onToggleVisited={toggleVisited} />
            ))}
          </div>
        </div>
      )}

      {place && <Guide key={place.id} place={place} onClose={close} variant="panel" />}
    </div>
  );
}
