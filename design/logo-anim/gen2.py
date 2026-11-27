# Rotation « naturelle » du feu : angle qui tourne à vitesse constante, tout le reste en découle (aucun arrêt sur image).
# θ = 0° droite · 90° derrière · 180° gauche · 270° devant.
import math, re
exec(open('gen.py').read().split("def css(")[0])  # récupère svg(), tracés et constantes

N = 72  # images clés par tour (interpolées linéairement : mouvement continu)
GRAY, GOLD = (0x5c, 0x5c, 0x5c), (0xFF, 0xB9, 0x00)
def mix(t):
    t = max(0, min(1, t)); return '#%02x%02x%02x' % tuple(round(a + (b - a) * t) for a, b in zip(GRAY, GOLD))

def kf(name, fn):
    rows = []
    for k in range(N + 1):
        th = 2 * math.pi * k / N
        rows.append(f'{100*k/N:.3f}% {{ {fn(th)} }}')
    return f'@keyframes {name} {{ ' + ' '.join(rows) + ' }'

def version(v, T, beams=1, flare_pow=2.0, widen=0.0, trail=False, flare_scale=1.15):
    i = f'lg-v{v}'
    def side(th, sgn):  # longueur projetée d'un côté (somme des faisceaux)
        return max(0.0, max(sgn * math.cos(th + j * math.pi) for j in range(beams)))
    def facing(th, s):  # s=-1 : vers nous (devant) ; s=+1 : derrière
        return max(max(0.0, s * math.sin(th + j * math.pi)) for j in range(beams))
    def beam(sgn, lag=0.0, op=1.0):
        def f(th):
            t = th - lag; L = side(t, sgn); w = 1 + widen * (1 - abs(math.cos(t)))
            return f'transform: scale({L:.3f},{w:.3f}); opacity: {op * min(1, L * 1.6):.3f};'
        return f
    css = f'''
.{i} .beam, .{i} .flare, .{i} .back, .{i} .glass {{ transform-box: fill-box; }}
.{i} .beam-r, .{i} .beam-r2 {{ transform-origin: 0% 50%; }} .{i} .beam-l, .{i} .beam-l2 {{ transform-origin: 100% 50%; }}
.{i} .back, .{i} .flare {{ transform-origin: 50% 50%; }}
.{i} .beam-r {{ animation: {i}-r {T}s linear 1 both; }} .{i} .beam-l {{ animation: {i}-l {T}s linear 1 both; }}
.{i} .beam-r2 {{ animation: {i}-r2 {T}s linear 1 both; }} .{i} .beam-l2 {{ animation: {i}-l2 {T}s linear 1 both; }}
.{i} .back {{ animation: {i}-b {T}s linear 1 both; }} .{i} .flare {{ animation: {i}-f {T}s linear 1 both; }}
.{i} .glass {{ animation: {i}-g {T}s linear 1 both; }}
.{i} .s1 {{ animation: {i}-s1 {T}s linear 1 both; }} .{i} .s2 {{ animation: {i}-s2 {T}s linear 1 both; }}
{kf(f'{i}-r', beam(1))}
{kf(f'{i}-l', beam(-1))}
{kf(f'{i}-r2', beam(1, 0.42, .38))}
{kf(f'{i}-l2', beam(-1, 0.42, .38))}
{kf(f'{i}-b', lambda th: f'opacity: {facing(th, 1) ** 1.4:.3f}; transform: scale({0.6 + 0.4 * facing(th, 1):.3f});')}
{kf(f'{i}-f', lambda th: f'opacity: {facing(th, -1) ** flare_pow:.3f}; transform: scale({0.2 + (flare_scale - 0.2) * facing(th, -1) ** flare_pow:.3f});')}
{kf(f'{i}-g', lambda th: f'opacity: {min(1, 0.9 * facing(th, -1) ** 1.5 + 0.45 * facing(th, 1)):.3f};')}
{kf(f'{i}-s1', lambda th: f'stop-color: {mix((math.cos(th) + 1) / 2 + 0.35 * math.sin(th))};')}
{kf(f'{i}-s2', lambda th: f'stop-color: {mix((math.cos(th) + 1) / 2 - 0.35 * math.sin(th))};')}
'''
    s = svg(v, False)
    if trail:
        s = s.replace('<g class="beam beam-r">', f'<g class="beam beam-r2"><path d="{UP}" fill="url(#lg{v}-tr)"/><path d="{LO}" fill="url(#lg{v}-tr)"/></g><g class="beam beam-l2"><path d="{UP_L}" fill="url(#lg{v}-tl)"/><path d="{LO_L}" fill="url(#lg{v}-tl)"/></g><g class="beam beam-r">', 1)
        s = s.replace('</defs>', f'<linearGradient id="lg{v}-tr" x1="0" x2="1"><stop offset="0" stop-color="#FFB900" stop-opacity=".8"/><stop offset="1" stop-color="#FFE2A8" stop-opacity="0"/></linearGradient><linearGradient id="lg{v}-tl" x1="1" x2="0"><stop offset="0" stop-color="#FFB900" stop-opacity=".8"/><stop offset="1" stop-color="#FFE2A8" stop-opacity="0"/></linearGradient></defs>', 1)
    return s, css

