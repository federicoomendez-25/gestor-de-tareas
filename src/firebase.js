// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzWDqmyVlNZIXJ2Qqf8mbcmGKRVe-e8EI",
  authDomain: "gestor-de-tareas-20184.firebaseapp.com",
  projectId: "gestor-de-tareas-20184",
  storageBucket: "gestor-de-tareas-20184.firebasestorage.app",
  messagingSenderId: "119068280234",
  appId: "1:119068280234:web:ab442c9f9ae0b3034917d3",
  measurementId: "G-YT20J9PD5P"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Base de datos Firestore
export const db = getFirestore(app);
