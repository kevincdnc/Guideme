import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/sora';
import './styles.css';
import App from './App.jsx';
import Guide from './components/Guide.jsx';
import { getPlace } from './data/places.js';

// BASE + lieu/<id>/ : page complète d'un lieu (générée en HTML au build, puis rendue ici).
// Toute autre adresse : la carte.
const BASE = import.meta.env.BASE_URL;
const m = location.pathname.slice(BASE.length - 1).match(/^\/lieu\/([\w-]+)\/?$/);
const page = m && getPlace(m[1])?.available ? getPlace(m[1]) : null;

const root = createRoot(document.getElementById('root'));
if (page) {
  document.title = `${page.title} · guideme.bzh`;
  root.render(<div className="page-root"><Guide place={page} variant="page" /></div>);
} else {
  root.render(<App />);
}
