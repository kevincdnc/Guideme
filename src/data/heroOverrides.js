// Photos principales du Cap Sizun (lumineuses, colorées, bonnes en carré), Wikimedia Commons.
// L'ancienne photo principale est conservée en tête des autres photos.
const BASE = (import.meta.env && import.meta.env.BASE_URL) || '/Guideme/'; // aussi lu par le script de pré-rendu (Node)
const LOCAL = (f) => `${BASE}photos/${f}`;
// Photos fournies par l'équipe GuideMe.bzh (provenance et droits à préciser dans « credit »)
const TEAM = 'Photo fournie par GuideMe.bzh';

export const HERO_OVERRIDES = {
  'phare-vieille': { src: LOCAL('phare-vieille.webp'), alt: 'Le phare de la Vieille sur son rocher au milieu du raz de Sein, au coucher du soleil', credit: TEAM },
  'phare-saint-mathieu': { src: LOCAL('phare-saint-mathieu.webp'), alt: 'Le phare de Saint-Mathieu, rouge et blanc, devant les ruines de l\'abbaye', credit: TEAM },
  'phare-petit-minou': { src: LOCAL('phare-petit-minou.webp'), alt: 'Le phare du Petit Minou et sa passerelle à l\'entrée du goulet de Brest', credit: TEAM },
  'phare-sein': { src: LOCAL('phare-sein.webp'), alt: 'Le grand phare de l\'île de Sein, blanc à sommet noir', credit: TEAM },
  'phare-eckmuhl': { src: LOCAL('phare-eckmuhl.webp'), alt: 'Le phare d\'Eckmühl au-dessus du port de Saint-Pierre à Penmarc\'h', credit: TEAM },
  'pointe-du-raz': { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/0_La_Pointe_du_Raz_%C3%A0_Plogoff_%285%29.JPG/1280px-0_La_Pointe_du_Raz_%C3%A0_Plogoff_%285%29.JPG", alt: "La pointe du Raz, rochers et bruyère face à la mer", credit: "Jean-Pol Grandmont, CC BY 4.0, Wikimedia Commons", page: "https://commons.wikimedia.org/wiki/File:0_La_Pointe_du_Raz_%C3%A0_Plogoff_%285%29.JPG" },
  'baie-des-trepasses': { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/285_La_Baie_des_Tr%C3%A9pass%C3%A9s_vue_depuis_la_route_venant_de_la_Pointe_du_Van.JPG/1280px-285_La_Baie_des_Tr%C3%A9pass%C3%A9s_vue_depuis_la_route_venant_de_la_Pointe_du_Van.JPG", alt: "La baie des Trépassés vue depuis la route de la pointe du Van", credit: "Moreau.henri, CC BY-SA 4.0, Wikimedia Commons", page: "https://commons.wikimedia.org/wiki/File:285_La_Baie_des_Tr%C3%A9pass%C3%A9s_vue_depuis_la_route_venant_de_la_Pointe_du_Van.JPG" },
  'pointe-du-van': { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/259_Entre_Saint-They_et_Castelmeur.jpg/1280px-259_Entre_Saint-They_et_Castelmeur.jpg", alt: "Falaises et mer turquoise entre la chapelle Saint-They et Castelmeur", credit: "Moreau.henri, CC BY-SA 4.0, Wikimedia Commons", page: "https://commons.wikimedia.org/wiki/File:259_Entre_Saint-They_et_Castelmeur.jpg" },
  'phare-tevennec': { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Tevennec_%28cropped%29.jpg/1280px-Tevennec_%28cropped%29.jpg", alt: "Le phare de Tévennec sur son îlot", credit: "Calcineur, CC BY-SA 3.0, Wikimedia Commons", page: "https://commons.wikimedia.org/wiki/File:Tevennec_%28cropped%29.jpg" },
  'audierne': { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/907_Goyen_Locqu%C3%A9ran.jpg/1280px-907_Goyen_Locqu%C3%A9ran.jpg", alt: "Bateaux sur le Goyen à Locquéran, Audierne", credit: "Moreau.henri, CC BY-SA 4.0, Wikimedia Commons", page: "https://commons.wikimedia.org/wiki/File:907_Goyen_Locqu%C3%A9ran.jpg" },
  'menez-dregan': { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Plouhinec_-_M%C3%A9nez_Dr%C3%A9gan.jpg/1280px-Plouhinec_-_M%C3%A9nez_Dr%C3%A9gan.jpg", alt: "Le site de Menez Dregan à Plouhinec, au bord de la mer", credit: "Tilly antoine, CC BY-SA 4.0, Wikimedia Commons", page: "https://commons.wikimedia.org/wiki/File:Plouhinec_-_M%C3%A9nez_Dr%C3%A9gan.jpg" },
  'pointe-du-millier': { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/266_Pointe_du_Millier.jpg/1280px-266_Pointe_du_Millier.jpg", alt: "La pointe du Millier et la baie de Douarnenez", credit: "Moreau.henri, CC BY-SA 4.0, Wikimedia Commons", page: "https://commons.wikimedia.org/wiki/File:266_Pointe_du_Millier.jpg" },
};
