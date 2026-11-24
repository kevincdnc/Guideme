import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FINISTERE_BOUNDS } from '../data/places.js';

import MAP_STYLE from '../data/map-style.json';

// Carte vectorielle (tuiles OpenFreeMap, style construit par scripts/build-map-style.mjs) :
// nette à tous les zooms, avec relief ombré. L'attribution complète est déclarée dans le style.
MAP_STYLE.sources.openmaptiles.attribution = '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> · © <a href="https://www.openmaptiles.org/" target="_blank">OpenMapTiles</a> · © <a href="https://www.openstreetmap.org/copyright" target="_blank">les contributeurs OpenStreetMap</a>';

// Pictogrammes des repères, selon le type de lieu
const PIN_ICONS = {
  lighthouse: '<path d="M9 21l1.5-12h3L15 21z"/><path d="M8 9h8M10 6h4v3h-4zM12 3v3"/>',
  beach: '<path d="M3 18c2 0 2-1.5 4.5-1.5S9.5 18 12 18s2.5-1.5 4.5-1.5S19 18 21 18"/><path d="M12 14V5"/><path d="M5 9a7 7 0 0114 0z"/>',
  cliff: '<path d="M3 20h18"/><path d="M4 20l4-11 3 4 3-8 6 15"/>',
  port: '<circle cx="12" cy="5" r="2"/><path d="M12 7v13"/><path d="M5 13a7 7 0 0014 0"/><path d="M8 10h8"/>',
  fire: '<path d="M12 21c4 0 6-2.5 6-6 0-4-3-6-4-9-1 2-2 3-3 3 0-2 0-4-1-6-2 3-4 6-4 12 0 3.5 2 6 6 6z"/>',
};

const MAX_BOUNDS = [
  [-6.3, 47.2],
  [-2.4, 49.25],
];

