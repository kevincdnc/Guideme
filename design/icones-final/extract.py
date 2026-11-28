# Extrait chaque icône de la planche Figma de Kevin (≈ ×3), sans toucher aux tracés :
# recentrage horizontal dans un cadre 48 × 48 (encombrement réel), position verticale conservée,
# éléments blancs → évidements (masque), noir → #111111, identifiants de masque rendus uniques.
#   python3 design/icones-final/extract.py   (puis node design/icones-final/build.cjs)
import json, re, subprocess, os
D = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(D, 'source-figma-kevin.svg')
S, TOP = 58.466 / 48, 29.43  # planche « UPDATE » : cadres de 58,47 px
ORDER = [  # id, libellé, lignes du fichier source
 ('visites', 'Visités', [(4, 4)]), ('todo', 'To-do', [(5, 5)]), ('nature', 'Sites naturels', [(48, 52)]),
 ('prehistoire', 'Préhistoire', [(16, 18)]), ('phare', 'Phares', [(58, 69)]), ('hermine', 'Sites bretons', [(43, 47)]),
 ('histoire', 'Patrimoine', [(6, 15)]), ('port', 'Port', [(34, 37)]), ('legende', 'Légendaire', [(38, 42)]),
 ('villes', 'Villes & villages', [(19, 29), (33, 33), (70, 70)]), ('histoire-legendes', 'Histoire & légendes', [(30, 32)]), ('plage', 'Plage', [(53, 57)]),
]
L = open(SRC).read().split('\n')
spec = {id_: [[a, z] for a, z in r] for id_, _, r in ORDER}
bb = json.loads(subprocess.check_output(['node', os.path.join(D, 'bbox.cjs'), SRC, json.dumps(spec)]))
icons = {}
for id_, label, ranges in ORDER:
    text = '\n'.join(l for a, z in ranges for l in L[a - 1:z])
    text = re.sub(r'mask(\d)_\d+_\d+', lambda m: f'{id_}-m{m.group(1)}', text)
    shapes, holes = '', ''
    for part in re.split(r'(<mask[\s\S]*?</mask>)', text):
        if part.startswith('<mask'): shapes += part; continue
        for el in re.findall(r'<(?:path|rect|circle)\b[^>]*/>|<g\b[^>]*>|</g>', part):
            if not el.startswith(('<g', '</g')) and re.search(r'(fill|stroke)="white"', el):
                holes += el.replace('"white"', '"black"')
            else:
                shapes += el.replace('fill="black"', 'fill="#111111"').replace('stroke="black"', 'stroke="#111111"')
    x0, y0, x1, y1 = bb[id_]; cx = (x0 + x1) / 2
    icons[id_] = {'label': label, 'transform': f'translate(24 0) scale({1/S:.6f}) translate({-cx:.2f} {-TOP})',
                  'shapes': shapes, 'holes': holes,
                  'box48': [round((x0 - cx) / S + 24, 1), round((y0 - TOP) / S, 1), round((x1 - cx) / S + 24, 1), round((y1 - TOP) / S, 1)]}
json.dump(icons, open(os.path.join(D, 'icons.json'), 'w'), ensure_ascii=False, indent=1)
for k, v in icons.items(): print(f"{k:18} {v['box48']}  évidements: {'oui' if v['holes'] else 'non'}")
