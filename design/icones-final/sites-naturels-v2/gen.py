# Sites naturels v2 : soleil (couchant ou rond), deux vagues parallèles, mouette. Grille 48, formes pleines, pas d'évidement.
import json, math
SW = 4.0                      # épaisseur des vagues (comme le set)
W, D = 9.5, 2.4               # demi-onde : largeur, décalage des points de contrôle (crête ≈ 2,25)
S = lambda w: f'stroke="#111111" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"'
def wave(x0, y, n, up=True):
    d = -D if up else D
    p = f'M{x0} {y}C{x0+W/3:.2f} {y+d} {x0+2*W/3:.2f} {y+d} {x0+W} {y}'
    for k in range(1, n):
        d = -d; x = x0 + k * W
        p += f'S{x+2*W/3:.2f} {y+d} {x+W} {y}'
    return f'<path d="{p}" fill="none" {S(SW)}/>'
def waves(y1=33, gap=8):
    # deux vagues identiques et parallèles, de 5 à 43
    return wave(5, y1, 4) + wave(5, y1 + gap, 4)
def half_sun(cx, base, r):
    return f'<path d="M{cx-r} {base}a{r} {r} 0 0 1 {2*r} 0z" {S(2)}/>'
def sun(cx, cy, r): return f'<circle cx="{cx}" cy="{cy}" r="{r}"/>'
def dots(cx, cy, R, angles, r=2.1):
    return ''.join(f'<circle cx="{cx+R*math.cos(math.radians(a)):.2f}" cy="{cy-R*math.sin(math.radians(a)):.2f}" r="{r}"/>' for a in angles)
def rays(cx, cy, r0, r1, angles, w=3.4):
    return ''.join(f'<path d="M{cx+r0*math.cos(math.radians(a)):.2f} {cy-r0*math.sin(math.radians(a)):.2f}L{cx+r1*math.cos(math.radians(a)):.2f} {cy-r1*math.sin(math.radians(a)):.2f}" fill="none" {S(w)}/>' for a in angles)
def gull(cx, cy, s=6, w=3.4):
    # mouette en vol : deux ailes arrondies
    return f'<path d="M{cx-s} {cy}q{s/2:.2f} {-.7*s:.2f} {s} 0q{s/2:.2f} {-.7*s:.2f} {s} 0" fill="none" {S(w)}/>'
V = {
 '1': ['Coucher de soleil', half_sun(24, 25.5, 13) + waves()],
 '2': ['Coucher de soleil, rayons en points', half_sun(24, 25.5, 9.5) + dots(24, 25.5, 14.5, [180, 135, 90, 45, 0]) + waves()],
 '3': ['Coucher de soleil, rayons', half_sun(24, 25.5, 9.5) + rays(24, 25.5, 13, 17.5, [150, 90, 30]) + waves()],
 '4': ['Soleil, mer et mouette', sun(33.5, 13.5, 7.5) + gull(14, 14, 7, 3.6) + waves()],
 '5': ['Coucher de soleil et mouette', half_sun(19.5, 25.5, 10.5) + gull(36, 11.5, 6, 3.4) + waves()],
 '6': ['Soleil qui plonge', '<path d="M13.42 25.5A11.5 11.5 0 1 1 34.58 25.5z" stroke="#111111" stroke-width="2" stroke-linejoin="round"/>' + waves()],
}
json.dump(V, open('variantes.json', 'w'), ensure_ascii=False, indent=1)
print('ok')
