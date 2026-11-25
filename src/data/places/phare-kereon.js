// Fiche : Phare de Kéréon (passage du Fromveur, Ouessant)
import { heroOf, photosOf } from './phares-media.js';

export default {
  id: 'phare-kereon',
  available: true,
  icon: 'lighthouse',
  tags: ['phare', 'histoire'],
  title: 'Phare de Kéréon, le palais du Fromveur',
  shortTitle: 'Phare de Kéréon',
  commune: 'Ouessant · Passage du Fromveur',
  coords: [-5.02556, 48.43722],
  miniZoom: 9.6,
  category: 'Phare en mer',
  teaser:
    "Entre Ouessant et Molène, sur la « pierre hargneuse », un phare en mer au parquet marqueté et aux lambris de chêne de Hongrie. Le dernier phare-monument de France, et le dernier « enfer » à avoir perdu ses gardiens, en 2004.",
  hero: heroOf('phare-kereon'),
  lighthouse: {
    built: '1907 à 1916',
    lit: '1916',
    height: '48 m',
    elevation: '44 m au-dessus de la mer',
    range: '17 milles (feu blanc), environ 31 km',
    light: 'Secteurs blanc et rouge, à occultations (2+1) toutes les 24 s',
    keepers: 'Gardé jusqu\'au 29 janvier 2004',
    visit: 'Non visitable : récif en mer, dans le passage du Fromveur',
    visitors: 'Aucune : phare en mer, inaccessible',
    protection: 'Classé monument historique (2017)',
  },
  facts: [
    { value: '1916', label: 'premier allumage' },
    { value: '48 m', label: 'de hauteur de tour' },
    { value: '31 km', label: 'de portée (17 milles)' },
    { value: '2004', label: 'départ du dernier gardien' },
  ],
  records: [
    {
      medal: 'or', scope: 'Phares en mer', title: 'Le dernier « enfer » automatisé',
      text: 'Le 29 janvier 2004 : la fin des gardiens en mer en France.',
      more: "On appelait « enfers » les phares isolés en pleine mer. Kéréon est le dernier d'entre eux à avoir été automatisé, le 29 janvier 2004, avec un télécontrôle depuis le phare du Créac'h, à Ouessant. Depuis, il reste chauffé et déshumidifié entre deux visites d'entretien, réalisées par beau temps.",
    },
    {
      medal: 'or', scope: 'Phares de France', title: 'Le dernier phare-monument',
      text: 'Mosaïques, parquet marqueté, lambris de chêne de Hongrie.',
      more: "Grâce au don d'Amicie Lebaudy, 585 000 francs sur un coût total de 941 000 francs, Kéréon a reçu un intérieur luxueux, unique pour un phare en mer : mosaïque dans la cage d'escalier, parquet de chêne orné d'une rose des vents marquetée d'acajou et d'ébène, lambris de chêne de Hongrie. C'est le dernier phare-monument construit en France.",
    },
  ],
  funFact: { title: 'La nuit où la cuisine a explosé', text: "Le 16 décembre 1989 à 18 h 10, une vague fait exploser les deux hublots de la cuisine : tout le mobilier est projeté dans l'escalier, puis à la mer. Le feu, protégé sous des bâches par les gardiens, ne s'est jamais éteint." },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Le phare de Kéréon se dresse sur le récif de Men Tensel, « la pierre hargneuse » en breton, entre Ouessant et Molène, dans le passage du Fromveur, l'un des courants les plus forts d'Europe.",
        "Construit de 1907 à 1916, il porte le nom de Charles-Marie Le Dall de Kéréon, officier de marine guillotiné sous la Terreur, grand-oncle de sa donatrice, Amicie Lebaudy. Il est classé monument historique depuis 2017.",
      ],
    },
    {
      id: 'palais',
      nav: 'Le palais',
      title: 'Un palais en pleine mer',
      paragraphs: [
        "Le don d'Amicie Lebaudy a permis d'en faire un phare-monument : mosaïque dans la cage d'escalier, parquet en chêne avec une rose des vents marquetée en acajou et en ébène, lambris en chêne de Hongrie. Un luxe inouï pour un poste que les gardiens rangeaient parmi les « enfers ».",
        "Le feu fonctionne au pétrole jusqu'en 1972, date de son électrification : une cellule l'allume selon la lumière du jour, avec deux groupes électrogènes et une éolienne. Les gardiens restent pourtant à bord pour l'entretenir, jusqu'au 29 janvier 2004.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        { title: 'Des geysers dans la cuisine', text: "Le 16 décembre 1989, deux hublots explosent sous une vague et projettent les gardiens. Sept des vitres qui protègent l'optique, à 42 mètres au-dessus de la mer, éclatent aussi. Les gardiens bâchent l'optique : le feu ne s'éteint pas." },
        { title: 'Un don de 585 000 francs', text: "Amicie Lebaudy a financé plus de la moitié du chantier, qui a coûté 941 000 francs." },
        { title: 'Sur un timbre', text: "En 2019, La Poste a fait figurer Kéréon dans son carnet de timbres « Repères de nos côtes »." },
      ],
    },
  ],
  timeline: [
    { year: '1907', text: 'Début de la construction.' },
    { year: '1916', text: 'Premier allumage du feu.' },
    { year: '1972', text: 'Électrification du phare.' },
    { year: '1989', text: 'Une vague dévaste la cuisine, le 16 décembre.' },
    { year: '2004', text: 'Automatisation, le 29 janvier : le dernier phare en mer gardé.' },
    { year: '2017', text: 'Classement monument historique.' },
  ],
  photos: photosOf('phare-kereon'),
  practical: [
    { icon: 'warn', title: 'Phare en mer', text: 'Inaccessible au public.' },
    { icon: 'route', title: "Où l'apercevoir", text: "Depuis la côte sud-est d'Ouessant, ou depuis le bateau qui relie Le Conquet à Molène et Ouessant." },
  ],
  sources: [{ label: 'Wikipédia : Phare de Kéréon', url: 'https://fr.wikipedia.org/wiki/Phare_de_K%C3%A9r%C3%A9on' }],
  pois: [],
};
