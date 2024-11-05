import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    port: 3002
  },
  define: {
    'process.env': process.env,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      strategies: 'generateSW',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "Aventura Adventure Tours App",
        short_name: "Aventura ",
        start_url: "./",
        display: "standalone",
        background_color: "#FFFFFF",
        description: 'Aventura - Explore a World of Exciting Adventure Tours with Our Comprehensive App. This platform offers seamless booking, detailed tour information, and personalized travel experiences and online store. Discover your next adventure with ease and convenience!',
        theme_color: '#4CAF50',
        icons: [
          {
            src: "/images/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png"
          },
          {
            src: "/images/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/images/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/images/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.includes('images'),
            handler: 'CacheFirst',
            method: 'GET',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24,
                maxEntries: 100
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: ({ url }) => url.pathname.includes('packages'),
            handler: 'CacheFirst',
            method: 'GET',
            options: {
              cacheName: 'packages-api',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24,
                maxEntries: 100
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: ({ url }) => url.pathname.includes('cart'),
            handler: 'CacheFirst',
            method: 'GET',
            options: {
              cacheName: 'cart-api',
              expiration: {
                maxAgeSeconds: 60 * 30,  // Cache cart API for 30 minutes
                maxEntries: 50
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: ({ url }) => url.pathname.includes('products'),
            handler: 'CacheFirst',
            method: 'GET',
            options: {
              cacheName: 'products-api',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24,
                maxEntries: 200
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: ({ url }) => url.pathname.includes('blogs'),
            handler: 'CacheFirst',
            method: 'GET',
            options: {
              cacheName: 'blogs-api',
              expiration: {
                maxAgeSeconds: 60 * 60,  // Cache blogs for 1 hour
                maxEntries: 100
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
});
