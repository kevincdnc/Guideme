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
  book: (<><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z" /><path d="M4 19V5" /></>),
  external: (<><path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" /></>),
  chevron: <path d="M9 6l6 6-6 6" />,
  cliff: (<><path d="M3 20h18" /><path d="M4 20l4-11 3 4 3-8 6 15" /></>),
  beach: (<><path d="M3 18c2 0 2-1.5 4.5-1.5S9.5 18 12 18s2.5-1.5 4.5-1.5S19 18 21 18" /><path d="M12 14V5" /><path d="M5 9a7 7 0 0114 0z" /></>),
  port: (<><circle cx="12" cy="5" r="2" /><path d="M12 7v13" /><path d="M5 13a7 7 0 0014 0" /><path d="M8 10h8" /></>),
  fire: <path d="M12 21c4 0 6-2.5 6-6 0-4-3-6-4-9-1 2-2 3-3 3 0-2 0-4-1-6-2 3-4 6-4 12 0 3.5 2 6 6 6z" />,
  // Hermine simplifiée (mise à l'échelle 66×100 → 24×24)
  hermine: (<g transform="translate(5.4 0) scale(0.24)" fill="currentColor" stroke="none"><path d="M32.4 0L39.4 14.1L32.4 28.2L25.5 14.1Z" /><path d="M0 32.4L14.1 25.5L28.2 32.4L14.1 39.4Z" /><path d="M37 32.4L51.1 25.5L65.2 32.4L51.1 39.4Z" /><path d="M32.8 37.5L54 82.5L43 79.5L32.7 100L22.3 79.5L11 82.5Z" /></g>),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
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
