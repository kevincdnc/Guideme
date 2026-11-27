// Studio GuideMe.bzh (/admin) : back-office pour corriger les fiches, comparer les listes de spots
// et, plus tard, suivre l'audience. Pas de compte pour l'instant (un seul utilisateur).
import { useEffect, useMemo, useRef, useState } from 'react';
import { PLACES, REGIONS, TAGS } from '../data/places.js';
import logoSvg from '../assets/logo-guideme.svg?raw';
import { readDrafts, writeDrafts, pick } from './drafts.js';
import SpotsCompare from './SpotsCompare.jsx';

const BASE = import.meta.env.BASE_URL;
const LOGO = logoSvg.replace(/<svg width="296" height="56"/, '<svg width="124" height="24"');
const OPEN_REGIONS = ['cap-sizun']; // fiches éditables pour ce premier test
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export default function Studio() {
  const [tab, setTab] = useState(() => (location.hash.slice(1) || 'fiches'));
  useEffect(() => { history.replaceState(null, '', `#${tab}`); }, [tab]);
  return (
    <div className="st">
      <aside className="st-nav">
        <a className="st-logo" href={BASE} title="Voir le site"><span dangerouslySetInnerHTML={{ __html: LOGO }} /></a>
        <span className="st-kicker">Studio</span>
        <nav>
          {[['fiches', 'Fiches', 'M4 5h16M4 12h16M4 19h10'], ['spots', 'Liste des spots', 'M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z'], ['stats', 'Statistiques', 'M4 20V10M10 20V4M16 20v-7M22 20H2']].map(([id, label, d]) => (
            <button key={id} className={tab === id ? 'is-on' : ''} onClick={() => setTab(id)}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
              {label}
            </button>
          ))}
        </nav>
        <p className="st-nav-foot">Accès admin seul · page non référencée</p>
      </aside>
      <main className="st-main">
        {tab === 'fiches' && <Fiches />}
        {tab === 'spots' && <SpotsCompare />}
        {tab === 'stats' && <Stats />}
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ Fiches */
function Fiches() {
  const [drafts, setDrafts] = useState(readDrafts);
  const [id, setId] = useState(() => new URLSearchParams(location.search).get('fiche') || REGIONS.find((r) => r.id === 'cap-sizun').ids[0]);
  const place = PLACES.find((p) => p.id === id);
  const original = useMemo(() => pick(place), [place]);
  const value = drafts[id] ? { ...original, ...drafts[id] } : original;
  const dirty = (pid) => !!drafts[pid];

  const update = (next) => {
    const d = { ...drafts };
    const diff = Object.fromEntries(Object.entries(next).filter(([k, v]) => !same(v, original[k])));
    if (Object.keys(diff).length) d[id] = diff; else delete d[id];
    setDrafts(d); writeDrafts(d);
  };
  const set = (k, v) => update({ ...value, [k]: v });
  const reset = () => { if (confirm('Annuler toutes les modifications de cette fiche ?')) { const d = { ...drafts }; delete d[id]; setDrafts(d); writeDrafts(d); } };

  // Aperçu : la vraie page du site, avec les brouillons appliqués
  const frame = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => { try { frame.current?.contentWindow?.location.reload(); } catch { /* ignore */ } }, 700);
    return () => clearTimeout(t);
  }, [drafts[id]]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="st-fiches">
      <div className="st-list">
        <h2>Fiches</h2>
        {REGIONS.map((r) => {
          const open = OPEN_REGIONS.includes(r.id);
          return (
            <section key={r.id} className={open ? '' : 'is-locked'}>
              <h3>{r.label}{!open && <em>bientôt</em>}</h3>
              {r.ids.map((pid) => {
                const p = PLACES.find((x) => x.id === pid);
                return (
                  <button key={pid} disabled={!open} className={`st-item ${pid === id ? 'is-on' : ''}`} onClick={() => setId(pid)}>
                    <span>{p.shortTitle}</span>{dirty(pid) && <i className="st-dot" title="Modifications non publiées" />}
                  </button>
                );
              })}
            </section>
          );
        })}
      </div>

      <div className="st-editor">
        <header className="st-bar">
          <div>
            <h1>{value.shortTitle}</h1>
            <p>{dirty(id) ? <span className="st-pill st-pill--draft">Brouillon enregistré dans ce navigateur</span> : <span className="st-pill">À jour avec le site</span>}</p>
          </div>
          <div className="st-actions">
            {dirty(id) && <button className="st-btn st-btn--ghost" onClick={reset}>Annuler les modifications</button>}
            <a className="st-btn st-btn--ghost" href={`${BASE}lieu/${id}/`} target="_blank" rel="noreferrer">Voir en ligne</a>
            <button className="st-btn st-btn--primary" disabled title="La publication sera branchée à l'étape suivante">Publier</button>
          </div>
        </header>

        <div className="st-form">
          <Group title="Identité" changed={['title', 'shortTitle', 'commune', 'tags'].some((k) => !same(value[k], original[k]))}>
            <Text label="Titre de la fiche" value={value.title} onChange={(v) => set('title', v)} />
            <div className="st-row">
              <Text label="Titre court (cartes, carte)" value={value.shortTitle} onChange={(v) => set('shortTitle', v)} />
              <Text label="Commune" value={value.commune} onChange={(v) => set('commune', v)} />
            </div>
            <label className="st-field"><span>Catégories</span>
              <div className="st-chips">
                {TAGS.map((t) => {
                  const on = value.tags?.includes(t.id);
                  return <button key={t.id} type="button" className={on ? 'is-on' : ''} onClick={() => set('tags', on ? value.tags.filter((x) => x !== t.id) : [...(value.tags || []), t.id])}>{t.label}</button>;
                })}
              </div>
            </label>
          </Group>

          <Group title="Accroche" changed={!same(value.teaser, original.teaser)}>
            <Teaser value={value.teaser} onChange={(v) => set('teaser', v)} />
          </Group>

          <Group title="Photo principale" changed={!same(value.hero, original.hero)}>
            <div className="st-hero">
              {value.hero?.src && <img src={value.hero.src} alt="" />}
              <div>
                <Text label="Adresse de l'image (Wikimedia Commons)" value={value.hero?.src} onChange={(v) => set('hero', { ...value.hero, src: v })} />
                <Text label="Description (alt)" value={value.hero?.alt} onChange={(v) => set('hero', { ...value.hero, alt: v })} />
                <Text label="Crédit : auteur, licence" value={value.hero?.credit} onChange={(v) => set('hero', { ...value.hero, credit: v })} />
              </div>
            </div>
          </Group>

          <Group title="Chiffres clés" hint="Les 3 premiers s'affichent en compteurs." changed={!same(value.facts, original.facts)}>
            <List items={value.facts} onChange={(v) => set('facts', v)} empty={{ value: '', label: '' }}
              fields={[{ k: 'value', label: 'Chiffre', w: 140 }, { k: 'label', label: 'Libellé' }, { k: 'info', label: 'Bulle d\'info (facultatif)' }]} />
          </Group>

          <Group title="Le saviez-vous ?" changed={!same(value.funFact, original.funFact)}>
            <Text label="Titre" value={value.funFact?.title} onChange={(v) => set('funFact', { ...value.funFact, title: v })} />
            <Text label="Texte" area value={value.funFact?.text} onChange={(v) => set('funFact', { ...value.funFact, text: v })} />
          </Group>

          {value.records && (
            <Group title="Records" changed={!same(value.records, original.records)}>
              <List items={value.records} onChange={(v) => set('records', v)} empty={{ medal: 'bronze', scope: '', title: '', text: '' }}
                fields={[{ k: 'medal', label: 'Médaille', w: 120, options: ['or', 'argent', 'bronze'] }, { k: 'scope', label: 'Portée', w: 160 }, { k: 'title', label: 'Titre' }, { k: 'text', label: 'Texte court', area: true }, { k: 'more', label: 'En savoir plus (facultatif)', area: true }]} />
            </Group>
          )}

          {value.sections?.map((s, si) => (
            <Group key={s.id} title={s.title} hint={s.anecdotes ? 'Anecdotes' : 'Partie du récit'} changed={!same(s, original.sections?.[si])}>
              <Text label="Titre de la partie" value={s.title} onChange={(v) => set('sections', value.sections.map((x, i) => (i === si ? { ...x, title: v } : x)))} />
              {s.paragraphs && (
                <div className="st-paras">
                  {s.paragraphs.map((p, pi) => (
                    <div key={pi} className="st-para">
                      <Text label={`Paragraphe ${pi + 1}`} area value={p} onChange={(v) => set('sections', value.sections.map((x, i) => (i === si ? { ...x, paragraphs: x.paragraphs.map((y, j) => (j === pi ? v : y)) } : x)))} />
                      <button className="st-x" title="Supprimer ce paragraphe" onClick={() => set('sections', value.sections.map((x, i) => (i === si ? { ...x, paragraphs: x.paragraphs.filter((_, j) => j !== pi) } : x)))}>×</button>
                    </div>
                  ))}
                  <button className="st-add" onClick={() => set('sections', value.sections.map((x, i) => (i === si ? { ...x, paragraphs: [...x.paragraphs, ''] } : x)))}>+ Ajouter un paragraphe</button>
                </div>
              )}
              {s.anecdotes && (
                <List items={s.anecdotes} onChange={(v) => set('sections', value.sections.map((x, i) => (i === si ? { ...x, anecdotes: v } : x)))} empty={{ title: '', text: '' }}
                  fields={[{ k: 'title', label: 'Titre' }, { k: 'text', label: 'Texte', area: true }]} />
              )}
            </Group>
          ))}

          {value.practical && (
            <Group title="Infos pratiques" changed={!same(value.practical, original.practical)}>
              <List items={value.practical} onChange={(v) => set('practical', v)} empty={{ icon: 'hike', title: '', text: '' }}
                fields={[{ k: 'title', label: 'Titre', w: 200 }, { k: 'text', label: 'Texte', area: true }]} />
            </Group>
          )}

          <Group title="Sources" hint="Obligatoires : chaque fait doit être sourcé." changed={!same(value.sources, original.sources)}>
            <List items={value.sources || []} onChange={(v) => set('sources', v)} empty={{ label: '', url: '' }}
              fields={[{ k: 'label', label: 'Source' }, { k: 'url', label: 'Lien' }]} />
          </Group>
        </div>
      </div>

      <div className="st-preview">
        <div className="st-phone">
          <iframe ref={frame} title="Aperçu de la fiche" src={`${BASE}lieu/${id}/?preview=1`} key={id} />
        </div>
        <p>Aperçu en direct, avec tes modifications</p>
      </div>
    </div>
  );
}

