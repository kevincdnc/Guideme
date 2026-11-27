// node scripts/extract-emblemes.cjs : régénère public/territoires/emblemes/ à partir des drapeaux (Playwright)
// Extrait l'emblème (sans le fond ni les effets) des drapeaux Léon et Cornouaille
const fs = require('fs');
const { chromium } = require('playwright');
const T = '/home/user/guideme/public/territoires/';
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  for (const f of ['leon', 'cornouaille']) {
    const s = fs.readFileSync(T + f + '.svg', 'utf8');
    const start = s.indexOf('>', s.indexOf('<g clip-path')) + 1;
    const end = s.indexOf('<rect width="3237" height="2312" rx="5.485"');
    let body = s.slice(start, end).trim();
    body = body.replace(/^<(rect|path)\b[^>]*\/>\s*/, ''); // fond du drapeau
    await p.setContent(`<html><body><svg id="s" xmlns="http://www.w3.org/2000/svg" width="3237" height="2312"><g id="g">${body}</g></svg></body></html>`);
    const bb = await p.evaluate(() => { const r = document.getElementById('g').getBBox(); return [r.x, r.y, r.width, r.height].map((v) => Math.round(v)); });
    const pad = 20, [x, y, w, h] = [bb[0] - pad, bb[1] - pad, bb[2] + 2 * pad, bb[3] + 2 * pad];
    const W = 512, H = Math.round((512 * h) / w);
    const out = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="${x} ${y} ${w} ${h}" fill="none">\n${body}\n</svg>\n`;
    fs.writeFileSync(`${T}emblemes/${f}.svg`, out);
    console.log(f, bb, W, H, Math.round(out.length / 1024) + ' Ko');
  }
  await b.close();
})();
