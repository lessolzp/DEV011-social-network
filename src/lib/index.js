import { onAuthStateChanged } from 'firebase/auth';
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,
  auth, provider, db, addDoc, collection, getDocs, onSnapshot, orderBy, query,
  updateDoc, arrayUnion, arrayRemove, doc, getDoc, deleteDoc,
  ref, getDownloadURL, uploadBytes, storage,
} from './firebase.js';

export {
  auth, db, doc, onAuthStateChanged,
};

const postCollection = collection(db, 'posts');

// Función que redirecciona al acceso con Google
export function callLoginGoogle() {
  return signInWithPopup(auth, provider);
}

// Función que crea un nuevo usuario con firebase y utiliza email y password
export function submitNewUserInfo(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Función que hace log in con email y password con firebase
export function submitUserInfo(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Función cerrar sesión
export function cerrarSesion() {
  auth.signOut()
    .then(() => {
      console.log('cierra-sesion');
    }).catch((error) => {
      console.log(error);
    });
}

// función para obtener la información de la imagen
export const uploadFile = async (fileName, file) => {
  const storageRef = ref(storage, `images/${fileName}`);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log('Se subio el archivo', url);
    return url;
  } catch (error) {
    console.error('Error al cargar la imagen:', error);
    return null;
  }
};

export const addPost = (title, message, postType, image, userID, userEmail) => {
  addDoc(postCollection, {
    title,
    message,
    postType,
    image,
    user: userID,
    email: userEmail,
    likes: [],
    date: Date.now(),
  });
};

export const authUser = () => {
  const user = auth.currentUser;
  if (user !== null) return user;
  return 'no hay usuarios';
};

// Función para poder traer los post de la base de datos
export const querySnapshot = getDocs(postCollection);

export const q = query(postCollection, orderBy('date', 'desc'));

// export const q = query(postCollection, where("postType", "==", "habito"));

// Función para poder ver la data en tiempo real
export const renderRealTime = (callback) => onSnapshot(q, callback);

// Función para borrar un post
export const deletePost = (id) => {
  deleteDoc(doc(db, 'posts', id));
};

// Pruebas para la función del like

export const addLike = async (id, userID) => {
  const docRef = doc(db, 'posts', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const likes = docSnap.data().likes;
    if (!likes.includes(userID)) {
      // Agrega el UID del usuario al array utilizando arrayUnion
      updateDoc(docRef, {
        likes: arrayUnion(userID),
      });
    } else {
      updateDoc(docRef, {
        likes: arrayRemove(userID),
      });
    }
  }
};

export const editPost = (id, message) => {
  const docRef = doc(db, 'posts', id);
  // cosnt likes = docRef;
  console.log(docRef);
  updateDoc(docRef, {
    message,
  });
};
