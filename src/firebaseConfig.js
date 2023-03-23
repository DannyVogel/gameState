// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvZtRn9B9OgWOIVHnICiq0_eoNreJBUs0",
  authDomain: "gamestate-327e2.firebaseapp.com",
  projectId: "gamestate-327e2",
  storageBucket: "gamestate-327e2.appspot.com",
  messagingSenderId: "168937433606",
  appId: "1:168937433606:web:0919320d20ca2f94033187"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut }