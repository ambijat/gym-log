const VERSION = "v15";
const CACHE_PREFIX = "ds5-";
const APP_CACHE = `${CACHE_PREFIX}workout-${VERSION}`;
const RUNTIME_CACHE = `${CACHE_PREFIX}runtime-${VERSION}`;
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-192-maskable.png",
  "./icons/icon-512-maskable.png",
  "./assets/ex/bench-press.webp",
  "./assets/ex/bird-dog.webp",
  "./assets/ex/cable-crossover.webp",
  "./assets/ex/cable-crunch.webp",
  "./assets/ex/cable-flyes.webp",
  "./assets/ex/chest-supported-dumbbell-row.webp",
  "./assets/ex/close-grip-pulldown.webp",
  "./assets/ex/dead-bug.webp",
  "./assets/ex/dumbbell-flyes-pullovers.webp",
  "./assets/ex/face-pulls.webp",
  "./assets/ex/front-lat-raises.webp",
  "./assets/ex/hammer-curl.webp",
  "./assets/ex/hamstring-curl.webp",
  "./assets/ex/incline-dumbbell-press.webp",
  "./assets/ex/lat-pulldown.webp",
  "./assets/ex/leg-extension.webp",
  "./assets/ex/lunges-walking.webp",
  "./assets/ex/machine-shoulder-press.webp",
  "./assets/ex/overhead-rope-extension.webp",
  "./assets/ex/pallof-press.webp",
  "./assets/ex/plank.webp",
  "./assets/ex/reverse-pec-dec.webp",
  "./assets/ex/skierg.webp",
  "./assets/ex/squat-half.webp",
  "./assets/ex/tricep-pushdown.webp",
  "./screenshots/log-mobile.png",
  "./screenshots/log-wide.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX))
          .filter((key) => key !== APP_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (request.url.startsWith("http")) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (await caches.match(request))
      || (await caches.match("./index.html"))
      || (await caches.match("./"));
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const update = fetch(request)
    .then(async (response) => {
      if (response.ok || response.type === "opaque") {
        const cache = await caches.open(RUNTIME_CACHE);
        await cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || update;
}
