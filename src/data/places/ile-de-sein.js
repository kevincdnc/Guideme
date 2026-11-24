// Fiche : Île de Sein
import { C } from './media.js';

export default {
  id: 'ile-de-sein',
  available: true,
  icon: 'port',
  tags: ['nature', 'histoire', 'legende'],
  title: 'Île de Sein, l\'île au ras de l\'eau',
  shortTitle: 'Île de Sein',
  commune: 'Île-de-Sein · Enez-Sun',
  coords: [-4.85, 48.03333333],
  category: 'Île · Histoire',
  labels: ['Île sans voiture', 'Croix de la Libération'],
  teaser:
    "Deux kilomètres de terre à 1,5 mètre au-dessus de la mer, des marins qui ont rallié de Gaulle dès juin 1940, et un film de 1958 tourné au péril de la vie de ses auteurs.",
  hero: {
    src: `${C}/thumb/9/9d/Aerial_image_of_%C3%8Ele-de-Sein_%28view_from_the_southeast%29.jpg/1280px-Aerial_image_of_%C3%8Ele-de-Sein_%28view_from_the_southeast%29.jpg`,
    alt: 'L\'île de Sein vue du ciel, étroite et plate au milieu des récifs',
    credit: 'Carsten Steger, CC BY-SA 4.0, Wikimedia Commons',
  },
  facts: [
    { value: '1,5 m', label: 'altitude moyenne de l\'île' },
    { value: '7,2 km', label: 'de la pointe du Raz' },
    { value: '128', label: 'îliens partis en Angleterre fin juin 1940' },
    { value: '1958', label: 'tournage de « La Mer et les Jours »' },
  ],
  film: {
    title: 'La Mer et les Jours',
    year: '1958',
    embed: 'https://player.vimeo.com/video/187300715?title=0&byline=0&portrait=0',
    page: 'https://vimeo.com/187300715',
    details: [
      { label: 'Réalisation', value: 'Raymond Vogel et Alain Kaminker' },
      { label: 'Année', value: '1958' },
      { label: 'Format', value: '16 mm, noir et blanc, sonore' },
      { label: 'Durée', value: '21 min 59 s' },
      { label: 'Source', value: 'Cinémathèque de Bretagne' },
    ],
    summary: [
      "Une journée à l'île de Sein : le travail des hommes en mer, celui des femmes et des enfants sur l'île. Raymond Vogel et son assistant Alain Kaminker, frère de l'actrice Simone Signoret, voulaient montrer la dure vie des îliens, et pour cela partager leur quotidien. Après quelques réticences, ils furent acceptés et accueillis dans tous les foyers.",
      "Ils participèrent à un sauvetage en mer et à la relève des gardiens de phare par gros temps. Un naufrage réel a été filmé pendant le tournage. Puis vint le drame : pris par le mal de mer, Alain Kaminker refusa de rentrer, s'entêta, et fut emporté par une lame de fond.",
    ],
  },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "L'île de Sein, Enez-Sun en breton, s'étire sur 1,8 kilomètre à 7,2 kilomètres à l'ouest de la pointe du Raz, de l'autre côté du raz de Sein. Elle dessine un S inversé large de 30 à 800 mètres, pour une superficie d'à peine 0,56 kilomètre carré.",
        "Son point culminant, le rocher du Kador, ne dépasse pas 15 mètres, et son altitude moyenne est d'un mètre et demi. L'île émerge à peine et la mer la submerge régulièrement : en 1919, lors d'une tempête mémorable, les vagues l'ont recouverte entièrement. Les maisons se serrent donc autour du port, et les ruelles étroites s'entremêlent pour que s'y perdent le vent et les embruns.",
        "Il n'y a pas de voiture sur l'île. On y vient en bateau depuis Audierne, au port de Sainte-Evette, en une heure environ.",
      ],
    },
    {
      id: 'histoire',
      nav: '1940',
      title: '« Le quart de la France »',
      paragraphs: [
        "Le 22 juin 1940, les Sénans rassemblés autour d'un poste de radio entendent l'appel du général de Gaulle, rediffusé par la BBC. Le soir même, deux bateaux quittent l'île avec 90 personnes, dont 57 îliens. Le 26 juin, trois bateaux de pêche emmènent 57 autres îliens. Fin juin 1940, 128 hommes de Sein sont en Angleterre et s'engagent dans les Forces navales françaises libres.",
        "Le 6 juillet, en passant en revue ses premiers volontaires à Londres, de Gaulle est frappé par le nombre de Sénans. Il aurait dit : « L'île de Sein est donc le quart de la France ! » Au total, 133 îliens rejoindront l'Angleterre ; 18 d'entre eux mourront au combat.",
        "Sein est la commune de France la plus décorée au titre de la Seconde Guerre mondiale : croix de la Libération, croix de guerre 1939-1945 et médaille de la Résistance. C'est aussi la seule commune à avoir perdu plus de soldats pendant la Seconde Guerre mondiale que pendant la Première.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        {
          title: '« Qui voit Sein voit sa fin »',
          text: "Ce dicton de marins rappelle les récifs qui entourent l'île. Depuis 2017, le sauvetage y est assuré par le canot tous temps Yves et François Olivaux : Sein a été la première station de France à recevoir ce nouveau modèle.",
        },
        {
          title: 'Neuf prêtresses et un oracle',
          text: "Au Ier siècle, le géographe romain Pomponius Mela parle de Sena, célèbre pour l'oracle d'une divinité gauloise servi par neuf prêtresses. On leur prêtait le pouvoir de prophétiser, d'évoquer les morts et de déchaîner les vagues et les vents.",
        },
        {
          title: 'Un mur de 7 000 ans sous la mer',
          text: "Au large de l'île, par neuf mètres de fond, des archéologues ont étudié entre 2022 et 2024 onze structures de granit construites quand la mer était plus basse, entre 5800 et 5300 avant notre ère. La plus grande est un mur de 120 mètres ; certaines semblent être des barrages à poissons.",
        },
        {
          title: 'Les Causeurs',
          text: "Sur la place de l'église, deux menhirs classés monuments historiques, surnommés les Causeurs, se dressent toujours au milieu des maisons.",
        },
        {
          title: 'Un canot baptisé par le maire de Paris',
          text: "Le canot de sauvetage précédent, le Ville de Paris, mis en service en 1980, avait été financé par la capitale : Jacques Chirac, alors maire de Paris, est venu en personne assister à son baptême.",
        },
        {
          title: 'Les sirènes de Sein',
          text: "La légende veut que des Marie Morgane, les sirènes bretonnes, aient vécu dans les eaux de l'île.",
        },
      ],
    },
  ],
  timeline: [
    { year: '−5500', text: 'Barrages et murs de granit, aujourd\'hui sous 9 m d\'eau.' },
    { year: 'Ier s.', text: 'Pomponius Mela évoque l\'oracle de « Sena ».' },
    { year: '1919', text: 'Une tempête submerge toute l\'île.' },
    { year: '1940', text: '128 îliens rejoignent de Gaulle en Angleterre.' },
    { year: '1944', text: 'Les Allemands quittent l\'île le 4 août, après avoir détruit le grand phare.' },
    { year: '1958', text: 'Tournage de « La Mer et les Jours » ; Alain Kaminker y perd la vie.' },
    { year: '1980', text: 'Baptême du canot de sauvetage Ville de Paris.' },
    { year: '2017', text: 'Arrivée du canot tous temps Yves et François Olivaux.' },
  ],
  archives: [
    {
      year: '1873',
      src: `${C}/a/a8/Sein_en_1873.jpg`,
      caption: "L'île de Sein en 1873. Photographie de J. Duclos (Gallica, BnF).",
      credit: 'J. Duclos, via Moreau.henri, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Sein_en_1873.jpg',
    },
    {
      year: '1880',
      src: `${C}/8/8a/Emile_Renouf_La_veuve_de_l%27%C3%8Ele_de_Sein.jpg`,
      caption: "« La veuve de l'île de Sein », tableau d'Émile Renouf.",
      credit: 'Émile Renouf, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Emile_Renouf_La_veuve_de_l%27%C3%8Ele_de_Sein.jpg',
    },
    {
      year: 'Coiffe',
      src: `${C}/9/9d/Coiffe_de_l%27%C3%AEle_de_Sein_%283%29-_mus%C3%A9e_de_Bretagne_-_986.0006.2.jpg`,
      caption: "Une coiffe de l'île de Sein, conservée au musée de Bretagne.",
      credit: 'Pierre Tressos, musée de Bretagne, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Coiffe_de_l%27%C3%AEle_de_Sein_(3)-_mus%C3%A9e_de_Bretagne_-_986.0006.2.jpg',
    },
  ],
  photos: [
    {
      src: `${C}/thumb/4/4c/SNS060_Ville_de_Paris.jpg/1280px-SNS060_Ville_de_Paris.jpg`,
      caption: 'Le canot tous temps Ville de Paris, en service de 1980 à 2017.',
      credit: 'Raphodon, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:SNS060_Ville_de_Paris.jpg',
    },
  ],
  videos: [],
  practical: [
    { icon: 'bus', title: 'Traversée', text: 'Compagnie Penn ar Bed toute l\'année depuis Audierne (Sainte-Evette), environ 1 h ; aussi depuis Douarnenez. Liaison d\'été avec Finist\'mer.' },
    { icon: 'hike', title: 'Sur place', text: 'Île sans voiture : tout se fait à pied, le long des ruelles et du sentier côtier.' },
    { icon: 'warn', title: 'Météo', text: 'Les traversées dépendent de la mer : vérifiez les horaires et les conditions avant de partir.' },
  ],
  sources: [
    { label: 'Wikipédia : Île de Sein', url: 'https://fr.wikipedia.org/wiki/%C3%8Ele_de_Sein' },
    { label: 'Cinémathèque de Bretagne : La Mer et les Jours (Vimeo)', url: 'https://vimeo.com/187300715' },
  ],
  pois: [],
};
