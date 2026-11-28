// Set linéaire : SVG (Figma + app), planche, et aperçu « plein au-dessus / linéaire en dessous » + tags.
//   node design/icones-final/lineaire/build.cjs
const fs = require('fs');
const path = require('path');
const D = __dirname;
const L = JSON.parse(fs.readFileSync(path.join(D, 'icons.json'), 'utf8'));
const ids = Object.keys(L);
const svg = (id, color, size = 48) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none">${L[id][1].replace(/#111111/g, color)}</svg>`;
for (const d of ['svg', 'svg-app']) fs.mkdirSync(path.join(D, d), { recursive: true });
ids.forEach((id) => { fs.writeFileSync(path.join(D, 'svg', `${id}.svg`), svg(id, '#111111') + '\n'); fs.writeFileSync(path.join(D, 'svg-app', `${id}.svg`), svg(id, 'currentColor') + '\n'); });
const C = 72, P = 24, W = P * 2 + ids.length * C - 24;
fs.writeFileSync(path.join(D, 'guideme-icones-lineaires.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="96" viewBox="0 0 ${W} 96" fill="none"><rect width="100%" height="100%" fill="#fff"/>${ids.map((id, i) => `<g id="${L[id][0]}" transform="translate(${P + i * C} ${P})">${L[id][1]}</g>`).join('')}</svg>\n`);
const solid = (id, size) => fs.readFileSync(path.join(D, '..', 'svg-app', `${id}.svg`), 'utf8').replace('width="48" height="48"', `width="${size}" height="${size}"`).replace(/id="([^"]+)"/g, `id="$1-${size}"`).replace(/url\(#([^)]+)\)/g, `url(#$1-${size})`);
const font = path.join(D, '../../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const cards = ids.map((id) => `<div class="card"><div class="pair">${solid(id, 56)}${svg(id, 'currentColor', 56)}</div><span>${L[id][0]}</span></div>`).join('');
const tags = (on) => ids.map((id) => `<span class="tag ${on ? 'is-on' : ''}">${svg(id, 'currentColor', 15)}${L[id][0]}</span>`).join('');
const sizes = [24, 16, 12].map((s) => `<div class="row"><em>${s} px</em>${ids.map((id) => `<span class="sm">${svg(id, 'currentColor', s)}</span>`).join('')}</div>`).join('');
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Inter;src:url("file://${font}") format("woff2");font-weight:100 900}
body{margin:0;padding:28px;background:#fff;font-family:Inter,sans-serif;color:#111;width:1100px}
.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}
.card{border-radius:16px;background:#f5f4ef;padding:14px 6px 12px;display:flex;flex-direction:column;align-items:center;gap:10px;font-weight:700;font-size:13px;text-align:center}
.pair{display:flex;flex-direction:column;gap:10px;align-items:center}
h2{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#737373;margin:26px 0 10px}
.tags{display:flex;flex-wrap:wrap;gap:6px;padding:14px;background:#fbfaf6;border-radius:12px}
.tag{display:inline-flex;align-items:center;gap:6px;height:38px;padding:0 14px;box-sizing:border-box;border:1px solid rgba(17,17,17,.14);border-radius:8px;background:#fff;font:600 13.5px Inter,sans-serif;color:#404040;white-space:nowrap}
.tag svg{color:#737373}.tag.is-on{background:#111;border-color:#111;color:#fff}.tag.is-on svg{color:#fff}
.row{display:flex;align-items:center;gap:14px;margin:8px 0}.row em{width:44px;font-style:normal;font-size:12px;color:#737373}.sm{display:grid;place-items:center;width:32px;height:32px;border-radius:8px;background:#f5f4ef}
</style><body><h2>Plein (validé) au-dessus · linéaire en dessous</h2><div class="grid">${cards}</div>
<h2>Linéaire dans les tags (15 px) : normal</h2><div class="tags">${tags(false)}</div>
<h2>Linéaire dans les tags : actif</h2><div class="tags">${tags(true)}</div>
<h2>Petits formats</h2>${sizes}</body>`;
fs.writeFileSync(path.join(D, 'preview.html'), html);
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1156, height: 400 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(D, 'preview.html')); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(D, 'preview.png'), fullPage: true }); await b.close();
  console.log('preview.png ok');
})();
