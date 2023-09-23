import { getItemById } from './Menu.js';

export async function addToCart(id) {
  const product = await getItemById(id);
  const itemExists = app.store.cart.find((p) =>
    p.product.id == id ? true : false,
  );

  if (itemExists) {
    app.store.cart = app.store.cart.map((p) => {
      if (p.product.id == id) {
        return { ...p, quantity: p.quantity + 1 };
      } else {
        return p;
      }
    });
  } else {
    app.store.cart = [...app.store.cart, { product, quantity: 1 }];
  }
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter((p) => p.product.id !== id);
}
