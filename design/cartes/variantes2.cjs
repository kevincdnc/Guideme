// Série 2 : 10 cartes « jeu » (3 ambiances retenues peaufinées, noir & jaune refait, 6 mini-jeux).
// Seules la carte et des décors posés dessus changent. Nécessite `npx vite preview --port 4173`.
//   node design/cartes/variantes2.cjs  → design/cartes/variantes2/*.png + planche2.html
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'variantes2');
fs.mkdirSync(OUT, { recursive: true });
const PLACES = JSON.parse(fs.readFileSync(path.join(__dirname, 'places.json'), 'utf8'));
const VISITED = ['pointe-du-raz', 'pointe-du-van', 'phare-vieille', 'audierne', 'locronan', 'douarnenez', 'phare-eckmuhl'];

const VARIANTS = [
  { id: '01-nuit-des-phares', title: 'La nuit des phares (filtre « Phare »)', desc: 'S’active quand on choisit le filtre Phare : la carte passe de nuit, chaque phare balaie la mer de ses faisceaux, ceux déjà visités brillent plus fort.', tag: 'Phare', zoom: [[-4.85, 48.30], 9.4] },
  { id: '02-carte-illustree', title: 'Carte illustrée façon BD d’aventure', desc: 'Le pastel « jeu mobile » poussé vers l’album illustré : contours encrés, forêts dessinées, mer à vaguelettes, bannière, bateau et serpent de mer.', zoom: [[-4.4, 48.12], 10] },
  { id: '03-terres-decouvertes', title: 'Terres découvertes', desc: 'Le brouillard revu : tout reste visible, mais en noir et blanc. Chaque lieu visité redonne ses couleurs à la région autour de lui.', zoom: [[-4.45, 48.05], 10] },
  { id: '04-noir-et-jaune', title: 'Noir & jaune, version 2', desc: 'Mer noire profonde à reflets, terre ivoire, côte jaune fine, voisins hachurés, grandes villes en capitales : l’identité GuideMe, plus fine.', zoom: [[-4.45, 48.12], 10] },
  { id: '05-route-des-phares', title: 'Mini-jeu : la route des phares', desc: 'Un parcours numéroté relie les 19 phares le long de la côte. Chaque phare visité s’allume, le compteur suit la progression.', zoom: [[-4.85, 48.38], 9.6] },
  { id: '06-conquete', title: 'Mini-jeu : conquête des pays', desc: 'Chaque pays se colore selon le pourcentage de lieux visités, façon jeu de stratégie, avec son drapeau et son score (valeurs d’exemple).', zoom: [[-4.4, 48.1], 9.2] },
  { id: '07-quete-du-jour', title: 'Mini-jeu : la quête du jour', desc: 'Une zone de quête est mise en avant (ici la baie de Douarnenez) : 3 spots à faire, des points à gagner, les autres lieux s’estompent.', zoom: [[-4.4, 48.12], 10.2] },
  { id: '08-chasse-au-tresor', title: 'Mini-jeu : chasse au trésor', desc: 'Certains spots sont cachés derrière un « ? » : une énigme guide vers eux, un pointillé part du dernier lieu visité. Trouvé = fiche débloquée.', zoom: [[-4.6, 48.06], 10.4] },
  { id: '09-passeport', title: 'Mini-jeu : passeport à tampons', desc: 'Chaque lieu visité laisse un tampon encré sur la carte, comme dans un passeport de voyage. La carte devient le souvenir du joueur.', zoom: [[-4.5, 48.06], 10.3] },
  { id: '10-tour-du-finistere', title: 'Mini-jeu : le Tour du Finistère', desc: 'Un itinéraire en 8 étapes à travers le département : étapes faites en vert, prochaine étape en jaune avec la distance, la suite en pointillé.', zoom: [[-4.3, 48.0], 9.4] },
];

