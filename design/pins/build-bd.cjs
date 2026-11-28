// 10 styles de repères construits avec les icônes pleines du set validé.
//   node design/pins/capture.cjs (fonds + positions)  puis  node design/pins/build.cjs → planche.png
const fs = require('fs'); const path = require('path');
const D = __dirname;
const { views, thumbs } = JSON.parse(fs.readFileSync(path.join(D, 'positions.json'), 'utf8'));
const src = fs.readFileSync(path.join(D, '../../src/data/typeIcons.js'), 'utf8');
const ICONS = JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1));
const TYPE = { lighthouse: 'phare', beach: 'plage', cliff: 'nature', port: 'port', church: 'histoire', fire: 'prehistoire' };
let u = 0;
const ic = (p, color, s) => `<svg width="${s}" height="${s}" viewBox="0 0 48 48" fill="none" style="color:${color};display:block">${ICONS[TYPE[p.icon] || 'phare'].replace(/__U__/g, 'u' + u++)}</svg>`;
const CHECK = (c = '#16a34a') => `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="${c}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
const STAR = (c = '#111') => `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="${c}"><path d="M12 3.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.9l-5.25 2.7 1-5.8L3.5 9.7l5.9-.9z"/></svg>`;
const Y = '#FFB900', G = '#16a34a', K = '#111111';
const badge = (st, pos = 'top:-5px;right:-5px', s = 16) => st === 'visited' ? `<i style="position:absolute;${pos};width:${s}px;height:${s}px;border-radius:50%;background:#fff;padding:2px;box-sizing:border-box;box-shadow:0 1px 3px rgba(0,0,0,.3)">${CHECK()}</i>` : st === 'todo' ? `<i style="position:absolute;${pos};width:${s}px;height:${s}px;border-radius:50%;background:${Y};padding:2.5px;box-sizing:border-box;box-shadow:0 0 0 1.5px #fff,0 1px 3px rgba(0,0,0,.3)">${STAR()}</i>` : '';
const name = (p, st, top = 6) => st === 'selected' ? `<b style="position:absolute;left:50%;top:${top}px;transform:translateX(-50%);white-space:nowrap;background:${K};color:#fff;font:600 12px 'Rubik Variable',Inter,sans-serif;padding:4px 9px;border-radius:8px;box-shadow:0 3px 10px rgba(0,0,0,.25)">${p.name}</b>` : '';
const dotBase = (st, bg = K, s = 12) => `<span style="position:absolute;left:${-s / 2}px;top:${-s / 2}px;width:${s}px;height:${s}px;border-radius:50%;background:${st === 'visited' ? G : bg};box-shadow:0 0 0 2px #fff,0 1px 4px rgba(0,0,0,.35)"></span>`;
// Chaque style : pin(p, st) ancré au point (0,0) = position exacte du lieu ; dot(p, st) pour la vue large
// 5 variantes BD : contour encré + ombre pleine décalée (effet relief), couleurs GuideMe
const BD = (o) => ({ id: o.id, title: o.title, desc: o.desc,
  pin: (p, st) => { const s = st === 'selected' ? 44 : 36; const c = st === 'visited' ? o.v : st === 'todo' ? o.t : o.n;
    return `<span style="position:absolute;left:${-s / 2}px;top:${-s / 2}px;width:${s}px;height:${s}px;border-radius:50%;background:${c[0]};border:${o.bw || 2.5}px solid ${o.line};box-sizing:border-box;box-shadow:${o.sh(c)};display:grid;place-items:center">${ic(p, c[1], s * .55)}</span>${name(p, st, s / 2 + 9)}`; },
  dot: (p, st) => { const c = st === 'visited' ? o.v : st === 'todo' ? o.t : o.n; return `<span style="position:absolute;left:-8px;top:-8px;width:16px;height:16px;border-radius:50%;background:${c[0]};border:2px solid ${o.line};box-sizing:border-box;box-shadow:${o.shs(c)}"></span>`; } });
const STYLES = [
  BD({ id: 'bd1-blanc', title: 'A. Blanc encré', desc: 'Intérieur blanc, contour et ombre pleine noirs, icône noire. Visité = vert, to-do = jaune. Le plus « BD » et le plus lisible.',
    n: ['#fff', K], v: [G, '#fff'], t: [Y, K], line: K, sh: () => '3px 3px 0 #111', shs: () => '1.5px 1.5px 0 #111' }),
  BD({ id: 'bd2-blanc-ombre-jaune', title: 'B. Blanc, relief jaune', desc: 'Intérieur blanc, contour noir, mais l\u2019ombre décalée est jaune GuideMe : le relief porte la couleur de la marque.',
    n: ['#fff', K], v: [G, '#fff'], t: [Y, K], line: K, sh: (c) => `3px 3px 0 ${c[1] === G ? G : c === undefined ? Y : Y}, 3px 3px 0 1.5px #111`, shs: () => `1.5px 1.5px 0 ${Y}` }),
  BD({ id: 'bd3-jaune', title: 'C. Jaune GuideMe', desc: 'Fond jaune, contour et ombre noirs, icône noire. Très visible sur la mer comme sur la terre. Visité = vert, to-do = blanc.',
    n: [Y, K], v: [G, '#fff'], t: ['#fff', K], line: K, sh: () => '3px 3px 0 #111', shs: () => '1.5px 1.5px 0 #111' }),
  BD({ id: 'bd4-bouton', title: 'D. Bouton en relief', desc: 'Blanc avec une épaisseur vers le bas (comme un bouton de jeu) plutôt qu\u2019une ombre en biais. Plus doux, toujours très « jeu ».',
    n: ['#fff', K], v: [G, '#fff'], t: [Y, K], line: K, sh: (c) => `0 4px 0 ${c[0] === G ? '#0b5a28' : c[0] === Y ? '#b98500' : '#111'}, 0 6px 8px rgba(0,0,0,.2)`, shs: () => '0 2px 0 #111' }),
  BD({ id: 'bd5-bleu', title: 'E. Bleu breton', desc: 'Fond bleu Cornouaille, icône blanche, contour et ombre noirs : rappelle les drapeaux de territoires. Visité = vert, to-do = jaune.',
    n: ['#2D5FF2', '#fff'], v: [G, '#fff'], t: [Y, K], line: K, sh: () => '3px 3px 0 #111', shs: () => '1.5px 1.5px 0 #111' }),
];
const VIS = ['pointe-du-van', 'audierne', 'phare-vieille', 'locronan', 'phare-eckmuhl'], TODO = ['baie-des-trepasses', 'phare-ar-men'], SEL = 'pointe-du-raz';
const stOf = (id) => id === SEL ? 'selected' : VIS.includes(id) ? 'visited' : TODO.includes(id) ? 'todo' : 'normal';
const demo = { name: 'Phare de la Vieille', icon: 'lighthouse' };
const panel = (view, fn, w, h, dots) => `<div style="position:relative;width:920px;height:820px;background:url('fond-${view}.png') 0 0/920px 820px;zoom:${w / 920};border-radius:14px;overflow:hidden">${views[view].sort((a, b) => a.y - b.y).map((p) => `<div style="position:absolute;left:${p.x}px;top:${p.y}px;z-index:${p.id === SEL ? 5 : 1}">${(dots ? fn.dot : fn.pin)(p, dots && p.id === SEL ? 'visited' : stOf(p.id))}</div>`).join('')}</div>`;
const legend = (s) => ['normal', 'visited', 'todo', 'selected'].map((st) => `<figure><div class="lg"><div style="position:absolute;left:50%;top:${st === 'selected' ? 52 : 62}%">${s.pin(demo, st)}</div></div><figcaption>${{ normal: 'Non visité', visited: 'Visité', todo: 'To-do', selected: 'Sélectionné' }[st]}</figcaption></figure>`).join('') + `<figure><div class="lg"><div style="position:absolute;left:30%;top:55%">${s.dot(demo, 'normal')}</div><div style="position:absolute;left:52%;top:55%">${s.dot(demo, 'visited')}</div><div style="position:absolute;left:74%;top:55%">${s.dot(demo, 'todo')}</div></div><figcaption>Vue large</figcaption></figure>`;
const font = path.join(D, '../../node_modules/@fontsource-variable/rubik/files/rubik-latin-wght-normal.woff2');
const html = `<!doctype html><meta charset="utf-8"><style>@font-face{font-family:'Rubik Variable';src:url('file://${font}') format('woff2');font-weight:100 900}
body{margin:0;padding:26px;background:#f4f3ee;font-family:'Rubik Variable',Inter,sans-serif;color:#111;width:1300px}
section{background:#fff;border-radius:18px;padding:20px;margin-bottom:20px}h2{margin:0 0 4px;font-size:22px}p{margin:0 0 14px;color:#555;font-size:14px;max-width:1100px}
.row{display:flex;gap:16px}.side{display:flex;flex-direction:column;gap:12px}.lgs{display:flex;gap:8px}figure{margin:0;text-align:center;font-size:12px;color:#666}
.lg{position:relative;width:104px;height:110px;overflow:hidden;border-radius:12px;background:#4ec3e6 linear-gradient(160deg,#eef6dc 0 48%,#4ec3e6 48%);margin-bottom:4px}</style>
${STYLES.map((s, i) => `<section id="${s.id}"><h2>${i + 1}. ${s.title}</h2><p>${s.desc}</p><div class="row">${panel('proche', s, 690, 615)}<div class="side">${panel('large', s, 560, 499, true)}<div class="lgs">${legend(s)}</div></div></div></section>`).join('')}`;
fs.writeFileSync(path.join(D, 'planche-bd.html'), html);
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1352, height: 900 }, deviceScaleFactor: 1.5 });
  await pg.goto('file://' + path.join(D, 'planche-bd.html'), { waitUntil: 'networkidle', timeout: 90000 }); await pg.waitForTimeout(3000);
  for (const s of STYLES) await pg.locator('#' + s.id).screenshot({ path: path.join(D, `bd-${s.id}.png`) });
  await b.close(); console.log('ok');
})();
