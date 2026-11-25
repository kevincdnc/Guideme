// Fiche : Phare des Pierres Noires (Le Conquet)
import { heroOf, photosOf } from './phares-media.js';

export default {
  id: 'phare-pierres-noires',
  available: true,
  icon: 'lighthouse',
  tags: ['phare', 'histoire'],
  title: 'Phare des Pierres Noires, le feu rouge de l\'Iroise',
  shortTitle: 'Phare des Pierres Noires',
  commune: 'Le Conquet · Large de Saint-Mathieu',
  coords: [-4.9117, 48.3117],
  miniZoom: 10,
  category: 'Phare en mer',
  teaser:
    "Au large de la pointe Saint-Mathieu, sur la chaussée où la Gorgone a sombré avec ses 93 hommes, une tour de granit au feu rouge. Sa lanterne aux têtes de lion de bronze a été déposée par hélicoptère et refaite à l'identique en 2018.",
  hero: heroOf('phare-pierres-noires'),
  lighthouse: {
    built: '1867 à 1871',
    lit: '1er mai 1872',
    height: '28 m (hauteur du feu)',
    elevation: '30,50 m au-dessus de la mer',
    range: '20 milles, environ 37 km',
    light: '1 éclat rouge toutes les 5 secondes',
    keepers: 'Gardé jusqu\'à son automatisation, en 1992',
    visit: 'Non visitable : récif en mer, au sud de Molène',
    visitors: 'Aucune : phare en mer, inaccessible',
    protection: 'Classé monument historique (2017)',
  },
  facts: [
    { value: '1872', label: 'inauguration, le 1er mai' },
    { value: '28 m', label: 'de hauteur du feu' },
    { value: '37 km', label: 'de portée (20 milles)' },
    { value: '1992', label: 'départ des derniers gardiens' },
  ],
  records: [
    {
      medal: 'argent', scope: 'Iroise', title: 'Le jumeau du Four',
      text: 'Une tour presque droite, très innovante pour l\'époque.',
      more: "Sa tour, très légèrement tronconique, a une base très peu évasée : une forme innovante pour l'époque, que l'on retrouve sur son jumeau, le phare du Four, construit en même temps par les mêmes ingénieurs. Elle associe le granit de l'Aber-Ildut et celui de Kersanton.",
    },
  ],
  funFact: { title: 'Des LED à la place du mercure', text: "En 2018, l'ancienne lampe halogène de 250 watts, qui tournait sur une cuve de mercure installée en 1903, a été remplacée par des LED de 36 watts." },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Le phare des Pierres Noires se dresse au large de la pointe Saint-Mathieu, au sud de l'archipel de Molène. Il permet aux navires qui s'engagent dans le chenal du Four d'éviter, de nuit et par brume, les écueils de la chaussée des Pierres Noires.",
        "Construit de 1867 à 1871 pour 325 000 francs-or, il est inauguré le 1er mai 1872. Automatisé en 1992, il est télécontrôlé depuis le phare du Créac'h, à Ouessant. Il est classé monument historique depuis 2017.",
      ],
    },
    {
      id: 'histoire',
      nav: 'Histoire',
      title: 'Après la Gorgone',
      paragraphs: [
        "Le projet est approuvé en 1862, et le chantier commence en 1867. Le 18 décembre 1869, en plein chantier, la Gorgone fait naufrage sur le récif des Pierres Noires : ses 93 hommes d'équipage se noient.",
        "Son premier feu, en 1872, lance un éclat rouge toutes les dix secondes, à l'huile minérale, puis à la vapeur de pétrole dès 1903. Le phare est électrifié en 1984. Aujourd'hui, son éclat rouge revient toutes les cinq secondes, et sa corne de brume sonne deux fois par minute.",
      ],
    },
    {
      id: 'lanterne',
      nav: 'La lanterne',
      title: 'Une lanterne refaite à l\'identique',
      paragraphs: [
        "En 2017, la lanterne historique, usée par la mer, tombe trop souvent en panne. Elle est déposée par hélicoptère et confiée à une entreprise de métallerie d'art d'Ille-et-Vilaine, qui la modélise en 3D et restaure sa frise et ses têtes de lion en bronze.",
        "La nouvelle lanterne est remise en place en juillet 2018. Les travaux ont coûté 0,4 million d'euros.",
      ],
    },
  ],
  timeline: [
    { year: '1865', text: 'Approbation ministérielle de la construction.' },
    { year: '1867', text: 'Début du chantier.' },
    { year: '1869', text: 'Naufrage de la Gorgone, 93 morts, le 18 décembre.' },
    { year: '1872', text: 'Inauguration, le 1er mai.' },
    { year: '1984', text: 'Électrification.' },
    { year: '1992', text: 'Automatisation.' },
    { year: '2018', text: 'Nouvelle lanterne et feu à LED.' },
  ],
  photos: photosOf('phare-pierres-noires'),
  practical: [
    { icon: 'warn', title: 'Phare en mer', text: 'Inaccessible au public.' },
    { icon: 'hike', title: "Où l'apercevoir", text: 'Depuis la pointe Saint-Mathieu et la côte du Conquet.' },
  ],
  sources: [{ label: 'Wikipédia : Phare des Pierres Noires', url: 'https://fr.wikipedia.org/wiki/Phare_des_Pierres_Noires' }],
  pois: [],
};
