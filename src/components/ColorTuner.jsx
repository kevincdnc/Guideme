// TEMPORAIRE : réglage de la couleur de fond de la carte (mer ou terre), le temps de choisir
// une couleur définitive. À retirer ensuite (et l'import dans App.jsx).
import { useEffect, useState } from 'react';

const KEY = 'guideme:tuner';
const TARGETS = {
  mer: { label: 'Mer', def: '#7fb9f0' },
  terre: { label: 'Terre', def: '#eef6dc' },
};
const HEX = /^#[0-9a-f]{6}$/i;

// Éclaircit une couleur (pour le liseré des côtes)
function lighten(hex, k) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(v + (255 - v) * k));
  return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
}

function apply(map, target, hex) {
  if (!map || !HEX.test(hex)) return;
  try {
    if (target === 'mer') {
      map.setPaintProperty('water', 'fill-color', hex);
      if (map.getLayer('water_shallow')) map.setPaintProperty('water_shallow', 'line-color', lighten(hex, 0.45));
      map.getContainer().style.background = hex;
    } else {
      map.setPaintProperty('background', 'background-color', hex);
    }
  } catch (e) { /* style pas encore chargé */ }
}

export default function ColorTuner({ open = true }) {
  const [target, setTarget] = useState('mer');
  const [colors, setColors] = useState(() => {
    try { return { mer: TARGETS.mer.def, terre: TARGETS.terre.def, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch (e) { return { mer: TARGETS.mer.def, terre: TARGETS.terre.def }; }
  });
  const [text, setText] = useState(colors[target]);
  const hex = colors[target];

  // Applique les couleurs dès que la carte est prête
  useEffect(() => {
    let t;
    const run = () => {
      const map = document.querySelector('.map')?.__map;
      if (!map || !map.isStyleLoaded()) { t = setTimeout(run, 400); return; }
      Object.entries(colors).forEach(([k, v]) => apply(map, k, v));
    };
    run();
    try { localStorage.setItem(KEY, JSON.stringify(colors)); } catch (e) { /* stockage indisponible */ }
    return () => clearTimeout(t);
  }, [colors]);
  useEffect(() => setText(colors[target]), [target]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (v) => {
    setText(v);
    const h = v.startsWith('#') ? v : `#${v}`;
    if (HEX.test(h)) setColors((c) => ({ ...c, [target]: h.toLowerCase() }));
  };
  const pickFromScreen = async () => {
    try { const r = await new window.EyeDropper().open(); set(r.sRGBHex); } catch (e) { /* annulé */ }
  };

  const resetAll = () => { setColors({ mer: TARGETS.mer.def, terre: TARGETS.terre.def }); setText(TARGETS[target].def); };
  if (!open) return null;
  return (
    <div className="tuner" role="group" aria-label="Couleur de fond de la carte (réglage temporaire)">
      <div className="tuner-tabs">
        {Object.entries(TARGETS).map(([k, t]) => (
          <button key={k} className={target === k ? 'is-active' : ''} onClick={() => setTarget(k)}>{t.label}</button>
        ))}
      </div>
      <div className="tuner-row">
        <label className="tuner-swatch" style={{ background: hex }} title="Choisir une couleur">
          <input type="color" value={hex} onChange={(e) => set(e.target.value)} aria-label="Pipette de couleur" />
        </label>
        <input className="tuner-hex" value={text} onChange={(e) => set(e.target.value.trim())} spellCheck="false" maxLength={7} aria-label="Couleur hexadécimale" />
        {'EyeDropper' in window && (
          <button className="tuner-eye" onClick={pickFromScreen} title="Prélever une couleur à l'écran" aria-label="Prélever une couleur à l'écran">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4.5l5 5M17 2.5a2.1 2.1 0 013 3l-3 3-3-3z" /><path d="M14 6.5L5.5 15l-1 4.5 4.5-1L17.5 10" /></svg>
          </button>
        )}
        <button className="tuner-reset" onClick={() => set(TARGETS[target].def)} title="Couleur d'origine">↺</button>
      </div>
      <button className="tuner-default" onClick={resetAll}>Thème par défaut (mer et terre)</button>
    </div>
  );
}
