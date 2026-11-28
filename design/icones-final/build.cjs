// Set final GuideMe : icônes de Kevin (Figma) ramenées en 48 × 48, évidements en vrais masques.
//   node design/icones-final/build.cjs
//   → svg/<id>.svg (#111111, pour Figma)   svg-app/<id>.svg (currentColor, pour l'app)
//     guideme-icones.svg (planche au petit format)   preview.png (planche + tags + petites tailles)
const fs = require('fs');
const path = require('path');
const D = __dirname;
const ICONS = JSON.parse(fs.readFileSync(path.join(D, 'icons.json'), 'utf8'));
const ids = Object.keys(ICONS);
let n = 0;
// Contenu d'une icône (cadre 48 × 48) ; uid rend les identifiants de masque uniques dans une page
const inner = (id, color, uid = '') => {
  const t = ICONS[id];
  let shapes = t.shapes.replace(/#111111/g, color);
  if (uid) shapes = shapes.replace(new RegExp(`${id}-m(\\d)`, 'g'), `${id}-m$1-${uid}`);
  const g = `<g transform="${t.transform}">${shapes}</g>`;
  if (!t.holes) return g;
  const m = `ko-${id}${uid ? '-' + uid : ''}`;
  return `<defs><mask id="${m}" maskUnits="userSpaceOnUse" x="-8" y="-8" width="64" height="64"><rect x="-8" y="-8" width="64" height="64" fill="white"/><g transform="${t.transform}">${t.holes}</g></mask></defs><g mask="url(#${m})">${g}</g>`;
};
const svg = (id, color, size = 48, uid = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none">${inner(id, color, uid)}</svg>`;
for (const dir of ['svg', 'svg-app']) fs.mkdirSync(path.join(D, dir), { recursive: true });
ids.forEach((id) => {
  fs.writeFileSync(path.join(D, 'svg', `${id}.svg`), svg(id, '#111111') + '\n');
  fs.writeFileSync(path.join(D, 'svg-app', `${id}.svg`), svg(id, 'currentColor') + '\n');
});
// Planche au petit format : 48 × 48, pas de 72
const C = 72, P = 24, W = P * 2 + ids.length * C - 24;
fs.writeFileSync(path.join(D, 'guideme-icones.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="96" viewBox="0 0 ${W} 96" fill="none"><rect width="100%" height="100%" fill="#ffffff"/>${ids.map((id, i) => `<g id="${ICONS[id].label}" transform="translate(${P + i * C} ${P})">${inner(id, '#111111')}</g>`).join('')}</svg>\n`);
// Aperçu
const font = path.join(D, '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const ic = (id, size) => svg(id, 'currentColor', size, `u${n++}`);
const cards = ids.map((id) => `<div class="card">${ic(id, 64)}<span>${ICONS[id].label}</span></div>`).join('');
const tags = (act) => ids.map((id) => `<span class="tag ${id === act ? 'is-on' : ''}">${ic(id, 15)}${ICONS[id].label}</span>`).join('');
const sizes = [24, 16, 12].map((s) => `<div class="row"><em>${s} px</em>${ids.map((id) => `<span class="sm">${ic(id, s)}</span>`).join('')}</div>`).join('');
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Inter;src:url("file://${font}") format("woff2");font-weight:100 900}
body{margin:0;padding:28px;background:#fff;font-family:Inter,sans-serif;color:#111;width:1100px}
.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}
.card{height:150px;border-radius:16px;background:#f5f4ef;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;font-weight:700;font-size:14px;text-align:center}
h2{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#737373;margin:28px 0 10px}
.tags{display:flex;flex-wrap:wrap;gap:6px;padding:14px;background:#fbfaf6;border-radius:12px}
.tag{display:inline-flex;align-items:center;gap:6px;height:38px;padding:0 14px;box-sizing:border-box;border:1px solid rgba(17,17,17,.14);border-radius:8px;background:#fff;font:600 13.5px Inter,sans-serif;color:#404040;white-space:nowrap}
.tag svg{color:#404040}.tag.is-on{background:#111;border-color:#111;color:#fff}.tag.is-on svg{color:#fff}
.row{display:flex;align-items:center;gap:14px;margin:8px 0}.row em{width:44px;font-style:normal;font-size:12px;color:#737373}.sm{display:grid;place-items:center;width:32px;height:32px;border-radius:8px;background:#f5f4ef}
.dark{background:#111;padding:14px;border-radius:12px;color:#fff;display:flex;gap:18px}
</style><body><div class="grid">${cards}</div>
<h2>Dans les tags (15 px, taille réelle) : normal</h2><div class="tags">${tags('')}</div>
<h2>Tag actif (fond noir : les évidements restent justes)</h2><div class="tags">${ids.map((id) => `<span class="tag is-on">${ic(id, 15)}${ICONS[id].label}</span>`).join('')}</div>
<h2>Petits formats</h2>${sizes}</body>`;
fs.writeFileSync(path.join(D, 'preview.html'), html);
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1156, height: 400 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(D, 'preview.html')); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(D, 'preview.png'), fullPage: true }); await b.close();
  console.log('preview.png ok');
})();
