// Fiche : Pointe du Raz (le phare de la Vieille a sa propre fiche)
import { C, T } from './media.js';

export default {
  id: 'pointe-du-raz',
  available: true,
  icon: 'cliff',
  tags: ['nature', 'histoire', 'legende'],
  title: 'Pointe du Raz, la proue du Finistère',
  shortTitle: 'Pointe du Raz',
  commune: 'Plogoff · Cap Sizun',
  coords: [-4.741111, 48.040278],
  category: 'Site naturel',
  labels: ['Grand Site de France', 'Site classé'],
  readingMinutes: 7,
  // Points cités dans la fiche, affichés sur la carte quand elle est ouverte
  pois: [
    { name: 'Phare de la Vieille', coords: [-4.75638889, 48.04055556] },
    { name: 'Phare de Tévennec', coords: [-4.79333, 48.06972] },
    { name: 'Notre-Dame des Naufragés', coords: [-4.73305556, 48.03888889] },
  ],
  protections: [{ type: 'grand-site', detail: "depuis 2004" }, { type: 'site-classe', detail: "1987" }],
  teaser:
    "Tu es au bout du bout : 72 mètres de granit face au raz de Sein, là où le courant file à sept nœuds. Ici, on a rasé des boutiques pour rendre la lande à la bruyère. Découvre pourquoi les marins y passent en retenant leur souffle.",
  hero: {
    src: `${C}/thumb/7/76/Pointe_du_Raz%2C_vue_de_la_baie_des_Tr%C3%A9pass%C3%A9s.jpg/1280px-Pointe_du_Raz%2C_vue_de_la_baie_des_Tr%C3%A9pass%C3%A9s.jpg`,
    alt: 'La pointe du Raz vue de la baie des Trépassés',
    credit: 'Wikimedia Commons',
  },
  facts: [
    { value: '72 m', label: 'hauteur de la proue de granit' },
    { value: '7 nœuds', label: 'courant du raz en grande marée', info: 'Au flot ; environ 6 nœuds au jusant. Les marins attendent l\'étale pour passer.' },
    { value: '2004', label: 'label Grand Site de France', info: 'Le site est classé depuis 1987.' },
    { value: '1 million', label: 'de visiteurs par an' },
  ],
  records: [
    { medal: 'or', scope: 'Navigation', title: 'La route la plus courte entre l\'Atlantique et la Manche', text: 'Le raz de Sein, et aussi l\'une des plus dangereuses.' },
    { medal: 'argent', scope: 'Randonnée', title: 'Départ du sentier européen E5', text: 'Jusqu\'à Venise, 3 050 km plus loin.' },
  ],
  funFact: { title: 'Un parking en forme de piste d\'aviation', text: 'En 1962, quatorze boutiques et un parking de deux hectares en bitume rouge s\'installent contre le sémaphore. Tout est rasé en 1996-1997 : le parking est déplacé à 800 mètres, et la bruyère a repoussé.' },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "La pointe du Raz, Beg ar Raz en breton, est l'extrémité ouest du cap Sizun. Ce promontoire de granit, haut de soixante-douze mètres, domine le raz de Sein : un passage d'environ huit kilomètres qui la sépare de l'île de Sein. Le site est classé depuis 1987 et porte le label Grand Site de France depuis 2004.",
        "Le mot « raz » désigne un courant rapide. Il vient du vieux norrois rás, « la course », passé par le normand ; c'est le même mot qui a donné « raz-de-marée ». Ici, lors des grandes marées, le courant file jusqu'à sept nœuds au flot et six au jusant. Les marins attendent l'étale, ce court moment où il s'annule, pour franchir le passage.",
        "Face à la pointe, à moins d'un mille, le phare de la Vieille et la tourelle de la Plate balisent le raz ; plus au nord, le phare du Tévennec veille sur son rocher. Chacun a sa propre fiche. Sur le plateau, la statue de Notre-Dame des Naufragés, œuvre du sculpteur Cyprian Godebski, regarde la mer, à côté du sémaphore.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        {
          title: "L'Enfer de Plogoff",
          text: "Sous la pointe, la mer a creusé le Trou de l'Enfer, un gouffre où elle s'engouffre de trois côtés. Un tunnel d'une soixantaine de mètres traverse même la pointe d'est en ouest. La tradition voulait que le flot y dépose les noyés. Surtout, n'y descendez jamais : l'accès est extrêmement dangereux.",
        },
        {
          title: 'La baie des Trépassés… ou de la source ?',
          text: "Juste au nord, la baie des Trépassés devrait son nom aux corps de naufragés que les courants rejetaient sur la plage, ou aux druides morts qui y embarquaient pour l'île de Sein. L'explication la plus sérieuse, appuyée par le cadastre ancien, serait une erreur de traduction : Bae an Avon, « la baie de la source », serait devenue Bae an Anaon, « la baie des âmes ».",
        },
        {
          title: 'La centrale qui n\'a jamais vu le jour',
          text: "Dans une crique de la face sud, à un kilomètre de la pointe, une source, Feunteun aod, « la fontaine de la côte », servait autrefois à ravitailler en eau les navires, car la mer y est très profonde près du rivage. C'est justement cette profondeur qui fit choisir Plogoff par EDF pour une centrale nucléaire : un petit port devait y accueillir l'énorme chaudière. De 1978 à 1981, la mobilisation des habitants est massive, et le projet est finalement abandonné.",
        },
        {
          title: 'De la pointe du Raz à Venise',
          text: "Le sentier européen de grande randonnée E5 part d'ici et rejoint Venise, 3 050 kilomètres plus loin. Moins ambitieux, le GR34, le sentier des douaniers, passe lui aussi par la pointe.",
        },
        {
          title: "Deux millions de pieds",
          text: "Avant la réhabilitation, la lande avait disparu au-delà du sémaphore, piétinée par deux millions de pieds chaque année. Pour la faire revenir, on a canalisé les visiteurs, semé des landes pilées et transplanté des mottes de végétation.",
        },
        {
          title: "« Au bout de 45 ans »",
          text: "Quand la pointe est réhabilitée, commerces et hôtels doivent partir. « Au bout de 45 ans, croyez-moi que j'éprouve beaucoup beaucoup de tristesse », confie Marie Le Coz à la télévision. L'opération coûte 40 millions de francs.",
        },
        {
          title: "Classée dès 1942",
          text: "La pointe du Raz est classée en 1942 au titre de la loi de 1930 sur les sites. Aujourd'hui, le Grand Site de France couvre près de 8 700 hectares et reçoit plus de 800 000 visiteurs par an. La candidature pour 2026-2033 propose d'y intégrer l'île de Sein.",
        },
      ],
    },
  ],
  timeline: [
    { year: '1839', text: 'Allumage du phare du Bec du Raz, sur la pointe (aujourd\'hui le sémaphore).' },
    { year: '1887', text: 'Les feux de la pointe s\'éteignent à l\'allumage du phare de la Vieille.' },
    { year: '1962', text: 'Construction de la cité commerciale contre le sémaphore.' },
    { year: '1978', text: 'Début de la mobilisation contre le projet de centrale nucléaire de Plogoff.' },
    { year: '1987', text: 'La pointe du Raz devient site classé.' },
    { year: '1997', text: 'Fin des démolitions : la lande reprend ses droits.' },
    { year: '2004', text: 'Label Grand Site de France.' },
  ],
  archives: [
    {
      year: '1882',
      src: `${C}/thumb/1/12/Georges_Clairin_Les_br%C3%BBleuses_de_varech.jpg/1280px-Georges_Clairin_Les_br%C3%BBleuses_de_varech.jpg`,
      caption: "« Les brûleuses de varech à la pointe du Raz », huile sur toile de Georges Clairin (musée d'art et d'histoire de Saint-Brieuc).",
      credit: 'Georges Clairin, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Georges_Clairin_Les_br%C3%BBleuses_de_varech.jpg',
    },
    {
      year: '1883',
      src: `${C}/thumb/6/67/Feu_de_la_Falaise_du_Raz_de_Sein_%2810968383814%29.jpg/960px-Feu_de_la_Falaise_du_Raz_de_Sein_%2810968383814%29.jpg`,
      caption: 'Le « feu de la falaise du Raz », tourelle d\'alignement éteinte en 1887 à l\'allumage de la Vieille. Gravure de la série « Phares et Balises ».',
      credit: 'SMU Central University Libraries, sans restriction connue',
      page: 'https://commons.wikimedia.org/wiki/File:Feu_de_la_Falaise_du_Raz_de_Sein_(10968383814).jpg',
    },
    {
      year: '1899',
      src: `${C}/thumb/c/c6/Pointe_du_Raz_1899.jpg/500px-Pointe_du_Raz_1899.jpg`,
      caption: 'La pointe du Raz en 1899.',
      credit: 'Marcel Monmarché, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Pointe_du_Raz_1899.jpg',
    },
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
      caption: 'Petites gardeuses de vaches sur la côte nord de la pointe, la baie des Trépassés en arrière-plan. Carte postale.',
      credit: 'Neurdein (ND Photo), domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Baie_des_Tr%C3%A9pass%C3%A9s_ND_Photo.jpg',
    },
    {
      year: 'v. 1925',
      src: `${C}/thumb/0/05/Pointe_du_Raz_Pardon_de_Notre-Dame-des-Naufrag%C3%A9s.jpg/1280px-Pointe_du_Raz_Pardon_de_Notre-Dame-des-Naufrag%C3%A9s.jpg`,
      caption: 'Le pardon de Notre-Dame-des-Naufragés à la pointe du Raz. Carte postale.',
      credit: 'ND Photo (Neurdein), domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Pointe_du_Raz_Pardon_de_Notre-Dame-des-Naufrag%C3%A9s.jpg',
    },
  ],
  photos: [
    {
      src: `${C}/thumb/f/f8/Phare_de_la_vieille.jpg/1280px-Phare_de_la_vieille.jpg`,
      caption: 'Le phare de la Vieille en 2016. À droite, la base maçonnée de l\'ancienne tour Temperley, emportée par la tempête de 2008.',
      credit: 'Bastenbas, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Phare_de_la_vieille.jpg',
    },
    {
      src: `${C}/thumb/b/b1/Tourelle_de_la_Plate-Phare_de_la_Vieille.jpg/1280px-Tourelle_de_la_Plate-Phare_de_la_Vieille.jpg`,
      caption: 'La tourelle de la Plate devant la Vieille, dans le raz de Sein.',
      credit: 'Julien Carnot, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Tourelle_de_la_Plate-Phare_de_la_Vieille.jpg',
    },
    {
      src: `${C}/thumb/d/d7/Notre-Dame_des_Naufrag%C3%A9s_C_Godebski_260607_06.jpg/1280px-Notre-Dame_des_Naufrag%C3%A9s_C_Godebski_260607_06.jpg`,
      caption: 'Notre-Dame des Naufragés, par Cyprian Godebski (1835-1909).',
      credit: 'Vassil, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Notre-Dame_des_Naufrag%C3%A9s_C_Godebski_260607_06.jpg',
    },
    {
      src: `${C}/thumb/7/76/Pointe_du_Raz%2C_vue_de_la_baie_des_Tr%C3%A9pass%C3%A9s.jpg/1280px-Pointe_du_Raz%2C_vue_de_la_baie_des_Tr%C3%A9pass%C3%A9s.jpg`,
      caption: 'La pointe du Raz vue de la baie des Trépassés.',
      credit: 'Nono vlf, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Pointe_du_Raz,_vue_de_la_baie_des_Tr%C3%A9pass%C3%A9s.jpg',
    },
    {
      src: `${C}/thumb/f/fb/0_S%C3%A9maphore_de_la_Pointe_du_Raz.JPG/1280px-0_S%C3%A9maphore_de_la_Pointe_du_Raz.JPG`,
      caption: 'Le sémaphore, bâti sur la base de l\'ancien phare du Bec du Raz (1839).',
      credit: 'Jean-Pol Grandmont, CC BY 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:0_S%C3%A9maphore_de_la_Pointe_du_Raz.JPG',
    },
  ],
  videos: [
    {
      title: 'La Plate et la Vieille dans le courant',
      caption: 'La tourelle de la Plate et le phare de la Vieille, filmés au ras de l\'eau dans le raz de Sein (avril 2010).',
      credit: 'Calcineur, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Raz_de_Sein,_la_Plate_et_la_Vieille.ogv',
      poster: `${C}/thumb/b/b1/Tourelle_de_la_Plate-Phare_de_la_Vieille.jpg/1280px-Tourelle_de_la_Plate-Phare_de_la_Vieille.jpg`,
      sources: [
        { src: `${T}/6/66/Raz_de_Sein%2C_la_Plate_et_la_Vieille.ogv/Raz_de_Sein%2C_la_Plate_et_la_Vieille.ogv.480p.vp9.webm`, type: 'video/webm' },
        { src: `${T}/6/66/Raz_de_Sein%2C_la_Plate_et_la_Vieille.ogv/Raz_de_Sein%2C_la_Plate_et_la_Vieille.ogv.360p.mpeg4.mov`, type: 'video/mp4' },
      ],
    },
    {
      title: 'Le courant vu de la pointe',
      caption: 'Le raz de Sein en fin de marée montante, par petit coefficient (55) : même par mer calme, le courant se voit à l\'œil nu (avril 2011).',
      credit: 'Calcineur, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Courant_du_Raz_de_Sein_vu_de_la_Pointe_du_Raz.ogv',
      sources: [
        { src: `${T}/f/f5/Courant_du_Raz_de_Sein_vu_de_la_Pointe_du_Raz.ogv/Courant_du_Raz_de_Sein_vu_de_la_Pointe_du_Raz.ogv.240p.vp9.webm`, type: 'video/webm' },
        { src: `${T}/f/f5/Courant_du_Raz_de_Sein_vu_de_la_Pointe_du_Raz.ogv/Courant_du_Raz_de_Sein_vu_de_la_Pointe_du_Raz.ogv.360p.mpeg4.mov`, type: 'video/mp4' },
      ],
    },
    {
      title: 'Le raz dans la tempête',
      caption: 'Le raz de Sein pendant la tempête du 6 janvier 2014.',
      credit: 'Braveoanamzerhiziv, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Le_Raz_de_Sein_dans_la_temp%C3%AAte,_6_janvier_2014.ogv',
      sources: [
        { src: `${T}/1/12/Le_Raz_de_Sein_dans_la_temp%C3%AAte%2C_6_janvier_2014.ogv/Le_Raz_de_Sein_dans_la_temp%C3%AAte%2C_6_janvier_2014.ogv.360p.mpeg4.mov`, type: 'video/mp4' },
        { src: `${T}/1/12/Le_Raz_de_Sein_dans_la_temp%C3%AAte%2C_6_janvier_2014.ogv/Le_Raz_de_Sein_dans_la_temp%C3%AAte%2C_6_janvier_2014.ogv.240p.vp9.webm`, type: 'video/webm' },
      ],
    },
  ],
  practical: [
    {
      icon: 'car',
      title: 'Accès',
      text: "Par la D784 jusqu'au parking de la vallée de Bestrée (payant, gratuit pour les habitants du Cap Sizun et de l'île de Sein). La pointe est à environ 800 m à pied.",
    },
    {
      icon: 'bus',
      title: 'Sans voiture',
      text: 'Autocars BreizhGo : ligne 53B le samedi, transport à la demande les autres jours.',
    },
    {
      icon: 'hike',
      title: 'À pied',
      text: 'Le GR34, le sentier des douaniers, passe par la pointe et longe la côte vers la baie des Trépassés et la pointe du Van.',
    },
    {
      icon: 'warn',
      title: 'Sécurité',
      text: "Restez sur les sentiers balisés : la lande est en cours de restauration. Ne descendez jamais vers le Trou de l'Enfer.",
    },
  ],
  sources: [
    { label: 'Wikipédia : Pointe du Raz', url: 'https://fr.wikipedia.org/wiki/Pointe_du_Raz' },
    { label: 'Wikipédia : Raz de Sein', url: 'https://fr.wikipedia.org/wiki/Raz_de_Sein' },
    { label: 'Wikipédia : Baie des Trépassés', url: 'https://fr.wikipedia.org/wiki/Baie_des_Tr%C3%A9pass%C3%A9s' },
    { label: 'Wikipédia : Projet de centrale nucléaire de Plogoff', url: 'https://fr.wikipedia.org/wiki/Projet_de_centrale_nucl%C3%A9aire_de_Plogoff' },
    { label: "Communauté de communes Cap Sizun-Pointe du Raz : histoire du label Grand Site", url: "https://www.cap-sizun.bzh/grand-site-de-france/" },
    { label: "INA, L'Ouest en mémoire : la pointe du Raz", url: "https://fresques.ina.fr/ouest-en-memoire/fiche-media/Region00308/la-pointe-du-raz.html" },
  ],
};
