import Store from './services/Store.js';
import API from './services/API.js';
import { loadMenuData } from './services/Menu.js';

window.app = {};
app.store = Store;

window.addEventListener('DOMContentLoaded', (e) => {
  loadMenuData();
});
