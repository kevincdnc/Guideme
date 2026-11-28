// 10 essais d'ambiance de carte (jeu / quête / authentique), sans toucher à l'UI : seuls les calques
// de la carte et des décors posés sur la carte changent. Nécessite `npx vite preview --port 4173`.
//   node design/cartes/variantes.cjs  → design/cartes/variantes/*.png + planche.png
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'variantes');
fs.mkdirSync(OUT, { recursive: true });

const PHARES = [[-4.99722, 48.05028], [-5.12889, 48.45917], [-4.37278, 47.79833], [-4.805, 48.5233], [-4.567075, 48.638806], [-5.13386, 48.42223], [-5.02556, 48.43722], [-4.9117, 48.3117], [-4.77083, 48.33], [-4.8664, 48.0438], [-5.05667, 48.47444], [-4.79333, 48.06972], [-4.75639, 48.04056]];
const VISITES = { 'pointe-du-raz': [-4.741111, 48.040278], 'pointe-du-van': [-4.7149822, 48.064501], audierne: [-4.540556, 48.025], locronan: [-4.206, 48.0985], concarneau: [-3.916266, 47.871674], 'phare-eckmuhl': [-4.37278, 47.79833], douarnenez: [-4.329167, 48.092778] };

// Chaque variante : couleurs des calques + décors. Exécuté dans la page.
const VARIANTS = [
  { id: '01-guideme-brand', title: 'GuideMe brand', desc: 'Mer bleu profond saturé, terre crème, côte blanche épaisse, Finistère cerné de jaune GuideMe, voisins grisés.' },
  { id: '02-carte-au-tresor', title: 'Carte au trésor', desc: 'Parchemin, mer vert-de-gris, grain de papier, vignettage brun, rose des vents et cartouche.' },
  { id: '03-carte-marine', title: 'Carte marine', desc: 'Inspirée des cartes du SHOM : mer pâle, terre sable, trait de côte noir, quadrillage lat/long, rose des vents.' },
  { id: '04-nuit-des-phares', title: 'La nuit des phares', desc: 'Mode nuit bleu marine, chaque phare diffuse un halo jaune : la côte se lit par ses feux.' },
  { id: '05-brouillard', title: 'Brouillard d’exploration', desc: 'Façon jeu vidéo : la carte est couverte de brume, chaque lieu visité dégage un cercle autour de lui.' },
  { id: '06-jeu-mobile', title: 'Jeu mobile pastel', desc: 'Couleurs franches et douces, grosse bordure de plage autour des côtes, relief marqué, mer turquoise.' },
  { id: '07-relief', title: 'Relief sculpté', desc: 'Ombrage du relief poussé (ombres violettes, lumières chaudes), routes estompées : les vallées et les crêtes ressortent.' },
  { id: '08-noir-et-jaune', title: 'Noir & jaune', desc: 'Identité GuideMe radicale : mer noire, terre blanc cassé, Finistère cerné de jaune, vagues blanches.' },
  { id: '09-gwenn-ha-du', title: 'Gwenn ha du', desc: 'Authentique breton : terre blanche, mer bleu Cornouaille, côte noire, mouchetures d’hermine hors Finistère.' },
  { id: '10-carnet-de-voyage', title: 'Carnet de voyage', desc: 'Aquarelle sur papier : mer lavis bleu diffus, terre papier, bords flous, grain, titre manuscrit.' },
];

