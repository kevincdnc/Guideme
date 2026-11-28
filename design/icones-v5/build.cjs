// Icônes v5 « pleines et sympathiques » (grille 48) : planche + tags à la taille réelle.
//   node design/icones-v5/build.cjs   → svg/*.svg (prêts pour Figma), preview.html, preview.png
const fs = require('fs');
const path = require('path');
const D = __dirname;
const ICONS = JSON.parse(fs.readFileSync(path.join(D, 'icons.json'), 'utf8'));
const items = Object.entries(ICONS).filter(([k]) => !k.startsWith('_')).map(([id, t]) => ({ id, ...t }));
let uid = 0;
const svg = (it, size, color = 'currentColor') => {
  const m = `m${it.id}-${uid++}`;
  const body = it.shapes.replace(/currentColor/g, color);
  const masked = it.holes ? `<defs><mask id="${m}"><rect width="48" height="48" fill="#fff"/><g fill="#000">${it.holes}</g></mask></defs><g mask="url(#${m})" fill="${color}">${body}</g>` : `<g fill="${color}">${body}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="${size}" height="${size}">${masked}</svg>`;
};
fs.mkdirSync(path.join(D, 'svg'), { recursive: true });
items.forEach((it) => fs.writeFileSync(path.join(D, 'svg', `${it.id}.svg`), svg(it, 48, '#111111') + '\n'));
const font = path.join(D, '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const cards = items.map((it) => `<div class="card">${svg(it, 64)}<span>${it.label}</span></div>`).join('');
const tags = (act) => items.map((it) => `<span class="tag ${it.id === act ? 'is-on' : ''}">${svg(it, 15)}${it.label}</span>`).join('');
const html = `<!doctype html><meta charset="utf-8"><title>Icônes v5</title><style>
@font-face{font-family:Inter;src:url("file://${font}") format("woff2");font-weight:100 900}
body{margin:0;padding:28px;background:#fff;font-family:Inter,sans-serif;color:#111;width:1100px}
.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}
.card{height:150px;border-radius:16px;background:#f5f4ef;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;font-weight:700;font-size:14px;text-align:center}
h2{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#737373;margin:28px 0 10px}
.tags{display:flex;flex-wrap:wrap;gap:6px;padding:14px;background:#fbfaf6;border-radius:12px}
.tag{display:inline-flex;align-items:center;gap:6px;height:38px;padding:0 15px;box-sizing:border-box;border:1px solid rgba(17,17,17,.14);border-radius:8px;background:#fff;font:600 13.5px Inter,sans-serif;color:#404040;white-space:nowrap}
.tag svg{color:#525252}.tag.is-on{background:#111;border-color:#111;color:#fff}.tag.is-on svg{color:#fff}
</style><body><div class="grid">${cards}</div>
<h2>Dans les tags (15 px, taille réelle)</h2><div class="tags">${tags('phare')}</div></body>`;
fs.writeFileSync(path.join(D, 'preview.html'), html);
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1156, height: 400 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(D, 'preview.html')); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(D, 'preview.png'), fullPage: true }); await b.close();
  console.log('preview.png ok');
})();
