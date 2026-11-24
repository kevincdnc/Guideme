// Plugin Vite : après le build, génère une vraie page HTML par lieu (lieu/<id>/index.html),
// avec titre, description, balises de partage, données structurées et le contenu de la fiche
// en HTML (lisible par les moteurs de recherche avant même le chargement de l'app),
// plus sitemap.xml et robots.txt.
import fs from 'node:fs';
import path from 'node:path';

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function articleHtml(p, base) {
  const sections = (p.sections || []).map((s) => `
    <section>
      <h2>${esc(s.title)}</h2>
      ${(s.paragraphs || []).map((t) => `<p>${esc(t)}</p>`).join('\n      ')}
      ${s.anecdotes ? `<ol>${s.anecdotes.map((a) => `<li><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></li>`).join('')}</ol>` : ''}
    </section>`).join('');
  const film = p.film
    ? `<section><h2>Film d'archives : « ${esc(p.film.title)} » (${esc(p.film.year)})</h2>
      <dl>${p.film.details.map((d) => `<dt>${esc(d.label)}</dt><dd>${esc(d.value)}</dd>`).join('')}</dl>
      ${p.film.summary.map((t) => `<p>${esc(t)}</p>`).join('')}
      <p><a href="${esc(p.film.page)}">Voir le film</a></p></section>`
    : '';
  const timeline = p.timeline?.length
    ? `<section><h2>Repères</h2><ul>${p.timeline.map((t) => `<li><strong>${esc(t.year)}</strong> ${esc(t.text)}</li>`).join('')}</ul></section>`
    : '';
  const practical = p.practical?.length
    ? `<section><h2>Infos pratiques</h2><ul>${p.practical.map((t) => `<li><strong>${esc(t.title)}</strong> ${esc(t.text)}</li>`).join('')}</ul></section>`
    : '';
  return `<article class="seo-article">
    <p><a href="${base}">guideme.bzh</a> › ${esc(p.commune)}</p>
    <h1>${esc(p.title)}</h1>
    <p>${esc(p.teaser)}</p>
    ${p.hero ? `<img src="${esc(p.hero.src)}" alt="${esc(p.hero.alt)}" width="1280">` : ''}
    <ul>${(p.facts || []).map((f) => `<li><strong>${esc(f.value)}</strong> ${esc(f.label)}</li>`).join('')}</ul>
    ${sections}
    ${film}
    ${timeline}
    ${practical}
    <section><h2>Sources</h2><ul>${(p.sources || []).map((s) => `<li><a href="${esc(s.url)}">${esc(s.label)}</a></li>`).join('')}</ul></section>
  </article>`;
}

export default function prerender({ base, site }) {
  let outDir = 'dist';
  return {
    name: 'guideme-prerender',
    apply: 'build',
    configResolved(cfg) { outDir = cfg.build.outDir; },
    async closeBundle() {
      const { PLACES } = await import(new URL('../src/data/places.js', import.meta.url).href + `?t=${Date.now()}`);
      const shell = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
      const urls = [site];
      for (const p of PLACES.filter((x) => x.available)) {
        const url = `${site}lieu/${p.id}/`;
        urls.push(url);
        const title = `${p.title} · guideme.bzh`;
        const desc = p.teaser;
        const ld = {
          '@context': 'https://schema.org',
          '@type': 'TouristAttraction',
          name: p.title,
          description: desc,
          url,
          image: p.hero?.src,
          address: { '@type': 'PostalAddress', addressLocality: p.commune.split(' · ')[0], addressRegion: 'Finistère', addressCountry: 'FR' },
          geo: { '@type': 'GeoCoordinates', latitude: p.coords[1], longitude: p.coords[0] },
        };
        const head = `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${esc(p.title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:url" content="${url}" />
    ${p.hero ? `<meta property="og:image" content="${esc(p.hero.src)}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify(ld)}</script>`;
        const html = shell
          .replace(/<title>[\s\S]*?<\/title>/, '')
          .replace(/<meta name="description"[^>]*>/, '')
          .replace('</head>', `${head}\n  </head>`)
          .replace('<div id="root"></div>', `<div id="root">${articleHtml(p, base)}</div>`);
        const dir = path.join(outDir, 'lieu', p.id);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html);
      }
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
      fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site}sitemap.xml\n`);
      console.log(`prerender : ${urls.length - 1} pages de lieux + sitemap.xml`);
    },
  };
}
