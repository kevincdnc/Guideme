# 4 variantes à partir de « Flou de vitesse » (rotation v4) : pause entre les tours, enchaînée, enchaînée rapide, éclat renforcé.
import math
exec(open('gen4.py').read().split("V = [")[0])
base_profile, base_speed = profile, speed
def seg(u, a):  # un tour avec montée/descente douces (a = part d'accélération)
    vmax = 1 / (1 - a)
    if u < a: return vmax * u * u / (2 * a)
    if u > 1 - a: w = 1 - u; return 1 - vmax * w * w / (2 * a)
    return vmax * (a / 2 + (u - a))
def segv(u, a): return u / a if u < a else (1 - u) / a if u > 1 - a else 1.0

VARIANTS = []
# 1. Arrêt au logo normal entre les deux tours : tour 2,6 s · pause 0,8 s · tour 2,6 s
def p_pause(t, s1=2.6/6, s2=3.4/6, a=0.22):
    if t <= s1: return 0.5 * seg(t / s1, a)
    if t < s2: return 0.5
    return 0.5 + 0.5 * seg((t - s2) / (1 - s2), a)
def v_pause(t, s1=2.6/6, s2=3.4/6, a=0.22):
    if t <= s1: return segv(t / s1, a)
    if t < s2: return 0.0
    return segv((t - s2) / (1 - s2), a)
VARIANTS.append((17, 'Avec pause', "Un tour, un arrêt net sur le logo normal (0,8 s, sans flou ni halo), puis un second tour.", 6.0, p_pause, v_pause, dict(blur=1.5, halo=0.3, haze=False, cinema=False)))
VARIANTS.append((18, 'Enchaînée', "Les deux tours s'enchaînent sans arrêt (la version validée).", 6.0, base_profile, base_speed, dict(blur=1.5, halo=0.3, haze=False, cinema=False)))
VARIANTS.append((19, 'Enchaînée rapide', "Les deux tours s'enchaînent, plus vite : 4,5 s au total.", 4.5, base_profile, base_speed, dict(blur=1.6, halo=0.3, haze=False, cinema=False)))
VARIANTS.append((20, 'Éclat renforcé', "Enchaînée, avec un éclat beaucoup plus large et lumineux quand le faisceau passe devant.", 6.0, base_profile, base_speed, dict(blur=1.5, halo=0.3, haze=False, cinema=True, flare_pow=2.2)))

cards, allcss = '', ''
for v, name, desc, dur, prof, spd, opts in VARIANTS:
    T, profile, speed = dur, prof, spd
    s, c = build(v, **opts)
    if v == 20:  # éclat plus large et plus intense
        c = c.replace('transform: scale(0.200', 'transform: scale(0.200')
        s = s.replace('r="22" fill="url(#v20-flare)"', 'r="30" fill="url(#v20-flare)"')
    allcss += c
    open(f'logo-rot4-v{v}.svg', 'w').write(s.replace('<svg class', '<svg style="background:#05070D" class', 1).replace('</defs>', f'</defs><style>{c}</style>', 1))
    cards += f'<section><div class="stage" data-t="{dur}">{s}</div><div class="meta"><span>Option {v - 16} · {dur:g} s · 2 tours</span><h2>{name}</h2><p>{desc}</p></div></section>'
html = f'''<!doctype html><html lang="fr"><meta charset="utf-8"><title>Logo · options finales</title>
<style>body{{margin:0;padding:32px;background:#e7e5df;font-family:Inter,system-ui,sans-serif}}h1{{margin:0 0 20px;font-size:24px}}
section{{display:grid;grid-template-columns:1fr 300px;gap:24px;align-items:center;margin-bottom:18px;background:#fff;border-radius:16px;padding:16px}}
.stage{{background:#05070D;border-radius:12px;padding:40px 30px;display:grid;place-items:center;cursor:pointer}}.stage svg{{width:100%;max-width:720px;height:auto;overflow:visible}}
.meta span{{font-size:12px;font-weight:700;color:#999;letter-spacing:.06em;text-transform:uppercase}}.meta h2{{margin:6px 0;font-size:22px}}.meta p{{margin:0;color:#555;line-height:1.5}}
{allcss}</style><h1>Rotation du feu : 4 options</h1>{cards}
<script>function replay(st){{const s=st.querySelector('svg');s.replaceWith(s.cloneNode(true));}}
document.querySelectorAll('.stage').forEach(st=>{{st.addEventListener('click',()=>replay(st));setInterval(()=>replay(st),(+st.dataset.t+1.5)*1000);}});</script></html>'''
open('rotation4.html', 'w').write(html)
print('ok')
