import {
  addPost, renderRealTime, deletePost, addLike, authUser, editPost, auth, cerrarSesion, uploadFile,
} from './index.js';
import Img_logo_habitate_largo from '../Images/logo_habitate_largo.png';
import Img_refresh from '../Images/refresh_posts.png';
import Img_logout from '../Images/logout_habitate.png';
import Img_recetas from '../Images/recetas_habitate.png';
import Img_remedios from '../Images/remedios_habitate.png';
import Img_habitos from '../Images/habitos_habitate.png';
import Img_apple from '../Images/manzana_like.png';

export const renderWall = (navigateTo) => {
  const section = document.createElement('section');
  const template = `
        <header class="wallbody">
        <div class="buttons-container">
          <img class="logo-wall" src=${Img_logo_habitate_largo}>
          
            <button id="go-home" class="button-home"  > 
              <img src=${Img_refresh} class="image-home">
            </button> 
            <button id="log-outWall" class="log-outWall" name="logoutWall">
              <img src=${Img_logout} class="logout-imagesWall">
            </button>
        </div>
          <div class="filter-buttons">
          <button id="button-recipes" class="button-recipes" name="recetas" > 
                <img src=${Img_recetas} class="home-images">
                <span> Recetas </span>
            </button>
          <button id="button-remedies" class="button-remedies" name="remedios" > 
            <img src=${Img_remedios} class="home-images">
            <span> Remedios Caseros </span>
           </button>
           <button id="button-habits" class="button-habits" name="habitos" > 
                <img src=${Img_habitos} class="home-images">
                <span> Hábitos Saludables </span>
            </button>
          </div>
        </header>
      
        <section class="log-display">
          <body>
            <div class="wallSectionInput" >
            </div>
            <div class="wallSection" >
            </div>
          </body>
        </section> 
      `;

  // Por ahora estoy creando aquí la sección de los post para poder empezar, posteriormente irá en una ventana pop up
  section.innerHTML = template;

  auth.onAuthStateChanged((user) => {
    console.log(user);
    const displaySection = section.querySelector('.log-display');
    if (user) {
      displaySection.style.display = 'block';
    } else {
      displaySection.style.display = 'none';
      const displayNoLog = document.createElement('div');
      displayNoLog.className = 'log-out-display';
      // displayNoLog.style.display = 'block';
      const messageNoLog = document.createElement('p');
      messageNoLog.innerText = 'Es necesario que inicies sesión para ver el contenido';
      const buttonGoLogin = document.createElement('button');
      buttonGoLogin.innerText = 'Inicia Sesión';
      buttonGoLogin.id = 'go-login';
      buttonGoLogin.className = 'button-second';
      displayNoLog.append(messageNoLog, buttonGoLogin);
      const header = section.querySelector('.wallbody');
      const filterButtons = section.querySelector('.filter-buttons');
      header.append(displayNoLog);
      header.removeChild(filterButtons);
      buttonGoLogin.addEventListener('click', () => {
        navigateTo('/login');
      });
    }
  });

  const wallSectionInput = section.querySelector('.wallSectionInput');
  const wallSection = section.querySelector('.wallSection');
  const inputTitle = document.createElement('input');
  inputTitle.id = 'input-title';
  inputTitle.className = 'input-title';
  inputTitle.placeholder = 'Título de tu recomendación';
  const inputPost = document.createElement('textArea');
  inputPost.id = 'inPost';
  inputPost.className = 'inPost';
  inputPost.placeholder = 'Déjanos tu recomendación';
  const inputImage = document.createElement('label');
  inputImage.textContent = 'Agrega una imagen';
  inputImage.className = 'btn-img-post';
  inputImage.setAttribute('for', 'input-file');
  const inputFile = document.createElement('input');
  inputFile.type = 'file';
  inputFile.id = 'input-file';
  inputFile.className = 'input-file';
  inputFile.accept = 'image/.';
  inputFile.style.display = 'none';
  const postType = document.createElement('select');
  postType.id = 'select-type';
  postType.className = 'select-type';
  const option1 = document.createElement('option');
  option1.value = 'receta';
  option1.text = 'Receta';
  const option2 = document.createElement('option');
  option2.value = 'remedio';
  option2.text = 'Remedio';
  const option3 = document.createElement('option');
  option3.value = 'habito';
  option3.text = 'Hábito';
  postType.append(option1, option2, option3);
  const buttonSendPost = document.createElement('button');
  buttonSendPost.id = 'button-sendPost';
  buttonSendPost.className = 'button-sendPost';
  buttonSendPost.textContent = 'Publicar';
  const postSection = document.createElement('article');
  postSection.className = 'post-section';
  wallSectionInput.append(inputTitle, inputPost, inputFile);
  wallSection.append(inputImage, postType, buttonSendPost, postSection);

  buttonSendPost.addEventListener('click', async () => {
    const title = wallSectionInput.querySelector('#input-title');
    const message = wallSectionInput.querySelector('#inPost');
    const postTypeSel = wallSection.querySelector('#select-type');
    const imgInput = wallSectionInput.querySelector('#input-file');
    console.log(imgInput);

    if (message.value !== '' && title.value !== '') {
      const user = authUser();
      const userID = user.uid;
      const userEmail = user.email;
      if (imgInput.files.length > 0) {
        const imagePost = imgInput.files[0];
        const imageName = imagePost.name;
        // console.log(imagePost, imageName);
        const image = await uploadFile(imageName, imagePost);
        // console.log(image);
        addPost(title.value, message.value, postTypeSel.value, image, userID, userEmail);
      } else {
        addPost(title.value, message.value, postTypeSel.value, '', userID, userEmail);
      }
      message.value = '';
      title.value = '';
    } else {
      alert('El mensaje no puede estar vacío');
    }
  });
  const renderPost = (element) => {
    const docID = element.id;
    const userID = authUser().uid;
    const post = document.createElement('div');
    post.className = 'post-style';
    post.id = 'post';
    const userEmail = document.createElement('p');
    userEmail.className = 'user-email';
    userEmail.innerText = element.data().email;
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';
    const postTitle = document.createElement('p');
    postTitle.innerHTML = element.data().title;
    const postMessage = document.createElement('p');
    postMessage.innerHTML = element.data().message;
    postMessage.className = 'post-message-style';
    const imgPost = document.createElement('img');
    imgPost.src = element.data().image;
    imgPost.className = 'img-post';
    const btnEdit = document.createElement('button');
    btnEdit.id = 'button-edit';
    btnEdit.className = 'button-edit';
    btnEdit.innerText = 'Editar';
    const btnDelete = document.createElement('button');
    btnDelete.id = 'button-delete';
    btnDelete.className = 'button-delete';
    btnDelete.innerText = 'Eliminar';
    const btnLike = document.createElement('button');
    btnLike.id = 'button-like';
    btnLike.className = 'button-like';
    const apple = document.createElement('img');
    apple.src = Img_apple;
    apple.className = 'img-like';
    if (element.data().likes.includes(userID)) {
      apple.style.opacity = 1;
    } else {
      apple.style.opacity = 0.5;
    }
    const counter = document.createElement('span');
    counter.innerText = element.data().likes.length;
    btnLike.append(apple);
    messageContainer.append(postTitle, postMessage, imgPost);
    post.append(userEmail, messageContainer, btnEdit, btnDelete, btnLike, counter);
    postSection.append(post);
    btnDelete.addEventListener('click', () => {
      const postUser = element.data().user;
      if (postUser === userID) {
        const confirmDelete = confirm('¿Seguro que deseas borrar este post?');
        if (confirmDelete) {
          deletePost(docID);
        }
      } else {
        alert('Solo el autor original puede eliminar el post');
      }
    });
    btnLike.addEventListener('click', () => {
      addLike(docID, userID);
    });
    btnEdit.addEventListener('click', () => {
      const postUser = element.data().user;
      if (postUser === userID) {
        const createInput = () => {
          const inputEdit = document.createElement('input');
          inputEdit.type = 'text';
          inputEdit.className = 'input-edit';
          inputEdit.id = 'input-edit';
          inputEdit.value = element.data().message;
          messageContainer.insertBefore(inputEdit, postMessage);
          messageContainer.removeChild(postMessage);
        };
        const buttonEditPost = () => {
          const inputEdit = wallSection.querySelector('#input-edit');
          editPost(docID, inputEdit.value);
          postMessage.innerHTML = element.data().message;
          messageContainer.insertBefore(postMessage, inputEdit);
          messageContainer.removeChild(inputEdit);
          btnEdit.textContent = 'Editar';
        };
        if (btnEdit.textContent === 'Editar') {
          createInput();
          btnEdit.textContent = 'Guardar';
          btnEdit.removeEventListener('click', buttonEditPost);
          btnEdit.addEventListener('click', createInput);
        } else {
          buttonEditPost();
        }
      } else {
        alert('Solo el autor original puede editar el post');
      }
    });
  };
  renderRealTime((querySnapshot) => {
    postSection.textContent = '';
    querySnapshot.forEach((element) => {
      renderPost(element);
    });
  });
  const buttonLogOut = section.querySelector('#log-outWall');
  buttonLogOut.addEventListener('click', () => {
    cerrarSesion();
    navigateTo('/');
  });

  // Agrega el evento para cargar todos los comentarios de nuevo (limpiar el filtro)
  const buttonHome = section.querySelector('#go-home');
  buttonHome.addEventListener('click', () => {
    renderRealTime((querySnapshot) => {
      postSection.textContent = '';
      querySnapshot.forEach((element) => {
        renderPost(element);
        console.log(renderPost);
      });
    });
  });
  const buttonRemedies = section.querySelector('#button-remedies');
  buttonRemedies.addEventListener('click', () => {
    renderRealTime((querySnapshot) => {
      postSection.textContent = '';
      querySnapshot.forEach((element) => {
        if (element.data().postType.includes('remedio')) {
          renderPost(element);
        }
      });
    });
  });
  const buttonRecipes = section.querySelector('#button-recipes');
  buttonRecipes.addEventListener('click', () => {
    renderRealTime((querySnapshot) => {
      postSection.textContent = '';
      console.log(querySnapshot);
      querySnapshot.forEach((element) => {
        if (element.data().postType.includes('receta')) {
          renderPost(element);
        }
      });
    });
  });
  const buttonHabits = section.querySelector('#button-habits');
  buttonHabits.addEventListener('click', () => {
    renderRealTime((querySnapshot) => {
      postSection.textContent = '';

      querySnapshot.forEach((element) => {
        if (element.data().postType.includes('habito')) {
          renderPost(element);
        }
      });
    });
  });
  return section;
};
