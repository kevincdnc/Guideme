import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import prerender from './scripts/prerender.mjs';

// Adresse publique du site. Par défaut GitHub Pages (/Guideme/) ; pour guideme.bzh :
//   GUIDEME_BASE=/ GUIDEME_SITE=https://guideme.bzh/ npm run build
const BASE = process.env.GUIDEME_BASE || '/Guideme/';
const SITE = process.env.GUIDEME_SITE || `https://kevincdnc.github.io${BASE}`;

// Carte : BASE (#/lieu/<id> ouvre la fiche en panneau).
// Fiche complète : BASE + lieu/<id>/ (vraie page HTML, générée au build pour le référencement).
export default defineConfig({
  base: BASE,
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: { output: { manualChunks: { maplibre: ['maplibre-gl'] } } },
  },
  plugins: [
    react(),
    prerender({ base: BASE, site: SITE }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false, // enregistrement fait dans main.jsx (mise à jour immédiate)
      includeAssets: ['icons/icon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'guideme.bzh — Guides du Finistère',
        short_name: 'guideme.bzh',
        description: 'Fiches de lieux du Finistère : histoire, anecdotes, archives et lecture audio.',
        lang: 'fr',
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#fbfaf6',
        theme_color: '#fbfaf6',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        // Les pages de lieux sont de vraies pages : ne pas les remplacer par la carte
        navigateFallbackDenylist: [/\/lieu\//],
        // Hors ligne : tuiles de carte et images d'archives déjà vues restent disponibles
        // (utile à la Pointe du Raz, où le réseau est faible).
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/(tiles\.openfreemap\.org|elevation-tiles-prod\.s3\.amazonaws\.com)\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'map-tiles',
              expiration: { maxEntries: 3000, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/upload\.wikimedia\.org\/.*\.(jpe?g|png|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'archive-images',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
