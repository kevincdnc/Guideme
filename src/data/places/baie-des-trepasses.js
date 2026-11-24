// Fiche : Baie des Trépassés
import { C } from './media.js';

export default {
  id: 'baie-des-trepasses',
  available: true,
  icon: 'beach',
  tags: ['nature', 'plage', 'legende'],
  title: 'Baie des Trépassés',
  shortTitle: 'Baie des Trépassés',
  commune: 'Plogoff & Cléden-Cap-Sizun',
  coords: [-4.714851, 48.048136],
  category: 'Plage · Légendes',
  labels: ['Grand Site de France', 'Spot de surf'],
  teaser:
    "Une longue plage blottie entre la pointe du Raz et la pointe du Van, au nom chargé de légendes : naufragés, âmes en peine… ou simple erreur de traduction ?",
  hero: {
    src: `${C}/thumb/3/36/Aerial_image_of_Baie_des_Tr%C3%A9pass%C3%A9s_%28view_from_the_southeast%29.jpg/1280px-Aerial_image_of_Baie_des_Tr%C3%A9pass%C3%A9s_%28view_from_the_southeast%29.jpg`,
    alt: 'La baie des Trépassés vue du ciel, entre la pointe du Raz et la pointe du Van',
    credit: 'Carsten Steger, CC BY-SA 4.0, Wikimedia Commons',
  },
  facts: [
    { value: '290 Ma', label: 'âge du fossé qui a creusé la baie' },
    { value: '1794', label: 'premier récit, par Jacques Cambry' },
    { value: '70-80 m', label: 'hauteur des pointes qui l\'encadrent' },
    { value: '1968', label: 'roman « La Baie des Trépassés » de Catherine Arley' },
  ],
  funFact: { title: 'Un nom né d\'une faute de traduction ?', text: 'La légende dit que les courants y rejetaient les corps des naufragés. Mais le cadastre ancien parle de Bae an Avon, « la baie de la source » : elle serait devenue Bae an Anaon, « la baie des âmes ».' },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "La baie des Trépassés est la longue plage de sable qui relie la pointe du Raz, au sud, à la pointe du Van, au nord. Elle s'ouvre plein ouest sur l'Atlantique, partagée entre les communes de Plogoff et de Cléden-Cap-Sizun, et fait partie du Grand Site de France de la pointe du Raz en Cap Sizun.",
        "Si la côte s'abaisse ici, c'est que la baie occupe un fossé tectonique vieux d'environ 290 millions d'années. Les roches tendres qui le remplissent ont été déblayées par l'érosion, tandis que les deux pointes, plus dures, forment de part et d'autre des plateaux de 70 à 80 mètres de haut. Derrière la plage, un petit fleuve côtier et l'étang de Laoual rappellent que l'eau douce rejoint ici la mer.",
        "Exposée au vent et à une houle souvent déferlante, la baie est aujourd'hui l'un des spots de surf les plus réputés de Bretagne.",
      ],
    },
    {
      id: 'nom',
      nav: 'Le nom',
      title: 'Trépassés, âmes… ou source ?',
      paragraphs: [
        "En breton, on l'appelle Bae an Anaon, « la baie des âmes ». Une légende raconte que les corps des naufragés du raz de Sein venaient s'y échouer, poussés par les courants et les vents d'ouest. D'autres y voient la trace de naufrageurs, ou le lieu d'où les druides morts embarquaient pour leur dernier voyage vers l'île de Sein.",
        "L'explication la plus sérieuse est pourtant bien plus prosaïque. Le cadastre ancien parle de Bae an Avon, « la baie de la source » : un petit fleuve côtier s'y jette bel et bien. Une erreur de transcription, comme il en existe d'autres en Bretagne, aurait transformé la source en âmes, et les âmes en trépassés.",
      ],
    },
    {
      id: 'ecrivains',
      nav: 'Écrivains',
      title: 'Ce qu\'en ont dit les écrivains',
      paragraphs: [
        "En 1794, Jacques Cambry écrit dans son Voyage dans le Finistère que « le plus intrépide matelot ne passe jamais, sans implorer la pitié du Très-Haut, devant la baye des Trépassés », et compare le lieu aux tourbillons de Charybde et Scylla.",
        "Le poète Auguste Brizeux va plus loin encore : il décrit une baie « blanche comme la craie », dont « le sable pâle est fait des ossements broyés ». Et en 1896, Anatole Le Braz évoque l'hiver, l'« infinie solitude » de cette baie des Âmes, où la mer tantôt éclate en sanglots, tantôt se traîne en longs gémissements.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        {
          title: 'Le chant des âmes, la nuit de Noël',
          text: "Selon une croyance bretonne, la nuit de Noël, la baie résonnerait des chants des âmes en peine, ballottées sur le bateau des morts.",
        },
        {
          title: 'Johnny et Sylvie à la Ville d\'Ys',
          text: "Deux hôtels se partagent la baie. L'un d'eux, l'hôtel de la Ville d'Ys, aujourd'hui Relais de la pointe du Van, a accueilli plusieurs fois Johnny Hallyday et Sylvie Vartan dans les années 1960.",
        },
        {
          title: 'Un polar au bout du monde',
          text: "En 1968, la romancière Catherine Arley situe ici un roman à suspense, La Baie des Trépassés, succès traduit en plusieurs langues.",
        },
        {
          title: 'Une baie qui n\'a pas toujours été là',
          text: "Les sédiments du fossé, parfois tourbeux ou charbonneux, sont d'anciens dépôts continentaux redressés par les grands mouvements de l'écorce terrestre. La baie est l'un des sites d'intérêt géologique de Bretagne.",
        },
      ],
    },
  ],
  timeline: [],
  archives: [
    {
      year: '1899',
      src: `${C}/thumb/e/e5/La_Baie_des_Tr%C3%A9pass%C3%A9s_1899.jpg/500px-La_Baie_des_Tr%C3%A9pass%C3%A9s_1899.jpg`,
      caption: 'La baie des Trépassés en 1899.',
      credit: 'Louis Rousselet, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:La_Baie_des_Tr%C3%A9pass%C3%A9s_1899.jpg',
    },
    {
      year: 'v. 1910',
      src: `${C}/thumb/c/c1/Baie_des_Tr%C3%A9pass%C3%A9s_ND_Photo.jpg/500px-Baie_des_Tr%C3%A9pass%C3%A9s_ND_Photo.jpg`,
      caption: 'Petites gardeuses de vaches au-dessus de la baie. Carte postale.',
      credit: 'Neurdein (ND Photo), domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Baie_des_Tr%C3%A9pass%C3%A9s_ND_Photo.jpg',
    },
  ],
  photos: [
    {
      src: `${C}/thumb/f/f7/038_Baie_des_Tr%C3%A9pass%C3%A9s_et_l%27%C3%A9tang_de_Laoual.JPG/1280px-038_Baie_des_Tr%C3%A9pass%C3%A9s_et_l%27%C3%A9tang_de_Laoual.JPG`,
      caption: 'La baie et l\'étang de Laoual, la pointe du Van à l\'arrière-plan.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:038_Baie_des_Tr%C3%A9pass%C3%A9s_et_l%27%C3%A9tang_de_Laoual.JPG',
    },
    {
      src: `${C}/thumb/b/bb/303_Baie_des_Tr%C3%A9pass%C3%A9s_vue_du_nord.JPG/1280px-303_Baie_des_Tr%C3%A9pass%C3%A9s_vue_du_nord.JPG`,
      caption: 'La baie vue du nord, la presqu\'île de la pointe du Raz au fond.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:303_Baie_des_Tr%C3%A9pass%C3%A9s_vue_du_nord.JPG',
    },
  ],
  videos: [],
  practical: [
    { icon: 'hike', title: 'À pied', text: 'Le GR34 descend de la pointe du Raz jusqu\'à la plage, puis remonte vers la pointe du Van et la chapelle Saint-They.' },
    { icon: 'warn', title: 'Baignade', text: 'Plage exposée à la houle d\'ouest et aux courants : renseignez-vous sur place avant de vous baigner.' },
  ],
  sources: [
    { label: 'Wikipédia : Baie des Trépassés', url: 'https://fr.wikipedia.org/wiki/Baie_des_Tr%C3%A9pass%C3%A9s' },
  ],
  pois: [
  ],
};
