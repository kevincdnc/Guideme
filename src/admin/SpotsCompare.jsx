// Liste des spots : compare la liste Claude (contenu/100-spots-finistere.md) et la liste ChatGPT (GuideMe-100-spots.xlsx)
// pour arrêter la liste finale. Les décisions sont gardées dans le navigateur et exportables en CSV.
import { useMemo, useState } from 'react';
import DATA from './data/spots-compare.json';

const KEY = 'guideme:studio:spots';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
const DECISIONS = [['keep', 'Retenu'], ['maybe', 'À discuter'], ['drop', 'Écarté']];
// Territoires ChatGPT ramenés aux 9 pays de la liste Claude (le nom d'origine reste affiché)
const REGION_MAP = {
  'Cap Sizun': 'Cap Sizun', 'Îles de la mer d’Iroise': "Îles et mer d'Iroise", 'Pays d’Iroise': "Pays d'Iroise et Brest", 'Brest & rade': "Pays d'Iroise et Brest",
  'Abers & Côte des Légendes': 'Abers et Côte des Légendes', 'Pays du Léon': 'Abers et Côte des Légendes', 'Baie de Morlaix & Trégor': 'Baie de Morlaix',
  'Monts d’Arrée & Centre-Finistère': "Monts d'Arrée et enclos paroissiaux", 'Crozon & Aulne maritime': "Presqu'île de Crozon et Porzay", 'Pays Bigouden': 'Pays Bigouden',
  'Cornouaille – Quimper, Douarnenez & Porzay': 'Cornouaille', 'Pays Fouesnantais & Glénan': 'Cornouaille', 'Concarneau, Aven & Quimperlé': 'Cornouaille',
};
const ORDER = [...new Set(DATA.claude.map((c) => c.region))];
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// Une ligne par spot : commun aux deux listes, ou présent dans une seule
function buildRows() {
  const G = Object.fromEntries(DATA.gpt.map((g) => [g.id, g]));
  const used = new Set();
  const rows = DATA.claude.map((c) => {
    const g = c.match ? G[c.match] : null;
    if (g) used.add(g.id);
    return { key: `c${c.n}`, name: c.name, alt: g && norm(g.name) !== norm(c.name) ? g.name : null, region: c.region, gptRegion: g?.region, commune: c.commune, tags: c.tags, gptTags: g?.tags, claude: c.n, gpt: g?.rank, live: c.live, pitch: c.pitch, note: g?.note, src: g ? 'both' : 'claude' };
  });
  DATA.gpt.filter((g) => !used.has(g.id)).forEach((g) => rows.push({ key: g.id, name: g.name, region: REGION_MAP[g.region] || g.region, gptRegion: g.region, commune: g.commune, tags: g.tags, gpt: g.rank, live: false, note: g.note, src: 'gpt' }));
  return rows;
}

