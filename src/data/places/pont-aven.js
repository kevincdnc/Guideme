// Fiche : Pont-Aven
import { C } from './media.js';

export default {
  id: 'pont-aven',
  available: true,
  icon: 'church',
  tags: ['histoire'],
  title: 'Pont-Aven, la cité des peintres',
  shortTitle: 'Pont-Aven',
  commune: 'Pont-Aven',
  coords: [-3.75, 47.85],
  category: 'Village · Art',
  labels: ['Cité des peintres', 'Musée des beaux-arts'],
  teaser:
    "Un village de meuniers parmi les plus pauvres de France, découvert par hasard par un peintre américain, où Gauguin inventa une nouvelle peinture… et où un boulanger inventa la galette.",
  hero: {
    src: `${C}/thumb/5/52/Aven-Pont-Aven.jpg/1280px-Aven-Pont-Aven.jpg`,
    alt: "Un vieux gréement au mouillage sur l'Aven, près de Pont-Aven",
    credit: 'Rundvald, domaine public, Wikimedia Commons',
  },
  facts: [
    { value: '1886', label: 'premier séjour de Paul Gauguin' },
    { value: '14', label: 'moulins, selon le vieux dicton' },
    { value: '1890', label: 'naissance de la galette de Pont-Aven' },
    { value: '40', label: 'hôtels, auberges et cafés en 1900' },
  ],
  records: [
    { medal: 'bronze', scope: 'France', title: '« La population la plus pauvre de France »', text: 'Selon Madame de La Villemarqué, vers 1860.' },
  ],
  funFact: { title: 'Couvre-feu pour les peintres', text: 'En 1883, la colonie d\'artistes fait tant de bruit que la ville interdit les débits de boisson après 22 heures.' },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Pont-Aven s'est construit sur l'Aven, la « rivière » en vieux breton, là où elle rencontre la marée. Le vieux dicton disait : « Pont-Aven, ville de renom, quatorze moulins, quinze maisons ». À la fin du XIXe siècle, les moulins du Plessis, David, Rosmadec ou Simonou tournent encore le long de la rivière.",
        "On la surnomme la « cité des peintres » : Paul Gauguin, Émile Bernard et des dizaines d'artistes venus d'Amérique, d'Angleterre ou d'Europe du Nord y ont séjourné. Le musée des beaux-arts, ouvert en 1985 et agrandi en 2016, réunit aujourd'hui 4 500 œuvres.",
      ],
    },
    {
      id: 'peintres',
      nav: 'Les peintres',
      title: 'Du « petit trou pas cher » à Gauguin',
      paragraphs: [
        "Vers 1860, Pont-Aven passe pour l'une des communes les plus pauvres de France. En juillet 1864, un jeune peintre américain, Henry Bacon, voyage en diligence vers Quimperlé : la voiture fait halte à Pont-Aven et il tombe sous le charme du « plus joli village de France » qu'il ait vu. De retour à Paris, il en parle à ses amis.",
        "Les artistes affluent. Vers 1870, la colonie compte déjà une cinquantaine de membres. Les habitants, en costume traditionnel, acceptent de poser pour peu d'argent, et le village ouvre ateliers et boutiques de matériel. Vers 1880, Pont-Aven est devenu le « nouveau Barbizon ».",
        "À l'été 1886, Paul Gauguin, à court d'argent, s'installe à la pension Gloanec. En 1888, Émile Bernard peint Bretonnes dans la prairie verte, et Gauguin La Vision après le sermon : ces tableaux jettent les bases du synthétisme, le courant qu'on appellera plus tard l'École de Pont-Aven. En 1889, Gauguin y peint Le Christ jaune et La Belle Angèle, avant de rejoindre Le Pouldu, puis Tahiti.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        {
          title: 'Couvre-feu pour les peintres',
          text: "En 1883, la colonie d'artistes fait tant de bruit que la municipalité doit interdire les débits de boisson après 22 heures.",
        },
        {
          title: 'La galette, née par accident',
          text: "Vers 1890, le boulanger Isidore Penven aurait inventé par accident la recette des galettes de Pont-Aven. Sa veuve épouse un autre boulanger, inventeur des palets, et ensemble ils créent la marque Traou Mad, « les bonnes choses ». En 1952, le fils d'Isidore ouvre sa propre biscuiterie… juste à côté.",
        },
        {
          title: 'Des perles dans la rivière',
          text: "Au XIXe siècle, le lit de l'Aven était comme « pavé » de mulettes perlières, des moules d'eau douce qui renferment parfois de jolies perles. Un pêcheur pouvait en ramasser huit à dix mille par an : une véritable destruction.",
        },
        {
          title: 'Mademoiselle Julia',
          text: "En 1873, Julia Guillou rachète l'Hôtel des Voyageurs sur la grand-place. Rebaptisé hôtel Julia, il accueille des générations de peintres. Son annexe, la villa Julia, construite en 1881, abrite aujourd'hui le musée des beaux-arts.",
        },
        {
          title: '« Hâtez-vous d\'aller à Pont-Aven »',
          text: "Le poète François Coppée prévenait déjà : « Amateurs de voyages paisibles, hâtez-vous d'aller à Pont-Aven car, avant peu, les peintres et les touristes auront rendu l'endroit inhabitable. »",
        },
      ],
    },
  ],
  timeline: [
    { year: '1864', text: 'Le peintre américain Henry Bacon découvre Pont-Aven par hasard.' },
    { year: 'v. 1870', text: 'La colonie d\'artistes compte une cinquantaine de membres.' },
    { year: '1873', text: 'Julia Guillou rachète l\'hôtel qui portera son nom.' },
    { year: '1883', text: 'Les débits de boisson doivent fermer à 22 heures.' },
    { year: '1886', text: 'Premier séjour de Paul Gauguin, à la pension Gloanec.' },
    { year: '1888', text: 'Naissance du synthétisme, avec Émile Bernard et Gauguin.' },
    { year: 'v. 1890', text: 'Isidore Penven invente la galette de Pont-Aven.' },
    { year: '1895', text: 'Gauguin quitte définitivement la France.' },
    { year: '1985', text: 'Ouverture du musée des beaux-arts.' },
    { year: '2016', text: 'Réouverture du musée, agrandi, le 26 mars.' },
  ],
  archives: [
    {
      year: '1888',
      src: `${C}/thumb/5/56/La_vision_apr%C3%A8s_le_sermon_%28Paul_Gauguin%29.jpg/1280px-La_vision_apr%C3%A8s_le_sermon_%28Paul_Gauguin%29.jpg`,
      caption: '« La Vision après le sermon », Paul Gauguin (National Gallery of Scotland).',
      credit: 'Paul Gauguin, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:La_vision_apr%C3%A8s_le_sermon_(Paul_Gauguin).jpg',
    },
    {
      year: '1888',
      src: `${C}/thumb/2/23/Paul_Gauguin_-_Paysage_de_Bretagne_%281888%29.jpg/1280px-Paul_Gauguin_-_Paysage_de_Bretagne_%281888%29.jpg`,
      caption: '« Paysage de Bretagne », Paul Gauguin.',
      credit: 'Paul Gauguin, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Paul_Gauguin_-_Paysage_de_Bretagne_(1888).jpg',
    },
    {
      year: 'v. 1893',
      src: `${C}/thumb/1/1b/210_Maxime_Maufra_Vue_du_port_de_Pont-Aven.jpg/1280px-210_Maxime_Maufra_Vue_du_port_de_Pont-Aven.jpg`,
      caption: "« Vue du port de Pont-Aven », Maxime Maufra : on y répare la coque d'un chasse-marée échoué.",
      credit: 'Maxime Maufra, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:210_Maxime_Maufra_Vue_du_port_de_Pont-Aven.jpg',
    },
    {
      year: '1894',
      src: `${C}/thumb/e/ef/Coucher_de_soleil_sur_Pont-Aven.jpg/1280px-Coucher_de_soleil_sur_Pont-Aven.jpg`,
      caption: '« Coucher de soleil sur Pont-Aven », Henri Lebasque.',
      credit: 'Henri Lebasque, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Coucher_de_soleil_sur_Pont-Aven.jpg',
    },
    {
      year: 'v. 1900',
      src: `${C}/thumb/5/53/295_Les_laveuses_sur_l%27Aven.jpg/1280px-295_Les_laveuses_sur_l%27Aven.jpg`,
      caption: "Les laveuses sur l'Aven.",
      credit: 'Joseph-Marie Villard, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:295_Les_laveuses_sur_l%27Aven.jpg',
    },
    {
      year: 'v. 1900',
      src: `${C}/thumb/a/a3/Le_port_de_Pont-Aven_-_Carte_postale.jpg/960px-Le_port_de_Pont-Aven_-_Carte_postale.jpg`,
      caption: 'Vue panoramique du port. Carte postale.',
      credit: 'Auteur inconnu, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Le_port_de_Pont-Aven_-_Carte_postale.jpg',
    },
    {
      year: '1910',
      src: `${C}/thumb/4/46/301_Pont-Aven_Salle_%C3%A0_manger_de_l%27h%C3%B4tel_Julia.jpg/1280px-301_Pont-Aven_Salle_%C3%A0_manger_de_l%27h%C3%B4tel_Julia.jpg`,
      caption: "La salle à manger de l'hôtel Julia.",
      credit: 'Henri Laurent, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:301_Pont-Aven_Salle_%C3%A0_manger_de_l%27h%C3%B4tel_Julia.jpg',
    },
  ],
  photos: [
    {
      src: `${C}/thumb/1/1b/Chapelle-de-Tr%C3%A9malo-Pont-Aven-03.jpg/1280px-Chapelle-de-Tr%C3%A9malo-Pont-Aven-03.jpg`,
      caption: 'La chapelle Notre-Dame de Trémalo.',
      credit: 'Rundvald, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Chapelle-de-Tr%C3%A9malo-Pont-Aven-03.jpg',
    },
    {
      src: `${C}/thumb/3/30/Christ_jaune_de_la_Chapelle_Notre-Dame_de_Tr%C3%A9malo%2C_Pont-Aven.jpg/1280px-Christ_jaune_de_la_Chapelle_Notre-Dame_de_Tr%C3%A9malo%2C_Pont-Aven.jpg`,
      caption: 'Le Christ en croix de la chapelle de Trémalo, classé monument historique.',
      credit: 'Pierre André Leclercq, CC BY 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Christ_jaune_de_la_Chapelle_Notre-Dame_de_Tr%C3%A9malo,_Pont-Aven.jpg',
    },
    {
      src: `${C}/thumb/d/d5/Jachthaven_van_Pont-Aven.jpg/1280px-Jachthaven_van_Pont-Aven.jpg`,
      caption: 'Le port de Pont-Aven aujourd\'hui.',
      credit: 'Renegade, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Jachthaven_van_Pont-Aven.jpg',
    },
  ],
  videos: [],
  practical: [
    { icon: 'book', title: 'Musée', text: 'Le musée des beaux-arts de Pont-Aven présente l\'École de Pont-Aven et l\'art jusqu\'à aujourd\'hui.' },
    { icon: 'hike', title: 'Promenade', text: 'Les moulins et les maisons anciennes se découvrent à pied, rue des Meunières et le long de l\'Aven.' },
  ],
  sources: [
    { label: 'Wikipédia : Pont-Aven', url: 'https://fr.wikipedia.org/wiki/Pont-Aven' },
  ],
  pois: [],
};
