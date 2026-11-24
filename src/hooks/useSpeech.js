import { useCallback, useEffect, useRef, useState } from 'react';

// Lecture audio d'une fiche avec la synthèse vocale du navigateur (Web Speech API).
// Le texte est lu bloc par bloc : on sait ainsi quel paragraphe surligner,
// on peut passer au suivant, et on évite la coupure des longs textes sous Chrome.

const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

// Voix françaises les plus naturelles selon les plateformes, par ordre de préférence.
const PREFERRED = [/natural/i, /neural/i, /premium/i, /enhanced/i, /google/i, /audrey/i, /amélie|amelie/i, /thomas/i, /denise/i, /henri/i];

function pickVoice(voices) {
  const fr = voices.filter((v) => /^fr(-|_|$)/i.test(v.lang));
  if (!fr.length) return null;
  const frFR = fr.filter((v) => /fr[-_]FR/i.test(v.lang));
  const pool = frFR.length ? frFR : fr;
  for (const re of PREFERRED) {
    const v = pool.find((x) => re.test(x.name));
    if (v) return v;
  }
  return pool.find((v) => v.localService) || pool[0];
}

export function useSpeech(blocks) {
  const [state, setState] = useState('idle'); // idle | playing | paused
  const [index, setIndex] = useState(0);
  const [rate, setRate] = useState(1);
  const [voice, setVoice] = useState(null);
  const [error, setError] = useState(null);
  const indexRef = useRef(0);
  const rateRef = useRef(1);
  const stateRef = useRef('idle');
  const tokenRef = useRef(0);

  useEffect(() => {
    if (!supported) return;
    const load = () => setVoice(pickVoice(window.speechSynthesis.getVoices()));
    load();
    window.speechSynthesis.addEventListener?.('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', load);
  }, []);

  const setS = (s) => { stateRef.current = s; setState(s); };

  const speakFrom = useCallback((i) => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    const token = ++tokenRef.current;
    synth.cancel();
    if (i >= blocks.length) { setS('idle'); indexRef.current = 0; setIndex(0); return; }
    indexRef.current = i;
    setIndex(i);
    setS('playing');
    setError(null);
    const u = new SpeechSynthesisUtterance(blocks[i].text);
    u.lang = 'fr-FR';
    if (voice) u.voice = voice;
    u.rate = rateRef.current;
    u.onend = () => {
      if (token !== tokenRef.current || stateRef.current !== 'playing') return;
      speakFrom(i + 1);
    };
    u.onerror = (e) => {
      if (token !== tokenRef.current) return;
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      setError("La lecture audio n'est pas disponible sur cet appareil. Vérifiez qu'une voix française est installée dans les réglages de synthèse vocale.");
      setS('idle');
    };
    synth.speak(u);
  }, [blocks, voice]);

  const play = useCallback((i) => speakFrom(typeof i === 'number' ? i : indexRef.current), [speakFrom]);

  // « Pause » : on coupe et on reprendra au début du paragraphe en cours.
  // (speechSynthesis.pause() est peu fiable sur Android et Chrome.)
  const pause = useCallback(() => {
    if (!supported) return;
    tokenRef.current++;
    window.speechSynthesis.cancel();
    setS('paused');
  }, []);

  const stop = useCallback(() => {
    if (!supported) return;
    tokenRef.current++;
    window.speechSynthesis.cancel();
    indexRef.current = 0;
    setIndex(0);
    setS('idle');
  }, []);

  const next = useCallback(() => speakFrom(Math.min(indexRef.current + 1, blocks.length)), [speakFrom, blocks.length]);
  const prev = useCallback(() => speakFrom(Math.max(indexRef.current - 1, 0)), [speakFrom]);

  const changeRate = useCallback((r) => {
    rateRef.current = r;
    setRate(r);
    if (stateRef.current === 'playing') speakFrom(indexRef.current);
  }, [speakFrom]);

  // Arrêt propre quand on quitte la fiche
  useEffect(() => () => { if (supported) { tokenRef.current++; window.speechSynthesis.cancel(); } }, []);

  return { supported, error, state, index, rate, voice, play, pause, stop, next, prev, changeRate, total: blocks.length };
}
