// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, get, child, update, remove, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyDvZtRn9B9OgWOIVHnICiq0_eoNreJBUs0",
  authDomain: "gamestate-327e2.firebaseapp.com",
  databaseURL: "https://gamestate-327e2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gamestate-327e2",
  storageBucket: "gamestate-327e2.appspot.com",
  messagingSenderId: "168937433606",
  appId: "1:168937433606:web:0919320d20ca2f94033187"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const gameStateDB = ref(db, "gameState")

export {auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, db, gameStateDB, ref, get, child, update, remove, onValue}