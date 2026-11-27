# Génère les 4 directions de marque GuideMe.bzh : design/brand/brand.html + logos SVG
import json
ICONS = json.load(open('icons.json'))
ORDER = [i[0] for i in ICONS]
LABEL = {i[0]: i[1] for i in ICONS}

def paths(it, extra=''):
    b = ''.join(f'<path d="{d}"/>' for d in it[2])
    for c in (it[3] if len(it) > 3 else []): b += f'<circle cx="{c[1]}" cy="{c[2]}" r="{c[3]}"/>'
    return b
def stroke_icon(key, size, color, sw=2, cap='round'):
    it = next(i for i in ICONS if i[0] == key)
    return f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="{sw}" stroke-linecap="{cap}" stroke-linejoin="{"round" if cap=="round" else "miter"}">{paths(it)}</svg>'

# ---------- Phare de l'île Vierge (dessin commun, tour élancée tronconique) ----------
def vierge(tower='#fff', detail='#07080d', beam='#ffc21a', beams=True, lantern=None):
    lantern = lantern or beam
    b = ''
    if beams:
        b = (f'<path d="M25.5 12.2L41 7.6v3.4z" fill="{beam}"/><path d="M25.5 15L41 15.4v3.4z" fill="{beam}" opacity=".85"/>'
             f'<path d="M14.5 12.2L4 9.4v2.6z" fill="{beam}" opacity=".5"/>')
    return (f'{b}<path d="M20 2.2v2.2" stroke="{tower}" stroke-width="1.6" stroke-linecap="round"/>'
            f'<path d="M15.6 10.2a4.4 4.4 0 018.8 0z" fill="{tower}"/>'
            f'<rect x="16.4" y="10.6" width="7.2" height="6" rx=".8" fill="{lantern}"/>'
            f'<path d="M17.6 10.6v6M20 10.6v6M22.4 10.6v6" stroke="{detail}" stroke-width=".7" opacity=".55"/>'
            f'<rect x="13.6" y="16.6" width="12.8" height="2.6" rx="1.2" fill="{tower}"/>'
            f'<path d="M15.6 19.4h8.8l2.2 39.4H13.4z" fill="{tower}"/>'
            f'<rect x="19" y="25" width="2" height="3.6" rx="1" fill="{detail}"/><rect x="19" y="35" width="2" height="3.6" rx="1" fill="{detail}"/><rect x="19" y="45" width="2" height="3.6" rx="1" fill="{detail}"/>'
            f'<rect x="11" y="58.4" width="18" height="3.6" rx="1.4" fill="{tower}"/>')

def svg(w, h, inner, vb=None):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="{vb or f"0 0 {w} {h}"}">{inner}</svg>'

# ---------- Pixel art ----------
PIX_ICONS = {
 'visites': ["............","............","..........X.",".........XX.","........XX..",".X.....XX...",".XX...XX....","..XX.XX.....","...XXX......","....X.......","............","............"],
 'todo': [".....XX.....",".....XX.....","....XXXX....","XXXXXXXXXXXX",".XXXXXXXXXX.","..XXXXXXXX..","...XXXXXX...","...XXXXXX...","..XXX..XXX..","..XX....XX..",".XX......XX.","............"],
 'nature': ["............",".......X....","......XXX...","...X.XXXXX..","..XXXXXXXXX.",".XXXXXXXXXXX","............","............",".XX...XX....","X..X.X..X..X","....X....XX.","............"],
 'phare': [".....XX.....","....XXXX....","X...X..X...X",".XX.XXXX.XX.","...XXXXXX...","....XXXX....","....X..X....","....XXXX....","...XX..XX...","...XXXXXX...","..XXXXXXXX..",".XXXXXXXXXX."],
 'patrimoine': [".....XX.....","....XXXX....",".....XX.....","....XXXX....","...XXXXXX...","..XXXXXXXX..",".XXXXXXXXXX.",".XXXXXXXXXX.",".XXXX..XXXX.",".XXX....XXX.",".XXX....XXX.","XXXXXXXXXXXX"],
 'legendaire': ["XXXXXXXXXXXX","X.XXXXXXXX.X","X.XXXXXXXX.X",".XXXXXXXXXX.","...XXXXXX...","....XXXX....",".....XX.....",".....XX.....","....XXXX....","...XXXXXX...","...XXXXXX...","............"],
 'plage': [".....XX.....","...XXXXXX...",".XXXXXXXXXX.","XXXXXXXXXXXX",".....XX.....",".....XX.....",".....XX.....",".....XX.....","............",".XX...XX....","X..X.X..X..X","....X....XX."],
 'port': [".....XX.....","....X..X....",".....XX.....",".....XX.....","...XXXXXX...",".....XX.....",".....XX.....","X....XX....X","XX...XX...XX",".XX..XX..XX.","..XXXXXXXX..","....XXXX...."],
 'prehistoire': ["............","..XXXXXXXX..","XXXXXXXXXXXX",".XXXXXXXXXX.","............",".XXX....XXX.",".XXX....XXX.",".XXX....XXX.","XXXX....XXXX","XXXX....XXXX","XXXXXXXXXXXX","............"],
 'villes': ["........X...",".......XXX..",".......X.X..","..X....XXX..",".XXX..XXXXX.","XXXXXXXXXXXX",".XXXX.XXXXX.",".X..X.XX.XX.",".XXXX.XX.XX.",".XXXX.XXXXX.","XXXXXXXXXXXX","............"],
 'histoire': ["..........X.",".........XXX",".XXXX..XX.X.","X....XX....X","X.XX.XX.XX.X","X....XX....X","X.XX.XX.XX.X","X....XX....X","X.XX.XX.XX.X","XXXXXXXXXXXX",".....XX.....","............"],
}
def pix(rows, size, color, colors=None):
    n = len(rows[0]); u = size / max(n, len(rows)); r = ''
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            if ch == '.': continue
            c = (colors or {}).get(ch, color)
            r += f'<rect x="{x*u:.2f}" y="{y*u:.2f}" width="{u+.05:.2f}" height="{u+.05:.2f}" fill="{c}"/>'
    return f'<svg width="{size}" height="{size*len(rows)/n:.0f}" viewBox="0 0 {size} {size*len(rows)/n:.2f}" shape-rendering="crispEdges">{r}</svg>'
