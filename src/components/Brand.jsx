import { useRef } from 'react';
import logoSvg from '../assets/logo-guideme.svg?raw';
import { DEFS, BACK, GLASS, BEAM_L, FLARE } from './brandAnim.js';
import '../brand-anim.css';

const BASE = import.meta.env.BASE_URL;

// Logo : phare de l'île Vierge et « GuideMe.bzh » (typo Mochiy Pop One, vectorisée).
// Les blancs suivent la couleur du texte (currentColor) pour fonctionner sur fond clair comme sur la barre noire.
// Survol : le feu du phare fait un tour (calques de lumière invisibles au repos, le SVG d'origine reste intact).
let LOGO = logoSvg
  .replace(/<svg width="296" height="56"/, '<svg class="brand-logo" width="148" height="28" role="img" aria-hidden="true" focusable="false"')
  .replace(/fill="#F2F2F2"/g, 'fill="currentColor"')
  .replace(/fill="#FEFEFE" fill-opacity="0.95"/g, 'fill="currentColor"')
  .replace(/fill="#909194"/g, 'fill="currentColor" fill-opacity="0.55"')
  .replace(/fill="#05070D"/g, 'style="fill:var(--logo-bg, #111)"')
  .replace(/stroke="#05070D"/g, 'style="stroke:var(--logo-bg, #111)"');
// Calques de lumière
LOGO = LOGO.replace(/(<svg[^>]*>)/, `$1${BACK}`);
LOGO = LOGO.replace(/(<path d="M14\.6118[^>]*\/>)/, `$1${GLASS}`);
{
  const a = LOGO.indexOf('<use xlink:href="#stroke0_38_2065"');
  const endTag = 'fill="url(#paint4_linear_38_2065)"/>';
  const b = LOGO.indexOf(endTag, a) + endTag.length;
  if (a > 0 && b > a) LOGO = `${LOGO.slice(0, a)}<g class="gmb-beam-r">${LOGO.slice(a, b)}</g>${BEAM_L}${FLARE}${LOGO.slice(b)}`;
}
LOGO = LOGO.replace(/<path d="(M219\.057[^"]*)" fill="#FFB900"\/>/, '<path class="gmb-starglow" d="$1" fill="#FFB900" filter="url(#gmb-sblur)"/><path d="$1" fill="url(#gmb-star)"/>');
LOGO = LOGO.replace('<defs>', `<defs>${DEFS}`);

export default function Brand() {
  const ref = useRef(null);
  // Un tour complet à chaque survol (pas de redémarrage en cours de tour)
  const spin = () => {
    const el = ref.current;
    if (!el || el.classList.contains('is-spinning')) return;
    el.classList.add('is-spinning');
    const beam = el.querySelector('.gmb-beam-r');
    const done = () => { el.classList.remove('is-spinning'); beam?.removeEventListener('animationend', done); };
    beam?.addEventListener('animationend', done);
  };
  return (
    <a className="brand" href={BASE} aria-label="GuideMe.bzh, accueil" ref={ref} onFocus={spin}>
      {/* Seul le logo déclenche le tour (pas toute la largeur de la barre) */}
      <span className="brand-svg" onMouseEnter={spin} dangerouslySetInnerHTML={{ __html: LOGO }} />
    </a>
  );
}
