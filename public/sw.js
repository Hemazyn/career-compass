/* Career Compass service worker
 * Strategy:
 *  - Precache the offline fallback, manifest, icons, and the most useful pages
 *    (home, tools, and the top-ranked careers) on install.
 *  - Navigations: network-first, falling back to the cache, then to /offline.html.
 *  - Same-origin assets (hashed _next chunks, images, fonts): stale-while-revalidate.
 *  - Cross-origin requests are never cached.
 *
 * After an online visit to any page, its assets are cached, so visited pages
 * work fully offline. Precached top pages are available offline immediately.
 */
const CACHE_PREFIX = "career-compass";
const PRECACHE_CACHE = `${CACHE_PREFIX}-precache-v3`;
const RUNTIME_CACHE = `${CACHE_PREFIX}-runtime-v3`;

// Offline essentials + the pages students open most (top-ranked careers).
const PRECACHE_URLS = [
  "/offline.html",
  "/manifest.webmanifest",
  "/app-icon-192.png",
  "/app-icon-512.png",
  "/apple-touch-icon-180.png",
  "/icon.svg",
  "/",
  "/careers",
  "/quiz",
  "/check",
  "/roadmap",
  "/pivot",
  "/resources",
  "/saved",
  "/faq",
  "/about",
  "/careers/aeronautical-engineer",
  "/careers/aerospace-engineer",
  "/careers/quantum-physicist",
  "/careers/neuroscientist",
  "/careers/ai-ml-engineer",
  "/careers/data-scientist",
  "/careers/neurosurgeon",
  "/careers/pilot",
  "/careers/robotics-engineer",
  "/careers/cybersecurity-engineer",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE_CACHE)
      .then((cache) =>
        // Add each URL individually so one failure doesn't fail the whole install
        Promise.all(
          PRECACHE_URLS.map((url) =>
            fetch(url)
              .then((response) => {
                if (response && response.ok) cache.put(url, response);
              })
              .catch(() => {})
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX) && key !== PRECACHE_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations: try the network first, fall back to cache, then offline page
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match("/offline.html"))
        )
    );
    return;
  }

  // Same-origin assets: serve from cache while updating in the background
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