PIX_VIERGE = [
 ".......RR.......","......RRRR......","YYY..RRRRRR..YYY","..YYKYYYYYYKYY..","YYY.KYYYYYYK.YYY","....KKKKKKKK....","...KKKKKKKKKK...","....KWWWWWWK....","....KWWKKWWK....","....KWWWWWWK....","....KWWWWWWK....","...KWWWWWWWWK...","...KWWWKKWWWK...","...KWWWWWWWWK...","...KWWWWWWWWK...","...KWWWKKWWWK...","..KWWWWWWWWWWK..","..KWWWWWWWWWWK..","..KWWWWKKWWWWK..","..KWWWWKKWWWWK..",".KKKKKKKKKKKKKK.","BBSBBBBSSBBBBSBB","SBBBSSBBBBSSBBBS",
]

# ---------- Faïence : bordure à pétales ----------
def faience_badge(size, inner):
    import math
    petals = ''
    for i in range(16):
        a = i * math.pi * 2 / 16
        x, y = 50 + 43 * math.cos(a), 50 + 43 * math.sin(a)
        col = ['#1d4fa0', '#f6b400', '#2f9e44', '#e03131'][i % 4]
        petals += f'<ellipse cx="{x:.2f}" cy="{y:.2f}" rx="4.2" ry="6.4" fill="{col}" transform="rotate({math.degrees(a)+90:.1f} {x:.2f} {y:.2f})"/>'
    dots = ''.join(f'<circle cx="{50+36*math.cos(i*math.pi/12):.2f}" cy="{50+36*math.sin(i*math.pi/12):.2f}" r="1.1" fill="#1d4fa0"/>' for i in range(24))
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 100 100">{petals}<circle cx="50" cy="50" r="39" fill="#fff8e7" stroke="#1d4fa0" stroke-width="2.4"/>{dots}'
            f'<clipPath id="fc{size}"><circle cx="50" cy="50" r="33"/></clipPath><g clip-path="url(#fc{size})"><rect x="0" y="0" width="100" height="100" fill="#cfe5ff"/>'
            f'<path d="M10 74c8-5 14-5 22 0s14 5 22 0 14-5 22 0 14 5 22 0V100H10z" fill="#1d4fa0"/><path d="M10 82c8-5 14-5 22 0s14 5 22 0 14-5 22 0 14 5 22 0" fill="none" stroke="#fff" stroke-width="1.6" opacity=".6"/>'
            f'<g transform="translate(31 14) scale(.95)">{inner}</g></g></svg>')

# =================================================================================
D = []

# ---------- 1. Tour-tan : la nuit du phare (reprend le logo) ----------
d1 = dict(id='tourtan', num='01', name='Tour-tan', sub='« phare » en breton · la nuit, le faisceau, l\'info qui éclaire',
  bg='#07080d', panel='#11131c', ink='#ffffff', muted='#8b93a7', accent='#ffc21a', line='#232736',
  font_head="'Fredoka', sans-serif", font_body="'Nunito', sans-serif",
  palette=[('Nuit de phare', '#07080d'), ('Faisceau', '#ffc21a'), ('Granit', '#c9ced8'), ('Opaline', '#3d8fd6'), ('Raz de Sein', '#0e2a47'), ('Visité', '#2fd47a')],
  why="Ton logo tel quel, affiné : le phare blanc de l'île Vierge sur fond nuit, deux faisceaux jaunes. Typo ronde Fredoka, côté jeu sans être enfantin. Le bleu « opaline » vient des 12 500 plaques d'opaline bleu azur qui tapissent l'intérieur du phare.",
  tagline='Tour-tan · Le phare qui éclaire ton Finistère')
