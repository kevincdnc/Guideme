import Hermine from './Hermine.jsx';

const BASE = import.meta.env.BASE_URL;

// Logo : hermine et « GuideMe » en blanc, « .bzh » en blanc à 50 %, sur le fond noir de la barre.
export default function Brand() {
  return (
    <a className="brand" href={BASE} aria-label="GuideMe.bzh, accueil">
      <Hermine height={26} className="brand-mark" />
      <span className="brand-name">GuideMe<span>.bzh</span></span>
    </a>
  );
}
