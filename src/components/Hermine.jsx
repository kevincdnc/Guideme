// Hermine simplifiée (moucheture du Gwenn-ha-Du) : trois losanges et une queue à trois pointes.
export const HERMINE_VIEWBOX = '0 0 66 100';
export const HERMINE_PATHS = [
  'M32.4 0L39.4 14.1L32.4 28.2L25.5 14.1Z',
  'M0 32.4L14.1 25.5L28.2 32.4L14.1 39.4Z',
  'M37 32.4L51.1 25.5L65.2 32.4L51.1 39.4Z',
  'M32.8 37.5L54 82.5L43 79.5L32.7 100L22.3 79.5L11 82.5Z',
];

export default function Hermine({ height = 24, className, title }) {
  return (
    <svg viewBox={HERMINE_VIEWBOX} height={height} width={(height * 66) / 100} className={className} fill="currentColor" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {HERMINE_PATHS.map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
