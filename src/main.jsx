import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/sora';
import './styles.css';
import App from './App.jsx';

// Une seule app : l'adresse lieu/<id>/ (page générée au build pour le référencement)
// ouvre la carte avec la fiche du lieu par-dessus.
createRoot(document.getElementById('root')).render(<App />);