function apply(v, data) {
  const map = document.querySelector('.map');
  const m = map.__map;
  const has = (id) => !!m.getLayer(id);
  const P = (id, k, val) => { if (has(id)) try { m.setPaintProperty(id, k, val); } catch (e) {} };
  const L = (id, k, val) => { if (has(id)) try { m.setLayoutProperty(id, k, val); } catch (e) {} };
  const layers = m.getStyle().layers;
  const byPrefix = (pre, k, val) => layers.filter((l) => l.id.startsWith(pre)).forEach((l) => P(l.id, k, val));
  const roads = layers.filter((l) => /^(road|bridge)_/.test(l.id) && l.type === 'line');
  const labels = layers.filter((l) => l.type === 'symbol' && l.paint && 'text-color' in (l.paint || {}) || /^label_|water_name|waterway_line_label|highway-name/.test(l.id));
  const land = (c) => { P('background', 'background-color', c); };
  const sea = (c) => { P('water', 'fill-color', c); };
  const text = (c, halo, w = 2.5) => labels.forEach((l) => { P(l.id, 'text-color', c); P(l.id, 'text-halo-color', halo); P(l.id, 'text-halo-width', w); });
  const greens = (wood, grass, park, op = 0.9) => { P('landcover_wood', 'fill-color', wood); P('landcover_grass', 'fill-color', grass); P('park', 'fill-color', park); P('landcover_wood', 'fill-opacity', op); P('landcover_grass', 'fill-opacity', op); };
  const roadsColor = (c, casing, op = 1) => roads.forEach((l) => { P(l.id, 'line-color', /casing/.test(l.id) ? casing : c); P(l.id, 'line-opacity', op); });
  const deco = (html, css = '') => {
    const cc = m.getCanvasContainer();
    const d = document.createElement('div');
    d.className = 'gm-deco';
    d.innerHTML = `<style>.gm-deco{position:absolute;inset:0;pointer-events:none;z-index:1}${css}</style>${html}`;
    cc.insertBefore(d, m.getCanvas().nextSibling);
  };
  const decoTop = (html, css = '') => { // au-dessus des repères (cadres, cartouches) — posé sur .map
    const d = document.createElement('div');
    d.className = 'gm-deco-top';
    d.innerHTML = `<style>.gm-deco-top{position:absolute;inset:0;pointer-events:none;z-index:2}${css}</style>${html}`;
    map.appendChild(d);
  };
  const LEFT = 480; // colonne latérale
  const compass = (color = '#5b4423', size = 120, x = 'right:70px', y = 'bottom:60px', op = .85) => `<svg style="position:absolute;${x};${y};opacity:${op}" width="${size}" height="${size}" viewBox="-60 -60 120 120"><g fill="none" stroke="${color}" stroke-width="1.2"><circle r="52"/><circle r="46" stroke-dasharray="2 3"/><circle r="20"/></g>
    <g fill="${color}"><path d="M0-58L7-7 0 0-7-7z"/><path d="M0 58L7 7 0 0-7 7z" opacity=".55"/><path d="M58 0L7 7 0 0 7-7z" opacity=".55"/><path d="M-58 0L-7 7 0 0-7-7z" opacity=".55"/>
    <path d="M30-30L5 0 0 0 0-5z" opacity=".35"/><path d="M-30 30L-5 0 0 0 0 5z" opacity=".35"/><path d="M30 30L0 5 0 0 5 0z" opacity=".35"/><path d="M-30-30L0-5 0 0-5 0z" opacity=".35"/></g>
    <text y="-62" text-anchor="middle" font-family="Rubik,Inter,sans-serif" font-weight="700" font-size="13" fill="${color}">N</text></svg>`;
  const grain = (op = .35, blend = 'multiply') => `<svg style="position:absolute;left:0;top:0;width:100%;height:100%;mix-blend-mode:${blend};opacity:${op}"><filter id="gn"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .36  0 0 0 0 .22  0 0 0 1.1 -.25"/></filter><rect width="100%" height="100%" filter="url(#gn)"/></svg>`;
  const vignette = (c, s = 140) => `<div style="position:absolute;left:${LEFT}px;right:0;top:0;bottom:0;box-shadow:inset 0 0 ${s}px ${Math.round(s / 3)}px ${c}"></div>`;
  const cartouche = (title, sub, style) => `<div style="position:absolute;left:${LEFT + 40}px;bottom:46px;${style}"><div class="ct-t">${title}</div><div class="ct-s">${sub}</div></div>`;
  const addFill = (id, data, paint, before) => { m.addSource(id, { type: 'geojson', data }); m.addLayer({ id, type: 'fill', source: id, paint }, before); };
  const firstLabel = layers.find((l) => l.type === 'symbol')?.id;
  const circle = (c, r, n = 48) => { const pts = []; for (let i = 0; i <= n; i++) { const a = (i / n) * 2 * Math.PI; pts.push([c[0] + (r / Math.cos(c[1] * Math.PI / 180)) * Math.cos(a), c[1] + r * Math.sin(a)]); } return pts; };
  const canvasImg = (size, draw) => { const r = 2, c = document.createElement('canvas'); c.width = c.height = size * r; const x = c.getContext('2d'); x.scale(r, r); draw(x, size); return { width: c.width, height: c.height, data: x.getImageData(0, 0, c.width, c.height).data }; };

  switch (v) {
    case '01-guideme-brand':
      land('#FBF6E9'); sea('#2F5BEA'); P('water_shallow', 'line-color', '#5C82F2'); P('water_outline', 'line-color', '#ffffff'); P('water_outline', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, 1.6, 10, 3, 14, 5]);
      greens('#BFE3A0', '#DDEFC3', '#BFE3A0', .85); P('landuse_residential', 'fill-color', '#F3E6C8'); P('landcover_sand', 'fill-color', '#FFD873');
      P('hors-finistere', 'fill-color', '#1C2130'); P('hors-finistere', 'fill-opacity', .32); P('voile', 'fill-opacity', 0);
      P('finistere-limite', 'line-color', '#FFB900'); P('finistere-limite', 'line-dasharray', [1, 0]); P('finistere-limite', 'line-width', 3.5); P('finistere-halo', 'line-color', '#111111'); P('finistere-halo', 'line-width', 7);
      byPrefix('water_name', 'text-color', '#ffffff'); byPrefix('water_name', 'text-halo-color', 'rgba(20,40,140,.6)'); P('water_waves', 'fill-opacity', .45);
      roadsColor('#ffffff', '#E9DDBF');
      break;
    case '02-carte-au-tresor':
      land('#EAD7A8'); sea('#8FB3A8'); P('water_shallow', 'line-color', '#B9CFB8'); P('water_outline', 'line-color', '#5B4423'); P('water_outline', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, 1, 12, 2]);
      greens('#B9B67C', '#D5C88E', '#B9B67C', .7); P('landuse_residential', 'fill-color', '#D9BF8A'); P('landcover_sand', 'fill-color', '#F2DFA5'); P('building', 'fill-color', '#C9A971'); P('building', 'fill-outline-color', '#8B6A3E');
      P('hors-finistere', 'fill-color', '#6B4F2A'); P('hors-finistere', 'fill-opacity', .22); P('voile', 'fill-opacity', 0);
      P('finistere-limite', 'line-color', '#8B1E1E'); P('finistere-limite', 'line-dasharray', [2, 2]); P('finistere-halo', 'line-opacity', 0);
      P('hillshade', 'hillshade-shadow-color', '#7A5A30'); P('hillshade', 'hillshade-highlight-color', '#FFF3D0');
      text('#4A3218', 'rgba(240,225,185,.85)', 2); byPrefix('water_name', 'text-color', '#2F4F4A'); P('water_waves', 'fill-opacity', .35);
      roadsColor('#B5915A', '#B5915A', .55);
      deco(grain(.55) + vignette('rgba(90,60,25,.55)', 160));
      decoTop(compass('#5b4423', 130) + cartouche('Penn-ar-Bed', 'Terra incognita des pépites', ''), '.ct-t{font:700 34px Rubik,serif;color:#4A3218;letter-spacing:.04em;font-style:italic}.ct-s{font:500 14px Rubik;color:#6b4c25;letter-spacing:.2em;text-transform:uppercase;border-top:1.5px solid #6b4c25;padding-top:4px;margin-top:2px}');
      break;
    case '03-carte-marine': {
      land('#F6EBC9'); sea('#CFE6F2'); P('water_shallow', 'line-color', '#A9D0E8'); P('water_shallow', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, 6, 10, 18, 14, 40]);
      P('water_outline', 'line-color', '#1d1d1d'); P('water_outline', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, .8, 12, 1.6]);
      greens('#E3DDB2', '#EEE5BE', '#E3DDB2', .7); P('landuse_residential', 'fill-color', '#EFD9A6'); P('landcover_sand', 'fill-color', '#F3DA92');
      P('hors-finistere', 'fill-color', '#9b8f6a'); P('hors-finistere', 'fill-opacity', .18); P('voile', 'fill-opacity', 0);
      P('finistere-limite', 'line-color', '#C2185B'); P('finistere-limite', 'line-dasharray', [3, 2]); P('finistere-halo', 'line-opacity', 0);
      P('water_waves', 'fill-opacity', 0); text('#3a3a3a', 'rgba(255,255,255,.8)', 1.8); byPrefix('water_name', 'text-color', '#1E5A8A');
      roadsColor('#C9A26A', '#C9A26A', .6);
      const g = []; for (let x = -6; x <= -2; x += 0.25) g.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: [[x, 46.5], [x, 49.5]] } }); for (let y = 46.5; y <= 49.5; y += 0.1666) g.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: [[-6, y], [-2, y]] } });
      m.addSource('grat', { type: 'geojson', data: { type: 'FeatureCollection', features: g } });
      m.addLayer({ id: 'grat', type: 'line', source: 'grat', paint: { 'line-color': '#1E5A8A', 'line-opacity': .28, 'line-width': .8 } }, firstLabel);
      deco(grain(.18));
      decoTop(compass('#1E5A8A', 150, 'right:60px', 'top:110px', .8) + `<div style="position:absolute;left:${LEFT}px;right:0;top:0;bottom:0;border:14px solid transparent;outline:2px solid #1d1d1d;outline-offset:-14px;background:repeating-linear-gradient(90deg,#1d1d1d 0 30px,#fff 30px 60px) top/100% 6px no-repeat,repeating-linear-gradient(90deg,#1d1d1d 0 30px,#fff 30px 60px) bottom/100% 6px no-repeat,repeating-linear-gradient(0deg,#1d1d1d 0 30px,#fff 30px 60px) left/6px 100% no-repeat,repeating-linear-gradient(0deg,#1d1d1d 0 30px,#fff 30px 60px) right/6px 100% no-repeat"></div>`);
      break; }
    case '04-nuit-des-phares': {
      land('#1E2A47'); sea('#0B1430'); P('water_shallow', 'line-color', '#16244F'); P('water_outline', 'line-color', '#3B5BA8'); P('water_outline', 'line-width', 1.2);
      greens('#1F3550', '#22324F', '#1F3550', .8); P('landuse_residential', 'fill-color', '#2C3657'); P('landcover_sand', 'fill-color', '#3A3F55'); P('building', 'fill-color', '#36406A'); P('building', 'fill-outline-color', '#36406A');
      P('hors-finistere', 'fill-color', '#000000'); P('hors-finistere', 'fill-opacity', .4); P('voile', 'fill-opacity', 0);
      P('finistere-limite', 'line-color', '#FFB900'); P('finistere-limite', 'line-opacity', .6); P('finistere-halo', 'line-opacity', 0);
      P('hillshade', 'hillshade-shadow-color', '#050a18'); P('hillshade', 'hillshade-highlight-color', '#3A4F80');
      P('water_waves', 'fill-opacity', .12); text('#C9D3F0', 'rgba(10,16,40,.8)', 2); byPrefix('water_name', 'text-color', '#6F8BD6');
      roadsColor('#3A4670', '#2A3456', .8);
      m.addSource('feux', { type: 'geojson', data: { type: 'FeatureCollection', features: data.phares.map((c) => ({ type: 'Feature', geometry: { type: 'Point', coordinates: c } })) } });
      m.addLayer({ id: 'feux-halo', type: 'circle', source: 'feux', paint: { 'circle-radius': ['interpolate', ['exponential', 2], ['zoom'], 7, 26, 12, 260], 'circle-color': '#FFD54A', 'circle-opacity': .22, 'circle-blur': 1 } }, firstLabel);
      m.addLayer({ id: 'feux-coeur', type: 'circle', source: 'feux', paint: { 'circle-radius': ['interpolate', ['exponential', 2], ['zoom'], 7, 8, 12, 60], 'circle-color': '#FFE58A', 'circle-opacity': .45, 'circle-blur': 1 } }, firstLabel);
      deco(vignette('rgba(0,0,10,.6)', 180) + `<svg style="position:absolute;left:0;top:0;width:100%;height:100%;opacity:.5">${Array.from({ length: 70 }, (_, i) => `<circle cx="${(i * 197) % 1400}" cy="${(i * 131) % 820}" r="${i % 3 ? .7 : 1.2}" fill="#fff"/>`).join('')}</svg>`);
      break; }
    case '05-brouillard': {
      const fog = () => {
        document.querySelectorAll('.gm-fog').forEach((e) => e.remove());
        const pts = Object.values(data.visites).map((c) => { const a = m.project(c), b = m.project([c[0], c[1] + 0.08]); return [a.x, a.y, Math.abs(a.y - b.y)]; });
        const mask = pts.map(([x, y, r]) => `radial-gradient(circle at ${x}px ${y}px, transparent ${r * .55}px, #000 ${r * 1.05}px)`).join(',');
        const ring = pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r * .8}" fill="none" stroke="#FFB900" stroke-width="1.6" stroke-dasharray="4 5" opacity=".9"/>`).join('');
        const cc = m.getCanvasContainer();
        const d = document.createElement('div'); d.className = 'gm-fog';
        d.innerHTML = `<div style="position:absolute;inset:0;-webkit-mask-image:${mask};-webkit-mask-composite:source-in;mask-image:${mask};mask-composite:intersect">
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,#EEF2F8,#DCE4EF)"></div>
          <svg style="position:absolute;left:0;top:0;width:100%;height:100%"><filter id="cl"><feTurbulence type="fractalNoise" baseFrequency=".005" numOctaves="4" seed="4"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.4 -.35"/></filter><rect width="100%" height="100%" filter="url(#cl)"/></svg>
          <svg style="position:absolute;left:0;top:0;width:100%;height:100%;opacity:.25"><filter id="cl2"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .62  0 0 0 0 .75  0 0 0 1.2 -.4"/></filter><rect width="100%" height="100%" filter="url(#cl2)"/></svg></div>
          <svg style="position:absolute;left:0;top:0;width:100%;height:100%">${ring}</svg>`;
        d.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1';
        cc.insertBefore(d, m.getCanvas().nextSibling);
      };
      fog(); window.__redeco = fog;
      decoTop(`<div style="position:absolute;left:${LEFT + 30}px;top:84px;background:#111;color:#fff;font:600 13px Rubik,Inter;padding:9px 14px;border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,.25)">🧭 7 zones explorées · <b style="color:#FFB900">23 encore dans la brume</b></div>`);
      break; }
    case '06-jeu-mobile':
      land('#F4F1D8'); sea('#4CC3E6'); P('water_shallow', 'line-color', '#9BE3F3'); P('water_shallow', 'line-blur', 0); P('water_shallow', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, 5, 10, 14, 14, 30]);
      P('water_outline', 'line-color', '#FFF2C4'); P('water_outline', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, 2.5, 10, 5, 14, 9]);
      greens('#7FD67A', '#B4EB8C', '#7FD67A', 1); P('landuse_residential', 'fill-color', '#FFE2B8'); P('landcover_sand', 'fill-color', '#FFE38A'); P('building', 'fill-color', '#FFB4A8'); P('building', 'fill-outline-color', '#F08A7A');
      P('hillshade', 'hillshade-exaggeration', .75); P('hillshade', 'hillshade-shadow-color', '#3E8E5A'); P('hillshade', 'hillshade-highlight-color', '#FFFDE8');
      P('hors-finistere', 'fill-color', '#7FA8C9'); P('hors-finistere', 'fill-opacity', .35); P('voile', 'fill-opacity', 0);
      P('finistere-limite', 'line-color', '#ffffff'); P('finistere-limite', 'line-dasharray', [1, 0]); P('finistere-limite', 'line-width', 4); P('finistere-halo', 'line-color', '#2E7BD6'); P('finistere-halo', 'line-width', 9);
      P('water_waves', 'fill-opacity', .8); text('#2B3A55', '#ffffff', 3); byPrefix('water_name', 'text-color', '#ffffff'); byPrefix('water_name', 'text-halo-color', 'rgba(20,110,160,.55)');
      roadsColor('#ffffff', '#E8DDB5');
      break;
    case '07-relief':
      land('#F1EFE8'); sea('#9CC6E8'); P('water_outline', 'line-color', '#ffffff');
      greens('#DCE5CC', '#E7EBD9', '#DCE5CC', .7); P('landuse_residential', 'fill-color', '#ECE3D3');
      P('hillshade', 'hillshade-exaggeration', 1); P('hillshade', 'hillshade-shadow-color', '#4B3C7A'); P('hillshade', 'hillshade-highlight-color', '#FFE9B8'); P('hillshade', 'hillshade-accent-color', '#2D2350'); P('hillshade', 'hillshade-illumination-direction', 315);
      P('hors-finistere', 'fill-opacity', .1); P('voile', 'fill-opacity', 0); P('water_waves', 'fill-opacity', .3);
      roadsColor('#ffffff', '#ffffff', .35); text('#2A2440', 'rgba(255,255,255,.85)', 2);
      break;
    case '08-noir-et-jaune':
      land('#F7F3E8'); sea('#111111'); P('water_shallow', 'line-color', '#2A2A2A'); P('water_outline', 'line-color', '#FFB900'); P('water_outline', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, 1.2, 12, 2.5]);
      greens('#E4E0D2', '#ECE8DC', '#E4E0D2', .9); P('landuse_residential', 'fill-color', '#EFE8D6'); P('landcover_sand', 'fill-color', '#FFE08A'); P('building', 'fill-color', '#E2DACB');
      P('hillshade', 'hillshade-shadow-color', '#6b6455'); P('hors-finistere', 'fill-color', '#111111'); P('hors-finistere', 'fill-opacity', .5); P('voile', 'fill-opacity', 0);
      P('finistere-limite', 'line-color', '#FFB900'); P('finistere-limite', 'line-dasharray', [1, 0]); P('finistere-limite', 'line-width', 3); P('finistere-halo', 'line-color', '#111'); P('finistere-halo', 'line-width', 6);
      P('water_waves', 'fill-opacity', .35); text('#111111', '#F7F3E8', 2.5); byPrefix('water_name', 'text-color', '#FFB900'); byPrefix('water_name', 'text-halo-color', 'rgba(0,0,0,.6)');
      roadsColor('#ffffff', '#DAD2BE');
      break;
    case '09-gwenn-ha-du': {
      land('#FFFFFF'); sea('#0173BC'); P('water_shallow', 'line-color', '#3A95D0'); P('water_outline', 'line-color', '#111111'); P('water_outline', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, 1.4, 12, 2.6]);
      greens('#EDEDED', '#F4F4F4', '#EDEDED', .9); P('landuse_residential', 'fill-color', '#F1F1F1'); P('landcover_sand', 'fill-color', '#F5EBD0'); P('building', 'fill-color', '#DADADA');
      P('hillshade', 'hillshade-shadow-color', '#5a5a5a'); P('hillshade', 'hillshade-highlight-color', '#ffffff'); P('voile', 'fill-opacity', 0);
      m.addImage('hermines', canvasImg(34, (x, s) => { x.fillStyle = '#ffffff'; x.fillRect(0, 0, s, s); x.fillStyle = '#111'; const h = (cx, cy, k) => { x.beginPath(); x.moveTo(cx, cy - 6 * k); x.lineTo(cx + 3 * k, cy + 4 * k); x.lineTo(cx, cy + 2.5 * k); x.lineTo(cx - 3 * k, cy + 4 * k); x.closePath(); x.fill(); [-2.2, 0, 2.2].forEach((d) => { x.beginPath(); x.arc(cx + d * k, cy - 6.5 * k - (d ? 0 : 1.2 * k), 1 * k, 0, 7); x.fill(); }); }; h(9, 10, .9); h(26, 27, .9); }), { pixelRatio: 2 });
      P('hors-finistere', 'fill-pattern', 'hermines'); P('hors-finistere', 'fill-opacity', .55);
      P('finistere-limite', 'line-color', '#111111'); P('finistere-limite', 'line-dasharray', [1, 0]); P('finistere-limite', 'line-width', 3); P('finistere-halo', 'line-color', '#ffffff');
      P('water_waves', 'fill-opacity', .5); text('#111111', '#ffffff', 2.5); byPrefix('water_name', 'text-color', '#ffffff'); byPrefix('water_name', 'text-halo-color', 'rgba(0,40,90,.6)');
      roadsColor('#D6D6D6', '#D6D6D6', .7);
      decoTop(`<svg style="position:absolute;right:26px;bottom:44px;filter:drop-shadow(0 4px 10px rgba(0,0,0,.25))" width="108" height="72" viewBox="0 0 900 600">${Array.from({ length: 9 }, (_, i) => `<rect y="${i * 66.67}" width="900" height="66.67" fill="${i % 2 ? '#fff' : '#111'}"/>`).join('')}<rect width="400" height="333.3" fill="#fff"/>${[[70, 50], [200, 50], [330, 50], [135, 150], [265, 150], [70, 250], [200, 250], [330, 250]].map(([x, y]) => `<g transform="translate(${x} ${y}) scale(1.6)"><path d="M0-22L10 16 0 8-10 16z" fill="#111"/><circle cy="-26" r="4" fill="#111"/><circle cx="-8" cy="-22" r="4" fill="#111"/><circle cx="8" cy="-22" r="4" fill="#111"/></g>`).join('')}</svg>`);
      break; }
    case '10-carnet-de-voyage':
      land('#F8F2E2'); sea('#A9CBE0'); P('water_shallow', 'line-color', '#7FAED0'); P('water_shallow', 'line-blur', 18); P('water_shallow', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, 10, 10, 26, 14, 60]); P('water_shallow', 'line-opacity', .55);
      P('water_outline', 'line-color', '#5E7F96'); P('water_outline', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, .7, 12, 1.4]); P('water_outline', 'line-blur', .6);
      greens('#CFDDB0', '#E2E8C6', '#CFDDB0', .55); P('landuse_residential', 'fill-color', '#EFD9B8'); P('landcover_sand', 'fill-color', '#F4E1AE'); P('building', 'fill-color', '#E6CFAE');
      P('hors-finistere', 'fill-color', '#C9B997'); P('hors-finistere', 'fill-opacity', .3); P('voile', 'fill-opacity', 0);
      P('finistere-limite', 'line-color', '#C0392B'); P('finistere-limite', 'line-dasharray', [.6, 2]); P('finistere-limite', 'line-width', 2.4); P('finistere-halo', 'line-opacity', 0);
      P('water_waves', 'fill-opacity', 0); text('#4B4034', 'rgba(248,242,226,.8)', 1.8); byPrefix('water_name', 'text-color', '#3F6E8F');
      roadsColor('#C7A77C', '#C7A77C', .45);
      deco(grain(.6) + `<svg style="position:absolute;left:0;top:0;width:100%;height:100%;opacity:.35;mix-blend-mode:multiply"><filter id="wc"><feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="3" seed="9"/><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .7  0 0 0 0 .85  0 0 0 .9 -.2"/></filter><rect width="100%" height="100%" filter="url(#wc)"/></svg>` + vignette('rgba(120,95,60,.35)', 120));
      decoTop(`<div style="position:absolute;left:${LEFT + 40}px;top:86px;transform:rotate(-3deg);font:700 italic 30px Rubik,serif;color:#4B4034">Mon tour du Finistère</div><div style="position:absolute;left:${LEFT + 46}px;top:128px;transform:rotate(-3deg);font:500 13px Rubik;color:#8a7356;letter-spacing:.2em">CARNET · ÉTÉ 2026</div><div style="position:absolute;right:50px;top:96px;width:110px;height:34px;background:rgba(255,236,170,.75);transform:rotate(6deg);box-shadow:0 2px 6px rgba(0,0,0,.1)"></div>`);
      break;
  }
}

