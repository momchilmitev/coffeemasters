import Store from './services/Store.js';
import API from './services/API.js';
import { loadMenuData } from './services/Menu.js';
import Router from './services/Router.js';

import { DetailsPage } from './components/DetailsPage.js';
import { MenuPage } from './components/MenuPage.js';
import { OrderPage } from './components/DetailsPage.js';

window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener('DOMContentLoaded', (e) => {
  loadMenuData();
  app.router.init();
});
