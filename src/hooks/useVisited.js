import { useCallback, useEffect, useState } from 'react';

// Lieux marqués « déjà visité ». Préférence personnelle, gardée sur l'appareil (localStorage) ;
// l'app fonctionne normalement si le stockage n'est pas disponible (navigation privée…).
const KEY = 'guideme:visited';
const STARTED = 'guideme:started'; // l'utilisateur a déjà coché un lieu au moins une fois
const EVENT = 'guideme-visited';
let memory = null; // repli en mémoire si le stockage est indisponible

function read() {
  if (memory) return memory;
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch (e) {
    return [];
  }
}

let startedMemory = false;
function readStarted() {
  try { return startedMemory || localStorage.getItem(STARTED) === '1'; } catch (e) { return startedMemory; }
}

export function useVisited() {
  const [ids, setIds] = useState(read);
  const [started, setStarted] = useState(readStarted);

  useEffect(() => {
    const sync = () => { setIds(read()); setStarted(readStarted()); };
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync); // autres onglets
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const toggle = useCallback((id) => {
    const cur = read();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    try { localStorage.setItem(KEY, JSON.stringify(next)); memory = null; } catch (e) { memory = next; }
    startedMemory = true;
    try { localStorage.setItem(STARTED, '1'); } catch (e) { /* repli en mémoire */ }
    setIds(next);
    setStarted(true);
    window.dispatchEvent(new Event(EVENT));
    // Visité : le drapeau « je veux y aller » est retiré
    if (next.includes(id)) {
      try {
        const fav = JSON.parse(localStorage.getItem('guideme:favorites') || '[]');
        if (fav.includes(id)) { localStorage.setItem('guideme:favorites', JSON.stringify(fav.filter((x) => x !== id))); window.dispatchEvent(new Event('guideme-favorites')); }
      } catch (e) { /* stockage indisponible */ }
    }
  }, []);

  return [ids, toggle, started];
}

// Favoris (étoile) : liste personnelle, gardée sur l'appareil
const FAV = 'guideme:favorites';
const FAV_EVENT = 'guideme-favorites';
let favMemory = null;
function readFav() {
  if (favMemory) return favMemory;
  try { const v = JSON.parse(localStorage.getItem(FAV) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; }
}
export function useFavorites() {
  const [ids, setIds] = useState(readFav);
  useEffect(() => {
    const sync = () => setIds(readFav());
    window.addEventListener(FAV_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener(FAV_EVENT, sync); window.removeEventListener('storage', sync); };
  }, []);
  const toggle = useCallback((id) => {
    const cur = readFav();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    try { localStorage.setItem(FAV, JSON.stringify(next)); favMemory = null; } catch (e) { favMemory = next; }
    setIds(next);
    window.dispatchEvent(new Event(FAV_EVENT));
  }, []);
  return [ids, toggle];
}
