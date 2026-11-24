import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import Lightbox from './Lightbox.jsx';
import { useSpeech } from '../hooks/useSpeech.js';

// Texte lu à voix haute : titre, puis chaque paragraphe et chaque anecdote.
function buildBlocks(place) {
  const blocks = [];
  place.sections.forEach((s) => {
    if (s.paragraphs) {
      s.paragraphs.forEach((p, i) => {
        const intro = i === 0 ? `${blocks.length === 0 ? place.title.replace('&', 'et') + '. ' : ''}${s.title}. ` : '';
        blocks.push({ id: `${s.id}-${i}`, section: s.id, label: s.title, text: intro + p });
      });
    }
    if (s.anecdotes) {
      s.anecdotes.forEach((a, i) => {
        blocks.push({ id: `${s.id}-${i}`, section: s.id, label: a.title, text: `${i === 0 ? s.title + '. ' : ''}${a.title}. ${a.text}` });
      });
    }
  });
  return blocks;
}

const RATES = [1, 1.25, 1.5, 0.85];

function AudioPlayer({ speech, blocks, title }) {
  const { supported, error, state, index, rate, play, pause, next, prev, changeRate, stop } = speech;
  if (!supported) return null;
  const active = state !== 'idle';
  const cur = blocks[index];
  const progress = active ? (index + (state === 'playing' ? 0.5 : 0)) / blocks.length : 0;
  return (
    <div className={`player ${active ? 'is-active' : ''}`} role="region" aria-label="Lecture audio">
      {error && <p className="player-error" role="alert">{error}</p>}
      {active && <div className="player-progress" style={{ transform: `scaleX(${Math.max(progress, 0.02)})` }} />}
      <button
        className="player-main"
        onClick={() => (state === 'playing' ? pause() : play())}
        aria-label={state === 'playing' ? 'Mettre en pause' : 'Écouter le guide'}
      >
        <Icon name={state === 'playing' ? 'pause' : 'play'} size={22} />
      </button>
      <div className="player-text">
        {active ? (
          <>
            <span className="player-kicker">{state === 'playing' ? 'En lecture' : 'En pause'} · {index + 1}/{blocks.length}</span>
            <span className="player-title">{cur?.label}</span>
          </>
        ) : (
          <>
            <span className="player-kicker"><Icon name="headphones" size={13} /> Guide audio</span>
            <span className="player-title">Écouter « {title} »</span>
          </>
        )}
      </div>
      {active ? (
        <div className="player-ctrls">
          <button className="player-btn" onClick={prev} aria-label="Paragraphe précédent"><Icon name="prev" size={18} /></button>
          <button className="player-btn" onClick={next} aria-label="Paragraphe suivant"><Icon name="next" size={18} /></button>
          <button className="player-rate" onClick={() => changeRate(RATES[(RATES.indexOf(rate) + 1) % RATES.length])} aria-label="Vitesse de lecture">
            {String(rate).replace('.', ',')}×
          </button>
          <button className="player-btn" onClick={stop} aria-label="Arrêter la lecture"><Icon name="close" size={18} /></button>
        </div>
      ) : (
        <span className="player-duration"><Icon name="clock" size={14} /> 7 min</span>
      )}
    </div>
  );
}

