// Fiche : Phare de Saint-Mathieu (Plougonvelin)
import { heroOf, photosOf } from './phares-media.js';

export default {
  id: 'phare-saint-mathieu',
  available: true,
  icon: 'lighthouse',
  tags: ['phare', 'histoire'],
  title: "Phare de Saint-Mathieu, la lumière de l'abbaye",
  shortTitle: 'Phare de Saint-Mathieu',
  commune: 'Plougonvelin · Pointe Saint-Mathieu',
  coords: [-4.77083, 48.33],
  miniZoom: 11.5,
  category: 'Phare · Abbaye',
  teaser:
    "Une tour blanche coiffée de rouge, dressée au milieu des ruines d'une abbaye, au bout du monde. Les moines y entretenaient déjà un fanal à la fin du XVIIe siècle, et le phare actuel a été bâti en partie avec les pierres de l'abbaye.",
  hero: heroOf('phare-saint-mathieu'),
  lighthouse: {
    built: '1835, avec des pierres de l\'abbaye',
    lit: '15 juin 1835',
    height: '37 m',
    elevation: '56 m au-dessus de la mer',
    range: '29 milles, environ 55 km',
    light: '1 éclat blanc toutes les 15 secondes',
    keepers: 'Gardé jusqu\'en février 2006',
    visit: 'Ouvert tous les jours en juillet et août, plusieurs jours par semaine le reste de l\'année : 163 marches',
    visitors: 'Chiffre non publié',
    protection: 'Classé monument historique (2011)',
  },
  facts: [
    { value: '1835', label: 'mise en service, le 15 juin' },
    { value: '37 m', label: 'de hauteur de tour' },
    { value: '55 km', label: 'de portée (29 milles)' },
    { value: '163', label: 'marches jusqu\'au feu' },
  ],
  records: [
    {
      medal: 'or', scope: 'France', title: 'La première lanterne vitrée fermée',
      text: 'Expérimentée ici en 1689, puis généralisée.',
      more: "En 1689, la Marine royale expérimente au sommet de la tour carrée de l'abbaye un nouveau type de lanterne vitrée et close, plus efficace contre le vent et la pluie. L'essai est si concluant que les ingénieurs du royaume décident de remplacer les foyers ouverts des phares par ces foyers fermés : à Saint-Mathieu en 1692, puis à Fréhel, Chassiron et au Stiff.",
    },
    {
      medal: 'argent', scope: 'Pointe de Bretagne', title: "L'un des trois grands feux d'atterrissage",
      text: "Avec le Créac'h d'Ouessant et le phare de l'île de Sein.",
      more: "Situé entre le Créac'h et le phare de l'île de Sein, Saint-Mathieu fait partie des trois feux majeurs d'atterrissage de la pointe occidentale de la Bretagne. Aligné avec le phare de Kermorvan, il donne aussi la route du chenal du Four.",
    },
  ],
  funFact: { title: 'Les moines allumeurs', text: "En 1694, faute d'un feu régulier, les moines de l'abbaye se chargent d'allumer le fanal, en échange du droit de bris : le droit de récupérer les épaves." },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Le phare de Saint-Mathieu se dresse sur la pointe du même nom, à Plougonvelin, au milieu des ruines de l'abbaye Saint-Mathieu de Fine-Terre. Phare d'atterrissage d'une portée de 29 milles, il guide aussi les navires dans le chenal du Four. Il est classé monument historique depuis 2011.",
        "On le visite tous les jours en juillet et août, et plusieurs jours par semaine le reste de l'année : 163 marches mènent au sommet.",
      ],
    },
    {
      id: 'fanal',
      nav: "L'ancien fanal",
      title: "Le fanal de l'abbaye",
      paragraphs: [
        "La tour carrée de l'abbaye a peut-être servi de phare dès l'époque romaine. En 1689, la Marine y installe une lanterne vitrée close, puis des lampions de cuivre à l'huile de poisson. Par économie, le feu n'est d'abord allumé que les nuits très noires d'automne et d'hiver.",
        "En 1750, un coup de vent démolit la lanterne. On doit aussi poser un grillage, car la lumière attire les oiseaux de mer qui s'écrasent sur les carreaux. Vendue comme bien national en 1796, l'abbaye est livrée aux démolisseurs, mais la tour du phare est épargnée.",
      ],
    },
    {
      id: 'tour',
      nav: 'La tour',
      title: 'Une tour de 1835',
      paragraphs: [
        "La Marine fait construire une tour ronde de granit, en partie avec les pierres de l'abbaye. Huit pièces, magasins et chambres des gardiens, s'enroulent autour de l'escalier. Le feu s'allume le 15 juin 1835, à l'huile de colza, puis au pétrole.",
        "Électrifié en mars 1932, le phare prend son aspect actuel en juin 1963 : tour blanche marquée « SAINT-MATHIEU » en rouge, et bande rouge au sommet. Automatisé en 1996, il n'est plus gardienné depuis février 2006.",
      ],
    },
  ],
  timeline: [
    { year: '1689', text: 'Première lanterne vitrée close sur la tour de l\'abbaye.' },
    { year: '1694', text: 'Les moines prennent en charge le fanal.' },
    { year: '1796', text: 'L\'abbaye est vendue, la tour du phare épargnée.' },
    { year: '1835', text: 'Mise en service de la tour actuelle, le 15 juin.' },
    { year: '1932', text: 'Électrification, en mars.' },
    { year: '1963', text: 'La tour prend ses couleurs blanc et rouge.' },
    { year: '2006', text: 'Départ des derniers gardiens, en février.' },
    { year: '2011', text: 'Classement monument historique.' },
  ],
  photos: photosOf('phare-saint-mathieu'),
  practical: [
    { icon: 'clock', title: 'Visite', text: "Tous les jours en juillet et août, plusieurs jours par semaine le reste de l'année." },
    { icon: 'car', title: 'Accès', text: 'Par la route depuis Le Conquet ou Plougonvelin ; parking à la pointe.' },
  ],
  sources: [{ label: 'Wikipédia : Phare de Saint-Mathieu', url: 'https://fr.wikipedia.org/wiki/Phare_de_Saint-Mathieu' }],
  pois: [],
};
