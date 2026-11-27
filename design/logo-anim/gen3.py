# Rotation v3 : 6 s, 2 tours enchaînés (démarrage et arrêt progressifs, aucune pause entre les tours),
# lumière « en volume » : flou lumineux, traînée de mouvement, halo, rayons dans la brume.
import math, re
exec(open('gen.py').read().split("def css(")[0])

T, TURNS, N = 6.0, 2, 240
def profile(t, a=0.16):
    # vitesse : montée douce sur a, constante, descente douce sur a ; renvoie la part du chemin parcouru (0→1)
    vmax = 1 / (1 - a)
    if t < a: return vmax * t * t / (2 * a)
    if t > 1 - a: u = 1 - t; return 1 - vmax * u * u / (2 * a)
    return vmax * (a / 2 + (t - a))
GRAY, GOLD = (0x5c, 0x5c, 0x5c), (0xFF, 0xB9, 0x00)
def mix(t):
    t = max(0, min(1, t)); return '#%02x%02x%02x' % tuple(round(x + (y - x) * t) for x, y in zip(GRAY, GOLD))
def kf(name, fn):
    rows = []
    for k in range(N + 1):
        t = k / N; th = 2 * math.pi * TURNS * profile(t)
        rows.append(f'{100*t:.3f}% {{ {fn(th, t)} }}')
    return f'@keyframes {name} {{ ' + ' '.join(rows) + ' }'

CONE_R = f'M20 14.35 L84 -9 L84 37.7 Z'
CONE_L = ' '.join(f'{2*CX - float(n):.2f}' if i % 2 == 0 else n for i, n in enumerate(re.findall(r'-?\d+\.?\d*', CONE_R)))
CONE_L = 'M{} {} L{} {} L{} {} Z'.format(*CONE_L.split())

def build(v, name, desc, ghosts, glow, haze, starglow, flare_pow, flare_scale, widen, streak):
    i = f'lg-v{v}'; d = f'v{v}'
    s = svg(v, False)
    defs = f'''<filter id="{d}-blur" x="-60%" y="-200%" width="220%" height="500%"><feGaussianBlur stdDeviation="{glow}"/></filter>
<filter id="{d}-sblur" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2.2"/></filter>
<linearGradient id="{d}-cr" x1="0" x2="1"><stop offset="0" stop-color="#FFD25A" stop-opacity=".55"/><stop offset="1" stop-color="#FFD25A" stop-opacity="0"/></linearGradient>
<linearGradient id="{d}-cl" x1="1" x2="0"><stop offset="0" stop-color="#FFD25A" stop-opacity=".55"/><stop offset="1" stop-color="#FFD25A" stop-opacity="0"/></linearGradient>'''
    s = s.replace('</defs>', defs + '</defs>', 1)
    def beamgroup(cls, up, lo, grad, cone, cgrad, extra=''):
        g = f'<g class="beam {cls}"{extra}>'
        if haze: g += f'<path d="{cone}" fill="url(#{cgrad})" opacity=".35"/>'
        if glow: g += f'<g filter="url(#{d}-blur)" opacity=".85"><path d="{up}" fill="url(#{grad})"/><path d="{lo}" fill="url(#{grad})"/></g>'
        return g + f'<path d="{up}" fill="url(#{grad})"/><path d="{lo}" fill="url(#{grad})"/></g>'
    ghost_html = ''
    for j, (lag, op) in enumerate(ghosts):
        ghost_html += beamgroup(f'gr{j}', UP, LO, f'{d}-br', CONE_R, f'{d}-cr').replace('<g class="beam', f'<g style="opacity:{op}" class="beam', 1)
        ghost_html += beamgroup(f'gl{j}', UP_L, LO_L, f'{d}-bl', CONE_L, f'{d}-cl').replace('<g class="beam', f'<g style="opacity:{op}" class="beam', 1)
    s = re.sub(r'<g class="beam beam-r">.*?</g>', ghost_html + beamgroup('beam-r', UP, LO, f'{d}-br', CONE_R, f'{d}-cr'), s, count=1, flags=re.S)
    s = re.sub(r'<g class="beam beam-l">.*?</g>', beamgroup('beam-l', UP_L, LO_L, f'{d}-bl', CONE_L, f'{d}-cl'), s, count=1, flags=re.S)
    if streak > 1:
        s = s.replace('<ellipse cx="{}" cy="{}" rx="40"'.format(CX, CY), '<ellipse cx="{}" cy="{}" rx="{}"'.format(CX, CY, 40 * streak), 1)
        s = s.replace('<g class="flare">', f'<g class="flare"><circle cx="{CX}" cy="{CY}" r="30" fill="none" stroke="#FFE7A3" stroke-opacity=".35" stroke-width=".8"/>', 1)
    if starglow:
        star_shape = re.search(r'<path d="M219\.057[^"]*"', s).group(0)
        glow_el = star_shape.replace('<path', f'<path class="starglow" fill="#FFB900" filter="url(#{d}-sblur)"', 1) + '/>'
        s = s.replace(star_shape, glow_el + star_shape, 1)
    # --- animations ---
    def side(th, sg): return max(0.0, sg * math.cos(th))
    def facing(th, sg): return max(0.0, sg * math.sin(th))
    def beam(sg, lag=0.0):
        def f(th, t):
            L = side(th - lag, sg); w = 1 + widen * (1 - abs(math.cos(th - lag)))
            return f'transform: scale({L:.3f},{w:.3f}); opacity: {min(1, L * 1.8):.3f};'
        return f
    css = f'''
.{i} .beam, .{i} .flare, .{i} .back, .{i} .glass, .{i} .starglow {{ transform-box: fill-box; }}
.{i} [class*="beam-r"], .{i} [class*="gr"] {{ transform-origin: 0% 50%; }}
.{i} [class*="beam-l"], .{i} [class*="gl"] {{ transform-origin: 100% 50%; }}
.{i} .back, .{i} .flare {{ transform-origin: 50% 50%; }}
.{i} .beam-r {{ animation: {i}-r {T}s linear 1 both; }} .{i} .beam-l {{ animation: {i}-l {T}s linear 1 both; }}
.{i} .back {{ animation: {i}-b {T}s linear 1 both; }} .{i} .flare {{ animation: {i}-f {T}s linear 1 both; }}
.{i} .glass {{ animation: {i}-g {T}s linear 1 both; }} .{i} .starglow {{ animation: {i}-sg {T}s linear 1 both; }}
.{i} .s1 {{ animation: {i}-s1 {T}s linear 1 both; }} .{i} .s2 {{ animation: {i}-s2 {T}s linear 1 both; }}
{kf(f'{i}-r', beam(1))}
{kf(f'{i}-l', beam(-1))}
{kf(f'{i}-b', lambda th, t: f'opacity: {0.12 + 0.88 * facing(th, 1) ** 1.3:.3f}; transform: scale({0.7 + 0.3 * facing(th, 1):.3f});')}
{kf(f'{i}-f', lambda th, t: f'opacity: {facing(th, -1) ** flare_pow:.3f}; transform: scale({0.2 + (flare_scale - 0.2) * facing(th, -1) ** flare_pow:.3f});')}
{kf(f'{i}-g', lambda th, t: f'opacity: {min(1, 0.15 + 0.85 * facing(th, -1) ** 1.4 + 0.4 * facing(th, 1)):.3f};')}
{kf(f'{i}-sg', lambda th, t: f'opacity: {0.85 * ((math.cos(th) + 1) / 2) ** 2:.3f};')}
{kf(f'{i}-s1', lambda th, t: f'stop-color: {mix((math.cos(th) + 1) / 2 + 0.35 * math.sin(th))};')}
{kf(f'{i}-s2', lambda th, t: f'stop-color: {mix((math.cos(th) + 1) / 2 - 0.35 * math.sin(th))};')}
'''
    for j, (lag, op) in enumerate(ghosts):
        css += f'.{i} .gr{j} {{ animation: {i}-gr{j} {T}s linear 1 both; }} .{i} .gl{j} {{ animation: {i}-gl{j} {T}s linear 1 both; }}\n'
        css += kf(f'{i}-gr{j}', beam(1, lag)) + '\n' + kf(f'{i}-gl{j}', beam(-1, lag)) + '\n'
    return s, css

