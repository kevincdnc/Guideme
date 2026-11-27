// Brouillons du studio : corrections de fiches gardées dans le navigateur (localStorage),
// appliquées au site en mode aperçu (?preview=1) avant d'être publiées.
export const DRAFTS_KEY = 'guideme:studio:drafts';
// Champs modifiables depuis le studio
export const EDIT_KEYS = ['title', 'shortTitle', 'commune', 'tags', 'teaser', 'facts', 'funFact', 'records', 'sections', 'hero', 'practical', 'sources'];

export function readDrafts() {
  try { return JSON.parse(localStorage.getItem(DRAFTS_KEY) || '{}'); } catch { return {}; }
}
export function writeDrafts(d) {
  try { localStorage.setItem(DRAFTS_KEY, JSON.stringify(d)); } catch { /* stockage indisponible */ }
}
export function pick(place) {
  return Object.fromEntries(EDIT_KEYS.filter((k) => place[k] !== undefined).map((k) => [k, place[k]]));
}
