const Router = {
  init: () => {
    document.querySelectorAll('a.navlink').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const path = e.target.getAttribute('href');
        Router.go(path);
      });
    });
  },
  go: (path, addToHistory = true) => {
    console.log(path);
  },
};

export default Router;
