// Icônes au trait (24 × 24), dessinées pour l'app.
const PATHS = {
  back: <path d="M15 18l-6-6 6-6" />,
  close: <path d="M18 6L6 18M6 6l12 12" />,
  play: <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" stroke="none" />,
  pause: (<><rect x="6.5" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" /><rect x="13.5" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" /></>),
  next: (<><path d="M6 5l9 7-9 7z" fill="currentColor" stroke="none" /><path d="M18 5v14" /></>),
  prev: (<><path d="M18 5l-9 7 9 7z" fill="currentColor" stroke="none" /><path d="M6 5v14" /></>),
  headphones: (<><path d="M4 15v-3a8 8 0 0116 0v3" /><rect x="3" y="14" width="5" height="7" rx="2" /><rect x="16" y="14" width="5" height="7" rx="2" /></>),
  share: (<><path d="M12 3v12" /><path d="M7 8l5-5 5 5" /><path d="M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6" /></>),
  pin: (<><path d="M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>),
  route: (<><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M8 19h7a3.5 3.5 0 000-7H9a3.5 3.5 0 010-7h7" /></>),
  locate: (<><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /><circle cx="12" cy="12" r="7.5" /></>),
  layers: (<><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>),
  list: (<><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1" fill="currentColor" /><circle cx="4.5" cy="12" r="1" fill="currentColor" /><circle cx="4.5" cy="18" r="1" fill="currentColor" /></>),
  map: (<><path d="M9 4L3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5z" /><path d="M9 4v13.5M15 6.5V20" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  lock: (<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></>),
  car: (<><path d="M5 16V11l2-5h10l2 5v5" /><path d="M3 16h18v3H3z" /><circle cx="7.5" cy="13.5" r=".8" fill="currentColor" /><circle cx="16.5" cy="13.5" r=".8" fill="currentColor" /></>),
  bus: (<><rect x="4" y="3" width="16" height="15" rx="3" /><path d="M4 11h16M7 21v-3M17 21v-3" /><circle cx="8" cy="14.5" r=".8" fill="currentColor" /><circle cx="16" cy="14.5" r=".8" fill="currentColor" /></>),
  hike: (<><circle cx="13" cy="4" r="2" /><path d="M10 21l2-6 3 3v3M9 12l2-4 4 2 2 3M11 8l-2 5" /></>),
  warn: (<><path d="M12 3l10 18H2z" /><path d="M12 10v5M12 18v.5" /></>),
  image: (<><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5-9 9" /></>),
  film: (<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" /></>),
  spark: <path d="M12 3l2.2 6.3L20.5 12l-6.3 2.2L12 20.5l-2.2-6.3L3.5 12l6.3-2.7z" />,
  book: (<><path d="M3.5 9L12 4.5 20.5 9z" /><path d="M6 12v5.5M10 12v5.5M14 12v5.5M18 12v5.5" /><path d="M3.5 20.5h17" /></>),
  external: (<><path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" /></>),
  chevron: <path d="M9 6l6 6-6 6" />,
  cliff: (<><path d="M3 20h18" /><path d="M4 20l4-11 3 4 3-8 6 15" /></>),
  beach: (<><path d="M3 18c2 0 2-1.5 4.5-1.5S9.5 18 12 18s2.5-1.5 4.5-1.5S19 18 21 18" /><path d="M12 14V5" /><path d="M5 9a7 7 0 0114 0z" /></>),
  port: (<><circle cx="12" cy="5" r="2" /><path d="M12 7v13" /><path d="M5 13a7 7 0 0014 0" /><path d="M8 10h8" /></>),
  church: (<><path d="M12 2v4M10 4h4" /><path d="M7 21V11l5-4 5 4v10" /><path d="M4 21h16" /><path d="M10 21v-4a2 2 0 014 0v4" /></>),
  fire: <path d="M12 21c4 0 6-2.5 6-6 0-4-3-6-4-9-1 2-2 3-3 3 0-2 0-4-1-6-2 3-4 6-4 12 0 3.5 2 6 6 6z" />,
  // Hermine simplifiée (mise à l'échelle 66×100 → 24×24)
  hermine: (<g transform="translate(5.4 0) scale(0.24)" fill="currentColor" stroke="none"><path d="M32.4 0L39.4 14.1L32.4 28.2L25.5 14.1Z" /><path d="M0 32.4L14.1 25.5L28.2 32.4L14.1 39.4Z" /><path d="M37 32.4L51.1 25.5L65.2 32.4L51.1 39.4Z" /><path d="M32.8 37.5L54 82.5L43 79.5L32.7 100L22.3 79.5L11 82.5Z" /></g>),
  // Médaille : ruban et disque étoilé
  medal: (<><path d="M8 2l3 6M16 2l-3 6" /><circle cx="12" cy="15" r="6" /><path d="M12 12l.9 1.9 2 .2-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.2z" fill="currentColor" stroke="none" /></>),
  // Coupe pleine (records) : lisible en petit, sans contour
  trophySolid: <path fill="currentColor" stroke="none" d="M7 3h10v1.5h2.2c.7 0 1.3.6 1.3 1.3v1.4a4.2 4.2 0 0 1-3.9 4.2A5.6 5.6 0 0 1 13 14.9v2.6h2.6c.5 0 .9.4.9.9V21h-9v-2.6c0-.5.4-.9.9-.9H11v-2.6a5.6 5.6 0 0 1-3.6-3.5A4.2 4.2 0 0 1 3.5 7.2V5.8c0-.7.6-1.3 1.3-1.3H7V3zm0 3.3H5.3v.9a2.4 2.4 0 0 0 1.8 2.3A8 8 0 0 1 7 8.5V6.3zm10 0v2.2c0 .3 0 .7-.1 1A2.4 2.4 0 0 0 18.7 7.2v-.9H17z" />,
  trophy: (<><path d="M8 4h8v5a4 4 0 01-8 0z" /><path d="M8 6H5a3 3 0 003 4M16 6h3a3 3 0 01-3 4" /><path d="M12 13v4M9 21h6M10 17h4v4h-4z" /></>),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  minus: <path d="M5 12h14" />,
  navigate: <path d="M3.78 11.07a1.5 1.5 0 0 1 .1-2.79l14.5-5.22a1.5 1.5 0 0 1 1.92 1.93l-5.22 14.5a1.5 1.5 0 0 1-2.79.1l-2.55-5.95-5.96-2.57Z" fill="currentColor" stroke="none" />,
  // Réglages : roue dentée pleine (dessin fourni, grille 18 recadrée en 24)
  gear: <path transform="translate(3.4 3.4)" fillRule="evenodd" clipRule="evenodd" fill="currentColor" stroke="none" d="M6.98196 15.4471L6.51432 14.4109C6.34771 14.0411 6.06631 13.7329 5.71063 13.5306C5.35474 13.3283 4.94303 13.2422 4.53443 13.2845L3.39023 13.4045C3.04966 13.4397 2.70601 13.377 2.40086 13.2239C2.09572 13.0708 1.84214 12.8338 1.67082 12.5417C1.49945 12.2496 1.4178 11.9147 1.43579 11.5778C1.45378 11.2409 1.57064 10.9163 1.77217 10.6435L2.44962 9.72645C2.69122 9.3991 2.82132 9.00475 2.82124 8.60001C2.82132 8.19527 2.69122 7.80091 2.44962 7.47357L1.77217 6.55647C1.57064 6.28369 1.45378 5.95915 1.43579 5.62222C1.4178 5.28528 1.49945 4.95045 1.67082 4.65834C1.84197 4.36606 2.09552 4.12897 2.40071 3.97582C2.7059 3.82268 3.04963 3.76006 3.39023 3.79555L4.53798 3.91556C4.94659 3.95784 5.3583 3.87168 5.71418 3.66942C6.06854 3.46658 6.34864 3.15843 6.51432 2.78912L6.98196 1.7529C7.12098 1.44444 7.34785 1.18236 7.63505 0.998424C7.92226 0.814493 8.25747 0.71662 8.60002 0.716675C8.94257 0.71662 9.27777 0.814493 9.56498 0.998424C9.85219 1.18236 10.0791 1.44444 10.2181 1.7529L10.6893 2.78912C10.855 3.15843 11.135 3.46658 11.4894 3.66942C11.8453 3.87168 12.257 3.95784 12.6656 3.91556L13.8098 3.79555C14.1504 3.76006 14.4941 3.82268 14.7993 3.97582C15.1045 4.12897 15.3581 4.36606 15.5292 4.65834C15.7006 4.95045 15.7822 5.28528 15.7642 5.62222C15.7462 5.95915 15.6294 6.28369 15.4279 6.55647L14.7504 7.47357C14.5088 7.80091 14.3787 8.19527 14.3788 8.60001C14.3767 9.00585 14.5056 9.40185 14.7469 9.73083L15.4243 10.6479C15.6258 10.9207 15.7427 11.2453 15.7607 11.5822C15.7787 11.9191 15.697 12.2539 15.5257 12.5461C15.3545 12.8383 15.101 13.0754 14.7958 13.2286C14.4906 13.3817 14.1468 13.4443 13.8062 13.4088L12.6621 13.2888C12.2534 13.2466 11.8417 13.3327 11.4858 13.535C11.1322 13.7367 10.8522 14.0432 10.6857 14.4109L10.2181 15.4471C10.0791 15.7556 9.85219 16.0177 9.56498 16.2016C9.27777 16.3855 8.94257 16.4834 8.60002 16.4833C8.25747 16.4834 7.92226 16.3855 7.63505 16.2016C7.34785 16.0177 7.12098 15.7556 6.98196 15.4471ZM10.75 8.60001C10.75 9.78742 9.78743 10.75 8.60002 10.75C7.4126 10.75 6.45002 9.78742 6.45002 8.60001C6.45002 7.4126 7.4126 6.45001 8.60002 6.45001C9.78743 6.45001 10.75 7.4126 10.75 8.60001Z" />,
  // Catégories (icônes v2 : linéaires, arrondies, lisibles en petit)
  tNature: (<><path d="M3.5 15.5l5-7.5 3.2 4.3L15.5 6l5 9.5z" /><path d="M3 20c3-1.9 6-1.9 9 0s6 1.9 9 0" /></>),
  tPhare: (<><path d="M8.6 20.5L10 11h4l1.4 9.5" /><path d="M7 20.5h10" /><path d="M9 11h6" /><path d="M10.2 11V8h3.6v3" /><path d="M10.2 8a1.8 1.8 0 013.6 0" /><path d="M5 6.5l2.6.9M19 6.5l-2.6.9" /></>),
  tPatrimoine: (<><path d="M5.5 20.5v-8.5L12 7l6.5 5v8.5" /><path d="M4 20.5h16" /><path d="M12 2.5v4M10.4 4.2h3.2" /><path d="M10 20.5v-3a2 2 0 014 0v3" /></>),
  tLegende: (<><path d="M8 4h8v5.5a4 4 0 01-8 0z" /><path d="M8 6H6a2 2 0 000 4h2.3M16 6h2a2 2 0 010 4h-2.3" /><path d="M12 13.5v3.5" /><path d="M8.5 20.5h7" /><path d="M10 17h4l.6 3.5h-5.2z" /></>),
  tPlage: (<><path d="M4 11.5a8 8 0 0116 0z" /><path d="M12 3.5v-.5" /><path d="M12 11.5v6" /><path d="M3 20.5c3-1.9 6-1.9 9 0s6 1.9 9 0" /></>),
  tPort: (<><path d="M12 7v13.5" /><path d="M8.5 10.5h7" /><path d="M5 13.5a7 7 0 0014 0" /><path d="M3.5 15l1.5-1.5 1.5 1.5M17.5 15l1.5-1.5 1.5 1.5" /><circle cx="12" cy="4.8" r="2.2" /></>),
  tPrehistoire: (<><path d="M3.8 8.7c0-1.7 3.7-2.7 8.2-2.7s8.2 1 8.2 2.7-3.7 2.6-8.2 2.6-8.2-.9-8.2-2.6z" /><path d="M6.6 20l1-8.7h3l.3 8.7z" /><path d="M13.1 20l.3-8.7h3l1 8.7z" /></>),
  plus: <path d="M12 5v14M5 12h14" />,
  // Ampoule : idée, « Le saviez-vous ? »
  bulb: (<><path d="M9 17.5h6M10 20.5h4" /><path d="M12 3a6 6 0 00-3.6 10.8c.7.6 1.1 1.4 1.1 2.2v1.5h5V16c0-.8.4-1.6 1.1-2.2A6 6 0 0012 3z" /><path d="M12 7.5v3.2M10.4 9.2h3.2" opacity=".6" /></>),
  // Punaise : tête plate, corps évasé, pointe
  pushpin: (<><path d="M9 3.5h6" /><path d="M10 3.5l-.5 5.2-2.7 2.8v1.2h10.4v-1.2l-2.7-2.8-.5-5.2" /><path d="M12 12.7v7.8" /></>),
  calendar: (<><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>),
  ruler: (<><path d="M12 3v18" /><path d="M8.5 6l3.5-3 3.5 3M8.5 18l3.5 3 3.5-3" /></>),
  beam: (<><circle cx="5.5" cy="12" r="2.5" /><path d="M10 12h10M10 9l9-4M10 15l9 4" /></>),
  users: (<><circle cx="9" cy="8.5" r="3.2" /><path d="M3 20c.9-3.2 3.2-5 6-5s5.1 1.8 6 5" /><path d="M15.5 5.6a3.2 3.2 0 010 5.8M17.5 15.4c1.6.7 2.8 2.3 3.5 4.6" /></>),
  stairs: <path d="M4 20h4v-4h4v-4h4V8h4" />,
  area: (<><rect x="4" y="4" width="16" height="16" rx="1.5" /><path d="M4 9h16M9 4v16" opacity=".55" /></>),
  hourglass: (<><path d="M6.5 3h11M6.5 21h11" /><path d="M7.5 3c0 5 9 5 9 9s-9 4-9 9M16.5 3c0 5-9 5-9 9s9 4 9 9" /></>),
  wave: <path d="M3 9c2 0 2-1.6 4.5-1.6S9.5 9 12 9s2.5-1.6 4.5-1.6S19 9 21 9M3 15c2 0 2-1.6 4.5-1.6S9.5 15 12 15s2.5-1.6 4.5-1.6S19 15 21 15" />,
  sliders: (<><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></>),
  // Drapeau planté (« je veux y aller » / « j'y suis allé »)
  flag: (<><path d="M6 21V4" /><path d="M6 4.5c2.6-1.4 5-.2 7 .8s4.2 1.6 6-.3v8.4c-1.8 1.9-4 1.3-6 .3s-4.4-2.2-7-.8" /></>),
  star: <path d="M12 3.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.9l-5.25 2.7 1-5.8L3.5 9.7l5.9-.9z" />,
  user: (<><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" /></>),
  // Bigouden : coiffe haute, rubans, nœud aux épaules, robe
  bigouden: (<><path d="M9.6 2.2h4.8l-1.5 5.6h-1.8z" /><circle cx="12" cy="9.6" r="1.9" /><path d="M13.6 8.6l3.6 1.4M13.4 9.6l2.2 1.6" /><path d="M6.4 13.6c1.9-1.3 3.7-1.9 5.6-1.9s3.7.6 5.6 1.9c-1.3.6-2.4.7-3.4.3M6.4 13.6c1.3.6 2.4.7 3.4.3" /><path d="M10.6 12.4L7.2 21.6c3.2-.9 6.4-.9 9.6 0l-3.4-9.2" /></>),
  search: (<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></>),
  grid: (<><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>),
  lighthouse: (<><path d="M10 4.5h4v3.5h-4z" /><path d="M10.5 4.5Q12 2.2 13.5 4.5" /><path d="M8 9h8" /><path d="M9.3 9.5L8.4 20h7.2l-.9-10.5" /><path d="M8.9 14.5h6.2" /><path d="M6 20.5h12" /><path d="M16.5 5.2l3.5-1.4M16.5 7.3l3.5 1.4M7.5 5.2L4 3.8M7.5 7.3L4 8.7" /></>),
};

export default function Icon({ name, size = 20, stroke = 2, className, style }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
