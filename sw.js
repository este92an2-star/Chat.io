/* Service worker — Messagerie
   Mise a jour automatique :
   - "reseau d'abord" : quand il y a Internet, la derniere version est toujours affichee ;
   - repli sur le cache quand on est hors ligne ;
   - skipWaiting + clients.claim : une nouvelle version devient active immediatement,
     et la page se recharge toute seule (pas besoin de desinstaller/reinstaller). */
const CACHE = "messagerie-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./call.html",
  "./admin.html",
  "./connection.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./404.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    // Supprime les anciens caches (versions precedentes) pour liberer la place.
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  // Les requetes vers Firebase (base, CDN) passent directement : rien a mettre en cache.
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    try {
      const fresh = await fetch(event.request);
      if (fresh && fresh.ok) {
        const cache = await caches.open(CACHE);
        cache.put(event.request, fresh.clone());
      }
      return fresh;
    } catch {
      const cached = await caches.match(event.request);
      return cached || caches.match("./index.html");
    }
  })());
});
