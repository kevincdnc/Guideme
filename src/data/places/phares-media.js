// Photos des phares (Wikimedia Commons) : couverture par gros temps quand Commons en a une,
// sinon la vue la plus dramatique disponible, puis une petite galerie. Choisies à la main.
const MEDIA = {
  "phare-ar-men": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Phare_Ar-Men_2.JPG/1280px-Phare_Ar-Men_2.JPG",
      "alt": "Le phare d'Ar-Men par gros temps",
      "credit": "Jocelyn Caron, CC BY-SA 3.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:Phare_Ar-Men_2.JPG"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Phare_Ar-Men_3.JPG/1280px-Phare_Ar-Men_3.JPG",
        "caption": "Ar-Men vu du ciel, cerné par la houle.",
        "credit": "Jocelyn Caron, CC BY-SA 3.0",
        "page": "https://commons.wikimedia.org/wiki/File:Phare_Ar-Men_3.JPG"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/20150924_IleDeSein_4Phares_DSC07043_PtrQs.jpg/1280px-20150924_IleDeSein_4Phares_DSC07043_PtrQs.jpg",
        "caption": "Les phares de la chaussée au soleil couchant, depuis l'île de Sein.",
        "credit": "PtrQs, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:20150924_IleDeSein_4Phares_DSC07043_PtrQs.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Ile_de_Sein-Phare.jpg/1280px-Ile_de_Sein-Phare.jpg",
        "caption": "Vers 1910 : un gardien transbordé au cartahu.",
        "credit": "Unknown authorUnknown author, domaine public",
        "page": "https://commons.wikimedia.org/wiki/File:Ile_de_Sein-Phare.jpg",
        "year": "1910"
      }
    ]
  },
  "phare-batz": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/%C3%8Ele-de-Batz_le_Phare_2021.jpg/1280px-%C3%8Ele-de-Batz_le_Phare_2021.jpg",
      "alt": "Le phare de l'île de Batz",
      "credit": "Quoique, CC BY-SA 4.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:%C3%8Ele-de-Batz_le_Phare_2021.jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Lighthouse_at_the_%C3%8Ele-de-Batz_%2815208104360%29.jpg/1280px-Lighthouse_at_the_%C3%8Ele-de-Batz_%2815208104360%29.jpg",
        "caption": "Le phare au-dessus de la lande.",
        "credit": "Groman123, CC BY-SA 2.0",
        "page": "https://commons.wikimedia.org/wiki/File:Lighthouse_at_the_%C3%8Ele-de-Batz_(15208104360).jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/%C3%8Ele-de-Batz_%C3%A9tang_et_phare_2021.jpg/1280px-%C3%8Ele-de-Batz_%C3%A9tang_et_phare_2021.jpg",
        "caption": "Le phare et l'étang du nord-ouest de l'île.",
        "credit": "Quoique, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:%C3%8Ele-de-Batz_%C3%A9tang_et_phare_2021.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Beach_at_%C3%8Ele-de-Batz_%2815216985419%29.jpg/1280px-Beach_at_%C3%8Ele-de-Batz_%2815216985419%29.jpg",
        "caption": "Le phare depuis une plage de l'île.",
        "credit": "Groman123, CC BY-SA 2.0",
        "page": "https://commons.wikimedia.org/wiki/File:Beach_at_%C3%8Ele-de-Batz_(15216985419).jpg"
      }
    ]
  },
  "phare-creach": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Cr%C3%A9ac_H_Lighthouse_Ushant_%28157442129%29.jpeg/1280px-Cr%C3%A9ac_H_Lighthouse_Ushant_%28157442129%29.jpeg",
      "alt": "Le phare du Créac'h par gros temps",
      "credit": "Denis Schwartz, CC BY 3.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:Cr%C3%A9ac_H_Lighthouse_Ushant_(157442129).jpeg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ouessant_2016_14.jpg/1280px-Ouessant_2016_14.jpg",
        "caption": "Le musée des Phares et Balises.",
        "credit": "Pierre Goiffon, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Ouessant_2016_14.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Creach-semaphore.jpg/1280px-Creach-semaphore.jpg",
        "caption": "Le Créac'h et le sémaphore.",
        "credit": "JC Hervé, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Creach-semaphore.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Phare_du_Creach_01.jpg/1280px-Phare_du_Creach_01.jpg",
        "caption": "La tour rayée de noir et de blanc.",
        "credit": "JC Hervé, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Phare_du_Creach_01.jpg"
      }
    ]
  },
  "phare-four": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Vue_depuis_la_dune_de_Saint_Gonvel_-_%C3%AElot_d%27Yoc%27h_%28Landunvez%29_et_phare_du_Four_%28Porspoder%29_%281%29.jpg/1280px-Vue_depuis_la_dune_de_Saint_Gonvel_-_%C3%AElot_d%27Yoc%27h_%28Landunvez%29_et_phare_du_Four_%28Porspoder%29_%281%29.jpg",
      "alt": "Le phare du Four",
      "credit": "Gzen92, CC BY-SA 4.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:Vue_depuis_la_dune_de_Saint_Gonvel_-_%C3%AElot_d%27Yoc%27h_(Landunvez)_et_phare_du_Four_(Porspoder)_(1).jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Porspoder_phare_du_four.JPG/1280px-Porspoder_phare_du_four.JPG",
        "caption": "Vue depuis la table d'orientation de la Garchine, à Porspoder.",
        "credit": "Sandrine Raguénès, CC BY-SA 3.0",
        "page": "https://commons.wikimedia.org/wiki/File:Porspoder_phare_du_four.JPG"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Phare_du_Four_%28Porspoder%29_%2811%29.jpg/1280px-Phare_du_Four_%28Porspoder%29_%2811%29.jpg",
        "caption": "Le phare du Four depuis la côte de Porspoder.",
        "credit": "Gzen92, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Phare_du_Four_(Porspoder)_(11).jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Phare_du_Four_%28Porspoder%29_%2802%29.jpg/1280px-Phare_du_Four_%28Porspoder%29_%2802%29.jpg",
        "caption": "Le phare du Four dans la brume.",
        "credit": "Gzen92, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Phare_du_Four_(Porspoder)_(02).jpg"
      }
    ]
  },
  "phare-ile-vierge": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Phare_de_l%27%C3%AEle_Vierge_Plouguerneau_dans_le_bouillon.jpg/1280px-Phare_de_l%27%C3%AEle_Vierge_Plouguerneau_dans_le_bouillon.jpg",
      "alt": "Le phare de l'île Vierge par gros temps",
      "credit": "BOB2CH, CC BY-SA 4.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:Phare_de_l%27%C3%AEle_Vierge_Plouguerneau_dans_le_bouillon.jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Blick_%C3%BCber_das_Meer_auf_den_Leuchtturm_03.jpg/1280px-Blick_%C3%BCber_das_Meer_auf_den_Leuchtturm_03.jpg",
        "caption": "Le grand phare vu de la mer.",
        "credit": "JensKunstfreund, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Blick_%C3%BCber_das_Meer_auf_den_Leuchtturm_03.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Blick_%C3%BCber_das_Meer_auf_den_Leuchtturm_08.jpg/1280px-Blick_%C3%BCber_das_Meer_auf_den_Leuchtturm_08.jpg",
        "caption": "L'île Vierge et son phare.",
        "credit": "JensKunstfreund, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Blick_%C3%BCber_das_Meer_auf_den_Leuchtturm_08.jpg"
      }
    ]
  },
  "phare-jument": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Phare_jument.jpg/1280px-Phare_jument.jpg",
      "alt": "Le phare de la Jument",
      "credit": "Auteur crédité sur Wikimedia Commons, CC BY-SA 3.0",
      "page": "https://commons.wikimedia.org/wiki/File:Phare_jument.jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/45_La_construction_du_phare_de_la_Jument_1906.JPG/1280px-45_La_construction_du_phare_de_la_Jument_1906.JPG",
        "caption": "1906 : la construction du phare.",
        "credit": "Inconnu (1906), domaine public",
        "page": "https://commons.wikimedia.org/wiki/File:45_La_construction_du_phare_de_la_Jument_1906.JPG",
        "year": "1906"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Pointe_de_Roc%27h_Hir_-_dsmm03649.jpg/1280px-Pointe_de_Roc%27h_Hir_-_dsmm03649.jpg",
        "caption": "La Jument depuis la pointe de Roc'h Hir, à Ouessant.",
        "credit": "Pmau, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Pointe_de_Roc%27h_Hir_-_dsmm03649.jpg"
      }
    ]
  },
  "phare-kereon": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/K%C3%A9r%C3%A9on_Lighthouse_across_the_Fromveur_%288980044838%29.jpg/1280px-K%C3%A9r%C3%A9on_Lighthouse_across_the_Fromveur_%288980044838%29.jpg",
      "alt": "Le phare de Kéréon par gros temps",
      "credit": "dyonis, CC BY 2.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:K%C3%A9r%C3%A9on_Lighthouse_across_the_Fromveur_(8980044838).jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Kereon_from_Ouessant.jpg/1280px-Kereon_from_Ouessant.jpg",
        "caption": "Kéréon devant Ouessant.",
        "credit": "Julien Carnot, CC BY-SA 3.0",
        "page": "https://commons.wikimedia.org/wiki/File:Kereon_from_Ouessant.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Phare_de_K%C3%A9r%C3%A9on_%28%C3%8Ele-Mol%C3%A8ne%29.jpg/1280px-Phare_de_K%C3%A9r%C3%A9on_%28%C3%8Ele-Mol%C3%A8ne%29.jpg",
        "caption": "Kéréon vu de Molène.",
        "credit": "Gzen92, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Phare_de_K%C3%A9r%C3%A9on_(%C3%8Ele-Mol%C3%A8ne).jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/1910_FRAD029_25S_0425_000.jpg/1280px-1910_FRAD029_25S_0425_000.jpg",
        "caption": "1910 : vue générale de l'ouvrage.",
        "credit": "Unknown authorUnknown author, CC0",
        "page": "https://commons.wikimedia.org/wiki/File:1910_FRAD029_25S_0425_000.jpg",
        "year": "1910"
      }
    ]
  },
  "phare-kermorvan": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Le_Conquet_-_phare_de_Kermorvan_-_in_July_2026_002.jpg/1280px-Le_Conquet_-_phare_de_Kermorvan_-_in_July_2026_002.jpg",
      "alt": "Le phare de Kermorvan",
      "credit": "Thomas_Fuhrmann_Jakobsthal, CC BY-SA 4.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:Le_Conquet_-_phare_de_Kermorvan_-_in_July_2026_002.jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/2025-07-25-Kermorvan_lighthouse-4402.jpg/1280px-2025-07-25-Kermorvan_lighthouse-4402.jpg",
        "caption": "Le phare et son pont de granit.",
        "credit": "Superbass, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:2025-07-25-Kermorvan_lighthouse-4402.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Le_Conquet_-_phare_de_Kermorvan_-_in_July_2026_003.jpg/1280px-Le_Conquet_-_phare_de_Kermorvan_-_in_July_2026_003.jpg",
        "caption": "Le phare de Kermorvan en été.",
        "credit": "Thomas_Fuhrmann_Jakobsthal, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Le_Conquet_-_phare_de_Kermorvan_-_in_July_2026_003.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/2025-07-22-Kermorvan_lighthouse-DJI_20250722214614_0008_D.jpg/1280px-2025-07-22-Kermorvan_lighthouse-DJI_20250722214614_0008_D.jpg",
        "caption": "Le phare vu du ciel.",
        "credit": "Superbass, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:2025-07-22-Kermorvan_lighthouse-DJI_20250722214614_0008_D.jpg"
      }
    ]
  },
  "phare-penfret": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Phare_de_Penfret02.jpg/1280px-Phare_de_Penfret02.jpg",
      "alt": "Le phare de Penfret",
      "credit": "Raphodon, CC BY-SA 3.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:Phare_de_Penfret02.jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Phare_de_Penfret.jpg/1280px-Phare_de_Penfret.jpg",
        "caption": "Le phare au bout du sentier.",
        "credit": "Pquline, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Phare_de_Penfret.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Ile_de_Penfret_-_base_nautique_des_Gl%C3%A9nans_%289335432921%29.jpg/1280px-Ile_de_Penfret_-_base_nautique_des_Gl%C3%A9nans_%289335432921%29.jpg",
        "caption": "L'île de Penfret et la base nautique des Glénan.",
        "credit": "Jean-Jacques Abalain from Melgven (près de Concarneau), CC BY 2.0",
        "page": "https://commons.wikimedia.org/wiki/File:Ile_de_Penfret_-_base_nautique_des_Gl%C3%A9nans_(9335432921).jpg"
      }
    ]
  },
  "phare-petit-minou": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Temp%C3%AAte_d%27hiver_en_Iroise_%2811747551205%29.jpg/1280px-Temp%C3%AAte_d%27hiver_en_Iroise_%2811747551205%29.jpg",
      "alt": "Le phare du Petit Minou par gros temps",
      "credit": "Richard Tanguy, CC BY 2.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:Temp%C3%AAte_d%27hiver_en_Iroise_(11747551205).jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Phare_du_petit_Minou.jpg/1280px-Phare_du_petit_Minou.jpg",
        "caption": "Le phare et sa passerelle.",
        "credit": "Marc Schmittbuhl, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Phare_du_petit_Minou.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Phare_du_Petit_Minou_4.jpg/1280px-Phare_du_Petit_Minou_4.jpg",
        "caption": "Le Petit Minou à l'entrée du goulet.",
        "credit": "Einaz80, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Phare_du_Petit_Minou_4.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Temp%C3%AAte_d%27hiver_en_Iroise_%2811747967754%29.jpg/1280px-Temp%C3%AAte_d%27hiver_en_Iroise_%2811747967754%29.jpg",
        "caption": "Tempête d'hiver en Iroise.",
        "credit": "Richard Tanguy, CC BY 2.0",
        "page": "https://commons.wikimedia.org/wiki/File:Temp%C3%AAte_d%27hiver_en_Iroise_(11747967754).jpg"
      }
    ]
  },
  "phare-pierres-noires": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Les_Pierres_Noires_Phare.jpg/1280px-Les_Pierres_Noires_Phare.jpg",
      "alt": "Le phare des Pierres Noires par gros temps",
      "credit": "Philippe BELLARD, CC BY-SA 4.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:Les_Pierres_Noires_Phare.jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Phare_des_pierres_noires_%28Ifremer_00555-66733_-_44527%29.jpg/1280px-Phare_des_pierres_noires_%28Ifremer_00555-66733_-_44527%29.jpg",
        "caption": "Le phare aux bandes rouges et blanches.",
        "credit": "Olivier Dugornay (Ifremer), CC BY 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Phare_des_pierres_noires_(Ifremer_00555-66733_-_44527).jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Phare_des_pierres_noires_%28Ifremer_00555-66733_-_44524%29.jpg/1280px-Phare_des_pierres_noires_%28Ifremer_00555-66733_-_44524%29.jpg",
        "caption": "Le phare sur sa chaussée.",
        "credit": "Olivier Dugornay (Ifremer), CC BY 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Phare_des_pierres_noires_(Ifremer_00555-66733_-_44524).jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Phare_des_pierres_noires_%28Ifremer_00555-66733_-_44522%29.jpg/1280px-Phare_des_pierres_noires_%28Ifremer_00555-66733_-_44522%29.jpg",
        "caption": "Le phare vu de la mer.",
        "credit": "Olivier Dugornay (Ifremer), CC BY 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Phare_des_pierres_noires_(Ifremer_00555-66733_-_44522).jpg"
      }
    ]
  },
  "phare-portzic": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Le_Bresto%C3%A2_-_Presqu%27%C3%AEle_de_Crozon_-_20210719-_156.jpg/1280px-Le_Bresto%C3%A2_-_Presqu%27%C3%AEle_de_Crozon_-_20210719-_156.jpg",
      "alt": "Le phare du Portzic",
      "credit": "Thesupermat, CC BY-SA 4.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:Le_Bresto%C3%A2_-_Presqu%27%C3%AEle_de_Crozon_-_20210719-_156.jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Gezicht_op_de_vuurtoren_van_Portzic_Phare_de_Portzic_%28titel_op_object%29%2C_RP-F-2001-7-1590-27.jpg/1280px-Gezicht_op_de_vuurtoren_van_Portzic_Phare_de_Portzic_%28titel_op_object%29%2C_RP-F-2001-7-1590-27.jpg",
        "caption": "Vers 1900, le phare du Portzic.",
        "credit": "Rijksmuseum, CC0",
        "page": "https://commons.wikimedia.org/wiki/File:Gezicht_op_de_vuurtoren_van_Portzic_Phare_de_Portzic_(titel_op_object),_RP-F-2001-7-1590-27.jpg",
        "year": "v. 1900"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Le_Bresto%C3%A2_-_Presqu%27%C3%AEle_de_Crozon_-_20210719-_154.jpg/1280px-Le_Bresto%C3%A2_-_Presqu%27%C3%AEle_de_Crozon_-_20210719-_154.jpg",
        "caption": "Le phare depuis le goulet de Brest.",
        "credit": "Thesupermat, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Le_Bresto%C3%A2_-_Presqu%27%C3%AEle_de_Crozon_-_20210719-_154.jpg"
      }
    ]
  },
  "phare-saint-mathieu": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Saint-Mathieu_%2848987428723%29.jpg/1280px-Saint-Mathieu_%2848987428723%29.jpg",
      "alt": "Le phare de Saint-Mathieu",
      "credit": "Tom à la rue from France, CC BY-SA 2.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:Saint-Mathieu_(48987428723).jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Pointe_Saint_Mathieu_-_Phare.jpg/1280px-Pointe_Saint_Mathieu_-_Phare.jpg",
        "caption": "Le sémaphore, l'abbaye et le phare.",
        "credit": "JackyM59, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Pointe_Saint_Mathieu_-_Phare.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Plougonvelin_-_phare_de_Saint-Mathieu_-_in_July_2026_001.jpg/1280px-Plougonvelin_-_phare_de_Saint-Mathieu_-_in_July_2026_001.jpg",
        "caption": "La tour blanche coiffée de rouge.",
        "credit": "Thomas_Fuhrmann_Jakobsthal, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Plougonvelin_-_phare_de_Saint-Mathieu_-_in_July_2026_001.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Plougonvelin_-_phare_de_Saint-Mathieu_-_in_July_2026_002.jpg/1280px-Plougonvelin_-_phare_de_Saint-Mathieu_-_in_July_2026_002.jpg",
        "caption": "Le phare au bout de la pointe.",
        "credit": "Thomas_Fuhrmann_Jakobsthal, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Plougonvelin_-_phare_de_Saint-Mathieu_-_in_July_2026_002.jpg"
      }
    ]
  },
  "phare-sein": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Temp%C3%AAte_en_Mer_d%27Iroise.jpg/1280px-Temp%C3%AAte_en_Mer_d%27Iroise.jpg",
      "alt": "Le grand phare de l'île de Sein par gros temps",
      "credit": "Jeanmarierohou, CC BY-SA 3.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:Temp%C3%AAte_en_Mer_d%27Iroise.jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Grand_phare_de_l%27%C3%AEle_de_Sein_%285%29.jpg/1280px-Grand_phare_de_l%27%C3%AEle_de_Sein_%285%29.jpg",
        "caption": "Le grand phare et son enceinte.",
        "credit": "Gzen92, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Grand_phare_de_l%27%C3%AEle_de_Sein_(5).jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Grand_phare_de_l%27%C3%AEle_de_Sein_02.JPG/1280px-Grand_phare_de_l%27%C3%AEle_de_Sein_02.JPG",
        "caption": "Le grand phare de l'île de Sein.",
        "credit": "Havang(nl), CC0",
        "page": "https://commons.wikimedia.org/wiki/File:Grand_phare_de_l%27%C3%AEle_de_Sein_02.JPG"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/20150926_Bretagne_IleDeSein_GrandPhareDel%C3%8EleDeSein_DSC07872_PtrQs.jpg/1280px-20150926_Bretagne_IleDeSein_GrandPhareDel%C3%8EleDeSein_DSC07872_PtrQs.jpg",
        "caption": "Le phare au-dessus de la grève.",
        "credit": "PtrQs, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:20150926_Bretagne_IleDeSein_GrandPhareDel%C3%8EleDeSein_DSC07872_PtrQs.jpg"
      }
    ]
  },
  "phare-stiff": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Phare_de_Stiff.jpg/1280px-Phare_de_Stiff.jpg",
      "alt": "Le phare du Stiff",
      "credit": "Alix Choma Bex, CC BY-SA 4.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:Phare_de_Stiff.jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Vigie_du_stiff_%C3%A0_Ouessant%2C_juillet_2008.JPG/1280px-Vigie_du_stiff_%C3%A0_Ouessant%2C_juillet_2008.JPG",
        "caption": "La vigie du Stiff, à côté du phare.",
        "credit": "Eunostos, CC BY-SA 3.0",
        "page": "https://commons.wikimedia.org/wiki/File:Vigie_du_stiff_%C3%A0_Ouessant,_juillet_2008.JPG"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Vuurtoren_van_Stiff_Phare_du_Stiff_%28titel_op_object%29%2C_RP-F-2001-7-1590-22.jpg/1280px-Vuurtoren_van_Stiff_Phare_du_Stiff_%28titel_op_object%29%2C_RP-F-2001-7-1590-22.jpg",
        "caption": "Vers 1900, le phare du Stiff.",
        "credit": "Rijksmuseum, CC0",
        "page": "https://commons.wikimedia.org/wiki/File:Vuurtoren_van_Stiff_Phare_du_Stiff_(titel_op_object),_RP-F-2001-7-1590-22.jpg",
        "year": "v. 1900"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Arriv%C3%A9e_%C3%A0_Ouessant_-_dsmm03505.jpg/1280px-Arriv%C3%A9e_%C3%A0_Ouessant_-_dsmm03505.jpg",
        "caption": "L'arrivée au port du Stiff.",
        "credit": "Pmau, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Arriv%C3%A9e_%C3%A0_Ouessant_-_dsmm03505.jpg"
      }
    ]
  },
  "phare-tevennec": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/T%C3%A9vennec_01.jpg/1280px-T%C3%A9vennec_01.jpg",
      "alt": "Le phare du Tévennec par gros temps",
      "credit": "Bastenbas, CC BY-SA 4.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:T%C3%A9vennec_01.jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Tevennec.jpg/1280px-Tevennec.jpg",
        "caption": "L'îlot et le phare du Tévennec, dans le raz.",
        "credit": "Calcineur, CC BY-SA 3.0",
        "page": "https://commons.wikimedia.org/wiki/File:Tevennec.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/T%C3%A9vennec_tour.jpg/1280px-T%C3%A9vennec_tour.jpg",
        "caption": "La tour du phare.",
        "credit": "Christinarmen, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:T%C3%A9vennec_tour.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Tevennec_%C3%A9tat_de_la_terrasse.jpg/1280px-Tevennec_%C3%A9tat_de_la_terrasse.jpg",
        "caption": "La terrasse, en 2016.",
        "credit": "Christinarmen, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Tevennec_%C3%A9tat_de_la_terrasse.jpg"
      }
    ]
  },
  "phare-trezien": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Le_phare_de_Tr%C3%A9zien_vu_de_la_Pointe_de_Corsen_%2814879626215%29.jpg/1280px-Le_phare_de_Tr%C3%A9zien_vu_de_la_Pointe_de_Corsen_%2814879626215%29.jpg",
      "alt": "Le phare de Trézien",
      "credit": "Yann Caradec from Paris, France, CC BY-SA 2.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:Le_phare_de_Tr%C3%A9zien_vu_de_la_Pointe_de_Corsen_(14879626215).jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Phare_de_Tr%C3%A9zien_%28Lighthouse%29_%2814877657104%29.jpg/1280px-Phare_de_Tr%C3%A9zien_%28Lighthouse%29_%2814877657104%29.jpg",
        "caption": "Le phare au milieu de la campagne.",
        "credit": "Yann Caradec from Paris, France, CC BY-SA 2.0",
        "page": "https://commons.wikimedia.org/wiki/File:Phare_de_Tr%C3%A9zien_(Lighthouse)_(14877657104).jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Phare_de_Trezien%2C_Plouarzel%2C_Frankreich01.JPG/1280px-Phare_de_Trezien%2C_Plouarzel%2C_Frankreich01.JPG",
        "caption": "La tour de Trézien.",
        "credit": "Elrond, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Phare_de_Trezien,_Plouarzel,_Frankreich01.JPG"
      }
    ]
  },
  "phare-vieille": {
    "hero": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Pointe_du_Raz_storm_05.jpg/1280px-Pointe_du_Raz_storm_05.jpg",
      "alt": "Le phare de la Vieille par gros temps",
      "credit": "Rémih, CC BY-SA 4.0, Wikimedia Commons",
      "page": "https://commons.wikimedia.org/wiki/File:Pointe_du_Raz_storm_05.jpg"
    },
    "photos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/20120926_Bretagne_CapSizun_PhareDeLaVieille_DSC08545_PtrQs.jpg/1280px-20120926_Bretagne_CapSizun_PhareDeLaVieille_DSC08545_PtrQs.jpg",
        "caption": "La Vieille vue du Cap Sizun.",
        "credit": "PtrQs, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:20120926_Bretagne_CapSizun_PhareDeLaVieille_DSC08545_PtrQs.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Plogoff_-_phare_de_la_Vieille_-_in_July_2026_002.jpg/1280px-Plogoff_-_phare_de_la_Vieille_-_in_July_2026_002.jpg",
        "caption": "Le phare de la Vieille.",
        "credit": "Thomas_Fuhrmann_Jakobsthal, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Plogoff_-_phare_de_la_Vieille_-_in_July_2026_002.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/PhareDeLaVieille_DSC08477_BW_PtrQs.jpg/1280px-PhareDeLaVieille_DSC08477_BW_PtrQs.jpg",
        "caption": "La Vieille en noir et blanc.",
        "credit": "PtrQs, CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:PhareDeLaVieille_DSC08477_BW_PtrQs.jpg"
      }
    ]
  }
};

export const heroOf = (id, fallback = null) => MEDIA[id]?.hero || fallback;
export const photosOf = (id) => MEDIA[id]?.photos || [];
