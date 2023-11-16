import { callLoginGoogle, submitNewUserInfo } from './index.js';
import Img_logo_habitate from '../Images/logo-habitate.png';

export const renderSignup = (navigateTo) => {
  const section = document.createElement('section');
  const template = `
        <img class="logo" src=${Img_logo_habitate}>
        <h1 class="signup"> Registrate </h1>
        <form class="containers-button">
             <input type ="email" id="email" class="input-email" autocomplete="on" placeholder="Escribe tu correo"> </input>
             <input type ="password" id="pass" class="input-pass" placeholder="Escribe tu contraseña"></input>
            <button id="submit-sign-in" class="button-indextwo"> Regístrarse </button>
        </form>
        <button id="go-google-s" class="button-second"> Registrate con Google </button>
        <div>
            <span class="span-login"> ¿Ya tienes cuenta? </span>
            <button id="go-login" class="button-third"> Inicia Sesión </button>
        </div>
    `;
  section.innerHTML = template;

  const email = section.querySelector('#email');
  const password = section.querySelector('#pass');
  const buttonSignup = section.querySelector('#submit-sign-in');
  buttonSignup.addEventListener('click', (event) => {
    console.log('se le dio click');
    event.preventDefault();
    submitNewUserInfo(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email);
        navigateTo('/wall');
        // ...
      }).catch((error) => {
        // Aquí vamos a manejar los errores
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use') {
          alert('Este correo ya está registrado. Ve a log in para iniciar sesión');
        } else if (error.code === 'auth/weak-password') {
          alert('No se puede iniciar sesión. La contraseña debe tener por lo menos 6 caracteres');
        } else if (error.code === 'auth/invalid-email') {
          alert('No se pudo iniciar sesión. Introduce un email válido');
        }
      });
  });
  const buttonGoSignup = section.querySelector('#go-login');
  buttonGoSignup.addEventListener('click', () => {
    navigateTo('/login');
  });
  const buttonGoogleS = section.querySelector('#go-google-s');
  buttonGoogleS.addEventListener('click', () => {
    callLoginGoogle()
      .then((result) => {
        navigateTo('/wall');
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
      }).catch((error) => {
        // Handle Errors here.
        console.log(error.message);
      });
  });
  return section;
};
