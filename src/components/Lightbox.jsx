import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

// Visionneuse plein écran : balayage horizontal, flèches clavier, Échap pour fermer.
export default function Lightbox({ items, start, onClose }) {
  const [i, setI] = useState(start);
  const touch = useRef(null);
  const item = items[i];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setI((x) => Math.min(x + 1, items.length - 1));
      if (e.key === 'ArrowLeft') setI((x) => Math.max(x - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [items.length, onClose]);

  const onTouchStart = (e) => { touch.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (dx < -50) setI((x) => Math.min(x + 1, items.length - 1));
    if (dx > 50) setI((x) => Math.max(x - 1, 0));
    touch.current = null;
  };

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image en grand" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="lightbox-top">
        <span className="lightbox-count">{i + 1} / {items.length}</span>
        <button className="icon-btn icon-btn--dark" onClick={onClose} aria-label="Fermer"><Icon name="close" /></button>
      </div>
      <div className="lightbox-stage" onClick={onClose}>
        <img key={item.src} src={item.src} alt={item.caption} onClick={(e) => e.stopPropagation()} />
      </div>
      {i > 0 && (
        <button className="lightbox-nav lightbox-nav--prev" onClick={() => setI(i - 1)} aria-label="Image précédente"><Icon name="back" size={24} /></button>
      )}
      {i < items.length - 1 && (
        <button className="lightbox-nav lightbox-nav--next" onClick={() => setI(i + 1)} aria-label="Image suivante"><Icon name="chevron" size={24} /></button>
      )}
      <div className="lightbox-caption">
        {item.year && <span className="year-badge">{item.year}</span>}
        <p>{item.caption}</p>
        {item.page
          ? <a href={item.page} target="_blank" rel="noreferrer" className="credit-link">{item.credit} <Icon name="external" size={13} /></a>
          : <span className="credit-link">{item.credit}</span>}
      </div>
    </div>
  );
}
