// Fiche : Locronan
import { C } from './media.js';

export default {
  id: 'locronan',
  available: true,
  icon: 'church',
  tags: ['histoire', 'legende'],
  title: 'Locronan, la cité des tisserands',
  shortTitle: 'Locronan',
  commune: 'Locronan · Lokorn',
  coords: [-4.206, 48.0985],
  category: 'Village · Patrimoine',
  labels: ['Plus Beaux Villages de France', 'Petite Cité de Caractère'],
  teaser:
    "Une place de granit figée au XVIIIe siècle, bâtie par la fortune de la toile à voile, une procession millénaire autour d'un bois sacré, et un village devenu décor de cinéma.",
  hero: {
    src: `${C}/thumb/d/d5/L%27%C3%89glise_Saint-Ronan_de_Locronan_-_Finist%C3%A8re_-_Mars_2017_-_01.jpg/1280px-L%27%C3%89glise_Saint-Ronan_de_Locronan_-_Finist%C3%A8re_-_Mars_2017_-_01.jpg`,
    alt: "L'église Saint-Ronan de Locronan et ses maisons de granit",
    credit: 'Erwan Corre, CC BY-SA 4.0, Wikimedia Commons',
  },
  facts: [
    { value: '1031', label: "première mention de l'église Saint-Ronan" },
    { value: '1505', label: 'Anne de Bretagne en fait une ville' },
    { value: '12', label: 'stations de la Grande Troménie' },
    { value: '26+', label: 'films tournés depuis 1921' },
  ],
  records: [
    { medal: 'or', scope: 'Unique', title: 'Le seul nemeton encore visible', text: 'Un bois sacré gaulois, dont la Troménie suit le tour.' },
  ],
  funFact: { title: 'Polanski a fait enterrer les fils', text: 'Pour le tournage de Tess (1979), tous les réseaux électriques et téléphoniques du village ont été enterrés. Ils le sont restés.' },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Locronan, Lokorn en breton, est un petit village au pied de la montagne de Locronan, à l'est de la baie de Douarnenez. Sa grande place pavée, avec son puits et sa vaste église Saint-Ronan, est bordée de quatorze maisons de granit des XVIIe et XVIIIe siècles. Le village est classé parmi les Plus Beaux Villages de France depuis 1985, et Petite Cité de Caractère depuis 1976.",
        "Son nom signifie « le lieu consacré de Ronan ». Selon la tradition, saint Ronan, un ermite irlandais, christianisa la région au Ve siècle et s'installa à l'emplacement de l'actuelle chapelle du Pénity, accolée à l'église, où repose aujourd'hui son gisant.",
      ],
    },
    {
      id: 'toile',
      nav: 'La toile',
      title: 'La fortune de la toile à voile',
      paragraphs: [
        "Dès le XIVe siècle, le chanvre pousse partout autour de Locronan. Les tisserands en tirent une toile à voile réputée, vendue jusque sur les côtes de Vendée sous le nom d'« olonnes ». Elle équipe les navires de la Marine royale et de la Compagnie des Indes. Sa qualité est encadrée de près : le règlement de 1736 compte 53 articles, du nombre de fils au pliage des pièces.",
        "C'est cette richesse qui a bâti la place : les belles demeures appartenaient aux marchands, aux intermédiaires et aux hommes de loi, tandis que les tisserands vivaient dans de pauvres masures. On y trouve encore le Bureau des toiles et l'hôtel de la Compagnie des Indes.",
        "Puis vient le déclin. En 1764, des manufactures royales s'ouvrent à Brest et attirent les tisserands. La production chute de 10 000 pièces en 1751 à 6 329 en 1776, et il ne reste que 13 métiers à tisser en 1813.",
      ],
    },
    {
      id: 'tromenie',
      nav: 'Troménie',
      title: 'La Troménie, un tour du bois sacré',
      paragraphs: [
        "Bien avant saint Ronan, la forêt du Névet abritait un nemeton, un bois sacré gaulois. Son enceinte, un grand quadrilatère d'une douzaine de kilomètres de tour, comptait douze points remarquables, peut-être les douze mois de l'année celtique, marqués probablement par des menhirs.",
        "Ce sont ces points que suit la Troménie, du breton tro minihi, « le tour du lieu saint ». Chaque deuxième dimanche de juillet a lieu la petite Troménie. Tous les six ans, la Grande Troménie fait le tour complet, ponctué de douze stations marquées aujourd'hui par des calvaires. La dernière a eu lieu en 2019.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        {
          title: 'Les fils électriques enterrés par Polanski',
          text: "Pour le tournage de Tess, sorti en 1979, Roman Polanski fit enterrer tous les réseaux électriques et téléphoniques du village. Ils le sont restés : aucun fil ne gâche la place. Depuis le premier tournage, en 1921, plus de 26 films y ont été tournés, dont Chouans ! de Philippe de Broca et Un long dimanche de fiançailles de Jean-Pierre Jeunet.",
        },
        {
          title: 'Le lit de pierre de saint Ronan',
          text: "Sur le flanc de la montagne, un énorme rocher de 13 mètres de tour porte plusieurs noms : lit, chaise, bateau de saint Ronan ou « jument de pierre ». Il aurait servi d'embarcation au saint pour venir d'Irlande, et les femmes qui s'y couchaient espéraient avoir un enfant.",
        },
        {
          title: 'Une reine en pèlerinage',
          text: "En 1505, Anne de Bretagne vient en pèlerinage à Locronan et élève le bourg au rang de ville. Elle serait venue prier saint Ronan pour avoir des enfants. L'église conserve un calice du XVIe siècle gravé du prénom Anna et d'une hermine, peut-être offert par la duchesse.",
        },
        {
          title: "De l'or au pied de la montagne",
          text: "On raconte qu'une mine d'or était exploitée à Névet, où l'on trouvait des pépites dans la rivière. Les archéologues ont mis au jour, au pied de la montagne, une fonderie d'or remontant au haut Moyen Âge.",
        },
        {
          title: 'Le puits renversé par un car',
          text: "Le puits de la place, longtemps la seule source d'eau potable du village, a été détruit en 1932 par un car… puis reconstruit à l'identique.",
        },
        {
          title: '100 000 visiteurs pour Noël',
          text: "Depuis 2014, Locronan s'illumine pour les fêtes avec 8 kilomètres de guirlandes. Le village de quelque 800 habitants attire alors plus de 100 000 visiteurs.",
        },
      ],
    },
  ],
  timeline: [
    { year: 'Ve s.', text: 'Saint Ronan, ermite irlandais, christianise la région.' },
    { year: '1031', text: "L'église Saint-Ronan est donnée à l'abbaye Sainte-Croix de Quimperlé." },
    { year: '1505', text: 'Anne de Bretagne élève le bourg au rang de ville.' },
    { year: '1594', text: 'Locronan est pillé pendant les guerres de la Ligue.' },
    { year: '1751', text: '10 000 pièces de toile produites, apogée du tissage.' },
    { year: '1813', text: 'Il ne reste que 13 métiers à tisser.' },
    { year: '1921', text: 'Premier tournage de film dans le village.' },
    { year: '1979', text: 'Tess de Roman Polanski : les fils électriques disparaissent sous terre.' },
    { year: '1985', text: 'Label Plus Beaux Villages de France.' },
    { year: '2007', text: 'La montagne de Locronan devient site classé.' },
  ],
  archives: [
    {
      year: '1906',
      src: `${C}/thumb/8/85/200_Maxime_Maufra_La_rue_descendante_%C3%A0_Locronan.jpg/1280px-200_Maxime_Maufra_La_rue_descendante_%C3%A0_Locronan.jpg`,
      caption: '« La rue descendante à Locronan », Maxime Maufra.',
      credit: 'Maxime Maufra, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:200_Maxime_Maufra_La_rue_descendante_%C3%A0_Locronan.jpg',
    },
    {
      year: 'Tissage',
      src: `${C}/thumb/d/df/410_Tisserands_de_Locronan_Villard.jpg/1280px-410_Tisserands_de_Locronan_Villard.jpg`,
      caption: 'Tisserands de Locronan. Carte postale, collection Villard.',
      credit: 'Joseph-Marie Villard, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:410_Tisserands_de_Locronan_Villard.jpg',
    },
    {
      year: '1913',
      src: `${C}/thumb/9/9b/Henri_Rivi%C3%A8re_estampes_05.jpg/1280px-Henri_Rivi%C3%A8re_estampes_05.jpg`,
      caption: "« Entrée de Locronan », eau-forte d'Henri Rivière.",
      credit: 'Henri Rivière, photo Moreau.henri, CC BY 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Henri_Rivi%C3%A8re_estampes_05.jpg',
    },
    {
      year: 'v. 1934',
      src: `${C}/thumb/0/0c/418_Georges_Dantu_Locronan_sous_la_neige.jpg/1280px-418_Georges_Dantu_Locronan_sous_la_neige.jpg`,
      caption: '« Locronan sous la neige », Georges Dantu (musée de Locronan).',
      credit: 'Georges Dantu, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:418_Georges_Dantu_Locronan_sous_la_neige.jpg',
    },
    {
      year: '1895',
      src: `${C}/thumb/f/f4/La_marque_du_bureau_des_toiles_de_Locronan.jpg/960px-La_marque_du_bureau_des_toiles_de_Locronan.jpg`,
      caption: 'La marque du bureau des toiles de Locronan, apposée sur les pièces avant leur expédition.',
      credit: 'M. Serret, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:La_marque_du_bureau_des_toiles_de_Locronan.jpg',
    },
  ],
  photos: [
    {
      src: `${C}/thumb/d/d8/Bretagne_Finistere_Locronan1_tango7174.jpg/1280px-Bretagne_Finistere_Locronan1_tango7174.jpg`,
      caption: "La place de l'église et ses maisons de marchands.",
      credit: 'Tango7174, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Bretagne_Finistere_Locronan1_tango7174.jpg',
    },
    {
      src: `${C}/thumb/6/65/Bretagne_Finistere_Locronan2_tango7174.jpg/500px-Bretagne_Finistere_Locronan2_tango7174.jpg`,
      caption: 'Le tombeau de saint Ronan, dans la chapelle du Pénity.',
      credit: 'Tango7174, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Bretagne_Finistere_Locronan2_tango7174.jpg',
    },
    {
      src: `${C}/thumb/d/df/Locronan_-_Chapelle_Notre-Dame_de_Bonne_Nouvelle.jpg/1280px-Locronan_-_Chapelle_Notre-Dame_de_Bonne_Nouvelle.jpg`,
      caption: 'La chapelle Notre-Dame-de-Bonne-Nouvelle, avec ses vitraux dessinés par Alfred Manessier.',
      credit: 'Jacquym, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Locronan_-_Chapelle_Notre-Dame_de_Bonne_Nouvelle.jpg',
    },
    {
      src: `${C}/thumb/b/b9/Locronan_001_La_montagne_de_Locronan.JPG/1280px-Locronan_001_La_montagne_de_Locronan.JPG`,
      caption: 'La montagne de Locronan, site classé depuis 2007.',
      credit: 'Moreau.henri, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Locronan_001_La_montagne_de_Locronan.JPG',
    },
    {
      src: `${C}/thumb/c/cb/Chapelle_ar_Sonj_%C3%A0_Plas_ar_Horn_en_Locronan.jpg/1280px-Chapelle_ar_Sonj_%C3%A0_Plas_ar_Horn_en_Locronan.jpg`,
      caption: 'La chapelle Ar Sonj, au sommet de la montagne, et ses vitraux de Jean Bazaine.',
      credit: 'Piero, CC0',
      page: 'https://commons.wikimedia.org/wiki/File:Chapelle_ar_Sonj_%C3%A0_Plas_ar_Horn_en_Locronan.jpg',
    },
  ],
  videos: [],
  practical: [
    { icon: 'hike', title: 'Troménie', text: 'Petite Troménie chaque deuxième dimanche de juillet ; Grande Troménie tous les six ans.' },
    { icon: 'book', title: 'Musée', text: "Le musée d'art Charles Daniélou retrace l'histoire du village et expose des peintures du Finistère." },
    { icon: 'car', title: 'Affluence', text: "Village très fréquenté l'été et pendant les illuminations de Noël : venez tôt." },
  ],
  sources: [
    { label: 'Wikipédia : Locronan', url: 'https://fr.wikipedia.org/wiki/Locronan' },
  ],
  pois: [],
};
