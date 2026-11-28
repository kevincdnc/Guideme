// Icônes pleines validées (design/icones-final/icons.json) → src/data/typeIcons.js
// Contenu SVG (repère 48 × 48, currentColor) ; « __U__ » est remplacé par un identifiant unique au rendu.
//   node scripts/build-type-icons.cjs
const fs = require('fs');
const path = require('path');
const ICONS = JSON.parse(fs.readFileSync(path.join(__dirname, '../design/icones-final/icons.json'), 'utf8'));
const out = {};
for (const [id, t] of Object.entries(ICONS)) {
  const shapes = t.shapes.replace(/#111111/g, 'currentColor').replace(new RegExp(`${id}-m(\\d)`, 'g'), `${id}-m$1-__U__`).replace(/\s*\n\s*/g, '');
  const g = `<g transform="${t.transform}">${shapes}</g>`;
  out[id] = !t.holes ? g : `<defs><mask id="ko-${id}-__U__" maskUnits="userSpaceOnUse" x="-8" y="-8" width="64" height="64"><rect x="-8" y="-8" width="64" height="64" fill="white"/><g transform="${t.transform}">${t.holes}</g></mask></defs><g mask="url(#ko-${id}-__U__)">${g}</g>`;
}
fs.writeFileSync(path.join(__dirname, '../src/data/typeIcons.js'), `// Généré par scripts/build-type-icons.cjs à partir du set plein validé : ne pas modifier à la main.\nexport const TYPE_ICONS = ${JSON.stringify(out, null, 1)};\n`);
console.log(Object.keys(out).join(' '));
