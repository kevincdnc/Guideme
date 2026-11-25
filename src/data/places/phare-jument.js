// Fiche : Phare de la Jument (Ouessant)
import { heroOf, photosOf } from './phares-media.js';

export default {
  id: 'phare-jument',
  available: true,
  icon: 'lighthouse',
  tags: ['phare', 'histoire'],
  title: 'Phare de la Jument, la star des tempêtes',
  shortTitle: 'Phare de la Jument',
  commune: 'Ouessant · Mer d\'Iroise',
  coords: [-5.13386, 48.42223],
  miniZoom: 9.8,
  category: 'Phare en mer',
  teaser:
    "Au sud-ouest d'Ouessant, une tour fissurée, haubanée au fond de la mer par des câbles d'acier. Le 21 décembre 1989, une photo de Jean Guichard la montre engloutie par une vague, le gardien sur le pas de la porte : elle a fait le tour du monde.",
  hero: heroOf('phare-jument'),
  lighthouse: {
    built: '1904 à 1911',
    lit: '15 octobre 1911',
    height: '47 m',
    elevation: '41 m au-dessus de la mer',
    range: '10 milles, environ 18 km',
    light: '3 éclats rouges toutes les 12 secondes',
    keepers: 'Gardé jusqu\'au 26 juillet 1991',
    visit: 'Non visitable : récif en mer, au sud-ouest d\'Ouessant',
    visitors: 'Aucune : phare en mer, inaccessible',
    protection: 'Classé monument historique (2017)',
  },
  facts: [
    { value: '1911', label: 'allumage, le 15 octobre' },
    { value: '47 m', label: 'de hauteur de tour' },
    { value: '18 km', label: 'de portée (10 milles)' },
    { value: '1991', label: 'départ des derniers gardiens' },
  ],
  records: [
    {
      medal: 'or', scope: 'Monde', title: 'Mondialement célèbre en photo',
      text: 'Grâce aux clichés de Jean Guichard, le 21 décembre 1989.',
      more: "Le 21 décembre 1989, le photographe Jean Guichard, à bord d'un hélicoptère, prend une série de sept clichés de la Jument balayée par une vague déferlante, alors que le gardien Théodore Malgorn se tient sur le pas de la porte. Ces images ont rendu le phare mondialement célèbre ; l'une d'elles apparaît même dans le film Les Infiltrés de Martin Scorsese, en 2006.",
    },
    {
      medal: 'argent', scope: 'Iroise', title: '31 naufrages en 16 ans',
      text: "Entre 1888 et 1904, dans le seul passage du Fromveur.",
      more: "Le phare marque l'entrée du passage du Fromveur, où trente et un navires ont été perdus entre 1888 et 1904. Le plus connu, le paquebot anglais Drummond Castle, a heurté la roche des Pierres Vertes dans la nuit du 16 au 17 juin 1896 : 258 morts, trois survivants seulement.",
    },
  ],
  funFact: { title: 'Un phare tenu par des câbles', text: "Fissurée dès sa première tempête, la tour a été cuirassée de béton armé, puis haubanée en 1934 par trois câbles d'acier d'une trentaine de mètres, ancrés au fond." },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Le phare de la Jument se dresse au sud-ouest d'Ouessant, sur le récif d'Ar Gazeg, « la jument » en breton. Il marque l'entrée du passage du Fromveur, aux courants violents. Il est classé monument historique depuis 2017.",
        "Il doit son existence au legs de 400 000 francs de Charles-Eugène Potron, voyageur et membre de la Société de géographie de Paris, à condition qu'il soit bâti dans les sept ans suivant sa mort, et qu'on grave son nom sur le granit.",
      ],
    },
    {
      id: 'chantier',
      nav: 'Le chantier',
      title: 'Une course contre le testament',
      paragraphs: [
        "La première année, les ouvriers ne peuvent travailler que 52 heures sur le rocher. Pour respecter le délai du testament, l'administration presse les ingénieurs et affrète plus de matériel. Le chantier est dirigé par Georges Clet Heurté, natif de Primelin, qui avait travaillé à l'île Vierge.",
        "Le phare est achevé avec sept mois de retard, sur une assise plus petite que prévu. Le feu est allumé le 15 octobre 1911. Dès la tempête du 21 au 23 décembre suivant, la tour vibre, le mercure déborde de sa cuve et les vitres de la lanterne se fendent. Le fût restera fissuré.",
      ],
    },
    {
      id: 'tempetes',
      nav: 'Les tempêtes',
      title: 'Au cœur des tempêtes',
      paragraphs: [
        "En septembre 1974, une vague brise la lanterne, emporte la lampe et dévale l'escalier. Les gardiens Jean-Claude Roger et Noël Violant se réfugient dans la cuisine après avoir ouvert la porte pour évacuer l'eau, puis passent la nuit à récupérer le mercure échappé de la cuve.",
        "Le phare est automatisé le 26 juillet 1991. En 2014, la cuve de mercure déborde encore pendant une tempête ; la lanterne est remplacée en 2015 par une optique à LED, et un panneau solaire est installé en 2023.",
      ],
    },
  ],
  timeline: [
    { year: '1896', text: 'Naufrage du Drummond Castle, 258 morts.' },
    { year: '1904', text: 'Décret de construction, le 20 février.' },
    { year: '1911', text: 'Allumage du feu, le 15 octobre.' },
    { year: '1917', text: 'Feu éteint pour cuirasser la base de béton armé.' },
    { year: '1934', text: 'La tour est haubanée par trois câbles d\'acier.' },
    { year: '1989', text: 'Les photos de Jean Guichard, le 21 décembre.' },
    { year: '1991', text: 'Automatisation, le 26 juillet.' },
    { year: '2017', text: 'Classement monument historique.' },
  ],
  photos: photosOf('phare-jument'),
  practical: [
    { icon: 'warn', title: 'Phare en mer', text: 'Inaccessible au public.' },
    { icon: 'hike', title: "Où l'apercevoir", text: "Depuis la côte sud-ouest d'Ouessant, à pied ou à vélo depuis le bourg de Lampaul." },
  ],
  sources: [{ label: 'Wikipédia : Phare de la Jument', url: 'https://fr.wikipedia.org/wiki/Phare_de_la_Jument' }],
  pois: [],
};
