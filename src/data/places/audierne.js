// Fiche : Audierne
import { C } from './media.js';

export default {
  id: 'audierne',
  available: true,
  icon: 'port',
  tags: ['port', 'histoire'],
  title: 'Audierne, le port du Cap Sizun',
  shortTitle: 'Audierne',
  commune: 'Audierne · Gwaien',
  coords: [-4.540556, 48.025],
  category: 'Port · Ville',
  labels: ['Port de pêche', 'Départ pour l\'île de Sein'],
  teaser:
    "Un port à l'entrée redoutée, berceau du sauvetage en mer, ancienne capitale de la sardine, et un petit train que tout le monde surnommait « la ligne des mangeurs de bouillie ».",
  hero: {
    src: `${C}/thumb/f/fb/Audierne_-_Le_port.jpg/1280px-Audierne_-_Le_port.jpg`,
    alt: 'Le port d\'Audierne et ses bateaux, au bord du Goyen',
    credit: 'Tilly antoine, CC BY-SA 4.0, Wikimedia Commons',
  },
  facts: [
    { value: '1321', label: 'première mention, « Odierna »' },
    { value: '1865', label: 'un des 2 premiers postes de sauvetage' },
    { value: '656', label: 'bateaux de pêche en 1902' },
    { value: '2e', label: 'port de France au prix moyen du poisson' },
  ],
  records: [
    { medal: 'or', scope: 'France', title: 'L\'un des 2 premiers postes de sauvetage en mer', text: 'Créé en 1865, avec Saint-Malo.' },
    { medal: 'argent', scope: 'France', title: '2e port pour le prix moyen du poisson', text: 'En 2020 : bar, sole, saint-pierre…' },
    { medal: 'bronze', scope: 'Cornouaille', title: 'Le seul vrai havre entre la Torche et le Raz', text: 'Un port de refuge, malgré sa barre redoutée.' },
  ],
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Audierne, Gwaien en breton, est le port du Cap Sizun, à l'embouchure du Goyen. Son nom breton est celui de la rivière, lui-même tiré d'un saint, Gwaien. Le nom français, lui, vient d'« Odierna », un prénom féminin d'origine germanique, qu'on lit dès 1321 sur l'atlas du Vénitien Pietro Vesconte. Depuis 2016, la commune réunit Audierne et Esquibien.",
        "Le port de pêche est spécialisé dans les poissons nobles : bar, dorade, saint-pierre, lotte, lieu jaune, sole. En 2020, Audierne était le deuxième port français pour le prix moyen du poisson frais. La criée se trouve en face, à Poulgoazec, sur la rive de Plouhinec. Le port de plaisance, construit en 1987, accueille 232 bateaux, dont le Cap-Sizun, réplique d'un sloop langoustier des années 1930.",
        "C'est aussi d'ici, depuis le port de Sainte-Evette, que partent les bateaux pour l'île de Sein.",
      ],
    },
    {
      id: 'port',
      nav: 'Le port',
      title: 'Un port aussi précieux que dangereux',
      paragraphs: [
        "Entre la pointe de la Torche et la pointe du Raz, Audierne était le seul véritable abri. Vers 1840, quelque deux cents navires y faisaient relâche chaque année. Mais l'entrée était redoutable : les courants du raz, le plateau de la Gamelle, des bancs de sable instables, et surtout une barre, une lame qui se lève à l'entrée du port. La tempête du 4 février 1899 coûte la vie à dix-sept marins-pêcheurs d'Audierne.",
        "C'est pourquoi, le 12 février 1865, Audierne est, avec Saint-Malo, l'un des deux premiers ports où l'amiral Rigault de Genouilly installe la toute nouvelle Société centrale de sauvetage des naufragés. Le premier sauvetage a lieu le 15 mars 1866. Depuis, plus de mille sauveteurs bénévoles se sont succédé à Audierne pour secourir les marins.",
        "Au tournant du XXe siècle, le port vit de la sardine. En 1902, à son apogée, Audierne et Poulgoazec comptent seize conserveries et 656 bateaux, qui travaillent jusqu'à 2,3 millions de sardines par jour en saison. Puis la sardine se raréfie : la crise, de 1902 à la Grande Guerre, plonge les ouvriers soudeurs de boîtes dans la misère.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        {
          title: 'Le train des mangeurs de bouillie',
          text: "En 1894, une petite ligne à voie métrique relie Douarnenez à Audierne : 19,8 km en 50 à 55 minutes, à 22 km/h de moyenne. On la surnomme Ar Youter, « la ligne des mangeurs de bouillie », youd voulant dire bouillie en breton. Retards et petits accidents y sont légendaires, surtout les jours de marché à Pont-Croix. Depuis juin 2024, son tracé revit en voie verte de 12 km, le Youtar, d'Audierne à Pors-Péron.",
        },
        {
          title: 'Le « train carottes »',
          text: "Une autre ligne, ouverte en 1912, reliait Pont-l'Abbé à Audierne en traversant le pays bigouden. Surnommée le « train carottes », elle mêlait marchandises et voyageurs, et ne vécut que 33 ans : elle ferme en 1935.",
        },
        {
          title: 'Un pont qui s\'ouvrait pour les bateaux',
          text: "En 1856, on construit sur le Goyen un pont métallique à péage dont une arche se lève pour laisser passer les navires vers Pont-Croix. Fermé en 1880, il est remplacé par un pont dont la travée centrale s'ouvre elle aussi au moyen de volées mobiles.",
        },
        {
          title: 'Un abri pour les marins',
          text: "En 1901, le port compte près de 500 chaloupes et 3 500 inscrits maritimes. Jacques de Thézac y ouvre en novembre un Abri du marin, près de la grève des Capucins, où les pêcheurs de passage échouaient leurs bateaux : un lieu chauffé où se reposer, lire et se retrouver ailleurs qu'au café. Il fermera en 1956.",
        },
        {
          title: 'Une balise sur un rond-point',
          text: "La balise « Gamelle Ouest », qui marquait l'ouest du dangereux plateau de la Gamelle à l'entrée du port, a pris sa retraite à terre : elle décore aujourd'hui le rond-point de la Libération, à l'entrée de la ville.",
        },
        {
          title: 'Le port des peintres',
          text: "Paul Signac, Albert Marquet, Lucien Simon, Bernard Buffet ou encore Alexis Gritchenko, dont la toile est au Centre Pompidou : de nombreux peintres ont posé leur chevalet sur les quais d'Audierne.",
        },
      ],
    },
  ],
  timeline: [
    { year: '1321', text: '« Odierna » apparaît sur l\'atlas de Pietro Vesconte.' },
    { year: '1766', text: 'Construction du Vieux môle.' },
    { year: '1843', text: 'Construction du mât Fénoux à l\'entrée du port.' },
    { year: '1847', text: 'Môle du Raoulic, long de 214 mètres.' },
    { year: '1865', text: 'Création du poste de sauvetage, l\'un des deux premiers de France.' },
    { year: '1894', text: 'Mise en service du train « youtar » Douarnenez–Audierne.' },
    { year: '1902', text: 'Apogée de la sardine : 16 conserveries, 656 bateaux.' },
    { year: '1987', text: 'Ouverture du port de plaisance.' },
    { year: '2016', text: 'Fusion d\'Audierne et d\'Esquibien.' },
    { year: '2022', text: 'Le mât Fénoux est inscrit monument historique.' },
    { year: '2024', text: 'Inauguration de la voie verte du Youtar.' },
  ],
  archives: [
    {
      year: 'v. 1900',
      src: `${C}/thumb/d/d7/Audierne_Vue_du_port_1900.jpg/500px-Audierne_Vue_du_port_1900.jpg`,
      caption: 'Vue générale du port vers 1900. Carte postale.',
      credit: 'Léon et Lévy, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Audierne_Vue_du_port_1900.jpg',
    },
    {
      year: '< 1903',
      src: `${C}/thumb/5/53/Audierne_L%27entr%C3%A9e_du_port_1903.jpg/960px-Audierne_L%27entr%C3%A9e_du_port_1903.jpg`,
      caption: "L'entrée du port, redoutée pour sa barre. Dessin d'A. Karl.",
      credit: 'A. Karl, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Audierne_L%27entr%C3%A9e_du_port_1903.jpg',
    },
    {
      year: 'v. 1905',
      src: `${C}/thumb/3/3c/Audierne_Joseph-Marie_Villard.jpg/960px-Audierne_Joseph-Marie_Villard.jpg`,
      caption: "Une famille de pêcheurs d'Audierne au début du XXe siècle.",
      credit: 'Joseph-Marie Villard, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Audierne_Joseph-Marie_Villard.jpg',
    },
    {
      year: '1910',
      src: `${C}/thumb/2/25/Audierne_port_d%C3%A9but_XXe.jpg/960px-Audierne_port_d%C3%A9but_XXe.jpg`,
      caption: 'Le port au début du XXe siècle. Photographie du Touring-Club de France.',
      credit: 'Auteur inconnu, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Audierne_port_d%C3%A9but_XXe.jpg',
    },
    {
      year: 'v. 1920',
      src: `${C}/thumb/d/da/074_Sainte-Marine_enfants.JPG/1280px-074_Sainte-Marine_enfants.JPG`,
      caption: "Concours de maquettes de bateaux devant l'Abri du marin d'Audierne, photographié par son fondateur.",
      credit: 'Jacques de Thézac, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:074_Sainte-Marine_enfants.JPG',
    },
    {
      year: '1896',
      src: `${C}/thumb/5/5b/Chemin_de_fer_DZ_Audierne_1896.jpg/1280px-Chemin_de_fer_DZ_Audierne_1896.jpg`,
      caption: 'Les horaires du train Douarnenez – Audierne, le futur « youtar ».',
      credit: 'Anonyme, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Chemin_de_fer_DZ_Audierne_1896.jpg',
    },
    {
      year: '1928',
      src: `${C}/thumb/e/e7/Albert_Marquet_Le_port_d%27Audierne_1928.jpg/1280px-Albert_Marquet_Le_port_d%27Audierne_1928.jpg`,
      caption: "« Le port d'Audierne », Albert Marquet (collection particulière).",
      credit: 'Albert Marquet, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Albert_Marquet_Le_port_d%27Audierne_1928.jpg',
    },
    {
      year: 'Signac',
      src: `${C}/thumb/1/15/Audierne_Paul_Signac.jpg/500px-Audierne_Paul_Signac.jpg`,
      caption: 'Audierne vu par Paul Signac, qui y a peint plusieurs toiles à la fin des années 1920.',
      credit: 'Paul Signac, domaine public',
      page: 'https://commons.wikimedia.org/wiki/File:Audierne_Paul_Signac.jpg',
    },
  ],
  photos: [
    {
      src: `${C}/thumb/2/20/434_Audierne.jpg/1280px-434_Audierne.jpg`,
      caption: "L'entrée du port, dans l'estuaire du Goyen, avec la jetée du Raoulic.",
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:434_Audierne.jpg',
    },
    {
      src: `${C}/thumb/1/1c/424_Audierne.jpg/1280px-424_Audierne.jpg`,
      caption: 'La jetée du Raoulic, longue de 214 mètres, construite en 1847.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:424_Audierne.jpg',
    },
    {
      src: `${C}/thumb/5/55/Audierne_-_Le_port_vu_d%27en_haut_de_la_ville.jpg/1280px-Audierne_-_Le_port_vu_d%27en_haut_de_la_ville.jpg`,
      caption: 'Le port vu des hauteurs de la ville.',
      credit: 'Tilly antoine, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Audierne_-_Le_port_vu_d%27en_haut_de_la_ville.jpg',
    },
  ],
  videos: [],
  practical: [
    { icon: 'bus', title: 'Île de Sein', text: 'Les bateaux pour l\'île de Sein partent du port de Sainte-Evette, à l\'entrée d\'Audierne.' },
    { icon: 'hike', title: 'À vélo ou à pied', text: 'La voie verte du Youtar suit le Goyen sur 12 km, d\'Audierne à Pors-Péron, en passant par Pont-Croix.' },
    { icon: 'car', title: 'Pointe du Raz', text: 'Audierne est sur la route de la pointe du Raz, à une quinzaine de kilomètres par la D784.' },
  ],
  sources: [
    { label: 'Wikipédia : Audierne', url: 'https://fr.wikipedia.org/wiki/Audierne' },
  ],
  pois: [],
};
