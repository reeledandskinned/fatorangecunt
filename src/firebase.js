import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyiaUFbTFwJf-Jnl15jVGv9u0fJ961_UU",
  authDomain: "fatorangecunt.firebaseapp.com",
  databaseURL: "https://fatorangecunt-default-rtdb.firebaseio.com",
  projectId: "fatorangecunt",
  storageBucket: "fatorangecunt.firebasestorage.app",
  messagingSenderId: "873318912820",
  appId: "1:873318912820:web:fd8b98a6ea4c1329ab4b61",
  measurementId: "G-09LKD8NT8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };