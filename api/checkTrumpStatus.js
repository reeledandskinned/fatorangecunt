// checkTrumpStatus.js
import fetch from "node-fetch";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Firebase configuration (same as App.js)
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

export default async function handler(req, res)
{try}
// Your GNews API key
const GNEWS_KEY = "89bfe130020545ca03db2f42412e46e9";

async function checkTrumpStatus() {
  try {
    const url = `https://gnews.io/api/v4/search?q=Donald%20Trump%20death&lang=en&max=10&token=${GNEWS_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.articles) return console.log("No articles found.");

    const deathFound = data.articles.some(article => {
      const title = (article.title || "").toLowerCase();
      const desc = (article.description || "").toLowerCase();
      return title.includes("donald trump has died") || desc.includes("donald trump has died");
    });

    if (deathFound) {
      await set(ref(db, "people/donald trump"), { alive: false });
      console.log("Trump marked deceased in Firebase!");
    } else {
      console.log("Trump still alive (no death news found).");
    }
  } catch (err) {
    console.error("Error checking Trump status:", err);
  }
}

// Run the script
checkTrumpStatus();