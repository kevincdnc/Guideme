// Outil de la veille guideme.bzh : registre des propositions (veille/propositions.json).
//   node scripts/veille.mjs ajouter <fichier.json>   fusionne des propositions (statut a-valider)
//   node scripts/veille.mjs liste [statut]           liste les propositions (a-valider par défaut)
//   node scripts/veille.mjs decide <P-0001,P-0002> <accepte|refuse|integre> [note]
import fs from 'node:fs';

const FILE = new URL('../veille/propositions.json', import.meta.url);
const load = () => JSON.parse(fs.readFileSync(FILE, 'utf8'));
const save = (l) => fs.writeFileSync(FILE, JSON.stringify(l, null, 2) + '\n');
const norm = (u) => (u || '').replace(/[?#].*$/, '').replace(/\/$/, '').toLowerCase();

const [cmd, ...args] = process.argv.slice(2);
const list = load();

if (cmd === 'ajouter') {
  const incoming = JSON.parse(fs.readFileSync(args[0], 'utf8'));
  let n = list.reduce((m, p) => Math.max(m, +p.id.slice(2)), 0);
  const seen = new Set(list.flatMap((p) => [p.titre.toLowerCase(), ...(p.sources || []).map((s) => p.fiche + norm(s.url))]));
  let added = 0;
  for (const p of incoming) {
    const keys = [p.titre.toLowerCase(), ...(p.sources || []).map((s) => p.fiche + norm(s.url))];
    if (keys.some((k) => seen.has(k)) && p.type !== 'video') { console.log('doublon ignoré :', p.titre); continue; }
    keys.forEach((k) => seen.add(k));
    list.push({ id: `P-${String(++n).padStart(4, '0')}`, ...p, statut: 'a-valider', decision: '' });
    added++;
  }
  save(list);
  console.log(`${added} proposition(s) ajoutée(s).`);
} else if (cmd === 'decide') {
  const [ids, statut, ...note] = args;
  for (const id of ids.split(',')) {
    const p = list.find((x) => x.id === id.trim());
    if (!p) { console.log('introuvable :', id); continue; }
    p.statut = statut; if (note.length) p.decision = note.join(' ');
    console.log(id, '→', statut);
  }
  save(list);
} else {
  const st = args[0] || cmd === 'liste' && 'a-valider' || 'a-valider';
  for (const p of list.filter((x) => x.statut === st)) {
    console.log(`${p.id} [${p.fiche}] (${p.type}, confiance ${p.confiance}) ${p.titre}\n   ${p.contenu}\n   → ${(p.sources || []).map((s) => s.url).join(' | ')}\n`);
  }
}
