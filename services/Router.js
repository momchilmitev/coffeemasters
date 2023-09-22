const Router = {
  init: () => {
    document.querySelectorAll('a.navlink').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const path = e.target.getAttribute('href');
        Router.go(path);
      });
    });

    // Handler for URL change
    window.addEventListener('popstate', (e) => {
      Router.go(e.state.path, false);
    });

    // Check the initial path
    Router.go(location.pathname);
  },
  go: (path, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ path }, null, path);
    }

    let component = null;

    switch (path) {
      case '/':
        component = document.createElement('menu-page');
        break;
      case '/order':
        component = document.createElement('order-page');
        break;
      default:
        if (path.startsWith('/details-')) {
          component = document.createElement('details-page');
          const param = path.substring(path.lastIndexOf('-') + 1);
          component.dataset.id = param;
        }
        component = document.createElement('h1');
        component.textContent = 'Not found';
        break;
    }

    const outlet = document.querySelector('main');
    outlet.innerHTML = '';
    outlet.appendChild(component);
    window.scrollX = 0;
    window.scrollY = 0;
  },
};

export default Router;