d1['logo'] = (f'<div class="wlogo">{svg(46, 74, vierge(), "0 0 42 64")}<span class="w1">GuideMe<i class="star">✦</i><em>bzh</em></span></div>')
d1['logo_svg'] = svg(420, 96, f'<g transform="translate(6 14) scale(1.15)">{vierge()}</g><text x="62" y="66" font-family="Fredoka" font-weight="700" font-size="50" fill="#fff" letter-spacing="-1">GuideMe<tspan fill="#ffc21a" font-size="22" dy="-2"> ✦</tspan><tspan fill="#8b93a7" font-weight="600" font-size="50" dy="2">bzh</tspan></text>')
d1['mark'] = svg(120, 120, f'<rect width="120" height="120" rx="28" fill="#07080d"/><circle cx="60" cy="40" r="34" fill="#ffc21a" opacity=".1"/><g transform="translate(36 22) scale(1.25)">{vierge()}</g>')
d1['mark2'] = svg(120, 120, f'<rect width="120" height="120" rx="28" fill="#ffc21a"/><g transform="translate(36 22) scale(1.25)">{vierge(tower="#07080d", detail="#ffc21a", beam="#07080d", lantern="#fff")}</g>')
d1['icons'] = ''.join(f'<div class="ic">{stroke_icon(k, 30, "#fff")}<span>{LABEL[k]}</span></div>' for k in ORDER)
D.append(d1)

# ---------- 2. Gwenn ha Du : granit, hermine, éditorial (reprend le logo) ----------
herm = '<path d="M0-6c1.2 1.6 1.2 3 0 4.4-1.2-1.4-1.2-2.8 0-4.4zM-3.6-3.2c1.9.2 2.9 1.2 3 3-1.9-.1-2.9-1.1-3-3zM3.6-3.2c-.1 1.8-1.1 2.8-3 3 .1-1.8 1.1-2.8 3-3zM-.9-1h1.8L1.6 6 0 4.6-1.6 6z" fill="currentColor"/>'
d2 = dict(id='gwennhadu', num='02', name='Gwenn ha Du', sub='« blanc et noir » · granit, hermine, carnet de voyage',
  bg='#f3efe6', panel='#fffdf8', ink='#111111', muted='#6b6558', accent='#111111', line='#ddd5c4',
  font_head="'Fraunces', serif", font_body="'Inter', sans-serif",
  palette=[('Du', '#111111'), ('Gwenn', '#ffffff'), ('Granit rose', '#e8c9b5'), ('Lichen', '#d9a521'), ('Mor', '#12355b'), ('Goémon', '#4f6b3a')],
  why="Ton logo passé en noir sur papier, avec les couleurs du Gwenn ha Du. Une moucheture d'hermine remplace le point, et un faisceau jaune « lichen », comme les lichens des rochers. Fraunces, un serif doux, donne un ton de guide de voyage haut de gamme. Les icônes ont un trait fin, comme gravées.",
  tagline='Degemer mat e Penn-ar-Bed · Bienvenue au bout du monde')
d2['logo'] = (f'<div class="wlogo">{svg(46, 74, vierge(tower="#111", detail="#f3efe6", beam="#d9a521", lantern="#d9a521"), "0 0 42 64")}<span class="w2">GuideMe<svg class="herm" viewBox="-5 -7 10 14" width="20" height="28" color="#111">{herm}</svg><em>bzh</em></span></div>')
d2['logo_svg'] = svg(440, 96, f'<g transform="translate(6 14) scale(1.15)">{vierge(tower="#111", detail="#f3efe6", beam="#d9a521", lantern="#d9a521")}</g><text x="62" y="66" font-family="Fraunces" font-weight="700" font-size="50" fill="#111" letter-spacing="-1.5">GuideMe<tspan font-style="italic" font-weight="400" dx="14">bzh</tspan></text>')
stripes = ''.join(f'<rect x="0" y="{i*13.3:.1f}" width="120" height="6.65" fill="#111"/>' for i in range(9))
d2['mark'] = svg(120, 120, f'<rect width="120" height="120" rx="28" fill="#fffdf8" stroke="#111" stroke-width="3"/><g transform="translate(36 22) scale(1.25)">{vierge(tower="#111", detail="#fffdf8", beam="#d9a521", lantern="#d9a521")}</g>')
d2['mark2'] = svg(120, 120, f'<clipPath id="gr"><rect width="120" height="120" rx="28"/></clipPath><g clip-path="url(#gr)"><rect width="120" height="120" fill="#fff"/>{stripes}<rect width="54" height="54" fill="#fff"/>'
  + ''.join(f'<g transform="translate({x} {y}) scale(1.2)" color="#111">{herm}</g>' for x, y in [(14,14),(40,14),(27,30),(14,44),(40,44)]) + '</g>')
