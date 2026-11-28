const fs = require('fs'); const { chromium } = require('playwright');
const L = fs.readFileSync(process.argv[2], 'utf8').split('\n');
const ICONS = JSON.parse(process.argv[3]);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const out = {};
  for (const [id, ranges] of Object.entries(ICONS)) {
    const body = ranges.map(([a, z]) => L.slice(a - 1, z).join('\n')).join('\n');
    await p.setContent(`<svg xmlns="http://www.w3.org/2000/svg" width="2720" height="290"><g id="g">${body}</g></svg>`);
    out[id] = await p.evaluate(() => {
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      document.querySelectorAll('#g path, #g rect, #g circle').forEach((el) => {
        if (el.closest('mask')) return;
        const bb = el.getBBox(); const sw = parseFloat(el.getAttribute('stroke-width') || 0) / 2;
        x0 = Math.min(x0, bb.x - sw); y0 = Math.min(y0, bb.y - sw); x1 = Math.max(x1, bb.x + bb.width + sw); y1 = Math.max(y1, bb.y + bb.height + sw);
      });
      return [x0, y0, x1, y1].map((v) => Math.round(v * 10) / 10);
    });
  }
  process.stdout.write(JSON.stringify(out)); await b.close();
})();
