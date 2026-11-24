// Fiche : Douarnenez
import { C } from './media.js';

export default {
  id: 'douarnenez',
  available: true,
  icon: 'port',
  tags: ['port', 'histoire', 'legende'],
  title: 'Douarnenez, la cité des Penn Sardin',
  shortTitle: 'Douarnenez',
  commune: 'Douarnenez',
  coords: [-4.329167, 48.092778],
  category: 'Port · Ville',
  labels: ['Ville aux trois ports', 'Port-musée'],
  teaser:
    "Le premier port sardinier de France, des ouvrières qui ont fait plier les patrons en 1924, la plus vieille conserverie du monde encore en activité, et la légende d'une ville engloutie dans la baie.",
  hero: {
    src: `${C}/thumb/5/52/023_Douarnenez_vu_depuis_les_falaises_de_Kerlaz.jpg/1280px-023_Douarnenez_vu_depuis_les_falaises_de_Kerlaz.jpg`,
    alt: 'Douarnenez et sa baie vues depuis les falaises de Kerlaz',
    credit: 'Moreau.henri, CC BY-SA 4.0, Wikimedia Commons',
  },
  facts: [
    { value: '1853', label: 'naissance de la plus vieille conserverie du monde' },
    { value: '300 millions', label: 'de sardines pêchées en 1860' },
    { value: '1924', label: 'grève des Penn Sardin, 46 jours' },
    { value: '1921', label: 'premier maire communiste de France' },
  ],
  records: [
    { medal: 'or', scope: 'Monde', title: 'La plus ancienne conserverie encore en activité', text: 'Chancerelle, née à Tréboul en 1853.' },
    { medal: 'or', scope: 'France', title: 'Premier maire élu comme communiste', text: 'Sébastien Velly, en juillet 1921.' },
    { medal: 'argent', scope: 'France', title: 'Premier port sardinier au XIXe siècle', text: 'Puis premier port de pêche côtière en 1900.' },
    { medal: 'bronze', scope: 'France', title: 'Parmi les 10 premières femmes élues', text: 'Joséphine Pencalet, conseillère municipale en 1925.' },
  ],
  funFact: { title: 'La place de l\'Enfer… qui n\'en est pas un', text: 'L\'ancien marais (gwern en breton) serait devenu Ivern, puis Ifer… et enfin « Enfer ».' },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Douarnenez a donné son nom à la grande baie qui s'ouvre entre le cap de la Chèvre et la pointe du Millier. C'est la ville aux trois ports : le Rosmeur, port de pêche, le Port-Rhu et Tréboul, ports de plaisance. La commune actuelle date de 1945, quand Douarnenez a fusionné avec Ploaré, Pouldavid et Tréboul.",
        "Son nom viendrait du breton Douar an enez, « la terre de l'île » : le bourg dépendait alors du prieuré de l'île Tristan, l'îlot d'environ sept hectares qui garde l'entrée de la rivière et devient presqu'île à marée basse. Ses habitants ont un surnom : les Penn Sardin, les « têtes de sardines ».",
      ],
    },
    {
      id: 'sardine',
      nav: 'La sardine',
      title: 'Sardinopolis',
      paragraphs: [
        "Au XIXe siècle, toute la ville sent la sardine, la saumure et les filets bleus qui sèchent le long des façades. Douarnenez est alors le premier port sardinier de France. En 1850, on y remplit 90 000 barils de sardines pressées, soit environ 225 millions de poissons. En 1860, la pêche atteint 300 millions de sardines.",
        "En 1853, la première conserverie à l'huile remplace la vieille technique de la presse, à Tréboul. Rachetée en 1855 par les frères Chancerelle, elle tourne toujours : c'est la plus ancienne conserverie au monde encore en activité. Avant 1900, la ville compte 32 conserveries ; en 1889, la pêche fait vivre environ 800 bateaux et plus de 3 500 marins.",
        "Puis la sardine se fait rare, entre 1880 et 1914, et la plupart des usines ferment. Les marins partent pêcher la langouste jusqu'au Maroc et en Mauritanie : jusque dans les années 1980, on les appelle à Douarnenez les « Mauritaniens ».",
      ],
    },
    {
      id: 'greve',
      nav: '1924',
      title: 'Les Penn Sardin font plier les patrons',
      paragraphs: [
        "Le travail dans les conserveries est presque entièrement féminin, et terriblement dur. En 1924, les ouvrières, qu'elles aient 12 ou 80 ans, gagnent 16 sous de l'heure. Elles peuvent travailler jusqu'à 72 heures d'affilée, et les heures passées à attendre le poisson ne sont pas payées.",
        "Le 21 novembre 1924, la grève commence dans une fabrique de boîtes, puis gagne le 25 toutes les usines du port. 1 600 femmes, sur 2 100 grévistes, défilent chaque jour au cri de « Pemp real a vo ! », « Ce sera cinq réaux », soit 25 sous. Les patrons font venir des briseurs de grève, mais le scandale éclate quand on découvre qu'ils ont été payés 20 000 francs.",
        "Le 8 janvier 1925, après 46 jours de grève, les ouvrières obtiennent un franc de l'heure, le paiement de toutes les heures de présence et des majorations pour les heures supplémentaires et le travail de nuit. Quelques mois plus tard, l'une d'elles, Joséphine Pencalet, est élue au conseil municipal alors que les femmes n'ont pas encore le droit de vote.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        {
          title: 'La ville d\'Ys, sous la baie',
          text: "Selon la légende mise en forme au XIIe siècle, une cité prospère et insoumise, Ys, aurait été bâtie dans la baie avant d'être engloutie par l'océan en guise de punition divine.",
        },
        {
          title: 'La « ville rouge »',
          text: "En juillet 1921, Douarnenez élit Sébastien Velly, premier maire de France élu comme communiste. Son successeur, Daniel Le Flanchec, dirige la ville de 1924 à 1940 et soutient la grève des sardinières : la ville y gagne son surnom de « ville rouge ».",
        },
        {
          title: 'Élue sans avoir le droit de vote',
          text: "Le 3 mai 1925, Joséphine Pencalet, ouvrière d'usine et gréviste, devient l'une des dix premières femmes élues conseillères municipales en France. Elle siège six fois avant que le Conseil d'État n'annule son élection en novembre 1925.",
        },
        {
          title: '« Tiens bon »',
          text: "La devise de la ville, Dalc'h mad, « Tiens bon », vient du nom d'une barque empruntée par des résistants douarnenistes pour rejoindre l'Angleterre après l'appel du général de Gaulle.",
        },
        {
          title: 'La place de l\'Enfer',
          text: "La place de l'Enfer, aménagée en 1901 avec un lavoir, occupe une ancienne anse marécageuse. Un marais se dit gwern en breton : le mot serait devenu Ivern, puis Ifer… et enfin « Enfer ».",
        },
        {
          title: 'Un port devenu musée',
          text: "Le 22 mai 1993, Douarnenez inaugure son port-musée au Port-Rhu, avec un bassin à flot gardé par une écluse. Il est né de la collection d'une centaine de vieilles coques réunies par l'association Treizour.",
        },
      ],
    },
  ],
  timeline: [
    { year: '1505', text: 'Première mention du nom, « Douarnenectz ».' },
    { year: '1850', text: '90 000 barils de sardines pressées.' },
    { year: '1853', text: 'Première conserverie à Tréboul, future Chancerelle.' },
    { year: '1860', text: '300 millions de sardines pêchées.' },
    { year: '1900', text: 'Premier port français de pêche côtière.' },
    { year: '1921', text: 'Premier maire communiste élu en France.' },
    { year: '1924', text: 'Grève des Penn Sardin, 46 jours, victoire le 8 janvier 1925.' },
    { year: '1945', text: 'Fusion avec Ploaré, Pouldavid et Tréboul.' },
    { year: '1978', text: 'Premier Festival de cinéma de Douarnenez.' },
    { year: '1993', text: 'Inauguration du port-musée au Port-Rhu.' },
  ],
  archives: [
    {
      year: 'v. 1907',
      src: `${C}/thumb/3/3f/679_Douarnenez.JPG/1280px-679_Douarnenez.JPG`,
      caption: 'Chaloupes sardinières rentrant au port.',
      credit: 'Joseph-Marie Villard, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:679_Douarnenez.JPG',
    },
    {
      year: 'v. 1905',
      src: `${C}/thumb/2/2a/689_Douarnenez.JPG/1280px-689_Douarnenez.JPG`,
      caption: 'La rue Sainte-Hélène, des filets de pêche séchant à un balcon.',
      credit: 'Joseph-Marie Villard, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:689_Douarnenez.JPG',
    },
    {
      year: 'Conserverie',
      src: `${C}/thumb/4/4e/684_Paul_Gruyer_Remplissage_de_l%27huile_Douarnenez.jpg/1280px-684_Paul_Gruyer_Remplissage_de_l%27huile_Douarnenez.jpg`,
      caption: "Ouvrières d'une conserverie remplissant les boîtes d'huile, au début du XXe siècle.",
      credit: 'Paul Gruyer, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:684_Paul_Gruyer_Remplissage_de_l%27huile_Douarnenez.jpg',
    },
    {
      year: 'Peinture',
      src: `${C}/thumb/e/ee/Alexandre-Charles_Masson_-_Douarnenez.jpg/1280px-Alexandre-Charles_Masson_-_Douarnenez.jpg`,
      caption: 'Le séchage des sardines sur civière, tableau d\'Alexandre-Charles Masson.',
      credit: 'Alexandre-Charles Masson, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Alexandre-Charles_Masson_-_Douarnenez.jpg',
    },
    {
      year: '1903',
      src: `${C}/thumb/4/4e/082_Distribution_de_vivres_%C3%A0_la_mairie_en_1903_lors_de_la_crise_sardini%C3%A8re.JPG/1280px-082_Distribution_de_vivres_%C3%A0_la_mairie_en_1903_lors_de_la_crise_sardini%C3%A8re.JPG`,
      caption: 'Distribution de vivres à la mairie pendant la crise sardinière (panneau d\'exposition).',
      credit: 'Photo Moreau.henri, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:082_Distribution_de_vivres_%C3%A0_la_mairie_en_1903_lors_de_la_crise_sardini%C3%A8re.JPG',
    },
  ],
  photos: [
    {
      src: `${C}/thumb/b/bf/055_Le_port_de_Douarnenez.JPG/1280px-055_Le_port_de_Douarnenez.JPG`,
      caption: 'Le port de pêche du Rosmeur.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:055_Le_port_de_Douarnenez.JPG',
    },
    {
      src: `${C}/thumb/a/aa/166_Douarnenez_Port-Mus%C3%A9e.JPG/1280px-166_Douarnenez_Port-Mus%C3%A9e.JPG`,
      caption: 'Le port-musée du Port-Rhu.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:166_Douarnenez_Port-Mus%C3%A9e.JPG',
    },
    {
      src: `${C}/thumb/d/d1/168_Douarnenez_Chapelle_Saint-Michel.JPG/1280px-168_Douarnenez_Chapelle_Saint-Michel.JPG`,
      caption: 'La chapelle Saint-Michel et ses plafonds peints entre 1667 et 1675.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:168_Douarnenez_Chapelle_Saint-Michel.JPG',
    },
    {
      src: `${C}/thumb/2/2b/142_Tr%C3%A9boul_La_plage_des_sables_blancs.JPG/1280px-142_Tr%C3%A9boul_La_plage_des_sables_blancs.JPG`,
      caption: 'Tréboul : la plage des Sables Blancs.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:142_Tr%C3%A9boul_La_plage_des_sables_blancs.JPG',
    },
  ],
  videos: [],
  practical: [
    { icon: 'hike', title: 'Les trois ports', text: 'Le Rosmeur (pêche), le Port-Rhu (port-musée) et Tréboul (plaisance, plages) se relient à pied le long de la rivière.' },
    { icon: 'bus', title: 'Île de Sein', text: 'Des bateaux pour l\'île de Sein partent aussi du quai du Rosmeur.' },
    { icon: 'book', title: 'Cinéma', text: 'Le Festival de cinéma de Douarnenez a lieu chaque année depuis 1978.' },
  ],
  sources: [
    { label: 'Wikipédia : Douarnenez', url: 'https://fr.wikipedia.org/wiki/Douarnenez' },
  ],
  pois: [],
};
