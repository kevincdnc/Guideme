// Fiche : Phare du Petit Minou, le gardien du goulet
import { heroOf, photosOf } from './phares-media.js';

export default {
  "id": "phare-petit-minou",
  "available": true,
  "icon": "lighthouse",
  "tags": [
    "phare",
    "histoire"
  ],
  "title": "Phare du Petit Minou, le gardien du goulet",
  "shortTitle": "Phare du Petit Minou",
  "commune": "Plouzané · Goulet de Brest",
  "coords": [
    -4.61417,
    48.33667
  ],
  "miniZoom": 11.5,
  "category": "Phare",
  "teaser": "Une tour inspirée des châteaux forts bretons, reliée à la côte par une route qui traverse un fort de Vauban. Avec le Portzic, elle montre aux navires la route pour entrer dans la rade de Brest.",
  "lighthouse": {
    "built": "1839 à 1848",
    "lit": "1848",
    "height": "26 m",
    "elevation": "36 m au-dessus de la mer",
    "range": "19 milles (blanc), environ 35 km",
    "light": "Blanc et rouge, 2 éclats toutes les 6 secondes",
    "keepers": "Gardé jusqu'à son automatisation, en 1989",
    "visit": "Extérieurs accessibles à pied, par le fort du Petit Minou",
    "visitors": "Chiffre non publié",
    "protection": "Non renseignée"
  },
  "facts": [
    {
      "value": "1848",
      "label": "premier allumage"
    },
    {
      "value": "26 m",
      "label": "de hauteur de tour"
    },
    {
      "value": "35 km",
      "label": "de portée (19 milles)"
    },
    {
      "value": "1989",
      "label": "automatisation"
    }
  ],
  "records": [
    {
      "medal": "bronze",
      "scope": "Énergie",
      "title": "Un pionnier de l'énergie des vagues",
      "text": "De 1926 à 1929, une turbine à air au pied du phare.",
      "more": "Entre 1926 et 1929, l'ingénieur des Phares et Balises André Coyne aménage au pied du phare un « trou du souffleur » artificiel : un entonnoir où les vagues compriment l'air, pour faire tourner une turbine reliée à une dynamo. L'installation, détruite par une tempête, est encore en partie visible. Ses articles ont fait connaître le potentiel de l'énergie de la houle."
    }
  ],
  "funFact": {
    "title": "Le Minou rougit…",
    "text": "Son secteur rouge signale le plateau des Fillettes, des roches immergées du goulet. Les marins s'en souviennent ainsi : « Le Minou rougit quand il couvre les Fillettes. »"
  },
  "sections": [
    {
      "id": "essentiel",
      "nav": "L'essentiel",
      "title": "L'essentiel",
      "paragraphs": [
        "Le phare du Petit Minou se dresse à Plouzané, en avant du fort que Vauban fit construire sur la pointe entre 1692 et 1697 : la route d'accès traverse le fort. Aligné avec le phare du Portzic, il indique aux navires la route à suivre pour entrer dans la rade de Brest.",
        "Son nom viendrait du breton min, la pointe. Allumé en 1848, il reçoit une corne de brume en 1937 et est automatisé en 1989, commandé depuis Brest."
      ]
    },
    {
      "id": "architecture",
      "nav": "La tour",
      "title": "Une tour de château fort",
      "paragraphs": [
        "L'ingénieur Léonce Reynaud s'inspire des tours des châteaux forts de Bretagne. La tour cylindrique associe le granit de l'Aber-Ildut, réputé pour sa résistance à l'érosion, et la kersantite des carrières de Daoulas.",
        "À côté du phare se trouve l'ancienne tour du sémaphore de la Marine nationale, déplacé à la pointe du Portzic en 1987."
      ]
    },
    {
      "id": "minou",
      "nav": "Le Minou",
      "title": "Câble, surf et cinéma",
      "paragraphs": [
        "En 1869, la plage voisine du Minou accueille l'un des premiers câbles télégraphiques reliant l'Europe aux États-Unis. Peu propice à la baignade, elle est aujourd'hui un spot de surf et de bodyboard.",
        "Le phare apparaît dans Remorques de Jean Grémillon (1941) et dans Les Feux de la mer de Jean Epstein (1948), qui montre son intérieur."
      ]
    }
  ],
  "timeline": [
    {
      "year": "1697",
      "text": "Achèvement du fort de Vauban sur la pointe."
    },
    {
      "year": "1839",
      "text": "Décision de construire le phare."
    },
    {
      "year": "1848",
      "text": "Premier allumage."
    },
    {
      "year": "1869",
      "text": "Arrivée d'un câble télégraphique transatlantique à la plage du Minou."
    },
    {
      "year": "1926",
      "text": "Expérience d'énergie des vagues d'André Coyne."
    },
    {
      "year": "1989",
      "text": "Automatisation."
    }
  ],
  "practical": [
    {
      "icon": "car",
      "title": "Accès",
      "text": "Par la route de Plouzané ; le phare se rejoint à pied en traversant le fort."
    },
    {
      "icon": "hike",
      "title": "Balade",
      "text": "Sentier côtier le long du goulet de Brest."
    }
  ],
  "sources": [
    {
      "label": "Wikipédia : Phare du Petit Minou",
      "url": "https://fr.wikipedia.org/wiki/Phare_du_Petit_Minou"
    }
  ],
  "hero": heroOf('phare-petit-minou'),
  "photos": photosOf('phare-petit-minou'),
  "pois": []
};
