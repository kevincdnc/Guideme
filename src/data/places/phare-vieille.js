// Fiche : Phare de la Vieille (raz de Sein, Plogoff)
import { heroOf, photosOf } from './phares-media.js';

export default {
  id: 'phare-vieille',
  available: true,
  icon: 'lighthouse',
  tags: ['phare', 'histoire'],
  title: 'Phare de la Vieille, le donjon du raz de Sein',
  shortTitle: 'Phare de la Vieille',
  commune: 'Plogoff · Raz de Sein',
  coords: [-4.75639, 48.04056],
  miniZoom: 10.6,
  category: 'Phare en mer',
  teaser:
    "Un donjon de granit planté au milieu du courant, qu'on ne pouvait aborder qu'une trentaine de fois par an. Deux gardiens mutilés de guerre y ont hissé le pavillon noir, d'autres ont refusé d'en partir. Monte à bord.",
  hero: heroOf('phare-vieille'),
  lighthouse: {
    built: '1882 à 1887',
    lit: '15 septembre 1887',
    height: '26,90 m',
    elevation: '33,90 m au-dessus de la mer',
    range: '15 milles, environ 28 km',
    light: 'Secteurs blanc, rouge et vert, toutes les 4 secondes',
    keepers: 'Gardé jusqu\'au 14 novembre 1995',
    visit: 'Non visitable : rocher en mer, à l\'ouest de la pointe du Raz',
    visitors: 'Aucune : phare en mer, inaccessible',
    protection: 'Inscrit monument historique (2015)',
  },
  facts: [
    { value: '1887', label: 'mise en service, le 15 septembre' },
    { value: '26,9 m', label: 'de hauteur de tour' },
    { value: '28 km', label: 'de portée (15 milles)' },
    { value: '1995', label: 'départ des derniers gardiens' },
  ],
  records: [
    {
      medal: 'or', scope: 'Phares de France', title: 'Le sauvetage le plus médiatisé',
      text: "En 1926, deux gardiens mutilés de guerre bloqués des semaines par la tempête.",
      more: "Fin 1925, deux mutilés de la Grande Guerre, Mandolini et Ferracci, gardent seuls la Vieille. L'un n'a plus l'usage d'un bras, l'autre a encore une balle dans le corps. Des semaines de tempête empêchent toute relève ; ils hissent le pavillon noir de détresse. Le 28 février 1926, un patron-pêcheur de Plogoff, Clet Henri Coquet, son fils et le gardien-chef d'Ar-Men, Nicolas Kerninon, parviennent à les ramener à terre, en nageant encordés jusqu'à l'escalier du phare. L'affaire, remontée jusqu'au Parlement, fait interdire l'emploi de mutilés de guerre dans les phares en mer.",
    },
    {
      medal: 'argent', scope: 'Phares en mer', title: 'Avant-dernier phare automatisé de France',
      text: 'En 1995, juste avant Kéréon.',
      more: "Le phare est automatisé le 14 novembre 1995 et télécontrôlé depuis l'île de Sein. C'est l'avant-dernier phare en mer français à perdre ses gardiens, avant Kéréon en 2004. Ce jour-là, les gardiens en place refusent la relève, en signe de protestation.",
    },
  ],
  funFact: { title: "Pour qu'on ne le confonde pas", text: "Sa silhouette de donjon médiéval n'est pas qu'esthétique : il fallait qu'on ne puisse pas le confondre, par mauvais temps, avec son voisin le Tévennec." },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Le phare de la Vieille se dresse sur le rocher de Gorlebella, « la roche la plus éloignée » en breton, à moins d'un mille à l'ouest de la pointe du Raz. Avec le phare du Tévennec et la tourelle de la Plate, il balise le raz de Sein, passage le plus court entre l'Atlantique et la Manche, mais redoutable : le courant y dépasse six nœuds en vives eaux.",
        "Allumé le 15 septembre 1887, il remplace les deux feux d'alignement de la pointe du Raz. Il est inscrit monument historique depuis 2015.",
      ],
    },
    {
      id: 'chantier',
      nav: 'Le chantier',
      title: 'Bâtir au milieu du courant',
      paragraphs: [
        "Le principe du phare est retenu dès 1860, mais le projet est sans cesse repoussé en attendant la fin d'Ar-Men. Relancé en 1879, il permet de faire travailler les ouvriers sur la Vieille quand le rocher d'Ar-Men est inabordable. On ne peut accoster que par la face nord, par mer calme, en morte-eau et pendant le flot.",
        "Les campagnes commencent chaque année le 1er mai. Un petit vapeur part de l'île de Sein en remorquant une chaloupe chargée de pierres ; par vives eaux, il doit parfois s'abriter en baie des Trépassés. La maçonnerie commence le 5 août 1882 ; la tour est achevée en 1886, et la date de fin des travaux, 1887, est gravée sur la façade.",
      ],
    },
    {
      id: 'architecture',
      nav: 'Le donjon',
      title: 'Un donjon de granit',
      paragraphs: [
        "La tour est carrée, trapue, légèrement crénelée, élargie à sa base, avec une tourelle en demi-cercle qui abrite l'escalier. Elle est bâtie en granit gris de l'île de Sein, avec les angles et les encadrements en granit vert-bleu de Kersanton.",
        "À l'intérieur, tout est superposé : au rez-de-chaussée les groupes électrogènes et les citernes, puis le magasin des huiles, la cuisine, la chambre à coucher et enfin la chambre de veille, sous la lanterne.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        { title: 'La goélette perdue', text: "Le 19 février 1926, en pleine détresse des deux gardiens, la goélette paimpolaise La Surprise se perd sur les brisants de Plogoff, avec ses dix hommes. Des témoins affirment que le feu de la Vieille n'était pas allumé cette nuit-là. Les gardiens ne seront pas tenus pour responsables." },
        { title: '1 000 francs par sauveteur', text: "Les six sauveteurs de 1926 reçoivent chacun 1 000 francs du gouvernement d'Aristide Briand, et trois d'entre eux la médaille de la Société centrale de sauvetage des naufragés." },
        { title: 'Le mât arraché', text: "Le 10 mars 2008, une violente tempête arrache le mât de charge qui servait à hisser hommes et vivres. Il n'a jamais été remplacé." },
        { title: 'Monter au phare… en « ballon »', text: "La relève se faisait au cartahu : un filin tendu entre le phare et la vedette, sur lequel on accrochait le « ballon », un siège rudimentaire. Le gardien montant, gilet de sauvetage sur le dos et assis à califourchon, était hissé au treuil pendant que la vedette frôlait les rochers. Aujourd'hui, on n'accède plus à la Vieille que par hélitreuillage." },
        { title: 'Quatre gardiens pour la dernière nuit', text: "Le 14 novembre 1995, pour protester contre l'automatisation, Jean Donnart et un collègue refusent la relève : pour la dernière nuit, quatre gardiens au lieu de deux dorment dans le phare, Noël Fouquet, Jean Donnart, Michel Rozenn et Guy Lasbleiz." },
        { title: 'Une lanterne en hélicoptère', text: "À l'été 2019, la lanterne posée en 1886, qui prenait l'eau, a été enlevée par hélicoptère pour être restaurée à Brest." },
        {
          title: "Un chantier jugé presque impossible",
          text: "Dès 1861, la Commission des phares réclame un feu sur la Vieille. En 1872, le directeur du service des phares envisage carrément l'abandon du projet, tant l'accostage est difficile, et l'on préfère se concentrer sur Ar-Men. Un crédit de 100 000 francs n'est voté qu'en avril 1882.",
        },
        {
          title: "Éteint pendant la guerre",
          text: "Le 21 janvier 1944, le feu de la Vieille est évacué. Il ne se rallume que le 1er juin 1945.",
        },
        {
          title: "Une voix dans la brume",
          text: "Depuis le 15 novembre 1913, le phare a aussi une voix : un signal de brume. Son vibrateur émet deux sons puis un, toutes les soixante secondes.",
        },
      ],
    },
  ],
  timeline: [
    { year: '1860', text: 'Le principe du phare est retenu.' },
    { year: '1879', text: 'Premières études sur le rocher.' },
    { year: '1882', text: 'Début de la maçonnerie, le 5 août.' },
    { year: '1887', text: 'Allumage du feu, le 15 septembre.' },
    { year: '1926', text: 'Sauvetage des deux gardiens mutilés de guerre, le 28 février.' },
    { year: '1995', text: 'Automatisation, le 14 novembre.' },
    { year: '2008', text: 'Une tempête arrache le mât de charge.' },
    { year: '2019', text: 'La lanterne part en restauration par hélicoptère.' },
  ],
  photos: photosOf('phare-vieille'),
  practical: [
    { icon: 'warn', title: 'Phare en mer', text: 'Inaccessible au public.' },
    { icon: 'hike', title: "Où l'apercevoir", text: 'Depuis le bout de la pointe du Raz, à moins d\'un mille.' },
  ],
  sources: [
    { label: 'Wikipédia : Phare de la Vieille', url: 'https://fr.wikipedia.org/wiki/Phare_de_la_Vieille' },
    { label: "Ministère de la Culture, POP : phare de la Vieille (inventaire général)", url: "https://pop.culture.gouv.fr/notice/merimee/IA29000464" },
  ],
  pois: [],
};
