import Img_logo_habitate from '../Images/logo-habitate.png';

export const renderWelcome = (navigateTo) => {
  const section = document.createElement('section');
  const template = `
        <img class="logo" src=${Img_logo_habitate}>
        <h1 class="welcome"> Bienvenida </h1>
        <p class="slogan"> Alimenta tu bienestar </p>
        <p class="slogan"> Alimenta tu comunidad </p>
        <button id='go-login' class="button-index"> Seguir </button>
    `;

  section.innerHTML = template;

  const buttonGoLogin = section.querySelector('#go-login');
  buttonGoLogin.addEventListener('click', () => {
    navigateTo('/login');
  });
  return section;
};
