// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnsLNbcw3o4-CAVOZpgXVrUGVCDq-3S_8",
  authDomain: "client-react-web-app.firebaseapp.com",
  projectId: "client-react-web-app",
  storageBucket: "client-react-web-app.firebasestorage.app",
  messagingSenderId: "529702573928",
  appId: "1:529702573928:web:19864b7d585f7eddd7e8dd",
  measurementId: "G-DZ9Z6CBY61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const registerWithEmail = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);
  
  export const loginWithEmail = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);