function Group({ title, hint, changed, children }) {
  const [open, setOpen] = useState(true);
  return (
    <section className={`st-group ${open ? 'is-open' : ''}`}>
      <button className="st-group-head" onClick={() => setOpen((o) => !o)}>
        <b>{title}</b>{hint && <small>{hint}</small>}{changed && <span className="st-pill st-pill--draft">modifié</span>}
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && <div className="st-group-body">{children}</div>}
    </section>
  );
}

function Text({ label, value, onChange, area }) {
  const ref = useRef(null);
  useEffect(() => { if (area && ref.current) { ref.current.style.height = 'auto'; ref.current.style.height = `${ref.current.scrollHeight + 2}px`; } }, [value, area]);
  return (
    <label className="st-field"><span>{label}</span>
      {area ? <textarea ref={ref} rows={2} value={value || ''} onChange={(e) => onChange(e.target.value)} />
        : <input value={value || ''} onChange={(e) => onChange(e.target.value)} />}
    </label>
  );
}

// Accroche : règles éditoriales (tutoiement, 2 à 3 phrases courtes, invitation finale)
function Teaser({ value = '', onChange }) {
  const sentences = value.split(/(?<=[.!?…])\s+/).filter((s) => s.trim()).length;
  const tu = /\b(tu|te|ton|ta|tes|toi)\b|\bt'/i.test(value);
  const checks = [
    [tu, 'Tutoiement'],
    [sentences >= 2 && sentences <= 3, `${sentences} phrase${sentences > 1 ? 's' : ''} (2 à 3 attendues)`],
    [value.length <= 260, `${value.length} caractères (260 max conseillé)`],
  ];
  return (
    <>
      <Text label="Accroche (2 à 3 phrases, tutoiement, finir par une invitation)" area value={value} onChange={onChange} />
      <ul className="st-checks">{checks.map(([ok, t]) => <li key={t} className={ok ? 'ok' : 'ko'}>{ok ? '✓' : '!'} {t}</li>)}</ul>
    </>
  );
}

