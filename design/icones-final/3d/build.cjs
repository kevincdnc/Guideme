// Badges 3D « jeu » : mêmes formes que le set plein (icons.json), une couleur principale par icône
// + blanc + noir. Volume obtenu par extrusion (copies décalées assombries) + relief éclairé (filtres SVG).
//   node design/icones-final/3d/build.cjs  → svg/<id>-<variante>.svg + preview.png
const fs = require('fs');
const path = require('path');
const D = __dirname;
const ICONS = JSON.parse(fs.readFileSync(path.join(D, '../icons.json'), 'utf8'));

// m = couleur principale, w = blanc, k = noir ; mêmes rôles pour les évidements (null = ajouré)
const SPEC = {
  phare: { main: '#D7263D', parts: ['m', 'm', 'w', 'k', 'k', 'k', 'w', 'w', 'w', 'w'], stripe: true, holes: ['k', 'glow'] },
  port: { main: '#1E5BD8', parts: ['m', 'm', 'w'], holes: [null] },
  plage: { main: '#F08A12', parts: ['w', 'm', 'k'], holes: ['w', 'w'] },
};
const WHITE = '#F3F1EC', BLACK = '#1C1D21';
const shade = (hex, f) => { const n = parseInt(hex.slice(1), 16); const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(f < 1 ? v * f : v + (255 - v) * (f - 1))); return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join(''); };

const ELEM = /<(path|circle|rect|ellipse)\b[^>]*?\/>/g;
// variante A : objet couleur + blanc sur tuile sombre ; variante B : objet blanc (porcelaine) sur tuile couleur
function object(id, v) {
  const t = ICONS[id], s = SPEC[id];
  const col = (r) => (v === 'A' ? { m: s.main, w: WHITE, k: BLACK } : { m: WHITE, w: s.main, k: BLACK })[r];
  let i = 0, extra = '';
  const shapes = t.shapes.replace(ELEM, (el) => {
    const k = i++, c = col(s.parts[k]);
    let out = el.replace(/fill="#111111"/, `fill="${c}"`).replace(/stroke="#111111"/, `stroke="${c}"`);
    if (s.stripe && k === 2) { // bande sur la tour du phare
      extra = `<clipPath id="tour">${el.replace(/ fill="[^"]*"/, '')}</clipPath>`;
      out += `<g clip-path="url(#tour)"><rect x="990" y="146" width="80" height="14" fill="${col('m')}"/></g>`;
    }
    return out;
  });
  const holeEls = t.holes ? t.holes.match(ELEM) || [] : [];
  const cut = holeEls.filter((_, k) => !s.holes[k]).join('');
  const paint = holeEls.map((el, k) => {
    const r = s.holes[k]; if (!r) return '';
    const c = r === 'glow' ? '#FFF3B0' : col(r);
    return el.replace(/fill="black"/, `fill="${c}"`).replace(/stroke="black"/, `stroke="${c}"`);
  }).join('');
  return { defs: extra + (cut ? `<mask id="ko" maskUnits="userSpaceOnUse" x="-8" y="-8" width="64" height="64"><rect x="-8" y="-8" width="64" height="64" fill="white"/><g transform="${t.transform}">${cut}</g></mask>` : ''), body: `<g ${cut ? 'mask="url(#ko)"' : ''}><g transform="${t.transform}">${shapes}${paint}</g></g>`, glow: s.holes.includes('glow') };
}

