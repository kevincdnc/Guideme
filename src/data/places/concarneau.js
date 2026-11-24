// Fiche : Ville Close de Concarneau
import { C } from './media.js';

export default {
  id: 'concarneau',
  available: true,
  icon: 'church',
  tags: ['histoire', 'port'],
  title: 'Concarneau, la Ville Close',
  shortTitle: 'Concarneau',
  commune: 'Concarneau · Konk-Kerne',
  coords: [-3.916266, 47.871674],
  category: 'Cité fortifiée · Port',
  labels: ['Remparts monument historique', 'Monument préféré des Bretons (2014)'],
  teaser:
    "Une cité fortifiée posée sur un îlot au milieu du port, assiégée par les Anglais, les protestants et un roi, retouchée par Vauban, puis devenue le quartier des matelots et des sardinières.",
  hero: {
    src: `${C}/thumb/6/63/Ville_Close_de_Concarneau_%281.1%29.jpg/1280px-Ville_Close_de_Concarneau_%281.1%29.jpg`,
    alt: 'Les remparts de granit de la Ville Close de Concarneau, au milieu du port',
    credit: 'Julien1978, CC BY-SA 4.0, Wikimedia Commons',
  },
  facts: [
    { value: '1451', label: 'début de la grande reconstruction des remparts' },
    { value: '980 m', label: 'de remparts autour de l\'îlot' },
    { value: '1373', label: 'Du Guesclin chasse les Anglais' },
    { value: '1905', label: 'première fête des Filets Bleus' },
  ],
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "La Ville Close est le cœur historique de Concarneau : une cité fortifiée des XVe et XVIe siècles, bâtie sur un îlot rocheux au milieu du port, autour duquel la ville s'est peu à peu développée. Elle mesure 380 mètres dans sa plus grande longueur et 220 mètres dans sa plus grande largeur.",
        "Ses remparts de granit, épais de 2,5 à 3 mètres, en font le tour sur environ 980 mètres, percés de huit tours, neuf si l'on compte le « fer à cheval ». Ils sont classés monument historique depuis 1899 et 1913. Restaurés depuis les années 1980, ils offrent aujourd'hui près de 800 mètres de chemin de ronde.",
      ],
    },
    {
      id: 'sieges',
      nav: 'Les sièges',
      title: 'Une forteresse disputée',
      paragraphs: [
        "Selon la légende, un certain Concar aurait délivré l'îlot des Pictes pour y fonder la cité. Plus sûrement, vers le Xe siècle, les moines de Landévennec y installent un prieuré, d'abord protégé par des fortifications de bois, puis de pierre à partir du XIIIe siècle.",
        "Pendant la guerre de Succession de Bretagne, les Anglais prennent la ville en 1342. Il faut trente ans d'occupation avant qu'Olivier Du Guesclin ne la reprenne en 1373 pour le roi de France. Entre 1451 et 1476, les remparts sont presque entièrement reconstruits, et prennent quasiment leur forme actuelle.",
        "Le 17 janvier 1576, en pleines guerres de Religion, des protestants s'emparent de la cité et mettent à mort la garnison ; les habitants des paroisses voisines la reprennent peu après. En 1619, c'est Louis XIII lui-même qui fait assiéger la place pour mater son gouverneur. Vers 1680, Vauban vient l'inspecter et fait renforcer les défenses, au point d'ôter les toits des tours pour y placer de l'artillerie.",
      ],
    },
    {
      id: 'sardine',
      nav: 'Le port',
      title: 'Des remparts aux conserveries',
      paragraphs: [
        "Après la Révolution, la ville déborde des murs : les maisons bourgeoises s'alignent sur les quais, et la Ville Close devient un quartier populaire de matelots et de sardinières. À partir de 1851, les premières conserveries de sardine et de thon remplacent les anciennes presses et font la fortune de quelques négociants.",
        "Le port, pourtant peu profond, accueille jusqu'à 600 chaloupes pendant la saison de la sardine, puis les thoniers. En 1900, la ville compte 30 usines employant 2 000 ouvrières, pour 7 000 habitants. En septembre 1905, pour soulager la misère d'une grave crise sardinière, le maire crée la fête des Filets Bleus.",
        "La porte au Vin ouvrait autrefois sur le premier port de commerce. Depuis 1961, l'ancien arsenal, bâti en 1846 dans la rue Vauban, abrite le musée de la Pêche.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        {
          title: 'La porte des voleurs',
          text: "La porte des Larrons doit son nom aux voleurs qu'on y faisait passer pour les emmener en barque de l'autre côté de la rive, au Passage, où ils étaient pendus. Murée pendant des siècles, elle n'a été rouverte qu'en 1991.",
        },
        {
          title: 'Une fontaine au crocodile',
          text: "Sur la place Saint-Guénolé, une fontaine de fonte des années 1855-1856 montre un crocodile tenant dans sa gueule un poisson qui porte un lampadaire, avec une loutre et une tortue à ses pieds. Elle servait à ravitailler les équipages en eau avant leur départ.",
        },
        {
          title: 'Le puits du prince Youssoupoff',
          text: "Dans la cour du Gouvernement se dresse un puits à dôme venu du château de Keriolet, offert à la ville par le prince Youssoupoff : granit gris de la région, colonnes de granit rose des Côtes-d'Armor et base de pierre noire de Kersanton.",
        },
        {
          title: 'La maison du gouverneur sans gouverneur',
          text: "La maison du Gouverneur, au XVIIe siècle, n'a jamais été habitée par un gouverneur. Elle fut même louée un temps à un menuisier.",
        },
        {
          title: 'Une chapelle aux mille vies',
          text: "La chapelle de la Trinité, hôpital dès 1539, devient temple sous la Révolution, puis église paroissiale, école, maison close pendant la Première Guerre mondiale, dispensaire… et enfin lieu d'exposition.",
        },
        {
          title: 'Le Chien jaune de Simenon',
          text: "Georges Simenon a situé au Grand Hôtel de Concarneau l'intrigue de son roman Le Chien jaune, une enquête du commissaire Maigret.",
        },
        {
          title: 'Le monument préféré des Bretons',
          text: "En 2014, l'émission Le Monument préféré des Français élit la Ville Close premier monument de Bretagne, devant les alignements de Carnac et le phare d'Eckmühl. Elle termine sixième au classement national.",
        },
      ],
    },
  ],
  timeline: [
    { year: 'Xe s.', text: 'Les moines de Landévennec fondent un prieuré sur l\'îlot.' },
    { year: '1342', text: 'Les Anglais prennent la ville.' },
    { year: '1373', text: 'Olivier Du Guesclin la reprend pour le roi de France.' },
    { year: '1451', text: 'Début de la reconstruction des remparts, achevée en 1476.' },
    { year: '1576', text: 'Prise par les protestants le 17 janvier.' },
    { year: '1619', text: 'Siège ordonné par Louis XIII.' },
    { year: 'v. 1680', text: 'Vauban fait renforcer les défenses.' },
    { year: '1851', text: 'Premières conserveries de sardine et de thon.' },
    { year: '1899', text: 'Premier classement des remparts aux monuments historiques.' },
    { year: '1905', text: 'Première fête des Filets Bleus, pour venir en aide aux familles de marins.' },
    { year: '1961', text: 'Ouverture du musée de la Pêche dans l\'ancien arsenal.' },
    { year: '2014', text: 'Élue monument préféré de Bretagne.' },
  ],
  archives: [
    {
      year: '1758',
      src: `${C}/thumb/0/02/Plan_de_la_Ville_close_en_1758.jpg/1280px-Plan_de_la_Ville_close_en_1758.jpg`,
      caption: 'Plan de la Ville Close en 1758.',
      credit: "Antoine-René d'Argenson, domaine public",
      page: 'https://commons.wikimedia.org/wiki/File:Plan_de_la_Ville_close_en_1758.jpg',
    },
  ],
  photos: [
    {
      src: `${C}/thumb/6/61/Ville_close_de_Concarneau_%281%29.jpg/1280px-Ville_close_de_Concarneau_%281%29.jpg`,
      caption: 'Les remparts de la Ville Close.',
      credit: 'Julien1978, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Ville_close_de_Concarneau_(1).jpg',
    },
    {
      src: `${C}/thumb/f/f6/Ville_close_de_Concarneau_%283%29.jpg/1280px-Ville_close_de_Concarneau_%283%29.jpg`,
      caption: 'Tours et chemin de ronde.',
      credit: 'Julien1978, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Ville_close_de_Concarneau_(3).jpg',
    },
    {
      src: `${C}/thumb/1/13/Breizh_29_-_Konk_Kerne_-_horolaj_ar_ger_gloz_01.jpg/1280px-Breizh_29_-_Konk_Kerne_-_horolaj_ar_ger_gloz_01.jpg`,
      caption: "Le beffroi, élevé en 1906 sur l'ancien poste de garde.",
      credit: 'Farz brujunet, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Breizh_29_-_Konk_Kerne_-_horolaj_ar_ger_gloz_01.jpg',
    },
    {
      src: `${C}/thumb/5/56/Ville_Close_de_Concarneau_%285%29.JPG/1280px-Ville_Close_de_Concarneau_%285%29.JPG`,
      caption: 'Le puits à dôme offert par le prince Youssoupoff.',
      credit: 'Julien1978, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Ville_Close_de_Concarneau_(5).JPG',
    },
    {
      src: `${C}/thumb/2/2e/%C3%89glise_Saint-Gu%C3%A9nol%C3%A9_de_Concarneau_%282%29.jpg/1280px-%C3%89glise_Saint-Gu%C3%A9nol%C3%A9_de_Concarneau_%282%29.jpg`,
      caption: "La façade et le clocher, tout ce qui reste de l'église Saint-Guénolé.",
      credit: 'Julien1978, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:%C3%89glise_Saint-Gu%C3%A9nol%C3%A9_de_Concarneau_(2).jpg',
    },
  ],
  videos: [],
  practical: [
    { icon: 'hike', title: 'Chemin de ronde', text: 'Près de 800 mètres de chemin de ronde sont accessibles sur les remparts.' },
    { icon: 'book', title: 'Musée de la Pêche', text: "Installé depuis 1961 dans l'ancien arsenal de la rue Vauban, au cœur de la Ville Close." },
  ],
  sources: [
    { label: 'Wikipédia : Ville close de Concarneau', url: 'https://fr.wikipedia.org/wiki/Ville_close_de_Concarneau' },
  ],
  pois: [],
};
