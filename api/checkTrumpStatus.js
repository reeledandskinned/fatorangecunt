import fetch from "node-fetch";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCyiaUFbTFwJf-Jnl15jVGv9u0fJ961_UU",
  authDomain: "fatorangecunt.firebaseapp.com",
  databaseURL: "https://fatorangecunt-default-rtdb.firebaseio.com",
  projectId: "fatorangecunt",
  storageBucket: "fatorangecunt.appspot.com",
  messagingSenderId: "873318912820",
  appId: "1:873318912820:web:fd8b98a6ea4c1329ab4b61",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// THIS is the important part 👇
export default async function handler(req, res) {
  try {
    const GNEWS_KEY = process.env.GNEWS_KEY;

    const url = `https://gnews.io/api/v4/search?q=Donald%20Trump%20death&lang=en&max=10&token=${GNEWS_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.articles) {
      return res.status(200).send("No articles found.");
    }

    const deathFound = data.articles.some(article =>
      (article.title || "").toLowerCase().includes("donald trump has died") ||
      (article.description || "").toLowerCase().includes("donald trump has died")
    );

    if (deathFound) {
      await set(ref(db, "people/donald trump"), { alive: false });
      return res.status(200).send("Trump marked deceased in Firebase!");
    } else {
      return res.status(200).send("Trump still alive.");
    }

  } catch (err) {
    console.error(err);
    return res.status(500).send("Error running function");
  }
}