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
# Emprise visée : 3 → 45 en largeur (comme Port, Patrimoine…), 4 → 45 en hauteur.
# Espace soleil → crête de la 1re vague : ~5 unités (au lieu de ~3,4).
V = {
 'A': ['Base 1 agrandie, soleil décollé', half_sun(17, 23.5, 12.5) + gull(35.5, 13.5, 9.5) + wave(5, 33.5, 4, sw=4.4) + wave(5, 42, 3, sw=4.4)],
 'B': ['Soleil plus grand, vagues plus épaisses', half_sun(17.5, 23.5, 13.5) + gull(36, 12, 9) + wave(5, 33.5, 4, sw=4.8) + wave(5, 42, 3, sw=4.8)],
 'C': ['Mouette plus présente', half_sun(16.5, 24, 11.5) + gull(34, 14.5, 10.8) + wave(5, 33.5, 4, sw=4.4) + wave(5, 42, 3, sw=4.4)],
 'D': ['Deux vagues pleine largeur', half_sun(17, 23.5, 12.5) + gull(35.5, 13.5, 9.5) + wave(5, 33.5, 4, sw=4.4) + wave(5, 42, 4, sw=4.4)],
 'E': ['Seconde vague sous la mouette', half_sun(17, 23.5, 12.5) + gull(35.5, 13.5, 9.5) + wave(5, 33.5, 4, sw=4.4) + wave(14.5, 42, 3, up=False, sw=4.4)],
}
V = {k: [l, f'<g transform="translate(0 -1.5)">{b}</g>'] for k, (l, b) in V.items()}
json.dump(V, open('variantes.json', 'w'), ensure_ascii=False, indent=1)
print('ok')
