# Génère l'animation de survol du logo (un tour du feu, option « Avec pause » réduite à 1 tour) :
#   src/components/brandAnim.js  : calques de lumière à insérer dans le SVG du logo
#   src/brand-anim.css           : images clés (calculées : rotation à vitesse constante, montée/descente douces)
# Au repos, seuls les éléments d'origine du logo sont visibles (calques à opacité 0).
#   python3 scripts/build-brand-anim.py
import math, re
CX, CY = 9.94, 14.35
UP = 'M20.2538 12.1254L39.0971 6.25615C39.7149 6.05021 40.0753 6.30763 40.1782 7.02841L40.796 10.8897C40.899 11.5075 40.6416 11.8679 40.0238 11.9709L20.5627 13.5154C19.7389 13.5154 19.4815 13.2065 19.7904 12.5887C19.8934 12.3828 20.0479 12.2283 20.2538 12.1254Z'
LO = 'M20.5615 15.2148L40.0226 16.9138C40.6404 16.9138 40.8978 17.2742 40.7948 17.995L40.177 21.5474C40.074 22.2682 39.7136 22.5256 39.0958 22.3197L20.2526 16.6049C19.6348 16.399 19.4803 16.0901 19.7892 15.6782C19.8922 15.3693 20.1496 15.2148 20.5615 15.2148Z'
def mirror(d):
    out, k = [], 0
    for tok in re.findall(r'[MLCZ]|-?\d+\.?\d*', d):
        if tok in 'MLCZ': out.append(tok); continue
        out.append(f'{2 * CX - float(tok):.3f}' if k % 2 == 0 else tok); k += 1
    return ' '.join(out)
DEFS = '''<linearGradient id="gmb-bl" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#FFB900"/><stop offset="1" stop-color="#FFD58B"/></linearGradient>
<radialGradient id="gmb-back"><stop offset="0" stop-color="#FFD25A" stop-opacity=".95"/><stop offset=".45" stop-color="#FFB900" stop-opacity=".45"/><stop offset="1" stop-color="#FFB900" stop-opacity="0"/></radialGradient>
<radialGradient id="gmb-flare"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".22" stop-color="#FFF4D0"/><stop offset=".5" stop-color="#FFC93A" stop-opacity=".55"/><stop offset="1" stop-color="#FFB900" stop-opacity="0"/></radialGradient>
<linearGradient id="gmb-streak" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF" stop-opacity="0"/><stop offset=".5" stop-color="#FFF"/><stop offset="1" stop-color="#FFF" stop-opacity="0"/></linearGradient>
<linearGradient id="gmb-star" x1="0" y1="0" x2="1" y2="0"><stop class="gmb-s1" offset="0" stop-color="#FFB900"/><stop class="gmb-s2" offset="1" stop-color="#FFB900"/></linearGradient>
<filter id="gmb-sblur" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2"/></filter>'''
BACK = f'<circle class="gmb-back" cx="{CX}" cy="{CY}" r="16" fill="url(#gmb-back)"/>'
GLASS = '<rect class="gmb-glass" x="5.3" y="10.6" width="9.3" height="7.5" rx=".6" fill="#FFD25A"/>'
BEAM_L = f'<g class="gmb-beam-l"><path d="{mirror(UP)}" fill="url(#gmb-bl)"/><path d="{mirror(LO)}" fill="url(#gmb-bl)"/></g>'
FLARE = (f'<g class="gmb-flare"><circle cx="{CX}" cy="{CY}" r="22" fill="url(#gmb-flare)"/>'
         f'<ellipse cx="{CX}" cy="{CY}" rx="40" ry="1.3" fill="url(#gmb-streak)"/><ellipse cx="{CX}" cy="{CY}" rx="1" ry="14" fill="url(#gmb-streak)" opacity=".6"/></g>')

# --- images clés : 1 tour, 2,6 s, montée/descente douces (a = 0,22) ---
T, N, A = 2.2, 80, 0.22
def prof(u):
    vmax = 1 / (1 - A)
    if u < A: return vmax * u * u / (2 * A)
    if u > 1 - A: w = 1 - u; return 1 - vmax * w * w / (2 * A)
    return vmax * (A / 2 + (u - A))
def spd(u): return u / A if u < A else (1 - u) / A if u > 1 - A else 1.0
GRAY, GOLD = (0x5c, 0x5c, 0x5c), (0xFF, 0xB9, 0x00)
def mix(t):
    t = max(0, min(1, t)); return '#%02x%02x%02x' % tuple(round(x + (y - x) * t) for x, y in zip(GRAY, GOLD))
