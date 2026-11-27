// Génère un SVG par variante et l'aperçu (grandes icônes + tags de filtre réels, normal et actif).
//   node design/icones-v3/build.cjs   → design/icones-v3/svg/*.svg, preview.html, preview.png
const fs = require('fs');
const path = require('path');
const D = __dirname;
const ICONS = JSON.parse(fs.readFileSync(path.join(D, 'icons.json'), 'utf8'));
const tags = Object.entries(ICONS).filter(([k]) => !k.startsWith('_'));
const svg = (body, size = 24, sw = 2) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
fs.mkdirSync(path.join(D, 'svg'), { recursive: true });
for (const [id, t] of tags) for (const [v, body] of Object.entries(t.variants)) fs.writeFileSync(path.join(D, 'svg', `${id}-${v}.svg`), svg(body) + '\n');
const font = path.join(D, '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const chip = (label, body, active) => `<span class="tag ${active ? 'is-on' : ''}">${svg(body, 14)}${label}</span>`;
const rows = tags.map(([id, t]) => `<section><h2>${t.label}</h2><div class="vars">${Object.entries(t.variants).map(([v, body]) => `
  <div class="var"><div class="big">${svg(body, 56)}</div><b>${v}</b>
  <div class="chips">${chip(t.label, body, false)}${chip(t.label, body, true)}</div></div>`).join('')}</div></section>`).join('');
const html = `<!doctype html><meta charset="utf-8"><title>Icônes des types de spots</title><style>
@font-face{font-family:Inter;src:url("file://${font}") format("woff2");font-weight:100 900}
body{margin:0;padding:28px;background:#fbfaf6;font-family:Inter,sans-serif;color:#111}
section{display:grid;grid-template-columns:130px 1fr;align-items:center;padding:14px 0;border-bottom:1px solid rgba(17,17,17,.08)}
h2{margin:0;font-size:15px;font-weight:700}
.vars{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.var{display:flex;flex-direction:column;align-items:center;gap:8px}
.big{width:84px;height:84px;display:grid;place-items:center;background:#fff;border:1px solid rgba(17,17,17,.08);border-radius:12px;color:#111}
.var b{font-size:12px;color:#737373}
.chips{display:flex;gap:6px}
.tag{display:inline-flex;align-items:center;gap:5px;height:38px;padding:0 15px;box-sizing:border-box;border:1px solid rgba(17,17,17,.14);border-radius:8px;background:#fff;font:600 13.5px Inter,sans-serif;color:#404040;white-space:nowrap}
.tag svg{color:#737373}
.tag.is-on{background:#111;border-color:#111;color:#fff}.tag.is-on svg{color:#fff}
</style><body>${rows}</body>`;
fs.writeFileSync(path.join(D, 'preview.html'), html);
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 400 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(D, 'preview.html')); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(D, 'preview.png'), fullPage: true }); await b.close();
  console.log('preview.png ok');
})();
