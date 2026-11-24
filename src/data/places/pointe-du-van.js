// Fiche : Pointe du Van & chapelle Saint-They
import { C } from './media.js';

export default {
  id: 'pointe-du-van',
  available: true,
  icon: 'cliff',
  tags: ['nature', 'histoire', 'legende'],
  title: 'Pointe du Van & chapelle Saint-They',
  shortTitle: 'Pointe du Van',
  commune: 'Cléden-Cap-Sizun',
  coords: [-4.7149822, 48.064501],
  category: 'Site naturel · Chapelle',
  labels: ['Grand Site de France', 'Chapelle monument historique'],
  teaser:
    "La sœur sauvage de la pointe du Raz : une pointe sans vraie pointe, et une petite chapelle au bord de la falaise dont la cloche, dit-on, sonne toute seule.",
  hero: {
    src: `${C}/thumb/1/1a/Aerial_image_of_Pointe_du_Van_%28view_from_the_east%29.jpg/1280px-Aerial_image_of_Pointe_du_Van_%28view_from_the_east%29.jpg`,
    alt: 'La pointe du Van vue du ciel, ses avancées rocheuses et la lande',
    credit: 'Carsten Steger, CC BY-SA 4.0, Wikimedia Commons',
  },
  facts: [
    { value: 'XVIIe s.', label: 'construction de la chapelle Saint-They' },
    { value: '1914', label: 'chapelle classée monument historique' },
    { value: '1924', label: 'le cargo Trane coule au large' },
    { value: '2013', label: 'la foudre abat trois clochetons' },
  ],
  records: [
    { medal: 'or', scope: 'Cap Sizun', title: 'La plus vaste chapelle de Cléden', text: 'La chapelle Saint-They, au bord de la falaise.' },
  ],
  funFact: { title: 'La cloche qui sonne toute seule', text: 'On prétend que la cloche de la chapelle Saint-They sonne d\'elle-même pour avertir les bateaux du danger.' },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "La pointe du Van, Beg ar Vann en breton, est l'extrémité ouest de la commune de Cléden-Cap-Sizun. Elle ferme au nord la baie des Trépassés, que la pointe du Raz ferme au sud. Moins fréquentée que sa voisine, elle est souvent préférée pour son aspect plus naturel, et fait partie du même Grand Site de France.",
        "Sa roche, plus friable que celle de la pointe du Raz, résiste moins bien aux assauts de la mer. Résultat : cette pointe n'en a que le nom. Elle s'évase en nombreuses avancées rocheuses, au point qu'on a du mal à en trouver l'extrémité. Quelques rochers monumentaux s'en détachent, dont le fameux rocher Morgane, à l'ouest de la chapelle.",
      ],
    },
    {
      id: 'chapelle',
      nav: 'La chapelle',
      title: 'Saint-They, au bord du vide',
      paragraphs: [
        "Entre la baie des Trépassés et la pointe, la chapelle Saint-They, la plus vaste des chapelles de Cléden, surplombe le raz de Sein au bord de la falaise. Elle a été bâtie au XVIIe siècle à la place d'une chapelle plus ancienne qui tombait en ruine. Elle est dédiée à saint They, un saint peu connu qui aurait été disciple de saint Guénolé à l'abbaye de Landévennec.",
        "Autour, le mur de l'enclos et une croix monumentale tronquée de 1772, ornée de deux statues de saint Jacques. À l'intérieur, un maître-autel en bois sculpté et un Christ en albâtre, protégé dans une vitrine. Un peu plus loin vers la baie, une fontaine de dévotion du XVIIe siècle.",
        "Un vieux cantique breton résume l'attachement des habitants à ce lieu : « Que demeure longtemps encore debout la petite chapelle au bord de la mer, afin que saint They, depuis sa porte, puisse voir les bateaux passer. » Depuis 1997, la commune et l'association Sant They Ar Van la restaurent pas à pas.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        {
          title: 'La cloche qui sonne toute seule',
          text: "On prétend que la cloche de la chapelle sonne d'elle-même pour avertir les bateaux d'un danger, et les inviter à se placer sous la protection du saint.",
        },
        {
          title: 'Quand Sein et Cléden se donnaient l\'accolade',
          text: "Au grand pardon de juillet, le seul qui subsiste, la procession de l'île de Sein débarquait au Vorlen et retrouvait celle de Cléden le long de la falaise. Les deux croix se donnaient l'accolade, puis tout le monde revenait ensemble à la chapelle. À la nuit tombée, la foule campait autour.",
        },
        {
          title: 'Foudroyée en 2013',
          text: "Le 1er octobre 2013, peu avant 13 h 15, la foudre frappe la chapelle. Trois des cinq clochetons du clocher tombent au sol ; ils sont mis à l'abri à l'intérieur en attendant leur restauration.",
        },
        {
          title: 'Le cargo englouti sur une dune de maërl',
          text: "Le 15 mai 1924, pris dans la brume, le cargo norvégien Trane heurte les rochers près de l'île de Sein. Remorqué par le baliseur Léon-Bourdelles puis par le remorqueur Puissant, il coule à mi-chemin entre la pointe du Van et le phare de Tévennec, sur une grande dune de maërl.",
        },
        {
          title: 'L\'Arche de la Paix',
          text: "En novembre 1925, le naufrage de l'Arche de la Paix, un bateau de Douarnenez, à la pointe du Van, fait huit victimes et laisse dix orphelins.",
        },
        {
          title: 'Un décor de cinéma',
          text: "La chapelle Saint-They a servi de décor au film Qui a envie d'être aimé ?, d'Anne Giafferi, sorti en 2011.",
        },
      ],
    },
  ],
  timeline: [
    { year: 'XVIIe', text: 'Construction de la chapelle Saint-They et de sa fontaine de dévotion.' },
    { year: '1772', text: 'Croix monumentale de l\'enclos.' },
    { year: '1914', text: 'La chapelle est classée monument historique.' },
    { year: '1924', text: 'Naufrage du cargo norvégien Trane au large de la pointe.' },
    { year: '1925', text: 'Naufrage de l\'Arche de la Paix : huit victimes.' },
    { year: '1997', text: 'Début de la restauration de la chapelle.' },
    { year: '2013', text: 'La foudre abat trois clochetons.' },
  ],
  archives: [],
  photos: [
    {
      src: `${C}/thumb/7/7c/Chapelle_Saint_They.jpg/1280px-Chapelle_Saint_They.jpg`,
      caption: 'La chapelle Saint-They au bord de la falaise, face au raz de Sein.',
      credit: 'Berrucomons, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Chapelle_Saint_They.jpg',
    },
    {
      src: `${C}/thumb/9/9f/248_Cl%C3%A9den-Cap-Sizun_Chapelle_Saint-They.jpg/1280px-248_Cl%C3%A9den-Cap-Sizun_Chapelle_Saint-They.jpg`,
      caption: 'La chapelle et son enclos.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:248_Cl%C3%A9den-Cap-Sizun_Chapelle_Saint-They.jpg',
    },
    {
      src: `${C}/thumb/2/29/251_Cl%C3%A9den-Cap-Sizun_Chapelle_Saint-They.jpg/1280px-251_Cl%C3%A9den-Cap-Sizun_Chapelle_Saint-They.jpg`,
      caption: "À l'intérieur, une bouée de sauvetage offerte en ex-voto sur un autel latéral.",
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:251_Cl%C3%A9den-Cap-Sizun_Chapelle_Saint-They.jpg',
    },
    {
      src: `${C}/thumb/3/33/BiacheB_PointeVan_DSC7989_DSC7992.jpg/1280px-BiacheB_PointeVan_DSC7989_DSC7992.jpg`,
      caption: 'Le bout de la pointe du Van : une pointe sans vraie pointe.',
      credit: 'BiacheB, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:BiacheB_PointeVan_DSC7989_DSC7992.jpg',
    },
    {
      src: `${C}/thumb/f/fc/PaysBigoud-Pointe-du-Van.jpg/1280px-PaysBigoud-Pointe-du-Van.jpg`,
      caption: 'La pointe du Van, la baie des Trépassés et la chapelle Saint-They.',
      credit: 'Rundvald, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:PaysBigoud-Pointe-du-Van.jpg',
    },
  ],
  videos: [],
  practical: [
    { icon: 'hike', title: 'À pied', text: 'Le GR34 relie la chapelle Saint-They à la baie des Trépassés et, au-delà, à la pointe du Raz.' },
    { icon: 'warn', title: 'Sécurité', text: 'Falaises friables : restez sur les sentiers et à distance du bord.' },
  ],
  sources: [
    { label: 'Wikipédia : Pointe du Van', url: 'https://fr.wikipedia.org/wiki/Pointe_du_Van' },
    { label: 'Wikipédia : Chapelle Saint-They', url: 'https://fr.wikipedia.org/wiki/Chapelle_Saint-They' },
  ],
  pois: [
    { name: 'Chapelle Saint-They', coords: [-4.712046, 48.060158] },
  ],
};
