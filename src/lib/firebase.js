import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, addDoc, getDocs, onSnapshot, orderBy, query,
  updateDoc, arrayUnion, arrayRemove, doc, getDoc, deleteDoc, where,
} from 'firebase/firestore';
import {
  getStorage, ref, getDownloadURL, uploadBytes,
} from 'firebase/storage';
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  collection,
  addDoc,
  getDocs, onSnapshot, orderBy, query, where,
  updateDoc, arrayUnion, arrayRemove, doc, getDoc, deleteDoc, signOut,
  getStorage, ref, getDownloadURL, uploadBytes,
};

const firebaseConfig = {
  apiKey: 'AIzaSyBr5Z4iOCJqUFUVsIJYjm4-fS6ZYJTalls',
  authDomain: 'habitate-5e51d.firebaseapp.com',
  projectId: 'habitate-5e51d',
  storageBucket: 'habitate-5e51d.appspot.com',
  messagingSenderId: '700997763612',
  appId: '1:700997763612:web:2c069c2a7f4b49a316d5d9',
  measurementId: 'G-W5HYR984QH',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const db = getFirestore(app);
export const storage = getStorage(app);
