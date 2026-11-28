// Badges « types de spots » en couleur : mêmes formes que le set plein validé (icons.json),
// chaque forme reçoit sa couleur + un léger modelé (dégradés), les évidements deviennent des
// détails colorés (fenêtre allumée, porte, coutures du parasol).
//   node design/icones-final/couleur/build.cjs  → svg/<id>.svg + preview.png
const fs = require('fs');
const path = require('path');
const D = __dirname;
const ICONS = JSON.parse(fs.readFileSync(path.join(D, '../icons.json'), 'utf8'));

// Dégradé linéaire : clair en haut à gauche, plus sombre en bas à droite (lumière commune à tout le set)
const lin = (id, a, b, x2 = 1, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

// Pour chaque icône : couleur de chaque forme (dans l'ordre de icons.json), couleur des évidements,
// fond de la tuile, et ajouts éventuels dessinés DANS une forme existante (clipPath = la forme elle-même).
const SPEC = {
  phare: {
    bg: ['#DCEBF7', '#B9D4EC'],
    defs: lin('rouge', '#F0525F', '#B3172B') + lin('blanc', '#FFFFFF', '#D3DCE6', 1, 0) + lin('roche', '#9AA4AF', '#5A636D') + lin('vitre', '#2C3A58', '#141C30'),
    fills: ['url(#rouge)', 'url(#rouge)', 'url(#blanc)', '#1D2740', 'url(#vitre)', 'url(#roche)', '#FFB400', '#FFB400', '#FFB400', '#FFB400'],
    // bandes rouges peintes sur la tour (forme 2)
    inside: { 2: '<rect x="990" y="146" width="80" height="13" fill="url(#rouge)"/><rect x="990" y="172" width="80" height="0" fill="none"/>' },
    holes: ['#1D2740', '#FFD23F'], // porte, fenêtre allumée
    glow: '<circle cx="1031.5" cy="110" r="30" fill="#FFE27A" opacity=".55" filter="url(#flou)"/>',
  },
  port: {
    bg: ['#D8EEF0', '#AFD7DC'],
    defs: lin('laiton', '#FFD36B', '#C9860F') + lin('acier', '#3E5F93', '#15274A') + lin('bois', '#B97A45', '#7A4622', 1, 0),
    fills: ['url(#laiton)', 'url(#acier)', 'url(#bois)'],
    holes: [null], // l'anneau reste ajouré
  },
  plage: {
    bg: ['#FFF1D6', '#BFE3F2'],
    bgVertical: true,
    defs: lin('sable', '#F9DC9A', '#DDA75A', 0, 1) + lin('toile', '#FF6B5E', '#C8283A') + lin('mat', '#A9733F', '#6E4320', 1, 0),
    fills: ['url(#sable)', 'url(#toile)', 'url(#mat)'],
    holes: ['#FFF6E8', '#FFF6E8'], // coutures claires : le parasol devient rayé
  },
};

const ELEM = /<(path|circle|rect|ellipse)\b[^>]*?\/>/g;
function colored(id, uid) {
  const t = ICONS[id], s = SPEC[id];
  const u = (str) => str.replace(/id="([\w-]+)"/g, `id="$1-${uid}"`).replace(/url\(#([\w-]+)\)/g, `url(#$1-${uid})`);
  let i = 0, clips = '';
  const shapes = t.shapes.replace(ELEM, (el) => {
    const k = i++, c = s.fills[k];
    let out = el.replace(/fill="#111111"/, `fill="${c}"`).replace(/stroke="#111111"/, `stroke="${c}"`);
    if (s.inside && s.inside[k]) {
      clips += `<clipPath id="in${k}">${el.replace(/ fill="[^"]*"/, '')}</clipPath>`;
      out += `<g clip-path="url(#in${k})">${s.inside[k]}</g>`;
    }
    return out;
  });
  // évidements : ajourés (masque) si null, sinon redessinés en couleur par-dessus
  const holeEls = t.holes ? t.holes.match(ELEM) || [] : [];
  const cut = holeEls.filter((_, k) => !s.holes[k]).join('');
  const paint = holeEls.map((el, k) => (s.holes[k] ? el.replace(/fill="black"/, `fill="${s.holes[k]}"`).replace(/stroke="black"/, `stroke="${s.holes[k]}"`) : '')).join('');
  const defs = `<defs>${s.defs}${clips}<filter id="flou" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="9"/></filter>${cut ? `<mask id="ko" maskUnits="userSpaceOnUse" x="-8" y="-8" width="64" height="64"><rect x="-8" y="-8" width="64" height="64" fill="white"/><g transform="${t.transform}">${cut}</g></mask>` : ''}</defs>`;
  const body = `<g transform="${t.transform}">${s.glow || ''}${shapes}${paint}</g>`;
  return u(defs + (cut ? `<g mask="url(#ko)">${body}</g>` : body));
}
const svg = (id, size = 48, uid = id) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none">${colored(id, uid)}</svg>`;

fs.mkdirSync(path.join(D, 'svg'), { recursive: true });
Object.keys(SPEC).forEach((id) => fs.writeFileSync(path.join(D, 'svg', `${id}.svg`), svg(id) + '\n'));

// Aperçu : tuiles de progression comme dans la pop-up (fond sombre), à côté des drapeaux
let n = 0;
const tile = (inner, pct, w, h, bgStyle) => {
  const gap = 8, W = w + gap * 2 + 4, H = h + gap * 2 + 4, ins = 1.5, r = 10;
  const state = pct === 0 ? 'none' : pct === 100 ? 'full' : 'some';
  return `<span class="tile is-${state}" style="width:${W}px;height:${H}px"><svg width="${W}" height="${H}"><rect class="track" x="${ins}" y="${ins}" width="${W - 3}" height="${H - 3}" rx="${r}"/>${pct ? `<rect class="arc" x="${ins}" y="${ins}" width="${W - 3}" height="${H - 3}" rx="${r}" pathLength="100" stroke-dasharray="${pct} 100"/>` : ''}</svg><span class="in" style="width:${w}px;height:${h}px;${bgStyle || ''}">${inner}</span>${state === 'full' ? '<b class="crown">★</b>' : ''}</span>`;
};
const bgOf = (id) => { const s = SPEC[id]; return `background:linear-gradient(${s.bgVertical ? '180deg' : '135deg'},${s.bg[0]},${s.bg[1]})`; };
const T = path.join(D, '../../../public/territoires');
const flag = (f, pct) => tile(`<img src="file://${T}/${f}.svg">`, pct, 64, 46);
const typ = (id, pct, w = 52) => tile(svg(id, Math.round(w * 0.78), `p${n++}`), pct, w, w, bgOf(id));
const label = { phare: 'Phares', port: 'Ports', plage: 'Plages' };
const rows = [['phare', 0, '0 / 9'], ['port', 60, '3 / 5'], ['plage', 100, '4 / 4']];
const font = path.join(D, '../../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Inter;src:url("file://${font}") format("woff2");font-weight:100 900}
body{margin:0;padding:28px;background:#fff;font-family:Inter,sans-serif;color:#111;width:980px}
h2{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#737373;margin:26px 0 10px}
.big{display:flex;gap:18px}.big div{flex:1;height:170px;border-radius:16px;display:grid;place-items:center}
.cmp{display:flex;gap:18px;align-items:center}.cmp div{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:12px;color:#737373}
.pop{background:#111;color:#fff;border-radius:16px;padding:20px 22px;width:560px}
.pop h3{margin:0 0 14px;font-size:15px}.pop small{display:block;color:#9a9a9a;font-size:11px;letter-spacing:.08em;text-transform:uppercase;margin:16px 0 10px}
.g{display:flex;gap:16px;flex-wrap:wrap}.g figure{margin:0;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px;font-weight:600}.g figcaption em{display:block;font-style:normal;font-weight:400;color:#9a9a9a;text-align:center}
.tile{position:relative;display:inline-grid;place-items:center}.tile>svg{position:absolute;inset:0;overflow:visible}
.track{fill:none;stroke:rgba(255,255,255,.16);stroke-width:1}.arc{fill:none;stroke:#4ade80;stroke-width:3;stroke-linecap:round;filter:drop-shadow(0 0 3px rgba(74,222,128,.5))}
.in{position:relative;border-radius:8px;overflow:hidden;display:grid;place-items:center;background:#2a2a2a;box-shadow:0 2px 6px rgba(0,0,0,.4)}
.in img{width:100%;height:100%;object-fit:cover}.is-none .in>*{filter:grayscale(1);opacity:.45}.is-none .in{background:#3a3a3a!important}
.crown{position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;background:#FFB900;color:#111;font-size:11px;line-height:18px;text-align:center;box-shadow:0 0 0 2px #111}
.solid{color:#111}
</style><body>
<h2>Badges couleur (mêmes formes que le set plein)</h2>
<div class="big">${Object.keys(SPEC).map((id) => `<div style="${bgOf(id)}">${svg(id, 128, `b${n++}`)}</div>`).join('')}</div>
<h2>Plein validé → couleur</h2>
<div class="cmp">${Object.keys(SPEC).map((id) => `<div><svg class="solid" width="64" height="64" viewBox="0 0 48 48" fill="none">${fs.readFileSync(path.join(D, '../svg', id + '.svg'), 'utf8').replace(/^<svg[^>]*>|<\/svg>\s*$/g, '').replace(/id="([\w-]+)"/g, 'id="$1-s"').replace(/url\(#([\w-]+)\)/g, 'url(#$1-s)')}</svg>plein</div><div>${svg(id, 64, `c${n++}`)}couleur</div>`).join('<span style="width:18px"></span>')}</div>
<h2>Dans la pop-up de progression, à côté des drapeaux (0 %, 60 %, 100 %)</h2>
<div class="pop"><h3>Ma progression</h3>
<small>Territoires</small><div class="g">${[['leon', 0, 'Léon', '0 / 6'], ['cornouaille', 45, 'Cornouaille', '5 / 11']].map(([f, p, l, c]) => `<figure>${flag(f, p)}<figcaption>${l}<em>${c}</em></figcaption></figure>`).join('')}</div>
<small>Types de spots</small><div class="g">${rows.map(([id, p, c]) => `<figure>${typ(id, p)}<figcaption>${label[id]}<em>${c}</em></figcaption></figure>`).join('')}</div>
<small>Même hauteur que les drapeaux</small><div class="g">${flag('cornouaille', 45)}${rows.map(([id, p]) => typ(id, p, 46)).join('')}</div></div>
<h2>Petits formats</h2><div class="cmp">${[48, 32, 24].map((s) => Object.keys(SPEC).map((id) => svg(id, s, `s${n++}`)).join('')).join('<span style="width:24px"></span>')}</div>
</body>`;
fs.writeFileSync(path.join(D, 'preview.html'), html);
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1036, height: 400 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(D, 'preview.html')); await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(D, 'preview.png'), fullPage: true }); await b.close();
  console.log('ok');
})();
