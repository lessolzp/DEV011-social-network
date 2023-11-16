import { renderWelcome } from './lib/welcome.js';
import { renderLogin } from './lib/login.js';
import { renderSignup } from './lib/signup.js';
import { renderHome } from './lib/home.js';
import { renderWall } from './lib/wall.js';
import { renderError } from './lib/error.js';

const routes = [
  { path: '/', component: renderWelcome },
  { path: '/login', component: renderLogin },
  { path: '/signup', component: renderSignup },
  { path: '/home', component: renderHome },
  { path: '/wall', component: renderWall },
  { path: '/error', component: renderError },
];

const defaultRoute = '/';
const root = document.getElementById('root');

export function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);

  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );

    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navigateTo));
  } else {
    navigateTo('/error');
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
