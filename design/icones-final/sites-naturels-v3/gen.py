# Sites naturels v3 : mouette en V (ailes pleines, courbées, effilées), soleil, vagues composées. Grille 48, sans évidement.
import json, math
W, D = 9.5, 2.4
S = lambda w: f'stroke="#111111" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"'
def wave(x0, y, n, up=True, sw=4):
    d = -D if up else D
    p = f'M{x0} {y}C{x0+W/3:.2f} {y+d} {x0+2*W/3:.2f} {y+d} {x0+W} {y}'
    for k in range(1, n):
        d = -d; x = x0 + k * W
        p += f'S{x+2*W/3:.2f} {y+d} {x+W} {y}'
    return f'<path d="{p}" fill="none" {S(sw)}/>'
def half_sun(cx, base, r): return f'<path d="M{cx-r} {base}a{r} {r} 0 0 1 {2*r} 0z" {S(2)}/>'
def sun(cx, cy, r): return f'<circle cx="{cx}" cy="{cy}" r="{r}"/>'
def gull(cx, cy, s, tilt=0):
    """Mouette en V : ailes pleines qui partent du corps (cx, cy), montent en s'arrondissant et s'effilent.
    s = demi-envergure. Le corps est le point bas du V."""
    def wing(sign):
        tx, ty = cx + sign * s, cy - 0.50 * s                       # pointe : retombe un peu (vol plané)
        up1 = (cx + sign * 0.16 * s, cy - 0.62 * s); up2 = (cx + sign * 0.62 * s, cy - 1.02 * s)   # bord d'attaque en arche
        lo1 = (cx + sign * 0.60 * s, cy - 0.66 * s); lo2 = (cx + sign * 0.26 * s, cy - 0.20 * s)   # bord de fuite
        f = lambda p: f'{p[0]:.2f} {p[1]:.2f}'
        return f'M{f((cx, cy))}C{f(up1)} {f(up2)} {f((tx, ty))}C{f(lo1)} {f(lo2)} {f((cx, cy + 0.12*s))}z'
    g = f'<path d="{wing(-1)}{wing(1)}" {S(1.6)}/>'
    return f'<g transform="rotate({tilt} {cx} {cy})">{g}</g>' if tilt else g
V = {
 '1': ['Coucher de soleil à gauche, mouette à droite', half_sun(18, 25.5, 11) + gull(35, 15.5, 8.5) + wave(5, 33, 4) + wave(5, 41, 3)],
 '2': ['Coucher de soleil centré, mouette au-dessus', half_sun(24, 26, 11.5) + gull(36, 10.5, 7.5) + wave(5, 33.5, 4) + wave(5, 41.5, 4)],
 '3': ['Grande mouette sur la mer', gull(24, 21, 15) + wave(5, 33, 4) + wave(5, 41, 4)],
 '4': ['Soleil rond et mouette', sun(14, 12.5, 6.5) + gull(32.5, 20, 9) + wave(5, 33, 4) + wave(14.5, 41, 3, up=False)],
 '5': ['Deux mouettes et coucher de soleil', half_sun(17, 26, 10) + gull(34, 13.5, 7) + gull(40, 24, 4.3) + wave(5, 33.5, 4) + wave(5, 41.5, 3)],
}
json.dump(V, open('variantes.json', 'w'), ensure_ascii=False, indent=1)
print('ok')