d2['icons'] = ''.join(f'<div class="ic">{stroke_icon(k, 30, "#111", sw=1.5)}<span>{LABEL[k]}</span></div>' for k in ORDER)
D.append(d2)

# ---------- 3. Kerzh ! : arcade pixel (variante de logo) ----------
d3 = dict(id='kerzh', num='03', name='Kerzh\u202f!', sub='« en avant ! » · arcade 8-bit, le Finistère comme une carte de jeu',
  bg='#1b1f3b', panel='#252a52', ink='#f8f7ff', muted='#a8acd6', accent='#ffe066', line='#3a4078',
  font_head="'Press Start 2P', monospace", font_body="'Pixelify Sans', sans-serif",
  palette=[('Nuit arcade', '#1b1f3b'), ('Lanterne', '#ffe066'), ('Lagon des Glénan', '#2ec4b6'), ('Feu rouge', '#ef476f'), ('Écume', '#f8f7ff'), ('XP', '#7bd389')],
  why="Variante du logo en pixel art : la Vierge en sprite 16 × 23 avec son dôme rouge, posée sur la mer. Les spots deviennent des niveaux, les visites donnent des XP, la carte se lit comme un monde à débloquer. Press Start 2P pour le logo, Pixelify Sans pour l'interface. Les icônes sont redessinées sur une grille de 12 × 12.",
  tagline='Kerzh\u202f! · 30 niveaux au bout du monde')
pv = pix(PIX_VIERGE, 64, '#fff', {'R': '#ef476f', 'Y': '#ffe066', 'K': '#1b1f3b', 'W': '#f8f7ff', 'B': '#2ec4b6', 'S': '#1a8f86'})
d3['logo'] = (f'<div class="pxlogo">{pv}<div><b>GUIDEME<i>.BZH</i></b><small>▸ PRESS START · KERZH !</small></div></div>')
d3['mark'] = f'<div class="pxmark">{pix(PIX_VIERGE, 70, "#fff", {"R": "#ef476f", "Y": "#ffe066", "K": "#1b1f3b", "W": "#f8f7ff", "B": "#2ec4b6", "S": "#1a8f86"})}</div>'
d3['mark2'] = f'<div class="pxmark pxmark--y">{pix(PIX_ICONS["phare"], 56, "#1b1f3b")}</div>'
d3['icons'] = ''.join(f'<div class="ic">{pix(PIX_ICONS[k], 30, "#f8f7ff")}<span>{LABEL[k]}</span></div>' for k in ORDER)
D.append(d3)

# ---------- 4. Faïence : badge folk & pop (variante de logo) ----------
FCOL = {'visites': '#2f9e44', 'todo': '#f6b400', 'nature': '#2f9e44', 'phare': '#e03131', 'patrimoine': '#7048e8', 'legendaire': '#f6b400',
        'plage': '#22a3c4', 'port': '#1d4fa0', 'prehistoire': '#a0522d', 'villes': '#e8590c', 'histoire': '#1d4fa0'}
d4 = dict(id='faience', num='04', name='Faïence', sub='bol breton, broderie bigoudène · un écusson à collectionner',
  bg='#fff8e7', panel='#ffffff', ink='#1c1c3c', muted='#6d6a86', accent='#1d4fa0', line='#f0e2bf',
  font_head="'Lilita One', sans-serif", font_body="'Nunito', sans-serif",
  palette=[('Bleu faïence', '#1d4fa0'), ('Crème', '#fff8e7'), ('Jaune genêt', '#f6b400'), ('Rouge broderie', '#e03131'), ('Vert lande', '#2f9e44'), ('Encre', '#1c1c3c')],
  why="Variante en écusson : la Vierge dans un médaillon à pétales, aux quatre couleurs des bols peints et des broderies bigoudènes, sur une mer bleu faïence. Chaque catégorie devient un jeton de couleur à collectionner, comme des badges de jeu. Lilita One, une typo ronde et grasse, porte le côté pop.",
  tagline='Penn-ar-Bed · Collectionne le bout du monde')
fv = vierge(tower='#fff', detail='#1d4fa0', beam='#f6b400', lantern='#f6b400')
d4['logo'] = (f'<div class="fzlogo">{faience_badge(92, fv)}<div><b>GuideMe<em>.bzh</em></b><span class="ribbon">Penn-ar-Bed</span></div></div>')
d4['mark'] = faience_badge(120, fv)
d4['mark2'] = svg(120, 120, f'<rect width="120" height="120" rx="28" fill="#1d4fa0"/><g transform="translate(36 22) scale(1.25)">{vierge(tower="#fff8e7", detail="#1d4fa0", beam="#f6b400", lantern="#f6b400")}</g>'
  '<circle cx="18" cy="18" r="3" fill="#f6b400"/><circle cx="102" cy="18" r="3" fill="#e03131"/><circle cx="18" cy="102" r="3" fill="#2f9e44"/><circle cx="102" cy="102" r="3" fill="#f6b400"/>')
