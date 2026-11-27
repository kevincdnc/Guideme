// Fiche : Grand phare de l'île de Sein
import { heroOf, photosOf } from './phares-media.js';

export default {
  id: 'phare-sein',
  available: true,
  icon: 'lighthouse',
  tags: ['phare', 'histoire'],
  title: "Grand phare de l'île de Sein",
  shortTitle: 'Grand phare de Sein',
  commune: 'Île-de-Sein',
  coords: [-4.8664, 48.0438],
  miniZoom: 11.5,
  category: 'Phare',
  teaser:
    "Le premier phare de Sein a été soufflé par les Allemands en 1944 : ses blocs de granit jonchent encore la lande. Le grand phare actuel, reconstruit en 1950, fournit aussi l'électricité de l'île.",
  hero: heroOf('phare-sein'),
  lighthouse: {
    built: '1950 à 1951 (premier phare : 1839)',
    lit: '1951',
    height: '52,90 m',
    elevation: '49 m au-dessus de la mer',
    range: '29 milles, environ 54 km',
    light: '4 éclats blancs toutes les 25 secondes',
    keepers: 'Gardé, aujourd\'hui automatisé',
    visit: "Sur l'île, à l'ouest du bourg, accessible à pied",
    visitors: 'Chiffre non publié',
    protection: 'Inscrit monument historique (2015)',
  },
  facts: [
    { value: '1951', label: 'mise en service du phare actuel' },
    { value: '52,9 m', label: 'de hauteur de tour' },
    { value: '54 km', label: 'de portée (29 milles)' },
    { value: '1944', label: 'destruction du premier phare' },
  ],
  records: [],
  funFact: { title: 'Une pierre pour de Gaulle', text: "En août 1946, lors de sa visite sur l'île, après la remise de la croix de la Libération à la commune, les Sénans offrent au général de Gaulle une pierre de leur phare détruit." },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Le grand phare de l'île de Sein a été construit en 1950 et 1951, sur le site d'un premier phare allumé le 15 mai 1839. Avec la pointe du Raz, ce premier feu donnait l'alignement de la chaussée de Sein, avant la construction d'Ar-Men.",
        "L'usine électrique qui se trouve dans son enceinte alimente l'île en électricité. Le phare est inscrit monument historique depuis 2015.",
      ],
    },
    {
      id: 'destruction',
      nav: '1944',
      title: 'Le phare soufflé',
      paragraphs: [
        "Le premier phare était une tour cylindrique de 43 mètres. Électrifié en 1935, il portait aussi l'un des premiers radiophares des côtes françaises, en 1911, avec celui du Stiff à Ouessant.",
        "Le 4 août 1944, les troupes allemandes battent en retraite et entassent grenades, mines et dynamite dans une cave du phare. L'explosion fait s'effondrer la tour : des pierres sont projetées à des centaines de mètres, et l'on voit encore des blocs de granit aux alentours.",
        "Un pylône métallique porte un feu provisoire dès juin 1945, puis un feu électrique en 1946. La nouvelle tour, en béton, est élevée en 1950, et sa lanterne tourne à nouveau en 1951.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        {
          title: "Un bout de phare à Lille",
          text: "La pierre offerte au général de Gaulle en 1946 sert aujourd'hui de socle à l'effigie du Général, sous les fenêtres de sa maison natale à Lille.",
        },
        {
          title: "Une tête noire",
          text: "En 1876, la partie haute du premier phare est peinte en noir, sur 12 mètres de hauteur.",
        },
        {
          title: "Le premier tout en granite",
          text: "Le phare de 1839, en granit rose, est le premier phare entièrement bâti en granite. Celui d'aujourd'hui, reconstruit sur ses fondations, a demandé environ 1 800 m³ de béton.",
        },
        {
          title: "L'eau et la lumière de l'île",
          text: "Le phare n'éclaire pas que la mer : sa centrale électrique alimente l'île, et une station de désalinisation fournit l'eau douce aux habitants.",
        },
        {
          title: "Un nouveau chapitre",
          text: "Le phare a été confié au Conservatoire du littoral en 2020. Le projet prévoit un lieu de visite, des gîtes patrimoniaux et des logements pour les ouvriers de passage. On peut y grimper de juin à septembre : 249 marches pour une vue imprenable sur le raz de Sein.",
        },
      ],
    },
  ],
  timeline: [
    { year: '1839', text: 'Allumage du premier phare, le 15 mai.' },
    { year: '1911', text: 'L\'un des premiers radiophares de France.' },
    { year: '1935', text: 'Électrification du feu, le 15 décembre.' },
    { year: '1944', text: 'Les Allemands font sauter le phare, le 4 août.' },
    { year: '1946', text: 'Une pierre du phare offerte au général de Gaulle.' },
    { year: '1951', text: 'Mise en service du phare actuel.' },
    { year: '2015', text: 'Inscription aux monuments historiques.' },
  ],
  photos: photosOf('phare-sein'),
  practical: [
    { icon: 'route', title: 'Accès', text: "Vedettes au départ d'Audierne (Sainte-Évette), puis à pied depuis le bourg de Sein." },
  ],
  sources: [
    { label: "Wikipédia : Grand phare de l'île de Sein", url: "https://fr.wikipedia.org/wiki/Grand_phare_de_l%27%C3%AEle_de_Sein" },
    { label: "DIRM Nord Atlantique-Manche Ouest : phare de Sein", url: "https://www.dirm.nord-atlantique-manche-ouest.developpement-durable.gouv.fr/phare-de-sein-a99.html" },
    { label: "Conservatoire du littoral : restauration du phare de l'île de Sein", url: "https://www.conservatoire-du-littoral.fr/218-restauration-du-phare-de-l-ile-de-sein.htm" },
    { label: "Réserve de biosphère d'Iroise : phare de Goulénez", url: "https://www.reserve-biosphere-iroise.fr/point-d-interet/phare-de-goulenez/" },
  ],
  pois: [],
};
