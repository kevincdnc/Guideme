# Exporte toutes les icônes de l'app dans design/guideme-icones.svg (pour Figma).
#   python3 scripts/export-icons.py
import re
src=open('src/components/Icon.jsx').read()
block=src[src.index('const PATHS = {')+15:src.index('\n};')]
icons={}
for line in block.split('\n'):
    m=re.match(r'\s{2}([a-z]+):\s*(.*),\s*$',line)
    if not m: continue
    name,jsx=m.group(1),m.group(2).strip()
    if jsx.startswith('(') and jsx.endswith(')'): jsx=jsx[1:-1]
    icons[name]=jsx.replace('<>','').replace('</>','').replace('currentColor','#111111')
mv=open('src/components/MapView.jsx').read()
PIN_PATH=re.search(r"PIN_PATH = '([^']+)'",mv).group(1)
seg=mv[mv.index('const PIN_ICONS'):]; seg=seg[:seg.index('};')]
pin_icons=dict(re.findall(r"^\s{2}(\w+): '([^']*)',$",seg,re.M))
seg=mv[mv.index('const PIN_COLORS'):]; seg=seg[:seg.index('};')]
pin_colors=dict(re.findall(r"(\w+): '(#[0-9a-f]{6})'",seg))
herm=re.findall(r"'(M[^']+)'",open('src/components/Hermine.jsx').read())
SECTIONS=[
 ('Catégories (tags)',[('cliff','Site naturel'),('lighthouse','Phare'),('book','Patrimoine'),('trophy','Légendaire'),('beach','Plage'),('port','Port'),('fire','Préhistoire'),('check','Coche')]),
 ('Statuts',[('check','Déjà visité'),('star','To-do list'),('pushpin','Commune')]),
 ('Lieux (repères)',[('church','Église / patrimoine'),('lighthouse','Phare'),('beach','Plage'),('cliff','Falaise'),('port','Port'),('fire','Préhistoire')]),
 ('Compteurs',[('calendar','Date'),('ruler','Hauteur'),('beam','Portée'),('users','Personnes'),('stairs','Marches'),('area','Surface'),('hourglass','Âge'),('wave','Courant')]),
 ('Marque',[('hermine','Hermine'),('bigouden','Bigouden'),('medal','Médaille'),('star','Étoile'),('spark','Le saviez-vous'),('trophy','Records')]),
 ('Interface',[(n,n) for n in ['back','close','chevron','plus','check','share','external','map','locate','sliders','flag','layers','list','pin','route','search','user','headphones','play','pause','next','prev','clock','image','film','lock','car','bus','hike','warn']]),
]
COLS=8; CW=130; CH=130; S=2.5
out=[]; y=40
out.append(f'<text x="40" y="{y}" font-family="Inter, Arial" font-size="28" font-weight="700" fill="#111111">guideme.bzh · icônes</text>'); y+=34
out.append(f'<text x="40" y="{y}" font-family="Inter, Arial" font-size="14" fill="#6b7280">Grille 24 × 24, trait 2, extrémités et angles arrondis (affichées ici à ×2,5).</text>'); y+=40
def box(x,yy,label,body,gid):
    return (f'<g id="{gid}"><rect x="{x}" y="{yy}" width="{CW-10}" height="{CH-10}" rx="10" fill="#f5f4ef"/>{body}'
            f'<text x="{x+(CW-10)/2}" y="{yy+CH-22}" text-anchor="middle" font-family="Inter, Arial" font-size="12" fill="#374151">{label}</text></g>')
for title,items in SECTIONS:
    out.append(f'<text x="40" y="{y}" font-family="Inter, Arial" font-size="18" font-weight="700" fill="#111111">{title}</text>'); y+=16
    sid=re.sub(r'[^a-z]+','-',title.lower()).strip('-'); out.append(f'<g id="{sid}">')
    for i,it in enumerate(items):
        n,label=it[0],it[1]; x=40+(i%COLS)*CW; yy=y+(i//COLS)*CH
        tx=x+(CW-10)/2-12*S; ty=yy+12
        if title.startswith('Lieux'):
            ic=pin_icons.get(n) or icons.get(n,''); col=pin_colors.get(n,'#ff5a36')
            body=(f'<g transform="translate({x+(CW-10)/2-22*1.6:.1f} {yy+8}) scale(1.6)"><path d="{PIN_PATH}" fill="{col}" stroke="#ffffff" stroke-width="3.2" stroke-linejoin="round"/>'
                  f'<g transform="translate(11 10) scale(0.9167)" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">{ic}</g></g>')
        elif n=='hermine':
            body=f'<g transform="translate({x+(CW-10)/2-66*0.62/2:.1f} {yy+10}) scale(0.62)" fill="#111111">'+''.join(f'<path d="{d}"/>' for d in herm)+'</g>'
        elif title=='Drapeaux':
            col,filled=it[2],it[3]; inner=icons['flag'].replace('#111111',col)
            body=f'<g transform="translate({tx:.1f} {ty:.1f}) scale({S})" fill="none" stroke="{col}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{inner if not filled else inner.replace("<path d=\"M6 4.5", "<path fill=\"" + col + "\" d=\"M6 4.5")}</g>'
        else:
            if n not in icons: continue
            body=f'<g transform="translate({tx:.1f} {ty:.1f}) scale({S})" fill="none" stroke="#111111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{icons[n]}</g>'
        out.append(box(x,yy,label,body,f'{sid}-{n}-{i}'))
    out.append('</g>'); y+=((len(items)-1)//COLS+1)*CH+40
# Tampon « Breizh validé »
out.append(f'<text x="40" y="{y}" font-family="Inter, Arial" font-size="18" font-weight="700" fill="#111111">Tampon</text>'); y+=16
herm_g=''.join(f'<path d="{d}"/>' for d in herm)
out.append(f'''<g id="tampon-breizh-valide"><rect x="40" y="{y}" width="{CW-10}" height="{CH-10}" rx="10" fill="#f5f4ef"/>
<g transform="translate({40+(CW-10)/2-30} {y+14}) rotate(-12 30 30)" color="#15803d">
<defs><path id="arc" d="M12 30a18 18 0 0 1 36 0"/></defs>
<circle cx="30" cy="30" r="27" fill="none" stroke="#15803d" stroke-width="2.4"/>
<circle cx="30" cy="30" r="22.5" fill="none" stroke="#15803d" stroke-width="1" stroke-dasharray="2 2.2"/>
<text font-family="Inter, Arial" font-size="8.6" font-weight="800" letter-spacing="1.6" fill="#15803d"><textPath href="#arc" startOffset="50%" text-anchor="middle">BREIZH</textPath></text>
<g transform="translate(26.6 30) scale(.105)" fill="#15803d">{herm_g}</g>
<text x="30" y="49" text-anchor="middle" font-family="Inter, Arial" font-size="7.4" font-weight="800" letter-spacing="1.1" fill="#15803d">VALIDÉ</text></g>
<text x="{40+(CW-10)/2}" y="{y+CH-22}" text-anchor="middle" font-family="Inter, Arial" font-size="12" fill="#374151">Breizh validé</text></g>''')
y+=CH+30
W=80+COLS*CW
open('design/guideme-icones.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{y}" viewBox="0 0 {W} {y}"><rect width="{W}" height="{y}" fill="#ffffff"/>'+'\n'.join(out)+'</svg>\n')
print('ok', len(icons), 'icônes')
