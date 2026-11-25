// Fiche : Phare du Stiff (Ouessant)
import { heroOf, photosOf } from './phares-media.js';

export default {
  id: 'phare-stiff',
  available: true,
  icon: 'lighthouse',
  tags: ['phare', 'histoire'],
  title: 'Phare du Stiff, le phare de Vauban',
  shortTitle: 'Phare du Stiff',
  commune: 'Ouessant · Falaise du Stiff',
  coords: [-5.05667, 48.47444],
  miniZoom: 11,
  category: 'Phare · Patrimoine',
  teaser:
    "Deux tours accolées, voulues par Vauban au point culminant d'Ouessant. Plus de trois siècles après son premier feu de bois et de charbon, c'est l'un des plus anciens phares de France encore en activité.",
  hero: heroOf('phare-stiff'),
  lighthouse: {
    built: '1695 à 1700, sur décision de Vauban',
    lit: '1702',
    height: '32,4 m',
    elevation: '91,8 m au-dessus de la mer',
    range: '24 milles, environ 44 km',
    light: '2 éclats rouges toutes les 20 secondes',
    keepers: 'Gardé jusqu\'à son automatisation, en 1993',
    visit: 'Ouvert au public des vacances de Pâques à fin septembre : 104 marches',
    visitors: 'Chiffre non publié',
    protection: 'Classé monument historique (2011)',
  },
  facts: [
    { value: '1702', label: 'premier allumage' },
    { value: '32,4 m', label: 'de hauteur de tour' },
    { value: '44 km', label: 'de portée (24 milles)' },
    { value: '104', label: 'marches jusqu\'au panorama' },
  ],
  records: [
    {
      medal: 'or', scope: 'France', title: "L'un des plus anciens phares encore allumés",
      text: 'Le deuxième, après Cordouan.',
      more: "Décidé par Vauban en 1699 et allumé en 1702, le Stiff est l'un des six premiers phares construits par Vauban, et l'un des plus anciens phares de France encore en activité après celui de Cordouan, en Gironde.",
    },
    {
      medal: 'argent', scope: 'Ouessant', title: 'Sur le point culminant de l\'île',
      text: 'Son feu brille à près de 92 mètres au-dessus de la mer.',
      more: "Le phare est bâti au sommet de la falaise du Stiff, point culminant d'Ouessant. Son feu se trouve à 91,8 mètres au-dessus de la mer. Par beau temps, son panorama s'étend du phare de l'île Vierge à celui de l'île de Sein.",
    },
  ],
  funFact: { title: 'Un feu de bois, l\'hiver seulement', text: "Au début, le feu ne fonctionnait que les mois d'hiver : les gardiens l'alimentaient au bois et au charbon." },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Au sommet de la falaise du Stiff, point culminant d'Ouessant, Vauban fait élever en 1699 deux tours tronconiques accolées : l'une abrite l'escalier, l'autre les logements des gardiens et la réserve de charbon. On les reconnaît toujours dans le phare actuel.",
        "Classé monument historique depuis 2011, le phare se visite des vacances de Pâques à la fin septembre. Restauré en 2014, il propose un parcours sur son histoire avant l'ascension de ses 104 marches.",
      ],
    },
    {
      id: 'histoire',
      nav: 'Histoire',
      title: 'Trois siècles de lumière',
      paragraphs: [
        "Dès le XIIIe siècle, Ouessant compte des postes de guet contre la marine anglaise. À la fin du XVIIe siècle, pour protéger le port militaire de Brest, Vauban décide d'élever des tours avec fanal en baie du Stiff. Le premier feu de l'île s'allume en 1702.",
        "Réflecteur et lampes à huile en 1780, douze lampes paraboliques en 1821, grande optique de Fresnel en 1831 : le phare suit tous les progrès. Il est électrifié en 1957 et automatisé en 1993. Depuis 1978, une tour radar l'accompagne pour surveiller l'entrée de la Manche.",
      ],
    },
    {
      id: 'radio',
      nav: 'La TSF',
      title: 'Un pionnier de la radio',
      paragraphs: [
        "En 1902, depuis le Stiff, Camille Tissot fait les essais de la station radio Ouessant TSF, qui communique avec Brest et une flotte de quatorze navires à 80 kilomètres. De 1904 à 1913, la station échange avec quelque 80 paquebots.",
        "En juin 1911, le Stiff devient l'un des premiers radiophares des côtes françaises, avec celui de l'île de Sein, pour baliser l'entrée du port de Brest.",
      ],
    },
  ],
  timeline: [
    { year: '1699', text: 'Vauban décide la construction des deux tours.' },
    { year: '1702', text: 'Premier allumage, au bois et au charbon.' },
    { year: '1831', text: 'Grande optique de Fresnel.' },
    { year: '1902', text: 'Essais de la station radio Ouessant TSF.' },
    { year: '1957', text: 'Électrification du phare.' },
    { year: '1993', text: 'Automatisation.' },
    { year: '2011', text: 'Classement monument historique.' },
    { year: '2014', text: 'Restauration et nouveau parcours de visite.' },
  ],
  photos: photosOf('phare-stiff'),
  practical: [
    { icon: 'clock', title: 'Visite', text: 'Ouvert des vacances de Pâques à fin septembre.' },
    { icon: 'route', title: 'Accès', text: "Bateau depuis Brest ou Le Conquet jusqu'au port du Stiff ; le phare domine le port." },
  ],
  sources: [{ label: 'Wikipédia : Phare du Stiff', url: 'https://fr.wikipedia.org/wiki/Phare_du_Stiff' }],
  pois: [],
};
