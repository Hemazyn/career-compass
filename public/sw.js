/* Career Compass service worker
 * Strategy:
 *  - Precache only the offline shell, manifest and icons on install. Fetching
 *    every top page at install would saturate a slow mobile connection right
 *    after first load — pages are instead cached in the runtime cache as the
 *    student visits them.
 *  - Navigations: cache-first (stale-while-revalidate), so the app shows
 *    instantly when launched from the home screen; the page is refreshed in
 *    the background on each visit. Offline falls back to /offline.html.
 *  - Same-origin assets (hashed _next chunks, images, fonts): stale-while-revalidate.
 *  - Cross-origin requests are never cached.
 *
 * After an online visit to any page, it works fully offline.
 */
const CACHE_PREFIX = "career-compass";
const PRECACHE_CACHE = `${CACHE_PREFIX}-precache-v4`;
const RUNTIME_CACHE = `${CACHE_PREFIX}-runtime-v4`;

// Offline essentials. Everything else is cached on first visit (runtime cache).
const PRECACHE_URLS = [
  "/offline.html",
  "/manifest.webmanifest",
  "/app-icon-192.png",
  "/app-icon-512.png",
  "/apple-touch-icon-180.png",
  "/",
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

  // Navigations: serve the cached page instantly, refresh it in the
  // background, and fall back to the offline page when the network fails.
  if (request.mode === "navigate") {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            if (response && response.ok) {
              const copy = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
            }
            return response;
          })
          .catch(() => cached || caches.match("/offline.html"));
        return cached || network;
      })
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