export default function SpotsCompare() {
  const rows = useMemo(buildRows, []);
  const [dec, setDec] = useState(load);
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const save = (d) => { setDec(d); try { localStorage.setItem(KEY, JSON.stringify(d)); } catch { /* ignore */ } };
  const decide = (k, v) => save({ ...dec, [k]: dec[k] === v ? undefined : v });
  const count = (f) => rows.filter((r) => match(r, f)).length;
  function match(r, f) {
    if (f === 'both' || f === 'claude' || f === 'gpt') return r.src === f;
    if (f === 'keep' || f === 'maybe' || f === 'drop') return dec[r.key] === f;
    if (f === 'todo') return !dec[r.key];
    return true;
  }
  const shown = rows.filter((r) => match(r, filter) && (!q || norm(`${r.name} ${r.alt || ''} ${r.commune} ${r.region}`).includes(norm(q))));
  const kept = rows.filter((r) => dec[r.key] === 'keep').length;
  const regions = ORDER.filter((reg) => shown.some((r) => r.region === reg));

  const keepCommon = () => save({ ...dec, ...Object.fromEntries(rows.filter((r) => r.src === 'both' && !dec[r.key]).map((r) => [r.key, 'keep'])) });
  const exportCsv = () => {
    const head = ['Décision', 'Spot', 'Autre nom (ChatGPT)', 'Pays', 'Commune', 'Tags', 'N° Claude', 'Rang ChatGPT', 'Fiche en ligne'];
    const lines = rows.map((r) => [DECISIONS.find(([k]) => k === dec[r.key])?.[1] || 'À trancher', r.name, r.alt || '', r.region, r.commune, r.tags.join(' · '), r.claude || '', r.gpt || '', r.live ? 'oui' : '']);
    const csv = [head, ...lines].map((l) => l.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(';')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' }));
    a.download = 'guideme-liste-finale.csv'; a.click();
  };

  return (
    <div className="st-page st-spots">
      <header className="st-page-head">
        <div>
          <h1>Liste des spots</h1>
          <p>Liste Claude (100) et liste ChatGPT (100) : {count('both')} spots en commun, {count('claude')} seulement chez Claude, {count('gpt')} seulement chez ChatGPT.</p>
        </div>
        <div className="st-final"><b>{kept}</b><span>/ 100 retenus</span><i style={{ width: `${Math.min(kept, 100)}%` }} /></div>
      </header>

      <div className="st-toolbar">
        <div className="st-seg">
          {[['all', 'Tous'], ['both', 'Communs'], ['claude', 'Seulement Claude'], ['gpt', 'Seulement ChatGPT'], ['todo', 'À trancher'], ['keep', 'Retenus'], ['maybe', 'À discuter'], ['drop', 'Écartés']].map(([id, l]) => (
            <button key={id} className={filter === id ? 'is-on' : ''} onClick={() => setFilter(id)}>{l} <em>{count(id)}</em></button>
          ))}
        </div>
        <input className="st-search" placeholder="Chercher un spot, une commune…" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="st-btn st-btn--ghost" onClick={keepCommon}>Retenir tous les communs</button>
        <button className="st-btn st-btn--ghost" onClick={exportCsv}>Exporter en CSV</button>
      </div>

      {regions.map((reg) => (
        <section key={reg} className="st-region">
          <h2>{reg} <em>{shown.filter((r) => r.region === reg).length}</em></h2>
          <table className="st-table">
            <thead><tr><th>Spot</th><th>Commune</th><th>Tags</th><th>Listes</th><th>Décision</th></tr></thead>
            <tbody>
              {shown.filter((r) => r.region === reg).map((r) => (
                <tr key={r.key} className={`is-${dec[r.key] || 'todo'}`}>
                  <td>
                    <b>{r.name}</b>{r.live && <span className="st-live">fiche en ligne</span>}
                    {r.alt && <small>ChatGPT : « {r.alt} »</small>}
                    {r.gptRegion && r.gptRegion !== r.region && REGION_MAP[r.gptRegion] !== r.region && <small>Territoire ChatGPT : {r.gptRegion}</small>}
                    {r.src === 'gpt' && REGION_MAP[r.gptRegion] && r.gptRegion !== r.region && <small>Territoire ChatGPT : {r.gptRegion}</small>}
                    {r.pitch && <small>{r.pitch}</small>}
                    {r.note && <small className="st-warn">{r.note}</small>}
                  </td>
                  <td>{r.commune}</td>
                  <td><div className="st-tags">{r.tags.map((t) => <span key={t}>{t}</span>)}</div></td>
                  <td className="st-src">
                    <span className={r.claude ? 'on' : ''}>Claude {r.claude ? `#${r.claude}` : '—'}</span>
                    <span className={r.gpt ? 'on gpt' : ''}>ChatGPT {r.gpt ? `#${r.gpt}` : '—'}</span>
                  </td>
                  <td>
                    <div className="st-dec">
                      {DECISIONS.map(([k, l]) => <button key={k} className={`d-${k} ${dec[r.key] === k ? 'is-on' : ''}`} onClick={() => decide(r.key, k)}>{l}</button>)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
      <p className="st-foot">Pour les spots communs, le pays et les tags sont ceux de la liste Claude ; le rang ChatGPT est son classement éditorial global (1 = le plus fort).</p>
    </div>
  );
}
