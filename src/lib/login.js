import { callLoginGoogle, submitUserInfo } from './index.js';
import Img_logo_habitate from '../Images/logo-habitate.png';

export const renderLogin = (navigateTo) => {
  const section = document.createElement('section');
  const template = `
        <img class="logo" src=${Img_logo_habitate}>
        <h1 class="login"> Ingresa </h1>
        <form class="containers-button">
            <input type="email" id="email" class="input-email" placeholder="Escribe tu correo"> </input>
            <input type="password" id="pass" class="input-pass" placeholder="Escribe tu contraseña"></input>
            <button id="submit" class="button-indextwo"> Inicia sesión </button>
            </form>
            <button id="go-google" class="button-second"> Ingresar con Google </button>
            <div>
                <span class="span-login"> ¿No tienes cuenta? </span>
                <button id="go-signup" class="button-third"> Regístrate </button>   
            </div>
        `;
  section.innerHTML = template;
  const buttonGoSignup = section.querySelector('#go-signup');

  buttonGoSignup.addEventListener('click', () => {
    navigateTo('/signup');
  });
  const email = section.querySelector('#email');
  const password = section.querySelector('#pass');
  const buttonLogin = section.querySelector('#submit');
  buttonLogin.addEventListener('click', (event) => {
    event.preventDefault();
    submitUserInfo(email.value, password.value)
      .then(() => {
        navigateTo('/wall');
        /* const user = userCredential.user;
          console.log(user); */
      })
      .catch((error) => {
        // Aquí vamos a manejar los errores
        // console.log(error.message);

        if (error.code === 'auth/invalid-login-credentials') {
          alert('No se ha podido iniciar sesión. La contraseña es inválida');
        } else if (error.code === 'auth/invalid-email') {
          alert('No se ha podido iniciar sesión. Ingresa un correo válido');
        }
      });
  });

  const buttonGoogleL = section.querySelector('#go-google');
  buttonGoogleL.addEventListener('click', () => {
    callLoginGoogle()
      .then(() => {
        navigateTo('/wall');
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        /* const user = result.user;
        console.log(user); */
      })
      .catch(() => {
        // Aquí vamos a manejar los errores
        // console.log(error.message);
      });
  });

  return section;
};
