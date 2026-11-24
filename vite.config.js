import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Base relative : l'app fonctionne aussi bien sur guideme.bzh (racine)
// que sur une sous-adresse GitHub Pages. Navigation par hash (#/lieu/...).
export default defineConfig({
  base: './',
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: { output: { manualChunks: { maplibre: ['maplibre-gl'] } } },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'guideme.bzh — Guides du Finistère',
        short_name: 'guideme.bzh',
        description: 'Fiches de lieux du Finistère : histoire, anecdotes, archives et lecture audio.',
        lang: 'fr',
        start_url: './',
        scope: './',
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
