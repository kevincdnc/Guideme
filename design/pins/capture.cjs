// Fond de carte sans repères + position écran des lieux (pour maquetter les styles de repères).
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const D = __dirname;
const PLACES = JSON.parse(fs.readFileSync(path.join(D, '../cartes/places.json'), 'utf8'));
const VIEWS = { proche: [[-4.56, 48.055], 10.35], large: [[-4.3, 48.25], 8.6] };
(async () => {
  const b = await chromium.launch(); const out = {};
  for (const [k, [c, z]] of Object.entries(VIEWS)) {
    const p = await b.newPage({ viewport: { width: 1400, height: 820 }, deviceScaleFactor: 2 });
    await p.goto('http://localhost:4173/Guideme/'); await p.waitForTimeout(4500);
    await p.addStyleTag({ content: '.gm-marker,.maplibregl-ctrl,.zoom-hud,.zoom-chip,.map-ctrl,.map-tools{display:none!important}' });
    await p.evaluate(([c, z]) => document.querySelector('.map').__map.jumpTo({ center: c, zoom: z, padding: { left: 480, top: 0, right: 0, bottom: 0 } }), [c, z]);
    await p.waitForTimeout(3000);
    await p.screenshot({ path: path.join(D, `fond-${k}.png`), clip: { x: 480, y: 0, width: 920, height: 820 } });
    out[k] = await p.evaluate((places) => { const m = document.querySelector('.map').__map; return places.map((pl) => { const q = m.project(pl.c); return { ...pl, x: q.x - 480, y: q.y }; }).filter((q) => q.x > 10 && q.x < 910 && q.y > 30 && q.y < 810); }, PLACES);
    await p.close();
  }
  // vignettes photo
  const p = await b.newPage(); await p.goto('http://localhost:4173/Guideme/'); await p.waitForTimeout(3000);
  const thumbs = await p.evaluate(() => Object.fromEntries([...document.querySelectorAll('.gm-marker')].map((e) => { e.dispatchEvent(new MouseEvent('mouseenter')); const im = e.querySelector('.gm-pop-img'); return [e.querySelector('.gm-pop-name')?.textContent.trim(), im ? (im.style.backgroundImage.match(/url\("?(.*?)"?\)/) || [])[1] : null]; })));
  fs.writeFileSync(path.join(D, 'positions.json'), JSON.stringify({ views: out, thumbs }, null, 1));
  console.log(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length])), Object.values(thumbs).filter(Boolean).length);
  await b.close();
})();
