# Rotation v4 : même mouvement que v3 (6 s, 2 tours, montée/descente douces), sans traînée multiple.
# Flou des lumières proportionnel à la vitesse ; halo discret ; tout revient exactement à l'état initial.
import math, re
exec(open('gen.py').read().split("def css(")[0])
T, TURNS, N, A = 6.0, 2, 240, 0.16
def profile(t):
    vmax = 1 / (1 - A)
    if t < A: return vmax * t * t / (2 * A)
    if t > 1 - A: u = 1 - t; return 1 - vmax * u * u / (2 * A)
    return vmax * (A / 2 + (t - A))
def speed(t):  # 0 à l'arrêt, 1 à pleine vitesse
    return t / A if t < A else (1 - t) / A if t > 1 - A else 1.0
GRAY, GOLD = (0x5c, 0x5c, 0x5c), (0xFF, 0xB9, 0x00)
def mix(t):
    t = max(0, min(1, t)); return '#%02x%02x%02x' % tuple(round(x + (y - x) * t) for x, y in zip(GRAY, GOLD))
def kf(name, fn):
    rows = []
    for k in range(N + 1):
        t = k / N; th = 2 * math.pi * TURNS * profile(t)
        rows.append(f'{100*t:.3f}% {{ {fn(th, t)} }}')
    return f'@keyframes {name} {{ ' + ' '.join(rows) + ' }'
CONE_R = 'M20 14.35 L84 -9 L84 37.7 Z'
CONE_L = 'M{:.2f} 14.35 L{:.2f} -9 L{:.2f} 37.7 Z'.format(2*CX-20, 2*CX-84, 2*CX-84)

def build(v, blur, halo, haze, cinema, widen=0.35, flare_pow=3.5):
    i = f'lg-v{v}'; d = f'v{v}'
    s = svg(v, False)
    s = s.replace('</defs>', f'''<filter id="{d}-sblur" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2"/></filter>
<linearGradient id="{d}-cr" x1="0" x2="1"><stop offset="0" stop-color="#FFD25A" stop-opacity=".5"/><stop offset="1" stop-color="#FFD25A" stop-opacity="0"/></linearGradient>
<linearGradient id="{d}-cl" x1="1" x2="0"><stop offset="0" stop-color="#FFD25A" stop-opacity=".5"/><stop offset="1" stop-color="#FFD25A" stop-opacity="0"/></linearGradient></defs>''', 1)
    if haze:
        s = s.replace('<g class="beam beam-r">', f'<g class="beam beam-r"><path class="cone" d="{CONE_R}" fill="url(#{d}-cr)"/>', 1)
        s = s.replace('<g class="beam beam-l">', f'<g class="beam beam-l"><path class="cone" d="{CONE_L}" fill="url(#{d}-cl)"/>', 1)
    if cinema:
        s = s.replace('<ellipse cx="{}" cy="{}" rx="40"'.format(CX, CY), '<ellipse cx="{}" cy="{}" rx="64"'.format(CX, CY), 1)
        s = s.replace('<g class="flare">', f'<g class="flare"><circle cx="{CX}" cy="{CY}" r="30" fill="none" stroke="#FFE7A3" stroke-opacity=".3" stroke-width=".8"/>', 1)
    star = re.search(r'<path d="M219\.057[^"]*"', s).group(0)
    s = s.replace(star, star.replace('<path', f'<path class="starglow" fill="#FFB900" filter="url(#{d}-sblur)"', 1) + '/>' + star, 1)
    def side(th, sg): return max(0.0, sg * math.cos(th))
    def facing(th, sg): return max(0.0, sg * math.sin(th))
    def beam(sg):
        def f(th, t):
            L = side(th, sg); w = 1 + widen * (1 - abs(math.cos(th))) * speed(t)
            b = blur * speed(t)
            return f'transform: scale({L:.3f},{w:.3f}); opacity: {min(1, L * 1.8):.3f}; filter: blur({b:.2f}px);'
        return f
    flare_scale = 1.4 if cinema else 1.15
    css = f'''
.{i} .beam, .{i} .flare, .{i} .back, .{i} .glass, .{i} .starglow {{ transform-box: fill-box; }}
.{i} .beam-r {{ transform-origin: 0% 50%; animation: {i}-r {T}s linear 1 both; }}
.{i} .beam-l {{ transform-origin: 100% 50%; animation: {i}-l {T}s linear 1 both; }}
.{i} .back, .{i} .flare {{ transform-origin: 50% 50%; }}
.{i} .back {{ animation: {i}-b {T}s linear 1 both; }} .{i} .flare {{ animation: {i}-f {T}s linear 1 both; }}
.{i} .glass {{ animation: {i}-g {T}s linear 1 both; }} .{i} .starglow {{ animation: {i}-sg {T}s linear 1 both; }}
.{i} .cone {{ animation: {i}-c {T}s linear 1 both; }}
.{i} .s1 {{ animation: {i}-s1 {T}s linear 1 both; }} .{i} .s2 {{ animation: {i}-s2 {T}s linear 1 both; }}
{kf(f'{i}-r', beam(1))}
{kf(f'{i}-l', beam(-1))}
{kf(f'{i}-b', lambda th, t: f'opacity: {speed(t) * halo * (0.15 + 0.85 * facing(th, 1) ** 1.3):.3f}; transform: scale({0.7 + 0.3 * facing(th, 1):.3f});')}
{kf(f'{i}-f', lambda th, t: f'opacity: {facing(th, -1) ** flare_pow:.3f}; transform: scale({0.2 + (flare_scale - 0.2) * facing(th, -1) ** flare_pow:.3f}); filter: blur({0.6 * speed(t):.2f}px);')}
{kf(f'{i}-g', lambda th, t: f'opacity: {speed(t) * min(1, 0.12 + 0.88 * facing(th, -1) ** 1.4 + 0.35 * facing(th, 1)):.3f};')}
{kf(f'{i}-sg', lambda th, t: f'opacity: {speed(t) * 0.6 * ((math.cos(th) + 1) / 2) ** 2:.3f};')}
{kf(f'{i}-c', lambda th, t: f'opacity: {speed(t) * 0.5:.3f};')}
{kf(f'{i}-s1', lambda th, t: f'stop-color: {mix((math.cos(th) + 1) / 2 + 0.35 * math.sin(th))};')}
{kf(f'{i}-s2', lambda th, t: f'stop-color: {mix((math.cos(th) + 1) / 2 - 0.35 * math.sin(th))};')}
'''
    return s, css

