// Fiche : Menez Dregan et les mégalithes de Plouhinec
import { C } from './media.js';

export default {
  id: 'menez-dregan',
  available: true,
  icon: 'fire',
  tags: ['prehistoire', 'histoire'],
  title: 'Menez Dregan, l\'un des plus vieux feux du monde',
  shortTitle: 'Menez Dregan',
  commune: 'Plouhinec',
  coords: [-4.475298, 47.986317],
  category: 'Site préhistorique',
  labels: ['Paléolithique inférieur', 'Dolmens classés'],
  teaser:
    "Dans une grotte marine effondrée, des hommes ont entretenu un feu il y a près d'un demi-million d'années. Une des plus anciennes traces de feu maîtrisé connues au monde.",
  hero: {
    src: `${C}/thumb/0/04/463_Menez_Dregan.jpg/1280px-463_Menez_Dregan.jpg`,
    alt: 'Fouilles en cours dans la grotte effondrée de Menez Dregan, en 2015',
    credit: 'Moreau.henri, CC BY-SA 4.0, Wikimedia Commons',
  },
  facts: [
    { value: '465 000 ans', label: 'âge de la couche la plus ancienne' },
    { value: '1985', label: 'découverte du site' },
    { value: '150 000', label: 'objets inventoriés' },
    { value: '5', label: 'sites au monde aux foyers aussi anciens' },
  ],
  records: [
    { medal: 'or', scope: 'Monde', title: 'Parmi les plus anciennes traces de feu maîtrisé', text: 'Des indices de combustion vieux d\'environ 465 000 ans.' },
    { medal: 'argent', scope: 'Monde', title: 'L\'un des 5 sites au monde aux foyers aussi anciens', text: 'Avec Terra Amata, Bilzingsleben, Vértesszőlős et Zhoukoudian.' },
  ],
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Sur la côte de Plouhinec, près d'Audierne, Menez Dregan est une ancienne grotte marine dont le plafond s'est effondré par étapes. Ces effondrements successifs ont protégé du ressac les traces laissées par des groupes humains du Paléolithique inférieur, entre environ 500 000 et 200 000 ans avant nous.",
        "À l'époque, la mer était à cinq ou dix kilomètres : une grande partie de la baie d'Audierne était émergée et formait une plaine où vivaient de grands herbivores. Les hommes s'abritaient dans la grotte, y taillaient leurs outils et, surtout, y faisaient du feu.",
        "Découvert en 1985 par Bernard Hallégouët, le site a été fouillé chaque été de 1991 à 2020. En dehors des fouilles, une carapace de plaques métalliques le protégeait de l'érosion et des pilleurs. Un centre d'interprétation a ouvert en 2012 dans une maison restaurée tout près.",
      ],
    },
    {
      id: 'feu',
      nav: 'Le feu',
      title: 'Le feu des ancêtres',
      paragraphs: [
        "Ce qui rend Menez Dregan célèbre, ce sont ses foyers. Dans une couche, huit pierres disposées en cercle entourent du charbon de bois et des silex rougis par le feu. Dans une autre, six galets de quartz forment un arc autour d'une concentration de charbon. Des mesures magnétiques montrent qu'il s'agit d'un vrai foyer, où le feu était entretenu et contenu au même endroit. Il a été daté d'environ 370 000 à 400 000 ans.",
        "Plus bas encore, les couches les plus profondes, datées d'environ 465 000 ans, ont livré des indices de combustion qui pourraient être parmi les plus anciennes traces de feu maîtrisé par l'homme. Seuls quatre autres sites au monde ont des foyers aussi anciens : Terra Amata à Nice, Bilzingsleben en Allemagne, Vértesszőlős en Hongrie et Zhoukoudian en Chine.",
        "Les occupants taillaient sur place le silex et des galets de grès : éclats, racloirs, galets aménagés et quelques bifaces. Cet outillage appartient à un faciès régional propre au littoral sud de l'Armorique, baptisé Colombanien.",
      ],
    },
    {
      id: 'megalithes',
      nav: 'Mégalithes',
      title: 'Un sentier à travers la préhistoire',
      paragraphs: [
        "Menez Dregan n'est pas seul. Un sentier de découverte, le long du sentier côtier, le relie à deux autres sites bien plus récents, du Néolithique. À la pointe du Souc'h, une nécropole de sept dolmens, classée monument historique en 1979, a donné son nom à un type de poterie, le vase du Souc'h. Les dalles des dolmens sont de gros galets ramassés sur l'estran ; certains percuteurs retrouvés sur place pèsent jusqu'à 50 kilos.",
        "Plus à l'est, à Pors Poulhan, l'allée couverte de Menez Korriged aligne seize piliers sur deux rangs, qui portent des dalles de couverture.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        {
          title: 'De l\'ADN dans des os de 400 000 ans',
          text: "En Bretagne, les sols acides dissolvent presque toujours les os. Ici, des conditions chimiques exceptionnelles en ont conservé quelques-uns. Trop abîmés pour être identifiés à l'œil, ils ont parlé grâce à l'ADN : on y a reconnu des animaux de la famille des chevaux et des rhinocéros, et d'autres de celle des cerfs et des bovins.",
        },
        {
          title: 'Fouiller avec l\'eau de mer',
          text: "Pendant les fouilles, chaque objet était positionné au tachéomètre, et tous les sédiments étaient tamisés à l'eau de mer pour ne perdre aucun minuscule éclat de taille.",
        },
        {
          title: 'Un dolmen dynamité, puis reconstruit',
          text: "L'allée couverte de Menez Korriged, à Pors Poulhan, a été dynamitée par l'armée allemande pendant la Seconde Guerre mondiale. Elle a été restaurée en s'aidant de plans anciens, dont une lithographie du XIXe siècle.",
        },
        {
          title: 'La guérite des garde-côtes',
          text: "À la pointe du Souc'h, un petit corps de garde construit en 1747 permettait aux garde-côtes de surveiller les pirates et les navires anglais. Passé aux douanes en 1815 puis abandonné, il a été restauré en 1997 et 1998.",
        },
        {
          title: 'Sauvés par des pêcheurs',
          text: "Le 20 mars 1944, un bombardier abattu tombe au large de Plouhinec. Ses aviateurs sont sauvés par l'équipage du bateau de pêche L'Avant-Garde, parti de Pors Poulhan à leur secours.",
        },
      ],
    },
  ],
  timeline: [
    { year: '−465 000', text: 'Couche la plus ancienne, avec des indices de combustion.' },
    { year: '−400 000', text: 'Foyer de galets de quartz, où le feu était entretenu.' },
    { year: 'Néolithique', text: 'Dolmens de la pointe du Souc\'h et allée couverte de Menez Korriged.' },
    { year: '1747', text: 'Construction du corps de garde du Souc\'h.' },
    { year: '1979', text: 'La nécropole du Souc\'h est classée monument historique.' },
    { year: '1985', text: 'Bernard Hallégouët découvre le site de Menez Dregan.' },
    { year: '1991', text: 'Début des fouilles annuelles.' },
    { year: '2012', text: 'Ouverture du centre d\'interprétation.' },
    { year: '2020', text: 'Dernière campagne de fouilles, après 32 ans.' },
  ],
  archives: [

  ],
  photos: [
    {
      src: `${C}/thumb/a/a4/465_Menez_Dregan.jpg/1280px-465_Menez_Dregan.jpg`,
      caption: 'Les couches archéologiques en cours de fouille, en 2015.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:465_Menez_Dregan.jpg',
    },
    {
      src: `${C}/thumb/7/75/154_Mus%C3%A9e_pr%C3%A9histoire_Penmarc%27h.JPG/1280px-154_Mus%C3%A9e_pr%C3%A9histoire_Penmarc%27h.JPG`,
      caption: 'Moulage d\'un foyer de Menez Dregan, exposé au musée de préhistoire de Penmarc\'h.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:154_Mus%C3%A9e_pr%C3%A9histoire_Penmarc%27h.JPG',
    },
    {
      src: `${C}/thumb/4/47/163_Menez_Dregan.JPG/1280px-163_Menez_Dregan.JPG`,
      caption: 'Hors des fouilles, la grotte était couverte de tôles pour la protéger.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:163_Menez_Dregan.JPG',
    },
    {
      src: `${C}/thumb/0/00/206_Pors_Poulhan.jpg/1280px-206_Pors_Poulhan.jpg`,
      caption: 'La côte vers Pors Poulhan, avec la pointe du Souc\'h au premier plan.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:206_Pors_Poulhan.jpg',
    },
    {
      src: `${C}/thumb/7/7a/Corps_de_garde_de_la_pointe_du_Souc%27h_%28Plouhinec%29.JPG/1280px-Corps_de_garde_de_la_pointe_du_Souc%27h_%28Plouhinec%29.JPG`,
      caption: 'Le corps de garde de la pointe du Souc\'h, construit en 1747.',
      credit: 'Daieuxetdailleurs, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Corps_de_garde_de_la_pointe_du_Souc%27h_(Plouhinec).JPG',
    },
  ],
  videos: [],
  practical: [
    { icon: 'hike', title: 'Sentier de découverte', text: 'Un sentier le long du littoral relie Menez Dregan, la nécropole de la pointe du Souc\'h et l\'allée couverte de Pors Poulhan.' },
    { icon: 'book', title: 'Centre d\'interprétation', text: 'La maison de Menez Dregan présente le site et ses découvertes, tout près de la grotte.' },
    { icon: 'warn', title: 'Respect du site', text: 'Site archéologique fragile : restez sur les cheminements prévus.' },
  ],
  sources: [
    { label: 'Wikipédia : Menez Dregan', url: 'https://fr.wikipedia.org/wiki/Menez_Dregan' },
    { label: 'Wikipédia : Plouhinec (Finistère)', url: 'https://fr.wikipedia.org/wiki/Plouhinec_(Finist%C3%A8re)' },
  ],
  pois: [],
};