// Liste d'éléments éditables (chiffres clés, records, sources…)
function List({ items = [], onChange, fields, empty }) {
  const move = (i, d) => { const a = [...items]; const [x] = a.splice(i, 1); a.splice(i + d, 0, x); onChange(a); };
  return (
    <div className="st-items">
      {items.map((it, i) => (
        <div key={i} className="st-li">
          <div className="st-li-fields">
            {fields.map((f) => (
              f.options ? (
                <label key={f.k} className="st-field" style={{ flex: `0 0 ${f.w}px` }}><span>{f.label}</span>
                  <select value={it[f.k] || ''} onChange={(e) => onChange(items.map((x, j) => (j === i ? { ...x, [f.k]: e.target.value } : x)))}>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
                </label>
              ) : (
                <div key={f.k} style={f.w ? { flex: `0 0 ${f.w}px` } : { flex: f.area ? '1 1 100%' : 1 }}>
                  <Text label={f.label} area={f.area} value={it[f.k]} onChange={(v) => onChange(items.map((x, j) => (j === i ? { ...x, [f.k]: v || undefined } : x)))} />
                </div>
              )
            ))}
          </div>
          <div className="st-li-tools">
            <button disabled={i === 0} onClick={() => move(i, -1)} title="Monter">↑</button>
            <button disabled={i === items.length - 1} onClick={() => move(i, 1)} title="Descendre">↓</button>
            <button onClick={() => onChange(items.filter((_, j) => j !== i))} title="Supprimer">×</button>
          </div>
        </div>
      ))}
      <button className="st-add" onClick={() => onChange([...items, { ...empty }])}>+ Ajouter</button>
    </div>
  );
}

