/*
 * Judo score board service worker
 * Online: always loads the newest version from the server and keeps a copy.
 * Offline (or no answer within NETWORK_TIMEOUT_MS): serves the kept copy,
 * so the scoreboard still loads and reloads without internet connection.
 */
var CACHE = "judoscore";
var NETWORK_TIMEOUT_MS = 5000;
var PRECACHE = ["./", "./score.html", "./manifest.webmanifest", "./icon.svg"];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE)
            .then(function (cache) { return cache.addAll(PRECACHE); })
            .then(function () { return self.skipWaiting(); })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function (event) {
    var url = new URL(event.request.url);

    // only own files; Google sheet requests etc. go straight to the network
    if (event.request.method !== "GET" || url.origin !== self.location.origin)
        return;

    // cache key without query string, so links with ?sheetId=... work offline too
    var key = url.origin + url.pathname;

    var network = fetch(key, { cache: "no-cache" }).then(function (response) {
        if (response.ok) {
            var copy = response.clone();
            return caches.open(CACHE)
                .then(function (cache) { return cache.put(key, copy); })
                .then(function () { return response; });
        }
        return response;
    });
    event.waitUntil(network.catch(function () { }));

    event.respondWith(new Promise(function (resolve, reject) {
        function fromCache() {
            return caches.match(key).then(function (cached) {
                if (cached)
                    resolve(cached);
                return cached;
            });
        }

        // slow network (e.g. wifi without internet): use the cached copy
        var timer = setTimeout(fromCache, NETWORK_TIMEOUT_MS);

        network.then(function (response) {
            clearTimeout(timer);
            resolve(response);
        }, function (error) {
            clearTimeout(timer);
            fromCache().then(function (cached) {
                if (!cached)
                    reject(error);
            });
        });
    }));
});