V = [
  (13, 'Net', "Flou très léger pendant la rotation, halo arrière discret. Le plus propre.", dict(blur=0.6, halo=0.35, haze=False, cinema=False)),
  (14, 'Flou de vitesse', "Les faisceaux se floutent franchement à pleine vitesse et redeviennent nets en ralentissant.", dict(blur=1.5, halo=0.3, haze=False, cinema=False)),
  (15, 'Brume douce', "Flou moyen et un léger cône de lumière qui balaie la nuit, uniquement pendant la rotation.", dict(blur=1.0, halo=0.3, haze=True, cinema=False)),
  (16, 'Éclat', "Flou moyen et un éclat de face plus cinéma (long reflet, anneau d'objectif).", dict(blur=1.0, halo=0.3, haze=False, cinema=True)),
]
cards, allcss = '', ''
for v, name, desc, opts in V:
    s, c = build(v, **opts); allcss += c
    open(f'logo-rot3-v{v}.svg', 'w').write(s.replace('<svg class', '<svg style="background:#05070D" class', 1).replace('</defs>', f'</defs><style>{c}</style>', 1))
    cards += f'<section><div class="stage">{s}</div><div class="meta"><span>Proposition {v - 12} · 6 s · 2 tours</span><h2>{name}</h2><p>{desc}</p></div></section>'
html = f'''<!doctype html><html lang="fr"><meta charset="utf-8"><title>Logo · rotation v4</title>
<style>body{{margin:0;padding:32px;background:#e7e5df;font-family:Inter,system-ui,sans-serif}}h1{{margin:0 0 20px;font-size:24px}}
section{{display:grid;grid-template-columns:1fr 300px;gap:24px;align-items:center;margin-bottom:18px;background:#fff;border-radius:16px;padding:16px}}
.stage{{background:#05070D;border-radius:12px;padding:40px 30px;display:grid;place-items:center;cursor:pointer}}.stage svg{{width:100%;max-width:720px;height:auto;overflow:visible}}
.meta span{{font-size:12px;font-weight:700;color:#999;letter-spacing:.06em;text-transform:uppercase}}.meta h2{{margin:6px 0;font-size:22px}}.meta p{{margin:0;color:#555;line-height:1.5}}
{allcss}</style><h1>Rotation du feu : 4 propositions (6 s, 2 tours, retour exact à l'état initial)</h1>{cards}
<script>function replay(st){{const s=st.querySelector('svg');s.replaceWith(s.cloneNode(true));}}
document.querySelectorAll('.stage').forEach(st=>{{st.addEventListener('click',()=>replay(st));setInterval(()=>replay(st),7500);}});</script></html>'''
open('rotation3.html', 'w').write(html)
print('ok')
