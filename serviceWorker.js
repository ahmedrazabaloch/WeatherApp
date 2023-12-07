const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/images/cloud.png",
  "/images/drop.gif",
  "/images/eye.gif",
  "/images/global-warming.gif",
  "/images/mazar-e-quaid.png",
  "/images/wind.gif",
  "/images/search-icon.png",
  "/images/cloud1.png",
  "/images/cloud2.png",
  "/images/cloud3.png",
  "/images/cloud4.png",
  "/images/cloud5.png",
  "/weatherConditionImg/clear-day.svg",
  "/weatherConditionImg/cloudy-day.svg",
  "/weatherConditionImg/cloudy-night.svg",
  "/weatherConditionImg/day-rain.svg",
  "/weatherConditionImg/day-smoke.svg",
  "/weatherConditionImg/haze-day.svg",
  "/weatherConditionImg/haze-night.svg",
  "/weatherConditionImg/night-rain.svg",
  "/weatherConditionImg/night-smoke.svg",
  "/weatherConditionImg/snow.svg",
  "/weatherConditionImg/thunderstorms-day-rain.svg",
];

const myCache = "Weather_Forecast";

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async function () {
      const cache = await caches.open(myCache);
      await cache.addAll(["/"]);
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async function () {
      const cache = await caches.open(myCache);
      const cacheNames = await cache.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
    })()
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async function () {
      const networkPromise = fetch(event.request);
      const cachePromise = caches.open(myCache);

      try {
        const networkResponse = await networkPromise;
        cachePromise.then((cache) => {
          cache.put(event.request, networkResponse);
        });
        return networkResponse.clone();
      } catch (error) {
        const cache = await cachePromise;
        const cacheResponse = await cache.match(event.request);
        return cacheResponse;
      }
    })()
  );
});