d4['icons'] = ''.join(f'<div class="ic"><span class="tok" style="background:{FCOL[k]}">{stroke_icon(k, 22, "#fff", sw=2.4)}</span><span>{LABEL[k]}</span></div>' for k in ORDER)
D.append(d4)

# ---------- Maquette d'interface par direction ----------
def ui(d):
    k = d['id']
    tagkeys = ['nature', 'phare', 'patrimoine', 'villes', 'histoire']
    if k == 'kerzh':
        ic = lambda key, c: pix(PIX_ICONS[key], 14, c)
    elif k == 'faience':
        ic = lambda key, c: f'<span class="tok tok--s" style="background:{FCOL[key]}">{stroke_icon(key, 12, "#fff", sw=2.6)}</span>'
    else:
        ic = lambda key, c: stroke_icon(key, 15, c, sw=1.5 if k == 'gwennhadu' else 2)
    head = {'tourtan': 'Tu crois connaître le Finistère ?', 'gwennhadu': 'Tu crois connaître le Finistère ?', 'kerzh': 'MONDE 1 · PENN-AR-BED', 'faience': 'Tu crois connaître le Finistère ?'}[k]
    sub = {'kerzh': '17/30 NIVEAUX · 1 250 XP'}.get(k, '30 spots made in Penn-ar-Bed')
    tags = f'<span class="t t--on">Tous</span><span class="t t--v">{ic("visites", "currentColor")} 17 Visités</span>' + ''.join(f'<span class="t">{ic(t, "currentColor")} {LABEL[t]}</span>' for t in tagkeys)
    card = lambda title, town, done: (f'<div class="card {"is-done" if done else ""}"><div class="thumb"></div><div class="cb"><b>{title}</b><small>{town}</small></div>'
        f'<span class="chk">{ic("visites", "currentColor") if done else ""}</span>{"<span class=\"stamp\">" + ("+50 XP" if k == "kerzh" else ("Kenavo !" if k=="faience" else "Breizh")) + "</span>" if done else ""}</div>')
    gauge = {'kerzh': '<span class="xp"><i style="width:57%"></i></span>', 'faience': '<span class="gauge">17<small>/30</small></span>'}.get(k, '<span class="ring">57</span>')
    return (f'<div class="ui"><div class="bar"><span class="mini">{d["markmini"]}</span><b class="wm">GuideMe<em>.bzh</em></b>{gauge}</div>'
            f'<div class="uib"><h4>{head}</h4><p>{sub}</p><div class="tags">{tags}</div>'
            f'{card("Phare de l&#39;île Vierge", "Plouguerneau · 82,5 m", True)}{card("Pointe du Raz", "Plogoff · Cap Sizun", False)}</div></div>')
d1['markmini'] = svg(22, 34, f'<g transform="scale(.52)">{vierge()}</g>')
d2['markmini'] = svg(22, 34, f'<g transform="scale(.52)">{vierge(tower="#fffdf8", detail="#111", beam="#d9a521", lantern="#d9a521")}</g>')
d3['markmini'] = pix(PIX_VIERGE, 22, '#fff', {'R': '#ef476f', 'Y': '#ffe066', 'K': '#1b1f3b', 'W': '#f8f7ff', 'B': '#2ec4b6', 'S': '#1a8f86'})
d4['markmini'] = faience_badge(32, fv)

