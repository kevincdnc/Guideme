# Génère 3 versions animées du logo GuideMe.bzh (rotation de la lumière du phare) : index.html + logo-anim-vN.svg
import re
SRC = open('../../src/assets/logo-guideme.svg').read()
paths = re.findall(r'<path [^>]*?/>', SRC)
def find(prefix): return next(p for p in paths if prefix in p)
TOWER = [p for p in paths if ('#F2F2F2' in p or '#05070D"/>' in p and 'd="M10.8323' in p)]
LANTERN = re.sub(r"fill=\"url\(#[^)]*\)\"", "fill=\"#16191D\"", find("d=\"M14.6118"))
TEXT = find('d="M56.747'); DOT = find('d="M216.077'); BZH = find('d="M227.889'); STAR = find('d="M219.057')
UP = 'M20.2538 12.1254L39.0971 6.25615C39.7149 6.05021 40.0753 6.30763 40.1782 7.02841L40.796 10.8897C40.899 11.5075 40.6416 11.8679 40.0238 11.9709L20.5627 13.5154C19.7389 13.5154 19.4815 13.2065 19.7904 12.5887C19.8934 12.3828 20.0479 12.2283 20.2538 12.1254Z'
LO = 'M20.5615 15.2148L40.0226 16.9138C40.6404 16.9138 40.8978 17.2742 40.7948 17.995L40.177 21.5474C40.074 22.2682 39.7136 22.5256 39.0958 22.3197L20.2526 16.6049C19.6348 16.399 19.4803 16.0901 19.7892 15.6782C19.8922 15.3693 20.1496 15.2148 20.5615 15.2148Z'
CX, CY = 9.94, 14.35  # centre de la lanterne
def mirror(d):
    nums = re.findall(r'-?\d+\.?\d*', d); cmds = re.findall(r'[MLCZ]', d)
    out, i = [], 0
    for tok in re.findall(r'[MLCZ]|-?\d+\.?\d*', d):
        if tok in 'MLCZ': out.append(tok); continue
        out.append(tok); 
    # remplace les x (rang pair) par 2*CX - x
    res, k = [], 0
    for tok in out:
        if tok in 'MLCZ': res.append(tok); continue
        v = float(tok); res.append(f'{(2*CX - v):.3f}' if k % 2 == 0 else tok); k += 1
    return ' '.join(res)
UP_L, LO_L = mirror(UP), mirror(LO)
TEXT = TEXT.replace('fill-opacity="0.95"', '')

def svg(v, disc):
    i = f'v{v}'
    return f'''<svg class="lg lg-{i}" viewBox="-34 -10 336 76" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GuideMe.bzh">
<defs>
  <linearGradient id="{i}-br" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFB900"/><stop offset="1" stop-color="#FFE2A8"/></linearGradient>
  <linearGradient id="{i}-bl" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#FFB900"/><stop offset="1" stop-color="#FFE2A8"/></linearGradient>
  <radialGradient id="{i}-back"><stop offset="0" stop-color="#FFD25A" stop-opacity=".95"/><stop offset=".45" stop-color="#FFB900" stop-opacity=".45"/><stop offset="1" stop-color="#FFB900" stop-opacity="0"/></radialGradient>
  <radialGradient id="{i}-flare"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".22" stop-color="#FFF4D0"/><stop offset=".5" stop-color="#FFC93A" stop-opacity=".55"/><stop offset="1" stop-color="#FFB900" stop-opacity="0"/></radialGradient>
  <linearGradient id="{i}-streak" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF" stop-opacity="0"/><stop offset=".5" stop-color="#FFF"/><stop offset="1" stop-color="#FFF" stop-opacity="0"/></linearGradient>
  <linearGradient id="{i}-star" x1="0" y1="0" x2="1" y2="0"><stop class="s1" offset="0" stop-color="#FFB900"/><stop class="s2" offset="1" stop-color="#FFB900"/></linearGradient>
  <radialGradient id="{i}-disc" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#2c2f36"/><stop offset="1" stop-color="#0d0f14"/></radialGradient>
</defs>
{f'<circle cx="{CX}" cy="30" r="30" fill="url(#{i}-disc)"/>' if disc else ''}
<circle class="back" cx="{CX}" cy="{CY}" r="16" fill="url(#{i}-back)"/>
{''.join(p for p in TOWER)}
{LANTERN}
<rect class="glass" x="5.3" y="10.6" width="9.3" height="7.5" rx=".6" fill="#FFD25A"/>
<g class="beam beam-r"><path d="{UP}" fill="url(#{i}-br)"/><path d="{LO}" fill="url(#{i}-br)"/></g>
<g class="beam beam-l"><path d="{UP_L}" fill="url(#{i}-bl)"/><path d="{LO_L}" fill="url(#{i}-bl)"/></g>
<g class="flare"><circle cx="{CX}" cy="{CY}" r="22" fill="url(#{i}-flare)"/><ellipse cx="{CX}" cy="{CY}" rx="40" ry="1.3" fill="url(#{i}-streak)"/><ellipse cx="{CX}" cy="{CY}" rx="1" ry="14" fill="url(#{i}-streak)" opacity=".6"/></g>
{TEXT}{DOT}{BZH}
{STAR.replace('fill="#FFB900"', f'fill="url(#{i}-star)"')}
</svg>'''

