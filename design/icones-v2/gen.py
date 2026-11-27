# Génère la planche SVG, les icônes séparées et la page d'aperçu à partir de icons.json
import json
items=json.load(open('icons.json'))
def body(it):
    b=''.join(f'<path d="{d}"/>' for d in it[2])
    for c in (it[3] if len(it)>3 else []): b+=f'<circle cx="{c[1]}" cy="{c[2]}" r="{c[3]}"/>'
    return b
ATTR='fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
S=3; CW=124; cols=6; out=[]
for i,it in enumerate(items):
    x=24+(i%cols)*CW; y=24+(i//cols)*150
    out.append(f'<g id="{it[0]}"><rect x="{x}" y="{y}" width="{CW-12}" height="138" rx="14" fill="#f5f4ef"/><g transform="translate({x+(CW-12)/2-12*S} {y+18}) scale({S})" {ATTR.replace("currentColor","#111111")}>{body(it)}</g><text x="{x+(CW-12)/2}" y="{y+120}" text-anchor="middle" font-family="Inter, Arial" font-size="12" fill="#374151">{it[1]}</text></g>')
W=24*2+cols*CW-12; H=24*2+2*150-12
open('../guideme-icones-tags-v2.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="100%" height="100%" fill="#fff"/>'+''.join(out)+'</svg>\n')
for it in items:
    open(f'{it[0]}.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {ATTR.replace("currentColor","#111111")}>{body(it)}</svg>\n')
icon=lambda it,s: f'<svg width="{s}" height="{s}" viewBox="0 0 24 24" {ATTR}>{body(it)}</svg>'
big=''.join(f'<div class="cell">{icon(it,72)}<span>{it[1]}</span></div>' for it in items)
tags=lambda active: ''.join(f'<span class="tag {"is-active" if it[0]==active else ""} {"tag--visited" if it[0]=="visites" else ""}">{icon(it,15)} {("3 Visités" if it[0]=="visites" else ("2 To-do" if it[0]=="todo" else it[1]))}</span>' for it in items)
small=''.join(f'<span class="sm">{icon(it,16)}</span>' for it in items)+'<br>'+''.join(f'<span class="sm">{icon(it,12)}</span>' for it in items)
html=f'''<!doctype html><html lang="fr"><meta charset="utf-8"><title>Icônes des tags v2</title>
<style>
body{{margin:0;padding:32px;background:#f7f6f2;font-family:Inter,system-ui,sans-serif;color:#0f172a}}
h2{{font-size:15px;margin:28px 0 12px;color:#475569;text-transform:uppercase;letter-spacing:.08em}}
.grid{{display:grid;grid-template-columns:repeat(6,140px);gap:12px}}
.cell{{background:#fff;border:1px solid #e5e7eb;border-radius:16px;height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;font-size:13px;font-weight:600}}
.side{{display:flex;gap:28px}}
.bar{{width:448px;background:#fbfaf7;border:1px solid #e5e7eb;border-radius:14px;padding:16px}}
.bar p{{margin:0 0 10px;font-size:12px;color:#64748b}}
.tags{{display:flex;flex-wrap:wrap;gap:6px}}
.tag{{display:inline-flex;align-items:center;gap:6px;height:38px;padding:0 15px;border-radius:12px;border:1px solid #e2e8f0;background:#fff;font-size:13.5px;font-weight:600;color:#0f172a}}
.tag svg{{color:#475569}}
.tag.is-active{{background:#0f172a;color:#fff;border-color:#0f172a}} .tag.is-active svg{{color:#fff}}
.tag--visited{{background:#effaf2;border-color:#bbe5c6;color:#15803d}} .tag--visited svg{{color:#15803d}}
.sm{{display:inline-grid;place-items:center;width:32px;height:32px;margin:0 4px 6px 0;background:#fff;border:1px solid #e5e7eb;border-radius:8px}}
</style>
<h2>Planche · 24 × 24, trait 2, extrémités arrondies</h2><div class="grid">{big}</div>
<h2>Dans les tags (taille réelle de l'app)</h2>
<div class="side"><div class="bar"><p>Tous actif</p><div class="tags"><span class="tag is-active">Tous</span>{tags(None)}</div></div>
<div class="bar"><p>« Phares » actif</p><div class="tags"><span class="tag">Tous</span>{tags("phare")}</div></div></div>
<h2>Lisibilité en petit · 16 px puis 12 px</h2><div>{small}</div>
</html>'''
open('preview.html','w').write(html)
