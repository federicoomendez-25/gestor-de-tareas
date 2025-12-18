import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAzWDqmyVlNZIXJ2Qqf8mbcmGKRVe-e8EI",
  authDomain: "gestor-de-tareas-20184.firebaseapp.com",
  databaseURL: "https://gestor-de-tareas-20184-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gestor-de-tareas-20184",
  storageBucket: "gestor-de-tareas-20184.firebasestorage.app",
  messagingSenderId: "119068280234",
  appId: "1:119068280234:web:ab442c9f9ae0b3034917d3"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);


