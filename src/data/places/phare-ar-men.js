// Fiche : Phare d'Ar-Men (chaussée de Sein)
import { heroOf, photosOf } from './phares-media.js';

export default {
  id: 'phare-ar-men',
  available: true,
  icon: 'lighthouse',
  tags: ['phare', 'histoire', 'legende'],
  title: "Phare d'Ar-Men, l'enfer des enfers",
  shortTitle: "Phare d'Ar-Men",
  commune: 'Île-de-Sein · Chaussée de Sein',
  coords: [-4.99722, 48.05028],
  miniZoom: 8.6,
  category: 'Phare en mer',
  teaser:
    "Une tour noire et blanche posée sur un rocher à peine plus large qu'elle, au bout de la chaussée de Sein. Quatorze ans de chantier, des gardiens bloqués des mois par la houle : les gardiens l'appelaient « l'enfer des enfers ».",
  hero: heroOf('phare-ar-men'),
  lighthouse: {
    built: '1867 à 1881 (renforcé de 1897 à 1902)',
    lit: '30 août 1881',
    height: '33,50 m (37 m au total)',
    elevation: '29 m au-dessus de la mer',
    range: '23 milles, environ 43 km',
    light: '3 éclats blancs toutes les 20 secondes',
    keepers: "Gardé jusqu'au 10 avril 1990",
    visit: 'Non visitable : en pleine mer, à 10 km à l\'ouest de Sein',
    visitors: 'Aucune : phare en mer, inaccessible',
    protection: 'Classé monument historique (2017)',
  },
  facts: [
    { value: '1881', label: 'mise en service, le 30 août' },
    { value: '33,5 m', label: 'de hauteur de tour' },
    { value: '43 km', label: 'de portée (23 milles)' },
    { value: '1990', label: 'départ des derniers gardiens' },
  ],
  records: [
    {
      medal: 'or', scope: 'Phares bretons', title: 'Le plus célèbre des phares en mer',
      text: 'Pour son isolement, son chantier et ses relèves périlleuses.',
      more: "Parmi les phares en mer de Bretagne (Kéréon, la Vieille, la Jument…), Ar-Men est le plus célèbre. Il doit sa réputation à son isolement extrême, au bout d'une chaussée de récifs longue de 24 km, à un chantier jugé impossible par les ingénieurs eux-mêmes, et au danger de la relève des gardiens. Il a inspiré des romans (Rachilde, Henri Queffélec, Jean Raspail), une bande dessinée d'Emmanuel Lepage et le récit de Jean-Pierre Abraham, gardien du phare de 1959 à 1963.",
    },
    {
      medal: 'argent', scope: 'Gardiens', title: 'Plus de 100 jours sans relève',
      text: 'Le record de temps passé sur le phare par un gardien.',
      more: "En principe, la relève avait lieu tous les quinze jours, « temps permettant ». À Ar-Men, elle était souvent annulée à cause de la houle. Le record de temps passé sur le phare par un gardien dépasse les 100 jours. En 1922, les trois gardiens sont restés 89 jours sans être ravitaillés, et en décembre 1923, après vingt-six jours de tempête, ils avaient dû entamer le biscuit de réserve.",
    },
    {
      medal: 'bronze', scope: 'Chantier', title: '14 ans de travaux',
      text: 'Et seulement 8 heures de travail effectif la première année.',
      more: "En 1867, première saison du chantier, les ouvriers ne peuvent débarquer que neuf fois sur le rocher : huit heures de travail effectif au total, pour quinze trous percés. Ils travaillent en ceinture de sauvetage, souvent couchés sur la roche pour ne pas être emportés par les vagues. Il faudra attendre 1881 pour allumer le feu, puis de nouveaux travaux de 1897 à 1902 pour alourdir et stabiliser la tour.",
    },
  ],
  funFact: { title: 'Caché dans un placard', text: "Un gardien excédé par ses deux collègues se cacha un jour dans un placard pour faire croire à sa disparition. Il sortit quand ils commencèrent à faire son éloge… et perdit son emploi." },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Ar-Men, « le rocher » en breton, est un phare en mer bâti à l'extrémité de la chaussée de Sein, une traînée de récifs qui s'étire sur près de 24 kilomètres à l'ouest de l'île de Sein, en mer d'Iroise. Il se dresse sur un rocher de 105 m² à peine, qui ne dépasse que de 4,2 mètres les plus basses eaux.",
        "Pour les gardiens de phare, c'était le poste le plus redouté : par tempête, la houle faisait trembler toute la tour et décrochait ce qui était pendu aux murs. Ils l'avaient surnommé « l'enfer des enfers ». Le phare est classé monument historique depuis 2017.",
      ],
    },
    {
      id: 'chantier',
      nav: 'Le chantier',
      title: 'Un chantier impossible',
      paragraphs: [
        "Tout commence dans la nuit du 23 au 24 septembre 1859, avec le naufrage de la corvette Sané sur la chaussée de Sein. Un bateau-feu est impossible ici : la mer est trop violente et l'eau trop profonde, plus de 70 mètres. Les ingénieurs jugent d'abord l'entreprise « gigantesque », puis choisissent Ar-Men comme la moins mauvaise solution.",
        "Le chantier commence en 1867 avec une équipe de Sénans, débarqués deux par deux sur le rocher, en espadrilles antidérapantes et ceinture de liège. Les premières pierres sont posées en mai 1869, au ciment préparé à l'eau de mer. Un marin surveille en permanence l'arrivée des lames, et chaque hiver, les tempêtes détruisent une partie du travail.",
        "Le feu est testé le 18 février 1881 et mis en service le 30 août. Mais les ingénieurs doutent : la tour, presque posée sur le rocher, est-elle assez lourde ? Les calculs leur donnent raison, et de 1897 à 1902, on l'alourdit et on renforce sa base d'une chape de ciment de 50 centimètres.",
      ],
    },
    {
      id: 'gardiens',
      nav: 'Les gardiens',
      title: "Vivre dans l'enfer des enfers",
      paragraphs: [
        "Deux gardiens vivaient en permanence sur le phare et se relayaient jour et nuit ; un troisième se reposait sur l'île de Sein. Le phare n'était pas chauffé, longtemps éclairé à la lampe à pétrole, sans salle de bains. Par tempête, ils restaient enfermés des jours entiers, sans pouvoir ouvrir une fenêtre, à écouter les coups sourds des vagues.",
        "La relève se faisait rarement à quai : un câble était tendu entre le phare et le mât du bateau, et les hommes passaient au-dessus des vagues, assis sur un « ballon ». La dernière relève a eu lieu le 10 avril 1990 : les deux derniers gardiens, Daniel Tréanton et Michel Le Ru, ont été hélitreuillés.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        { title: "L'incendie de 1923", text: "En décembre 1923, après vingt-six jours de tempête, le feu prend dans la cuisine. La tour devient une cheminée : les trois gardiens descendent par l'extérieur le long du câble du paratonnerre, puis luttent dix-sept heures avec des seaux d'eau de mer pour éviter que la cuve à fioul n'explose." },
        { title: 'Emporté par une lame', text: "Le 15 janvier 1921, le gardien-chef Sébastien Plouzennec est emporté par une vague alors qu'il observe un navire à la jumelle, au pied de la tour. Un garde-fou est installé après le drame." },
        { title: 'Le soldat et le cormoran', text: "Pendant l'Occupation, trois soldats allemands vivaient sur le phare. En octobre 1941, le gardien François Violant sauve de la noyade l'un d'eux, qui avait sauté à l'eau pour récupérer un cormoran qu'il venait d'abattre." },
        { title: 'Un écrivain gardien', text: "L'écrivain Jean-Pierre Abraham a été gardien d'Ar-Men de 1959 à 1963. Il en a tiré Armen, journal de bord poétique d'un hiver sur le phare." },
        { title: 'Cité par Jules Verne', text: "Dans L'Épave du Cynthia (1885), Jules Verne évoque le chantier, en racontant qu'une année, on n'avait pu travailler que huit heures sur le rocher." },
      ],
    },
  ],
  timeline: [
    { year: '1859', text: 'Naufrage de la corvette Sané sur la chaussée de Sein.' },
    { year: '1867', text: 'Début des travaux : 8 heures de travail effectif la première année.' },
    { year: '1869', text: 'Pose des premières pierres, en mai.' },
    { year: '1881', text: 'Mise en service du feu, le 30 août.' },
    { year: '1897', text: 'Début des travaux de renforcement, achevés en 1902.' },
    { year: '1923', text: 'Incendie dans la cuisine, après 26 jours de tempête.' },
    { year: '1990', text: 'Automatisation et départ des derniers gardiens, le 10 avril.' },
    { year: '2017', text: 'Classement monument historique.' },
  ],
  photos: photosOf('phare-ar-men'),
  practical: [
    { icon: 'warn', title: 'Phare en mer', text: "Inaccessible au public. On l'aperçoit depuis l'île de Sein par temps clair, ou lors de sorties en mer." },
    { icon: 'route', title: "Depuis l'île de Sein", text: 'Vedettes au départ d\'Audierne (Sainte-Évette) ; le phare est à une dizaine de kilomètres à l\'ouest de l\'île.' },
  ],
  sources: [{ label: "Wikipédia : Phare d'Ar-Men", url: "https://fr.wikipedia.org/wiki/Phare_d%27Ar-Men" }],
  pois: [],
};
