const assets = [
  '/',
  'styles.css',
  'app.js',
  'sw-register.js',
  'data/menu.json',
  'images/blackamericano.png',
  'images/blacktea.png',
  'images/cappuccino.png',
  'images/coldbrew.png',
  'images/croissant.png',
  'images/flatwhite.png',
  'images/frappuccino.png',
  'images/greentea.png',
  'images/icedcoffee.png',
  'images/macchiato.png',
  'images/muffin.png',
  'components/CartItem.js',
  'components/DetailsPage.css',
  'components/DetailsPage.js',
  'components/MenuPage.css',
  'components/MenuPage.js',
  'components/OrderPage.css',
  'components/OrderPage.js',
  'components/ProductItem.js',
];

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open('assets').then((cache) => {
      cache.addAll(assets);
    }),
  );
});

// Cache first strategy
self.addEventListener('fetch', async (event) => {
  event.respondWith(
    caches.open('assets').then((cache) => {
      cache.match(event.request).then((cachedAsset) => {
        if (cachedAsset) {
          return cachedAsset;
        } else {
          return fetch(event.request);
        }
      });
    }),
  );
});

// Network first strategy
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     fetch(event.request) // I go to the network ALWAYS
//       .catch((error) => {
//         // if the network is down, I go to the cache
//         return caches.open('assets').then((cache) => {
//           return cache.match(request);
//         });
//       }),
//   );
// });

// State while revalidate strategy
// self.addEventListener('fetch', event => {
//    event.respondWith(
//        caches.match(event.request)
//            .then( response => {
//                // Even if the response is in the cache, we fetch it
//                // and update the cache for future usage
//                const fetchPromise = fetch(event.request).then(
//                     networkResponse => {
//                        caches.open("assets").then( cache => {
//                            cache.put(event.request, networkResponse.clone());
//                            return networkResponse;
//                        });
//                    });
//                // We use the currently cached version if it's there
//                return response || fetchPromise; // cached or a network fetch
//            })
//        );
//    });
