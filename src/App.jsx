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

// Carte de lieu : vignette avec pictogramme de catégorie, catégorie, nom, commune, durée
function PlaceCard({ place, selected, onOpen, onSelect, visited }) {
  const soon = !place.available;
  const activate = () => (soon ? onSelect(place.id) : onOpen(place.id));
  return (
    <div
      role="button"
      tabIndex={0}
      className={`place-card ${soon ? 'is-soon' : ''} ${selected ? 'is-selected' : ''}`}
      data-id={place.id}
      onClick={activate}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), activate())}
      aria-label={soon ? `${place.shortTitle}, bientôt disponible` : `Ouvrir le guide : ${place.shortTitle}`}
    >
      <div className="pc-thumb">
        {place.thumb || place.hero ? <SafeImg src={place.thumb || place.hero.src} alt="" loading="lazy" /> : <span className="pc-thumb-empty"><Icon name={place.icon || 'pin'} size={22} /></span>}
        {!soon && (visited
          ? <span className="pc-badge is-visited" title="Déjà visité"><Icon name="check" size={13} stroke={3} /></span>
          : <span className="pc-badge"><Icon name={place.icon || 'pin'} size={13} stroke={2.2} /></span>)}
      </div>
      <div className="pc-body">
        <h3>{place.shortTitle}</h3>
        <span className="pc-meta">
          <span><Icon name="pin" size={13} /> {place.commune.split(' · ')[0].split(' & ')[0]}</span>
          {!soon && <span><Icon name="headphones" size={13} /> {place.readingMinutes} min</span>}
        </span>
      </div>
      {soon ? <span className="pc-soon">Bientôt</span> : <span className="pc-go" aria-hidden="true"><Icon name="chevron" size={18} stroke={2.2} /></span>}
    </div>
  );
}

// Puces de catégories sur une seule ligne ; « + » en bout de ligne ouvre la liste complète.
function TagBar({ value, onChange, places }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const used = TAGS.filter((t) => places.some((p) => p.tags?.includes(t.id)));
  // La catégorie active passe en tête pour rester visible
  const ordered = value ? [...used.filter((t) => t.id === value), ...used.filter((t) => t.id !== value)] : used;
  const count = (id) => places.filter((p) => p.tags?.includes(id)).length;
  const pick = (id) => { onChange(id); setOpen(false); };
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!boxRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);
  return (
    <div className="tagbar-wrap" ref={boxRef}>
      <div className="tagbar" role="toolbar" aria-label="Filtrer par catégorie">
        <button className={`tag ${!value ? 'is-active' : ''}`} onClick={() => pick(null)} aria-pressed={!value}>Tous</button>
        {ordered.map((t) => (
          <button key={t.id} className={`tag ${value === t.id ? 'is-active' : ''}`} onClick={() => pick(value === t.id ? null : t.id)} aria-pressed={value === t.id}>
            <Icon name={t.icon} size={14} /> {t.label}
          </button>
        ))}
      </div>
      <button className={`tag-more ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Toutes les catégories" aria-expanded={open}>
        <Icon name="plus" size={16} stroke={2.4} />
      </button>
      {open && (
        <div className="tag-menu" role="menu">
          {used.map((t) => (
            <button key={t.id} role="menuitemradio" aria-checked={value === t.id} className={`tag-menu-item ${value === t.id ? 'is-active' : ''}`} onClick={() => pick(value === t.id ? null : t.id)}>
              <Icon name={t.icon} size={16} /> <span>{t.label}</span> <b>{count(t.id)}</b>
            </button>
          ))}
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
  const [visited] = useVisited();
  const [tag, setTag] = useState(null);
  const visible = useMemo(() => PLACES.filter((p) => !tag || p.tags?.includes(tag)), [tag]);
  const available = visible.filter((p) => p.available).length;
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

  // Espace laissé à la carte : carrousel en bas (mobile), panneau à gauche (desktop)
  const padding = useMemo(
    () => (desktop ? { top: 60, bottom: 60, left: place ? Math.max(window.innerWidth / 2, 560) + 40 : 440, right: 60 } : { top: 90, bottom: place ? 40 : 200, left: 28, right: 28 }),
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
    <div ref={appRef} className={`app ${place ? 'has-guide' : ''}`}>
      <MapView ref={mapRef} places={PLACES} selectedId={selected} onSelect={select} padding={padding} pois={selected ? getPlace(selected)?.pois : null} visibleIds={visible.map((p) => p.id)} visitedIds={visited} />

      {!desktop && !place && (
        <header className="topbar">
          <Brand />
          <span className="topbar-region">Penn-ar-Bed</span>
        </header>
      )}

      <div className="map-tools" style={desktop ? { left: place ? Math.max(window.innerWidth / 2, 560) + 16 : 416 } : undefined}>
        <button className="tool-btn" onClick={() => mapRef.current?.fitFinistere()} aria-label="Voir tout le Finistère"><Icon name="map" size={19} /></button>
        <button className="tool-btn" onClick={() => mapRef.current?.locate()} aria-label="Me localiser"><Icon name="locate" size={19} /></button>
      </div>

      {desktop && (
        <aside className="sidebar">
          <header className="brand-bar"><Brand /></header>
          <div className="sidebar-intro">
            <h1>Le Finistère, lieu par lieu</h1>
            <p>Histoires, anecdotes et archives, à écouter sur place.</p>
          </div>
          <TagBar value={tag} onChange={changeTag} places={PLACES} />
          <div className="sidebar-list">
            {visible.map((p) => (
              <PlaceCard key={p.id} place={p} selected={selected === p.id} onOpen={open} onSelect={select} visited={visited.includes(p.id)} />
            ))}
          </div>
        </aside>
      )}

      {!desktop && !place && (
        <div className="rail-wrap" ref={railWrapRef}>
          <TagBar value={tag} onChange={changeTag} places={PLACES} />
          <div className="rail" ref={railRef} onScroll={handleRailScroll}>
            {visible.map((p) => (
              <PlaceCard key={p.id} place={p} selected={selected === p.id} onOpen={open} onSelect={select} visited={visited.includes(p.id)} />
            ))}
          </div>
        </div>
      )}

      {place && <Guide key={place.id} place={place} onClose={close} variant="panel" />}
    </div>
  );
}