function markerEl(place, onSelect) {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = `gm-marker ${place.available ? 'is-available' : 'is-soon'}`;
  el.setAttribute('aria-label', `${place.shortTitle}${place.available ? '' : ' (bientôt disponible)'}`);
  el.innerHTML = `
    <span class="gm-marker-pin">
      ${place.available
        ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${PIN_ICONS[place.icon] || PIN_ICONS.lighthouse}</svg>`
        : '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>'}
    </span>
    <span class="gm-marker-label">${place.shortTitle}</span>`;
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    onSelect(place.id);
  });
  return el;
}

const MapView = forwardRef(function MapView({ places, selectedId, onSelect, padding, pois, visibleIds }, ref) {
  const box = useRef(null);
  const map = useRef(null);
  const markers = useRef({});
  const onSelectRef = useRef(onSelect);
  const clusters = useRef([]);
  const reclusterRef = useRef(() => {});
  const visibleRef = useRef(visibleIds);
  visibleRef.current = visibleIds;
  const selectedRef = useRef(selectedId);
  selectedRef.current = selectedId;

  // Regroupement des repères trop proches à l'écran : une pastille avec le nombre de lieux,
  // qui zoome sur le groupe quand on la touche.
  function recluster() {
    const m = map.current;
    if (!m) return;
    clusters.current.forEach((c) => c.remove());
    clusters.current = [];
    const RADIUS = 96; // largeur d'une pastille de groupe
    const items = places
      .filter((p) => !visibleRef.current || visibleRef.current.includes(p.id))
      .map((p) => ({ p, pt: m.project(p.coords) }));
    const groups = [];
    items.forEach((it) => {
      if (it.p.id === selectedRef.current) { groups.push([it]); return; }
      const g = groups.find((gr) => gr[0].p.id !== selectedRef.current && Math.hypot(gr[0].pt.x - it.pt.x, gr[0].pt.y - it.pt.y) < RADIUS);
      if (g) g.push(it); else groups.push([it]);
    });
    places.forEach((p) => markers.current[p.id]?.getElement().classList.remove('is-clustered'));
    groups.filter((g) => g.length > 1).forEach((g) => {
      g.forEach((it) => markers.current[it.p.id].getElement().classList.add('is-clustered'));
      const lng = g.reduce((a, it) => a + it.p.coords[0], 0) / g.length;
      const lat = g.reduce((a, it) => a + it.p.coords[1], 0) / g.length;
      const ready = g.filter((it) => it.p.available).length;
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'gm-cluster';
      el.setAttribute('aria-label', `${g.length} lieux, zoomer`);
      el.innerHTML = `<span class="gm-cluster-count">${g.length}</span><span class="gm-cluster-label">${ready} guide${ready > 1 ? 's' : ''}</span>`;
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const b = new maplibregl.LngLatBounds(g[0].p.coords, g[0].p.coords);
        g.forEach((it) => b.extend(it.p.coords));
        m.fitBounds(b, { padding: { ...(padding || {}), top: (padding?.top || 40) + 60, left: (padding?.left || 40) + 40, right: (padding?.right || 40) + 40, bottom: (padding?.bottom || 40) + 20 }, maxZoom: 13, duration: 900 });
      });
      clusters.current.push(new maplibregl.Marker({ element: el }).setLngLat([lng, lat]).addTo(m));
    });
  }
  onSelectRef.current = onSelect;

  useImperativeHandle(ref, () => ({
    flyTo(coords, zoom = 11.5) {
      map.current?.flyTo({ center: coords, zoom, padding: padding || undefined, speed: 1.2, essential: true });
    },
    fitPoints(points) {
      if (!map.current || !points.length) return;
      const b = new maplibregl.LngLatBounds(points[0], points[0]);
      points.forEach((c) => b.extend(c));
      const pad = padding ? { ...padding, left: (padding.left || 0) + 60, right: (padding.right || 0) + 150, top: (padding.top || 0) + 40 } : 60; // place pour les étiquettes à droite des points
      map.current.fitBounds(b, { padding: pad, maxZoom: 13, duration: 1200 });
    },
    fitFinistere() {
      map.current?.fitBounds(FINISTERE_BOUNDS, { padding: padding || 24, duration: 900 });
    },
    locate() {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const c = [pos.coords.longitude, pos.coords.latitude];
          if (!map.current) return;
          if (!map.current.__me) {
            const el = document.createElement('div');
            el.className = 'gm-me';
            map.current.__me = new maplibregl.Marker({ element: el }).setLngLat(c).addTo(map.current);
          } else map.current.__me.setLngLat(c);
          map.current.flyTo({ center: c, zoom: 12, padding: padding || undefined });
        },
        () => {},
        { enableHighAccuracy: true, timeout: 8000 },
      );
    },
  }));

  useEffect(() => {
    const m = new maplibregl.Map({
      container: box.current,
      style: MAP_STYLE,
      bounds: FINISTERE_BOUNDS,
      fitBoundsOptions: { padding: 20 },
      maxBounds: MAX_BOUNDS,
      minZoom: 7,
      maxZoom: 18,
      fadeDuration: 150,
      // Rendu net sur écrans haute densité, transitions de zoom douces
      pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      cooperativeGestures: false,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
    });
    m.touchZoomRotate.disableRotation();
    m.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
    m.addControl(new maplibregl.ScaleControl({ unit: 'metric', maxWidth: 90 }), 'bottom-left');
    m.on('click', () => onSelectRef.current(null));
    // Étiquettes des lieux « bientôt » masquées de loin, pour éviter les chevauchements
    const onZoom = () => box.current?.classList.toggle('is-far', m.getZoom() < 9.6);
    m.on('zoom', onZoom);
    m.once('load', () => {
      onZoom();
      // Attribution repliée par défaut (toujours accessible par le bouton « i »)
      box.current?.querySelector('.maplibregl-ctrl-attrib')?.classList.remove('maplibregl-compact-show');
    });
    map.current = m;

    places.forEach((p) => {
      const mk = new maplibregl.Marker({ element: markerEl(p, (id) => onSelectRef.current(id, true)), anchor: 'bottom' })
        .setLngLat(p.coords)
        .addTo(m);
      markers.current[p.id] = mk;
    });
    let raf = 0;
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(recluster); };
    m.on('zoom', schedule);
    m.on('load', schedule);
    reclusterRef.current = schedule;
    return () => { cancelAnimationFrame(raf); clusters.current.forEach((c) => c.remove()); clusters.current = []; m.remove(); };
  }, [places]);

  // Recadrage quand la place disponible change (panneau latéral, carrousel)
  useEffect(() => {
    if (!map.current || !padding) return;
    map.current.fitBounds(FINISTERE_BOUNDS, { padding, duration: 0 });
  }, [padding?.left, padding?.bottom]); // eslint-disable-line react-hooks/exhaustive-deps

  // Points secondaires d'une fiche ouverte (phare, statue, baie…)
  useEffect(() => {
    if (!map.current || !pois?.length) return;
    const list = pois.map((p) => {
      const el = document.createElement('div');
      el.className = 'gm-poi';
      el.innerHTML = `<span class="gm-poi-dot"></span><span class="gm-poi-label">${p.name}</span>`;
      return new maplibregl.Marker({ element: el, anchor: 'left' }).setLngLat(p.coords).addTo(map.current);
    });
    return () => list.forEach((mk) => mk.remove());
  }, [pois]);

  // Repères masqués par le filtre de catégorie
  useEffect(() => {
    Object.entries(markers.current).forEach(([id, mk]) => {
      mk.getElement().classList.toggle('is-hidden', !!visibleIds && !visibleIds.includes(id));
    });
    reclusterRef.current();
  }, [visibleIds?.join()]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    Object.entries(markers.current).forEach(([id, mk]) => {
      mk.getElement().classList.toggle('is-selected', id === selectedId);
    });
    reclusterRef.current();
  }, [selectedId]);

  return <div ref={box} className="map" role="application" aria-label="Carte du Finistère" />;
});

export default MapView;
