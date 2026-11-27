import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource/mochiy-pop-one/latin-400.css';
import '@fontsource-variable/rubik';
import './studio.css';
import Studio from './Studio.jsx';

createRoot(document.getElementById('studio')).render(<Studio />);
