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

// Carte de lieu simplifiée : vignette, nom, commune, durée (ou « Bientôt »)
function PlaceCard({ place, selected, onOpen, onSelect }) {
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
        {place.thumb || place.hero ? <img src={place.thumb || place.hero.src} alt="" loading="lazy" /> : <Icon name="lock" size={20} />}
      </div>
      <div className="pc-body">
        <h3>{place.shortTitle}</h3>
        <span className="pc-meta">
          {place.commune.split(' · ')[0]}
          {!soon && <> · <b>{place.readingMinutes} min</b></>}
        </span>
      </div>
      {soon ? <span className="pc-soon">Bientôt</span> : <span className="pc-go"><Icon name="chevron" size={18} stroke={2.4} /></span>}
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
    () => (desktop ? { top: 60, bottom: 60, left: 440, right: 60 } : { top: 90, bottom: place ? 40 : 140, left: 28, right: 28 }),
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
    <div className={`app ${place ? 'has-guide' : ''}`}>
      <MapView ref={mapRef} places={PLACES} selectedId={selected} onSelect={select} padding={padding} pois={selected ? getPlace(selected)?.pois : null} />

      {!desktop && !place && (
        <header className="topbar">
          <Brand />
          <span className="topbar-region">Finistère</span>
        </header>
      )}

      <div className="map-tools" style={desktop ? { left: 416 } : undefined}>
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
            <strong>{available} guide{available > 1 ? 's' : ''}</strong> disponible{available > 1 ? 's' : ''}{PLACES.length > available ? ` · ${PLACES.length - available} en préparation` : ''}
          </div>
          <div className="sidebar-list">
            {PLACES.map((p) => (
              <PlaceCard key={p.id} place={p} selected={selected === p.id} onOpen={open} onSelect={select} />
            ))}
          </div>
          <footer className="sidebar-foot">guideme.bzh · version de démonstration</footer>
        </aside>
      )}

      {!desktop && !place && (
        <div className="rail-wrap">
          <div className="rail-head">
            <span><strong>{available} guide{available > 1 ? 's' : ''}</strong> autour de la pointe du Raz</span>
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