V = [
  (5, 'Rotation continue', 2.0, dict(), "Le faisceau tourne à vitesse constante : il raccourcit en passant derrière, réapparaît à gauche, éblouit en passant devant. Aucun arrêt."),
  (6, 'Éclat de phare', 2.4, dict(flare_pow=6, widen=0.6, flare_scale=1.3), "Comme un vrai feu : le faisceau s'élargit quand il fait face, et l'éclat devant est bref et intense, puis il repart."),
  (7, 'Double feu', 2.4, dict(beams=2, flare_pow=4, widen=0.35), "Deux faisceaux opposés, comme beaucoup de phares bretons : deux éclats par tour, le faisceau est toujours visible d'un côté."),
  (8, 'Balayage', 1.8, dict(trail=True, flare_pow=3, widen=0.3), "Rotation plus vive avec une traînée de lumière derrière le faisceau, effet « film » pour l'intro vidéo."),
]
cards, allcss = '', ''
for v, name, T, opts, desc in V:
    s, c = version(v, T, **opts); allcss += c
    open(f'logo-rot-v{v}.svg', 'w').write(s.replace('<svg class', '<svg style="background:#05070D" class', 1).replace('</defs>', f'</defs><style>{c}</style>', 1))
    cards += f'<section><div class="stage">{s}</div><div class="meta"><span>Version {v - 4} · {T} s / tour</span><h2>{name}</h2><p>{desc}</p></div></section>'
html = f'''<!doctype html><html lang="fr"><meta charset="utf-8"><title>Logo · rotation du feu</title>
<style>body{{margin:0;padding:32px;background:#e7e5df;font-family:Inter,system-ui,sans-serif}}h1{{margin:0 0 20px;font-size:24px}}
section{{display:grid;grid-template-columns:1fr 300px;gap:24px;align-items:center;margin-bottom:18px;background:#fff;border-radius:16px;padding:16px}}
.stage{{background:#05070D;border-radius:12px;padding:40px 30px;display:grid;place-items:center}}.stage svg{{width:100%;max-width:720px;height:auto;overflow:visible}}
.meta span{{font-size:12px;font-weight:700;color:#999;letter-spacing:.06em;text-transform:uppercase}}.meta h2{{margin:6px 0;font-size:22px}}.meta p{{margin:0;color:#555;line-height:1.5}}
{allcss}.stage{{cursor:pointer}}</style><h1>Rotation du feu : 4 propositions (un tour, rejoué au survol ou au clic)</h1>{cards}
<script>
// Rejoue un tour : on remplace le SVG par une copie (redémarre les animations CSS)
function replay(st){{const s=st.querySelector('svg');const c=s.cloneNode(true);s.replaceWith(c);}}
document.querySelectorAll('.stage').forEach(st=>{{st.addEventListener('mouseenter',()=>replay(st));st.addEventListener('click',()=>replay(st));setInterval(()=>replay(st),3600);}});
</script></html>'''
open('rotation.html', 'w').write(html)
print('ok')
