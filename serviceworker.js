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
  caches.open('assets').then((cache) => {
    cache.addAll(assets);
  });
});

self.addEventListener('fetch', async (event) => {
  // TODO
});
