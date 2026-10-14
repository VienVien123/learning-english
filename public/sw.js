// TV-English service worker: makes the app installable, opens instantly from cache,
// and keeps the last copy of your decks/words so they can be read while offline.
const VERSION = "tv-english-v1";
const STATIC_CACHE = `${VERSION}-static`;
const DATA_CACHE = `${VERSION}-data`;
const PRECACHE = ["/", "/manifest.webmanifest", "/icon.svg", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => !key.startsWith(VERSION)).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

// Signing out clears cached vocabulary so the next person on this device can't read it offline.
self.addEventListener("message", (event) => {
  if (event.data?.type === "clear-data") event.waitUntil(caches.delete(DATA_CACHE));
});

async function networkFirst(request, cacheName, fallbackUrl) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = (await cache.match(request)) || (fallbackUrl && (await cache.match(fallbackUrl)));
    if (cached) return cached;
    throw err;
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // Supabase table reads: fresh when online, last saved copy when offline.
  if (url.hostname.endsWith(".supabase.co") && url.pathname.startsWith("/rest/v1/")) {
    event.respondWith(networkFirst(request, DATA_CACHE));
    return;
  }
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  // Build output has hashed file names, so it never changes once cached.
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/") || url.pathname.startsWith("/templates/")) {
    event.respondWith(cacheFirst(request));
    return;
  }
  // Pages: try the network, fall back to the cached app shell.
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, STATIC_CACHE, "/"));
  }
});
