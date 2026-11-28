// Propositions « Sites naturels », vues au milieu du set final.
//   node design/icones-final/sites-naturels/build.cjs → preview.png, svg/nature-<n>.svg, guideme-sites-naturels.svg
const fs = require('fs');
const path = require('path');
const D = __dirname;
const SET = JSON.parse(fs.readFileSync(path.join(D, '../icons.json'), 'utf8'));
const V = JSON.parse(fs.readFileSync(path.join(D, 'variantes.json'), 'utf8'));
let n = 0;
const setInner = (id, color, uid) => {
  const t = SET[id];
  const shapes = t.shapes.replace(/#111111/g, color).replace(new RegExp(`${id}-m(\\d)`, 'g'), `${id}-m$1-${uid}`);
  const g = `<g transform="${t.transform}">${shapes}</g>`;
  if (!t.holes) return g;
  return `<defs><mask id="ko-${id}-${uid}" maskUnits="userSpaceOnUse" x="-8" y="-8" width="64" height="64"><rect x="-8" y="-8" width="64" height="64" fill="white"/><g transform="${t.transform}">${t.holes}</g></mask></defs><g mask="url(#ko-${id}-${uid})">${g}</g>`;
};
const varInner = (k, color) => `<g fill="${color}">${V[k][1].replace(/#111111/g, color)}</g>`;
const wrap = (inner, size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none">${inner}</svg>`;
fs.mkdirSync(path.join(D, 'svg'), { recursive: true });
Object.keys(V).forEach((k) => fs.writeFileSync(path.join(D, 'svg', `nature-${k}.svg`), wrap(varInner(k, '#111111'), 48) + '\n'));
const C = 72, P = 24, keys = Object.keys(V), W = P * 2 + keys.length * C - 24;
fs.writeFileSync(path.join(D, 'guideme-sites-naturels.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="96" viewBox="0 0 ${W} 96" fill="none"><rect width="100%" height="100%" fill="#fff"/>${keys.map((k, i) => `<g id="Sites naturels ${k} · ${V[k][0]}" transform="translate(${P + i * C} ${P})">${varInner(k, '#111111')}</g>`).join('')}</svg>\n`);
const font = path.join(D, '../../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const ORDER = Object.keys(SET);
const tagRow = (k, active) => ORDER.map((id) => {
  const inner = id === 'nature' ? varInner(k, 'currentColor') : setInner(id, 'currentColor', `u${n++}`);
  const on = id === active;
  return `<span class="tag ${on ? 'is-on' : ''}">${wrap(inner, 15)}${SET[id].label}</span>`;
}).join('');
const blocks = keys.map((k) => `<section><div class="head"><div class="card">${wrap(varInner(k, 'currentColor'), 72)}</div><div><b>${k} · ${V[k][0]}</b><div class="sm">${[24, 16, 12].map((s) => `<span>${wrap(varInner(k, 'currentColor'), s)}</span>`).join('')}</div></div></div><div class="tags">${tagRow(k, '')}</div><div class="tags">${tagRow(k, 'nature')}</div></section>`).join('');
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Inter;src:url("file://${font}") format("woff2");font-weight:100 900}
body{margin:0;padding:24px;background:#fff;font-family:Inter,sans-serif;color:#111;width:1100px}
section{padding:16px 0;border-bottom:1px solid rgba(17,17,17,.08)}.head{display:flex;gap:18px;align-items:center;margin-bottom:10px}
.card{width:110px;height:110px;border-radius:16px;background:#f5f4ef;display:grid;place-items:center}b{font-size:15px}
.sm{display:flex;gap:10px;margin-top:10px;align-items:center}.sm span{display:grid;place-items:center;width:32px;height:32px;border-radius:8px;background:#f5f4ef}
.tags{display:flex;flex-wrap:wrap;gap:6px;padding:8px 0}
.tag{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 12px;box-sizing:border-box;border:1px solid rgba(17,17,17,.14);border-radius:8px;background:#fff;font:600 12.5px Inter,sans-serif;color:#404040;white-space:nowrap}
.tag svg{color:#404040}.tag.is-on{background:#111;border-color:#111;color:#fff}.tag.is-on svg{color:#fff}
</style><body>${blocks}</body>`;
fs.writeFileSync(path.join(D, 'preview.html'), html);
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1148, height: 400 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(D, 'preview.html')); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(D, 'preview.png'), fullPage: true }); await b.close();
  console.log('preview.png ok');
})();
