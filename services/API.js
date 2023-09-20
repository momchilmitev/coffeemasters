const API = {
  url: '/data/menu.json',
  getMenu: async () => {
    return await (await fetch(API.url)).json();
  },
};

export default API;