def kf(name, fn):
    rows = []
    for k in range(N + 1):
        u = k / N; th = -2 * math.pi * prof(u); s = spd(u)  # sens inverse : droite → devant → gauche → derrière
        rows.append(f'{100*u:.2f}%{{{fn(th, s)}}}')
    return f'@keyframes {name}{{' + ''.join(rows) + '}'
side = lambda th, g: max(0.0, g * math.cos(th))
facing = lambda th, g: max(0.0, g * math.sin(th))
BLUR, HALO, WIDEN, FP, FS = 1.5, 0.3, 0.35, 3.5, 1.15
def beam(g):
    def f(th, s):
        L = side(th, g); w = 1 + WIDEN * (1 - abs(math.cos(th))) * s
        return f'transform:scale({L:.3f},{w:.3f});opacity:{min(1, L * 1.8):.3f};filter:blur({BLUR * s:.2f}px)'
    return f
css = f'''/* Généré par scripts/build-brand-anim.py : survol du logo, un tour du feu du phare ({T} s). */
.brand-svg .gmb-back, .brand-svg .gmb-glass, .brand-svg .gmb-flare, .brand-svg .gmb-starglow {{ opacity: 0; }}
.brand-svg .gmb-beam-l {{ opacity: 0; transform: scaleX(0); }}
.brand-svg .gmb-beam-r, .brand-svg .gmb-beam-l, .brand-svg .gmb-back, .brand-svg .gmb-flare, .brand-svg .gmb-glass, .brand-svg .gmb-starglow {{ transform-box: fill-box; }}
.brand-svg .gmb-beam-r {{ transform-origin: 0% 50%; }} .brand-svg .gmb-beam-l {{ transform-origin: 100% 50%; }}
.brand-svg .gmb-back, .brand-svg .gmb-flare {{ transform-origin: 50% 50%; }}
.brand-svg .brand-logo {{ overflow: visible; }}
.brand.is-spinning .gmb-beam-r {{ animation: gmb-r {T}s linear both; will-change: transform, filter; }}
.brand.is-spinning .gmb-beam-l {{ animation: gmb-l {T}s linear both; will-change: transform, filter; }}
.brand.is-spinning .gmb-back {{ animation: gmb-b {T}s linear both; }}
.brand.is-spinning .gmb-flare {{ animation: gmb-f {T}s linear both; }}
.brand.is-spinning .gmb-glass {{ animation: gmb-g {T}s linear both; }}
.brand.is-spinning .gmb-starglow {{ animation: gmb-sg {T}s linear both; }}
.brand.is-spinning .gmb-s1 {{ animation: gmb-s1 {T}s linear both; }}
.brand.is-spinning .gmb-s2 {{ animation: gmb-s2 {T}s linear both; }}
@media (prefers-reduced-motion: reduce) {{ .brand.is-spinning * {{ animation: none !important; }} }}
{kf('gmb-r', beam(1))}
{kf('gmb-l', beam(-1))}
{kf('gmb-b', lambda th, s: f'opacity:{s * HALO * (0.15 + 0.85 * facing(th, 1) ** 1.3):.3f};transform:scale({0.7 + 0.3 * facing(th, 1):.3f})')}
{kf('gmb-f', lambda th, s: f'opacity:{facing(th, -1) ** FP:.3f};transform:scale({0.2 + (FS - 0.2) * facing(th, -1) ** FP:.3f});filter:blur({0.6 * s:.2f}px)')}
{kf('gmb-g', lambda th, s: f'opacity:{s * min(1, 0.12 + 0.88 * facing(th, -1) ** 1.4 + 0.35 * facing(th, 1)):.3f}')}
{kf('gmb-sg', lambda th, s: f'opacity:{s * 0.6 * ((math.cos(th) + 1) / 2) ** 2:.3f}')}
{kf('gmb-s1', lambda th, s: f'stop-color:{mix((math.cos(th) + 1) / 2 + 0.35 * math.sin(th))}')}
{kf('gmb-s2', lambda th, s: f'stop-color:{mix((math.cos(th) + 1) / 2 - 0.35 * math.sin(th))}')}
'''
open('src/brand-anim.css', 'w').write(css)
js = '// Généré par scripts/build-brand-anim.py : calques de lumière ajoutés au SVG du logo (invisibles au repos).\n'
for k, v in dict(DEFS=DEFS, BACK=BACK, GLASS=GLASS, BEAM_L=BEAM_L, FLARE=FLARE).items():
    js += f'export const {k} = {v!r};\n'.replace("{v!r}", "")
open('src/components/brandAnim.js', 'w').write(js)
print(len(css) // 1024, 'Ko de CSS')
