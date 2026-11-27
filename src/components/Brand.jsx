import logoSvg from '../assets/logo-guideme.svg?raw';

const BASE = import.meta.env.BASE_URL;

// Logo : phare de l'île Vierge et « GuideMe.bzh » (typo Mochiy Pop One, vectorisée).
// Les blancs suivent la couleur du texte (currentColor) pour fonctionner sur fond clair comme sur la barre noire.
const LOGO = logoSvg
  .replace(/<svg width="296" height="56"/, '<svg class="brand-logo" width="148" height="28" role="img" aria-hidden="true" focusable="false"')
  .replace(/fill="#F2F2F2"/g, 'fill="currentColor"')
  .replace(/fill="#FEFEFE" fill-opacity="0.95"/g, 'fill="currentColor"')
  .replace(/fill="#909194"/g, 'fill="currentColor" fill-opacity="0.55"')
  .replace(/fill="#05070D"/g, 'style="fill:var(--logo-bg, #111)"')
  .replace(/stroke="#05070D"/g, 'style="stroke:var(--logo-bg, #111)"');

export default function Brand() {
  return (
    <a className="brand" href={BASE} aria-label="GuideMe.bzh, accueil">
      <span className="brand-svg" dangerouslySetInnerHTML={{ __html: LOGO }} />
    </a>
  );
}