def css(v, T, flareScale, ease):
    i = f'.lg-v{v}'
    return f'''
{i} .beam, {i} .flare, {i} .back, {i} .glass {{ transform-box: fill-box; }}
{i} .beam-r {{ transform-origin: 0% 50%; animation: {i[1:]}-r {T}s {ease} infinite; }}
{i} .beam-l {{ transform-origin: 100% 50%; animation: {i[1:]}-l {T}s {ease} infinite; }}
{i} .back  {{ transform-origin: 50% 50%; animation: {i[1:]}-b {T}s {ease} infinite; }}
{i} .glass {{ animation: {i[1:]}-g {T}s {ease} infinite; }}
{i} .flare {{ transform-origin: 50% 50%; animation: {i[1:]}-f {T}s {ease} infinite; }}
{i} .s1 {{ animation: {i[1:]}-s1 {T}s {ease} infinite; }}
{i} .s2 {{ animation: {i[1:]}-s2 {T}s {ease} infinite; }}
@keyframes {i[1:]}-r {{ 0%,14% {{ transform: scaleX(1); opacity: 1; }} 28% {{ transform: scaleX(0); opacity: 0; }} 82% {{ transform: scaleX(0); opacity: 0; }} 92%,100% {{ transform: scaleX(1); opacity: 1; }} }}
@keyframes {i[1:]}-b {{ 0%,16% {{ opacity: 0; transform: scale(.6); }} 34% {{ opacity: 1; transform: scale(1); }} 46% {{ opacity: .35; }} 52%,100% {{ opacity: 0; transform: scale(.6); }} }}
@keyframes {i[1:]}-l {{ 0%,40% {{ transform: scaleX(0); opacity: 0; }} 52%,58% {{ transform: scaleX(1); opacity: 1; }} 68%,100% {{ transform: scaleX(0); opacity: 0; }} }}
@keyframes {i[1:]}-f {{ 0%,64% {{ opacity: 0; transform: scale(.2); }} 76% {{ opacity: 1; transform: scale({flareScale}); }} 86%,100% {{ opacity: 0; transform: scale(.3); }} }}
@keyframes {i[1:]}-g {{ 0%,16% {{ opacity: 0; }} 34% {{ opacity: .55; }} 52% {{ opacity: .25; }} 60% {{ opacity: .15; }} 76% {{ opacity: 1; }} 90%,100% {{ opacity: 0; }} }}
@keyframes {i[1:]}-s1 {{ 0%,14% {{ stop-color: #FFB900; }} 34% {{ stop-color: #FFB900; }} 56% {{ stop-color: #5c5c5c; }} 64% {{ stop-color: #5c5c5c; }} 78% {{ stop-color: #6b6b6b; }} 92%,100% {{ stop-color: #FFB900; }} }}
@keyframes {i[1:]}-s2 {{ 0%,14% {{ stop-color: #FFB900; }} 34% {{ stop-color: #7a6a40; }} 56% {{ stop-color: #5c5c5c; }} 64% {{ stop-color: #5c5c5c; }} 78% {{ stop-color: #FFD25A; }} 92%,100% {{ stop-color: #FFB900; }} }}
'''

V = [
  (1, 'Veille', "Rotation lente et régulière, comme un vrai feu de phare la nuit. Idéale en entrée de vidéo réseaux sociaux.", 5.2, 1.0, 'cubic-bezier(.45,0,.55,1)', False),
  (2, 'Clin d\'œil', "Un tour rapide et vif, éblouissement bref. Pensée pour le survol du logo et comme loader.", 1.8, 1.15, 'cubic-bezier(.4,0,.2,1)', False),
  (3, 'Signal', "Tempo moyen sur le fond rond du monogramme, éblouissement plus large. Le plus « cinéma ».", 3.4, 1.35, 'cubic-bezier(.5,0,.3,1)', True),
]
cards = ''; allcss = ''
for v, name, desc, T, fs, ease, disc in V:
    s = svg(v, disc); allcss += css(v, T, fs, ease)
    open(f'logo-anim-v{v}.svg', 'w').write(s.replace('<svg class', f'<svg style="background:#05070D" class', 1).replace('</defs>', f'</defs><style>{css(v, T, fs, ease)}</style>', 1))
    cards += f'<section><div class="stage">{s}</div><div class="meta"><span>Version {v} · {T}s / tour</span><h2>{name}</h2><p>{desc}</p></div></section>'
html = f'''<!doctype html><html lang="fr"><meta charset="utf-8"><title>Logo animé · 3 versions</title>
<style>body{{margin:0;padding:32px;background:#e7e5df;font-family:Inter,system-ui,sans-serif}}h1{{margin:0 0 20px;font-size:24px}}
section{{display:grid;grid-template-columns:1fr 300px;gap:24px;align-items:center;margin-bottom:18px;background:#fff;border-radius:16px;padding:16px}}
.stage{{background:#05070D;border-radius:12px;padding:40px 30px;display:grid;place-items:center}}.stage svg{{width:100%;max-width:720px;height:auto;overflow:visible}}
.meta span{{font-size:12px;font-weight:700;color:#999;letter-spacing:.06em;text-transform:uppercase}}.meta h2{{margin:6px 0;font-size:22px}}.meta p{{margin:0;color:#555;line-height:1.5}}
{allcss}</style><h1>Logo animé : 3 versions</h1>{cards}</html>'''
open('index.html', 'w').write(html)
print('ok')
