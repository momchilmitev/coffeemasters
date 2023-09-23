const Store = {
  menu: null,
  cart: [],
};

const proxiedStore = new Proxy(Store, {
  set(target, prop, value) {
    target[prop] = value;

    if (prop == 'menu') {
      dispatchEvent(new Event('appmenuchange'));
    }

    if (prop == 'cart') {
      dispatchEvent(new Event('appcartchange'));
    }
  },
});

export default proxiedStore;
