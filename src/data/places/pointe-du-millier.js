// Fiche : Pointe du Millier
import { C } from './media.js';

export default {
  id: 'pointe-du-millier',
  available: true,
  icon: 'cliff',
  tags: ['nature'],
  title: 'Pointe du Millier, phare et moulin',
  shortTitle: 'Pointe du Millier',
  commune: 'Beuzec-Cap-Sizun',
  coords: [-4.465833, 48.098889],
  category: 'Phare · Falaises',
  labels: ['GR34', 'Conservatoire du littoral'],
  protections: [{ type: 'conservatoire' }, { type: 'pci', detail: "légende" }],
  teaser:
    "Un phare-maison de poche, un moulin à eau qui tourne encore et un bateau de pierre de vingt tonnes échoué sur la lande. Petite pointe, grandes histoires : suis le sentier.",
  hero: {
    src: `${C}/thumb/6/61/262_Pointe_du_Millier.jpg/1280px-262_Pointe_du_Millier.jpg`,
    alt: 'La pointe du Millier et sa maison-phare au-dessus de la baie de Douarnenez',
    credit: 'Moreau.henri, CC BY-SA 4.0, Wikimedia Commons',
  },
  facts: [
    { value: '1881', label: 'allumage de la maison-feu' },
    { value: '70 m', label: 'hauteur des falaises' },
    { value: '1868', label: 'construction du moulin de Kériolet' },
    { value: '20 t', label: 'le bateau de pierre de saint Conogan' },
  ],
  funFact: { title: 'Un « bateau » de 20 tonnes', text: 'Sur la lande gît le bateau de pierre de saint Conogan, un bloc de granit de 8 mètres. Sa légende est inscrite à l\'Inventaire du patrimoine culturel immatériel.' },
  sections: [
    {
      id: 'essentiel',
      nav: "L'essentiel",
      title: "L'essentiel",
      paragraphs: [
        "Sur la côte nord du Cap Sizun, entre le pays de Douarnenez et la pointe du Van, la pointe du Millier marque avec le cap de la Chèvre, en face, l'entrée de la baie de Douarnenez. Ses falaises atteignent soixante-dix mètres. C'est un site aride, battu par le vent, d'où la vue embrasse toute la baie.",
        "On y arrive par le GR34, qui suit le bord de mer puis plonge dans un vallon boisé de châtaigniers et de robiniers. À marée basse, une petite plage de sable fin apparaît au pied des falaises.",
      ],
    },
    {
      id: 'phare',
      nav: 'Le phare',
      title: 'Un phare tout petit, perché très haut',
      paragraphs: [
        "Le phare du Millier, qu'on appelle aussi la « maison-feu », s'allume pour la première fois le 15 mars 1881. Il ne mesure que 8,40 mètres : une tour semi-circulaire à demi encastrée dans la façade d'une maison de granit, coiffée d'ardoises. Mais perché sur son éperon rocheux, son feu brille à 34 mètres au-dessus de la mer et porte à 12 milles.",
        "Pas besoin d'une haute tour, donc : c'est la falaise qui fait le travail. Pendant la Seconde Guerre mondiale, les Allemands le transforment en poste d'observation. Aujourd'hui, le feu est commandé à distance depuis Brest, et la maison accueille des expositions l'été.",
      ],
    },
    {
      id: 'moulin',
      nav: 'Le moulin',
      title: 'Le moulin de Kériolet',
      paragraphs: [
        "Dans le vallon voisin, le moulin à eau de Kériolet date de 1868. Il tournait d'abord avec une petite roue horizontale, dite « pirouette ». En 1878, le meunier la remplace par une grande roue à augets de huit mètres de diamètre, alimentée par une chute d'environ cinq mètres.",
        "Le moulin a moulu jusqu'en 1958. Racheté par le Conservatoire du littoral et restauré en 2008, il est ouvert au public : au rez-de-chaussée, la trémie et les engrenages ; à l'étage, les tamis qui séparent la farine blanche du son. Et l'on peut encore y acheter de la farine.",
      ],
    },
    {
      id: 'insolite',
      nav: 'Insolite',
      title: 'Anecdotes insolites',
      anecdotes: [
        {
          title: 'Le bateau de pierre de saint Conogan',
          text: "Sur la lande, à environ 500 mètres de la falaise, gît un énorme bloc de granit de huit mètres de long, 2,20 mètres de haut et trois de large, posé sur une pierre en travers. Il pèse une vingtaine de tonnes. La légende en a fait le vaisseau de pierre de saint Conogan. Pour l'archéologue Pierre-Roland Giot, ce serait plutôt un menhir couché… qui n'aurait jamais été dressé. Aucun panneau ne l'indique : il faut le chercher. Sa légende est inscrite à l'Inventaire du patrimoine culturel immatériel en France.",
        },
        {
          title: 'Des meules venues d\'ailleurs',
          text: "Les meules du moulin de Kériolet ne sont pas d'origine : elles ont été récupérées au moulin de Lochrist.",
        },
        {
          title: 'Un bois abattu pour rendre la lande',
          text: "En octobre 2020, un bois de cyprès vieillissants a été abattu au-dessus du vallon de Kériolet. Les arbres menaçaient les promeneurs et avaient obligé à dévier le GR34 en 2018. La coupe doit permettre aux landes sèches atlantiques, un milieu d'intérêt européen, de reprendre leur place.",
        },
        {
          title: "Une fougère tropicale",
          text: "À la limite des hautes mers, dans les fissures de la falaise, pousse la doradille marine, une fougère à l'écologie tropicale. Plus haut, perce-pierre et cochléaire résistent aux embruns grâce à leurs tissus épais.",
        },
        {
          title: "Phoques et dauphins en face",
          text: "Depuis les pointes du nord du Cap Sizun, on peut observer les mammifères marins de la baie de Douarnenez : phoque gris, dauphin commun, grand dauphin, dauphin de Risso, marsouin ou globicéphale.",
        },
        {
          title: "63 hectares protégés",
          text: "Le Conservatoire du littoral protège 63,59 hectares à la pointe du Millier. Les pointes du nord du Cap Sizun ont servi de refuges aux hommes à l'âge du fer.",
        },
      ],
    },
  ],
  timeline: [
    { year: '1868', text: 'Construction du moulin de Kériolet.' },
    { year: '1878', text: 'Nouvelle roue à augets de 8 mètres.' },
    { year: '1881', text: 'Le phare du Millier s\'allume le 15 mars.' },
    { year: '1939-45', text: 'Le phare sert de poste d\'observation à l\'armée allemande.' },
    { year: '1958', text: 'Le moulin s\'arrête.' },
    { year: '2008', text: 'Restauration du moulin, ouvert au public.' },
    { year: '2020', text: 'Abattage du bois de cyprès, restauration des landes.' },
  ],
  archives: [

  ],
  photos: [
    {
      src: `${C}/thumb/d/d2/Maison_phare_de_la_pointe_du_Millier_1.jpg/1280px-Maison_phare_de_la_pointe_du_Millier_1.jpg`,
      caption: 'La maison-phare : la tour du feu est à demi encastrée dans la façade.',
      credit: 'Calcineur, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Maison_phare_de_la_pointe_du_Millier_1.jpg',
    },
    {
      src: `${C}/thumb/e/e1/277_Maison_Feu_du_Millier.jpg/1280px-277_Maison_Feu_du_Millier.jpg`,
      caption: 'La maison-feu du Millier, allumée pour la première fois en 1881.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:277_Maison_Feu_du_Millier.jpg',
    },
    {
      src: `${C}/thumb/a/a4/273_Moulin_de_Keriolet.jpg/1280px-273_Moulin_de_Keriolet.jpg`,
      caption: 'Le moulin à eau de Kériolet, restauré en 2008.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:273_Moulin_de_Keriolet.jpg',
    },
    {
      src: `${C}/thumb/7/7c/270_Moulin_de_Keriolet.jpg/1280px-270_Moulin_de_Keriolet.jpg`,
      caption: 'Les engrenages du moulin de Kériolet.',
      credit: 'Moreau.henri, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:270_Moulin_de_Keriolet.jpg',
    },
    {
      src: `${C}/thumb/d/d4/Bag_sant_Konogan_01.jpg/1280px-Bag_sant_Konogan_01.jpg`,
      caption: 'Le bateau de pierre de saint Conogan, couché sur la lande.',
      credit: 'Yann Gwilhoù, CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:Bag_sant_Konogan_01.jpg',
    },
    {
      src: `${C}/thumb/3/3b/Barque_de_St_Conogan.JPG/1280px-Barque_de_St_Conogan.JPG`,
      caption: 'La « barque » de saint Conogan : huit mètres de granit, une vingtaine de tonnes.',
      credit: 'Raphodon, CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Barque_de_St_Conogan.JPG',
    },
  ],
  videos: [],
  practical: [
    { icon: 'hike', title: 'À pied', text: 'Le GR34 relie le phare, le moulin de Kériolet et le bateau de pierre, sur la lande à 500 m de la falaise.' },
    { icon: 'warn', title: 'Sécurité', text: 'Falaises de 70 m : restez sur le sentier, surtout par vent fort.' },
  ],
  sources: [
    { label: 'Wikipédia : Pointe du Millier', url: 'https://fr.wikipedia.org/wiki/Pointe_du_Millier' },
    { label: 'Wikipédia : Beuzec-Cap-Sizun', url: 'https://fr.wikipedia.org/wiki/Beuzec-Cap-Sizun' },
    { label: "Conservatoire du littoral : pointe du Millier", url: "https://www.conservatoire-du-littoral.fr/siteLittoral/132/28-pointe-du-millier-29_finistere.htm" },
  ],
  pois: [],
};
