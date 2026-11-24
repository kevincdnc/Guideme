import { useState } from 'react';
import Icon from './Icon.jsx';

// Image avec repli discret si le fichier ne charge pas (réseau faible, serveur indisponible)
export default function SafeImg({ src, alt, className, ...rest }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className={`img-fallback ${className || ''}`} role="img" aria-label={alt}>
        <Icon name="image" size={22} />
      </span>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} {...rest} />;
}
