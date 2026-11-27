import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FINISTERE_BOUNDS } from '../data/places.js';

import MAP_STYLE from '../data/mapFonts.js';
import { protectionBadgesHtml } from './Protections.jsx';
import FINISTERE_MASK from '../data/finistere.json';

// Carte vectorielle (tuiles OpenFreeMap, style construit par scripts/build-map-style.mjs) :
// nette à tous les zooms, avec relief ombré. L'attribution complète est déclarée dans le style.
MAP_STYLE.sources.openmaptiles.attribution = '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> · © <a href="https://www.openmaptiles.org/" target="_blank">OpenMapTiles</a> · © <a href="https://www.openstreetmap.org/copyright" target="_blank">les contributeurs OpenStreetMap</a>';

// Pictogrammes des repères, selon le type de lieu
const PIN_ICONS = {
  // Phare : lanterne et dôme, galerie, tour effilée à bande, faisceaux
  lighthouse: '<path d="M10 4.5h4v3.5h-4z"/><path d="M10.5 4.5Q12 2.2 13.5 4.5"/><path d="M8 9h8"/><path d="M9.3 9.5L8.4 20h7.2l-.9-10.5"/><path d="M8.9 14.5h6.2"/><path d="M6 20.5h12"/><path d="M16.5 5.2l3.5-1.4M16.5 7.3l3.5 1.4M7.5 5.2L4 3.8M7.5 7.3L4 8.7"/>',
  beach: '<path d="M3 18c2 0 2-1.5 4.5-1.5S9.5 18 12 18s2.5-1.5 4.5-1.5S19 18 21 18"/><path d="M12 14V5"/><path d="M5 9a7 7 0 0114 0z"/>',
  cliff: '<path d="M3 20h18"/><path d="M4 20l4-11 3 4 3-8 6 15"/>',
  port: '<circle cx="12" cy="5" r="2"/><path d="M12 7v13"/><path d="M5 13a7 7 0 0014 0"/><path d="M8 10h8"/>',
  church: '<path d="M12 2v4M10 4h4"/><path d="M7 21V11l5-4 5 4v10"/><path d="M4 21h16"/><path d="M10 21v-4a2 2 0 014 0v4"/>',
  fire: '<path d="M12 21c4 0 6-2.5 6-6 0-4-3-6-4-9-1 2-2 3-3 3 0-2 0-4-1-6-2 3-4 6-4 12 0 3.5 2 6 6 6z"/>',
};

// Couleur du badge selon le type de lieu
const PIN_COLORS = { lighthouse: '#ff5a36', beach: '#ffb020', cliff: '#ec4899', church: '#8b5cf6', port: '#2f80ff', fire: '#ff7a1a' };

