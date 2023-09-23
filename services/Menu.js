import API from './API.js';

export async function loadMenuData() {
  app.store.menu = await API.getMenu();
}

export async function getItemById(id) {
  if (app.store.menu == null) {
    await loadMenuData();
  }

  for (const c of app.store.menu) {
    for (const p of c.products) {
      if (p.id == id) {
        return p;
      }
    }
  }

  return null;
}
