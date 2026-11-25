// Fiche : Phare du Four (Porspoder)
import { heroOf, photosOf } from './phares-media.js';

export default {
  id: 'phare-four',
  available: true,
  icon: 'lighthouse',
  tags: ['phare', 'histoire'],
  title: 'Phare du Four, entre Manche et océan',
  shortTitle: 'Phare du Four',
  commune: 'Porspoder · Roches d\'Argenton',
  coords: [-4.805, 48.5233],
  miniZoom: 10.6,
  category: 'Phare en mer',
  teaser:
    "Au bout des roches d'Argenton, une tour de granit célèbre pour les déferlantes qui l'engloutissent : son rocher est réputé lever des vagues énormes. On le disait au point de séparation entre la Manche et l'océan.",
  hero: heroOf('phare-four'),
  lighthouse: {
    built: '1869 à 1874',
    lit: 'Nuit du 14 au 15 mars 1874',
    height: '28 m',
    elevation: '31 m au-dessus de la mer',
    range: '24,5 milles, environ 45 km',
    light: '5 éclats blancs toutes les 15 secondes',
    keepers: 'Gardé jusqu\'au 6 octobre 1993',
    visit: 'Non visitable : écueil en mer, au large de la presqu\'île Saint-Laurent',
    visitors: 'Aucune : phare en mer, inaccessible',
    protection: 'Classé monument historique (2017)',
  },
  facts: [
    { value: '1874', label: 'mise en service, en mars' },
    { value: '28 m', label: 'de hauteur de tour' },
    { value: '45 km', label: 'de portée (24,5 milles)' },
    { value: '1993', label: 'départ des derniers gardiens' },
  ],
  records: [
    {
      medal: 'argent', scope: 'Iroise', title: 'Le jumeau des Pierres Noires',
      text: 'Bâti en même temps, par les mêmes ingénieurs.',
      more: "Construit de 1869 à 1874, le Four est le jumeau du phare des Pierres Noires, élevé en même temps au sud de l'archipel de Molène, sous la direction des mêmes ingénieurs, dont Léonce Reynaud et Victor Fénoux. Les deux tours partagent la même forme, originale pour l'époque, qui assure leur stabilité.",
    },
  ],
  funFact: { title: "L'optique d'origine toujours là", text: "La lanterne d'origine, qui fonctionnait aux vapeurs de pétrole, et l'optique d'origine sont toujours en place dans le phare." },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Le phare du Four, ou « Four d'Argenton », se dresse sur un écueil de granit de 25 mètres de diamètre, à l'extrémité sud des roches d'Argenton, au début du chenal du Four. Il est connu pour les images des déferlantes impressionnantes qui s'écrasent sur lui.",
        "En 1889, Benjamin Girard le décrit comme « le point de séparation entre la Manche et l'Océan ». Il est classé monument historique depuis 2017.",
      ],
    },
    {
      id: 'chantier',
      nav: 'Le chantier',
      title: 'Un chantier endeuillé',
      paragraphs: [
        "Le rocher est retenu en 1862, mais le chantier ne commence qu'en avril 1869. La mer balaie régulièrement sa surface et ne permet que rarement d'accoster ; chaque saison commence par la réparation des dégâts de l'hiver.",
        "Dans ses derniers mois, une lame fait chavirer le canot de ravitaillement : Hervé Jézéquel, François Leborgne et le contremaître Le Brelivet se noient. Le phare entre en service dans la nuit du 14 au 15 mars 1874.",
      ],
    },
    {
      id: 'interieur',
      nav: 'À l\'intérieur',
      title: 'Cinq étages, une pièce par étage',
      paragraphs: [
        "Un escalier à vis dessert cinq pièces superposées : la réserve d'huile, la citerne d'eau douce, la cuisine, une chambre à deux lits et deux placards, puis la salle technique et la chambre de service, sous la lanterne.",
        "Frappé par la foudre en 1899, le phare a aussi connu deux drames : un gardien meurt le 13 février 1913 après avoir respiré des émanations de gazole, et le 9 décembre 1978, la vedette Ouessantine chavire pendant un ravitaillement, noyant Martin Perreaux et Jean-Yves Kernoas.",
      ],
    },
  ],
  timeline: [
    { year: '1862', text: 'Le rocher du Four est retenu pour un phare.' },
    { year: '1869', text: 'Début du chantier, en avril.' },
    { year: '1874', text: 'Mise en service, dans la nuit du 14 au 15 mars.' },
    { year: '1899', text: 'Le phare est frappé par la foudre.' },
    { year: '1978', text: 'Naufrage de la vedette de ravitaillement, deux morts.' },
    { year: '1993', text: 'Automatisation, le 6 octobre.' },
    { year: '2017', text: 'Classement monument historique.' },
  ],
  photos: photosOf('phare-four'),
  practical: [
    { icon: 'warn', title: 'Phare en mer', text: 'Inaccessible au public.' },
    { icon: 'hike', title: "Où l'apercevoir", text: "Depuis le sentier côtier de Porspoder et d'Argenton (Landunvez), surtout par gros temps." },
  ],
  sources: [{ label: 'Wikipédia : Phare du Four', url: 'https://fr.wikipedia.org/wiki/Phare_du_Four' }],
  pois: [],
};
