// Icône pleine du set validé (tags, menu des catégories). Couleur : currentColor.
import { useId } from 'react';
import { TYPE_ICONS } from '../data/typeIcons.js';

export default function TypeIcon({ name, size = 16, className = '' }) {
  const uid = useId().replace(/[^\w-]/g, '');
  const body = TYPE_ICONS[name];
  if (!body) return null;
  return <svg className={`type-icon ${className}`} viewBox="0 0 48 48" width={size} height={size} fill="none" aria-hidden="true" dangerouslySetInnerHTML={{ __html: body.replace(/__U__/g, uid) }} />;
}