# ---------- Page ----------
FONTS = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@500;700;800&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400&family=Inter:wght@400;600;700&family=Press+Start+2P&family=Pixelify+Sans:wght@400;600&family=Lilita+One&display=swap'
CSS = '''
*{box-sizing:border-box} body{margin:0;background:#d9d6cf;font-family:Inter,system-ui,sans-serif}
.dir{width:1280px;margin:0 auto 40px;padding:44px 48px 48px;background:var(--bg);color:var(--ink);font-family:var(--fb);border-radius:0}
.dh{display:flex;align-items:baseline;gap:16px;margin-bottom:6px}
.dh .num{font-family:var(--fh);font-size:15px;color:var(--accent);letter-spacing:.1em}
.dh h2{margin:0;font-family:var(--fh);font-size:44px;line-height:1;letter-spacing:-.01em}
.dsub{margin:0 0 26px;color:var(--muted);font-size:16px}
.grid{display:grid;grid-template-columns:1.25fr 1fr;gap:20px}
.box{background:var(--panel);border:1px solid var(--line);border-radius:20px;padding:24px}
.box h3{margin:0 0 14px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-family:var(--fb);font-weight:800}
.logo{display:flex;align-items:center;min-height:120px}
.marks{display:flex;gap:16px;align-items:center;margin-top:18px}
.why{font-size:14.5px;line-height:1.6;color:var(--ink);opacity:.9;margin:0}
.tagline{margin:14px 0 0;font-family:var(--fh);font-size:17px;color:var(--accent)}
.pal{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
.sw{border-radius:12px;overflow:hidden;border:1px solid var(--line);font-size:11px}
.sw i{display:block;height:58px}.sw span{display:block;padding:7px 8px;background:var(--panel);color:var(--ink);line-height:1.3}.sw b{display:block;font-size:11.5px}
.type .big{font-family:var(--fh);font-size:34px;line-height:1.1;margin:0 0 6px}
.type .bd{font-size:14px;color:var(--muted);margin:0;line-height:1.55}
.icons{display:grid;grid-template-columns:repeat(11,1fr);gap:8px}
.ic{display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 4px 10px;border-radius:14px;background:var(--bg);border:1px solid var(--line);font-size:10.5px;text-align:center;color:var(--muted);line-height:1.2;min-height:94px}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:20px}
.full{margin-top:20px}
.tok{display:inline-grid;place-items:center;width:40px;height:40px;border-radius:50%;box-shadow:inset 0 -3px 0 rgba(0,0,0,.18),0 0 0 3px #fff,0 0 0 4.5px currentColor}
.tok--s{width:20px;height:20px;box-shadow:inset 0 -2px 0 rgba(0,0,0,.18)}
/* maquette */
.ui{border-radius:20px;overflow:hidden;border:1px solid var(--line);background:var(--uibg)}
.bar{display:flex;align-items:center;gap:10px;padding:12px 16px;background:var(--barbg);color:var(--barink)}
.wm{font-family:var(--fh);font-size:20px;flex:1}.wm em{font-style:normal;opacity:.55}
.ring{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;border:3px solid var(--good);font:800 11px var(--fb)}
.uib{padding:16px}
.uib h4{margin:0;font-family:var(--fh);font-size:20px}.uib p{margin:3px 0 12px;font-size:13px;color:var(--muted)}
.tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
.t{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 12px;border-radius:var(--tr);border:1px solid var(--line);background:var(--panel);font-size:12.5px;font-weight:700}
.t--on{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.t--v{background:var(--goodsoft);color:var(--goodink);border-color:transparent}
.card{position:relative;display:flex;align-items:center;gap:12px;padding:10px;border-radius:var(--cr);border:1px solid var(--line);background:var(--panel);margin-bottom:8px}
.card.is-done{border-color:var(--good)}
.thumb{width:56px;height:56px;border-radius:calc(var(--cr) - 4px);background:linear-gradient(160deg,#7fb9f0,#2b5d8a 60%,#3b3b3b)}
.cb{flex:1}.cb b{display:block;font-family:var(--fh);font-size:15px}.cb small{color:var(--muted);font-size:12px}
.chk{width:28px;height:28px;border-radius:8px;border:2px solid var(--line);display:grid;place-items:center}
.is-done .chk{background:var(--good);border-color:var(--good);color:#fff}
.stamp{position:absolute;right:52px;top:50%;transform:translateY(-50%) rotate(-10deg);font:800 11px var(--fh);color:var(--good);border:2px solid var(--good);border-radius:6px;padding:3px 6px;opacity:.85}
/* directions */
#tourtan{--uibg:#0d0f17;--barbg:#000;--barink:#fff;--good:#2fd47a;--goodsoft:rgba(47,212,122,.14);--goodink:#2fd47a;--tr:12px;--cr:14px}
#tourtan .t--on{background:#ffc21a;color:#07080d;border-color:#ffc21a}
#gwennhadu{--uibg:#f3efe6;--barbg:#111;--barink:#fff;--good:#111;--goodsoft:#111;--goodink:#fff;--tr:999px;--cr:4px}
#gwennhadu .dh h2,#gwennhadu .type .big{font-weight:700;letter-spacing:-.02em}
#gwennhadu .stamp{border-radius:50%;padding:8px 5px;font-family:Fraunces;font-style:italic}
#kerzh{--uibg:#141832;--barbg:#0e1126;--barink:#ffe066;--good:#7bd389;--goodsoft:#7bd389;--goodink:#141832;--tr:0;--cr:0}
#kerzh .dh h2{font-size:34px}#kerzh .t,#kerzh .card,#kerzh .box,#kerzh .ic,#kerzh .sw,#kerzh .ui{border-radius:0;border-width:2px;box-shadow:4px 4px 0 #0e1126}
#kerzh .wm{font-size:12px}#kerzh .uib h4{font-size:13px;line-height:1.5}#kerzh .cb b{font-family:'Pixelify Sans';font-size:17px}#kerzh .type .big{font-size:22px;line-height:1.5}
#kerzh .t{font-family:'Pixelify Sans';font-size:15px;font-weight:600}#kerzh .t--on{background:#ffe066;color:#1b1f3b;border-color:#ffe066}#kerzh .chk{border-radius:0}#kerzh .stamp{font-family:'Press Start 2P';font-size:8px;border-radius:0}
#kerzh .tagline{font-size:13px;line-height:1.6}
.xp{width:110px;height:14px;border:2px solid #ffe066;padding:2px}.xp i{display:block;height:100%;background:#7bd389}
#faience{--uibg:#fff8e7;--barbg:#1d4fa0;--barink:#fff;--good:#2f9e44;--goodsoft:#e3f6e7;--goodink:#2f9e44;--tr:999px;--cr:18px}
#faience .t--on{background:#1d4fa0;color:#fff;border-color:#1d4fa0}#faience .dh h2,#faience .wm,#faience .uib h4,#faience .cb b{font-weight:400}
#faience .box{border-width:2px;box-shadow:0 4px 0 var(--line)}
.gauge{background:#f6b400;color:#1c1c3c;font:400 16px 'Lilita One';padding:4px 12px;border-radius:999px}.gauge small{font-size:11px;opacity:.7}
.pxlogo{display:flex;align-items:center;gap:20px}.pxlogo b{display:block;white-space:nowrap;font:26px 'Press Start 2P';color:#f8f7ff;text-shadow:3px 3px 0 #ef476f}.pxlogo i{font:26px 'Press Start 2P';color:#ffe066;font-style:normal;text-shadow:3px 3px 0 #1a8f86}.pxlogo small{display:block;margin-top:14px;font:9px 'Press Start 2P';color:#2ec4b6}
.pxmark{width:120px;height:120px;display:grid;place-items:center;background:#252a52;border:3px solid #f8f7ff;box-shadow:5px 5px 0 #ef476f}.pxmark--y{background:#ffe066}
.fzlogo{display:flex;align-items:center;gap:16px}.fzlogo b{display:block;font:400 50px/1 'Lilita One';color:#1d4fa0;letter-spacing:.01em}.fzlogo em{font-style:normal;color:#e03131}
.ribbon{display:inline-block;margin-top:8px;background:#f6b400;color:#1c1c3c;font:400 15px 'Lilita One';padding:4px 16px;clip-path:polygon(0 0,100% 0,94% 50%,100% 100%,0 100%,6% 50%);letter-spacing:.04em}
'''
def section(d):
    pal = ''.join(f'<div class="sw"><i style="background:{c}"></i><span><b>{n}</b>{c}</span></div>' for n, c in d['palette'])
    return f'''<section class="dir" id="{d["id"]}" style="--bg:{d["bg"]};--panel:{d["panel"]};--ink:{d["ink"]};--muted:{d["muted"]};--accent:{d["accent"]};--line:{d["line"]};--fh:{d["font_head"]};--fb:{d["font_body"]}">
<div class="dh"><span class="num">DIRECTION {d["num"]}</span><h2>{d["name"]}</h2></div><p class="dsub">{d["sub"]}</p>
<div class="grid"><div class="box"><h3>Logo</h3><div class="logo">{d["logo"]}</div><div class="marks">{d["mark"]}{d["mark2"]}</div><p class="tagline">{d["tagline"]}</p></div>
<div class="box"><h3>L'idée</h3><p class="why">{d["why"]}</p><div style="height:18px"></div><h3>Typographie</h3><div class="type"><p class="big">Le géant d'Europe</p><p class="bd">82,5 m de granit et 397 marches. Le plus haut phare d'Europe veille sur les abers.</p></div></div></div>
<div class="box full"><h3>Couleurs</h3><div class="pal">{pal}</div></div>
<div class="box full"><h3>Icônes des tags</h3><div class="icons">{d["icons"]}</div></div>
<div class="row2"><div class="box"><h3>Dans l'app</h3>{ui(d)}</div><div class="box"><h3>Sur la carte</h3>{mapui(d)}</div></div>
</section>'''
def mapui(d):
    k = d['id']
    if k == 'kerzh':
        pin = lambda key, done: f'<span class="mp mp--px {"is-done" if done else ""}">{pix(PIX_ICONS[key], 20, "#1b1f3b")}</span>'
    elif k == 'faience':
        pin = lambda key, done: f'<span class="mp mp--tok" style="background:{"#2f9e44" if done else FCOL[key]}">{stroke_icon("visites" if done else key, 18, "#fff", sw=2.6)}</span>'
    else:
        pin = lambda key, done: f'<span class="mp {"is-done" if done else ""}">{stroke_icon("visites" if done else key, 18, "currentColor", sw=1.6 if k=="gwennhadu" else 2.2)}</span>'
    seas = {'tourtan': '#0e2a47', 'gwennhadu': '#dfe6ea', 'kerzh': '#2ec4b6', 'faience': '#cfe5ff'}
    lands = {'tourtan': '#1a2233', 'gwennhadu': '#f3efe6', 'kerzh': '#7bd389', 'faience': '#fff8e7'}
    return (f'<div class="map" style="background:{seas[k]}"><svg viewBox="0 0 400 260" class="land"><path d="M120 20c40 10 90-5 140 8s110 4 140 0V260H230c-20-30-60-40-90-30s-60-10-70-40 20-40 10-70-40-30-20-60 50-40 60-40z" fill="{lands[k]}"/><path d="M0 170c30-10 60 10 90 0s40-30 70-20" fill="none" stroke="{lands[k]}" stroke-width="14" stroke-linecap="round"/></svg>'
            f'<div style="position:absolute;left:28%;top:22%">{pin("phare", False)}</div><div style="position:absolute;left:55%;top:40%">{pin("villes", False)}</div>'
            f'<div style="position:absolute;left:14%;top:58%">{pin("phare", True)}</div><div style="position:absolute;left:40%;top:66%">{pin("nature", True)}</div>'
            f'<div class="pop" style="position:absolute;left:52%;top:8%"><b>Phare de l&#39;île Vierge</b><small>82,5 m · record d&#39;Europe</small><span>Voir la fiche ›</span></div></div>')
