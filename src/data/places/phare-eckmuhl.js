// Fiche : Phare d'Eckmühl (Penmarc'h)
import { C } from './media.js';
import { heroOf } from './phares-media.js';

export default {
  id: 'phare-eckmuhl',
  available: true,
  icon: 'lighthouse',
  tags: ['phare', 'histoire', 'legende'],
  title: "Phare d'Eckmühl, le géant de Penmarc'h",
  shortTitle: "Phare d'Eckmühl",
  commune: "Penmarc'h · Pays bigouden",
  coords: [-4.37278, 47.79833],
  category: 'Phare · Patrimoine',
  labels: ['Monument historique', 'Ouvert à la visite'],
  teaser:
    "Plus de 60 mètres de granit, payés par la fille d'un maréchal de Napoléon pour « racheter les larmes » de la guerre : un phare-palais, avec rampe en bronze et murs d'opaline.",
  hero: heroOf('phare-eckmuhl', {
    src: `${C}/thumb/0/03/Phare_d%27eckmuhl_%288142813134%29.jpg/1280px-Phare_d%27eckmuhl_%288142813134%29.jpg`,
    alt: "Le phare d'Eckmühl, tour octogonale de granit, sur la pointe de Penmarc'h",
    credit: 'Jean-Jacques Abalain, CC BY 2.0, Wikimedia Commons',
  }),
  lighthouse: {
    built: '1893 à 1897',
    lit: '17 octobre 1897',
    height: '60 m, en granit de Kersanton',
    elevation: '64,80 m au-dessus de la mer',
    range: '23,5 milles, environ 43,5 km',
    light: '1 éclat blanc toutes les 5 secondes',
    keepers: "Gardé jusqu'au 19 octobre 2007",
    visit: 'Ouvert à la visite (payant) : 307 marches jusqu\'à la lanterne',
    visitors: 'Près de 55 000 entrées en 2009',
    protection: 'Classé monument historique (2011)',
  },
  facts: [
    { value: '1897', label: 'inauguration, le 17 octobre' },
    { value: '60 m', label: 'de hauteur, en granit de Kersanton' },
    { value: '43,5 km', label: 'de portée (23,5 milles)' },
    { value: '55 000', label: 'visiteurs en 2009' },
  ],
  records: [
    { medal: 'or', scope: 'Monde', title: 'Le phare le plus puissant du monde en 1901', text: 'À égalité avec le Créac\'h, à Ouessant.', more: "Électrifié dès sa mise en service, le phare fonctionne d'abord grâce à des machines à vapeur qui brûlent 125 tonnes de charbon par an. En 1901, avec le phare du Créac'h, à Ouessant, c'est le phare le plus puissant du monde. Son feu porte aujourd'hui à 23,5 milles." },
    { medal: 'or', scope: 'France', title: 'Le premier phare à deux optiques', text: 'Un faisceau plus puissant pour la même électricité.', more: "La lanterne de quatre mètres de diamètre abrite deux optiques jumelles, une première en France. Elles tournent sur un bain de 100 kilos de mercure et lancent un éclat toutes les cinq secondes." },
    { medal: 'argent', scope: 'Pays bigouden', title: 'Première attraction payante', text: 'Et 6e du Finistère, avec près de 55 000 entrées en 2009.', more: "Selon les entrées payantes, le phare d'Eckmühl est la plus grande attraction touristique du pays bigouden, et la sixième du Finistère, avec près de 55 000 entrées en 2009. La visite mène, par 307 marches, jusqu'à la lanterne." },
    { medal: 'bronze', scope: 'Penmarc\'h', title: 'Le plus grand des trois phares du site', text: 'Plus de 60 mètres, à côté de la Vieille tour et du phare de 1835.' },
  ],
  funFact: { title: '307 marches en 46 secondes', text: 'Le record du « Championnat du monde de l\'ascension du phare d\'Eckmühl » est de 46 s 54, établi en 2015.' },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Sur la pointe de Saint-Pierre, à Penmarc'h, au sud-ouest du pays bigouden, le phare d'Eckmühl veille sur l'une des côtes les plus dangereuses de France, hérissée de récifs. Haut de plus de 60 mètres, c'est le plus grand des trois phares du site, à côté de la « Vieille tour » du XVe siècle et de l'ancien phare de 1835.",
        "Inauguré le 17 octobre 1897, il est entièrement bâti en granit de Kersanton. Il est inscrit monument historique en 2005 puis classé en 2011. Ouvert à la visite, c'est la première attraction payante du pays bigouden, avec près de 55 000 entrées en 2009.",
      ],
    },
    {
      id: 'legs',
      nav: 'Le legs',
      title: 'Un phare pour racheter les larmes',
      paragraphs: [
        "Le 9 décembre 1892, une nouvelle inattendue arrive : la marquise Adélaïde-Louise d'Eckmühl de Blocqueville lègue 300 000 francs pour construire un phare. Il devra s'appeler « phare d'Eckmühl », en l'honneur de son père, le maréchal Davout, prince d'Eckmühl, du nom de la bataille qu'il mena en Bavière en 1809.",
        "La marquise espère ainsi que « les larmes versées par la fatalité des guerres » soient rachetées par les vies sauvées en mer. Pour respecter ses vœux, les ingénieurs font appel à un architecte parisien, Paul Marbeau, pour la décoration de la tour : une première dans l'histoire moderne des phares.",
        "Les travaux commencent en septembre 1893 et durent quatre ans. Ils coûtent 640 000 francs, plus du double du legs. Le granit, taillé à Brest, arrive par la mer jusqu'au port de Kérity. Le chantier connaît un grave accident : une chaîne d'échafaudage casse, et sept ouvriers font une chute de dix mètres.",
      ],
    },
    {
      id: 'palais',
      nav: 'À l\'intérieur',
      title: 'Un palais de lumière',
      paragraphs: [
        "L'intérieur est d'un luxe rare pour un phare. La cage d'escalier est tapissée de carreaux d'opaline bleutée fabriqués par Saint-Gobain, qui diffusent la lumière et gardent la tour au sec. L'escalier à vis compte 272 marches de granit, et sa rampe pèse plus de deux tonnes et demie de bronze. Au plafond, 22 plaques de marbre bleu turquin rayonnent autour d'une rosace de bronze.",
        "Tout en haut, la « salle d'honneur » est lambrissée de chêne de France et de Hongrie. Le gardien de quart y avait un lit encastré dans les boiseries. Au-dessus, la lanterne de quatre mètres de diamètre abrite deux optiques jumelles, une première en France, qui tournent sur un bain de 100 kilos de mercure et lancent un éclat toutes les cinq secondes, visible à 25 milles.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        {
          title: 'Le championnat du monde… de montée de phare',
          text: "Depuis 2007, on court le « Championnat du monde de l'ascension du phare d'Eckmühl » : 290 marches à gravir le plus vite possible jusqu'à la salle de veille. Le record masculin est de 46 secondes 54, établi en 2015.",
        },
        {
          title: 'Le plus puissant du monde',
          text: "Électrifié dès sa mise en service, le phare tourne d'abord grâce à des machines à vapeur qui brûlent 125 tonnes de charbon par an. En 1901, avec celui du Créac'h à Ouessant, c'est le phare le plus puissant du monde.",
        },
        {
          title: 'Une inauguration décalée pour la foire',
          text: "L'inauguration était prévue le 7 octobre 1897, cinquième anniversaire de la mort de la marquise. Elle fut repoussée au 17 pour ne pas tomber le même jour que la grande foire annuelle de Pont-l'Abbé.",
        },
        {
          title: 'Des gardiens accusés de braconnage',
          text: "En 1911, des habitants de Saint-Pierre portent plainte contre les gardiens : ils profiteraient des oiseaux migrateurs qui viennent s'écraser contre la lanterne, attirés par la lumière, pour en revendre la viande. Un gardien sera reconnu coupable.",
        },
        {
          title: 'Miné, mais épargné',
          text: "Sous l'Occupation, les soldats allemands s'installent dans le phare en 1940. À la fin de l'été 1943, ils y placent des explosifs. L'optique est mise à l'abri, mais la menace n'est jamais exécutée, et ils partent en juin 1944.",
        },
        {
          title: 'Au cinéma et en bande dessinée',
          text: "Son escalier apparaît dans Un long dimanche de fiançailles en 2004. Et son nom a inspiré celui de la capitale imaginaire des bandes dessinées Lanfeust de Troy, où le phare apparaît sur la dernière planche du premier album.",
        },
      ],
    },
  ],
  timeline: [
    { year: 'XVe s.', text: 'La « Vieille tour », adossée à la chapelle Saint-Pierre, sert de tour de guet.' },
    { year: '1835', text: 'Mise en service du phare de Penmarc\'h.' },
    { year: '1892', text: 'La marquise de Blocqueville lègue 300 000 francs.' },
    { year: '1893', text: 'Début des travaux, en septembre.' },
    { year: '1897', text: 'Inauguration le 17 octobre.' },
    { year: '1901', text: 'Le phare le plus puissant du monde, avec le Créac\'h.' },
    { year: '1929', text: 'Raccordement au réseau électrique.' },
    { year: '2005', text: 'Inscription aux monuments historiques.' },
    { year: '2007', text: 'Départ des derniers gardiens, le 19 octobre ; premier championnat de montée.' },
    { year: '2011', text: 'Classement monument historique.' },
  ],
  archives: [
    {
      year: '1893',
      src: `${C}/thumb/2/24/Phare_d%27Eckm%C3%BChl_vue_cavali%C3%A8re_1893_-_Archives_nationales_%28France%29.jpg/1280px-Phare_d%27Eckm%C3%BChl_vue_cavali%C3%A8re_1893_-_Archives_nationales_%28France%29.jpg`,
      caption: "Vue cavalière du projet par l'architecte Paul Marbeau (Archives nationales).",
      credit: 'Paul Marbeau, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Phare_d%27Eckm%C3%BChl_vue_cavali%C3%A8re_1893_-_Archives_nationales_(France).jpg',
    },
    {
      year: '1895',
      src: `${C}/thumb/3/3c/Construction_eckmuhl.jpg/1280px-Construction_eckmuhl.jpg`,
      caption: 'Le phare en construction.',
      credit: 'Domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Construction_eckmuhl.jpg',
    },
    {
      year: 'v. 1900',
      src: `${C}/thumb/f/fd/La_veill%C3%A9e_nocturne_au_phare_d%E2%80%99Eckm%C3%BChl.jpg/1280px-La_veill%C3%A9e_nocturne_au_phare_d%E2%80%99Eckm%C3%BChl.jpg`,
      caption: 'La veillée nocturne au phare.',
      credit: 'Paul Gruyer, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:La_veill%C3%A9e_nocturne_au_phare_d%E2%80%99Eckm%C3%BChl.jpg',
    },
  ],
  photos: [
    {
      src: `${C}/thumb/f/fc/Escalier_phare_eckmuhl_haut.jpg/1280px-Escalier_phare_eckmuhl_haut.jpg`,
      caption: "L'escalier à vis vu d'en haut, et ses murs d'opaline.",
      credit: 'BernardM, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Escalier_phare_eckmuhl_haut.jpg',
    },
    {
      src: `${C}/thumb/a/a0/Penmarc%27h_-_phare_d%27Eckm%C3%BChl%2C_int%C3%A9rieur_05.jpg/1280px-Penmarc%27h_-_phare_d%27Eckm%C3%BChl%2C_int%C3%A9rieur_05.jpg`,
      caption: 'Le plafond de marbre et de bronze.',
      credit: 'Fab5669, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Penmarc%27h_-_phare_d%27Eckm%C3%BChl,_int%C3%A9rieur_05.jpg',
    },
    {
      src: `${C}/thumb/6/6b/Lanterne_phare_eckmuhl.jpg/1280px-Lanterne_phare_eckmuhl.jpg`,
      caption: 'La lanterne et ses deux optiques jumelles.',
      credit: 'BernardM, CC BY 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Lanterne_phare_eckmuhl.jpg',
    },
    {
      src: `${C}/thumb/f/f4/Phare_Eckm%C3%BChl_et_port_de_Saint_Pierre.jpg/1280px-Phare_Eckm%C3%BChl_et_port_de_Saint_Pierre.jpg`,
      caption: 'Le phare et le port de Saint-Pierre.',
      credit: 'Henri Camus, CC BY 1.0',
      page: 'https://commons.wikimedia.org/wiki/File:Phare_Eckm%C3%BChl_et_port_de_Saint_Pierre.jpg',
    },
    {
      src: `${C}/thumb/a/a6/Les_%C3%A9tocs_vues_de_Kerity_%289618139701%29.jpg/1280px-Les_%C3%A9tocs_vues_de_Kerity_%289618139701%29.jpg`,
      caption: 'Les récifs de Penmarc\'h à marée basse, vus de Kérity.',
      credit: 'Jeanne Menjoulet, CC BY 2.0',
      page: 'https://commons.wikimedia.org/wiki/File:Les_%C3%A9tocs_vues_de_Kerity_(9618139701).jpg',
    },
  ],
  videos: [],
  practical: [
    { icon: 'hike', title: 'Visite', text: 'Le phare se visite (entrée payante) : 307 marches jusqu\'à la lanterne.' },
    { icon: 'warn', title: 'Rochers', text: 'Les rochers de la pointe sont glissants et balayés par les vagues : restez à distance par gros temps.' },
  ],
  sources: [
    { label: "Wikipédia : Phare d'Eckmühl", url: "https://fr.wikipedia.org/wiki/Phare_d%27Eckm%C3%BChl" },
  ],
  pois: [],
};