V = [
  (9,  'Fluide', "Base « Balayage » sur deux tours : démarrage et arrêt progressifs, traînée de mouvement en trois échos, lumière légèrement floutée sur les bords.",
       [(0.18, .45), (0.36, .25), (0.54, .12)], 0.7, False, False, 3, 1.15, 0.3, 1),
  (10, 'Volume', "Faisceaux doublés d'un flou lumineux et halo toujours présent autour de la lanterne : la lumière a de l'épaisseur.",
       [(0.2, .4), (0.4, .18)], 1.6, False, True, 3, 1.2, 0.35, 1),
  (11, 'Nuit de brume', "Volume + rayons larges qui balaient la brume comme un vrai phare la nuit ; l'étoile rayonne quand la lumière la touche.",
       [(0.2, .35), (0.4, .15)], 1.6, True, True, 3.5, 1.2, 0.35, 1),
  (12, 'Éclat cinéma', "Volume + éclat devant plus spectaculaire : long reflet horizontal et anneau d'objectif, pour l'intro vidéo.",
       [(0.2, .4), (0.4, .18)], 1.8, True, True, 5, 1.45, 0.5, 1.6),
]
cards, allcss = '', ''
for v, name, desc, *opts in V:
    s, c = build(v, name, desc, *opts); allcss += c
    open(f'logo-rot2-v{v}.svg', 'w').write(s.replace('<svg class', '<svg style="background:#05070D" class', 1).replace('</defs>', f'</defs><style>{c}</style>', 1))
    cards += f'<section><div class="stage">{s}</div><div class="meta"><span>Essai {v - 8} · 6 s · 2 tours</span><h2>{name}</h2><p>{desc}</p></div></section>'
html = f'''<!doctype html><html lang="fr"><meta charset="utf-8"><title>Logo · rotation v3</title>
<style>body{{margin:0;padding:32px;background:#e7e5df;font-family:Inter,system-ui,sans-serif}}h1{{margin:0 0 20px;font-size:24px}}
section{{display:grid;grid-template-columns:1fr 300px;gap:24px;align-items:center;margin-bottom:18px;background:#fff;border-radius:16px;padding:16px}}
.stage{{background:#05070D;border-radius:12px;padding:40px 30px;display:grid;place-items:center;cursor:pointer}}.stage svg{{width:100%;max-width:720px;height:auto;overflow:visible}}
.meta span{{font-size:12px;font-weight:700;color:#999;letter-spacing:.06em;text-transform:uppercase}}.meta h2{{margin:6px 0;font-size:22px}}.meta p{{margin:0;color:#555;line-height:1.5}}
{allcss}</style><h1>Rotation du feu : 4 essais (6 s, 2 tours)</h1>{cards}
<script>function replay(st){{const s=st.querySelector('svg');s.replaceWith(s.cloneNode(true));}}
document.querySelectorAll('.stage').forEach(st=>{{st.addEventListener('click',()=>replay(st));setInterval(()=>replay(st),7500);}});</script></html>'''
open('rotation2.html', 'w').write(html)
print('ok')
