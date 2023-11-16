import {
  getFirestore, addDoc, collection, getDocs, orderBy, query, where,
} from 'firebase/firestore';
import { app } from './firebase.js';

export const db = getFirestore(app);
export {
  getFirestore, addDoc, collection, getDocs, orderBy, query, where,
};
/* export {
  ref, getDownloadURL, uploadBytes,
}; */
