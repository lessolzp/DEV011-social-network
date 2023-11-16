import { cerrarSesion, auth } from './index.js';

export const renderHome = (navigateTo) => {
  const section = document.createElement('section');

  const template = `
    <img class="logo-home" src="Images/logo_habitate_largo.png">
    <section class="log-display">
       <button id="log-out" class="log-out" name="logout">
            <img src="Images/logout_habitate.png" class="logout-images">
        </button>
        <h2 class="title-home"> ¿Qué quieres ver?</h2>
        <div class="buttons">
           <div class="up">
            <button id="button-recipes" class="button-recipes" name="recetas" > 
                <img src="Images/recetas_habitate.png" class="home-images">
                <span> Recetas </span>
            </button>  
            <button id="button-remedies" class="button-remedies" name="remedios" > 
                <img src="Images/remedios_habitate.png" class="home-images">
                <span> Remedios Caseros </span>
            </button>
           </div>
           <div class="down">
            <button id="button-habits" class="button-habits" name="habitos" > 
                <img src="Images/habitos_habitate.png" class="home-images">
                <span> Hábitos Saludables </span>
            </button>
           </div>
        </div>
        </section>
    `;

  auth.onAuthStateChanged((user) => {
    console.log(user);
    const displaySection = section.querySelector('.log-display');
    if (user) {
      section.innerHTML = template;
      // displaySection.style.display = 'block';
      const buttonLogOut = section.querySelector('#log-out');
      buttonLogOut.addEventListener('click', () => {
        cerrarSesion();
        navigateTo('/');
      });

      const buttonGoWallRecipes = section.querySelector('#button-recipes');
      buttonGoWallRecipes.addEventListener('click', () => {
        navigateTo('/wall');
      });
      const buttonGoWallRemedies = section.querySelector('#button-remedies');
      buttonGoWallRemedies.addEventListener('click', () => {
        navigateTo('/wall');
      });
      const buttonGoWallHabits = section.querySelector('#button-habits');
      buttonGoWallHabits.addEventListener('click', () => {
        navigateTo('/wall');
      });
    } else {
      // displaySection.style.display = 'none';
      const displayNoLog = document.createElement('div');
      displayNoLog.className = 'log-out-display';
      displayNoLog.style.display = 'block';
      const messageNoLog = document.createElement('p');
      messageNoLog.innerText = 'Es necesario que inicies sesión para ver el contenido';
      const buttonGoLogin = document.createElement('button');
      buttonGoLogin.innerText = 'Inicia Sesión';
      buttonGoLogin.id = 'go-login';
      buttonGoLogin.className = 'button-second';
      displayNoLog.append(messageNoLog, buttonGoLogin);
      section.insertBefore(displayNoLog, displaySection);
      buttonGoLogin.addEventListener('click', () => {
        navigateTo('/login');
      });
    }
  });
  // };

  return section;
};

/* <div class="log-out-display">
      <p> Es necesario que inicies sesión para ver el contenido </p>
      <button id="go-login" class="button-second"> Inicia Sesión </button>
    </div> */
