// Labels et protections officielles d'un lieu, avec un logo simplifié par type.
// Données : place.protections (fiches du Cap Sizun) ou, pour les phares, la ligne « Protection ».
const TYPES = {
  'mh-classe': { label: 'Monument historique', sub: 'classé' },
  'mh-inscrit': { label: 'Monument historique', sub: 'inscrit' },
  'grand-site': { label: 'Grand Site de France' },
  'site-classe': { label: 'Site classé' },
  conservatoire: { label: 'Conservatoire du littoral' },
  pci: { label: 'Patrimoine culturel immatériel' },
  liberation: { label: 'Compagnon de la Libération' },
};

function Logo({ type }) {
  if (type.startsWith('mh')) return (
    // Labyrinthe, emblème des Monuments historiques (simplifié)
    <svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="#c8102e" strokeWidth="1.6">
      <path d="M12 1.5L22.5 12 12 22.5 1.5 12z" /><path d="M12 5.5L18.5 12 12 18.5 5.5 12z" /><path d="M12 9.2L14.8 12 12 14.8 9.2 12z" />
      <path d="M12 1.5v4M22.5 12h-4M12 22.5v-4M1.5 12h4" />
    </g></svg>
  );
  if (type === 'grand-site') return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="#0f766e" /><path d="M4.5 15.5l4.5-5 3 3.2 2.5-2.7 5 4.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="16" cy="7.5" r="1.6" fill="#fde68a" /></svg>
  );
  if (type === 'site-classe') return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" fill="#15803d" /><path d="M5 16l4-6 3 4 2-3 5 5z" fill="#fff" /></svg>
  );
  if (type === 'conservatoire') return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="#1d4ed8" /><path d="M4 13c2 0 2-1.6 4-1.6s2 1.6 4 1.6 2-1.6 4-1.6 2 1.6 4 1.6M4 16.5c2 0 2-1.6 4-1.6s2 1.6 4 1.6 2-1.6 4-1.6 2 1.6 4 1.6" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="7.5" r="2" fill="#fde68a" /></svg>
  );
  if (type === 'pci') return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="#7c3aed" /><path d="M12 5.5l1.6 4.6 4.9.2-3.9 3 1.4 4.7L12 15.3 7.9 18l1.4-4.7-3.9-3 4.9-.2z" fill="#fff" /></svg>
  );
  if (type === 'liberation') return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" fill="#14532d" /><path d="M12 4.5v15M8.5 8h7M7 11.5h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
  );
  return null;
}

// Phares : déduit de la ligne « Protection » de la carte d'identité
function fromLighthouse(p) {
  const t = p.lighthouse?.protection || '';
  const m = t.match(/(Classé|Inscrit) monument historique \((\d{4})\)/);
  return m ? [{ type: m[1] === 'Classé' ? 'mh-classe' : 'mh-inscrit', detail: m[2] }] : [];
}

export function protectionsOf(place) {
  return place.protections || fromLighthouse(place);
}

export function ProtectionBadges({ place }) {
  const list = protectionsOf(place);
  if (!list.length) return null;
  return (
    <ul className="prot-badges" aria-label="Labels et protections">
      {list.map((x) => {
        const t = TYPES[x.type];
        if (!t) return null;
        return (
          <li key={x.type + (x.detail || '')} className={`prot prot--${x.type}`}>
            <Logo type={x.type} />
            <span><b>{t.label}</b>{(t.sub || x.detail) && <small>{[t.sub, x.detail].filter(Boolean).join(' · ')}</small>}</span>
          </li>
        );
      })}
    </ul>
  );
}

// Texte de la bulle : « Monument historique classé depuis 2011 »
function tipOf(x) {
  const t = TYPES[x.type];
  const parts = String(x.detail || '').split(' · ');
  const year = (parts.find((p) => /\d{4}/.test(p)) || '').match(/\d{4}/)?.[0];
  const what = parts.filter((p) => p && !/\d{4}/.test(p)).join(', ');
  let txt = [t.label, t.sub].filter(Boolean).join(' ');
  if (year) txt += ` depuis ${year}`;
  if (what) txt += ` (${what})`;
  return txt;
}

// Pastilles à côté des boutons de la fiche (logo seul, bulle noire au survol)
export function ProtectionChips({ place }) {
  const list = protectionsOf(place).filter((x) => TYPES[x.type]);
  if (!list.length) return null;
  return list.map((x) => (
    <span key={x.type + (x.detail || '')} className={`prot-chip prot--${x.type}`} tabIndex={0} aria-label={tipOf(x)}>
      <Logo type={x.type} />
      <span className="prot-tip" role="tooltip">{tipOf(x)}</span>
    </span>
  ));
}
