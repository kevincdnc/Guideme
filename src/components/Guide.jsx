import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import Lightbox from './Lightbox.jsx';
import SafeImg from './SafeImg.jsx';
import Brand from './Brand.jsx';

const BASE = import.meta.env.BASE_URL;
import { useSpeech } from '../hooks/useSpeech.js';
import { useVisited } from '../hooks/useVisited.js';
import maplibregl from 'maplibre-gl';
import MAP_STYLE from '../data/map-style.json';

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

function AudioPlayer({ speech, blocks, title, minutes }) {
  const { supported, error, state, index, rate, play, pause, next, prev, changeRate, stop } = speech;
  // Le lecteur n'apparaît qu'une fois la lecture lancée (bouton « Écouter » de l'en-tête)
  if (!supported || (state === 'idle' && !error)) return null;
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
        <span className="player-duration"><Icon name="clock" size={14} /> {minutes} min</span>
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
            <SafeImg src={it.src} alt={it.caption} loading="lazy" decoding="async" />
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

// Film d'archives : fiche technique et résumé au-dessus du lecteur intégré (lecteur officiel de l'hébergeur)
function FilmBlock({ film }) {
  return (
    <section id="sec-film" data-nav="film" className="section film">
      <div className="section-head"><h2>Film d'archives</h2></div>
      <div className="film-card">
        <div className="film-head">
          <span className="year-badge">{film.year}</span>
          <h3>« {film.title} »</h3>
        </div>
        <dl className="film-details">
          {film.details.map((d) => (
            <div key={d.label}><dt>{d.label}</dt><dd>{d.value}</dd></div>
          ))}
        </dl>
        {film.summary.map((t, i) => <p key={i} className="film-summary">{t}</p>)}
        <div className="film-player">
          <iframe
            src={film.embed}
            title={`${film.title} (${film.year})`}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        <a className="credit-link" href={film.page} target="_blank" rel="noreferrer">Voir le film sur Vimeo <Icon name="external" size={12} /></a>
      </div>
    </section>
  );
}

// Petite carte du lieu (non interactive) : un clic ouvre la grande carte
function MiniMap({ place }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return undefined;
    let map;
    try {
      map = new maplibregl.Map({ container: ref.current, style: MAP_STYLE, center: place.coords, zoom: place.miniZoom || 10.4, interactive: false, attributionControl: false, fadeDuration: 0 });
      const el = document.createElement('div');
      el.className = 'minimap-pin';
      new maplibregl.Marker({ element: el }).setLngLat(place.coords).addTo(map);
    } catch (e) { /* WebGL indisponible : la carte reste vide */ }
    return () => map?.remove();
  }, [place]);
  return (
    <a className="minimap" href={`${BASE}#/lieu/${place.id}`} aria-label={`Voir ${place.shortTitle} sur la carte`}>
      <div ref={ref} className="minimap-canvas" />
      <span className="minimap-label"><Icon name="pin" size={14} /> {place.commune.split(' · ')[0]}</span>
      <span className="minimap-open"><Icon name="map" size={14} /> Ouvrir la carte</span>
    </a>
  );
}

