// Planche SVG unique pour Figma : une icône 48 × 48 par groupe nommé, espacées de 24 px.
//   node design/icones-v5/board.cjs [dossier]  → <dossier>/guideme-icones.svg
const fs = require('fs');
const path = require('path');
const D = path.resolve(process.argv[2] || __dirname);
const ICONS = JSON.parse(fs.readFileSync(path.join(D, 'icons.json'), 'utf8'));
const items = Object.entries(ICONS).filter(([k]) => !k.startsWith('_'));
const C = 72, PAD = 24;
let defs = '', groups = '';
items.forEach(([id, t], i) => {
  const x = PAD + i * C;
  const body = t.shapes.replace(/currentColor/g, '#111111');
  if (t.holes) {
    defs += `<mask id="m-${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48"><rect width="48" height="48" fill="#fff"/><g fill="#000">${t.holes}</g></mask>`;
    groups += `<g id="${t.label}" transform="translate(${x} ${PAD})"><g mask="url(#m-${id})" fill="#111111">${body}</g></g>`;
  } else groups += `<g id="${t.label}" transform="translate(${x} ${PAD})" fill="#111111">${body}</g>`;
});
const W = PAD * 2 + items.length * C - (C - 48), H = 48 + PAD * 2;
fs.writeFileSync(path.join(D, 'guideme-icones.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${defs}</defs><rect width="100%" height="100%" fill="#ffffff"/>${groups}</svg>\n`);
console.log('guideme-icones.svg', items.length, 'icônes');
