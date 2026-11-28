// Badges façon icône d'app iOS, rendu 3D doux (« pâte à modeler » / Pixar) :
// mêmes formes que le set plein (icons.json). Chaque forme reçoit sa couleur et son propre modelé
// (ombre interne en bas à droite, reflet en haut à gauche), l'objet pose une ombre douce sur la tuile.
//   node design/icones-final/ios/build.cjs  → svg/<id>-v1.svg, svg/<id>-v2.svg + preview.png
const fs = require('fs');
const path = require('path');
const D = __dirname;
const ICONS = JSON.parse(fs.readFileSync(path.join(D, '../icons.json'), 'utf8'));

// Couleurs par forme (ordre de icons.json), couleur des évidements (null = ajouré), tuile [haut, bas], ombre
const V = {
  v1: { // tuile claire « décor », objet coloré
    phare: { tile: ['#D6F1FF', '#8DCCF7'], shadow: '#2F7DC0', parts: ['#FF4F5E', '#FF4F5E', '#FFFFFF', '#2E3A66', '#2E3A66', '#6E7FA8', '#FFC83D', '#FFC83D', '#FFC83D', '#FFC83D'], stripe: '#FF4F5E', holes: ['#2E3A66', '#FFE27A'], glow: '#FFE9A0' },
    port: { tile: ['#D3FBF1', '#7FDCC6'], shadow: '#1F9C86', parts: ['#FFC23D', '#3D6BFF', '#FFFFFF'], holes: [null] },
    plage: { tile: ['#FFF6D2', '#FFD36A'], shadow: '#D99A1F', parts: ['#FFFFFF', '#FF6A4D', '#8A5A35'], holes: ['#FFFFFF', '#FFFFFF'] },
  },
  v2: { // tuile intense, objet blanc + une couleur vive
    phare: { tile: ['#4256C9', '#1B2366'], shadow: '#0B1033', parts: ['#FF5C6C', '#FF5C6C', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFD84D', '#FFD84D', '#FFD84D', '#FFD84D'], stripe: '#FF5C6C', holes: ['#FF5C6C', '#FFD84D'], glow: '#FFD84D' },
    port: { tile: ['#2FD3C6', '#0C8C93'], shadow: '#064F55', parts: ['#FFFFFF', '#FFFFFF', '#FFB13B'], holes: [null] },
    plage: { tile: ['#FF9DB5', '#F2547F'], shadow: '#9C1F47', parts: ['#FFE08A', '#FFFFFF', '#FFFFFF'], holes: ['#FF3D6E', '#FF3D6E'] },
  },
};

const ELEM = /<(path|circle|rect|ellipse)\b[^>]*?\/>/g;
const FILTERS = `
<filter id="clay" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
 <feOffset in="SourceAlpha" dx="1.1" dy="1.6" result="o1"/><feGaussianBlur in="o1" stdDeviation="1.3" result="b1"/>
 <feComposite in="SourceAlpha" in2="b1" operator="arithmetic" k2="1" k3="-1" result="sh"/>
 <feFlood flood-color="#0A1030" flood-opacity=".32"/><feComposite in2="sh" operator="in" result="shc"/>
 <feOffset in="SourceAlpha" dx="-.7" dy="-1" result="o2"/><feGaussianBlur in="o2" stdDeviation=".8" result="b2"/>
 <feComposite in="SourceAlpha" in2="b2" operator="arithmetic" k2="1" k3="-1" result="hl"/>
 <feFlood flood-color="#FFFFFF" flood-opacity=".7"/><feComposite in2="hl" operator="in" result="hlc"/>
 <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="shc"/><feMergeNode in="hlc"/></feMerge>
</filter>
<filter id="drop" x="-40%" y="-40%" width="180%" height="190%"><feGaussianBlur stdDeviation="1.8"/></filter>
<filter id="halo" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3.2"/></filter>`;

function badge(id, ver, size, uid) {
  const t = ICONS[id], s = V[ver][id], b = t.box48;
  const clay = (el) => `<g filter="url(#clay)">${el}</g>`;
  // les filtres travaillent en unités 48 : chaque forme est replacée dans son repère via le transform
  const wrap = (el) => `<g transform="${t.transform}">${el}</g>`;
  let i = 0, clips = '';
  const parts = [];
  t.shapes.replace(ELEM, (el) => {
    const k = i++, c = s.parts[k];
    let out = el.replace(/fill="#111111"/, `fill="${c}"`).replace(/stroke="#111111"/, `stroke="${c}"`);
    if (s.stripe && k === 2) {
      clips += `<clipPath id="tour">${el.replace(/ fill="[^"]*"/, '')}</clipPath>`;
      out += `<g clip-path="url(#tour)"><rect x="990" y="146" width="80" height="14" fill="${s.stripe}"/></g>`;
    }
    parts.push(out);
  });
  const holeEls = t.holes ? t.holes.match(ELEM) || [] : [];
  const cut = holeEls.filter((_, k) => !s.holes[k]).join('');
  const paint = holeEls.map((el, k) => (s.holes[k] ? el.replace(/fill="black"/, `fill="${s.holes[k]}"`).replace(/stroke="black"/, `stroke="${s.holes[k]}"`) : '')).filter(Boolean);
  // ordre : le corps puis les détails (évidements colorés) par-dessus, chacun avec son modelé
  // (pour le phare, la tour et la lanterne passent avant le reste pour que fenêtre et porte soient dessus)
  let body = parts.map((p) => clay(wrap(p))).join('') + paint.map((p) => clay(wrap(p))).join('');
  const mask = cut ? `<mask id="ko" maskUnits="userSpaceOnUse" x="-8" y="-8" width="64" height="64"><rect x="-8" y="-8" width="64" height="64" fill="white"/>${wrap(cut)}</mask>` : '';
  if (cut) body = `<g mask="url(#ko)">${body}</g>`;
  const silhouette = `<g transform="${t.transform}">${t.shapes.replace(/#111111/g, '#000')}</g>`;
  const cx = (b[0] + b[2]) / 2;
  const defs = `<defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.tile[0]}"/><stop offset="1" stop-color="${s.tile[1]}"/></linearGradient>
<radialGradient id="sheen" cx=".5" cy="0" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></radialGradient>
<clipPath id="sq"><rect x="-6" y="-6" width="60" height="60" rx="13.5"/></clipPath>${FILTERS}${clips}${mask}</defs>`;
  const tile = `<g clip-path="url(#sq)"><rect x="-6" y="-6" width="60" height="60" fill="url(#tg)"/><circle cx="24" cy="21" r="22" fill="#fff" opacity=".18"/><rect x="-6" y="-6" width="60" height="60" fill="url(#sheen)"/>
<ellipse cx="${cx + 1}" cy="${b[3] + 1.8}" rx="${(b[2] - b[0]) * 0.4}" ry="2.2" fill="${s.shadow}" opacity=".45" filter="url(#drop)"/></g>`;
  const drop = `<g transform="translate(.8 1.8)" opacity=".38" filter="url(#drop)" style="color:${s.shadow}">${silhouette.replace(/#000/g, s.shadow)}</g>`;
  const glow = s.glow ? `<circle cx="24" cy="10.5" r="6.5" fill="${s.glow}" opacity=".7" filter="url(#halo)"/>` : '';
  let out = `${defs}${tile}<g transform="translate(24 23.5) scale(.82) translate(-24 -24)">${drop}${glow}${body}</g>`;
  out = out.replace(/id="([\w-]+)"/g, `id="$1-${uid}"`).replace(/url\(#([\w-]+)\)/g, `url(#$1-${uid})`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="-6 -6 60 60" fill="none">${out}</svg>`;
}

const ids = ['phare', 'port', 'plage'];
fs.mkdirSync(path.join(D, 'svg'), { recursive: true });
for (const v of Object.keys(V)) for (const id of ids) fs.writeFileSync(path.join(D, 'svg', `${id}-${v}.svg`), badge(id, v, 180, `${id}${v}`) + '\n');

let n = 0;
const tileP = (inner, pct, w, h, rx = 10) => {
  const gap = 8, W = w + gap * 2 + 4, H = h + gap * 2 + 4;
  const state = pct === 0 ? 'none' : pct === 100 ? 'full' : 'some';
  return `<span class="tile is-${state}" style="width:${W}px;height:${H}px"><svg width="${W}" height="${H}"><rect class="track" x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="${rx}"/>${pct ? `<rect class="arc" x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="${rx}" pathLength="100" stroke-dasharray="${pct} 100"/>` : ''}</svg><span class="in ${inner.startsWith('<svg') ? 'ico' : ''}" style="width:${w}px;height:${h}px">${inner}</span>${state === 'full' ? '<b class="crown">★</b>' : ''}</span>`;
};
const T = path.join(D, '../../../public/territoires');
const label = { phare: 'Phares', port: 'Ports', plage: 'Plages' };
const rows = [['phare', 0, '0 / 9'], ['port', 60, '3 / 5'], ['plage', 100, '4 / 4']];
const pop = (v) => `<div class="pop"><h3>Ma progression · version ${v.slice(1)}</h3>
<small>Territoires</small><div class="g">${[['leon', 0, 'Léon', '0 / 6'], ['cornouaille', 45, 'Cornouaille', '5 / 11']].map(([f, p, l, c]) => `<figure>${tileP(`<img src="file://${T}/${f}.svg">`, p, 64, 46)}<figcaption>${l}<em>${c}</em></figcaption></figure>`).join('')}</div>
<small>Types de spots</small><div class="g">${rows.map(([id, p, c]) => `<figure>${tileP(badge(id, v, 58, `p${n++}`), p, 58, 58, 16)}<figcaption>${label[id]}<em>${c}</em></figcaption></figure>`).join('')}</div></div>`;
const font = path.join(D, '../../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Inter;src:url("file://${font}") format("woff2");font-weight:100 900}
body{margin:0;padding:28px;background:#fff;font-family:Inter,sans-serif;color:#111;width:1080px}
h2{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#737373;margin:26px 0 14px}
.row{display:flex;gap:28px;align-items:center}.row svg{filter:drop-shadow(0 6px 14px rgba(0,0,0,.12))}
.home{display:flex;gap:26px;padding:26px 30px;border-radius:22px;background:linear-gradient(160deg,#7ea8d8,#c7a4c8)}.home figure{margin:0;text-align:center;color:#fff;font-size:12px;font-weight:500}.home svg{display:block;margin-bottom:6px;filter:drop-shadow(0 4px 10px rgba(0,0,0,.18))}
.pops{display:flex;gap:20px}.pop{background:#111;color:#fff;border-radius:16px;padding:20px 22px;flex:1}
.pop h3{margin:0 0 4px;font-size:15px}.pop small{display:block;color:#9a9a9a;font-size:11px;letter-spacing:.08em;text-transform:uppercase;margin:16px 0 10px}
.g{display:flex;gap:14px}.g figure{margin:0;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px;font-weight:600}.g figcaption em{display:block;font-style:normal;font-weight:400;color:#9a9a9a;text-align:center}
.tile{position:relative;display:inline-grid;place-items:center}.tile>svg{position:absolute;inset:0;overflow:visible}
.track{fill:none;stroke:rgba(255,255,255,.16);stroke-width:1}.arc{fill:none;stroke:#4ade80;stroke-width:3;stroke-linecap:round;filter:drop-shadow(0 0 3px rgba(74,222,128,.5))}
.in{position:relative;border-radius:8px;overflow:hidden;display:grid;place-items:center;background:#2a2a2a;box-shadow:0 2px 6px rgba(0,0,0,.4)}.in.ico{border-radius:13px;background:none}
.in img{width:100%;height:100%;object-fit:cover}.in>svg{display:block}.is-none .in>*{filter:grayscale(1) brightness(.75);opacity:.55}
.crown{position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;background:#FFB900;color:#111;font-size:11px;line-height:18px;text-align:center;box-shadow:0 0 0 2px #111}
</style><body>
<h2>Version 1 : tuile claire « décor » (ciel, lagon, sable), objet coloré</h2><div class="row">${ids.map((id) => badge(id, 'v1', 220, `a${n++}`)).join('')}</div>
<h2>Version 2 : tuile intense (nuit, turquoise, rose), objet blanc + une couleur vive</h2><div class="row">${ids.map((id) => badge(id, 'v2', 220, `b${n++}`)).join('')}</div>
<h2>Comme sur un écran d'accueil</h2><div class="home">${['v1', 'v2'].map((v) => ids.map((id) => `<figure>${badge(id, v, 64, `h${n++}`)}${label[id]}</figure>`).join('')).join('<span style="width:14px"></span>')}</div>
<h2>Dans la pop-up, à côté des drapeaux (0 %, 60 %, 100 %)</h2><div class="pops">${pop('v1')}${pop('v2')}</div>
<h2>Petits formats (40 / 28)</h2><div class="row">${[40, 28].map((s) => ['v1', 'v2'].map((v) => ids.map((id) => badge(id, v, s, `s${n++}`)).join('')).join('')).join('<span style="width:20px"></span>')}</div>
</body>`;
fs.writeFileSync(path.join(D, 'preview.html'), html);
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1136, height: 400 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(D, 'preview.html')); await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(D, 'preview.png'), fullPage: true }); await b.close();
  console.log('ok');
})();