// Carte, itinéraire, puis infos pratiques repliées
function Practical({ place, directions }) {
  return (
    <div className="practical-box">
      <MiniMap place={place} />
      <a className="btn btn--primary btn--block" href={directions} target="_blank" rel="noreferrer">
        <Icon name="route" size={19} /> Itinéraire
      </a>
      {place.practical?.length > 0 && (
        <details className="practical-details">
          <summary><span>Infos pratiques & accès</span> <Icon name="chevron" size={16} /></summary>
          <ul className="practical">
            {place.practical.map((p) => (
              <li key={p.title} className={p.icon === 'warn' ? 'is-warn' : ''}>
                <span className="practical-icon"><Icon name={p.icon} size={18} /></span>
                <div><strong>{p.title}</strong><p>{p.text}</p></div>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

// Carte d'identité d'un phare : mêmes rubriques pour tous
const LH_ROWS = [
  ['built', 'Construction'], ['lit', 'Mise en service'], ['height', 'Hauteur de la tour'], ['elevation', 'Hauteur du feu'],
  ['range', 'Portée'], ['light', 'Feu'], ['keepers', 'Gardiens'], ['visit', 'Visite'], ['visitors', 'Fréquentation'], ['protection', 'Protection'],
];
function LighthouseSheet({ lh }) {
  return (
    <section id="sec-identite" data-nav="identite" className="section">
      <div className="section-head"><h2>Carte d'identité</h2></div>
      <dl className="lh-sheet">
        {LH_ROWS.map(([k, label]) => (
          <div key={k}><dt>{label}</dt><dd>{lh[k] || '—'}</dd></div>
        ))}
      </dl>
    </section>
  );
}

export default function Guide({ place, onClose, variant = 'panel' }) {
  const isPage = variant === 'page';
  const [visitedIds, toggleVisited] = useVisited();
  const isVisited = visitedIds.includes(place.id);
  // En-tête en mosaïque : photo principale + vignettes (photos actuelles, puis archives)
  const allImages = useMemo(() => [
    ...(place.hero ? [{ src: place.hero.src, caption: place.hero.alt, credit: place.hero.credit }] : []),
    ...(place.photos || []),
    ...(place.archives || []),
  ], [place]);
  const mosaic = allImages.slice(0, 3);
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
    ...(place.lighthouse ? [{ id: 'identite', label: 'Identité' }] : []),
    ...place.sections.flatMap((s, i) => [
      ...(i === 1 && place.film ? [{ id: 'film', label: `Film ${place.film.year}` }] : []),
      { id: s.id, label: s.nav },
    ]),
    ...(place.records?.some((r) => r.more) ? [{ id: 'records', label: 'Records' }] : []),
    ...(place.timeline?.length ? [{ id: 'reperes', label: 'Repères' }] : []),
    ...(place.archives?.length || place.photos?.length ? [{ id: 'archives', label: place.archives?.length ? 'Archives' : 'Photos' }] : []),
    ...(place.videos?.length ? [{ id: 'videos', label: 'Vidéos' }] : []),
    { id: 'pratique', label: 'Pratique', mobileOnly: true },
  ];

  // Échap ferme la fiche (desktop)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && !lightbox && onClose) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, onClose]);

  const goTo = (id) => {
    const el = scroller.current.querySelector(`#sec-${id}`);
    if (el) scroller.current.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
  };

  const share = async () => {
    const url = `${location.origin}${BASE}lieu/${place.id}/`;
    const data = { title: `${place.title} · guideme.bzh`, text: place.teaser, url };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(url); alert('Lien copié'); }
    } catch (e) { /* partage annulé */ }
  };

  const [lon, lat] = place.coords;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;

  const readFrom = (blockId) => {
    const i = blocks.findIndex((b) => b.id === blockId);
    if (i >= 0) speech.play(i);
  };

  return (
    <article className={`guide guide--${variant}`} aria-label={place.title}>
      <div className={`guide-bar ${compact ? 'is-compact' : ''}`}>
        {isPage ? (
          <span className="guide-brand"><Brand /></span>
        ) : (
          <button className="icon-btn guide-back" onClick={onClose} aria-label="Retour à la carte"><Icon name="back" /></button>
        )}
        <span className="guide-bar-title">{place.shortTitle}</span>
        <nav className="guide-nav" aria-label="Sections">
          {nav.map((n) => (
            <button key={n.id} className={`nav-chip ${activeNav === n.id ? 'is-active' : ''} ${n.mobileOnly ? 'mobile-only' : ''}`} onClick={() => goTo(n.id)}>{n.label}</button>
          ))}
        </nav>
        <button className="icon-btn" onClick={share} aria-label="Partager"><Icon name="share" size={19} /></button>
        {isPage ? (
          <a className="pill-btn" href={`${BASE}#/lieu/${place.id}`}><Icon name="map" size={17} /> <span>Voir sur la carte</span></a>
        ) : (
          <>
            <a className="pill-btn pill-btn--primary" href={`${BASE}lieu/${place.id}/`}><Icon name="external" size={16} /> <span>Fiche complète</span></a>
            <button className="close-btn" onClick={onClose} aria-label="Fermer la fiche">
              <Icon name="close" size={18} /> <span>Fermer</span>
            </button>
          </>
        )}
      </div>

      <div className="guide-scroll" ref={scroller}>
        <header className={`hero hero--n${mosaic.length}`} ref={heroRef}>
          {mosaic.length ? mosaic.map((m, i) => (
            <button key={m.src} className={`hero-tile hero-tile--${i}`} onClick={() => setLightbox({ items: allImages, start: i })} aria-label={`Agrandir : ${m.caption}`}>
              <SafeImg src={m.src} alt={m.caption} fetchpriority={i === 0 ? 'high' : undefined} />
              {i === mosaic.length - 1 && allImages.length > mosaic.length && (
                <span className="hero-more"><Icon name="image" size={15} /> +{allImages.length - mosaic.length}</span>
              )}
            </button>
          )) : (
            <div className="hero-empty"><Icon name={place.icon || 'pin'} size={56} stroke={1.6} /></div>
          )}
          <div className="hero-shade" />
          {place.hero && <span className="hero-credit">{place.hero.credit}</span>}
        </header>

        <div className="guide-layout">
        <div className="guide-main">
        <div className="guide-head">
          <div className="gwenn-ha-du" aria-hidden="true" />
          <h1>{place.title}</h1>
          <p className="guide-meta">
            <span><Icon name="pin" size={15} /> {place.commune.split(' · ')[0]}</span>
            <span><Icon name="headphones" size={15} /> {place.readingMinutes} min</span>
          </p>
          <div className="guide-actions">
            {speech.supported && (
              <button className="action-btn action-btn--primary" onClick={() => (speech.state === 'playing' ? speech.pause() : speech.play())}>
                <Icon name={speech.state === 'playing' ? 'pause' : 'play'} size={16} /> {speech.state === 'playing' ? 'Pause' : 'Écouter'}
              </button>
            )}
            <button role="checkbox" aria-checked={isVisited} className={`action-btn visit-btn ${isVisited ? 'is-checked' : ''}`} onClick={() => toggleVisited(place.id)}>
              <span className="visit-box">{isVisited && <Icon name="check" size={13} stroke={3.4} />}</span>
              {isVisited ? 'Déjà visité' : "Je l'ai déjà visité"}
            </button>
          </div>
          <p className="guide-teaser">{place.teaser}</p>
          <dl className="keyfigs" aria-label="Chiffres clés">
            {place.facts.map((f) => (
              <div key={f.label} className={`keyfig ${/^(\d{3,4}|[IVX]+e s\.)$/.test(f.value) ? 'is-date' : ''}`}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
          {place.records?.length > 0 && (
            <ul className="records" aria-label="Records">
              {place.records.map((r) => (
                <li key={r.title} className={`record record--${r.medal}`}>
                  <span className="record-medal"><Icon name="medal" size={22} stroke={1.8} /></span>
                  <div className="record-body">
                    <span className="record-scope">{r.scope}</span>
                    <strong>{r.title}</strong>
                    <span className="record-text">{r.text}</span>
                    {r.more && <button className="record-more" onClick={() => goTo('records')}>En savoir plus <Icon name="chevron" size={13} style={{ transform: 'rotate(90deg)' }} /></button>}
                  </div>
                </li>
              ))}
            </ul>
          )}
          {place.funFact && (
            <aside className="funfact">
              <span className="funfact-icon"><Icon name="spark" size={20} /></span>
              <div>
                <span className="funfact-kicker">Le saviez-vous ?</span>
                <strong>{place.funFact.title}</strong>
                <p>{place.funFact.text}</p>
              </div>
            </aside>
          )}
        </div>


        {place.lighthouse && <LighthouseSheet lh={place.lighthouse} />}

        {place.sections.map((s, si) => (
          <Fragment key={s.id}>
          {si === 1 && place.film && <FilmBlock film={place.film} />}
          <section id={`sec-${s.id}`} data-nav={s.id} className="section">
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
          </Fragment>
        ))}

        {place.records?.some((r) => r.more) && (
        <section id="sec-records" data-nav="records" className="section">
          <div className="section-head"><h2>Les records en détail</h2></div>
          <ol className="records-detail">
            {place.records.filter((r) => r.more).map((r) => (
              <li key={r.title} className={`record-detail record--${r.medal}`}>
                <span className="record-medal"><Icon name="medal" size={20} stroke={1.8} /></span>
                <div>
                  <span className="record-scope">{r.scope}</span>
                  <h3>{r.title}</h3>
                  <p>{r.more}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        )}

        {place.timeline?.length > 0 && (
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
        )}

        {(place.archives?.length > 0 || place.photos?.length > 0) && (
        <section id="sec-archives" data-nav="archives" className="section section--wide">
          {place.archives?.length > 0 && (
            <>
              <div className="section-head"><h2>Archives & cartes postales</h2></div>
              <p className="section-sub">{place.archivesIntro || 'Peintures, gravures et cartes postales anciennes, du domaine public.'}</p>
              <Gallery items={place.archives} variant="archive" onOpen={(i) => setLightbox({ items: place.archives, start: i })} />
            </>
          )}
          {place.photos?.length > 0 && (
            <>
              {place.archives?.length > 0 ? <h3 className="sub-title">Aujourd'hui</h3> : <div className="section-head"><h2>En images</h2></div>}
              <Gallery items={place.photos} variant="photo" onOpen={(i) => setLightbox({ items: place.photos, start: i })} />
            </>
          )}
        </section>
        )}

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

        <section id="sec-pratique" data-nav="pratique" className="section mobile-only">
          <div className="section-head"><h2>Y aller</h2></div>
          <Practical place={place} directions={directions} />
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
        </div>

        <aside className="guide-aside">
          <div className="aside-card">
            <h2 className="aside-title">Y aller</h2>
            <Practical place={place} directions={directions} />
          </div>
        </aside>
        </div>
        <div className="guide-end" />
      </div>

      <AudioPlayer speech={speech} blocks={blocks} title={place.shortTitle} minutes={place.readingMinutes} />

      {lightbox && <Lightbox items={lightbox.items} start={lightbox.start} onClose={() => setLightbox(null)} />}
    </article>
  );
}