function Gallery({ items, onOpen, variant }) {
  return (
    <div className={`gallery gallery--${variant}`}>
      {items.map((it, i) => (
        <figure key={it.src} className="gallery-item">
          <button className="gallery-btn" onClick={() => onOpen(i)} aria-label={`Agrandir : ${it.caption}`}>
            <img src={it.src} alt={it.caption} loading="lazy" decoding="async" />
            {it.year && <span className="year-badge year-badge--on-img">{it.year}</span>}
          </button>
          <figcaption>
            <span>{it.caption}</span>
            <small>{it.credit}</small>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Guide({ place, onClose }) {
  const blocks = useMemo(() => buildBlocks(place), [place]);
  const speech = useSpeech(blocks);
  const scroller = useRef(null);
  const heroRef = useRef(null);
  const [compact, setCompact] = useState(false);
  const [lightbox, setLightbox] = useState(null); // { items, start }
  const [activeNav, setActiveNav] = useState(null);
  const currentId = speech.state !== 'idle' ? blocks[speech.index]?.id : null;

  // En-tête compact quand l'image d'en-tête sort de l'écran
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setCompact(!e.isIntersecting), { root: scroller.current, threshold: 0, rootMargin: '-64px 0px 0px 0px' });
    if (heroRef.current) io.observe(heroRef.current);
    return () => io.disconnect();
  }, []);

  // Section active dans la barre de navigation
  useEffect(() => {
    const els = scroller.current.querySelectorAll('[data-nav]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.dataset.nav); });
    }, { root: scroller.current, rootMargin: '-30% 0px -60% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Le paragraphe lu reste visible
  useEffect(() => {
    if (!currentId) return;
    const el = scroller.current.querySelector(`[data-block="${currentId}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentId]);

  const nav = [
    ...place.sections.map((s) => ({ id: s.id, label: s.nav })),
    { id: 'reperes', label: 'Repères' },
    { id: 'archives', label: 'Archives' },
    ...(place.videos?.length ? [{ id: 'videos', label: 'Vidéos' }] : []),
    { id: 'pratique', label: 'Pratique' },
  ];

  const goTo = (id) => {
    const el = scroller.current.querySelector(`#sec-${id}`);
    if (el) scroller.current.scrollTo({ top: el.offsetTop - 104, behavior: 'smooth' });
  };

  const share = async () => {
    const data = { title: `${place.title} · guideme.bzh`, text: place.teaser, url: location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(location.href); alert('Lien copié'); }
    } catch (e) { /* partage annulé */ }
  };

  const [lon, lat] = place.coords;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;

  const readFrom = (blockId) => {
    const i = blocks.findIndex((b) => b.id === blockId);
    if (i >= 0) speech.play(i);
  };

  return (
    <article className="guide" aria-label={place.title}>
      <div className={`guide-bar ${compact ? 'is-compact' : ''}`}>
        <button className="icon-btn" onClick={onClose} aria-label="Retour à la carte"><Icon name="back" /></button>
        <span className="guide-bar-title">{place.shortTitle}</span>
        <button className="icon-btn" onClick={share} aria-label="Partager"><Icon name="share" size={19} /></button>
      </div>

      <div className="guide-scroll" ref={scroller}>
        <header className="hero" ref={heroRef}>
          <img src={place.hero.src} alt={place.hero.alt} fetchpriority="high" />
          <div className="hero-shade" />
          <span className="hero-credit">{place.hero.credit}</span>
        </header>

        <div className="guide-head">
          <span className="chip chip--accent">{place.category}</span>
          <h1>{place.title}</h1>
          <p className="guide-commune"><Icon name="pin" size={16} /> {place.commune}</p>
          <p className="guide-teaser">{place.teaser}</p>
          <div className="labels">
            {place.labels.map((l) => <span key={l} className="label">{l}</span>)}
          </div>
        </div>

        <nav className="guide-nav" aria-label="Sections">
          {nav.map((n) => (
            <button key={n.id} className={`nav-chip ${activeNav === n.id ? 'is-active' : ''}`} onClick={() => goTo(n.id)}>{n.label}</button>
          ))}
        </nav>

        <div className="facts">
          {place.facts.map((f) => (
            <div key={f.label} className="fact">
              <span className="fact-value">{f.value}</span>
              <span className="fact-label">{f.label}</span>
            </div>
          ))}
        </div>

        {place.sections.map((s) => (
          <section key={s.id} id={`sec-${s.id}`} data-nav={s.id} className="section">
            <div className="section-head">
              <h2>{s.title}</h2>
              {speech.supported && (
                <button className="listen-btn" onClick={() => readFrom(`${s.id}-0`)}>
                  <Icon name="headphones" size={15} /> Écouter
                </button>
              )}
            </div>
            {s.paragraphs?.map((p, i) => (
              <p key={i} data-block={`${s.id}-${i}`} className={`para ${currentId === `${s.id}-${i}` ? 'is-reading' : ''}`}>{p}</p>
            ))}
            {s.anecdotes && (
              <ol className="anecdotes">
                {s.anecdotes.map((a, i) => (
                  <li key={a.title} data-block={`${s.id}-${i}`} className={`anecdote ${currentId === `${s.id}-${i}` ? 'is-reading' : ''}`}>
                    <span className="anecdote-num">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{a.title}</h3>
                    <p>{a.text}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        ))}

        <section id="sec-reperes" data-nav="reperes" className="section">
          <div className="section-head"><h2>Repères</h2></div>
          <ol className="timeline">
            {place.timeline.map((t) => (
              <li key={t.year + t.text}>
                <span className="timeline-year">{t.year}</span>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="sec-archives" data-nav="archives" className="section section--wide">
          <div className="section-head">
            <h2>Archives & cartes postales</h2>
          </div>
          <p className="section-sub">Peintures, gravures et cartes postales anciennes, du domaine public.</p>
          <Gallery items={place.archives} variant="archive" onOpen={(i) => setLightbox({ items: place.archives, start: i })} />
          <h3 className="sub-title">Aujourd'hui</h3>
          <Gallery items={place.photos} variant="photo" onOpen={(i) => setLightbox({ items: place.photos, start: i })} />
        </section>

        {place.videos?.length > 0 && (
          <section id="sec-videos" data-nav="videos" className="section">
            <div className="section-head"><h2>Vidéos</h2></div>
            <div className="videos">
              {place.videos.map((v) => (
                <figure key={v.title} className="video">
                  <video controls preload="none" poster={v.poster} playsInline>
                    {v.sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
                  </video>
                  <figcaption>
                    <strong>{v.title}</strong>
                    <span>{v.caption}</span>
                    <a href={v.page} target="_blank" rel="noreferrer" className="credit-link">{v.credit} <Icon name="external" size={12} /></a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section id="sec-pratique" data-nav="pratique" className="section">
          <div className="section-head"><h2>Infos pratiques</h2></div>
          <ul className="practical">
            {place.practical.map((p) => (
              <li key={p.title} className={p.icon === 'warn' ? 'is-warn' : ''}>
                <span className="practical-icon"><Icon name={p.icon} size={20} /></span>
                <div><strong>{p.title}</strong><p>{p.text}</p></div>
              </li>
            ))}
          </ul>
          <a className="btn btn--primary btn--block" href={directions} target="_blank" rel="noreferrer">
            <Icon name="route" size={19} /> Itinéraire jusqu'à la pointe
          </a>
        </section>

        <section className="section sources">
          <h2>Sources & crédits</h2>
          <p>Textes rédigés pour guideme.bzh d'après :</p>
          <ul>
            {place.sources.map((s) => (
              <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>
            ))}
          </ul>
          <p>Images et vidéos : Wikimedia Commons, auteurs et licences indiqués sous chaque média (touchez une image pour voir le lien).</p>
        </section>
        <div className="guide-end" />
      </div>

      <AudioPlayer speech={speech} blocks={blocks} title={place.shortTitle} />

      {lightbox && <Lightbox items={lightbox.items} start={lightbox.start} onClose={() => setLightbox(null)} />}
    </article>
  );
}
