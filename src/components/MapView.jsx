import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FINISTERE_BOUNDS } from '../data/places.js';

// Fond « relief » coloré (même fond que la carte Relief de Printrace) :
// villes, routes et relief ombré lisibles, couleurs douces.
const STYLE = {
  version: 8,
  sources: {
    relief: {
      type: 'raster',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256,
      maxzoom: 18,
      attribution: 'Fond © Esri, HERE, Garmin, FAO, USGS · © les contributeurs OpenStreetMap',
    },
  },
  layers: [
    { id: 'bg', type: 'background', paint: { 'background-color': '#cfe3ee' } },
    { id: 'relief', type: 'raster', source: 'relief', paint: { 'raster-saturation': 0.3, 'raster-contrast': 0.08 } },
  ],
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
        ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21l1.5-12h3L15 21z"/><path d="M8 9h8M10 6h4v3h-4zM12 3v3"/></svg>'
        : '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>'}
    </span>
    <span class="gm-marker-label">${place.shortTitle}</span>`;
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    onSelect(place.id);
  });
  return el;
}

const MapView = forwardRef(function MapView({ places, selectedId, onSelect, padding, pois }, ref) {
  const box = useRef(null);
  const map = useRef(null);
  const markers = useRef({});
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useImperativeHandle(ref, () => ({
    flyTo(coords, zoom = 11.5) {
      map.current?.flyTo({ center: coords, zoom, padding: padding || undefined, speed: 1.2, essential: true });
    },
    fitPoints(points) {
      if (!map.current || !points.length) return;
      const b = new maplibregl.LngLatBounds(points[0], points[0]);
      points.forEach((c) => b.extend(c));
      const pad = padding ? { ...padding, right: (padding.right || 0) + 150 } : 60; // place pour les étiquettes à droite des points
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
      style: STYLE,
      bounds: FINISTERE_BOUNDS,
      fitBoundsOptions: { padding: 20 },
      maxBounds: MAX_BOUNDS,
      minZoom: 7,
      maxZoom: 17.5,
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
      const mk = new maplibregl.Marker({ element: markerEl(p, (id) => onSelectRef.current(id)), anchor: 'bottom' })
        .setLngLat(p.coords)
        .addTo(m);
      markers.current[p.id] = mk;
    });
    return () => m.remove();
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

  useEffect(() => {
    Object.entries(markers.current).forEach(([id, mk]) => {
      mk.getElement().classList.toggle('is-selected', id === selectedId);
    });
  }, [selectedId]);

  return <div ref={box} className="map" role="application" aria-label="Carte du Finistère" />;
});

export default MapView;
