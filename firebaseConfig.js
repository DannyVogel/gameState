// Import the functions you need from the SDKs you need
import firebaseConfig from "./utility/firebaseConfigDetails";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, get, child, update, remove, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration: imported firebaseconfig

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const gameStateDB = ref(db, "gameState")

export {auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, db, gameStateDB, ref, get, child, update, remove, onValue}