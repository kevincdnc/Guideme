// Icônes v7 : icônes validées (copiées à l'identique du fichier Figma de Kevin) + variantes à choisir.
//   node design/icones-v7/build.cjs  → preview.png, svg/*.svg
const fs = require('fs');
const path = require('path');
const D = __dirname;
const { validated: V, new: N } = JSON.parse(fs.readFileSync(path.join(D, 'icons.json'), 'utf8'));
let n = 0;
// Pour l'aperçu : couleur courante, et les « blancs » du fichier Figma deviennent la couleur du fond
const forApp = (svg) => {
  const id = `u${n++}`;
  svg = svg.replace(/id="(mask\d_54_17931|k-[A-Za-z]+)"/g, (m, a) => `id="${a}-${id}"`).replace(/url\(#(mask\d_54_17931|k-[A-Za-z]+)\)/g, (m, a) => `url(#${a}-${id})`);
  return svg.split(/(<mask[\s\S]*?<\/mask>)/).map((part) => (part.startsWith('<mask') ? part
    : part.replace(/#111111/g, 'currentColor').replace(/stroke="black"/g, 'stroke="currentColor"').replace(/fill="white"/g, 'fill="var(--ko)"'))).join('');
};
const icon = (body, size) => `<svg viewBox="0 0 48 48" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">${forApp(body)}</svg>`;
fs.mkdirSync(path.join(D, 'svg'), { recursive: true });
for (const [id, [, body]] of Object.entries(N)) fs.writeFileSync(path.join(D, 'svg', `${id}.svg`), `<svg viewBox="0 0 48 48" width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">${body}</svg>\n`);
const font = path.join(D, '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const SET = [['visites', V.visites], ['todo', V.todo], ['nature', ['Sites naturels', N['naturel-1'][1]]], ['phare', V.phare], ['histoire', V.histoire], ['legende', ['Légendaire', N['legende-A'][1]]], ['plage', ['Plage', N['plage-A'][1]]], ['port', V.port], ['prehistoire', V.prehistoire], ['villes', V.villes], ['histoire-legendes', V['histoire-legendes']]];
const tag = (label, body, on) => `<span class="tag ${on ? 'is-on' : ''}">${icon(body, 15)}${label}</span>`;
const group = (title, prefix) => `<h2>${title}</h2><div class="vars">${Object.entries(N).filter(([k]) => k.startsWith(prefix)).map(([k, [label, body]]) => `<div class="var"><div class="card">${icon(body, 64)}</div><b>${k.split('-')[1]} · ${label}</b><div class="chips">${tag('Tag', body, false)}${tag('Tag', body, true)}</div></div>`).join('')}</div>`;
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Inter;src:url("file://${font}") format("woff2");font-weight:100 900}
body{margin:0;padding:28px;background:#fff;font-family:Inter,sans-serif;color:#111;width:1100px;--ko:#fff}
h2{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#737373;margin:26px 0 10px}
.vars{display:flex;flex-wrap:wrap;gap:18px}.var{display:flex;flex-direction:column;align-items:center;gap:8px;width:160px}
.card{width:110px;height:110px;border-radius:16px;background:#f5f4ef;display:grid;place-items:center;--ko:#f5f4ef}.var b{font-size:12px;color:#525252;text-align:center}
.chips{display:flex;gap:6px}.tags{display:flex;flex-wrap:wrap;gap:6px;padding:14px;background:#fbfaf6;border-radius:12px}
.tag{display:inline-flex;align-items:center;gap:6px;height:38px;padding:0 14px;box-sizing:border-box;border:1px solid rgba(17,17,17,.14);border-radius:8px;background:#fff;font:600 13.5px Inter,sans-serif;color:#404040;white-space:nowrap;--ko:#fff}
.tag svg{color:#404040}.tag.is-on{background:#111;border-color:#111;color:#fff;--ko:#111}.tag.is-on svg{color:#fff}
</style><body>
${group('Sites naturels : falaise, mer et soleil', 'naturel-')}


<h2>Le set dans les tags (avec la variante 1)</h2><div class="tags">${SET.map(([id, [label, body]]) => tag(label, body, id === 'phare')).join('')}</div></body>`;
fs.writeFileSync(path.join(D, 'preview.html'), html);
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1156, height: 400 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(D, 'preview.html')); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(D, 'preview.png'), fullPage: true }); await b.close();
  console.log('preview.png ok');
})();
