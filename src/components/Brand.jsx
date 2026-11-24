const BASE = import.meta.env.BASE_URL;

export default function Brand() {
  return (
    <a className="brand" href={BASE} aria-label="guideme.bzh, accueil">
      <img src={`${BASE}icons/icon.svg`} alt="" width="34" height="34" />
      <span className="brand-name">guideme<span>.bzh</span></span>
    </a>
  );
}