// Filtres (unités 48) : extrusion = 6 copies décalées vers le bas, assombries ; relief = lumière en haut à gauche
const FILTERS = `
<filter id="ext" x="-20%" y="-20%" width="140%" height="150%" color-interpolation-filters="sRGB">
 ${[0.4, 0.8, 1.2, 1.6, 2.0, 2.4].map((d, i) => `<feOffset in="SourceGraphic" dx="${(d * 0.35).toFixed(2)}" dy="${d}" result="o${i}"/>`).join('')}
 <feMerge result="st">${[5, 4, 3, 2, 1, 0].map((i) => `<feMergeNode in="o${i}"/>`).join('')}</feMerge>
 <feComponentTransfer in="st"><feFuncR type="linear" slope=".5"/><feFuncG type="linear" slope=".5"/><feFuncB type="linear" slope=".5"/></feComponentTransfer>
</filter>
<filter id="rel" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
 <feGaussianBlur in="SourceAlpha" stdDeviation=".9" result="b"/>
 <feDiffuseLighting in="b" surfaceScale="4" diffuseConstant="1.15" lighting-color="#fff" result="d"><feDistantLight azimuth="235" elevation="50"/></feDiffuseLighting>
 <feComposite in="d" in2="SourceAlpha" operator="in" result="d2"/>
 <feBlend in="SourceGraphic" in2="d2" mode="multiply" result="m"/>
 <feSpecularLighting in="b" surfaceScale="4" specularConstant=".75" specularExponent="18" lighting-color="#fff" result="s"><feDistantLight azimuth="235" elevation="42"/></feSpecularLighting>
 <feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/>
 <feComposite in="m" in2="s2" operator="arithmetic" k2="1.12" k3=".8"/>
</filter>
<filter id="omb" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6"/></filter>
<filter id="halo" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>`;

