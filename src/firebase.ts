// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
//import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getMessaging, onMessage } from "firebase/messaging";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuOVLfuOMJvQseQl7tAU8FlSX--66tU24",
  authDomain: "wallof-client.firebaseapp.com",
  projectId: "wallof-client",
  storageBucket: "wallof-client.firebasestorage.app",
  messagingSenderId: "821389733926",
  appId: "1:821389733926:web:2bf447b890e9416e12b6e7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const mFirebase = getFunctions(app);
export const mMessaging = getMessaging(app);
export const mDatabase = getDatabase(app);

export const registerWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);