function apply(v, data) {
  const map = document.querySelector('.map');
  const m = map.__map;
  const has = (id) => !!m.getLayer(id);
  const P = (id, k, val) => { if (has(id)) try { m.setPaintProperty(id, k, val); } catch (e) {} };
  const Lp = (id, k, val) => { if (has(id)) try { m.setLayoutProperty(id, k, val); } catch (e) {} };
  const layers = m.getStyle().layers;
  const roads = layers.filter((l) => /^(road|bridge)_/.test(l.id) && l.type === 'line');
  const labels = layers.filter((l) => l.type === 'symbol');
  const cityLabels = labels.filter((l) => /^label_(city|town|village)/.test(l.id));
  const waterLabels = labels.filter((l) => /water_name|waterway/.test(l.id));
  const land = (c) => P('background', 'background-color', c);
  const sea = (c) => { P('water', 'fill-color', c); m.getContainer().style.background = c; };
  const text = (list, c, halo, w = 2.5) => list.forEach((l) => { P(l.id, 'text-color', c); P(l.id, 'text-halo-color', halo); P(l.id, 'text-halo-width', w); });
  const greens = (wood, grass, park, op = 0.9) => { P('landcover_wood', 'fill-color', wood); P('landcover_grass', 'fill-color', grass); P('park', 'fill-color', park); P('landcover_wood', 'fill-opacity', op); P('landcover_grass', 'fill-opacity', op); };
  const roadsColor = (c, casing, op = 1) => roads.forEach((l) => { P(l.id, 'line-color', /casing/.test(l.id) ? casing : c); P(l.id, 'line-opacity', op); });
  const firstLabel = labels[0]?.id;
  const LEFT = 480;
  const byId = Object.fromEntries(data.places.map((p) => [p.id, p]));
  const markerOf = (name) => [...document.querySelectorAll('.gm-marker')].find((e) => e.querySelector('.gm-pop-name')?.textContent.trim() === name);
  window.__decos = [];
  // Décor redessiné à chaque vue (positions projetées) ; under = sous les repères, sinon au-dessus
  const deco = (fn, under = true, css = '') => {
    const host = under ? m.getCanvasContainer() : map;
    const d = document.createElement('div');
    d.style.cssText = `position:absolute;inset:0;pointer-events:none;z-index:${under ? 1 : 3}`;
    if (under) host.insertBefore(d, m.getCanvas().nextSibling); else host.appendChild(d);
    const draw = () => { d.innerHTML = (css ? `<style>${css}</style>` : '') + fn(); };
    draw(); window.__decos.push(draw);
  };
  const pr = (c) => m.project(c);
  const kmPx = (c, km) => { const a = m.project(c), b = m.project([c[0], c[1] + km / 111]); return Math.abs(a.y - b.y); };
  const circle = (c, km, n = 64) => { const r = km / 111, pts = []; for (let i = 0; i <= n; i++) { const a = (i / n) * 2 * Math.PI; pts.push([c[0] + (r / Math.cos(c[1] * Math.PI / 180)) * Math.cos(a), c[1] + r * Math.sin(a)]); } return pts; };
  const canvasImg = (size, draw) => { const r = 2, c = document.createElement('canvas'); c.width = c.height = size * r; const x = c.getContext('2d'); x.scale(r, r); draw(x, size); return { width: c.width, height: c.height, data: x.getImageData(0, 0, c.width, c.height).data }; };
  const card = (html, pos = `left:${LEFT + 24}px;top:76px`) => deco(() => `<div style="position:absolute;${pos};background:#111;color:#fff;font:500 13px Rubik Variable;padding:12px 16px;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.28);max-width:300px;line-height:1.35">${html}</div>`, false);
  const hav = (a, b) => { const R = 6371, t = (x) => x * Math.PI / 180; const dl = t(b[1] - a[1]), dg = t(b[0] - a[0]); const h = Math.sin(dl / 2) ** 2 + Math.cos(t(a[1])) * Math.cos(t(b[1])) * Math.sin(dg / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); };
  const brand = () => { // base « GuideMe » sobre, utilisée par les mini-jeux
    land('#FBF7EC'); sea('#7FB2EE'); greens('#CDE7B5', '#E4F1D2', '#CDE7B5', .8); P('landuse_residential', 'fill-color', '#F3E8CF');
    P('voile', 'fill-opacity', 0); P('hors-finistere', 'fill-color', '#1C2130'); P('hors-finistere', 'fill-opacity', .18);
  };

  switch (v) {
    case '01-nuit-des-phares': {
      land('#1A2440'); sea('#0A1129'); P('water_shallow', 'line-color', '#13204A'); P('water_outline', 'line-color', '#4E6FC4'); P('water_outline', 'line-opacity', .55); P('water_outline', 'line-width', 1);
      greens('#1B2A48', '#1E2B47', '#1B2A48', .7); P('landuse_residential', 'fill-color', '#263257'); P('landcover_sand', 'fill-color', '#2E3550'); P('building', 'fill-color', '#2F3A63'); P('building', 'fill-outline-color', '#2F3A63');
      P('hors-finistere', 'fill-color', '#000'); P('hors-finistere', 'fill-opacity', .35); P('voile', 'fill-opacity', 0);
      P('finistere-limite', 'line-color', '#FFB900'); P('finistere-limite', 'line-opacity', .35); P('finistere-halo', 'line-opacity', 0);
      P('hillshade', 'hillshade-shadow-color', '#050914'); P('hillshade', 'hillshade-highlight-color', '#3D5590');
      P('water_waves', 'fill-opacity', .08); text(labels, '#AFC0EA', 'rgba(8,14,36,.85)', 2); text(waterLabels, '#5C7BC8', 'rgba(8,14,36,.6)', 1.5);
      roadsColor('#33416E', '#26325A', .7);
      const phares = data.places.filter((p) => p.icon === 'lighthouse');
      deco(() => {
        const z = m.getZoom(), L = 60 * 2 ** (z - 8);
        return `<svg style="position:absolute;inset:0;width:100%;height:100%"><defs>
          <radialGradient id="bm" cx="0" cy="0.5" r="1"><stop offset="0" stop-color="#FFE08A" stop-opacity=".55"/><stop offset="1" stop-color="#FFE08A" stop-opacity="0"/></radialGradient>
          <radialGradient id="gl"><stop offset="0" stop-color="#FFF1B8" stop-opacity=".95"/><stop offset=".35" stop-color="#FFD54A" stop-opacity=".45"/><stop offset="1" stop-color="#FFD54A" stop-opacity="0"/></radialGradient></defs>
          ${phares.map((p, i) => { const { x, y } = pr(p.c); const vis = data.visited.includes(p.id); const a = (i * 67) % 360, k = vis ? 1.25 : .85;
            const beam = (ang) => `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="M0 0 L${L * k} ${-L * k * .16} A${L * k} ${L * k} 0 0 1 ${L * k} ${L * k * .16} Z" fill="url(#bm)" opacity="${vis ? .9 : .55}"/></g>`;
            return beam(a) + beam(a + 180) + `<circle cx="${x}" cy="${y}" r="${(vis ? 26 : 16) * Math.min(2, 2 ** ((z - 8) / 2))}" fill="url(#gl)"/>`; }).join('')}</svg>`;
      });
      deco(() => `<svg style="position:absolute;inset:0;width:100%;height:100%;opacity:.55">${Array.from({ length: 90 }, (_, i) => `<circle cx="${(i * 197) % 1400}" cy="${(i * 131) % 820}" r="${i % 4 ? .6 : 1.1}" fill="#fff" opacity="${.3 + (i % 5) / 8}"/>`).join('')}</svg>
        <div style="position:absolute;right:90px;top:120px;width:46px;height:46px;border-radius:50%;background:#F4F1E0;box-shadow:0 0 40px 12px rgba(244,241,224,.25),inset -10px -6px 0 rgba(0,0,0,.08)"></div>
        <div style="position:absolute;left:${LEFT}px;right:0;top:0;bottom:0;box-shadow:inset 0 0 200px 60px rgba(0,0,12,.65)"></div>`);
      card(`<div style="font-weight:700;font-size:15px">🌙 La nuit des phares</div><div style="color:#bbb;margin-top:3px">${phares.filter((p) => data.visited.includes(p.id)).length} phares allumés sur ${phares.length}</div><div style="height:6px;border-radius:4px;background:#333;margin-top:8px"><div style="width:${Math.round(100 * phares.filter((p) => data.visited.includes(p.id)).length / phares.length)}%;height:100%;border-radius:4px;background:#FFB900"></div></div>`);
      break; }
    case '02-carte-illustree': {
      land('#F7E8B9'); sea('#4BAFDB'); P('water_shallow', 'line-color', '#9EDDF1'); P('water_shallow', 'line-blur', 0); P('water_shallow', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, 6, 10, 16, 14, 34]);
      P('water_outline', 'line-color', '#2B2118'); P('water_outline', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, 1.6, 10, 2.6, 14, 4]);
      greens('#7CC46A', '#B7DE8C', '#7CC46A', 1); P('landuse_residential', 'fill-color', '#F2C98C'); P('landcover_sand', 'fill-color', '#FFE08A'); P('building', 'fill-color', '#E58F6E'); P('building', 'fill-outline-color', '#8A3D25');
      try { m.setLayerZoomRange('wood_trees', 6, 24); } catch (e) {} P('wood_trees', 'fill-opacity', 1);
      P('hillshade', 'hillshade-exaggeration', .6); P('hillshade', 'hillshade-shadow-color', '#8A5A2B'); P('hillshade', 'hillshade-highlight-color', '#FFF6D6');
      m.addImage('hach', canvasImg(12, (x, s) => { x.strokeStyle = 'rgba(90,60,30,.35)'; x.lineWidth = 1; x.beginPath(); x.moveTo(0, s); x.lineTo(s, 0); x.stroke(); }), { pixelRatio: 2 });
      P('hors-finistere', 'fill-pattern', 'hach'); P('hors-finistere', 'fill-opacity', 1); P('voile', 'fill-opacity', 0);
      P('finistere-limite', 'line-color', '#C8312B'); P('finistere-limite', 'line-dasharray', [2, 1.4]); P('finistere-limite', 'line-width', 3); P('finistere-halo', 'line-color', '#FFF6D6');
      P('water_waves', 'fill-opacity', 1); text(labels, '#2B2118', '#FFF6D6', 2.8); cityLabels.forEach((l) => Lp(l.id, 'text-transform', 'uppercase')); text(waterLabels, '#0E4E78', 'rgba(255,255,255,.7)', 2);
      roadsColor('#FFF3D6', '#C9A05E');
      const boat = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" stroke="#2B2118" stroke-width="2.2" stroke-linejoin="round"><path d="M-26 6 Q0 22 26 6 L20 -2 L-20 -2Z" fill="#B5662F"/><path d="M0 -2 V-44" fill="none"/><path d="M2 -42 Q22 -26 2 -8Z" fill="#fff"/><path d="M-2 -38 Q-18 -24 -2 -10Z" fill="#E8463A"/><path d="M-40 16 q8 -5 16 0 t16 0 M14 16 q8 -5 16 0 t16 0" fill="none" stroke="#fff"/></g>`;
      const serpent = (x, y) => `<g transform="translate(${x} ${y})" stroke="#2B2118" stroke-width="2.2" fill="#3FAE6A" stroke-linejoin="round"><path d="M-40 6 q10 -26 20 0 z M-8 6 q10 -30 22 0z M26 6 q6 -40 24 -34 q10 4 4 14 q-6 -2 -10 2 q-4 10 -2 18z"/><circle cx="46" cy="-24" r="2" fill="#2B2118"/><path d="M-50 10 q10 -5 20 0 t20 0 t20 0 t20 0 t20 0" fill="none" stroke="#fff"/></g>`;
      deco(() => { const a = pr([-5.35, 48.62]), b = pr([-4.95, 47.75]), c = pr([-5.55, 48.15]); return `<svg style="position:absolute;inset:0;width:100%;height:100%">${boat(a.x, a.y, 1.1)}${serpent(b.x, b.y)}${boat(c.x, c.y, .8)}</svg>`; });
      deco(() => `<svg style="position:absolute;left:${LEFT + 26}px;top:70px" width="330" height="86" viewBox="0 0 330 86"><path d="M18 22 H312 L298 44 L312 66 H18 L32 44Z" fill="#C8312B" stroke="#2B2118" stroke-width="3" stroke-linejoin="round"/><path d="M18 22 L4 14 L10 44 L4 74 L18 66" fill="#9E2420" stroke="#2B2118" stroke-width="3" stroke-linejoin="round"/><path d="M312 22 L326 14 L320 44 L326 74 L312 66" fill="#9E2420" stroke="#2B2118" stroke-width="3" stroke-linejoin="round"/><text x="165" y="53" text-anchor="middle" font-family="Rubik Variable" font-weight="800" font-size="24" fill="#FFF6D6" letter-spacing="2">FINISTÈRE</text></svg>
        <svg style="position:absolute;right:70px;bottom:56px" width="110" height="110" viewBox="-55 -55 110 110"><circle r="44" fill="#FFF6D6" stroke="#2B2118" stroke-width="3"/><path d="M0 -40 L10 0 L0 40 L-10 0Z" fill="#C8312B" stroke="#2B2118" stroke-width="2.5" stroke-linejoin="round"/><path d="M-40 0 L0 -8 L40 0 L0 8Z" fill="#2B2118"/><text y="-46" text-anchor="middle" font-family="Rubik Variable" font-weight="800" font-size="16" fill="#2B2118">N</text></svg>`, false);
      break; }
    case '03-terres-decouvertes': {
      land('#F4EED9'); sea('#5CC3E8'); P('water_shallow', 'line-color', '#A5E4F5'); P('water_shallow', 'line-blur', 0); P('water_outline', 'line-color', '#FFF3C8'); P('water_outline', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, 2, 10, 4]);
      greens('#86D27C', '#BCE895', '#86D27C', 1); P('landuse_residential', 'fill-color', '#FFDDB0'); P('landcover_sand', 'fill-color', '#FFE38A');
      P('hillshade', 'hillshade-exaggeration', .6); P('hillshade', 'hillshade-shadow-color', '#3E8E5A'); P('voile', 'fill-opacity', 0); P('hors-finistere', 'fill-opacity', .12);
      P('water_waves', 'fill-opacity', .7);
      deco(() => {
        const pts = data.visited.map((id) => byId[id]).filter(Boolean).map((p) => { const { x, y } = pr(p.c); return [x, y, kmPx(p.c, 9)]; });
        const mask = pts.map(([x, y, r]) => `radial-gradient(circle at ${x}px ${y}px, transparent ${r * .55}px, #000 ${r}px)`).join(',');
        const rings = pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r * .78}" fill="none" stroke="#fff" stroke-width="2.5" opacity=".9"/><circle cx="${x}" cy="${y}" r="${r * .78}" fill="none" stroke="#FFB900" stroke-width="1.4" stroke-dasharray="3 5"/>`).join('');
        return `<div style="position:absolute;inset:0;backdrop-filter:grayscale(1) brightness(1.06) contrast(.92);-webkit-mask-image:${mask};-webkit-mask-composite:source-in;mask-image:${mask};mask-composite:intersect"></div><svg style="position:absolute;inset:0;width:100%;height:100%">${rings}</svg>`;
      });
      card(`<div style="font-weight:700;font-size:15px">🎨 7 terres découvertes</div><div style="color:#bbb;margin-top:3px">Visite un lieu pour redonner ses couleurs à la région.</div>`);
      break; }
    case '04-noir-et-jaune': {
      land('#F5F0E4'); sea('#101010'); P('water_shallow', 'line-color', '#1C1C1C'); P('water_shallow', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, 4, 10, 10, 14, 22]); P('water_shallow', 'line-blur', 6);
      P('water_outline', 'line-color', '#FFB900'); P('water_outline', 'line-width', ['interpolate', ['linear'], ['zoom'], 6, .9, 10, 1.6, 14, 2.4]); P('water_outline', 'line-opacity', 1);
      greens('#E6E0CE', '#EEE9DB', '#E6E0CE', .9); P('landuse_residential', 'fill-color', '#ECE4D0'); P('landcover_sand', 'fill-color', '#FFE7A3'); P('building', 'fill-color', '#DED5C0'); P('building', 'fill-outline-color', '#CFC4AC');
      P('hillshade', 'hillshade-shadow-color', '#5f584a'); P('hillshade', 'hillshade-highlight-color', '#ffffff'); P('hillshade', 'hillshade-exaggeration', .4);
      m.addImage('hach', canvasImg(10, (x, s) => { x.fillStyle = '#1a1a1a'; x.fillRect(0, 0, s, s); x.strokeStyle = 'rgba(255,185,0,.35)'; x.lineWidth = 1; x.beginPath(); x.moveTo(0, s); x.lineTo(s, 0); x.stroke(); }), { pixelRatio: 2 });
      P('hors-finistere', 'fill-pattern', 'hach'); P('hors-finistere', 'fill-opacity', .88); P('voile', 'fill-opacity', 0);
      P('finistere-limite', 'line-color', '#FFB900'); P('finistere-limite', 'line-dasharray', [1, 0]); P('finistere-limite', 'line-width', 2.5); P('finistere-halo', 'line-color', '#111'); P('finistere-halo', 'line-width', 6);
      m.addImage('vag', canvasImg(60, (x, s) => { x.strokeStyle = 'rgba(255,185,0,.28)'; x.lineWidth = 1.2; x.lineCap = 'round'; x.beginPath(); x.moveTo(8, 20); x.quadraticCurveTo(14, 15, 20, 20); x.quadraticCurveTo(26, 25, 32, 20); x.stroke(); x.beginPath(); x.moveTo(36, 48); x.quadraticCurveTo(42, 43, 48, 48); x.stroke(); }), { pixelRatio: 2 });
      P('water_waves', 'fill-pattern', 'vag'); P('water_waves', 'fill-opacity', 1);
      text(labels, '#111', '#F5F0E4', 2.2); cityLabels.forEach((l) => { Lp(l.id, 'text-transform', 'uppercase'); Lp(l.id, 'text-letter-spacing', .08); });
      text(waterLabels, '#FFB900', 'rgba(0,0,0,.8)', 1.5); waterLabels.forEach((l) => Lp(l.id, 'text-letter-spacing', .25));
      roadsColor('#ffffff', '#D9CFB8');
      deco(() => `<div style="position:absolute;left:${LEFT + 14}px;top:14px;right:14px;bottom:14px">${['left:0;top:0;border-width:3px 0 0 3px', 'right:0;top:0;border-width:3px 3px 0 0', 'left:0;bottom:0;border-width:0 0 3px 3px', 'right:0;bottom:0;border-width:0 3px 3px 0'].map((s) => `<i style="position:absolute;${s};width:26px;height:26px;border-style:solid;border-color:#FFB900"></i>`).join('')}</div>`, false);
      break; }
    case '05-route-des-phares': {
      brand();
      const order = ['phare-batz', 'phare-ile-vierge', 'phare-four', 'phare-trezien', 'phare-kermorvan', 'phare-stiff', 'phare-creach', 'phare-jument', 'phare-kereon', 'phare-pierres-noires', 'phare-saint-mathieu', 'phare-petit-minou', 'phare-portzic', 'phare-tevennec', 'phare-vieille', 'phare-sein', 'phare-ar-men', 'phare-eckmuhl', 'phare-penfret'].filter((id) => byId[id]);
      const line = order.map((id) => byId[id].c);
      m.addSource('route', { type: 'geojson', data: { type: 'Feature', geometry: { type: 'LineString', coordinates: line } } });
      m.addLayer({ id: 'route-c', type: 'line', source: 'route', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#111', 'line-width': 6, 'line-opacity': .85 } }, firstLabel);
      m.addLayer({ id: 'route', type: 'line', source: 'route', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#FFB900', 'line-width': 3, 'line-dasharray': [1.2, 1.2] } }, firstLabel);
      deco(() => order.map((id, i) => { const { x, y } = pr(byId[id].c); const v = data.visited.includes(id); return `<div style="position:absolute;left:${x + 14}px;top:${y - 40}px;width:20px;height:20px;border-radius:50%;background:${v ? '#22c55e' : '#FFB900'};color:#111;font:800 11px/20px Rubik Variable;text-align:center;box-shadow:0 0 0 2px #111">${i + 1}</div>`; }).join(''), false);
      const done = order.filter((id) => data.visited.includes(id)).length;
      card(`<div style="font-weight:700;font-size:15px">🗺️ La route des phares</div><div style="color:#bbb;margin-top:3px">${done} / ${order.length} phares allumés · prochain : <b style="color:#FFB900">${byId[order.find((id) => !data.visited.includes(id))].name}</b></div><div style="display:flex;gap:3px;margin-top:9px">${order.map((id) => `<i style="flex:1;height:6px;border-radius:2px;background:${data.visited.includes(id) ? '#22c55e' : '#333'}"></i>`).join('')}</div>`);
      break; }
    case '06-conquete': {
      brand(); P('hors-finistere', 'fill-opacity', .25);
      const score = { 'cap-sizun': 64, 'douarnenez-porzay': 50, 'pays-bigouden': 100, 'concarneau-aven': 33, brest: 20, abers: 0, 'haut-leon': 0 };
      const ids = Object.keys(score);
      m.addLayer({ id: 'conq', type: 'fill', source: 'territoires', filter: ['in', ['get', 'id'], ['literal', ids]],
        paint: { 'fill-color': ['match', ['get', 'id'], ...ids.flatMap((id) => [id, score[id] === 100 ? '#16a34a' : score[id] >= 50 ? '#4ade80' : score[id] > 0 ? '#bbf7d0' : '#d4d4d4']), '#ddd'], 'fill-opacity': .62 } }, firstLabel);
      m.addLayer({ id: 'conq-l', type: 'line', source: 'territoires', filter: ['in', ['get', 'id'], ['literal', ids]], layout: { 'line-join': 'round' }, paint: { 'line-color': '#ffffff', 'line-width': 3 } }, firstLabel);
      m.addLayer({ id: 'conq-l2', type: 'line', source: 'territoires', filter: ['in', ['get', 'id'], ['literal', ids]], layout: { 'line-join': 'round' }, paint: { 'line-color': '#111', 'line-width': 1, 'line-opacity': .5 } }, firstLabel);
      const zones = m.getSource('territoires')._data || data.zones;
      const centre = (f) => { const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates; let best = null, ba = 0; polys.forEach((p) => { const r = p[0]; let a = 0, cx = 0, cy = 0; for (let i = 0; i < r.length - 1; i++) { const k = r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1]; a += k; cx += (r[i][0] + r[i + 1][0]) * k; cy += (r[i][1] + r[i + 1][1]) * k; } if (Math.abs(a) > ba) { ba = Math.abs(a); best = [cx / (3 * a), cy / (3 * a)]; } }); return best; };
      const labelsC = (data.zones.features || []).filter((f) => ids.includes(f.properties.id)).map((f) => [f.properties.id, centre(f)]);
      const flag = (id) => ({ 'cap-sizun': 'cap-sizun', 'pays-bigouden': 'pays-bigouden', brest: 'brest' }[id] || (['abers', 'haut-leon'].includes(id) ? 'leon' : 'cornouaille'));
      const nom = { 'cap-sizun': 'Cap Sizun', 'douarnenez-porzay': 'Douarnenez', 'pays-bigouden': 'Pays Bigouden', 'concarneau-aven': 'Concarneau', brest: 'Brest & Iroise', abers: 'Abers', 'haut-leon': 'Haut-Léon' };
      deco(() => labelsC.map(([id, c]) => { const { x, y } = pr(c); const s = score[id]; return `<div style="position:absolute;left:${x}px;top:${y}px;transform:translate(-50%,-50%);display:flex;align-items:center;gap:6px;background:#111;color:#fff;border-radius:10px;padding:4px 8px 4px 4px;font:700 12px Rubik Variable;box-shadow:0 4px 12px rgba(0,0,0,.25);white-space:nowrap"><img src="${data.base}territoires/${flag(id)}.svg" style="width:26px;height:18px;border-radius:3px;object-fit:cover;${s ? '' : 'filter:grayscale(1);opacity:.6'}">${nom[id]} <span style="color:${s === 100 ? '#FFB900' : s ? '#4ade80' : '#888'}">${s === 100 ? '★ 100 %' : s + ' %'}</span></div>`; }).join(''), false);
      card(`<div style="font-weight:700;font-size:15px">⚔️ Conquête du Finistère</div><div style="color:#bbb;margin-top:3px">1 pays conquis · 3 en cours · 3 à envahir</div>`, `left:${LEFT + 24}px;bottom:40px`);
      break; }
    case '07-quete-du-jour': {
      brand();
      const centre = [-4.36, 48.12], quest = ['douarnenez', 'locronan', 'pointe-du-millier'];
      m.addSource('quete', { type: 'geojson', data: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [circle(centre, 16)] } } });
      m.addLayer({ id: 'quete-f', type: 'fill', source: 'quete', paint: { 'fill-color': '#FFB900', 'fill-opacity': .14 } }, firstLabel);
      m.addLayer({ id: 'quete-l', type: 'line', source: 'quete', paint: { 'line-color': '#111', 'line-width': 2.2, 'line-dasharray': [2, 1.5] } }, firstLabel);
      document.querySelectorAll('.gm-marker').forEach((e) => { const n = e.querySelector('.gm-pop-name')?.textContent.trim(); if (!quest.some((id) => byId[id].name === n)) e.style.opacity = .3; });
      card(`<div style="font:700 11px Rubik Variable;letter-spacing:.12em;color:#FFB900">QUÊTE DU JOUR · EXPIRE DANS 6 H</div><div style="font-weight:700;font-size:16px;margin-top:4px">La baie de Douarnenez</div><div style="margin-top:8px;display:grid;gap:5px">${quest.map((id) => `<div style="display:flex;align-items:center;gap:8px"><i style="width:16px;height:16px;border-radius:5px;${data.visited.includes(id) ? 'background:#22c55e' : 'border:1.5px solid #666'}"></i>${byId[id].name}</div>`).join('')}</div><div style="margin-top:10px;display:flex;justify-content:space-between;color:#bbb"><span>${quest.filter((id) => data.visited.includes(id)).length}/3 faits</span><b style="color:#FFB900">+150 pts</b></div>`);
      break; }
    case '08-chasse-au-tresor': {
      brand(); land('#F7EFD9'); P('landuse_residential', 'fill-color', '#EFDDB8');
      const hidden = ['phare-tevennec', 'baie-des-trepasses', 'menez-dregan'];
      hidden.forEach((id) => { const e = markerOf(byId[id].name); if (e) e.style.opacity = 0; });
      const from = byId['pointe-du-van'].c, to = byId['phare-tevennec'].c;
      deco(() => { const a = pr(from), b = pr(to); const mx = (a.x + b.x) / 2 - 40, my = (a.y + b.y) / 2 - 50;
        return `<svg style="position:absolute;inset:0;width:100%;height:100%"><path d="M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}" fill="none" stroke="#8B1E1E" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/></svg>` +
          hidden.map((id) => { const { x, y } = pr(byId[id].c); return `<div style="position:absolute;left:${x - 17}px;top:${y - 42}px;width:34px;height:34px;border-radius:50% 50% 50% 4px;transform:rotate(-45deg);background:#FFB900;box-shadow:0 0 0 3px #111,0 6px 14px rgba(0,0,0,.3)"><b style="display:block;transform:rotate(45deg);font:900 18px/34px Rubik Variable;text-align:center;color:#111">?</b></div>`; }).join('') +
          `<div style="position:absolute;left:${b.x - 16}px;top:${b.y + 4}px;font:900 26px Rubik Variable;color:#8B1E1E;transform:rotate(-8deg)">✕</div>`; }, false);
      card(`<div style="font:700 11px Rubik Variable;letter-spacing:.12em;color:#FFB900">ÉNIGME N° 3</div><div style="font-weight:600;font-size:14px;margin-top:6px;font-style:italic">« Seul au milieu du raz, je n’ai jamais eu de gardien heureux. Qui suis-je ? »</div><div style="margin-top:9px;color:#bbb">3 spots mystère dans le Cap Sizun · trouvé = fiche débloquée</div>`);
      break; }
    case '09-passeport': {
      land('#F6F0DF'); sea('#8DBCE0'); greens('#D3E2B4', '#E5ECCB', '#D3E2B4', .75); P('voile', 'fill-opacity', 0); P('hors-finistere', 'fill-opacity', .1); P('water_waves', 'fill-opacity', .4);
      const cols = ['#1F4FB8', '#B3261E', '#2E7D32', '#6A1B9A', '#1F4FB8', '#B3261E', '#2E7D32'];
      data.visited.forEach((id) => { const e = markerOf(byId[id]?.name); if (e) e.style.opacity = 0; });
      deco(() => data.visited.map((id, i) => { const p = byId[id]; if (!p) return ''; const { x, y } = pr(p.c); const c = cols[i % cols.length], r = (i * 37) % 30 - 15, R = 34;
        return `<svg style="position:absolute;left:${x - 44}px;top:${y - 44}px;transform:rotate(${r}deg);mix-blend-mode:multiply;opacity:.85" width="88" height="88" viewBox="-44 -44 88 88"><defs><path id="ar${i}" d="M-27 0 A27 27 0 1 1 27 0 A27 27 0 1 1 -27 0"/><filter id="ink${i}"><feTurbulence baseFrequency=".9" numOctaves="2" seed="${i + 3}"/><feDisplacementMap in="SourceGraphic" scale="2.2"/></filter></defs><g filter="url(#ink${i})" fill="none" stroke="${c}"><circle r="${R}" stroke-width="2.6"/><circle r="${R - 6}" stroke-width="1"/><circle r="13" stroke-width="1.4"/></g><text font-family="Rubik Variable" font-weight="700" font-size="8.4" fill="${c}" letter-spacing="1.2"><textPath href="#ar${i}" startOffset="2%">${p.name.toUpperCase().slice(0, 24)} · ${p.name.length > 18 ? '' : 'FINISTÈRE ·'}</textPath></text><text y="4" text-anchor="middle" font-family="Rubik Variable" font-weight="800" font-size="9" fill="${c}">2026</text></svg>`; }).join(''));
      card(`<div style="font-weight:700;font-size:15px">🛂 Mon passeport</div><div style="color:#bbb;margin-top:3px">${data.visited.length} tampons · prochain tampon rare : <b style="color:#FFB900">Ar-Men</b></div>`);
      break; }
    case '10-tour-du-finistere': {
      brand();
      const etapes = ['phare-saint-mathieu', 'locronan', 'douarnenez', 'pointe-du-raz', 'audierne', 'phare-eckmuhl', 'concarneau', 'pont-aven'];
      const done = 3, coords = etapes.map((id) => byId[id].c);
      m.addSource('tour-done', { type: 'geojson', data: { type: 'Feature', geometry: { type: 'LineString', coordinates: coords.slice(0, done) } } });
      m.addSource('tour-next', { type: 'geojson', data: { type: 'Feature', geometry: { type: 'LineString', coordinates: coords.slice(done - 1, done + 1) } } });
      m.addSource('tour-rest', { type: 'geojson', data: { type: 'Feature', geometry: { type: 'LineString', coordinates: coords.slice(done) } } });
      const L = (id, src, color, w, dash) => m.addLayer({ id, type: 'line', source: src, layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': color, 'line-width': w, ...(dash ? { 'line-dasharray': dash } : {}) } }, firstLabel);
      L('tr-c', 'tour-rest', '#111', 2, [1, 2]); L('td-c', 'tour-done', '#111', 8); L('td', 'tour-done', '#22c55e', 5); L('tn-c', 'tour-next', '#111', 8); L('tn', 'tour-next', '#FFB900', 5);
      deco(() => etapes.map((id, i) => { const { x, y } = pr(byId[id].c); const st = i < done ? '#22c55e' : i === done ? '#FFB900' : '#fff';
        return `<div style="position:absolute;left:${x - 13}px;top:${y + 8}px;width:26px;height:26px;border-radius:8px;background:${st};color:#111;font:800 13px/26px Rubik Variable;text-align:center;box-shadow:0 0 0 2px #111,0 4px 10px rgba(0,0,0,.2)">${i + 1}</div>`; }).join(''), false);
      const km = Math.round(hav(coords[done - 1], coords[done]) * 1.25);
      card(`<div style="font:700 11px Rubik Variable;letter-spacing:.12em;color:#FFB900">LE TOUR DU FINISTÈRE</div><div style="font-weight:700;font-size:16px;margin-top:4px">Étape ${done + 1} sur ${etapes.length}</div><div style="color:#bbb;margin-top:3px">Prochaine : <b style="color:#fff">${byId[etapes[done]].name}</b> · ${km} km par la route</div><div style="display:flex;gap:4px;margin-top:9px">${etapes.map((_, i) => `<i style="flex:1;height:6px;border-radius:2px;background:${i < done ? '#22c55e' : i === done ? '#FFB900' : '#333'}"></i>`).join('')}</div>`);
      break; }
  }
}

(async () => {
  const zones = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/territoires/zones.json'), 'utf8'));
  const b = await chromium.launch();
  for (const v of VARIANTS) {
    const p = await b.newPage({ viewport: { width: 1400, height: 820 }, deviceScaleFactor: 2 });
    await p.addInitScript((visited) => { localStorage.setItem('guideme:visited', JSON.stringify(visited)); localStorage.setItem('guideme:started', '1'); localStorage.setItem('guideme:favorites', '[]'); localStorage.setItem('guideme:markers-mode', 'large'); }, VISITED);
    await p.goto('http://localhost:4173/Guideme/'); await p.waitForTimeout(5000);
    if (v.tag) { await p.locator('.tagbar .tag', { hasText: v.tag }).first().click(); await p.waitForTimeout(2500); }
    await p.evaluate(apply.toString().replace(/^function apply/, '(function apply') + `)(${JSON.stringify(v.id)}, ${JSON.stringify({ places: PLACES, visited: VISITED, zones, base: '/Guideme/' })})`);
    await p.waitForTimeout(2500);
    await p.evaluate(() => (window.__decos || []).forEach((f) => f())); await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(OUT, `${v.id}.png`), clip: { x: 480, y: 0, width: 920, height: 820 } });
    await p.evaluate(([c, z]) => { const m = document.querySelector('.map').__map; m.jumpTo({ center: c, zoom: z, padding: { left: 480, top: 0, right: 0, bottom: 0 } }); }, v.zoom);
    await p.waitForTimeout(2800);
    await p.evaluate(() => (window.__decos || []).forEach((f) => f())); await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(OUT, `${v.id}-zoom.png`), clip: { x: 480, y: 0, width: 920, height: 820 } });
    await p.close(); console.log(v.id);
  }
  const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:28px;font-family:Inter,sans-serif;background:#f6f5f0;color:#111;width:1880px}
  .v{background:#fff;border-radius:16px;padding:18px;margin-bottom:22px}.v h2{margin:0 0 4px;font-size:22px}.v p{margin:0 0 12px;color:#555;font-size:14px}.v div{display:flex;gap:14px}.v img{width:915px;border-radius:10px}</style>
  ${VARIANTS.map((v, i) => `<section class="v"><h2>${i + 1}. ${v.title}</h2><p>${v.desc}</p><div><img src="variantes2/${v.id}.png"><img src="variantes2/${v.id}-zoom.png"></div></section>`).join('')}`;
  fs.writeFileSync(path.join(__dirname, 'planche2.html'), html);
  await b.close(); console.log('ok');
})();
