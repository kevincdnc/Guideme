import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MapView from './components/MapView.jsx';
import Guide from './components/Guide.jsx';
import Icon from './components/Icon.jsx';
import { PLACES, getPlace } from './data/places.js';

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

function Brand() {
  return (
    <a className="brand" href="#/" aria-label="guideme.bzh, accueil">
      <img src="icons/icon.svg" alt="" width="34" height="34" />
      <span className="brand-name">guideme<span>.bzh</span></span>
    </a>
  );
}

function PlaceCard({ place, selected, onOpen, onSelect, compact }) {
  const soon = !place.available;
  return (
    <div
      className={`place-card ${soon ? 'is-soon' : ''} ${selected ? 'is-selected' : ''} ${compact ? 'is-compact' : ''}`}
      data-id={place.id}
      onClick={() => onSelect(place.id)}
    >
      <div className="place-card-media">
        {place.hero ? (
          <img src={place.hero.src} alt="" loading="lazy" />
        ) : (
          <div className="place-card-placeholder"><Icon name="lock" size={22} /></div>
        )}
        {soon && <span className="soon-badge">Bientôt</span>}
      </div>
      <div className="place-card-body">
        <span className="place-card-cat">{place.category}</span>
        <h3>{place.shortTitle}</h3>
        <span className="place-card-commune"><Icon name="pin" size={13} /> {place.commune}</span>
        {!compact && <p className="place-card-teaser">{place.teaser}</p>}
        {soon ? (
          <span className="place-card-cta is-disabled"><Icon name="clock" size={15} /> Fiche en préparation</span>
        ) : (
          <button className="place-card-cta" onClick={(e) => { e.stopPropagation(); onOpen(place.id); }}>
            <Icon name="headphones" size={16} /> Ouvrir le guide
            <span className="place-card-meta">{place.readingMinutes} min</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const desktop = useIsDesktop();
  const mapRef = useRef(null);
  const railRef = useRef(null);
  const [route, setRoute] = useState(readRoute);
  const [selected, setSelected] = useState(() => readRoute());
  const fromRail = useRef(false);
  const place = route ? getPlace(route) : null;
  const available = PLACES.filter((p) => p.available).length;

  useEffect(() => {
    const on = () => setRoute(readRoute());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  // Espace laissé à la carte : carrousel en bas (mobile), panneau à gauche (desktop)
  const padding = useMemo(
    () => (desktop ? { top: 40, bottom: 40, left: (place ? 560 : 400) + 20, right: 40 } : { top: 80, bottom: place ? 40 : 230, left: 24, right: 24 }),
    [desktop, place],
  );

  const open = useCallback((id) => { location.hash = `#/lieu/${id}`; setSelected(id); }, []);
  const close = useCallback(() => { history.length > 1 && location.hash.startsWith('#/lieu') ? history.back() : (location.hash = '#/'); }, []);

  const select = useCallback((id) => {
    setSelected(id);
    if (!id) return;
    const p = getPlace(id);
    mapRef.current?.flyTo(p.coords, 11);
    // Sur mobile, amène la carte correspondante au centre du carrousel
    if (!fromRail.current && railRef.current) {
      const card = railRef.current.querySelector(`[data-id="${id}"]`);
      card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
    fromRail.current = false;
  }, []);

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
    <div className={`app ${place ? 'has-guide' : ''}`}>
      <MapView ref={mapRef} places={PLACES} selectedId={selected} onSelect={select} padding={padding} pois={place?.pois} />

      {!desktop && !place && (
        <header className="topbar">
          <Brand />
          <span className="topbar-region">Finistère</span>
        </header>
      )}

      <div className="map-tools" style={desktop ? { left: (place ? 560 : 400) + 16 } : undefined}>
        <button className="tool-btn" onClick={() => mapRef.current?.fitFinistere()} aria-label="Voir tout le Finistère"><Icon name="map" size={19} /></button>
        <button className="tool-btn" onClick={() => mapRef.current?.locate()} aria-label="Me localiser"><Icon name="locate" size={19} /></button>
      </div>

      {desktop && (
        <aside className="sidebar">
          <Brand />
          <div className="sidebar-intro">
            <span className="chip chip--accent">Finistère · Penn-ar-Bed</span>
            <h1>Le bout du monde, raconté lieu par lieu.</h1>
            <p>Histoire, anecdotes insolites, cartes postales d'époque et lecture audio, à consulter sur place ou depuis chez vous.</p>
          </div>
          <div className="sidebar-count">
            <strong>{PLACES.length} lieux</strong> sur la carte · {available} guide disponible
          </div>
          <div className="sidebar-list">
            {PLACES.map((p) => (
              <PlaceCard key={p.id} place={p} selected={selected === p.id} onOpen={open} onSelect={select} compact={!p.available} />
            ))}
          </div>
          <footer className="sidebar-foot">guideme.bzh · version de démonstration</footer>
        </aside>
      )}

      {!desktop && !place && (
        <div className="rail-wrap">
          <div className="rail-head">
            <span><strong>{PLACES.length} lieux</strong> · {available} guide disponible</span>
          </div>
          <div className="rail" ref={railRef} onScroll={handleRailScroll}>
            {PLACES.map((p) => (
              <PlaceCard key={p.id} place={p} selected={selected === p.id} onOpen={open} onSelect={select} />
            ))}
          </div>
        </div>
      )}

      {place && <Guide key={place.id} place={place} onClose={close} />}
    </div>
  );
}
