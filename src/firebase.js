// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCyiaUFbTFwJf-Jnl15jVGv9u0fJ961_UU",
  authDomain: "fatorangecunt.firebaseapp.com",
  databaseURL: "https://fatorangecunt-default-rtdb.firebaseio.com",
  projectId: "fatorangecunt",
  storageBucket: "fatorangecunt.appspot.com",
  messagingSenderId: "873318912820",
  appId: "1:873318912820:web:fd8b98a6ea4c1329ab4b61",
  measurementId: "G-09LKD8NT8C"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);