(async () => {
  const b = await chromium.launch();
  const shots = [];
  for (const v of VARIANTS) {
    const p = await b.newPage({ viewport: { width: 1400, height: 820 }, deviceScaleFactor: 2 });
    const visited = v.id === '05-brouillard' ? Object.keys(VISITES) : ['pointe-du-van', 'phare-vieille', 'audierne', 'locronan'];
    await p.addInitScript((visited) => { localStorage.setItem('guideme:visited', JSON.stringify(visited)); localStorage.setItem('guideme:started', '1'); localStorage.setItem('guideme:favorites', JSON.stringify(['baie-des-trepasses', 'phare-ar-men'])); localStorage.setItem('guideme:markers-mode', 'large'); }, visited);
    await p.goto('http://localhost:4173/Guideme/'); await p.waitForTimeout(5000);
    await p.evaluate(apply.toString().replace(/^function apply/, '(function apply') + `)(${JSON.stringify(v.id)}, ${JSON.stringify({ phares: PHARES, visites: VISITES })})`);
    await p.waitForTimeout(2200);
    const f = path.join(OUT, `${v.id}.png`);
    await p.screenshot({ path: f, clip: { x: 480, y: 0, width: 920, height: 820 } });
    // zoom local sur le Cap Sizun
    await p.evaluate(() => { const m = document.querySelector('.map').__map; m.jumpTo({ center: [-4.55, 48.06], zoom: 10.3, padding: { left: 480, top: 0, right: 0, bottom: 0 } }); });
    await p.waitForTimeout(2500);
    await p.evaluate(() => window.__redeco && window.__redeco()); await p.waitForTimeout(300);
    const f2 = path.join(OUT, `${v.id}-zoom.png`);
    await p.screenshot({ path: f2, clip: { x: 480, y: 0, width: 920, height: 820 } });
    shots.push(v);
    await p.close();
    console.log(v.id);
  }
  const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:28px;font-family:Inter,sans-serif;background:#f6f5f0;color:#111;width:1880px}
  .v{background:#fff;border-radius:16px;padding:18px;margin-bottom:22px}.v h2{margin:0 0 4px;font-size:22px}.v p{margin:0 0 12px;color:#555;font-size:14px}.v div{display:flex;gap:14px}.v img{width:915px;border-radius:10px}</style>
  ${shots.map((v, i) => `<section class="v"><h2>${i + 1}. ${v.title}</h2><p>${v.desc}</p><div><img src="variantes/${v.id}.png"><img src="variantes/${v.id}-zoom.png"></div></section>`).join('')}`;
  fs.writeFileSync(path.join(__dirname, 'planche.html'), html);
  console.log('ok');
  await b.close();
})();
