const Router = {
  init: () => {
    document.querySelectorAll('a.navlink').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const path = e.target.getAttribute('href');
        Router.go(path);
      });
    });

    // Check the initial path
    Router.go(location.pathname);
  },
  go: (path, addToHistory = true) => {
    console.log(path);

    if (addToHistory) {
      history.pushState({ path }, null, path);
    }

    let component = null;

    switch (path) {
      case '/':
        component = document.createElement('h1');
        component.textContent = 'Hi from the HOME page.';
        break;
      case '/order':
        component = document.createElement('h1');
        component.textContent = 'Hi from your cart.';
        break;
      default:
        if (path.startsWith('/details-')) {
          component = document.createElement('h1');
          component.textContent = 'Details page';
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
