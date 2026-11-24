// Fiche : Pointe du Raz & phare de la Vieille
import { C, T } from './media.js';

export default {
  id: 'pointe-du-raz',
  available: true,
  icon: 'lighthouse',
  tags: ['nature', 'phare', 'histoire'],
  title: 'Pointe du Raz & phare de la Vieille',
  shortTitle: 'Pointe du Raz',
  commune: 'Plogoff · Cap Sizun',
  coords: [-4.741111, 48.040278],
  category: 'Site naturel · Phare',
  labels: ['Grand Site de France', 'Phare monument historique'],
  readingMinutes: 7,
  // Points cités dans la fiche, affichés sur la carte quand elle est ouverte
  pois: [
    { name: 'Phare de la Vieille', coords: [-4.75638889, 48.04055556] },
    { name: 'Phare de Tévennec', coords: [-4.79333, 48.06972] },
    { name: 'Notre-Dame des Naufragés', coords: [-4.73305556, 48.03888889] },
  ],
  teaser:
    "Une proue de granit de 72 m face au raz de Sein, et un phare-donjon bâti sur une roche où l'on ne pouvait accoster qu'une trentaine de fois par an.",
  hero: {
    src: `${C}/thumb/3/35/Aerial_image_of_Phare_de_la_Vieille_%28view_from_the_southeast%29.jpg/1280px-Aerial_image_of_Phare_de_la_Vieille_%28view_from_the_southeast%29.jpg`,
    alt: 'Le phare de la Vieille vu du ciel, sur son rocher au milieu du raz de Sein',
    credit: 'Carsten Steger, CC BY-SA 4.0, Wikimedia Commons',
  },
  facts: [
    { value: '72 m', label: 'hauteur de la proue' },
    { value: '7 nœuds', label: 'courant du raz en vives eaux' },
    { value: '1887', label: 'premier allumage de la Vieille' },
    { value: '18 milles', label: 'portée du feu' },
  ],
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "La pointe du Raz, Beg ar Raz en breton, est l'extrémité ouest du cap Sizun. Ce promontoire de granit, haut de soixante-douze mètres, domine le raz de Sein : un passage d'environ huit kilomètres qui la sépare de l'île de Sein. Le site est classé depuis 1987 et porte le label Grand Site de France depuis 2004.",
        "Le mot « raz » désigne un courant rapide. Il vient du vieux norrois rás, « la course », passé par le normand ; c'est le même mot qui a donné « raz-de-marée ». Ici, lors des grandes marées, le courant file jusqu'à sept nœuds au flot et six au jusant. Les marins attendent l'étale, ce court moment où il s'annule, pour franchir le passage.",
        "À moins d'un mille à l'ouest, posé sur le rocher de Gorlebella, « la roche la plus éloignée », le phare de la Vieille balise le raz avec la tourelle de la Plate, juste devant lui, et le phare de Tévennec, plus au nord. Sur le plateau, la statue de Notre-Dame des Naufragés, œuvre du sculpteur Cyprian Godebski, regarde la mer, à côté du sémaphore.",
      ],
    },
    {
      id: 'vieille',
      nav: 'Le phare',
      title: 'La Vieille, un phare-donjon',
      paragraphs: [
        "Dès 1860, on décide d'éclairer la Vieille. Mais le chantier est sans cesse repoussé : les ingénieurs sont accaparés par Ar-Men, le phare réputé impossible de la chaussée de Sein. Le projet n'est relancé qu'en 1879, avec une idée simple : faire travailler les ouvriers sur la Vieille les jours où la roche d'Ar-Men est inabordable.",
        "Accoster Gorlebella relève de l'exploit. Seule la face nord est abordable, par mer calme, trois jours avant et trois jours après le quartier de lune, en morte-eau, et seulement pendant le flot. L'ingénieur Victor Fénoux compte sur une trentaine d'accostages par an. Chaque campagne commence le premier mai : un petit vapeur part de l'île de Sein, base du chantier, en remorquant une chaloupe chargée de pierres de taille.",
        "La maçonnerie commence le 5 août 1882. La tour, carrée et crénelée, prend volontairement l'allure d'un donjon médiéval : on voulait qu'aucun marin ne puisse la confondre, par mauvais temps, avec sa voisine Tévennec. Elle est bâtie en granit gris de l'île de Sein, avec des angles en granit de Kersanton. Le feu s'allume le 15 septembre 1887, date gravée sur la tour.",
        "Son signal actuel, trois occultations toutes les douze secondes en secteurs blanc, rouge et vert, visible à dix-huit milles, date de 1939. Le feu est éteint sous l'Occupation, du 21 janvier 1944 au 1er juin 1945. Il fonctionne à la vapeur de pétrole jusqu'en 1995, année de son automatisation. Le phare est inscrit monument historique depuis 2015.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        {
          title: "L'hiver maudit de 1926",
          text: "Fin 1925, la Vieille est gardée par deux mutilés de la Grande Guerre, Mandolini et Ferracci : l'un n'a plus l'usage d'un bras, l'autre a toujours une balle dans le corps. Le métier de gardien de phare figurait alors parmi les « emplois réservés » aux anciens combattants. Les tempêtes les isolent pendant des semaines ; ils hissent le pavillon noir de détresse, puis le mettent en berne. Le 28 février 1926, le patron-pêcheur Clet Henri Coquet, son fils et le gardien-chef d'Ar-Men Nicolas Kerninon parviennent enfin à les ramener à terre : Kerninon et le jeune Coquet ont dû nager, encordés, jusqu'à l'escalier du phare. L'affaire remonte jusqu'au Parlement, et dès 1927 le métier de gardien de phare en mer est retiré de la liste des emplois réservés.",
        },
        {
          title: 'Les gardiens qui ont refusé de partir',
          text: "Le 14 novembre 1995, la Vieille est automatisée. C'est l'avant-dernier phare en mer français à perdre ses gardiens, juste avant Kéréon. Pour protester, Jean Donnart et un collègue refusent la relève : pour la dernière nuit, quatre gardiens au lieu de deux dorment dans le phare, Noël Fouquet, Jean Donnart, Michel Rozenn et Guy Lasbleiz. Depuis, le feu est télécommandé depuis l'île de Sein.",
        },
        {
          title: 'Monter au phare… en « ballon »',
          text: "La relève se faisait au cartahu : un filin tendu entre le phare et la vedette, sur lequel on accrochait le « ballon », un siège rudimentaire, à l'origine en liège. Le gardien montant, gilet de sauvetage sur le dos et assis à califourchon, était hissé au treuil pendant que la vedette frôlait les rochers. Aujourd'hui, on n'accède plus à la Vieille que par hélitreuillage.",
        },
        {
          title: 'Tévennec, le phare maudit',
          text: "Au nord du raz, la maison-phare de Tévennec, allumée en 1875, traîne une réputation de lieu hanté. Son premier gardien, Henri Porsmoguer, démissionne au bout de quelques mois en racontant une nuit d'horreur passée avec « l'esprit de Tévennec ». Henri Guézennec puis Alain Menou y perdent la raison. On raconte même qu'une épouse de gardien dut conserver le corps de son mari au saloir jusqu'à la relève. Le phare fonctionne sans gardien depuis 1910.",
        },
        {
          title: "L'Enfer de Plogoff",
          text: "Sous la pointe, la mer a creusé le Trou de l'Enfer, un gouffre où elle s'engouffre de trois côtés. Un tunnel d'une soixantaine de mètres traverse même la pointe d'est en ouest. La tradition voulait que le flot y dépose les noyés. Surtout, n'y descendez jamais : l'accès est extrêmement dangereux.",
        },
        {
          title: 'La baie des Trépassés… ou de la source ?',
          text: "Juste au nord, la baie des Trépassés devrait son nom aux corps de naufragés que les courants rejetaient sur la plage, ou aux druides morts qui y embarquaient pour l'île de Sein. L'explication la plus sérieuse, appuyée par le cadastre ancien, serait une erreur de traduction : Bae an Avon, « la baie de la source », serait devenue Bae an Anaon, « la baie des âmes ».",
        },
        {
          title: 'Une piste d\'aviation sur la lande',
          text: "En 1962, une cité commerciale de quatorze boutiques s'installe contre le sémaphore, autour d'un parking de deux hectares en bitume rouge, en forme de piste d'aviation. Le piétinement de centaines de milliers de visiteurs ruine la lande. Les hôtels sont rasés en 1996, la cité commerciale en 1997 : le parking est déplacé à 800 mètres, dans la vallée de Bestrée, et la bruyère a repoussé.",
        },
        {
          title: 'La centrale qui n\'a jamais vu le jour',
          text: "Dans une crique de la face sud, à un kilomètre de la pointe, une source, Feunteun aod, « la fontaine de la côte », servait autrefois à ravitailler en eau les navires, car la mer y est très profonde près du rivage. C'est justement cette profondeur qui fit choisir Plogoff par EDF pour une centrale nucléaire : un petit port devait y accueillir l'énorme chaudière. De 1978 à 1981, la mobilisation des habitants est massive, et le projet est finalement abandonné.",
        },
        {
          title: 'De la pointe du Raz à Venise',
          text: "Le sentier européen de grande randonnée E5 part d'ici et rejoint Venise, 3 050 kilomètres plus loin. Moins ambitieux, le GR34, le sentier des douaniers, passe lui aussi par la pointe. Et côté littérature, Anatole Le Braz situait déjà en 1900 son roman Le Gardien du feu sur le rocher de la Vieille, dont l'acteur Jean Rochefort fut le parrain.",
        },
      ],
    },
  ],
  timeline: [
    { year: '1839', text: 'Allumage du phare du Bec du Raz, sur la pointe (aujourd\'hui le sémaphore).' },
    { year: '1875', text: 'Allumage de la maison-phare de Tévennec.' },
    { year: '1882', text: 'Début de la maçonnerie de la Vieille, le 5 août.' },
    { year: '1887', text: 'Le feu de la Vieille s\'allume le 15 septembre ; les feux de la pointe s\'éteignent.' },
    { year: '1926', text: 'Sauvetage des deux gardiens mutilés de guerre, le 28 février.' },
    { year: '1939', text: 'Mise en place du signal actuel (2+1 occultations, 12 s).' },
    { year: '1962', text: 'Construction de la cité commerciale contre le sémaphore.' },
    { year: '1987', text: 'La pointe du Raz devient site classé.' },
    { year: '1995', text: 'Automatisation du phare, le 14 novembre.' },
    { year: '1997', text: 'Fin des démolitions : la lande reprend ses droits.' },
    { year: '2004', text: 'Label Grand Site de France.' },
    { year: '2015', text: 'Le phare de la Vieille est inscrit monument historique.' },
    { year: '2019', text: 'La lanterne de 1886 est déposée par hélicoptère pour restauration.' },
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
      src: `${C}/6/67/Feu_de_la_Falaise_du_Raz_de_Sein_%2810968383814%29.jpg`,
      caption: 'Le « feu de la falaise du Raz », tourelle d\'alignement éteinte en 1887 à l\'allumage de la Vieille. Gravure de la série « Phares et Balises ».',
      credit: 'SMU Central University Libraries, sans restriction connue',
      page: 'https://commons.wikimedia.org/wiki/File:Feu_de_la_Falaise_du_Raz_de_Sein_(10968383814).jpg',
    },
    {
      year: '1899',
      src: `${C}/c/c6/Pointe_du_Raz_1899.jpg`,
      caption: 'La pointe du Raz en 1899.',
      credit: 'Marcel Monmarché, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Pointe_du_Raz_1899.jpg',
    },
    {
      year: '1899',
      src: `${C}/e/e5/La_Baie_des_Tr%C3%A9pass%C3%A9s_1899.jpg`,
      caption: 'La baie des Trépassés en 1899.',
      credit: 'Louis Rousselet, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:La_Baie_des_Tr%C3%A9pass%C3%A9s_1899.jpg',
    },
    {
      year: 'v. 1910',
      src: `${C}/c/c1/Baie_des_Tr%C3%A9pass%C3%A9s_ND_Photo.jpg`,
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
    { label: 'Wikipédia : Phare de la Vieille', url: 'https://fr.wikipedia.org/wiki/Phare_de_la_Vieille' },
    { label: 'Wikipédia : Pointe du Raz', url: 'https://fr.wikipedia.org/wiki/Pointe_du_Raz' },
    { label: 'Wikipédia : Raz de Sein', url: 'https://fr.wikipedia.org/wiki/Raz_de_Sein' },
    { label: 'Wikipédia : Phare de Tévennec', url: 'https://fr.wikipedia.org/wiki/Phare_de_T%C3%A9vennec' },
    { label: 'Wikipédia : Baie des Trépassés', url: 'https://fr.wikipedia.org/wiki/Baie_des_Tr%C3%A9pass%C3%A9s' },
    { label: 'Wikipédia : Projet de centrale nucléaire de Plogoff', url: 'https://fr.wikipedia.org/wiki/Projet_de_centrale_nucl%C3%A9aire_de_Plogoff' },
  ],
};
