import Store from './services/Store.js';
import API from './services/API.js';
import { loadMenuData } from './services/Menu.js';
import Router from './services/Router.js';

import { DetailsPage } from './components/DetailsPage.js';
import { MenuPage } from './components/MenuPage.js';
import { OrderPage } from './components/OrderPage.js';
import { ProductItem } from './components/ProductItem.js';
import { CartItem } from './components/CartItem.js';

window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener('DOMContentLoaded', (e) => {
  loadMenuData();
  app.router.init();

  if ('share' in navigator) {
    const shareButton = document.getElementById('share-button');
    shareButton.addEventListener('click', (e) => {
      navigator.share({
        title: 'Coffemasters',
        text: 'https://coffemasters.com',
      });
    });
  } else {
    shareButton.style.display = 'none';
  }
});

window.addEventListener('appcartchange', (e) => {
  const badge = document.getElementById('badge');
  const qty = app.store.cart.reduce((acc, p) => acc + p.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