CSS += '''
.wlogo{display:flex;align-items:flex-end;gap:14px}.wlogo>svg{flex:none}
.w1{font:700 58px/1 Fredoka;letter-spacing:-1.5px;color:#fff}.w1 .star{font-style:normal;color:#ffc21a;font-size:22px;margin:0 3px;vertical-align:4px}.w1 em{font-style:normal;font-weight:600;color:#8b93a7}
.w2{font:700 58px/1 Fraunces;letter-spacing:-2px;color:#111}.w2 .herm{margin:0 4px 0 2px;vertical-align:-2px}.w2 em{font-weight:400;letter-spacing:-1px}
.map{position:relative;height:300px;border-radius:16px;overflow:hidden;border:1px solid var(--line)}.land{position:absolute;inset:0;width:100%;height:100%}
.mp{display:grid;place-items:center;width:38px;height:38px;border-radius:50% 50% 50% 6px;transform:rotate(-45deg);background:var(--accent);color:var(--bg);box-shadow:0 4px 10px rgba(0,0,0,.3)}
.mp svg{transform:rotate(45deg)}.mp.is-done{background:var(--good,#2fd47a);color:#fff;width:28px;height:28px;border-radius:50%;transform:none}.mp.is-done svg{transform:none}
#gwennhadu .mp{background:#111;color:#fff;border-radius:50%;transform:none;border:2px solid #fff}#gwennhadu .mp svg{transform:none}#gwennhadu .mp.is-done{background:#fff;color:#111;border:2px solid #111}
.mp--px{border-radius:0;transform:none;background:#ffe066;border:3px solid #1b1f3b;box-shadow:3px 3px 0 #1b1f3b}.mp--px svg{transform:none}.mp--px.is-done{background:#7bd389}
.mp--tok{border-radius:50%;transform:none;border:3px solid #fff;box-shadow:0 3px 0 rgba(0,0,0,.2),0 6px 12px rgba(0,0,0,.2)}.mp--tok svg{transform:none}
.pop{background:var(--barbg);color:var(--barink);padding:12px 14px;border-radius:var(--cr);min-width:170px;box-shadow:0 10px 24px rgba(0,0,0,.3)}.pop b{display:block;font-family:var(--fh);font-size:14px}.pop small{display:block;opacity:.75;font-size:11.5px;margin:2px 0 8px}.pop span{font-size:11.5px;font-weight:700;color:var(--accent)}
#kerzh .pop{border:2px solid #ffe066;box-shadow:4px 4px 0 #0e1126}#kerzh .pop b{font-family:'Pixelify Sans';font-size:16px}#gwennhadu .pop span{color:#d9a521}#faience .pop span{color:#f6b400}
'''
html = f'<!doctype html><html lang="fr"><meta charset="utf-8"><title>GuideMe.bzh · 4 directions de marque</title><link rel="stylesheet" href="{FONTS}"><style>{CSS}</style><body>' + ''.join(section(d) for d in D) + '</body></html>'
open('brand.html', 'w').write(html)
# logos SVG séparés (directions vectorielles)
open('logo-01-tourtan.svg', 'w').write(d1['logo_svg'].replace('<svg ', '<svg style="background:#07080d" ', 1))
open('logo-02-gwennhadu.svg', 'w').write(d2['logo_svg'].replace('<svg ', '<svg style="background:#f3efe6" ', 1))
open('mark-03-kerzh.svg', 'w').write(pix(PIX_VIERGE, 160, '#fff', {'R': '#ef476f', 'Y': '#ffe066', 'K': '#1b1f3b', 'W': '#f8f7ff', 'B': '#2ec4b6', 'S': '#1a8f86'}).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ', 1))
open('mark-04-faience.svg', 'w').write(d4['mark'].replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ', 1))
# vérif grilles pixel
for k, r in list(PIX_ICONS.items()) + [('vierge', PIX_VIERGE)]:
    assert len(set(map(len, r))) == 1, (k, set(map(len, r)))
print('ok')
