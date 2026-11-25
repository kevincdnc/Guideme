// Fiche : Phare de l'île Vierge (Plouguerneau)
import { heroOf, photosOf } from './phares-media.js';

export default {
  id: 'phare-ile-vierge',
  available: true,
  icon: 'lighthouse',
  tags: ['phare', 'histoire'],
  title: "Phare de l'île Vierge, le géant d'Europe",
  shortTitle: "Phare de l'île Vierge",
  commune: 'Plouguerneau · Pays des Abers',
  coords: [-4.567075, 48.638806],
  miniZoom: 11.2,
  category: 'Phare · Patrimoine',
  teaser:
    "82,5 mètres de granit sur un îlot de six hectares, face aux abers : le plus haut phare d'Europe, et le plus haut phare en pierre de taille du monde. À l'intérieur, 12 500 plaques d'opaline bleu azur tapissent ses 397 marches.",
  hero: heroOf('phare-ile-vierge'),
  lighthouse: {
    built: '1897 à 1902 (premier phare : 1842 à 1845)',
    lit: '1902',
    height: '82,5 m (foyer à 75 m)',
    elevation: '84 m au-dessus de la mer',
    range: '27 milles, environ 52 km',
    light: '1 éclat blanc toutes les 5 secondes',
    keepers: 'Dernière relève le 29 octobre 2010',
    visit: "Ouvert à la visite : accès à l'île en bateau, ou à pied aux grandes marées",
    visitors: 'Chiffre non publié',
    protection: 'Classé monument historique (2011)',
  },
  facts: [
    { value: '1902', label: 'achèvement du grand phare' },
    { value: '82,5 m', label: 'de hauteur : record d\'Europe' },
    { value: '52 km', label: 'de portée (27 milles)' },
    { value: '397', label: 'marches jusqu\'à la lanterne' },
  ],
  records: [
    {
      medal: 'or', scope: 'Monde', title: 'Le plus haut phare en pierre de taille',
      text: '82,5 mètres de granit, construits de 1897 à 1902.',
      more: "Avec ses 82,5 mètres, le phare de l'île Vierge est le plus haut phare en pierre de taille du monde. Seul le phare de Djeddah, en Arabie saoudite, bâti en béton et en acier de 1987 à 1990, le dépasse. C'est une tour à triple paroi, tronconique à l'extérieur et cylindrique à l'intérieur, en moellons de granit.",
    },
    {
      medal: 'or', scope: 'Europe', title: "Le plus haut phare d'Europe",
      text: 'Visible jusqu\'à mi-Manche par temps favorable.',
      more: "Le phare de l'île Vierge est le plus haut d'Europe. Son feu, placé à 75 mètres, balaie tout le nord du Finistère sur 52 kilomètres, et peut être visible à mi-Manche par temps favorable.",
    },
    {
      medal: 'bronze', scope: 'Phares de France', title: '397 marches, toutes uniques',
      text: '360 marches de pierre suspendues, taillées sur mesure.',
      more: "Pour atteindre la lanterne, il faut gravir 397 marches : cinq marches de granit à l'extérieur, 360 marches suspendues en pierre de taille, toutes uniques et faites sur mesure, puis 32 marches en fer. La cage d'escalier est tapissée sur 900 m² de 12 500 plaques d'opaline bleu azur des usines Saint-Gobain.",
    },
  ],
  funFact: { title: 'Des maçons du Cap Sizun', text: "En 1899, le chantier employait sept maçons venus du Cap Sizun, réputé pour l'excellence de ses ouvriers. Payés 4,50 francs par jour, ils vivaient sur l'île, été comme hiver, dans des baraquements de planches." },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Le phare de l'île Vierge se dresse sur un îlot de six hectares, à 1,4 kilomètre au nord de Kastell Ac'h, à Plouguerneau. L'île marque la limite orientale entre la Manche et la mer Celtique. Le phare est classé monument historique depuis 2011.",
        "Il est le plus haut phare d'Europe et le plus haut phare en pierre de taille du monde. On peut le visiter : l'île est accessible en bateau, ou à pied lors des grandes marées.",
      ],
    },
    {
      id: 'histoire',
      nav: 'Histoire',
      title: 'Du couvent au géant de granit',
      paragraphs: [
        "L'île aurait été un sanctuaire druidique. Au XVe siècle, des frères cordeliers y fondent un couvent dont la chapelle, dédiée à la Vierge, lui aurait donné son nom. L'État achète l'île en 1844.",
        "Un premier phare, tour carrée de 33 mètres, est allumé le 15 août 1845. Trop faible, il est remplacé par le grand phare, construit de 1897 à 1902 ; l'ancien reste allumé pendant les travaux et sert aujourd'hui d'amer. Le grand phare est électrifié en 1956, et sa dernière relève de gardiens a lieu le 29 octobre 2010.",
      ],
    },
    {
      id: 'chantier',
      nav: 'Le chantier',
      title: 'Le chantier vu par Le Goffic',
      paragraphs: [
        "En 1899, Charles Le Goffic décrit le chantier : sept maçons du Cap Sizun, logés sur l'île dans des baraquements, et dix-huit manœuvres, presque tous des pêcheurs sans emploi de Plouguerneau, ramenés à terre chaque soir par une barque.",
        "Les maçons paient huit francs par mois pour faire tremper leur soupe à la cantine trois fois par jour. Les manœuvres, eux, gagnent entre 2 et 2,50 francs et apportent leurs provisions.",
      ],
    },
  ],
  timeline: [
    { year: '1845', text: 'Allumage du premier phare, le 15 août.' },
    { year: '1897', text: 'Début du chantier du grand phare.' },
    { year: '1902', text: 'Achèvement du grand phare.' },
    { year: '1956', text: 'Électrification.' },
    { year: '2010', text: 'Dernière relève de gardiens, le 29 octobre.' },
    { year: '2011', text: 'Classement monument historique.' },
  ],
  photos: photosOf('phare-ile-vierge'),
  practical: [
    { icon: 'route', title: 'Accès', text: "En bateau depuis la côte de Plouguerneau, ou à pied lors des grandes marées." },
    { icon: 'hike', title: 'Visite', text: "Le grand phare se visite ; l'ancienne maison des gardiens est devenue un écogîte." },
  ],
  sources: [{ label: "Wikipédia : Phare de l'île Vierge", url: "https://fr.wikipedia.org/wiki/Phare_de_l%27%C3%AEle_Vierge" }],
  pois: [],
};
