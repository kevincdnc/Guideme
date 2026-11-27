import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource/mochiy-pop-one/latin-400.css';
import '@fontsource-variable/outfit';
import './styles.css';
import App from './App.jsx';
import { registerSW } from 'virtual:pwa-register';

// Mises à jour rapides : dès qu'une nouvelle version est publiée, l'app la récupère et se recharge.
// Vérification toutes les minutes et à chaque retour sur l'onglet.
registerSW({
  immediate: true,
  onRegisteredSW(_url, reg) {
    if (!reg) return;
    setInterval(() => reg.update(), 60 * 1000);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update(); });
  },
});

// Une seule app : l'adresse lieu/<id>/ (page générée au build pour le référencement)
// ouvre la carte avec la fiche du lieu par-dessus.
createRoot(document.getElementById('root')).render(<App />);