// Motifs dessinés à la volée (pas de fichier image) : petites vagues sur la mer, arbres sur les forêts.
function patternImage(draw, size) {
  const r = 2; // net sur écrans haute densité
  const c = document.createElement('canvas');
  c.width = c.height = size * r;
  const ctx = c.getContext('2d');
  ctx.scale(r, r);
  draw(ctx, size);
  return { width: c.width, height: c.height, data: ctx.getImageData(0, 0, c.width, c.height).data };
}
const drawWaves = (ctx, n) => {
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  ctx.lineWidth = 1.6;
  ctx.lineCap = 'round';
  const wave = (x, y) => { ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 4, y - 4, x + 8, y); ctx.quadraticCurveTo(x + 12, y + 4, x + 16, y); ctx.stroke(); };
  wave(10, 18); wave(n / 2 + 14, n / 2 + 24);
};
const drawTrees = (ctx) => {
  const tree = (x, y, s) => {
    ctx.fillStyle = 'rgba(70,120,50,0.25)'; ctx.beginPath(); ctx.ellipse(x + 1.5, y + s * 0.9, s * 0.8, s * 0.35, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#6cbf55'; ctx.beginPath(); ctx.arc(x, y, s, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#8fd673'; ctx.beginPath(); ctx.arc(x - s * 0.3, y - s * 0.3, s * 0.5, 0, Math.PI * 2); ctx.fill();
  };
  tree(9, 10, 5); tree(28, 22, 6); tree(12, 32, 4.5);
};

// Zoom arrière maximal : le Finistère et la Bretagne jusqu'à Saint-Malo et Redon environ
// (un peu plus haut et plus bas sur mobile, écran en hauteur)
const MAX_BOUNDS = typeof window !== 'undefined' && window.innerWidth < 900
  ? [[-6.4, 46.6], [-1.7, 49.6]]
  : [[-9.5, 47.0], [-1.7, 49.3]]; // à l'ouest, de la marge pour la fiche posée sur la carte

// Précharge en arrière-plan les tuiles du Finistère aux petits zooms (mises en cache par
// l'app hors ligne), pour que le zoom soit immédiat. Désactivé en mode « économie de données ».
async function prefetchTiles() {
  try {
    if (navigator.connection?.saveData) return;
    const tj = await (await fetch(MAP_STYLE.sources.openmaptiles.url)).json();
    const tpl = tj.tiles[0];
    const [[w, so], [e, n]] = FINISTERE_BOUNDS;
    const urls = [];
    for (let z = 7; z <= 10; z++) {
      const x = (lon) => Math.floor(((lon + 180) / 360) * 2 ** z);
      const y = (lat) => Math.floor(((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * 2 ** z);
      for (let tx = x(w); tx <= x(e); tx++) for (let ty = y(n); ty <= y(so); ty++) urls.push(tpl.replace('{z}', z).replace('{x}', tx).replace('{y}', ty));
    }
    for (let i = 0; i < urls.length; i += 6) await Promise.all(urls.slice(i, i + 6).map((u) => fetch(u).catch(() => {})));
  } catch (e) { /* préchargement facultatif */ }
}

// Épingle en goutte (un seul tracé SVG : pas de pièce rapportée), pictogramme blanc,
// petite coche quand le lieu est visité, pastille simple vue de loin.
// Repère arrondi et « gras » : grosse tête ronde, pointe courte
const PIN_PATH = 'M22 53C22 53 3 37.5 3 22A19 19 0 1 1 41 22C41 37.5 22 53 22 53Z';
const LOCK = '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>';
const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
// Vignette légère (120 px) pour l'info-bulle
const thumbOf = (p) => { const src = p.thumb || p.hero?.src; return src ? src.replace(/\/(\d+)px-/, '/500px-') : ''; };

const STAR_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.9l-5.25 2.7 1-5.8L3.5 9.7l5.9-.9z"/></svg>';
const FLAG_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21V4" fill="none"/><path d="M6 4.5c2.6-1.4 5-.2 7 .8s4.2 1.6 6-.3v8.4c-1.8 1.9-4 1.3-6 .3s-4.4-2.2-7-.8"/></svg>';

function markerEl(place, onSelect, onToggleVisited, onToggleWanted, onOpenPlace) {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = `gm-marker ${place.available ? 'is-available' : 'is-soon'}`;
  el.dataset.color = place.available ? PIN_COLORS[place.icon] || '#ff5a36' : '#9aa3b2';
  el.style.setProperty('--c', el.dataset.color);
  el.setAttribute('aria-label', `${place.shortTitle}${place.available ? '' : ' (bientôt disponible)'}`);
  const icon = place.available ? PIN_ICONS[place.icon] || PIN_ICONS.lighthouse : LOCK;
  el.innerHTML = `<span class="gm-marker-body">
    <span class="gm-marker-label">
      ${place.available && thumbOf(place) ? '<span class="gm-pop-img" aria-hidden="true"></span>' : ''}
      <span class="gm-pop-main">
        <span class="gm-pop-head"><span class="gm-pop-name"><i class="gm-label-check" aria-hidden="true">${CHECK_SVG}</i>${esc(place.shortTitle)}</span>${place.available ? `<span class="gm-pop-badges">${protectionBadgesHtml(place)}</span>` : ''}</span>
        ${place.available ? `<span class="gm-pop-commune">${esc(place.commune.split(' · ')[0].split(' & ')[0])}</span>` : ''}
        ${place.available ? `<span class="gm-pop-actions"><span class="gm-pop-flag gm-pop-flag--want" role="button" tabindex="0" aria-label="Ajouter à ma to-do list">${STAR_SVG}<em class="gm-off">To-do</em><em class="gm-on">Dans ma to-do</em></span><span class="gm-pop-flag gm-pop-flag--done" role="button" tabindex="0" aria-label="Je l'ai déjà visité">${CHECK_SVG}<em class="gm-off">Visité</em><em class="gm-on">Visité</em></span></span><span class="gm-pop-open" role="button" tabindex="0">Voir la fiche <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></span>` : ''}
      </span>
    </span>
    <span class="gm-pin">
      <svg class="gm-pin-shape" viewBox="0 0 44 56" aria-hidden="true">
        <path d="${PIN_PATH}" transform="translate(0 2.5)" fill="rgba(0,0,0,.22)"/>
        <path d="${PIN_PATH}" fill="var(--c)" stroke="#fff" stroke-width="3.6" stroke-linejoin="round"/>
        <path d="M22 53C22 53 10.5 41.5 6.4 31.5H37.6C33.5 41.5 22 53 22 53Z" fill="rgba(0,0,0,.14)"/>
        <circle cx="22" cy="22" r="12.6" fill="rgba(0,0,0,.16)"/>
        <circle cx="22" cy="22" r="12.6" fill="none" stroke="rgba(255,255,255,.38)" stroke-width="1.3"/>
        <path d="M9.6 16.5A13.5 13.5 0 0 1 18 8.6" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2.2" stroke-linecap="round"/>
      </svg>
      <svg class="gm-pin-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>
      <span class="gm-want" aria-hidden="true">${STAR_SVG}</span>
      <span class="gm-check" aria-hidden="true">${CHECK_SVG}</span>
    </span>
    <span class="gm-dot" aria-hidden="true"><svg class="gm-dot-icon" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icon}</svg><span class="gm-dot-check">${CHECK_SVG}</span></span>
    <span class="gm-marker-ground"></span>
  </span>`;
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    onSelect(place.id);
  });
  // Info-bulle : la photo ne se charge qu'au premier survol
  const img = el.querySelector('.gm-pop-img');
  if (img) el.addEventListener('mouseenter', () => { if (!img.style.backgroundImage) img.style.backgroundImage = `url("${thumbOf(place)}")`; });
  // Info-bulle sous le repère quand il n'y a pas la place au-dessus
  el.addEventListener('mouseenter', () => {
    // Bas du repère (point d'ancrage) : ne bouge pas quand l'info-bulle s'ouvre
    const y = el.getBoundingClientRect().bottom - (el.closest('.map')?.getBoundingClientRect().top || 0);
    el.classList.toggle('pop-below', y < 360);
  });
  const bind = (sel, fn) => {
    const node = el.querySelector(sel);
    if (!node) return;
    const go = (e) => { e.stopPropagation(); e.preventDefault(); fn?.(place.id); };
    node.addEventListener('click', go);
    node.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') go(e); });
  };
  bind('.gm-pop-flag--done', onToggleVisited);
  bind('.gm-pop-flag--want', onToggleWanted);
  bind('.gm-pop-open', onOpenPlace);
  return el;
}

// Les styles d'info-bulle sont écrits pour :hover ; on les recopie pour la classe .is-pop (ouverte par programme)
let popCssDone = false;
function clonePopCss() {
  if (popCssDone || typeof document === 'undefined') return;
  popCssDone = true;
  const has = /\.gm-marker[\w.-]*:hover/;
  const rep = /(\.gm-marker[\w.-]*):hover/g;
  const walk = (list) => {
    for (let i = list.cssRules.length - 1; i >= 0; i -= 1) {
      const r = list.cssRules[i];
      if (r.cssRules && !r.selectorText) { walk(r); continue; }
      if (!r.selectorText || !has.test(r.selectorText)) continue;
      const sel = r.selectorText.split(',').filter((x) => has.test(x)).map((x) => x.replace(rep, '$1.is-pop')).join(',');
      try { list.insertRule(`${sel}{${r.style.cssText}}`, i + 1); } catch { /* sélecteur non pris en charge */ }
    }
  };
  for (const sh of document.styleSheets) { try { walk(sh); } catch { /* feuille externe */ } }
}

const MapView = forwardRef(function MapView({ markerSize = 'large', onZoomChange, places, selectedId, onSelect, padding, pois, visibleIds, visitedIds, onToggleVisited, wantedIds, onToggleWanted, onOpenPlace }, ref) {
  const box = useRef(null);
  const onZoomRef = useRef(onZoomChange);
  onZoomRef.current = onZoomChange;
  const map = useRef(null);
  const markers = useRef({});
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const onToggleRef = useRef(onToggleVisited);
  onToggleRef.current = onToggleVisited;
  const onWantRef = useRef(onToggleWanted);
  onWantRef.current = onToggleWanted;
  const onOpenRef = useRef(onOpenPlace);
  onOpenRef.current = onOpenPlace;

  useImperativeHandle(ref, () => ({
    flyTo(coords, zoom = 11.5) {
      map.current?.flyTo({ center: coords, zoom, padding: padding || undefined, speed: 1.4, essential: true });
    },
    fitPoints(points) {
      if (!map.current || !points.length) return;
      const b = new maplibregl.LngLatBounds(points[0], points[0]);
      points.forEach((c) => b.extend(c));
      const pad = padding ? { ...padding, left: (padding.left || 0) + 60, right: (padding.right || 0) + 150, top: (padding.top || 0) + 40 } : 60; // place pour les étiquettes à droite des points
      map.current.fitBounds(b, { padding: pad, maxZoom: 13, duration: 1000 });
    },
    zoomOutMax() {
      const m = map.current;
      if (!m) return;
      const h = m.__home || { center: m.getCenter(), zoom: m.getZoom() };
      m.flyTo({ center: h.center, zoom: m.getMinZoom(), duration: 900 });
    },
    zoomBy(d) {
      map.current?.easeTo({ zoom: map.current.getZoom() + d, duration: 300 });
    },
    fitFinistere() {
      map.current?.fitBounds(FINISTERE_BOUNDS, { padding: padding || 24, duration: 900 });
    },
    locate() {
      if (!navigator.geolocation) return;
      watchMe(true);
    },
  }));

  // Position de l'utilisateur : suivie en continu dès qu'il a autorisé la géolocalisation,
  // et le point reste affiché en permanence sur la carte.
  const watchRef = useRef(null);
  const flyNext = useRef(false);
  function placeMe(c) {
    const m = map.current;
    if (!m) return;
    if (!m.__me) {
      const el = document.createElement('div');
      el.className = 'gm-me';
      m.__me = new maplibregl.Marker({ element: el }).setLngLat(c).addTo(m);
    } else m.__me.setLngLat(c);
  }
  function watchMe(fly) {
    if (!navigator.geolocation) return;
    if (fly) flyNext.current = true;
    if (watchRef.current != null) {
      if (fly && map.current?.__me) { map.current.flyTo({ center: map.current.__me.getLngLat(), zoom: 12, padding: padding || undefined }); flyNext.current = false; }
      return;
    }
    watchRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const c = [pos.coords.longitude, pos.coords.latitude];
        placeMe(c);
        if (flyNext.current && map.current) { map.current.flyTo({ center: c, zoom: 12, padding: padding || undefined }); flyNext.current = false; }
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 15000, timeout: 20000 },
    );
  }
  useEffect(() => {
    navigator.permissions?.query({ name: 'geolocation' }).then((p) => { if (p.state === 'granted') watchMe(false); }).catch(() => {});
    return () => { if (watchRef.current != null) navigator.geolocation.clearWatch(watchRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { clonePopCss(); }, []);

  useEffect(() => {
    const m = new maplibregl.Map({
      container: box.current,
      style: MAP_STYLE,
      bounds: FINISTERE_BOUNDS,
      // Vue par défaut : tout le Finistère, centré dans la partie visible (à droite de la colonne sur ordinateur), cadré serré
      fitBoundsOptions: { padding: window.innerWidth >= 900 ? { top: 16, bottom: 16, left: 480 + 16, right: 16 } : { top: 80, bottom: 170, left: 12, right: 12 } },
      maxBounds: MAX_BOUNDS,
      minZoom: 6,
      maxZoom: 17,
      maxPitch: 0, // carte 2D
      fadeDuration: 0, // pas de fondu des tuiles : moins de travail pendant le zoom
      refreshExpiredTiles: false,
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
    // Crédits de la carte : toujours repliés au départ (bouton « i » discret)
    const foldAttrib = () => {
      const a = box.current?.querySelector('.maplibregl-ctrl-attrib');
      if (a) { a.classList.remove('maplibregl-compact-show'); a.removeAttribute('open'); }
    };
    m.once('load', foldAttrib);
    m.once('idle', foldAttrib);
    m.addControl(new maplibregl.ScaleControl({ unit: 'metric', maxWidth: 90 }), 'bottom-left');
    m.on('click', () => onSelectRef.current(null));
    // Trois paliers, comme les cartes de randonnée ou de voyage :
    //  · vue d'ensemble : un point par lieu, tous de la même taille (vert si visité) ;
    //  · zoom local : repères avec pictogramme (coche si visité), sans nom ;
    //  · zoom rapproché : repères + nom. Le survol ou la sélection montrent toujours le nom.
    // Sur petit écran, les repères arrivent un demi-niveau plus tard (moins de place).
    const onZoom = () => {
      const z = m.getZoom();
      const off = window.innerWidth < 900 ? 0.5 : 0;
      const c = box.current?.classList;
      if (!c) return;
      c.toggle('z-dots', z < 9.6 + off);
      c.toggle('z-pins', z >= 9.6 + off && z < 11.4 + off);
      c.toggle('z-labels', z >= 11.4 + off);
      // Niveau de zoom pour l'indicateur (une mise à jour par image au plus)
      if (m.__home) box.current.__z0 = m.__home.zoom; // 100 % = vue par défaut
      if (!box.current.__raf) box.current.__raf = requestAnimationFrame(() => { box.current.__raf = 0; const zz = m.getZoom(); onZoomRef.current?.({ z: zz, z0: box.current.__z0 ?? zz }); });
      // Anciennes classes (styles existants)
      c.toggle('z-far', z < 9.6 + off);
      c.toggle('z-mid', z >= 9.6 + off && z < 11.4 + off);
    };
    m.on('zoom', onZoom);
    m.once('load', () => {
      // Vue par défaut = 100 % ; on ne peut pas dézoomer en dessous de 70 %
      m.__home = { center: m.getCenter(), zoom: m.getZoom() };
      m.setMinZoom(m.getZoom() + Math.log2(0.7));
      onZoom();
      m.addImage('gm-waves', patternImage(drawWaves, 88), { pixelRatio: 2 });
      m.addImage('gm-trees', patternImage(drawTrees, 40), { pixelRatio: 2 });
      m.addLayer({ id: 'water_waves', type: 'fill', source: 'openmaptiles', 'source-layer': 'water', minzoom: 8,
        paint: { 'fill-pattern': 'gm-waves', 'fill-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0, 9.5, 0.9] } }, 'water_shallow');
      m.addLayer({ id: 'wood_trees', type: 'fill', source: 'openmaptiles', 'source-layer': 'landcover', minzoom: 10.5,
        filter: ['==', ['get', 'class'], 'wood'],
        paint: { 'fill-pattern': 'gm-trees', 'fill-opacity': ['interpolate', ['linear'], ['zoom'], 10.5, 0, 12, 1] } }, 'hillshade');
      // Le Finistère en avant : le reste est grisé, la limite du département est dessinée
      m.addSource('finistere', { type: 'geojson', data: FINISTERE_MASK, tolerance: 0.6 });
      // Tous ces calques passent SOUS les noms de lieux : les textes restent nets et entiers
      const firstLabel = m.getStyle().layers.find((l) => l.type === 'symbol')?.id;
      // Voile blanc léger sur le fond de carte : les repères ressortent mieux
      m.addSource('voile', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [[[-12, 44], [4, 44], [4, 52], [-12, 52], [-12, 44]]] } } });
      m.addLayer({ id: 'voile', type: 'fill', source: 'voile', paint: { 'fill-color': '#ffffff', 'fill-opacity': 0.22 } }, firstLabel);
      m.addLayer({ id: 'hors-finistere', type: 'fill', source: 'finistere', filter: ['==', ['get', 'role'], 'voisins'],
        paint: { 'fill-color': '#111111', 'fill-opacity': 0.14 } }, firstLabel); // hors Finistère : léger voile sombre
      m.addLayer({ id: 'finistere-halo', type: 'line', source: 'finistere', filter: ['==', ['get', 'role'], 'limite'],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#ffffff', 'line-width': ['interpolate', ['linear'], ['zoom'], 7, 4, 12, 8] } }, firstLabel);
      m.addLayer({ id: 'finistere-limite', type: 'line', source: 'finistere', filter: ['==', ['get', 'role'], 'limite'],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#7b6cf6', 'line-width': ['interpolate', ['linear'], ['zoom'], 7, 2, 12, 3.5], 'line-dasharray': [1.5, 1.6] } }, firstLabel);
      // Préchargement après l'affichage initial
      m.once('idle', () => (window.requestIdleCallback || setTimeout)(prefetchTiles));
      // Attribution repliée par défaut (toujours accessible par le bouton « i »)
      box.current?.querySelector('.maplibregl-ctrl-attrib')?.classList.remove('maplibregl-compact-show');
    });
    map.current = m;
    box.current.__map = m; // accès pour les tests

    places.forEach((p) => {
      const mk = new maplibregl.Marker({ element: markerEl(p, (id) => onSelectRef.current(id, true), (id) => onToggleRef.current?.(id), (id) => onWantRef.current?.(id), (id) => onOpenRef.current?.(id)), anchor: 'bottom' })
        .setLngLat(p.coords)
        .addTo(m);
      markers.current[p.id] = mk;
    });
    onZoom();
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

  // Lieux visités : épingle verte et petite coche
  useEffect(() => {
    Object.entries(markers.current).forEach(([id, mk]) => {
      const el = mk.getElement();
      const v = !!visitedIds?.includes(id);
      el.classList.toggle('is-visited', v);
      el.style.setProperty('--c', v ? '#16a34a' : el.dataset.color);
    });
  }, [visitedIds?.join()]); // eslint-disable-line react-hooks/exhaustive-deps

  // « Je veux y aller » : petit drapeau orange sur le repère
  useEffect(() => {
    Object.entries(markers.current).forEach(([id, mk]) => mk.getElement().classList.toggle('is-wanted', !!wantedIds?.includes(id)));
  }, [wantedIds?.join()]); // eslint-disable-line react-hooks/exhaustive-deps

  // Repères masqués par le filtre de catégorie
  useEffect(() => {
    Object.entries(markers.current).forEach(([id, mk]) => {
      mk.getElement().classList.toggle('is-hidden', !!visibleIds && !visibleIds.includes(id));
    });
  }, [visibleIds?.join()]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    Object.entries(markers.current).forEach(([id, mk]) => {
      mk.getElement().classList.toggle('is-selected', id === selectedId);
      mk.getElement().classList.remove('is-pop');
    });
    // Sélection (clic sur une mini-carte ou un repère) : l'info-bulle s'ouvre, une fois la carte arrivée
    const el = selectedId && markers.current[selectedId]?.getElement();
    if (!el || !el.classList.contains('is-available')) return undefined;
    const t = setTimeout(() => {
      el.dispatchEvent(new Event('mouseenter')); // charge la photo et choisit dessus / dessous
      el.classList.add('is-pop');
    }, 650);
    return () => clearTimeout(t);
  }, [selectedId]);

  // Une autre info-bulle survolée, ou un clic sur le fond de carte : on referme celle de la sélection
  useEffect(() => {
    const node = box.current;
    if (!node) return undefined;
    const close = (e) => {
      const m = e.target.closest?.('.gm-marker');
      if (e.type === 'mouseover' && (!m || m.classList.contains('is-pop'))) return;
      node.querySelectorAll('.gm-marker.is-pop').forEach((x) => x.classList.remove('is-pop'));
    };
    node.addEventListener('mouseover', close);
    node.addEventListener('pointerdown', close);
    return () => { node.removeEventListener('mouseover', close); node.removeEventListener('pointerdown', close); };
  }, []);

  // Taille des repères choisie par l'utilisateur : petit (point), moyen (point avec pictogramme), gros (repère)
  useEffect(() => {
    const c = box.current?.classList;
    if (!c) return;
    ['small', 'medium', 'large'].forEach((s) => c.toggle(`m-${s}`, s === markerSize));
  }, [markerSize]);

  return <div ref={box} className="map" role="application" aria-label="Carte du Finistère" />;
});

export default MapView;
