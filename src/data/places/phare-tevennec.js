// Fiche : Phare du Tévennec (raz de Sein)
import { heroOf, photosOf } from './phares-media.js';

export default {
  id: 'phare-tevennec',
  available: true,
  icon: 'lighthouse',
  tags: ['phare', 'legende'],
  title: 'Phare du Tévennec, la maison hantée du raz',
  shortTitle: 'Phare du Tévennec',
  commune: 'Raz de Sein · Large de la pointe du Van',
  coords: [-4.79333, 48.06972],
  miniZoom: 9.6,
  category: 'Phare en mer',
  teaser:
    "Une petite maison toute seule sur un rocher noir, là où l'Ankou viendrait chercher les noyés. En 35 ans, 23 gardiens s'y sont succédé : certains ont fui, d'autres y ont perdu la raison. Ose pousser la porte.",
  hero: heroOf('phare-tevennec'),
  lighthouse: {
    built: '1869 à 1874',
    lit: '15 mars 1875, à minuit',
    height: '15 m',
    elevation: '29,5 m au-dessus de la mer',
    range: 'Feu de chenal à secteurs blanc et rouge',
    light: 'Secteurs blanc et rouge, pour guider le passage du raz',
    keepers: 'Gardé de 1875 à 1910 (dernier couple : les Ropart)',
    visit: 'Non visitable : îlot en mer, dans le nord du raz de Sein',
    visitors: 'Aucune : phare en mer, inaccessible',
    protection: 'Inscrit monument historique (2015)',
  },
  facts: [
    { value: '1875', label: 'mise en service, le 15 mars' },
    { value: '15 m', label: 'de hauteur de tour' },
    { value: '23', label: 'gardiens et gardiennes en 35 ans' },
    { value: '1910', label: 'départ des derniers gardiens' },
  ],
  records: [
    {
      medal: 'or', scope: 'Phares de France', title: 'La seule maison-phare bâtie au large',
      text: 'Une habitation complète, avec sa tour, sur un rocher en mer.',
      more: "Tévennec est l'unique maison-phare construite au large : une vraie maison, avec un couloir central et deux pièces de chaque côté, et une tour carrée de 11 mètres accolée à son pignon. Ce plan, dessiné sur un modèle de Léonce Reynaud par l'ingénieur Paul Joly (celui d'Ar-Men), a permis d'y loger des couples de gardiens, et même des enfants.",
    },
    {
      medal: 'argent', scope: 'Phares en mer', title: "L'un des trois seuls à avoir un four à pain",
      text: 'Avec Cordouan et les Triagoz.',
      more: "Tévennec est l'un des très rares phares en mer à posséder un four à pain, avec Cordouan, en Gironde, et les Triagoz, dans les Côtes-d'Armor. Il fut mis en service après le départ des Quéméré, qui recevaient leur pain de l'île de Sein, souvent rassis ou détrempé. Le four est toujours en état, mais son appentis a perdu son toit et sa cheminée.",
    },
    {
      medal: 'bronze', scope: 'Gardiens', title: '15 ans de service : le record du phare',
      text: 'Détenu par Corentin Coquet, de 1881 à 1896.',
      more: "Alors que la plupart des gardiens ne restaient que quelques mois, Corentin Coquet a tenu quinze ans à Tévennec, de 1881 à 1896 : le record absolu du phare. Viennent ensuite les Quéméré, cinq ans, de 1900 à 1905, avec leur vache venue de Sein.",
    },
  ],
  funFact: { title: 'Une vache sur le rocher', text: "De 1900 à 1905, le couple Quéméré améliorait l'ordinaire grâce à une vache apportée de l'île de Sein, avec son fourrage : aucune herbe ne pousse sur Tévennec." },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Le phare du Tévennec se dresse sur un rocher au nord du raz de Sein, au large de la pointe du Van. Avec le phare de la Vieille, il guide les navires dans ce passage où le courant peut dépasser 6 nœuds : en suivant de secteur blanc en secteur blanc les feux des deux phares, on franchit le raz de nuit en évitant les récifs.",
        "C'est la seule maison-phare construite au large. Allumé le 15 mars 1875, sans la moindre inauguration, il est gardé jusqu'en 1910, puis rendu automatique au gaz. Il est inscrit monument historique depuis 2015.",
      ],
    },
    {
      id: 'legende',
      nav: 'La légende',
      title: "Le rocher de l'Ankou",
      paragraphs: [
        "Selon une tradition très ancienne, c'est au Tévennec que l'Ankou de la mer, à bord du bag noz, la barque de nuit, vient chercher les âmes des marins morts dans l'année. Les marins qui l'apercevaient étaient censés périr à leur tour. Les habitants de Sein, comme les navigateurs du raz, ne voulaient pas de ce chantier.",
        "On racontait aussi entendre des cris de naufragés. En 1893, un prêtre vint exorciser le rocher et y planta une croix. Elle tint plus d'un siècle, jusqu'à la tempête de 2009 ; une nouvelle croix a été posée en 2012. Dans les années 1990, une explication a été avancée : par certaines mers, les vagues traversent le rocher par une faille et provoquent des bruits sourds.",
      ],
    },
    {
      id: 'gardiens',
      nav: 'Les gardiens',
      title: '35 ans de gardiennage',
      paragraphs: [
        "Le premier gardien, le Sénan Henri Porsmoguer, prend son poste en mars 1875 et démissionne dès août, après une « nuit d'horreur » en compagnie de « l'esprit de Tévennec ». Rapporté en 1891, son témoignage, repris par Anatole Le Braz, a fait du phare le plus célèbre phare hanté de France. Deux gardiens y perdirent la raison, Henri Guézennec et Alain Menou, et trois autres y laissèrent la vie.",
        "En 1897, faute de candidats, l'administration décide d'y installer un gardien avec sa femme, payée 50 francs par mois comme auxiliaire. Les Quéméré y restent cinq ans avec leurs enfants ; Marie-Jacquette dira plus tard que ce fut la plus belle période de sa vie. Mais les démissions reprennent, et en 1910, on renonce : le feu au gaz devient permanent, rechargé tous les 18 mois.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        { title: 'Les récits du saloir', text: "Parmi les histoires qui entourent le phare : un gardien serait mort dans les bras de sa femme, qui l'aurait conservé au saloir jusqu'à la relève ; une autre aurait accouché une nuit d'ouragan, au moment où le toit s'envolait. Des récits souvent amplifiés, mais qui ont forgé la légende." },
        { title: 'Sans inauguration', text: "Pas de ministre ni de discours : un simple avis aux navigateurs annonce que le feu sera allumé le 15 mars 1875 à minuit. Un contraste saisissant avec les fêtes données pour d'autres phares." },
        { title: '69 jours en solitaire', text: "En 2016, le président de la Société nationale pour le patrimoine des phares et balises a vécu seul sur le phare pendant 69 jours, de février à mai. Personne n'y avait plus habité longuement depuis 1910." },
        { title: '« Méfie-toi du Tévennec »', text: "Le vieil adage sénan rappelle que le plateau rocheux caché sous le rocher barre la sortie nord du raz : tout navire en panne, pris par le courant de flot, y était inévitablement porté." },
      ],
    },
  ],
  timeline: [
    { year: '1869', text: 'Début du chantier, mené par Paul Joly.' },
    { year: '1875', text: 'Mise en service du feu, le 15 mars à minuit.' },
    { year: '1881', text: 'Corentin Coquet commence 15 ans de service.' },
    { year: '1893', text: 'Un prêtre vient exorciser le rocher.' },
    { year: '1897', text: 'Le phare est désormais confié à un couple de gardiens.' },
    { year: '1910', text: 'Automatisation au gaz et départ des derniers gardiens.' },
    { year: '2015', text: 'Inscription aux monuments historiques.' },
    { year: '2016', text: '69 jours de séjour en solitaire.' },
  ],
  photos: photosOf('phare-tevennec'),
  practical: [
    { icon: 'warn', title: 'Phare en mer', text: 'Inaccessible au public.' },
    { icon: 'hike', title: "Où l'apercevoir", text: 'Depuis la pointe du Van et la pointe du Raz, ou lors de la traversée vers l\'île de Sein.' },
  ],
  sources: [{ label: 'Wikipédia : Phare du Tévennec', url: 'https://fr.wikipedia.org/wiki/Phare_du_T%C3%A9vennec' }],
  pois: [],
};
