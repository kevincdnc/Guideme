// Polices de la carte : les noms de lieux sont dessinés par MapLibre à partir de « glyphes » (public/fonts/).
// Villes et lieux-dits en Rubik SemiBold ; mer, rivières et routes en Rubik Medium.
// Pour revenir à la police d'origine (Noto Sans, servie par OpenFreeMap), passer USE_BRAND_FONTS à false.
import MAP_STYLE from './map-style.json';

const USE_BRAND_FONTS = true;
// Essai précédent : villes en 'Mochiy Pop One Regular' (jugé trop enfantin)
const BRAND = { 'Noto Sans Bold': 'Rubik SemiBold', 'Noto Sans Regular': 'Rubik Medium', 'Noto Sans Italic': 'Rubik Medium' };

if (USE_BRAND_FONTS && typeof window !== 'undefined' && !MAP_STYLE.__brandFonts) {
  MAP_STYLE.__brandFonts = true;
  MAP_STYLE.glyphs = `${window.location.origin}${import.meta.env.BASE_URL}fonts/{fontstack}/{range}.pbf`;
  MAP_STYLE.layers.forEach((l) => {
    const f = l.layout?.['text-font'];
    if (f) l.layout['text-font'] = f.map((x) => BRAND[x] || 'Rubik Medium');
  });
}

export default MAP_STYLE;