function badge(id, v, size, uid, tile = true) {
  const s = SPEC[id], o = object(id, v), b = ICONS[id].box48; // [x0,y0,x1,y1]
  const cx = (b[0] + b[2]) / 2;
  // tuile : sombre avec halo de la couleur (A) ou couleur pleine (B)
  const bg = v === 'A'
    ? `<radialGradient id="tg" cx=".5" cy=".38" r=".75"><stop offset="0" stop-color="${shade(s.main, .42)}"/><stop offset=".65" stop-color="#17181c"/><stop offset="1" stop-color="#0e0f12"/></radialGradient>`
    : `<radialGradient id="tg" cx=".5" cy=".32" r=".8"><stop offset="0" stop-color="${shade(s.main, 1.18)}"/><stop offset=".7" stop-color="${s.main}"/><stop offset="1" stop-color="${shade(s.main, .62)}"/></radialGradient>`;
  const T = tile ? `<rect x="-6" y="-6" width="60" height="60" rx="12" fill="url(#tg)"/><rect x="-5.5" y="-5.5" width="59" height="59" rx="11.5" fill="none" stroke="#fff" stroke-opacity="${v === 'A' ? .08 : .25}"/>` : '';
  const ground = `<ellipse cx="${cx + 0.8}" cy="${b[3] + 2.4}" rx="${(b[2] - b[0]) * 0.42}" ry="2" fill="#000" opacity="${v === 'A' ? .7 : .35}" filter="url(#omb)"/>`;
  const glow = o.glow ? `<circle cx="24" cy="10" r="7" fill="#FFE27A" opacity=".55" filter="url(#halo)"/>` : '';
  // l'objet est réduit pour laisser la place à l'épaisseur
  const inner = `<g transform="translate(24 22) scale(.86) translate(-24 -24)">${ground}<g filter="url(#ext)">${o.body}</g><g filter="url(#rel)">${o.body}</g>${glow}</g>`;
  let out = `<defs>${bg}${FILTERS}${o.defs}</defs>${T}${inner}`;
  out = out.replace(/id="([\w-]+)"/g, `id="$1-${uid}"`).replace(/url\(#([\w-]+)\)/g, `url(#$1-${uid})`);
  const vb = tile ? '-6 -6 60 60' : '0 0 48 48';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${vb}" fill="none">${out}</svg>`;
}

fs.mkdirSync(path.join(D, 'svg'), { recursive: true });
for (const id of Object.keys(SPEC)) for (const v of ['A', 'B']) fs.writeFileSync(path.join(D, 'svg', `${id}-${v}.svg`), badge(id, v, 120, `${id}${v}`) + '\n');

let n = 0;
const ids = Object.keys(SPEC);
const tile = (inner, pct, w, h) => {
  const gap = 8, W = w + gap * 2 + 4, H = h + gap * 2 + 4;
  const state = pct === 0 ? 'none' : pct === 100 ? 'full' : 'some';
  return `<span class="tile is-${state}" style="width:${W}px;height:${H}px"><svg width="${W}" height="${H}"><rect class="track" x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="10"/>${pct ? `<rect class="arc" x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="10" pathLength="100" stroke-dasharray="${pct} 100"/>` : ''}</svg><span class="in" style="width:${w}px;height:${h}px">${inner}</span>${state === 'full' ? '<b class="crown">★</b>' : ''}</span>`;
};
const T = path.join(D, '../../../public/territoires');
const label = { phare: 'Phares', port: 'Ports', plage: 'Plages' };
const rows = [['phare', 0, '0 / 9'], ['port', 60, '3 / 5'], ['plage', 100, '4 / 4']];
const pop = (v) => `<div class="pop"><h3>Ma progression · variante ${v}</h3>
<small>Territoires</small><div class="g">${[['leon', 0, 'Léon', '0 / 6'], ['cornouaille', 45, 'Cornouaille', '5 / 11']].map(([f, p, l, c]) => `<figure>${tile(`<img src="file://${T}/${f}.svg">`, p, 64, 46)}<figcaption>${l}<em>${c}</em></figcaption></figure>`).join('')}</div>
<small>Types de spots</small><div class="g">${rows.map(([id, p, c]) => `<figure>${tile(badge(id, v, 58, `p${n++}`), p, 58, 58)}<figcaption>${label[id]}<em>${c}</em></figcaption></figure>`).join('')}</div></div>`;
const font = path.join(D, '../../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Inter;src:url("file://${font}") format("woff2");font-weight:100 900}
body{margin:0;padding:28px;background:#fff;font-family:Inter,sans-serif;color:#111;width:1080px}
h2{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#737373;margin:26px 0 12px}
.row{display:flex;gap:22px;align-items:center}.row figure{margin:0;text-align:center;font-size:12px;color:#737373}
.pops{display:flex;gap:20px}.pop{background:#111;color:#fff;border-radius:16px;padding:20px 22px;flex:1}
.pop h3{margin:0 0 4px;font-size:15px}.pop small{display:block;color:#9a9a9a;font-size:11px;letter-spacing:.08em;text-transform:uppercase;margin:16px 0 10px}
.g{display:flex;gap:14px}.g figure{margin:0;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px;font-weight:600}.g figcaption em{display:block;font-style:normal;font-weight:400;color:#9a9a9a;text-align:center}
.tile{position:relative;display:inline-grid;place-items:center}.tile>svg{position:absolute;inset:0;overflow:visible}
.track{fill:none;stroke:rgba(255,255,255,.16);stroke-width:1}.arc{fill:none;stroke:#4ade80;stroke-width:3;stroke-linecap:round;filter:drop-shadow(0 0 3px rgba(74,222,128,.5))}
.in{position:relative;border-radius:8px;overflow:hidden;display:grid;place-items:center;background:#2a2a2a;box-shadow:0 2px 6px rgba(0,0,0,.4)}
.in img{width:100%;height:100%;object-fit:cover}.in>svg{display:block}.is-none .in>*{filter:grayscale(1) brightness(.8);opacity:.5}
.crown{position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;background:#FFB900;color:#111;font-size:11px;line-height:18px;text-align:center;box-shadow:0 0 0 2px #111}
</style><body>
<h2>Variante A : objet couleur + blanc + noir, tuile sombre</h2><div class="row">${ids.map((id) => badge(id, 'A', 200, `a${n++}`)).join('')}</div>
<h2>Variante B : objet blanc + noir, tuile de la couleur principale</h2><div class="row">${ids.map((id) => badge(id, 'B', 200, `b${n++}`)).join('')}</div>
<h2>Dans la pop-up, à côté des drapeaux (0 %, 60 %, 100 %)</h2><div class="pops">${pop('A')}${pop('B')}</div>
<h2>Petits formats (48 / 32)</h2><div class="row">${[48, 32].map((s) => ['A', 'B'].map((v) => ids.map((id) => badge(id, v, s, `s${n++}`)).join('')).join('')).join('<span style="width:20px"></span>')}</div>
</body>`;
fs.writeFileSync(path.join(D, 'preview.html'), html);
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1136, height: 400 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(D, 'preview.html')); await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(D, 'preview.png'), fullPage: true }); await b.close();
  console.log('ok');
})();
