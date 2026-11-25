// Fiche : Phare du Créac'h (Ouessant)
import { heroOf, photosOf } from './phares-media.js';

export default {
  id: 'phare-creach',
  available: true,
  icon: 'lighthouse',
  tags: ['phare', 'histoire'],
  title: "Phare du Créac'h, la porte de la Manche",
  shortTitle: "Phare du Créac'h",
  commune: 'Ouessant · Pointe de Créac\'h',
  coords: [-5.12889, 48.45917],
  miniZoom: 11,
  category: 'Phare · Musée',
  teaser:
    "Rayé de noir et de blanc, à la pointe ouest d'Ouessant, il marque l'entrée de la Manche avec l'un des feux les plus puissants d'Europe. À ses pieds, le musée des Phares et Balises raconte deux siècles de lumière.",
  hero: heroOf('phare-creach'),
  lighthouse: {
    built: '1863',
    lit: '1863',
    height: '47 m',
    elevation: '70 m au-dessus de la mer',
    range: '30 milles, environ 55 km',
    light: '2 éclats blancs toutes les 10 secondes',
    keepers: 'Il télécontrôle aujourd\'hui la Jument, Nividic, Kéréon, le Stiff et les Pierres Noires',
    visit: 'Musée des Phares et Balises au pied du phare, fermé pour rénovation (réouverture annoncée pour 2027)',
    visitors: 'Environ 16 000 par an pour le musée (2018)',
    protection: 'Classé monument historique (2011)',
  },
  facts: [
    { value: '1863', label: 'premier allumage' },
    { value: '47 m', label: 'de hauteur de tour' },
    { value: '55 km', label: 'de portée (30 milles)' },
    { value: '17 t', label: 'pour sa quadruple optique' },
  ],
  records: [
    {
      medal: 'or', scope: 'Monde', title: 'Le phare le plus puissant du monde en 1939',
      text: 'Avec la lanterne présentée à l\'Exposition universelle de 1937.',
      more: "En 1939, le Créac'h reçoit une nouvelle lanterne, présentée à l'Exposition universelle de 1937 : son feu devient alors le plus puissant du monde. Il fonctionnait avec quatre lampes de 3 000 watts, et par temps de brume avec quatre lampes à arc qui faisaient passer sa puissance de 5 à 500 millions de candelas. Aujourd'hui encore, c'est l'un des phares les plus puissants d'Europe, avec celui du cap Saint-Vincent, au Portugal.",
    },
    {
      medal: 'or', scope: 'Europe', title: 'La plus belle collection de lentilles de Fresnel',
      text: 'Au musée des Phares et Balises, dans l\'ancienne centrale.',
      more: "Au pied du phare, l'ancienne salle des machines de la centrale électrique, désaffectée en 1970, abrite le musée des Phares et Balises. Il présente la plus belle collection de lentilles de Fresnel d'Europe, issue en 1988 de l'ancien dépôt des Phares et Balises du Trocadéro, à Paris : fanaux, balises, optiques, bouées, objets d'épaves…",
    },
    {
      medal: 'argent', scope: 'France métropolitaine', title: 'Le 3e phare le plus à l\'ouest',
      text: 'Seuls Nividic et la Jument, en mer, sont plus à l\'ouest.',
      more: "Phare de « grand atterrissage », le Créac'h marque l'entrée dans la Manche, à l'ouest d'Ouessant. En France métropolitaine, seuls deux phares sont situés plus à l'ouest : Nividic et la Jument, tous deux en mer, qu'il pilote à distance.",
    },
  ],
  funFact: { title: 'Une optique de 17 tonnes', text: "Sa quadruple optique de 17 tonnes tourne sur une cuve de mercure. En novembre 2025, la ministre de la Mer a suspendu un projet de modernisation qui aurait réduit sa portée de 30 à 19 milles." },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Le phare du Créac'h, « la hauteur » en breton, se dresse à l'ouest d'Ouessant, derrière les éperons rocheux. C'est un phare de grand atterrissage : il annonce l'entrée de la Manche aux navires venus du large. Ses deux lanternes superposées lancent huit faisceaux visibles à environ 55 kilomètres.",
        "Allumé en 1863, il est classé monument historique depuis 2011. Avec ses bandes noires et blanches, il pilote ou surveille à distance les phares de la Jument, Nividic, Kéréon, le Stiff et les Pierres Noires.",
      ],
    },
    {
      id: 'lumiere',
      nav: 'La lumière',
      title: 'Toujours plus puissant',
      paragraphs: [
        "En 1888, le feu est électrifié ; l'ancienne optique est démontée et remontée au phare du Stiff. En 1901, il reçoit une optique double, puis un radiophare en 1912 et un diaphone, une corne de brume à air comprimé, en 1932.",
        "En 1939 arrive la lanterne de l'Exposition universelle de 1937, qui en fait le phare le plus puissant du monde. Lampes au xénon en 1969, puis aux iodures métalliques depuis 1995 : sa portée atteint 30 milles.",
      ],
    },
    {
      id: 'musee',
      nav: 'Le musée',
      title: 'Le musée des Phares et Balises',
      paragraphs: [
        "Ouessant était toute désignée pour accueillir ce musée : c'est ici qu'a été installée la première optique pour feu électrique, en 1889, et qu'est entré en service le premier phare automatique. Bien des optiques et des signaux sonores y ont été testés.",
        "Le parcours va de l'appareil conçu en 1823 par Augustin Fresnel pour le phare de Cordouan jusqu'aux appareils contemporains, avec des objets remontés d'épaves au large d'Ouessant et des films sur la vie des gardiens.",
      ],
    },
  ],
  timeline: [
    { year: '1863', text: 'Allumage du premier feu.' },
    { year: '1888', text: 'Électrification du feu.' },
    { year: '1889', text: 'Première optique pour feu électrique, à Ouessant.' },
    { year: '1912', text: 'Installation d\'un radiophare.' },
    { year: '1939', text: 'Nouvelle lanterne : le phare le plus puissant du monde.' },
    { year: '1988', text: 'Le musée reçoit les collections du Trocadéro.' },
    { year: '2011', text: 'Classement monument historique.' },
    { year: '2025', text: 'Suspension du projet de modernisation, pour garder l\'optique historique.' },
  ],
  photos: photosOf('phare-creach'),
  practical: [
    { icon: 'warn', title: 'Musée des Phares et Balises', text: "Au pied du phare, dans l'ancienne centrale électrique. Fermé pour rénovation, réouverture annoncée pour 2027." },
    { icon: 'route', title: 'Accès', text: "Bateau depuis Brest ou Le Conquet jusqu'au port du Stiff, puis à vélo ou à pied vers l'ouest de l'île." },
  ],
  sources: [
    { label: "Wikipédia : Phare du Créac'h", url: "https://fr.wikipedia.org/wiki/Phare_du_Cr%C3%A9ac%27h" },
    { label: 'Figaro Nautisme : Ouessant, le bout du monde (2018)', url: 'https://figaronautisme.meteoconsult.fr/actus-nautisme-escales/2018-08-22/33924-a-ouessant-le-bout-du-monde-attire-tous-les-regards' },
    { label: 'Routard : Phare du Créac\'h', url: 'https://www.routard.com/fr/guide/france/bretagne/finistere/ile-d-ouessant-eusa/phare-du-creac-h' },
  ],
  pois: [],
};