/* ------------------------------------------------------------------ Stats */
function Stats() {
  const live = PLACES.filter((p) => p.available);
  const words = live.reduce((n, p) => n + (p.sections || []).flatMap((s) => [...(s.paragraphs || []), ...(s.anecdotes || []).map((a) => a.text)]).join(' ').split(/\s+/).length, 0);
  const photos = live.reduce((n, p) => n + (p.photos?.length || 0) + (p.archives?.length || 0) + (p.hero ? 1 : 0), 0);
  const sources = live.reduce((n, p) => n + (p.sources?.length || 0), 0);
  return (
    <div className="st-page">
      <h1>Statistiques</h1>
      <div className="st-empty">
        <b>Audience</b>
        <p>Visites, fiches les plus lues, lieux cochés… Cet onglet affichera le trafic de l'application dès qu'un outil de mesure sera branché.</p>
      </div>
      <h2>Contenu</h2>
      <div className="st-kpis">
        {[[live.length, 'fiches en ligne'], [REGIONS.length, 'régions'], [words.toLocaleString('fr-FR'), 'mots rédigés'], [photos, 'photos et archives'], [sources, 'sources citées']].map(([v, l]) => (
          <div key={l} className="st-kpi"><b>{v}</b><span>{l}</span></div>
        ))}
      </div>
    </div>
  );
}
